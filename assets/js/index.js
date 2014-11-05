/**
 * author: 奉雨
 * 首页模块
 * @date 2014/9/26
 */
var S = KISSY;
KISSY.use('node,dom,event', function (S, Node, Dom, Event) {
    var $ = Node.all;
    function init() {
        switchJobs();
        flipInY();
        switchNavBar();
        changeScrollImg();
        goToBottom();
        consoleWarn();
        //背景图加载完成执行背景图切换效果
        loadBg(switchBg);
    }


    /**
     * 就业、考研、勤工板块点击切换
     * @returns {boolean}
     */
    function switchJobs() {
        var $jobs = $('#J-jobs');
        if (!$jobs) return false;
        //绑定父节点，使用事件委托
        $jobs.on('click', function (e) {
            var target = e.target || e.srcElement;
            $('.jobs .news_list').css('display', 'none');
            switch (target.id) {
                case 'J-jiuye':
                    $('.jobs .jiuye').css('display', 'block');
                    break;
                case 'J-kaoyan':
                    $('.jobs .kaoyan').css('display', 'block');
                    break;
                case 'J-qingong':
                    $('.jobs .qingong').css('display', 'block');
                    break;
            }
        })
    }

    /**
     * 鼠标滑过学习成长图片翻转动画
     */
    function flipInY() {
        var $bannerLi = $('.banner-li');
        if (!$bannerLi) return false;
        $bannerLi.on('mouseenter', function () {
            Dom.addClass(this, 'animated flipInY');
            setInterval(function () {
                Dom.removeClass(this, 'animated flipInY')
            }, 2000);
        }).on('mouseleave', function () {
            Dom.removeClass(this, 'animated flipInY')
        })
    }

    /**
     * 右侧导航切换
     * @returns {boolean}
     */
    function switchNavBar() {
        var $rightNav = $('.right-nav');
        if (!$rightNav) return false;
        //绑定父节点，使用事件委托
        $rightNav.on('click', function (e) {
            var target = e.target || e.srcElement;
            switch (target.className) {
                case 'nav-bar idea':
                    scrollTo(135);
                    break;
                case 'nav-bar study':
                    scrollTo(670);
                    break;
                case 'nav-bar life':
                    scrollTo(1255);
                    break;
            }
        })
    }

    function scrollTo(topHeight) {
        $(window).animate({
            scrollTop: topHeight
        }, 0.5, 'easeOut');
    }

    /**
     * 根据高度改变到顶部到底部的背景图片
     */
    function changeScrollImg() {
        $(window).on('scroll', function () {
            var goToBotBtn = $('.go-to-bottom');
            if (!goToBotBtn) return false;
            var toTopHeight = $(window).scrollTop();
            if (toTopHeight > 100) {
                goToBotBtn.addClass('go-to-top');
            } else {
                goToBotBtn.removeClass('go-to-top');
            }
        })
    }

    /**
     * 回到底部
     * @returns {boolean}
     */
    function goToBottom() {
        var goToBottom = $('#go-to-bottom');
        if (!goToBottom) return false;
        goToBottom.on('click', function () {
            if (Dom.hasClass("#go-to-bottom", "go-to-top")) {
                scrollTo(0);
            } else {
                scrollTo(1900)
            }
        })
    }

    /**
     * 提前加载背景大图
     */
    function loadBg(callback){
        window.onload = function(){
            for(var i = 0;i <= 12;i++){
                new Image().src = 'assets/images/bg/'+i+'.jpg';
            }
        };
        (callback && typeof(callback) === "function") && callback();
    }
    /**
     * 背景图定时换肤
     * @returns {boolean}
     */
    function switchBg(){
        var $bg = $('body');
        var imgIndex = 0;
        var imgArray = new Array("0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg","5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg","10.jpg", "11.jpg", "12.jpg");//数组元素个数可调
        if(!$bg) return false;
        setInterval(setBg, 10000);
        function setBg(){
            if (imgIndex > imgArray.length - 1) {
                imgIndex = 0;
              }
            $bg.css('background','url(online-v1/images/bg/'+imgArray[imgIndex]+')');
            imgIndex ++;
        }
    }

    function consoleWarn(){
        console.log("%c%s", "color: red;font-size: 24px;", "安全警告!");
        console.log("%c%s", "color: black; font-size: 18px;", "此浏览器功能专供开发者使用。请不要在此粘贴执行任何内容，这可能会导致您的账户受到攻击，给您带来损失！")
    }

    S.ready(function () {
        init();
    });

});


/**
 * 搜索框placeholder组件
 */
S.use('kg/placeholder/2.0.0/index', function (S, Placeholder) {
    new Placeholder({
        node: '#J-searchinput'
    });
});

/**
 * 焦点图轮播组件
 */
S.use('kg/slide/2.0.2/index', function (S, Slide) {
    new Slide('#JSlide', {
        eventType: 'click',
        navClass: 'scrollable-trigger',
        contentClass: 'scrollable-panel',
        pannelClass: 'scrollable-content',
        selectedClass: 'current',
        triggerSelector: 'a',
        effect: 'fade',
        speed: 1000,
        autoSlide: true//自动播放
    });
});

/**
 * 易书网轮播组件
 */
S.use('kg/slide/2.0.2/index', function (S, Slide) {
    var s = new Slide('#J-book', {
        hoverStop: true,
        eventType: 'mouseover',
        navClass: 'scrollable-trigger',
        contentClass: 'scrollable-panel',
        pannelClass: 'scrollable-content',
        selectedClass: 'current',
        triggerSelector: 'a',
        effect: 'hSlide',
        speed: 1000,
        timeout: 5000,
        triggerDelay: 400,
        invisibleStop: true,
        carousel: true,
        touchmove: true,
        autoSlide: true//自动播放
    });
    S.one('#next1').on('click', function (e) {
        s.next();
        return false;
    });
    S.one('#prev1').on('click', function () {
        s.previous();
    });
});

/**
 * 社会论点轮播组件
 */
S.use('kg/slide/2.0.2/index', function (S, Slide) {
    var s = new Slide('#J-social', {
        eventType: 'click',
        navClass: 'scrollable-trigger',
        contentClass: 'scrollable-panel',
        pannelClass: 'scrollable-content',
        selectedClass: 'current',
        triggerSelector: 'scrollable-content',
        effect: 'hSlide',
        speed: 1000
    });
    S.one('#next2').on('click', function (e) {
        s.next();
        return false;
    });
    S.one('#prev2').on('click', function () {
        s.previous();
    });
});

S.use('kg/datalazyload/2.0.0/index',function(S,DataLazyload){
    new DataLazyload({
        container: '#container'
    });
})


