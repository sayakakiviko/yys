/*更多游戏按钮*/
(function () {
    var aMore = document.getElementsByClassName("game-more"),//更多游戏按钮
        oPc = document.getElementsByClassName("sports")[0],//端游活动模块
        oPhone = document.getElementById("game-phone"),//手游活动模块
        oHide = document.getElementsByClassName("hide")[0],//手游模块隐藏的列表
        oMenu = document.getElementsByClassName("catalog")[0],//目录
        pc = aMore[0],//端游按钮
        phone = aMore[1];//手游按钮

    //每次移入重置
    oMenu.onmouseenter = function () {
        //端游重置
        oPc.style.cssText = "left:140px;z-index:0;";
        pc.style.cssText = "top:280px;width:20px;height:100px;padding:5px 5px;";
        pc.innerHTML = "更多热门端游";
        pc.bool = false;
        //手游重置
        oPhone.style.cssText = "left:0;z-index:0;";
        oHide.style.display = "none";
        phone.style.cssText = "top:250px;width:20px;height:100px;padding:5px 5px;";
        phone.innerHTML = "更多热门手游";
        phone.bool = false;
    };

    //端游
    pc.bool = false;//判断是否展开
    pc.onclick = function () {
        if (this.bool) {//如果已展开
            oPc.style.cssText = "left:140px;z-index:2;";
            setTimeout(function () {//动画效果结束之后再降层级
                oPc.style.zIndex = "0";
            }, 600);
            this.style.cssText = "top:280px;width:20px;height:100px;padding:5px 5px;";
            this.innerHTML = "更多热门端游";
        } else {//若未展开
            oPc.style.cssText = "left:281px;z-index:2;";
            this.style.cssText = "top:330px;z-index:2;width:24px;height:22px;padding:0;line-height:22px;";
            this.innerHTML = "<<";
        }
        this.bool = !this.bool;
    };

    //手游
    phone.bool = false;//判断是否展开
    phone.onclick = function () {
        if (this.bool) {//如果已展开
            oPhone.style.cssText = "left:0;z-index:0;";
            oHide.style.display = "none";
            this.style.cssText = "top:250px;width:20px;height:100px;padding:5px 5px;";
            this.innerHTML = "更多热门手游";
        } else {//若未展开
            oPhone.style.cssText = "left:-105px;z-index:1;border-left:1px solid #eae9eb;";
            oHide.style.display = "block";
            this.style.cssText = "top:330px;width:24px;height:22px;padding:0;line-height:22px;";
            this.innerHTML = "<<";
        }
        this.bool = !this.bool;
    };
})();

/*向上轮播广告*/
(function () {
    var oSroll = document.getElementsByClassName("scoll-bar")[0],//父级
        oChild = oSroll.children[0],//滚动盒子
        bool = false,//根据状态来显示对应内容
        timer1, timer2;
    setInterval(function () {
        //首先向上滚动出盒子变透明
        oChild.style.top = "-55px";
        oChild.style.opacity = "0";
        oChild.style.filter = "alpha(opacity = 0)";
        clearTimeout(timer1);//清除定时器，以免造成页面卡顿
        timer1 = setTimeout(function () {
            //然后放到盒子下方
            oChild.style.top = "55px";
            oChild.innerHTML = bool ? "安卓充值9.8折" : "领取网易严选宝箱";
            clearTimeout(timer2);//清除定时器，以免造成页面卡顿
            timer2 = setTimeout(function () {
                //最后从下向上滚动出现
                oChild.style.opacity = "1";
                oChild.style.top = "0";
                oChild.style.filter = "alpha(opacity = 100)";
            }, 300);
        }, 350);
        bool = !bool;
    }, 5000);
})();


















