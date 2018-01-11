/**
 * Created by Xul on 2018/1/11.
 */
var rpg = angular.module('RpgCtrl', []);

/**
 * 战斗场景控制器
 */
rpg.controller('rpgCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
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