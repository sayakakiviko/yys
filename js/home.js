/*年始年末*/
(function () {
    var oBtn = document.getElementById("change"),
        oWrap = document.getElementById("wrap1");
    oBtn.onclick = function () {
        oWrap.classList.toggle("bg");
    };
})();

/*情报列表和遮罩层*/
(function () {
    var oFooter = document.getElementById("footer"),//底部
        aList = document.getElementById("wrap2").getElementsByTagName("ul")[0].getElementsByTagName("li"),//情报列表
        oMask = document.getElementById("mask"),//遮罩层
        aInfo = oMask.getElementsByTagName("li"),//情报详情
        aCon = oMask.getElementsByClassName("con"),//内容盒子
        txt = oMask.getElementsByClassName("text"),//内容
        oScroll = document.getElementById("scroll"),//滚动条盒子
        oBar = document.getElementById("bar"),//滚动条
        aBtn = document.getElementById("btn").getElementsByTagName("div"),//遮罩层相关按钮
        index = 0,
        barTop, conTop;//滚动条top，内容top

    /*遮罩内容打开、关闭和切换*/
    for (var i = 0, length = aList.length; i < length; i++) {
        (function (i) {
            addEvent(aList[i], "click", function () {
                document.body.style.cssText = "overflow:hidden;height:" + (document.documentElement.clientHeight || document.body.clientHeight) + "px;";//body样式的改变
                oFooter.style.display = "none";
                oMask.style.display = "block";//弹出遮罩层
                aInfo[i].style.display = "block";//显示当前点击的这个的情报列表
                switch (i) {
                    case 0://若是第一张隐藏上一张按钮，显示下一张按钮
                        aBtn[1].style.display = "none";
                        aBtn[2].style.display = "block";
                        break;
                    case length - 1://若是最后一张隐藏最后一张按钮，显示上一张按钮
                        aBtn[2].style.display = "none";
                        aBtn[1].style.display = "block";
                        break;
                    default://否则显示上一张下一张按钮
                        aBtn[1].style.display = "block";
                        aBtn[2].style.display = "block";
                        break;
                }
                scrollCon(txt[i], aCon[i]);
                index = i;
            });
        })(i);
    }
    //关闭按钮
    addEvent(aBtn[0], "click", function () {
        document.body.style.cssText = "overflow:auto;height:auto;";
        oFooter.style.display = "block";
        oMask.style.display = "none";//隐藏遮罩层
        aInfo[index].style.display = "none";//隐藏当前的情报详情
        oScroll.style.display = "none";
    });
    //上一个
    addEvent(aBtn[1], "click", function () {
        aInfo[index].style.display = "none";
        index--;
        aInfo[index].style.display = "block";
        //若是第一张则隐藏上一张按钮，否则显示下一张按钮
        index <= 0 && (this.style.display = "none") || (aBtn[1].style.display = "block") && (aBtn[2].style.display = "block");
        scrollCon(txt[index], aCon[index]);
    });
    //下一个
    addEvent(aBtn[2], "click", function () {
        aInfo[index].style.display = "none";
        index++;
        aInfo[index].style.display = "block";
        //若是最后一张则隐藏下一张按钮，否则显示上一张按钮
        index >= length - 1 && (this.style.display = "none") || (aBtn[1].style.display = "block") && (aBtn[2].style.display = "block");
        scrollCon(txt[index], aCon[index]);
    });

    /*内容滚动。参数：内容，盒子*/
    function scrollCon(con, box) {
        if (con.clientHeight > box.clientHeight) {//如果内容高度高于盒子高度
            oScroll.style.display = "block";//显示滚动条
            con.style.top = "0";//内容top初始化
            oBar.style.top = "0";//滚动条top初始化
            oBar.style.height = Math.pow(box.clientHeight, 2) / con.clientHeight + "px";//滚动条的高度。bar/scroll = con/txt
            var barMaxTop = oScroll.clientHeight - oBar.clientHeight,//滚动条最大top
                conMaxTop = con.clientHeight - box.clientHeight,//内容最大top
                prop = barMaxTop / conMaxTop;//比例

            //滚轮事件
            addWheelEvent(box, function (e, d) {
                d *= 30;//滚动速度
                changeTop(d * prop);
                e.preventDefault();
                return false;
            });

            //按住拖动滚动条
            addEvent(oBar, "mousedown", function (e) {
                e = e || window.event;
                var sY = e.clientY;//鼠标到文档top距离
                document.onmousemove = function (e) {
                    e = e || window.event;
                    var nY = e.clientY;
                    changeTop(nY - sY);
                    sY = e.clientY;//给初始clientY重新赋值
                };
            });
            document.onmouseup = function () {
                this.onmousemove = null;
            };

            //点击滚动条
            oScroll.onclick = function (e) {
                e = e || window.event;
                var cY = e.clientY,//鼠标到文档top距离
                    barTop = oBar.offsetTop + oScroll.offsetTop;//获取滚动条top值
                changeTop(cY - barTop - oBar.clientHeight / 2);//除以2是为了点击后滚动条中部在鼠标点击位置
                oBar.onclick = function (e) {//点击滚动条时阻止事件传递
                    e.cancelBubble = true;
                };
            };
        } else {
            oScroll.style.display = "none";
        }

        //top的改变
        function changeTop(x) {
            //滚动条相关
            barTop = oBar.offsetTop + x;
            barTop = Math.max(barTop, 0);//滚动条到达顶部
            barTop = Math.min(barTop, barMaxTop);//到达底部
            oBar.style.top = barTop + "px";
            //内容相关
            conTop = con.offsetTop - x / prop;//传参的时候已经预先d*prop了，所以这里要除去prop
            conTop = Math.max(-conTop, 0);//内容到达顶部
            conTop = -Math.min(conTop, conMaxTop);//到达底部
            con.style.top = conTop + "px";
        }
    }

    /*滚轮事件的绑定*/
    function addWheelEvent(obj, fn) {
        function eFn(e) {
            //真正的事件其实是在这执行
            //向上滚为负向下滚为正，如果函数返回false也就是想要阻止冒泡
            if (fn.call(obj, e = e || window.event, -e.wheelDelta / 120 || e.detail / 3) === false) {
                e.preventDefault && e.preventDefault();
                return false;
            }
        }

        //判断是否是火狐
        var eName = document.createElement("div").onmousewheel === null ? "mousewheel" : "DOMMouseScroll";
        //判断是否是IE
        document.addEventListener ? obj.addEventListener(eName, eFn, false) : obj.attachEvent(eName, eFn);
    }

    /*事件绑定*/
    function addEvent(obj, eName, eFn) {//对象、事件名、事件函数
        document.addEventListener ? obj.addEventListener(eName, eFn, false) : obj.attachEvent("on" + eName, eFn);
    }
})();

/*游戏特色*/
(function () {
    var oWrap = document.getElementById("wrap3"),
        oCover = oWrap.getElementsByClassName("cover")[0],//幽灵边框
        oUl = oWrap.getElementsByTagName("ul")[0],
        aLi = oUl.getElementsByTagName("li"),//图片盒子
        oActive = oUl.getElementsByClassName("active")[0],//当前图片
        oPrev = oUl.getElementsByClassName("prev")[0],//上一张
        oNext = oUl.getElementsByClassName("next")[0],//下一张
        oLeft = oWrap.getElementsByClassName("left")[0],//上一张按钮
        oRight = oWrap.getElementsByClassName("right")[0],//下一张按钮
        index = 0;

    /*页面载入完成的动画*/
    window.onload = function () {
        oUl.style.left = "0";
        setTimeout(function () {
            oCover.style.display = "block"
        }, 1000);
    };

    /*图片切换*/
    for (var i = 0, length = aLi.length; i < length; i++) {
        (function (i) {
            aLi[i].onclick = function () {//点击li
                if (i !== index) {//若点击的li不是当前显示的
                    index = i;//当前显示的序号
                    change();
                }
            };
        })(i);
    }

    //点击按钮
    oLeft.onclick = function () {//上一张
        index--;
        index < 0 && (index = length - 1);
        change();
    };
    oRight.onclick = function () {//下一张
        index++;
        index %= length;
        change();
    };

    //图片的变换
    function change() {
        var prev = index - 1,//切换之后的上一张序号
            next = index + 1;//切换之后的下一张序号
        prev < 0 && (prev = length - 1);
        next %= length;
        //清除类名
        oPrev.className = "";
        oActive.className = "";
        oNext.className = "";
        //添加类名
        aLi[prev].className = "prev";
        aLi[index].className = "active";
        aLi[next].className = "next";
        //重新获取
        oPrev = oWrap.getElementsByClassName("prev")[0];
        oNext = oWrap.getElementsByClassName("next")[0];
    }
})();
















