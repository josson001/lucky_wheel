# lucky_wheel
HTML5大转盘抽奖，原生js支持es6转es和编译sass
函数的调用
```
var rotaryPlate = document.querySelector(".rotary-plate");//函数调用
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
```
