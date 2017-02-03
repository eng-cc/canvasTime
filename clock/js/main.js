var cw = document.body.clientWidth*0.99;
var ch = document.body.clientHeight*0.98;
var littleArcR = Math.round(cw*4/5/108)-1;
var marginTop = Math.round(ch/10);
var marginLeft = Math.round(cw/10);
//var endTime = new Date(/*2015, 7, 25, 11, 11, 11*/);
//endTime.setTime(endTime.getTime()+3600*1000);
var showTimeSeconds = 0;
var balls = [];
var colors = ["#33b5e5", "#0099cc", "#aa66cc", "#9933cc", "#99cc00", "#669900", "#ffbb33", "#ff8800", "#ff4444", "#cc0000"];


window.onload = function() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext('2d')) {
        var context = canvas.getContext('2d');
    } else {
        alert('不支持canvas');
    };
    canvas.width = cw;
    canvas.height = ch;

    showTimeSeconds = getShowTimeSeconds();

    setInterval(function() {
        render(context);
        update();
    }, 50);;
};

var render = function(cxt) {
    cxt.clearRect(0, 0, cw, ch)

    var hours = parseInt(showTimeSeconds / 3600);
    var minutes = parseInt((showTimeSeconds - hours * 3600) / 60);
    var seconds = showTimeSeconds % 60;



    renderDigit(marginLeft, marginTop, parseInt(hours / 10), cxt);
    renderDigit(marginLeft + 15 * (littleArcR + 1), marginTop, parseInt(hours % 10), cxt);
    renderDigit(marginLeft + 30 * (littleArcR + 1), marginTop, 10, cxt);

    renderDigit(marginLeft + 39 * (littleArcR + 1), marginTop, parseInt(minutes / 10), cxt);
    renderDigit(marginLeft + 54 * (littleArcR + 1), marginTop, parseInt(minutes % 10), cxt);
    renderDigit(marginLeft + 69 * (littleArcR + 1), marginTop, 10, cxt);

    renderDigit(marginLeft + 78 * (littleArcR + 1), marginTop, parseInt(seconds / 10), cxt);
    renderDigit(marginLeft + 93 * (littleArcR + 1), marginTop, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, littleArcR, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    };
};

var renderDigit = function(x, y, num, cxt) {
    cxt.fillStyle = 'rgb(0,102,153)';
    var R = littleArcR;

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var centerX = x + j * 2 * (R + 1) + (R + 1);
                var centerY = y + i * 2 * (R + 1) + (R + 1);
                cxt.beginPath();
                cxt.arc(centerX, centerY, R, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            };
        };
    };
};


var getShowTimeSeconds = function() {
    var curTime = new Date();
    var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();

    return ret ;
};


var update = function() {
    var nextShowTime = getShowTimeSeconds();

    var nextHours = parseInt(nextShowTime / 3600);
    var nextMinutes = parseInt((nextShowTime - nextHours * 3600) / 60);
    var nextSeconds = nextShowTime % 60;

    var curHours = parseInt(showTimeSeconds / 3600);
    var curMinutes = parseInt((showTimeSeconds - curHours * 3600) / 60);
    var curSeconds = showTimeSeconds % 60;
    if (nextSeconds != curSeconds) {

        if (parseInt(nextHours / 10) != parseInt(curHours / 10)) {
            addBall(marginLeft, marginTop, parseInt(curHours / 10))
        };
        if (parseInt(nextHours % 10) != parseInt(curHours % 10)) {
            addBall(marginLeft + 15 * (littleArcR + 1), marginTop, parseInt(curHours % 10))
        };

        if (parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
            addBall(marginLeft + 39 * (littleArcR + 1), marginTop, parseInt(curMinutes / 10))
        };
        if (parseInt(nextMinutes % 10) != parseInt(curMinutes % 10)) {
            addBall(marginLeft + 54 * (littleArcR + 1), marginTop, parseInt(curMinutes % 10))
        };

        if (parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
            addBall(marginLeft + 78 * (littleArcR + 1), marginTop, parseInt(curSeconds / 10))
        };
        if (parseInt(nextSeconds % 10) != parseInt(curSeconds % 10)) {
            addBall(marginLeft + 93 * (littleArcR + 1), marginTop, parseInt(curSeconds % 10))
        };

        showTimeSeconds = nextShowTime;
    };
    updateBalls();
};

var addBall = function(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var R = littleArcR;
                var centerX = x + j * 2 * (R + 1) + (R + 1);
                var centerY = y + i * 2 * (R + 1) + (R + 1);

                var aBall = {
                    x: centerX,
                    y: centerY,
                    g: 1.0 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5 + Math.random(),
                    color: colors[Math.floor(Math.random() * colors.length)]
                };

                balls.push(aBall);
            };
        };
    };console.log(balls.length);
};


var updateBalls = function() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;


        if (balls[i].y >= ch - littleArcR) {
            balls[i].y = ch - littleArcR;
            balls[i].vy = -balls[i].vy * 0.75;
        };
        /*if (balls[i].x >= cw - littleArcR) {
            balls[i].x = cw - littleArcR;
            balls[i].vx = -balls[i].vx;
        };*/
    };

    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + littleArcR > 0 && balls[i].x - littleArcR < cw) {
        	balls[cnt++] = balls[i];
        };
    };

    while(balls.length>Math.min(600,cnt)){
    	balls.pop();
    };
};
