####定义canvas绘制环境
```
var canvas = document.getElementById('canvas');
if (canvas.getContext('2d')) {
	var context = canvas.getContext('2d');
}else{
	alert('不支持canvas');
};
```
####线条API
context.moveTo(x,y);<br/>
context.lineTo(x,y);<br/>
context.lineWidth = num;<br/>
context.strokeStyle = 'color';//线条颜色<br/>
context.fillStyle = 'color';//填充颜色<br/>
context.stroke();//绘制<br/>
context.fill();//填充闭合区域<br/>
context.beginPath();context.closePath();闭合工作区
####弧线API
```context.arc(conterX,
			   conterY,//圆心位置;
			   radius,//半径;
			   staringAngle,//起始弧度;
				endingAngle,//终止弧度;
				anticlockwise = false//是否逆时针;)
```


