/**
 * Created by Xul on 2017/4/27.
 */
var mineworld = angular.module('MineWorldCtrl', []);

//我的世界主页控制器
mineworld.controller('mineworldCtrl', function ($scope, $location) {
    $scope.gotomine = function (name) {
        $location.url("/mine");
    }
    $scope.gotomine2 = function (name) {
        $location.url("/mine2");
    }
    $scope.gotomine3 = function (name) {
        $location.url("/mine3");
    }
    $scope.gotomine4 = function (name) {
        $location.url("/mine4");
    }
    $scope.gotomine5 = function (name) {
        $location.url("/mine5");
    }
    $scope.gotomine6 = function (name) {
        $location.url("/mine6");
    }
    $scope.gotomine7 = function (name) {
        $location.url("/mine7");
    }
    $scope.gotomine8 = function (name) {
        $location.url("/mine8");
    }
});

//文字冒险游戏控制器
mineworld.controller('mineCtrl', function ($scope, $location) {
    $scope.gotonext = function (name) {
        $(".mine-act").addClass("hidden");
        $(name).removeClass("hidden");
    }
});

//城市精灵go图鉴控制器
mineworld.controller('mine2Ctrl', function ($scope, $location) {
    $scope.showdetail = function (elfname) {
        $(".go-elf-detail").removeClass("hidden");
        $scope.imgname = "./img/go/" + elfname + ".jpg";
        $scope.elfname = elfname;
        $scope.elfdescs = {
            "青叶雀": "头顶的树叶可以感知触摸者的心情，与温柔的人待在一起会发出清香的气息。",
            "焰火麟": "尾尖一直燃烧着不灭的火焰，从古代就被人们奉为吉祥的精灵。",
            "宝海豚": "平时喜欢在平静的海域嬉戏，黄昏捕食时会成群跃出水面。",
            "琥珀": "传说是从灵石中诞生，心怀恶意的人见到它会失去记忆。",
            "花粉宝苞": "头顶的花苞富含营养，为了抵御天敌来捕食，它会用一圈可以引起过敏的花粉云把花苞包裹起来。",
            "华羽雀": "不喜欢无所谓的争斗，不得不战斗的情况下会从尾巴甩出锋利的叶片击退敌人。",
            "炎麒麟": "操控着火的元素，飘逸的胡须散发出祥瑞的气息，非常受人们喜爱。",
            "海流豚": "尾鳍用来提供推动力，胸鳍用来稳定方向，而流线型的身体让它的速度得到保障。",
            "流莽犬": "虽然长相很凶恶却很温柔，带领着很多流浪精灵在城市里找寻适合它们居住的家。",
            "嗜血蚊": "嗜血成性，不择手段的寻找血液，很不招人喜欢。",
            "乐乐兔": "天生就酷爱音乐，经常出现在ktv和嘉年华的人群中。",
            "心心兔": "耳朵对于心跳声非常灵敏，感知到危险时耳朵会大幅抖动。",
            "标标鼠": "行动灵巧，喜欢滑动着移动。遇到危险会用尾巴绊倒敌人。",
            "万花螳螂": "行动如疾风般迅速，经过之处留下的花海一样的残影。",
            "花蕊螳螂": "用触角散发出甜味来吸引猎物，爪子虽然很小但可以轻松的劈开树枝。",
            "迷幻鸟": "头上的漩涡状迷雾会一直旋转，经常有人被它催眠。",
            "幻弧鼠": "因为身体外形很Q，经常被误认为是玩偶，绒绒的尾巴被很多女性训练师喜爱。",
            "丑小鸭": "凌乱的灰色羽毛里夹杂着灰尘一样的粒子，常常遭到嫌弃，自己不敢看自己水中的倒影。",
            "浣熊仔": "有着呆萌的外表和过剩的好奇心，然后经常在民居里捣乱恶作剧。",
            "路由猫": "路由猫会从身体发出神奇的电波，让身体周围的区域被WI-FI覆盖。",
            "菊儿虫": "秋天时大量出现在浅滩，远远地看过去像一片花海。",
            "花粉娃娃": "喜欢在阳光下欢快的舞蹈，舞蹈的同时会向周围散落大量花粉。",
            "嘟嘟蝇": "喜欢用吸盘状的嘴巴吸食果蜜，常常在城市中四处找寻水果气味。",
            "朵朵鸟": "绵云一样的羽毛帮助它很好的抵御寒冷，让它更好地适应各种环境。",
            "暗甲": "甲壳越坚硬的暗甲颜色越深，全身漆黑的暗甲的甲壳可以挡住子弹。",
            "顽皮仔": "非常淘气的精灵，总是在恶作剧。不过抚摸它头顶毛发的话它会变乖。",
            "晶冰石": "身上的冰晶非常漂亮，被很多人认为是水晶和宝石。",
            "晨光鱼": "清晨出来觅食，吃饱有精神的晨光鱼会从鳞片发出美丽的彩虹光泽。",
            "炸弹鱼": "不太擅长游动，喜欢飘在海里，遇到危险会快速膨胀身体。",
            "团子兔": "身体像弹力球一样极富弹性，喜欢在花丛里开心的蹦来蹦去。",
            "爱心兔": "可以用耳朵轻松地读取人类的内心活动，为谎言制造末日。",
            "魔音兔": "巨大的音响式耳朵能发出高频率的音波，没人能受得了。",
            "丛林懒": "与进化前形成巨大反差，总是很有活力和干劲，对训练师很热情。",
            "贪吃豆": "用头顶的的豆豆来进行气味侦测，有着吃进的什么东西都能消化的体质。",
            "冰石怪": "群居于冰原上，身上的冰棱很锋利。",
            "爆弹鱼": "瞬间膨胀身体并射出有毒的针刺攻击对手，暴躁的天性让训练师很头疼。",
            "夕辉鱼": "体态高雅，游姿优美，游过的地方会留下美丽的发光轨迹。",
            "鬼脸蛛": "很胆小，所以总是用腹部夸张的鬼脸花纹威吓对手，不同的鬼脸蛛腹部花纹都不一样。",
            "弗洛美拉": "古老神话中的精灵，用荧色的巨翼翱翔于天空，有化身成人类的能力。",
            "魔翼蛇": "用恐惧的花纹来威吓敌人，能跳起并在空中短暂飞行一段时间。",
            "艾斯拉": "身形巨大的冰雪怪兽，脚踩过的地方会被瞬间冻结。",
            "咩咩绵": "软绵绵的毛摸起来非常舒服，摸着的人会摸着摸着会开始犯困。",
            "枕头咩咩": "悠闲的漂浮在空中，一天里十分之九的时间都在睡睡。",
            "砂岩蜥": "遇到危险时会将脑袋两侧的硬壳合上，以此保护自己。",
            "花粉后": "身上的花粉有着浓郁的香味，古时人们喜欢称这种味道为“神的祝福”。",
            "夜月蝙蝠": "会整群的在夜间觅食，其规模能将月亮都遮蔽。",
            "梦咪": "纤细身体上的银色毛皮细腻柔软，梦咪可以通过毛皮从天空的另一端汲取能量。",
            "电波水母": "夜间游动在空中，轻盈的摆动柔软的身体，并散发出美丽的柔光。",
            "抱抱熊": "最喜欢拥抱了，被抱抱熊抱过会消除疲劳和烦恼。",
            "王魔蛇": "通体散发紫色光芒，猩红色的宝石装点其身躯，脖颈上的纹路能射出致命的光线。",
            "苍凰雀": "晴天时展开绚丽夺目的尾羽散发出令植物茂盛生长的璀璨光芒，所到之处生机勃勃。",
            "焱圣麟": "在古代其形象作为图腾流传至今，仅用呼吸就能控制火焰的轨迹，不灭的圣火是它的象征。",
            "海神豚": "用前额发出声波来控制海水，一旦愤怒会掀起汹涌的巨浪吞没眼前的一切。",
            "冰晶甜筒": "从身上色彩缤纷的结晶释放冷气保持体温，擅长制造软绵绵的雪云攻击敌人。",
            "丹唇贝": "平时贝壳是柔软的，但遇到危险会立刻硬化，并紧闭壳口。",
            "羽飘飘": "轻飘飘的在空中飘浮，每年会换一次羽毛，脱落的羽毛可以用来做书签或笔杆。",
            "月痕虎": "获得月亮的力量进化而来，可以用身上的条纹控制潮水，尾巴如弯刀一样锋利。",
            "窝头鹿": "窝头状角可以食用，自古以来被人们敬贡。",
            "丰饶鹿": "走过之处生机勃勃作物丰收，身上长出的年糕受孩子们的喜爱。",
            "冰峰牛": "远远看硕大的身躯像一座冰山，巨大的冰角异常锋利。",
            "奶嘴章鱼": "脑袋上有类似电灯泡的结构，在漆黑的夜里能照亮周围，聚在一起能发出很强的光。",
            "粒子沙": "用头顶旋转的触角吸收周围的尘土到体内，吸收多了身体会变得越变越大。",
            "利牙贝": "结出的珍珠是吸引配偶的重要装饰，会用贝壳上锋利的牙齿保护珍珠不被偷走。",
            "牙仙鱿": "身体表面覆盖着防止水分流失的特殊粘液，喜欢用黏糊糊的触手缠绕喜欢的人。",
            "迎春芽": "春天时大量繁殖出现，随风在空中飘舞，四处旅行。",
            "勾玉蝎": "尾巴上的勾玉价值连城，被心怀不轨的人大量抓捕，以至于数量很稀少。",
            "贪食蛇": "什么都吃的精灵，每吃到一定量身体就会多长一节，挨饿的话身体会渐渐变短。",
            "绒衣虫": "惧怕严寒的精灵，也因此身上裹了厚厚的绒毛。",
            "冷光蛾": "飞舞在极地的夜空里，散下的鳞粉会化作极光。",
            "星斑豹": "获得星辰的力量进化而来，攻击时从身上的斑点发出强光，行动如流星一样迅速。",
            "海菊虫": "悠哉的在海底爬行，身上的触须随着海水摆动，像是一朵海菊。",
            "珊瑚虾": "钳臂形状很特殊，多用作锤击对手，触须在深海等黑暗环境下闪闪发光。",
            "沙滩蟹": "喜欢往钳子里灌入少许沙子，紧闭钳口左右摇晃，发出沙锤一样的声音。",
            "棕皮虫": "拟态成便便来躲避天敌，但身体散发出的巧克力味常常让伪装被识破。",
            "水螺羚": "所有的水螺羚都在年末出生，这种现象似乎和某种精灵有着特殊关系。",
            "海摩羯": "身形酷似传说中的摩羯，用大角顶撞对手。",
            "星贝龙": "认为是从坠落的陨石中诞生，喜欢亲近人类。",
            "佐罗浣": "正气凛凛的游侠，随身携带的佩剑是它的标志，伸张正义是它的信条。",
            "幻象王": "用耳朵上的花纹发出奇异的波长，擅长制造出极其真实的巨大幻象迷惑对手。",
            "迷幻鸦": "出现在即将故去的人身边，一度被认为是不好的象征。",
            "星光龙": "进化后慢慢显现出战斗本能，以快速的动作取胜。",
            "星辉翼龙": "被称作星星之子，张开的双翼能在黑夜中散发耀眼光芒。",
            "砂丘蜥": "岩石状的冠用来吸收水分和太阳能，能在恶劣的环境下生存。",
            "砂暴龙": "长期生活在恶劣的环境里，弱肉强食的法则使之变得异常凶暴。",
            "熊猫食者": "背着一双筷子走遍各地，吃遍八方，对“食”很有造诣。",
            "食神熊猫": "脖子上的粮袋已经成为了身体的一部分，带着各种炊具走遍四面八方。",
            "针弹球": "性格平和喜欢群居，但如果激怒它们会被大量针弹球团团围住。",
            "针刺兵卫": "以守护者的身份出现在入侵者跟前，誓死捍卫其守护的事物。",
            "针刺战车": "飞快转动轮子向对手进行冲撞，为了一直保护的东西战斗着。",
            "火辣辣": "身体小巧，头顶上的小柄能喷出高温火焰，结出的果实非常辣。",
            "萝莉辣": "有可爱的外表和火辣辣的性情，头上的辣椒是可以食用的。",
            "迎春兽": "吸收阳光获得能量，喜欢在森林里透过叶片的光束下休息。",
            "沙堡蟹": "用沙子建造巨大的堡垒，建成之后从口中吐出特殊的液体让沙堡变得坚如钢铁。",
            "玉魂蝎": "通体覆盖着硬度极高的甲壳，金色的双钳能夹断任何东西。",
            "金刚王": "力大无穷，挥动拳头可以砸碎山峰。",
            "幻彩貂": "通过眼睛就能看透对方的想法，会向亲昵的人撒娇。"
        };
        $scope.elfdesc = $scope.elfdescs[elfname];
    };
    $scope.cancel = function () {
        $(".go-elf-detail").addClass("hidden");
    };
});

//canvas页面控制器
mineworld.controller('mine3Ctrl', function ($scope, $location) {
    var canvas;
    var context;
    var focallength;
    var animateRunning;
    $scope.canvasInit = function () {
        canvas = document.getElementById("cas");
        context = canvas.getContext('2d');
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
        };

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
    };

    function drawText(text) {
        context.save();
        context.font = "200px 微软雅黑 bold";
        context.fillStyle = "rgba(168,168,168,1)";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
    };


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

//3D测试控制器
mineworld.controller('mine4Ctrl', function ($scope, $location) {
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

//CanvasDemo3控制器
mineworld.controller('mine5Ctrl', function ($scope, $location) {
    var canvas;
    var context;
    var width;
    var height;
    var r;
    var rem;
    canvas = document.getElementById("clock");
    context = canvas.getContext('2d');
    width = context.canvas.height;
    height = context.canvas.width;
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

//CanvasDemo4控制器
mineworld.controller('mine6Ctrl', function ($scope, $location) {
    var canvas;
    var context;
    var height;
    var width;
    canvas = document.getElementById('canvas4');
    context = canvas.getContext('2d');
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

//CanvasDemo5控制器
mineworld.controller('mine7Ctrl', function ($scope, $location) {
    var canvas;
    var context;
    canvas = document.getElementById('canvas5');
    context = canvas.getContext('2d');
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

//CanvasDemo6控制器
mineworld.controller('mine8Ctrl', function ($scope, $location, $interval) {
    var g = go.GraphObject.make;
    var diagram = new go.Diagram("myDiagramDiv");

});
