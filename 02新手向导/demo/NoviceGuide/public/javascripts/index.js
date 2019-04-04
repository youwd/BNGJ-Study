var config = [
  // {
  //   id: "first-step",
  //   desc: "我是第一步的说明xxx"
  // },
  // {
  //   id: "second-step",
  //   desc: "我是第二步的说明yyy"
  // },
  {
    id: "third-step",
    desc: "此为显示xxxxxxxxxx的内容"
  }
];

$(function() {
  $(".mask-tip").Tdrag({
    cbStart: function() {}, //移动前的回调函数
    cbMove: function() {}, //移动中的回调函数
    cbEnd: function() {
      // console.log($("#mask-tip").position().top);
      // console.log($("#mask-tip").position().left);
    } //移动结束时候的回调函数
  });
  $("#mask-tip1").Tdrag({
   cbStart: function() {}, //移动前的回调函数
   cbMove: function() {}, //移动中的回调函数
   cbEnd: function() {
     // console.log($("#mask-tip").position().top);
     // console.log($("#mask-tip").position().left);
   } //移动结束时候的回调函数
 });
});

function getElementById(id) {
  return document.getElementById(id);
}

function mask(params) {
  var mask = getElementById("mask");
  mask.style.display = "block";
  if (params.length === 0) {
    mask.style.display = "none";
    return;
  }

  var { id, desc } = params[0];

  /****************   获取要cover的元素基本信息   ****************/
  var ele = getElementById(id);
  var offsetWidth = ele.offsetWidth;
  var offsetHeight = ele.offsetHeight;
  var offsetLeft = ele.offsetLeft;
  var offsetTop = ele.offsetTop;

  var clientHeight = ele.clientHeight;

  // console.log(offsetWidth, offsetHeight, offsetLeft, offsetTop, clientHeight);

  /****************   获取屏幕大小，包含滚动区域   ****************/
  // var scrollWidth = document.body.scrollWidth;
  // var scrollHeight = document.body.scrollHeight;
  var scrollWidth = getElementById("content").offsetWidth;
  var scrollHeight = getElementById("content").offsetHeight;

  console.log(scrollWidth, scrollHeight);

  /****************   为Mask设置css   ****************/
  mask.style.width = offsetWidth + "px";
  mask.style.height = offsetHeight + "px";
  mask.style.borderColor = "rgba(0, 0, 0, 0.6)";
  mask.style.borderStyle = "solid";
  mask.style.borderLeftWidth = offsetLeft + "px";
  mask.style.borderRightWidth = scrollWidth - offsetWidth + 40 + "px";
  mask.style.borderTopWidth = offsetTop + "px";
  mask.style.borderBottomWidth = scrollHeight - offsetHeight - offsetTop + "px";
  mask.style.position = "absolute";
  mask.style.left = 0;
  mask.style.top = 0;

  /****************   绑定next事件   ****************/
  // var nextBtn = getElementById("mask-next");
  // (function(mask) {
  //   nextBtn.onclick = function() {
  //     params.shift();
  //     mask(params);
  //   };
  // })(arguments.callee);
}

// mask(config);

function clickSelect() {
  mask(config);
}

function show(A) {
  var { id, desc } = config[0];
  // console.log(A)
  /****************   获取要cover的元素基本信息   ****************/
  var ele = getElementById(id);
  var offsetWidth = ele.offsetWidth;
  var offsetHeight = ele.offsetHeight;
  /****************   为Mask-tip设置定位   ****************/
  var maskTip = getElementById("mask-tip");
  maskTip.style.display = "block";
  var tipWidth = maskTip.offsetWidth;
  maskTip.style.top = offsetHeight + 10 + "px";
  maskTip.style.left = offsetWidth / 2 - tipWidth / 2 + "px";

  /****************   为Mask设置desc   ****************/
  // var maskDesc = getElementById("mask-desc");
  // maskDesc.innerHTML = desc;
}

function show1(A) {
 var { id, desc } = config[0];
 // console.log(A)
 /****************   获取要cover的元素基本信息   ****************/
 var ele = getElementById(id);
 var offsetWidth = ele.offsetWidth;
 var offsetHeight = ele.offsetHeight;
 /****************   为Mask-tip设置定位   ****************/
 var maskTip = getElementById("mask-tip1");
 maskTip.style.display = "block";
 var tipWidth = maskTip.offsetWidth;
 maskTip.style.top = offsetHeight + 10 + "px";
 maskTip.style.left = offsetWidth / 2 - tipWidth / 2 + "px";

 /****************   为Mask设置desc   ****************/
 // var maskDesc = getElementById("mask-desc1");
 // maskDesc.innerHTML = '退出新手引导';
}


function show2(A) {
 var { id, desc } = config[0];
 // console.log(A)
 /****************   获取要cover的元素基本信息   ****************/
 var ele = getElementById(id);
 var offsetWidth = ele.offsetWidth;
 var offsetHeight = ele.offsetHeight;
 /****************   为Mask-tip设置定位   ****************/
 var maskTip = getElementById("mask-tip2");
 maskTip.style.display = "block";
 var tipWidth = maskTip.offsetWidth;
 maskTip.style.top = offsetHeight + 10 + "px";
 maskTip.style.left = offsetWidth / 2 - tipWidth / 2 + "px";

}



function cancle() {
  var mask = getElementById("mask");
  var maskTip = getElementById("mask-tip");
  var maskTip1 = getElementById("mask-tip1");
  maskTip.style.display = "none";
  maskTip1.style.display = "none";
  mask.style.display = "none";
}

function next(){
 document.getElementById("a-next").click();
}

function edit(){

}
