var config = [{
        id: 'first-step',
        desc: '我是第一步的说明xxx'
    },
    {
        id: 'second-step',
        desc: '我是第二步的说明yyy'
    },
    {
        id: 'third-step',
        desc: '我是第三步的说明zzz'
    }
];


function getElementById(id) {
    return document.getElementById(id);
};

function mask(params) {
    var mask = getElementById('mask');

    if (params.length === 0) {
        mask.style.display = 'none';
        return;
    }

    var {
        id,
        desc
    } = params[0];

    /****************   获取要cover的元素基本信息   ****************/
    var ele = getElementById(id);
    var offsetWidth = ele.offsetWidth;
    var offsetHeight = ele.offsetHeight;
    var offsetLeft = ele.offsetLeft;
    var offsetTop = ele.offsetTop;

    var clientHeight = ele.clientHeight;

    console.log(offsetWidth, offsetHeight, offsetLeft, offsetTop, clientHeight);

    /****************   获取屏幕大小，包含滚动区域   ****************/
    var scrollWidth = document.body.scrollWidth;
    var scrollHeight = document.body.scrollHeight;

    console.log(scrollWidth, scrollHeight);

    /****************   为Mask设置css   ****************/
    mask.style.width = offsetWidth + 'px';
    mask.style.height = offsetHeight + 'px';
    mask.style.borderColor = "rgba(0, 0, 0, 0.6)";
    mask.style.borderStyle = 'solid';
    mask.style.borderLeftWidth = offsetLeft - 7 + 'px';
    mask.style.borderRightWidth = (scrollWidth - offsetWidth - offsetLeft) + 'px';
    mask.style.borderTopWidth = offsetTop + 'px';
    mask.style.borderBottomWidth = (scrollHeight + offsetHeight) + 'px';
    mask.style.position = 'absolute';
    mask.style.left = 0;
    mask.style.top = 0;

    /****************   为Mask-tip设置定位   ****************/
    var maskTip = getElementById('mask-tip');
    var tipWidth = maskTip.offsetWidth;
    maskTip.style.top = offsetHeight + 10 + 'px';
    maskTip.style.left = offsetWidth / 2 - tipWidth / 2 + 'px';


    /****************   为Mask设置desc   ****************/
    var maskDesc = getElementById('mask-desc');
    maskDesc.innerHTML = desc;

    /****************   绑定next事件   ****************/
    var nextBtn = getElementById('mask-next');
    (function (mask) {
        nextBtn.onclick = function () {
            params.shift();
            mask(params);
        };
    })(arguments.callee);
};

mask(config);