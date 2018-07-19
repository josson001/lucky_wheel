"use strict";

/*
* @Author: ww
* @Date:   2018-06-14 13:51:43
* @Last Modified by:   ww
* @Last Modified time: 2018-07-19 13:25:57
*/
function rotaryTable(obj) {
	this.el = obj.el;
	this.plateNum = obj.plateNum;
	this.prizeinfor = obj.prizeinfor;
	this.prizeinforrRes = obj.prizeinforrRes;
	this.showPrizeinforr = obj.showPrizeinforr;
	this.plateInside = this.el.querySelector(".plate-inside"); //抽奖按钮
	this.plateOut = this.el.querySelector(".plate-out"); //转盘
	this.prizeResult = "";
	this.end = 0; //结束的位置
	this.flag = true; //点击事件的开关
	this.first_start = 0; //第一次点击开始的度数。第二次点击会重新赋值
	this.step = 3600; //初始旋转的度数
	this.randomAngle = "";
	this.init();
};
rotaryTable.prototype = {
	constructor: rotaryTable,
	init: function init() {
		this.pInside();
		console.log("0000000000000000000000" + this.flag);
	},
	requestData: function requestData() {
		//向后台请求数据
		this.prizeinforrRes();
	},
	pInside: function pInside() {
		var _this = this;

		this.plateInside.onclick = function () {
			_this.randomAngle = _this.plateNum == 6 ? parseInt(Math.random() * 50 + 5) : parseInt(Math.random() * 35 + 5); //随机旋转角度
			console.log(_this.randomAngle);
			console.log(_this.plateNum);
			if (_this.flag) {
				_this.flag = false;
				_this.first_start = _this.first_start + _this.step; //第一次匀速旋转角度
				_this.plateOut.style.transform = "rotate(" + _this.first_start + "deg)";
				_this.requestData();
			}
		};
	},
	rotaryAngle: function rotaryAngle() {
		var _this2 = this;

		//旋转的角度
		this.first_start = this.first_start + this.step;
		this.end = this.first_start + 360 / this.plateNum * this.prizeResult - 180 / this.plateNum + this.randomAngle; //二次旋转角度
		this.plateOut.style.transition = "all cubic-bezier(0.47, 1.01, 1, 1) 6s";
		this.plateOut.style.transform = "rotate(" + this.end + "deg)";
		setTimeout(function () {
			_this2.flag = true;
			_this2.plateOut.style.transition = "all linear 3s";
			console.log(_this2.flag);
			// alert("message");
			console.log(_this2.prizeResult);
			_this2.showPrizeinforr(_this2.prizeResult);
		}, 6000);
	}
	//函数调用
};var rotaryPlate = document.querySelector(".rotary-plate");
var rotary = new rotaryTable({
	el: rotaryPlate, //顶层元素
	plateNum: 6, //转盘分八块或六块
	prizeinfor: ["10M", "20元话费", "mini4", "5元", "30M", "ipone7"], //奖品信息 6块的
	//plateNum:8,//转盘分八块或六块
	//prizeinfor:["iponeX","1.1元","谢谢参与","2.2元","1.8元","30元","谢谢参与","2.8元"],//奖品信息 8块的
	prizeinforrRes: function prizeinforrRes() {
		var _this3 = this;

		setTimeout(function () {
			//模拟向后台发请求
			_this3.prizeResult = 0; //后台返回的产品数据 零是初始位置指的产品
			var xxx = setTimeout(function () {
				_this3.rotaryAngle();
				console.log("xxxxxxx");
			}, 0); // 可以用来做网络不好的错误处理
			// clearTimeout(xxx);
		}, 2000);
	}, //向后端发请求的代码
	showPrizeinforr: function showPrizeinforr(prizeResult) {
		alert(this.prizeinfor[prizeResult]); //在这里写展示产品的信息
	} //产品展示信息
});