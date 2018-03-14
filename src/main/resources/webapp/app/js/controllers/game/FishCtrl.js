/**
 * Created by Xul on 2018/1/11.
 */
var fish = angular.module('FishCtrl', []);

/**
 * 爱心鱼场景控制器
 */
fish.controller('fishCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
    var canvasA;
    var contextA;
    var canvasB;
    var contextB;
    var width;
    var height;
    var ane;
    var fruit;
    var mom;
    var momTail = [];
    var momEye = [];
    var momBodyOrange = [];
    var momBodyBlue = [];
    var baby;
    var babyTail = [];
    var babyEye = [];
    var babyBody = [];
    var data;
    var wave;
    var halo;
    var dust;
    var dustPic = [];
    var mx;
    var my;
    var lastTime;
    var deltaTime;

    //游戏加载主方法
    var game = function () {
        init();
        gameloop();
    };
    //初始化
    var init = function () {
        //获取canvas对象
        canvasA = document.getElementById('canvas_front');
        contextA = canvasA.getContext('2d');
        canvasB = document.getElementById('canvas_behind');
        contextB = canvasB.getContext('2d');
        width = contextB.canvas.width;
        height = contextB.canvas.height;
        contextA.font = "30px Verdana";
        contextA.textAlign = "center";
        //初始化帧刷新间隔时间
        lastTime = Date.now();
        deltaTime = 0;
        //初始化鼠标坐标，并监听鼠标移动事件
        mx = width * 0.5;
        my = height * 0.5;
        canvasA.addEventListener('mousemove', onMouseMove, false);
        //绘制背景
        drawBackGround();
        //初始化海葵
        ane = new aneObj();
        ane.init();
        //初始化果实
        fruit = new fruitObj();
        fruit.init();
        //初始化大鱼
        mom = new momObj();
        mom.init();
        //初始化小鱼
        baby = new babyObj();
        baby.init();
        //初始化计分板
        data = new dataObj();
        //初始化吃果实涟漪
        wave = new waveObj();
        wave.init();
        //初始化鱼碰撞涟漪
        halo = new haloObj();
        halo.init();
        //初始化漂浮物
        dust = new dustObj();
        dust.init();
        //初始化动效图片
        for (var i = 0; i < 8; i++) {
            babyTail[i] = new Image();
            babyTail[i].src = "img/game/fish/babyTail" + i + ".png";
        }
        for (var i = 0; i < 2; i++) {
            babyEye[i] = new Image();
            babyEye[i].src = "img/game/fish/babyEye" + i + ".png";
        }
        for (var i = 0; i < 20; i++) {
            babyBody[i] = new Image();
            babyBody[i].src = "img/game/fish/babyFade" + i + ".png";
        }
        for (var i = 0; i < 8; i++) {
            momTail[i] = new Image();
            momTail[i].src = "img/game/fish/bigTail" + i + ".png";
        }
        for (var i = 0; i < 2; i++) {
            momEye[i] = new Image();
            momEye[i].src = "img/game/fish/bigEye" + i + ".png";
        }
        for (var i = 0; i < 8; i++) {
            momBodyOrange[i] = new Image();
            momBodyBlue[i] = new Image();
            momBodyOrange[i].src = "img/game/fish/bigSwim" + i + ".png";
            momBodyBlue[i].src = "img/game/fish/bigSwimBlue" + i + ".png";
        }
        for (var i = 0; i < 7; i++) {
            dustPic[i] = new Image();
            dustPic[i].src = "img/game/fish/dust" + i + ".png";
        }
    };
    //帧刷新
    var gameloop = function () {
        //根据机器性能帧刷新
        window.requestAnimFrame(gameloop);
        //计算帧刷新间隔时间
        var now = Date.now();
        deltaTime = now - lastTime;
        lastTime = now;
        if (deltaTime > 40) deltaTime = 40;
        //画背景
        drawBackGround();
        //画海葵
        ane.draw();
        //开启果实消失监控
        fruitMonitor();
        //画果实
        fruit.draw();
        //清除屏幕
        contextA.clearRect(0, 0, width, height);
        //画大鱼
        mom.draw();
        //大鱼果实碰撞检测
        momFruitCollision();
        //大鱼小鱼碰撞检测
        momBabyCollision();
        //画小鱼
        baby.draw();
        //画计分板
        data.draw();
        //画吃果实涟漪
        wave.draw();
        //画鱼碰撞涟漪
        halo.draw();
        //画漂浮物
        dust.draw();
    };
    var onMouseMove = function (e) {
        if (!data.gameOver) {
            if (e.offsetX || e.layerX) {
                mx = e.offsetX === undefined ? e.layerX : e.offsetX;
                my = e.offsetY === undefined ? e.layerY : e.offsetY;
                console.log(mx +":" +my);
            }
        }
    };
    //画背景
    var drawBackGround = function () {
        var background = new Image();
        background.src = "img/game/fish/background.jpg";
        contextB.drawImage(background, 0, 0, width, height);
    };
    //画海葵
    var aneObj = function () {
        this.rootx = [];
        this.headx = [];
        this.heady = [];
        this.amp = [];
        this.alpha = 0;
    };
    aneObj.prototype.init = function () {
        aneObj.prototype.num = 50;
        for (var i = 0; i < this.num; i++) {
            this.rootx[i] = i * 16 + Math.random() * 20;
            this.headx[i] = this.rootx[i];
            this.heady[i] = height - 250 + Math.random() * 50;
            this.amp[i] = Math.random() * 50 + 70;
        }
    };
    aneObj.prototype.draw = function () {
        this.alpha += deltaTime * 0.0008;
        var l = Math.sin(this.alpha);
        contextB.save();
        contextB.globalAlpha = 0.6;
        contextB.lineWidth = 20;
        contextB.lineCap = "round";
        contextB.strokeStyle = "#3b154e";
        for (var i = 0; i < this.num; i++) {
            contextB.beginPath();
            contextB.moveTo(this.rootx[i], height);
            this.headx[i] = this.rootx[i] + l * this.amp[i];
            contextB.quadraticCurveTo(this.rootx[i], height - 100, this.headx[i], this.heady[i]);
            contextB.stroke();
        }
        contextB.restore();
    };
    //画果实
    var fruitObj = function () {
        this.alive = [];
        this.x = [];
        this.y = [];
        this.l = [];
        this.aneNo = [];
        this.spd = [];
        this.fruitType = [];
        this.orange = new Image();
        this.blue = new Image();
    };
    fruitObj.prototype.init = function () {
        fruitObj.prototype.num = 30;
        this.orange.src = "img/game/fish/fruit.png";
        this.blue.src = "img/game/fish/blue.png";
        for (var i = 0; i < this.num; i++) {
            this.alive[i] = false;
            this.x[i] = 0;
            this.y[i] = 0;
            this.aneNo[i] = 0;
            this.spd[i] = Math.random() * 0.017 + 0.003;
            this.fruitType[i] = "";
            this.born(i);
        }
    };
    fruitObj.prototype.draw = function () {
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                if (this.l[i] <= 14) {
                    this.x[i] = ane.headx[this.aneNo[i]];
                    this.y[i] = ane.heady[this.aneNo[i]];
                    this.l[i] += this.spd[i] * deltaTime;
                } else {
                    this.y[i] -= this.spd[i] * 7 * deltaTime;
                }
                if (this.fruitType[i] === "blue") {
                    var pic = this.blue;
                } else if (this.fruitType[i] === "orange") {
                    var pic = this.orange;
                }
                contextB.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
                if (this.y[i] < 10) {
                    this.alive[i] = false;
                }
            }
        }
    };
    fruitObj.prototype.born = function (i) {
        this.aneNo[i] = Math.floor(Math.random() * ane.num);
        this.l[i] = 0;
        this.alive[i] = true;
        var ran = Math.random();
        if (ran < 0.2) {
            this.fruitType[i] = "blue";
        } else {
            this.fruitType[i] = "orange";
        }
    };
    fruitObj.prototype.dead = function (i) {
        this.alive[i] = false;
    }
    var fruitMonitor = function () {
        var num = 0;
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) num++;
        }
        if (num < 15) {
            sendFruit();
            return;
        }
    };
    var sendFruit = function () {
        for (var i = 0; i < fruit.num; i++) {
            if (!fruit.alive[i]) {
                fruit.born(i);
                return;
            }
        }
    };
    //画大鱼
    var momObj = function () {
        this.x;
        this.y;
        this.angle;
        this.momTailTimer = 0;
        this.momTailCount = 0;
        this.momEyeTimer = 0;
        this.momEyeCount = 0;
        this.momEyeInteval = 1000;
        this.momBodyCount = 0;
    };
    momObj.prototype.init = function () {
        this.x = width * 0.5;
        this.y = height * 0.5;
        this.angle = 0;
    };
    momObj.prototype.draw = function () {
        //计算趋向坐标
        this.x = lerpDistance(mx, this.x, 0.99);
        this.y = lerpDistance(my, this.y, 0.99);
        //计算趋向角度
        var deltaY = my - this.y;
        var deltaX = mx - this.x;
        var beta = Math.atan2(deltaY, deltaX) + Math.PI;
        this.angle = lerpAngle(beta, this.angle, 0.6);
        //大鱼尾巴动效
        this.momTailTimer += deltaTime;
        if (this.momTailTimer > 50) {
            this.momTailCount = (mom.momTailCount + 1) % 8;
            this.momTailTimer %= 50;
        }
        //大鱼眼睛动效
        this.momEyeTimer += deltaTime;
        if (this.momEyeTimer > this.momEyeInteval) {
            this.momEyeCount = (this.momEyeCount + 1) % 2;
            this.momEyeTimer %= this.momEyeInteval;
            if (this.momEyeCount == 0) {
                this.momEyeInteval = Math.random() * 1500 + 2000;
            } else if (this.momEyeCount == 1) {
                this.momEyeInteval = 200;
            }
            this.momTailTimer
        }
        //画大鱼
        contextA.save();
        contextA.translate(this.x, this.y);
        contextA.rotate(this.angle);
        var momTailCount = this.momTailCount;
        contextA.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
        var momBodyCount = this.momBodyCount;
        if (data.double === 1) {
            contextA.drawImage(momBodyOrange[momBodyCount], -momBodyOrange[momBodyCount].width * 0.5, -momBodyOrange[momBodyCount].height * 0.5);
        } else if (data.double === 2) {
            contextA.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
        }
        var momEyeCount = this.momEyeCount;
        contextA.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
        contextA.restore();
    };
    var momFruitCollision = function () {
        if (!data.gameOver) {
            for (var i = 0; i < fruit.num; i++) {
                if (fruit.alive[i]) {
                    var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                    if (l < 900) {
                        fruit.dead(i);
                        data.fruitNum++;
                        mom.momBodyCount++;
                        if (mom.momBodyCount > 7) {
                            mom.momBodyCount = 7;
                        }
                        if (fruit.fruitType[i] === "blue") {
                            data.double = 2;
                        }
                        wave.born(fruit.x[i], fruit.y[i]);
                    }
                }
            }
        }
    };
    var momBabyCollision = function () {
        if (data.fruitNum > 0 && !data.gameOver) {
            var l = calLength2(mom.x, mom.y, baby.x, baby.y);
            if (l < 900) {
                baby.babyBodyCount = 0;
                mom.momBodyCount = 0;
                data.addScore();
                halo.born(baby.x, baby.y);
            }
        }
    };
    //画小鱼
    var babyObj = function () {
        this.x;
        this.y;
        this.angle;
        this.babyTailTimer = 0;
        this.babyTailCount = 0;
        this.babyEyeTimer = 0;
        this.babyEyeCount = 0;
        this.babyEyeInterval = 1000;
        this.babyBodyTimer = 0;
        this.babyBodyCount = 0;
    };
    babyObj.prototype.init = function () {
        this.x = width * 0.5 - 50;
        this.y = height * 0.5 - 50;
        this.angle = 0;
    };
    babyObj.prototype.draw = function () {
        //计算趋向坐标
        this.x = lerpDistance(mom.x, this.x, 0.98);
        this.y = lerpDistance(mom.y, this.y, 0.98);
        //计算趋向角度
        var deltaY = mom.y - this.y;
        var deltaX = mom.x - this.x;
        var beta = Math.atan2(deltaY, deltaX) + Math.PI;
        this.angle = lerpAngle(beta, this.angle, 0.6);
        //小鱼尾巴动效
        this.babyTailTimer += deltaTime;
        if (this.babyTailTimer > 50) {
            this.babyTailCount = (this.babyTailCount + 1) % 8;
            this.babyTailTimer %= 50;
        }
        //小鱼眼睛动效
        this.babyEyeTimer += deltaTime;
        if (this.babyEyeTimer > this.babyEyeInterval) {
            this.babyEyeCount = (this.babyEyeCount + 1) % 2;
            this.babyEyeTimer %= this.babyEyeInterval;
            if (this.babyEyeCount === 0) {
                this.babyEyeInterval = Math.random() * 1500 + 2000;
            } else if (this.babyEyeCount === 1) {
                this.babyEyeInterval = 200;
            }
        }
        //小鱼身体动效
        this.babyBodyTimer += deltaTime;
        if (this.babyBodyTimer > 300) {
            this.babyBodyCount = this.babyBodyCount + 1;
            this.babyBodyTimer %= 300;
            if (this.babyBodyCount > 19) {
                this.babyBodyCount = 19;
                data.gameOver = true;
            }
        }
        //画小鱼
        contextA.save();
        contextA.translate(this.x, this.y);
        contextA.rotate(this.angle);
        var babyTailCount = this.babyTailCount;
        contextA.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
        var babyBodyCount = this.babyBodyCount;
        contextA.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
        var babyEyeCount = this.babyEyeCount;
        contextA.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
        contextA.restore();
    };
    //画计分板
    var dataObj = function () {
        this.fruitNum = 0;
        this.double = 1;
        this.score = 0;
        this.gameOver = false;
        this.alpha = 0;
    };
    dataObj.prototype.draw = function () {
        contextA.save();
        contextA.shadowBlur = 10;
        contextA.shadowColor = "white";
        contextA.fillStyle = "white";
        contextA.fillText("SCORE: " + this.score, width * 0.5, height - 20)
        if (this.gameOver) {
            this.alpha += deltaTime * 0.0005;
            if (this.alpha > 1) {
                this.alpha = 1;
            }
            contextA.fillStyle = "rgba(255, 255, 255," + this.alpha + ")";
            contextA.fillText("GAMEOVER", width * 0.5, height * 0.5);
        }
        contextA.restore();
    };
    dataObj.prototype.addScore = function () {
        this.score += this.fruitNum * 100 * this.double;
        this.fruitNum = 0;
        this.double = 1;
    };
    //画吃果实涟漪
    var waveObj = function () {
        this.x = [];
        this.y = [];
        this.alive = [];
        this.r = [];
    };
    waveObj.prototype.init = function () {
        waveObj.prototype.num = 10;
        for (var i = 0; i < this.num; i++) {
            this.alive[i] = false;
            this.r[i] = 0;
        }
    };
    waveObj.prototype.draw = function () {
        contextA.save();
        contextA.lineWidth = 2;
        contextA.shadowBlur = 10;
        contextA.shadowColor = "white";
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                this.r[i] += deltaTime * 0.04;
                if (this.r[i] > 50) {
                    this.alive[i] = false;
                    break;
                }
                var alpha = 1 - this.r[i] / 50;
                contextA.strokeStyle = "rgba(255, 255, 255," + alpha + ")";
                contextA.beginPath();
                contextA.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
                contextA.stroke();
                contextA.closePath();
            }
        }
        contextA.restore();
    };
    waveObj.prototype.born = function (x, y) {
        for (var i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.alive[i] = true;
                this.r[i] = 10;
                this.x[i] = x;
                this.y[i] = y;
                return;
            }
        }
    };
    //画鱼碰撞涟漪
    var haloObj = function () {
        this.x = [];
        this.y = [];
        this.alive = [];
        this.r = [];
    };
    haloObj.prototype.init = function () {
        haloObj.prototype.num = 5;
        for (var i = 0; i < this.num; i++) {
            this.x[i] = 0;
            this.y[i] = 0;
            this.alive[i] = false;
            this.r[i] = 0;
        }
    };
    haloObj.prototype.draw = function () {
        contextA.save();
        contextA.lineWidth = 2;
        contextA.shadowBlur = 10;
        contextA.shadowColor = "rgba(203, 91, 0, \" + alpha + \" )";
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                this.r[i] += deltaTime * 0.05;
                if (this.r[i] > 100) {
                    this.alive[i] = false;
                    break;
                }
                var alpha = 1 - this.r[i] / 100;
                contextA.beginPath();
                contextA.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
                contextA.closePath();
                contextA.strokeStyle = "rgba(203, 91, 0, " + alpha + " )";
                contextA.stroke();
            }
        }
        contextA.restore();
    };
    haloObj.prototype.born = function (x, y) {
        for (var i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.x[i] = x;
                this.y[i] = y;
                this.r[i] = 10;
                this.alive[i] = true;
            }
        }
    };
    //画漂浮物
    var dustObj = function () {
        this.x = [];
        this.y = [];
        this.amp = [];
        this.no = [];
        this.alpha = [];
    };
    dustObj.prototype.init = function () {
        dustObj.prototype.num = 30;
        for (var i = 0; i < this.num; i++) {
            this.x[i] = Math.random() * width;
            this.y[i] = Math.random() * height;
            this.amp[i] = 20 + Math.random() * 25;
            this.no[i] = Math.floor(Math.random() * 7);
        }
        this.alpha = 0;
    };
    dustObj.prototype.draw = function () {
        this.alpha += deltaTime * 0.0008;
        var l = Math.sin(this.alpha);
        for (var i = 0; i < this.num; i++) {
            var no = this.no[i];
            contextA.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
        }
    };
    //默认加载主程序
    game();
});