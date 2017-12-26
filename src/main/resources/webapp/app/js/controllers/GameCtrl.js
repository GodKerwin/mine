/**
 * Created by Xul on 2017/4/27.
 */
var game = angular.module('GameCtrl', []);

/**
 * 游戏主页控制器
 */
game.controller('gameIndexCtrl', function ($scope, $location) {

});

/**
 * 战斗场景控制器
 */
game.controller('fightSceneCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
    /************************初始化变量**************************/
        //小地图任务坐标
    var role = {'x': 0, 'y': 0, 'direct': 'right'};
    //战斗场面任务坐标
    var act_role = {'x': 100, 'y': 200, 'direct': 'right'};
    //是否查看地图
    var show_map = false;
    //是否显示物品栏
    var show_good = false;
    //是否显示状态
    var show_status = false;
    //是否锁键盘
    var lock_keyboard = false;
    //是否进入战斗
    var fight_flag = false;
    //动作序号
    var act = 0;
    //是否正在动作中
    var on_act = false;
    //地图基础数据
    var map = {
        'floor': [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        'tree': [
            [-1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
            [-1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
            [-1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
            [-1, -1, 1, 1, 1, 1, -1, 1, -1, 1, -1, 0, -1, -1, -1, -1],
            [1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0],
            [-1, -1, -1, -1, 3, 3, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1],
            [-1, -1, -1, 3, -1, -1, 3, -1, 3, -1, -1, 3, -1, -1, -1, -1],
            [-1, -1, -1, 3, -1, -1, -1, 3, -1, -1, -1, 3, -1, -1, -1, -1],
            [-1, -1, -1, -1, 3, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1],
            [-1, 2, 2, -1, -1, 3, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1],
            [2, 2, 2, -1, -1, -1, 3, -1, 3, -1, -1, -1, -1, 2, -1, 2],
            [2, -1, 2, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, 2]
        ],
        'monster': [
            [-1, -1, 3, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]
    };
    $scope.show_statis = false;

    //基础数据
    var floor = ['img/game/texture/000空白.png', 'img/game/texture/001草地.png', 'img/game/texture/002地砖.png', 'img/game/texture/003召泽.png', 'img/game/texture/150岩浆.png'];
    var tree = ['img/game/texture/100红树.png', 'img/game/texture/101绿树.png', 'img/game/texture/102绿竹.png', 'img/game/texture/103高绿树.png'];
    var monster = ['img/game/monster/monster01.gif'];
    var monster_01 = [[20, 20], [26, 68], [20, 126], [25, 180], [20, 226], [20, 280], [20, 326], [20, 380], [26, 430], [24, 480], [20, 530], [24, 576], [26, 622], [20, 670], [20, 714], [24, 760], [28, 810], [28, 860], [240, 16], [244, 68], [238, 114], [240, 160], [244, 208], [242, 258], [244, 310], [254, 360], [250, 400], [258, 436], [258, 482], [266, 528]]
    var actor = ['img/game/actor/actor.png'];
    var actor_01 = {'down': [60, -8], 'left': [90, -8], 'up': [120, -8], 'right': [150, -8]};
    var good_lib = {
        'G00001': 'img/game/goods/blood01.bmp',
        'G00002': 'img/game/goods/blood02.bmp',
        'G00003': 'img/game/goods/magic01.bmp',
        'G00004': 'img/game/goods/magic02.bmp',
        'G00005': 'img/game/goods/equip1.jpg',
        'G00006': 'img/game/goods/equip2.jpg',
        'G00007': 'img/game/goods/equip3.jpg',
        'G00008': 'img/game/goods/equip4.jpg',
        'G00009': 'img/game/goods/equip5.jpg',
        'G00010': 'img/game/goods/equip6.jpg',
        'G00011': 'img/game/goods/equip7.jpg',
        'G00012': 'img/game/goods/equip8.jpg',
        'G00013': 'img/game/goods/equip9.jpg',
        'G00014': 'img/game/goods/equip10.jpg',
        'G00015': 'img/game/goods/equip11.jpg',
        'G00016': 'img/game/goods/equip12.jpg',
        'G00017': 'img/game/goods/equip13.jpg',
        'G00018': 'img/game/goods/equip14.jpg',
        'G00019': 'img/game/goods/equip15.jpg'
    };
    var good_desc = {
        'G00001': '小生命药水|一瓶小生命药水\r\nHP+250',
        'G00002': '大生命药水|一瓶大生命药水\r\nHP+1000',
        'G00003': '小魔法药水|一瓶小魔法药剂\r\nMP+100',
        'G00004': '大魔法药水|一瓶大魔法药剂\r\nMP+300',
        'G00005': '长柄斧|一把很锋利的斧头\n\r嗯\n\r就这样\n\r攻击+15\n\r慢速',
        'G00006': '宽刃剑|一把很锋利的剑\n\r可以削水果\n\r攻击+8\n\r快速',
        'G00007': '',
        'G00008': '',
        'G00009': '',
        'G00010': '',
        'G00011': '',
        'G00012': '',
        'G00013': '',
        'G00014': '',
        'G00015': '',
        'G00016': '',
        'G00017': '',
        'G00018': '',
        'G00019': ''
    };
    var good = [{'id': 'G00001', 'num': 6}, {'id': 'G00002', 'num': 8}, {'id': 'G00003', 'num': 2}, {
        'id': 'G00004',
        'num': 3
    }, {'id': 'G00005', 'num': 1}, {'id': 'G00006', 'num': 1}];
    var now_good_desc = {'flag': false, 'x': 0, 'y': 0, 'count': 0};
    /*********************************战斗统计区域*********************************/
    $scope.fight_data = '';
    var result = [];
    $scope.gofight = function () {
        $scope.show_statis = true;
        var i = 0;
        fight();
        var monitor = $interval(function () {
            if (result.length == i) {
                $interval.cancel(monitor);
            } else {
                $scope.fight_data = $scope.fight_data + result[i];
                $('.panel-body').scrollTop(999999);
                i++;
            }
        }, 1000);
        $scope.show_statis = false;
    };
    //触发战斗
    var fight = function () {
        var Params = {
            srv_name: 'gm_FightAction.do',
            data: {user_role_key: '03bb105b7a074a538bf165b926f4eb83', monster_id: 'MON0001'}
        };
        HttpProvider.call(Params).then(function (data) {
            if (data.appdata.srv_status == 2) {
                alert(data.appdata.message);
            } else if (data.appdata.srv_status == 1) {
                result = data.appdata.result;
            }
        }, function (error) {
            alert(error.scode);
        })
    };
    //清屏
    $scope.clear = function () {
        $scope.fight_data = '';
    };

    /*********************************战斗区域*********************************/
    /**********绘制区**********/
        //绘制地图
    var canvas;
    var context;
    var drawMap = function () {
        canvas = document.getElementById('map');
        context = canvas.getContext('2d');
        context.canvas.width = 800;
        context.canvas.height = 600;
        var img_size = 50;
        var monster_interval = 0;
        var actor_interval = 0;
        var draw = $interval(function () {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.save();
            if (fight_flag) {
                drawFightScene(context);
            } else {
                if (!show_map) {
                    drawView(context, img_size);
                }
                drawFloor(context, img_size);
                drawObject(context, img_size);
                drawMonster(context, img_size, monster_interval);
                drawActor(context, img_size, role.direct, actor_interval);
                if (show_status) {
                    context.restore();
                    drawStatus(context);
                }
                ;
                if (show_good) {
                    context.restore();
                    drawGood(context);
                }
                ;
            }
            context.restore();
            if (actor_interval == 60) {
                actor_interval = 0;
            } else {
                actor_interval += 30;
            }
        }, 250);
    };
    //绘制遮罩
    var drawView = function (context, img_size) {
        var actor_view = 150;
        var offset = 25;
        context.fillStyle = "#000000";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.beginPath();
        context.arc(img_size * role.x + offset, img_size * role.y + offset, actor_view, 0, Math.PI * 2, false);
        context.clip();
    };
    //绘制地面
    var drawFloor = function (context, img_size) {
        var cheight = 0;
        var cwidth = 0;
        for (var i = 0; i < map.floor.length; i++) {
            cwidth = 0;
            for (var j = 0; j < map.floor[i].length; j++) {
                var img = new Image();
                img.src = floor[map.floor[i][j]];
                context.drawImage(img, cwidth, cheight, img_size, img_size);
                cwidth = cwidth + img_size;
            }
            cheight = cheight + img_size;
        }
    };
    //绘制物体
    var drawObject = function (context, img_size) {
        var cheight = 0;
        var cwidth = 0;
        for (var i = 0; i < map.tree.length; i++) {
            cwidth = 0;
            for (var j = 0; j < map.tree[i].length; j++) {
                if (map.tree[i][j] == -1) {
                    cwidth = cwidth + img_size;
                    continue;
                }
                var img = new Image();
                img.src = tree[map.tree[i][j]];
                context.drawImage(img, cwidth, cheight, img_size, img_size);
                cwidth = cwidth + img_size;
            }
            cheight = cheight + img_size;
        }
    };
    //绘制怪物
    var drawMonster = function (context, img_size, interval) {
        var cheight = 0;
        var cwidth = 0;
        var monster_size = 50;
        for (var i = 0; i < map.monster.length; i++) {
            cwidth = 0;
            for (var j = 0; j < map.monster[i].length; j++) {
                if (map.monster[i][j] == -1) {
                    cwidth = cwidth + img_size;
                    continue;
                }
                var img = new Image();
                //怪物图片暂定一张图
                img.src = monster[0];
                context.drawImage(img, monster_01[map.monster[i][j]][0] + interval, monster_01[map.monster[i][j]][1], monster_size, monster_size, cwidth, cheight, img_size, img_size);
                cwidth = cwidth + img_size;
            }
            cheight = cheight + img_size;
        }
    };
    //绘制主角
    var drawActor = function (context, img_size, direct, interval) {
        var actor_size = 30;
        var img = new Image();
        //怪物图片暂定一张图
        img.src = actor[0];
        context.drawImage(img, actor_01[direct][0], actor_01[direct][1] + interval, actor_size, actor_size, img_size * role.x, img_size * role.y, img_size, img_size);
    };
    //绘制战斗中的主角
    var drawFigthActor = function (context) {
        if (!on_act) {
            var min_i = 0;
            var max_i = 9;
            var img = new Image();
            if (act == 1) {
                min_i = 0;
                max_i = 9;
            } else if (act == 2) {
                min_i = 10;
                max_i = 20;
            } else if (act == 3) {
                min_i = 21;
                max_i = 29;
            } else if (act == 4) {
                min_i = 30;
                max_i = 37;
            }
            if (act == 0) {
                img.src = 'img/game/actor/actora/begin.png';
                context.drawImage(img, act_role.x, act_role.y);
            } else {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                var i = min_i;
                var acta = $interval(function () {
                    on_act = true;
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    img.src = 'img/game/actor/actora/a' + i + '.png';
                    console.log(img);
                    context.drawImage(img, act_role.x, act_role.y);
                    i++;
                    if (i == max_i) {
                        $interval.cancel(acta);
                        act = 0;
                        on_act = false;
                    }
                }, 50);
            }
        }
    };
    //绘制战斗场景
    var drawFightScene = function (context) {
        drawFigthActor(context);
    };
    //绘制物品
    var drawGoods = function (context, img, x, y, num) {
        var img_size = 40;
        var num_interval = 45;
        context.drawImage(img, x, y, img_size, img_size);
        context.strokeStyle = '#ffffff';
        context.strokeText(num, x + num_interval, y + num_interval);
    };
    //绘制物品说明
    var drawGooddesc = function (context) {
        if (now_good_desc.flag == true) {
            var good_id = good[now_good_desc.count].id;
            var desc = good_desc[good_id];
            var good_array = desc.split('|');
            context.fillStyle = "rgba(0,0,0,0.5)";
            context.fillRect(now_good_desc.x, now_good_desc.y, 120, 160);
            var img = new Image();
            img.src = good_lib[good_id];
            context.drawImage(img, now_good_desc.x + 3, now_good_desc.y + 3, 40, 40);
            context.strokeText(good_array[0], now_good_desc.x + 45, now_good_desc.y + 23);
            context.strokeText(good_array[1], now_good_desc.x + 3, now_good_desc.y + 70);
        }
    }
    //绘制物品栏
    var drawGood = function (context) {
        var width = 38;
        var height = 26;
        var width_interval = 71;
        var height_interval = 62;
        var img = new Image();
        img.src = 'img/game/goods/good.png';
        context.drawImage(img, 0, 0, 400, 400);
        var count = 1;
        var max_count = good.length;
        ok : for (var i = 1; i <= 6; i++) {
            width = 38;
            for (var j = 1; j <= 5; j++) {
                var good_id = good[count - 1].id;
                var good_num = good[count - 1].num;
                var good_img = new Image();
                good_img.src = good_lib[good_id];
                drawGoods(context, good_img, width, height, good_num);
                if (count >= max_count) {
                    break ok;
                }
                width += width_interval;
                count++;
            }
            height += height_interval;
        }
        drawGooddesc(context);
    };
    //绘制人物状态
    var drawStatus = function (context) {
        var img = new Image();
        img.src = 'img/game/goods/good.png';
        context.drawImage(img, 100, 100, 600, 400);
    };
    drawMap();
    //显示/关闭地图
    $scope.showMap = function () {
        show_map = !show_map;
    };
    //显示/关闭物品栏
    $scope.showGood = function () {
        show_good = !show_good;
    };
    //显示/关闭状态栏
    $scope.showStatus = function () {
        show_status = !show_status;
    };
    /**********操作区**********/
        //碰撞检测
    var collision = function (x, y) {
            //检测地形
            if (map.floor[y][x] == 4) {
                console.log('碰到' + floor[map.floor[y][x]]);
                return false;
                //检测物体
            } else if (map.tree[y][x] != -1) {
                lock_keyboard = true;
                console.log('碰到' + tree[map.tree[y][x]]);
                mine.confirm('砍掉这棵树么？').then(function (choose) {
                    lock_keyboard = false;
                    if (choose) {
                        map.tree[y][x] = -1;
                    }
                });
                return false;
                //检测怪物
            } else if (map.monster[y][x] != -1) {
                lock_keyboard = true;
                console.log('碰到' + monster_01[map.monster[y][x]]);
                mine.confirm('是否攻击？').then(function (choose) {
                    lock_keyboard = false;
                    if (choose) {
                        fight_flag = true;
                        map.monster[y][x] = -1;
                    }
                });
                return false;
            } else {
                return true;
            }

        };
    //按键监听
    document.onkeydown = function (e) {
        var x = role.x;
        var y = role.y;
        e = window.event || e;
        if (lock_keyboard) {
            e.preventDefault();
        } else {
            switch (e.keyCode) {
                case 37: //左键
                    if (!fight_flag) {
                        x--;
                        if (collision((x < 0 ? 0 : x), y)) {
                            role.x = (x < 0 ? 0 : x);
                        }
                        role.direct = 'left';
                    }
                    e.preventDefault();
                    break;
                case 38: //向上键
                    if (!fight_flag) {
                        y--;
                        if (collision(x, (y < 0 ? 0 : y))) {
                            role.y = (y < 0 ? 0 : y);
                        }
                        role.direct = 'up';
                    }
                    e.preventDefault();
                    break;
                case 39: //右键
                    if (!fight_flag) {
                        x++;
                        if (collision((x > map.floor[0].length - 1 ? map.floor[0].length - 1 : x), y)) {
                            role.x = (x > map.floor[0].length - 1 ? map.floor[0].length - 1 : x);
                        }
                        role.direct = 'right';
                    }
                    e.preventDefault();
                    break;
                case 40: //向下键
                    if (!fight_flag) {
                        y++;
                        if (collision(x, (y > map.floor.length - 1 ? map.floor.length - 1 : y))) {
                            role.y = (y > map.floor.length - 1 ? map.floor.length - 1 : y);
                        }
                        role.direct = 'down';
                    }
                    e.preventDefault();
                    break;
                case 88: //X键
                    if (fight_flag && !on_act) {
                        act = 1;
                    }
                    e.preventDefault();
                    break;
                case 90: //Z键
                    if (fight_flag && !on_act) {
                        act = 3;
                    }
                    e.preventDefault();
                    break;
                case 81: //Q键
                    if (fight_flag && !on_act) {
                        act = 2;
                    }
                    e.preventDefault();
                    break;
                case 87: //W键
                    if (fight_flag && !on_act) {
                        act = 4;
                    }
                    e.preventDefault();
                    break;
                case 69: //E键
                    if (fight_flag && !on_act) {
                        act = 5;
                    }
                    e.preventDefault();
                    break;
                case 82: //R键
                    if (fight_flag && !on_act) {
                        act = 6;
                    }
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        }
    };
    //Canvas/hover事件
    canvas.onmousemove = function (e) {
        if (show_good) {
            var interval = 40;
            var width = 38;
            var height = 26;
            var width_interval = 71;
            var height_interval = 62;
            var x = (e.pageX - 228) / 1.23;
            var y = (e.pageY - 66) / 1.23;
            var count = 1;
            var max_count = good.length;
            ok : for (var i = 1; i <= 6; i++) {
                width = 38;
                for (var j = 1; j <= 5; j++) {
                    if (x > width && x < width + interval && y > height && y < height + height_interval) {
                        now_good_desc.flag = true;
                        now_good_desc.x = x;
                        now_good_desc.y = y;
                        now_good_desc.count = count - 1;
                        break ok;
                    } else {
                        now_good_desc.flag = false;
                    }
                    if (count >= max_count) {
                        break ok;
                    }
                    width += width_interval;
                    count++;
                }
                height += height_interval;
            }
        }
    };
});

/**
 * 斗地主场景控制器
 */
game.controller('pokerSceneCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
    //公共方法
    var removeOne = function (list, one) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === one.id) {
                list.splice(i, 1);
            }
        }
    };
    var resetChooseFlag = function (list) {
        for (var i = 0; i < list.length; i++) {
            list[i].choose_flag = 0
        }
    };
    var resetPlay = function () {
        //全局变量
        $scope.global = {
            "user_id": "admin",
            "user_player": "playerA",
            "startPokerFlag": false,
            "callLandFlag": false,
            "landPlayer": "",
            "last_player": "",
            "player": "",
            "turn": 0,
            "last_push_pokers": []
        };
        //扑克全局变量
        $scope.poker = {
            "hideCards": {}, "playerA": {"playerPokers": {}, "push_pokers": [], "history": [], "unPushFlag": false},
            "playerB": {"playerPokers": {}, "push_pokers": [], "history": [], "unPushFlag": false},
            "playerC": {"playerPokers": {}, "push_pokers": [], "history": [], "unPushFlag": false}
        };
    };

    //发牌/回到游戏
    $scope.startPoker = function (user_id) {
        if (!$scope.global.startPokerFlag) {
            var Params = {srv_name: 'game/poker/queryGroupPoker.do', data: {user_id: user_id}};
            HttpProvider.call(Params).then(function (data) {
                if (data.srv_status === 2) {
                    mine.alert(data.message);
                } else if (data.srv_status === 1) {
                    $scope.poker.playerA.playerPokers = data.groupPokers.playerA;
                    $scope.poker.playerB.playerPokers = data.groupPokers.playerB;
                    $scope.poker.playerC.playerPokers = data.groupPokers.playerC;
                    $scope.poker.hideCards = data.groupPokers.hideCards;
                    // $scope.global.callLandFlag = data.call_flag;
                }
                $scope.global.startPokerFlag = true;
                $scope.global.callLandFlag = true;
            }, function (error) {
                mine.alert(error.scode);
            });
        } else {
            mine.alert("已开局！")
        }
    };
    //叫地主
    $scope.callLandlord = function (user_id, player, flag) {
        if ($scope.global.callLandFlag) {
            var Params = {srv_name: 'game/poker/callLandlord.do', data: {user_id: user_id, player: player, call_flag: flag}};
            HttpProvider.call(Params).then(function (data) {
                if (data.srv_status === 2) {
                    mine.alert(data.message);
                } else if (data.srv_status === 1) {
                    //赋值抢到地主的玩家
                    player = data.player;
                    if (player !== "none") {
                        $scope.poker.playerA.playerPokers = data.groupPokers.playerA;
                        $scope.poker.playerB.playerPokers = data.groupPokers.playerB;
                        $scope.poker.playerC.playerPokers = data.groupPokers.playerC;
                        $scope.poker.hideCards = data.groupPokers.hideCards;
                        $scope.poker.playerA.push_pokers = [];
                        $scope.poker.playerB.push_pokers = [];
                        $scope.poker.playerC.push_pokers = [];
                        $scope.global.callLandFlag = false;
                        $scope.global.player = player;
                        $scope.global.landPlayer = player;
                        $scope.global.player = player;
                        if (player !== $scope.global.user_player) {
                            $scope.queryAIPoker($scope.global.user_id, player, player, $scope.global.last_push_pokers);
                            $timeout(function () {
                                if (player === "playerB") {
                                    $scope.pushPoker($scope.global.user_id, player, player, $scope.poker.playerB.push_pokers, $scope.global.last_push_pokers);
                                } else {
                                    $scope.pushPoker($scope.global.user_id, player, player, $scope.poker.playerC.push_pokers, $scope.global.last_push_pokers);
                                }
                            }, 500);
                        }
                    } else {
                        mine.alert("没人叫地主，请重新开局！").then(function (choose) {
                            resetPlay();
                            $scope.startPoker($scope.global.user_id);
                        });
                    }
                }
            }, function (error) {
                mine.alert(error.scode);
            });
        } else {
            mine.alert("地主叫过了，专心打牌吧！")
        }
    };
    //出牌
    $scope.pushPoker = function (user_id, player, last_player, push_pokers, last_push_pokers) {
        if ($scope.global.player === player) {
            if (push_pokers.length === 0) {
                mine.alert("请选牌");
            } else {
                var Params = {
                    srv_name: 'game/poker/pushPoker.do',
                    data: {
                        user_id: user_id,
                        player: player,
                        last_player: last_player,
                        push_pokers: angular.toJson(push_pokers),
                        last_push_pokers: angular.toJson(last_push_pokers)
                    }
                };
                HttpProvider.call(Params).then(function (data) {
                    if (data.srv_status === 2) {
                        mine.alert(data.message);
                        for (var i = 0; i < $scope.poker.playerA.playerPokers.length; i++) {
                            $scope.poker.playerA.playerPokers[i].choose_flag = 0;
                        }
                        $scope.poker.playerA.push_pokers = [];
                    } else if (data.srv_status === 1) {
                        $scope.poker.playerA.playerPokers = data.groupPokers.playerA;
                        $scope.poker.playerB.playerPokers = data.groupPokers.playerB;
                        $scope.poker.playerC.playerPokers = data.groupPokers.playerC;
                        $scope.poker.hideCards = data.groupPokers.hideCards;
                        $scope.global.last_player = player;
                        $scope.global.last_push_pokers = push_pokers;
                        $scope.changePlayer();
                        //若已结束
                        if (data.over_flag) {
                            resetPlay();
                            mine.confirm('恭喜' + player + "!\n再来一局？").then(function (choose) {
                                if (choose) {
                                    $scope.startPoker($scope.global.user_id);
                                }
                            });
                        }
                    }
                }, function (error) {
                    mine.alert(error.scode);
                });
            }
        } else {
            mine.alert("还没到你的回合呢！")
        }
    };
    //查询AI出牌
    $scope.queryAIPoker = function (user_id, player, last_player, last_push_pokers) {
        var Params = {
            srv_name: 'game/poker/judgeAI.do',
            data: {
                user_id: user_id,
                player: player,
                last_player: last_player,
                last_push_pokers: angular.toJson(last_push_pokers)
            }
        };
        HttpProvider.call(Params).then(function (data) {
            if (data.srv_status === 2) {
                mine.alert(data.message);
            } else if (data.srv_status === 1) {
                if (player === "playerA") {
                    $scope.poker.playerA.push_pokers = data.push_pokers;
                } else if (player === "playerB") {
                    $scope.poker.playerB.push_pokers = data.push_pokers;
                } else if (player === "playerC") {
                    $scope.poker.playerC.push_pokers = data.push_pokers;
                }
            }
        })
    };
    //切换玩家回合,若为AI则自动出牌
    $scope.changePlayer = function () {
        $timeout(function () {
            if ($scope.global.player === "playerA") {
                $scope.poker.playerA.history = $scope.poker.playerA.push_pokers;
                if ($scope.poker.playerA.push_pokers.length === 0) {
                    $scope.poker.playerA.unPushFlag = true;
                } else {
                    $scope.poker.playerA.unPushFlag = false;
                }
                $scope.poker.playerA.push_pokers = [];
                resetChooseFlag($scope.poker.playerA.playerPokers);
                $scope.global.player = "playerB";
                if ($scope.global.player !== $scope.global.user_player) {
                    $scope.queryAIPoker($scope.global.user_id, $scope.global.player, $scope.global.last_player, $scope.global.last_push_pokers);
                    $timeout(function () {
                        if ($scope.poker.playerB.push_pokers.length !== 0) {
                            $scope.pushPoker($scope.global.user_id, $scope.global.player, $scope.global.last_player, $scope.poker.playerB.push_pokers, $scope.global.last_push_pokers)
                        } else {
                            $scope.changePlayer()
                        }
                    }, 500);
                }
            } else if ($scope.global.player === "playerB") {
                $scope.poker.playerB.history = $scope.poker.playerB.push_pokers;
                if ($scope.poker.playerB.push_pokers.length === 0) {
                    $scope.poker.playerB.unPushFlag = true;
                } else {
                    $scope.poker.playerB.unPushFlag = false;
                }
                $scope.poker.playerB.push_pokers = [];
                resetChooseFlag($scope.poker.playerB.playerPokers);
                $scope.global.player = "playerC";
                if ($scope.global.player !== $scope.global.user_player) {
                    $scope.queryAIPoker($scope.global.user_id, $scope.global.player, $scope.global.last_player, $scope.global.last_push_pokers);
                    $timeout(function () {
                        if ($scope.poker.playerC.push_pokers.length !== 0) {
                            $scope.pushPoker($scope.global.user_id, $scope.global.player, $scope.global.last_player, $scope.poker.playerC.push_pokers, $scope.global.last_push_pokers)
                        } else {
                            $scope.changePlayer()
                        }
                    }, 500);
                }
            } else if ($scope.global.player === "playerC") {
                $scope.poker.playerC.history = $scope.poker.playerC.push_pokers;
                if ($scope.poker.playerC.push_pokers.length === 0) {
                    $scope.poker.playerC.unPushFlag = true;
                } else {
                    $scope.poker.playerC.unPushFlag = false;
                }
                $scope.poker.playerC.push_pokers = [];
                resetChooseFlag($scope.poker.playerC.playerPokers);
                $scope.global.player = "playerA";
                if ($scope.global.player !== $scope.global.user_player) {
                    $scope.queryAIPoker($scope.global.user_id, $scope.global.player, $scope.global.last_player, $scope.global.last_push_pokers);
                    $timeout(function () {
                        if ($scope.poker.playerA.push_pokers.length !== 0) {
                            $scope.pushPoker($scope.global.user_id, $scope.global.player, $scope.global.last_player, $scope.poker.playerA.push_pokers, $scope.global.last_push_pokers)
                        } else {
                            $scope.changePlayer()
                        }
                    }, 500);
                }
            }
            if ($scope.global.last_player === $scope.global.player) {
                $scope.global.last_push_pokers = [];
            }
        }, 500);
    };
    //选牌/放弃选牌
    $scope.chooseOne = function ($event, poker, player) {
        if (poker.choose_flag === 0) {
            $event.target.add
            if (player === "playerA") {
                $scope.poker.playerA.push_pokers.push(poker);
            } else if (player === "playerB") {
                $scope.poker.playerB.push_pokers.push(poker);
            } else if (player === "playerC") {
                $scope.poker.playerC.push_pokers.push(poker);
            }
            poker.choose_flag = 1;
        } else if (poker.choose_flag === 1) {
            // $event.target.removeClass(".poker_Choosed").addClass(".poker_noChoose")
            if (player === "playerA") {
                removeOne($scope.poker.playerA.push_pokers, poker);
            } else if (player === "playerB") {
                removeOne($scope.poker.playerB.push_pokers, poker);
            } else if (player === "playerC") {
                removeOne($scope.poker.playerC.push_pokers, poker);
            }
            poker.choose_flag = 0;
        }
    };
    //加载初始数据
    resetPlay();
});

/**
 * 爱心鱼场景控制器
 */
game.controller('fishSceneCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
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

/**
 * CARD主页控制器
 */
game.controller('cardIndexCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {

});

/**
 * CARD场景控制器
 */
game.controller('cardSceneCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
    //获取canvas对象
    var canvas = document.getElementById('dnf_scene_canvas');
    var context = canvas.getContext('2d');
    var width = context.canvas.width;
    var height = context.canvas.height;
    var lastTime;
    var deltaTime;
    var actor = [];
    var index = 0;
    //游戏加载主方法
    var game = function () {
        init();
        gameloop();
    };
    //初始化
    var init = function () {
        //初始化帧刷新间隔时间
        lastTime = Date.now();
        deltaTime = 0;
        for (var i = 0; i <= 21; i++) {
            actor[i] = new Image();
            actor[i].src = "img/game/card/actor/saber" + i + ".png";
        }
    };
    //帧刷新
    var gameloop = function () {
        //根据机器性能帧刷新
        window.requestAnimFrame(gameloop);
        var now = Date.now();
        deltaTime = now - lastTime;
        lastTime = now;
        context.clearRect(0, 0, width, height);
        context.drawImage(actor[index], 300 - actor[index].width, 0);
        context.fillText(index, 100, 100);
    };

    // canvas.onclick = function (e) {//给canvas添加点击事件
    //     e = e || event;//获取事件对象
    //     //获取事件在canvas中发生的位置
    //     var x = e.clientX - canvas.offsetLeft;
    //     var y = e.clientY - canvas.offsetTop;
    //     index++;
    //     index %= 22;
    // };

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 65 :
                index = index <= 0 ? 0 : index - 1
                break;
            default :
                index++;
                index %= 22;
                break;
        }
    };

    //加载游戏
    game();
});