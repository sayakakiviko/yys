/*页面载入完成的动画*/
window.onload = function () {
    //主角立绘的展开
    document.getElementsByClassName("cv1")[0].style.cssText = "opacity:1;left:0;";
    document.getElementsByClassName("cv2")[0].style.cssText = "opacity:1;left:205px;";
    setTimeout(function () {
        document.getElementsByClassName("logo")[0].style.left = "50px";//logo的展开
    }, 1000);
};

/*主角立绘*/
(function () {
    var cv1 = document.getElementsByClassName("cv1")[0],//神乐
        cv2 = document.getElementsByClassName("cv2")[0],//晴明
        cv3 = document.getElementsByClassName("cv3")[0],//八百比丘尼
        cv4 = document.getElementsByClassName("cv4")[0],//源博雅
        oNext = document.getElementById("next"),
        clickTime = 0;//上一次的点击时间

    oNext.bool = false;//第一组立绘是否是隐藏状态，true表示隐藏
    oNext.onclick = function () {
        if (new Date() - clickTime > 1000) {//两次点击的间隔不能小于一秒
            clickTime = new Date();//时间更新
            //如果第一组CV立绘是隐藏状态
            oNext.bool && change([cv3, cv4, cv1, cv2], ["0", "50px", "0", "205px"]) || !oNext.bool && change([cv1, cv2, cv3, cv4], ["130px", "75px", "-128px", "185px"]);
            this.bool = !this.bool;
        }
    };

    //主角切换的动画效果
    function change(cvArr, leftArr) {
        //隐藏
        cvArr[0].style.cssText = "opacity: 0;filter: alpha(opacity=0);left: " + leftArr[0] + ";";
        cvArr[1].style.cssText = "opacity: 0;filter: alpha(opacity=0);left: " + leftArr[1] + ";";
        //显示
        clearTimeout(window.timer1);
        window.timer1 = setTimeout(function () {
            cvArr[2].style.cssText = "opacity: 1;filter: alpha(opacity=100);left: " + leftArr[2] + ";";
            cvArr[3].style.cssText = "opacity: 1;filter: alpha(opacity=100);left: " + leftArr[3] + ";";
        }, 1000);
    }
})();

/*导航栏hover*/
(function () {
    var oNavBox = document.getElementsByClassName("show-more-top")[0],//导航栏框
        oNav = document.getElementsByClassName("nav-item")[0],//导航栏
        oQudao = document.getElementsByClassName("qudao-hover")[0],//官方渠道
        oHover = document.getElementsByClassName("show-more-bottom")[0],//官方渠道下拉框
        oSsl = document.getElementsByClassName("ssl")[0],//式神录
        oZjl = document.getElementsByClassName("zjl")[0],//主角录
        oCode = document.getElementsByClassName("left-part")[0],//左侧面板
        oLogo = document.getElementsByClassName("logo")[0],//logo
        top = document.documentElement.scrollTop || document.body.scrollTop;//滚动距离

    //hover显示隐藏
    oQudao.onmouseenter = function () {
        hover(true);
    };
    oQudao.onmouseleave = function () {
        hover(false);
    };
    oHover.onmouseenter = function () {
        hover(true);
    };
    oHover.onmouseleave = function () {
        hover(false);
    };

    //官方渠道下拉框的处理
    function hover(bool) {
        var high = bool && "200px" || "0";//若移入给高度，否则为0
        if (oNavBox.style.position === "fixed") {//先判断导航栏是否是置顶状态
            oHover.style.height = high;
        } else {
            oNavBox.style.backgroundColor = bool && "rgba(255, 255, 255, .9)" || "transparent";//移入就添加背景，否则不添加
            oHover.style.height = high;
        }
    }

    /*滚动显示导航栏*/
    top >= 55 && topNav(true);//滚动后刷新页面，也能出现置顶导航
    document.onscroll = function () {
        var bool = document.documentElement.scrollTop || document.body.scrollTop >= 55;//判断是否滚动了55px
        bool && topNav(true) || !bool && topNav(false);//如果向下滚动了55px传true，否则false
        parseFloat(oHover.style.height) > 0 && (oNavBox.style.backgroundColor = "rgba(255, 255, 255, .9)");//如果下拉框是展示状态则有背景
    };

    //置顶导航的处理
    function topNav(bool) {
        var state = bool && "block" || "none";
        oNavBox.style.cssText = "position:" + (bool && "fixed" || "absolute") + ";background-color: " + (bool && "rgba(255, 255, 255, .9)" || "transparent") + ";";
        oNav.style.color = "#" + (bool && "333" || "fff");
        oSsl.style.display = state;
        oZjl.style.display = state;
        oCode.style.display = state;
        oLogo.style.transform = "scale(" + (bool && "0" || "1") + ")";
    }
})();

/*下载区的隐藏显示*/
(function () {
    var oDl = document.getElementsByClassName("download")[0],//下载区
        oHide = document.getElementsByClassName("download-close")[0],//隐藏下载区按钮
        oShow = document.getElementsByClassName("download-hidden")[0],//显示下载区按钮
        child = document.getElementsByClassName("download-box")[0].children,//下载区的内容
        length = child.length;
    //点击隐藏下载区
    oHide.onclick = function () {
        oDl.style.marginLeft = "235px";
        clearTimeout(window.timer3);//每次执行定时器前先清除，以免累积造成卡顿
        window.timer3 = setTimeout(function () {
            for (var i = 0; i < length; i++) {
                child[i].style.display = "none";//隐藏所有内容
            }
            oShow.style.display = "block";//显示二维码按钮
            oDl.style.width = "344px";//延迟变化下载区宽度
        }, 150);
    };
    //点击显示下载区
    oShow.onclick = function () {
        oDl.style.marginLeft = "-265px";
        clearTimeout(window.timer4);
        window.timer4 = setTimeout(function () {
            for (var i = 0; i < length; i++) {
                child[i].style.display = "block";//显示所有内容
            }
            oShow.style.display = "none";//隐藏二维码按钮
            oDl.style.width = "532px";
        }, 150);
    };

    /*新闻轮播区域*/
    //banner轮播图
    banner(360, "news-on", document.getElementById("banner"), document.getElementsByClassName("news-banner-btn")[0].getElementsByTagName("a"), document.getElementsByClassName("news-banner")[0]);
    //新闻资讯
    var tab = document.getElementsByClassName("news-info-tit")[0];//tab选项卡父级
    tabHover(500, "on", tab.getElementsByTagName("li"), tab.getElementsByTagName("em"), document.getElementsByClassName("news-info-wrap")[0]);
})();

/*平安之旅选项卡*/
(function () {
    var oPingan = document.getElementsByClassName("pingan-tab")[0],
        aPinganTab = oPingan.getElementsByTagName("a"),//tab选项卡
        aHover = oPingan.getElementsByClassName("hover-bg"),//背景色
        oSs = document.getElementsByClassName("shishen-wrap")[0],
        oZhujue = document.getElementsByClassName("zhujue-wrap")[0];
    aPinganTab[0].onclick = function () {//式神
        change(true);
    };
    aPinganTab[1].onclick = function () {//主角
        change(false);
    };

    function change(bool) {
        //tab背景色改变
        aHover[bool && 1 || 0].classList.remove("active");
        aHover[!bool && 1 || 0].classList.add("active");//如果bool && 0 || 1；的话，数字0会被转成布尔值false从而取到的值一直都是1
        //式神 主角切换
        (bool && oZhujue || oSs).style.display = "none";
        (bool && oSs || oZhujue).style.display = "block";
    }
})();

/*式神列表*/
(function () {
    var oLeft = document.getElementsByClassName("onleft")[0],//左按钮
        oRight = document.getElementsByClassName("onright")[0],//右按钮
        oShishen = document.getElementsByClassName("shishen-box-all")[0],//式神列表盒子
        aAllShishen = oShishen.getElementsByTagName("div"),//式神列表
        index = 0;

    oLeft.onclick = function () {
        shishenChange(false);
    };
    oRight.onclick = function () {
        shishenChange(true);
    };

    //式神列表切换
    function shishenChange(bool) {
        if (bool) {//next
            index++;
            btnState();
        } else {//prev
            index--;
            btnState();
        }
        oShishen.style.marginLeft = "-" + index * 820 + "px";//式神列表切换
    }

    //按钮的显示隐藏
    function btnState() {
        switch (index) {
            case aAllShishen.length - 1://如果是列表最后
                oRight.style.display = "none";
                oLeft.style.display = "block";
                break;
            case 0://如果是第一个列表
                oLeft.style.display = "none";
                oRight.style.display = "block";
                break;
            default:
                oLeft.style.display = "block";
                oRight.style.display = "block";
                break;
        }
    }
})();

/*主角列表*/
(function () {
    var aZhujueTab = document.getElementsByClassName("zhujue-con-tab")[0].getElementsByTagName("li"),//主角选项卡
        aZhujueList = document.getElementsByClassName("zhujue-box"),//主角信息
        index = 0;
    for (var i = 0, length = aZhujueTab.length; i < length; i++) {
        (function (i) {
            aZhujueTab[i].onclick = function () {
                aZhujueTab[index].classList.remove("zhujue-hover");//选项卡背景色改变
                aZhujueList[index].classList.remove("show");//主角列表改变
                index = i;
                aZhujueTab[index].classList.add("zhujue-hover");
                aZhujueList[index].classList.add("show");
            };
        })(i);
    }
})();

/*攻略区*/
(function () {
    //攻略区轮播
    banner(368, "strategy-on", document.getElementsByClassName("strategy-banner-box")[0], document.getElementsByClassName("strategy-banner-btn")[0].getElementsByTagName("a"));
    //攻略区tab选项卡
    var tab = document.getElementsByClassName("strategy-info-tab")[0];//选项卡父级
    tabHover(850, "on", tab.getElementsByTagName("a"), tab.getElementsByTagName("i"), document.getElementsByClassName("strategy-info-wrap")[0]);

    /*同人专区tab 选项卡*/
    var aDiv = document.getElementsByClassName("tongren-tab")[0].getElementsByTagName("div");//选项卡
    tabHover(1220, "on", aDiv, aDiv, document.getElementsByClassName("tongren-con-wrap")[0]);

    /*返回顶部*/
    var backTop = document.getElementsByClassName("back-top")[0], scrollToptimer;//返回顶部按钮，定时器
    backTop.onclick = function () {
        scrollToptimer = setInterval(function () {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = top / 2.5;//除的值越大，回顶的速度越慢
            document.body.scrollTop > 0 && (document.body.scrollTop -= speed) || (document.documentElement.scrollTop -= speed);//scrollTop递减回顶
            top === 0 && clearInterval(scrollToptimer);//如果到达顶部则清除定时器
        }, 30);
    };
})();

/***轮播方法。参数：切换的宽度，变化的类名，轮播图父级（margin-left变化的那个），轮播图按钮，轮播图框架（可略,轮播图祖级）***/
function banner(width, cName, oBanner, aBtn, oBannerBox) {
    var oBox = oBannerBox || oBanner,//若传入了轮播图框架则用框架，否则就用它父级
        index = 0, timer;

    for (var i = 0, length = aBtn.length; i < length; i++) {
        (function (i) {
            aBtn[i].onmouseenter = function () {//轮播按钮
                change(true, i);//按钮背景色改变
            };
        })(i);
    }

    //鼠标放到轮播图时清除定时器
    oBox.onmouseenter = function () {
        clearInterval(timer);
    };
    //鼠标移开时继续执行定时器
    oBox.onmouseleave = auto();

    //自动轮播
    function auto() {
        timer = setInterval(function () {
            change(false);
        }, 5000);
        return auto;
    }

    //轮播图的切换
    function change(bool, i) {
        aBtn[index].classList.remove(cName);//移除上一个按钮的样式
        if (bool) {//若是按钮改变轮播图
            index = i;
        } else {//自动切换
            index++;
            index %= length;//轮播到了最后一个就从0开始
        }
        aBtn[index].classList.add(cName);//添加当前按钮样式
        oBanner.style.marginLeft = -index * width + "px";//图片改变
    }
}

/***选项卡方法。参数：切换的宽度，类名，选项卡，选项卡背景，对应选项卡的内容***/
function tabHover(width, cName, aTab, aOn, oCon) {
    var index = 0;
    for (var i = 0, length = aTab.length; i < length; i++) {
        (function (i) {
            aTab[i].onmouseenter = function () {
                aOn[index].classList.remove(cName);//选中样式的移除
                index = i;
                aOn[index].classList.add(cName);//选中样式的添加
                oCon.style.marginLeft = -index * width + "px";//选项卡对应内容
            };
        })(i);
    }
}







