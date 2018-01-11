/**
 * Created by Xul on 2018/1/11.
 */
var canvas = angular.module('CanvasCtrl', []);

//canvas3D文字控制器
canvas.controller('3DtextCtrl', function ($scope, $location) {
    var canvas;
    var context;
    var focallength;
    var animateRunning;
    $scope.canvasInit = function () {
        canvas = document.getElementById("3Dtext_canvas");
        context = canvas.getContext('2d');
        canvas.setAttribute('width', $(window).get(0).innerWidth * 0.8);
        canvas.setAttribute('height', $(window).get(0).innerHeight *0.7);
        focallength = 250;
        var dots = getimgData(document.getElementById('name').value);
        var pause = false;
        initAnimate();
        function initAnimate() {
            dots.forEach(function () {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * focallength * 2 - focallength;

                this.tx = Math.random() * canvas.width;
                this.ty = Math.random() * canvas.height;
                this.tz = Math.random() * focallength * 2 - focallength;
                this.paint();
            });
            animate();
        }

        //计算帧速率
        var lastTime;
        var derection = true;

        function animate() {
            animateRunning = true;
            var thisTime = +new Date();
            context.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach(function () {
                var dot = this;
                if (derection) {
                    if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
                        dot.x = dot.dx;
                        dot.y = dot.dy;
                        dot.z = dot.dz;
                        if (thisTime - lastTime > 300) derection = false;
                    } else {
                        dot.x = dot.x + (dot.dx - dot.x) * 0.1;
                        dot.y = dot.y + (dot.dy - dot.y) * 0.1;
                        dot.z = dot.z + (dot.dz - dot.z) * 0.1;
                        lastTime = +new Date()
                    }
                }
                else {
                    if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z) < 0.1) {
                        dot.x = dot.tx;
                        dot.y = dot.ty;
                        dot.z = dot.tz;
                        pause = true;
                    } else {
                        dot.x = dot.x + (dot.tx - dot.x) * 0.1;
                        dot.y = dot.y + (dot.ty - dot.y) * 0.1;
                        dot.z = dot.z + (dot.tz - dot.z) * 0.1;
                        pause = false;
                    }
                }
                dot.paint();
            });
            if (!pause) {
                if ("requestAnimationFrame" in window) {
                    requestAnimationFrame(animate);
                }
                else if ("webkitRequestAnimationFrame" in window) {
                    webkitRequestAnimationFrame(animate);
                }
                else if ("msRequestAnimationFrame" in window) {
                    msRequestAnimationFrame(animate);
                }
                else if ("mozRequestAnimationFrame" in window) {
                    mozRequestAnimationFrame(animate);
                }
            }
        }

        document.getElementById('startBtn').onclick = function () {
            if (!pause) return;
            dots = getimgData(document.getElementById('name').value);
            derection = true;
            pause = false;
            initAnimate();
        }
    };

    Array.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback.call(this[i]);
        }
    };

    function getimgData(text) {
        drawText(text);
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        var dots = [];
        for (var x = 0; x < imgData.width; x += 6) {
            for (var y = 0; y < imgData.height; y += 6) {
                var i = (y * imgData.width + x) * 4;
                if (imgData.data[i] >= 128) {
                    var dot = new Dot(x - 3, y - 3, 0, 3);
                    dots.push(dot);
                }
            }
        }
        return dots;
    }

    function drawText(text) {
        context.save();
        context.font = "200px 微软雅黑 bold";
        context.fillStyle = "rgba(168,168,168,1)";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
    }


    var Dot = function (centerX, centerY, centerZ, radius) {
        this.dx = centerX;
        this.dy = centerY;
        this.dz = centerZ;
        this.tx = 0;
        this.ty = 0;
        this.tz = 0;
        this.z = centerZ;
        this.x = centerX;
        this.y = centerY;
        this.radius = radius;
    };
    Dot.prototype = {
        paint: function () {
            context.save();
            context.beginPath();
            var scale = focallength / (focallength + this.z);
            context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
            context.fillStyle = "rgba(50,50,50," + scale + ")";
            context.fill()
            context.restore();
        }
    };
});

//星空控制器
canvas.controller('starCtrl', function ($scope, $location) {
    particlesJS('particles-js', {
        particles: {
            color: '#fff',
            shape: 'circle', // "circle", "edge" or "triangle"
            opacity: 1,
            size: 4,
            size_random: true,
            nb: 150,
            line_linked: {
                enable_auto: true,
                distance: 100,
                color: '#fff',
                opacity: 1,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 1
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 250
            },
            detect_on: 'canvas', // "canvas" or "window"
            mode: 'grab',
            line_linked: {
                opacity: .5
            },
            events: {
                onclick: {
                    enable: true,
                    mode: 'push', // "push" or "remove" (particles)
                    nb: 4
                }
            }
        },
        /* Retina Display Support */
        retina_detect: true
    });
});

//时钟控制器
canvas.controller('clockCtrl', function ($scope, $location) {
    var canvas;
    var context;
    var width;
    var height;
    var r;
    var rem;
    canvas = document.getElementById("clock_canvas");
    canvas.setAttribute('width', $(window).get(0).innerHeight * 0.8);
    canvas.setAttribute('height', $(window).get(0).innerHeight * 0.8);
    context = canvas.getContext('2d');
    height = context.canvas.height;
    width = context.canvas.width;
    r = width / 2;
    rem = width / 200;

    function drawBackground() {
        context.save();
        context.translate(r, r);
        context.beginPath();
        context.lineWidth = rem * 10;
        context.arc(0, 0, r - context.lineWidth / 2, 0, Math.PI * 2, false);
        context.stroke();

        context.font = rem * 18 + 'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        hourNumbers.forEach(function (number, i) {
            var rad = Math.PI * 2 / 12 * i;
            var x = Math.cos(rad) * (r - rem * 30);
            var y = Math.sin(rad) * (r - rem * 30);
            context.fillText(number, x, y);
        });

        for (var i = 0; i < 60; i++) {
            var rad = Math.PI * 2 / 60 * i;
            var x = Math.cos(rad) * (r - rem * 18);
            var y = Math.sin(rad) * (r - rem * 18);
            context.beginPath();
            if (i % 5 == 0) {
                context.fillStyle = '#000';
                context.arc(x, y, rem * 2, 0, Math.PI * 2, false);
            } else {
                context.fillStyle = '#ccc';
                context.arc(x, y, rem * 2, 0, Math.PI * 2, false);
            }
            context.fill();
        }

    }

    function drawHour(hour, minute) {
        context.save();
        context.beginPath();
        var rad = Math.PI * 2 / 12 * hour;
        var mrad = Math.PI * 2 / 12 / 60 * minute;
        context.rotate(rad + mrad);
        context.lineWidth = rem * 6;
        context.lineCap = 'round';
        context.moveTo(0, rem * 10);
        context.lineTo(0, -r / 2);
        context.stroke();
        context.restore();
    }

    function drawMinute(minute) {
        context.save();
        context.beginPath();
        var rad = Math.PI * 2 / 60 * minute;
        context.rotate(rad);
        context.lineWidth = rem * 3;
        context.lineCap = 'round';
        context.moveTo(0, rem * 10);
        context.lineTo(0, -r + rem * 30);
        context.stroke();
        context.restore();
    }

    function drawSecond(second) {
        context.save();
        context.beginPath();
        context.fillStyle = '#c14543';
        var rad = Math.PI * 2 / 60 * second;
        context.rotate(rad);
        context.lineWidth = rem * 3;
        context.lineCap = 'round';
        context.moveTo(-rem * 2, rem * 20);
        context.lineTo(rem * 2, rem * 20);
        context.lineTo(1, -r + rem * 18);
        context.lineTo(-1, -r + rem * 18);
        context.fill();
        context.restore();
    }

    function drawDot() {
        context.beginPath();
        context.fillStyle = '#fff';
        context.arc(0, 0, rem * 3, 0, Math.PI * 2, false);
        context.fill();
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        drawBackground();
        drawHour(hour, minute);
        drawMinute(minute);
        drawSecond(second);
        drawDot();
        context.restore();
    }

    setInterval(draw, 1000);

});

//七巧板控制器
canvas.controller('tangramCtrl', function ($scope, $location) {
    var canvas;
    var context;
    var height;
    var width;
    canvas = document.getElementById('tangram_canvas');
    context = canvas.getContext('2d');
    canvas.setAttribute('width', $(window).get(0).innerHeight *0.8);
    canvas.setAttribute('height', $(window).get(0).innerHeight *0.8);
    height = context.canvas.height;
    width = context.canvas.width;
    //七巧板
    var tangram = [
        {p: [{x: 0, y: 0}, {x: 0, y: 600}, {x: 300, y: 300}], color: "#caff67"},
        {p: [{x: 0, y: 0}, {x: 600, y: 0}, {x: 300, y: 300}], color: "#67becf"},
        {p: [{x: 0, y: 600}, {x: 150, y: 450}, {x: 300, y: 600}], color: "#cf3d61"},
        {p: [{x: 150, y: 450}, {x: 300, y: 300}, {x: 450, y: 450}, {x: 300, y: 600}], color: "#f9f51a"},
        {p: [{x: 300, y: 300}, {x: 450, y: 150}, {x: 450, y: 450}], color: "#a594c0"},
        {p: [{x: 450, y: 150}, {x: 600, y: 0}, {x: 600, y: 300}, {x: 450, y: 450}], color: "#fa8ecc"},
        {p: [{x: 300, y: 600}, {x: 600, y: 300}, {x: 600, y: 600}], color: "#f6ca29"}
    ];

    for (var i = 0; i < tangram.length; i++) {
        context.moveTo(0, 100);
        context.lineTo(100, 100);
        draw(tangram[i], context);
    }

    function draw(piece, context) {
        context.beginPath();
        context.moveTo(piece.p[0].x, piece.p[0].y);
        for (var i = 1; i < piece.p.length; i++) {
            context.lineTo(piece.p[i].x, piece.p[i].y);
        }
        context.closePath();
        context.fillStyle = piece.color;
        context.fill();
    }
});

//倒计时控制器
canvas.controller('countCtrl', function ($scope, $location) {
    var canvas;
    var context;
    canvas = document.getElementById('count_canvas');
    context = canvas.getContext('2d');
    canvas.setAttribute('width', $(window).get(0).innerWidth * 0.8);
    canvas.setAttribute('height', $(window).get(0).innerHeight *0.7);
    var width = context.canvas.width;
    var height = context.canvas.height;
    var radius = (width * 4 / 5 / 108) - 1;
    var margin_top = Math.round(height / 5);
    var margin_left = Math.round(width / 10);
    var endTime = new Date();
    endTime.setTime(endTime.getTime() + 3600 * 1000);
    var curShowTimeSeconds = 0;
    var balls = [];
    var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];
    var texts = ["亚男", "罗师傅", "光毅", "洪挺", "张峻", "老王", "全蛋"];

//    window.onresize = function(){
//        width = $(window).width();
//        height = $(window).height() - 7;
//        radius = (width * 4 / 5 / 108) - 1;
//        margin_top = Math.round(height / 5);
//        margin_left = Math.round(width / 10);
//    };
//
//    $(window).scroll(function(){
//        width = $(window).width();
//        height = $(window).height() - 7;
//        radius = (width * 4 / 5 / 108) - 1;
//        margin_top = Math.round(height / 5);
//        margin_left = Math.round(width / 10);
//    });

    curShowTimeSeconds = getCurShowTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    }, 50)

    function getCurShowTimeSeconds() {
        var curTime = new Date();
        var ret = endTime.getTime() - curTime.getTime();
        ret = Math.round(ret / 1000);
        return ret >= 0 ? ret : 0;
    }

    function update() {
        var nextShowTimeSeconds = getCurShowTimeSeconds();

        var nextHours = parseInt(nextShowTimeSeconds / 3600);
        var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
        var nextSeconds = nextShowTimeSeconds % 60;

        var curHours = parseInt(curShowTimeSeconds / 3600);
        var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
        var curSeconds = curShowTimeSeconds % 60;

        if (nextSeconds != curSeconds) {
            if (parseInt(nextHours / 10) != parseInt(curHours / 10)) {
                addBalls(margin_left, margin_top, parseInt(curHours / 10));
            }
            if (parseInt(nextHours % 10) != parseInt(curHours % 10)) {
                addBalls(margin_left + 15 * (radius + 1), margin_top, parseInt(curHours % 10));
            }
            if (parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
                addBalls(margin_left + 39 * (radius + 1), margin_top, parseInt(curMinutes / 10));
            }
            if (parseInt(nextMinutes % 10) != parseInt(curMinutes % 10)) {
                addBalls(margin_left + 54 * (radius + 1), margin_top, parseInt(curMinutes % 10));
            }
            if (parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
                addBalls(margin_left + 78 * (radius + 1), margin_top, parseInt(curSeconds / 10));
            }
            if (parseInt(nextSeconds % 10) != parseInt(curSeconds % 10)) {
                addBalls(margin_left + 93 * (radius + 1), margin_top, parseInt(curSeconds % 10));
            }
            curShowTimeSeconds = nextShowTimeSeconds;
        }

        updateBalls();
    }

    function updateBalls() {
        for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;

            if (balls[i].y >= height - radius) {
                balls[i].y = height - radius;
                balls[i].vy = -balls[i].vy * 0.75;
            }

//            if(balls[i].x >= width - radius){
//                balls[i].x = width - radius;
//                balls[i].vx = -balls[i].vx * 0.75;
//            }
        }
        var cnt = 0;
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x + radius > 0 && balls[i].x - radius < width) {
                balls[cnt++] = balls[i];
            }
        }
        while (balls.length > cnt) {
            balls.pop();
        }
    }

    function addBalls(x, y, num) {
        for (var i = 0; i < digit[num].length; i++) {
            for (var j = 0; j < digit[num][i].length; j++) {
                if (digit[num][i][j] == 1) {
                    var aBall = {
                        x: x + j * 2 * (radius + 1) + (radius + 1),
                        y: y + i * 2 * (radius + 1) + (radius + 1),
                        g: 1.5 + Math.random(),
                        vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                        vy: -5,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        text: texts[Math.floor(Math.random() * texts.length)]
                    }

                    balls.push(aBall);
                }
            }
        }
    }

    function render(context) {
        context.clearRect(0, 0, width, height);
        var hours = parseInt(curShowTimeSeconds / 3600);
        var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
        var seconds = curShowTimeSeconds % 60;
        renderDigit(margin_top, margin_left, parseInt(hours / 10), context);
        renderDigit(margin_top + (radius + 1) * 15, margin_left, parseInt(hours % 10), context);
        renderDigit(margin_top + (radius + 1) * 30, margin_left, 10, context);
        renderDigit(margin_top + (radius + 1) * 39, margin_left, parseInt(minutes / 10), context);
        renderDigit(margin_top + (radius + 1) * 54, margin_left, parseInt(minutes % 10), context);
        renderDigit(margin_top + (radius + 1) * 69, margin_left, 10, context);
        renderDigit(margin_top + (radius + 1) * 78, margin_left, parseInt(seconds / 10), context);
        renderDigit(margin_top + (radius + 1) * 93, margin_left, parseInt(seconds % 10), context);

        for (var i = 0; i < balls.length; i++) {
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, false);
//            context.fillText(balls[i].text, balls[i].x, balls[i].y);
            context.closePath();
            context.fill();
        }
    }

    function renderDigit(x, y, num, context) {
        context.fillStyle = "rgb(0, 102, 153)";
        for (var i = 0; i < digit[num].length; i++) {
            for (var j = 0; j < digit[num][i].length; j++) {
                if (digit[num][i][j] == 1) {
                    context.beginPath();
                    context.arc(x + j * 2 * (radius + 1) + radius + 1, y + i * 2 * (radius + 1) + radius + 1, radius, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.fill();
                }
            }
        }
    }

});