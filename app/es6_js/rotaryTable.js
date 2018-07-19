/*
* @Author: ww
* @Date:   2018-06-14 13:51:43
* @Last Modified by:   ww
* @Last Modified time: 2018-07-19 13:25:57
*/
function rotaryTable (obj){
	this.el = obj.el;
	this.plateNum =obj.plateNum;
	this.prizeinfor = obj.prizeinfor;
	this.prizeinforrRes = obj.prizeinforrRes; 
	this.showPrizeinforr = obj.showPrizeinforr;
	this.plateInside = this.el.querySelector(".plate-inside");//抽奖按钮
	this.plateOut = this.el.querySelector(".plate-out");//转盘
	this.prizeResult= ""; 
	this.end = 0;//结束的位置
	this.flag = true;//点击事件的开关
	this.first_start = 0;//第一次点击开始的度数。第二次点击会重新赋值
	this.step = 3600;//初始旋转的度数
	this.randomAngle = "";
	this.init();
};
rotaryTable.prototype={
	constructor :rotaryTable,
	init:function(){
		this.pInside();
		console.log("0000000000000000000000"+this.flag);
	},
	requestData:function(){
		//向后台请求数据
		this.prizeinforrRes()
		
	},
	pInside:function(){
		this.plateInside.onclick=()=>{
			this.randomAngle = this.plateNum ==6? parseInt(Math.random()*50+5):parseInt(Math.random()*35+5);//随机旋转角度
			console.log(this.randomAngle);
			console.log(this.plateNum)
			if(this.flag){
				this.flag= false;
				this.first_start = this.first_start+this.step;//第一次匀速旋转角度
				this.plateOut.style.transform="rotate("+this.first_start+"deg)";
				this.requestData();
			}
		}
	},
	rotaryAngle:function(){
		//旋转的角度
		this.first_start = this.first_start+this.step;
		this.end = this.first_start+360/this.plateNum*this.prizeResult-180/this.plateNum +this.randomAngle;//二次旋转角度
		this.plateOut.style.transition="all cubic-bezier(0.47, 1.01, 1, 1) 6s";
		this.plateOut.style.transform="rotate("+this.end+"deg)";
		setTimeout(()=>{
			this.flag= true;
			this.plateOut.style.transition="all linear 3s";
			console.log(this.flag);
			// alert("message");
			console.log(this.prizeResult);
			this.showPrizeinforr(this.prizeResult);
		
			
		}, 6000)
	}
}
//函数调用
var rotaryPlate = document.querySelector(".rotary-plate"); 
 var  rotary = new rotaryTable({
 	el:rotaryPlate,//顶层元素
 	plateNum:6,//转盘分八块或六块
 	prizeinfor:["10M","20元话费","mini4","5元","30M","ipone7"],//奖品信息 6块的
 	//plateNum:8,//转盘分八块或六块
 	//prizeinfor:["iponeX","1.1元","谢谢参与","2.2元","1.8元","30元","谢谢参与","2.8元"],//奖品信息 8块的
 	prizeinforrRes:function(){
 		setTimeout(()=>{//模拟向后台发请求
 			this.prizeResult = 0;//后台返回的产品数据 零是初始位置指的产品
 			var xxx=setTimeout(()=>{
 				this.rotaryAngle();	
 				console.log("xxxxxxx");
 			},0)// 可以用来做网络不好的错误处理
 			// clearTimeout(xxx);
 		}, 2000)
 	},//向后端发请求的代码
 	showPrizeinforr:function(prizeResult){
 			alert(this.prizeinfor[prizeResult])//在这里写展示产品的信息
 	}//产品展示信息
 });

