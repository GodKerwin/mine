var Game = angular.module('GameCtrl',[]);

Game.controller('gameCtrl', function ($scope, $location, $interval, $timeout, $window, mine) {
    /************************初始化变量**************************/

    var game = {
        flag : {
            show_map : true,
            show_good : false,
            show_status : false,
            show_good_desc : false,
            show_save_tab : true,
            show_load_tab : false,
            show_help_tab : false,
            fight_flag : false,
            lock_keyboard : false
        },
        data : {
            run : {
                role : {
                    actor_index : 0,
                    position : {
                        x : 0,
                        y : 6
                    },
                    direct : 'right'
                },
                status : {},
                good : [{'id': 'G00001', 'num': 6}, {'id': 'G00002', 'num': 8}, {'id': 'G00003', 'num': 2}, {
                    'id': 'G00004',
                    'num': 3
                }, {'id': 'G00005', 'num': 1}, {'id': 'G00006', 'num': 1}],
                map : {
                    floor: [
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1],
                        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 4, 3, 4, 1, 1]
                    ],
                    object: [
                        [22,22,22,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [22,22,22,23,-1,-1,-1,-1,-1,-1,-1,-1, 6, 7, 8,-1,-1,-1,25,-1],
                        [22,22,22,-1,-1,-1,-1,-1,-1,-1,-1,30, 9,10,11,-1,-1,-1,-1,-1],
                        [23,23,23,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,15,-1,-1,-1,-1,-1,12],
                        [-1,-1,-1,-1,-1,-1,-1,-1,25,-1,-1,-1,-1,-1,-1,25,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,26,-1,-1, 0, 1, 2,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 4, 5,-1,-1,-1,-1,-1,-1,-1],
                        [-1,21,21,-1,21,21,-1,-1,-1,-1,-1,18,-1,-1,-1,-1,-1,-1,-1,-1],
                        [21,-1,-1,21,-1,-1,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [21,-1,-1,-1,-1,-1,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,21,-1,29,-1,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,21,-1,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,24,-1,24,24,-1],
                        [-1,-1,-1,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,-1,-1,-1,24,-1],
                        [-1,-1,-1,-1,-1,-1,-1,25,12,-1,-1,-1,-1,-1,24,-1,-1,-1,24,-1]
                    ],
                    monster: [
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8,-1,-1,-1]
                    ]
                }
            },
            basic : {
                floor : [
                    'img/game/floor/000空白.png',
                    'img/game/floor/001草地.png',
                    'img/game/floor/002地砖.png',
                    'img/game/floor/003召泽.png',
                    'img/game/floor/150岩浆.png'
                ],
                object : [
                    {
                        id : 0,
                        src : 'img/game/object/object06.png',
                        sx : 0,
                        sy : 1450,
                        swidth : 55,
                        sheight : 75,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 1,
                        src : 'img/game/object/object06.png',
                        sx : 55,
                        sy : 1450,
                        swidth : 55,
                        sheight : 75,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 2,
                        src : 'img/game/object/object06.png',
                        sx : 110,
                        sy : 1450,
                        swidth : 50,
                        sheight : 75,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 3,
                        src : 'img/game/object/object06.png',
                        sx : 0,
                        sy : 1525,
                        swidth : 55,
                        sheight : 75,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 4,
                        src : 'img/game/object/object06.png',
                        sx : 55,
                        sy : 1525,
                        swidth : 55,
                        sheight : 75,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 5,
                        src : 'img/game/object/object06.png',
                        sx : 110,
                        sy : 1525,
                        swidth : 50,
                        sheight : 75,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 6,
                        src : 'img/game/object/object06.png',
                        sx : 0,
                        sy : 1730,
                        swidth : 55,
                        sheight : 65,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 7,
                        src : 'img/game/object/object06.png',
                        sx : 55,
                        sy : 1730,
                        swidth : 55,
                        sheight : 65,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 8,
                        src : 'img/game/object/object06.png',
                        sx : 110,
                        sy : 1730,
                        swidth : 50,
                        sheight : 65,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 9,
                        src : 'img/game/object/object06.png',
                        sx : 0,
                        sy : 1795,
                        swidth : 55,
                        sheight : 60,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 10,
                        src : 'img/game/object/object06.png',
                        sx : 55,
                        sy : 1795,
                        swidth : 55,
                        sheight : 60,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 11,
                        src : 'img/game/object/object06.png',
                        sx : 110,
                        sy : 1795,
                        swidth : 50,
                        sheight : 60,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 12,
                        src : 'img/game/object/object04.png',
                        sx : 0,
                        sy : 2,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 13
                    },
                    {
                        id : 13,
                        src : 'img/game/object/object04.png',
                        sx : 32.5,
                        sy : 2,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 14
                    },
                    {
                        id : 14,
                        src : 'img/game/object/object04.png',
                        sx : 64,
                        sy : 2,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 12
                    },
                    {
                        id : 15,
                        src : 'img/game/object/object04.png',
                        sx : 97,
                        sy : 451,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 16
                    },
                    {
                        id : 16,
                        src : 'img/game/object/object04.png',
                        sx : 129,
                        sy : 451,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 17
                    },
                    {
                        id : 17,
                        src : 'img/game/object/object04.png',
                        sx : 161,
                        sy : 451,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 15
                    },
                    {
                        id : 18,
                        src : 'img/game/object/object04.png',
                        sx : 193,
                        sy : 451,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 19
                    },
                    {
                        id : 19,
                        src : 'img/game/object/object04.png',
                        sx : 225,
                        sy : 451,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 20
                    },
                    {
                        id : 20,
                        src : 'img/game/object/object04.png',
                        sx : 257,
                        sy : 451,
                        swidth : 33,
                        sheight : 38,
                        width : 50,
                        height : 50,
                        collision : false,
                        next : 18
                    },
                    {
                        id : 21,
                        src : 'img/game/object/object06.png',
                        sx : 32,
                        sy : 32,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : false,
                        next : -1
                    },
                    {
                        id : 22,
                        src : 'img/game/object/object06.png',
                        sx : 64,
                        sy : 32,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : false,
                        next : -1
                    },
                    {
                        id : 23,
                        src : 'img/game/object/object06.png',
                        sx : 96,
                        sy : 32,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 24,
                        src : 'img/game/object/object06.png',
                        sx : 96,
                        sy : 64,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 25,
                        src : 'img/game/object/object06.png',
                        sx : 96,
                        sy : 96,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 26,
                        src : 'img/game/object/object06.png',
                        sx : 128,
                        sy : 96,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 27,
                        src : 'img/game/object/object06.png',
                        sx : 224,
                        sy : 96,
                        swidth : 32,
                        sheight : 32,
                        width : 30,
                        height : 30,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 28,
                        src : 'img/game/actor/actor17.png',
                        sx : 0,
                        sy : 0,
                        swidth : 34,
                        sheight : 50,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 29,
                        src : 'img/game/actor/actor18.png',
                        sx : 0,
                        sy : 0,
                        swidth : 34,
                        sheight : 50,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    },
                    {
                        id : 30,
                        src : 'img/game/actor/actor19.png',
                        sx : 0,
                        sy : 0,
                        swidth : 34,
                        sheight : 50,
                        width : 50,
                        height : 50,
                        collision : true,
                        next : -1
                    }
                ],
                monster : [
                    'img/game/monster/monster01.gif'
                ],
                monster_detail : [
                    [20, 20],
                    [26, 68],
                    [20, 126],
                    [25, 180],
                    [20, 226],
                    [20, 280],
                    [20, 326],
                    [20, 380],
                    [26, 430],
                    [24, 480],
                    [20, 530],
                    [24, 576],
                    [26, 622],
                    [20, 670],
                    [20, 714],
                    [24, 760],
                    [28, 810],
                    [28, 860],
                    [240, 16],
                    [244, 68],
                    [238, 114],
                    [240, 160],
                    [244, 208],
                    [242, 258],
                    [244, 310],
                    [254, 360],
                    [250, 400],
                    [258, 436],
                    [258, 482],
                    [266, 528]
                ],
                actor : [
                    'img/game/actor/actor01.png',
                    'img/game/actor/actor02.png',
                    'img/game/actor/actor03.png',
                    'img/game/actor/actor04.png',
                    'img/game/actor/actor05.png',
                    'img/game/actor/actor06.png',
                    'img/game/actor/actor07.png',
                    'img/game/actor/actor08.png',
                    'img/game/actor/actor09.png',
                    'img/game/actor/actor10.png',
                    'img/game/actor/actor11.png',
                    'img/game/actor/actor12.png',
                    'img/game/actor/actor13.png',
                    'img/game/actor/actor14.png',
                    'img/game/actor/actor15.png',
                    'img/game/actor/actor16.png',
                    'img/game/actor/actor17.png',
                    'img/game/actor/actor18.png',
                    'img/game/actor/actor19.png',
                    'img/game/actor/actor20.png',
                    'img/game/actor/actor21.png',
                    'img/game/actor/actor22.png',
                    'img/game/actor/actor23.png',
                    'img/game/actor/actor24.png',
                    'img/game/actor/actor25.png',
                    'img/game/actor/actor26.png',
                    'img/game/actor/actor27.png'
                ],
                actor_detail : {
                    'down': [0, 0],
                    'left': [0, 49],
                    'right': [0, 98],
                    'up': [0, 145]
                },
                good_lib : {
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
                },
                good_desc : {
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
                },
                system : [
                    {
                        id : 1,
                        src : 'img/game/system/frame.png',
                        sx : 0,
                        sy : 0,
                        swidth : 320,
                        sheight : 210,
                        width : 300,
                        height : 200
                    },
                    {
                        id : 2,
                        src : 'img/game/system/text.png',
                        sx : 0,
                        sy : 0,
                        swidth : 300,
                        sheight : 155,
                        width : 50,
                        height : 50
                    },
                    {
                        id : 3,
                        src : 'img/game/system/text.png',
                        sx : 0,
                        sy : 155,
                        swidth : 300,
                        sheight : 155,
                        width : 50,
                        height : 50
                    },
                    {
                        id : 4,
                        src : 'img/game/system/choose.png',
                        sx : 0,
                        sy : 0,
                        swidth : 45,
                        sheight : 42,
                        width : 50,
                        height : 50
                    },
                    {
                        id : 5,
                        src : 'img/game/system/choose.png',
                        sx : 185,
                        sy : 0,
                        swidth : 34,
                        sheight : 40,
                        width : 50,
                        height : 50
                    }
                ]
            }
        },
        canvas : {
            width : 1000,
            height : 800,
            img_size : 50,
            draw_interval : 200,
            actor : {
                view : 150,
                width : 34,
                height : 50,
                now : 1,
                max : 4,
                offset : 32
            },
            status : {
                width : 400,
                height : 400
            },
            good : {
                good_tab : {
                    width : 400,
                    height :400
                },
                first_width : 38,
                first_height : 26,
                width_interval : 71,
                height_interval : 62,
                size : 40,
                desc : {
                    width : 120,
                    height : 160,
                    position : {
                        x : 0,
                        y : 0
                    },
                    count: 0,
                    background : 'rgba(0,0,0,0.5)',
                    img_offset : 3,
                    title_x_offset : 45,
                    title_y_offset : 23,
                    text_x_offset : 3,
                    text_y_offset : 70
                },
                number : {
                    number_offset : 45,
                    color : '#ffffff'
                },
                background_img : 'img/game/goods/good.png'
            },
            monster : {
                size : 50,
                now : 1,
                max : 4
            }
        }
    };

    /*********************************战斗区域*********************************/

    /**********绘制区**********/

    //绘制地图
    var canvas;
    var context;
    canvas = document.getElementById('map');
    context = canvas.getContext('2d');
    context.canvas.width = game.canvas.width;
    context.canvas.height = game.canvas.height;

    var init = function () {
        canvas.addEventListener('mousemove', onMouseMove, false);
        $interval(function () {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.save();
            if (!game.flag.show_map) {
                drawView(context);
            }
            drawFloor(context);
            drawObject(context);
            drawMonster(context);
            drawActor(context);
            if (game.flag.show_status) {
                context.restore();
                drawStatus(context);
            }
            if (game.flag.show_good) {
                context.restore();
                drawGoodTab(context);
            }
            if (game.flag.show_save_tab) {
                context.restore();
                drawSaveTab(context);
            }
            if (game.flag.show_load_tab) {
                context.restore();
                drawLoadTab(context);
            }
            if (game.flag.show_help_tab) {
                context.restore();
                drawHelpTab(context);
            }
            context.restore();
        }, 250);
    };
    //绘制遮罩
    var drawView = function (context) {
        var img_size = game.canvas.img_size;
        var view = game.canvas.actor.view;
        var offset = img_size / 2;
        context.fillStyle = "#000000";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.beginPath();
        context.arc(img_size * game.data.run.role.position.x + offset, img_size * game.data.run.role.position.y + offset, view, 0, Math.PI * 2, false);
        context.clip();
    };
    //绘制地面
    var drawFloor = function (context) {
        var img_size = game.canvas.img_size;
        var total_height = 0;
        var total_width = 0;
        for (var i = 0; i < game.data.run.map.floor.length; i++) {
            total_width = 0;
            for (var j = 0; j < game.data.run.map.floor[i].length; j++) {
                var img = new Image();
                img.src = game.data.basic.floor[game.data.run.map.floor[i][j]];
                context.drawImage(img, total_width, total_height, img_size, img_size);
                total_width = total_width + img_size;
            }
            total_height = total_height + img_size;
        }
    };
    //绘制物体
    var drawObject = function (context) {
        var img_size = game.canvas.img_size;
        var total_height = 0;
        var total_width = 0;
        for (var i = 0; i < game.data.run.map.object.length; i++) {
            total_width = 0;
            for (var j = 0; j < game.data.run.map.object[i].length; j++) {
                if (game.data.run.map.object[i][j] === -1) {
                    total_width = total_width + img_size;
                    continue;
                }
                var drawObj = game.data.basic.object[game.data.run.map.object[i][j]];
                if(drawObj.next !== -1){
                    game.data.run.map.object[i][j] = drawObj.next;
                }
                drawImgByObject(context, total_width, total_height, drawObj);
                total_width = total_width + img_size;
            }
            total_height = total_height + img_size;
        }
    };
    //绘制怪物
    var drawMonster = function (context) {
        var img_size = game.canvas.img_size;
        var total_height = 0;
        var total_width = 0;
        var monster_size = game.canvas.monster.size;
        for (var i = 0; i < game.data.run.map.monster.length; i++) {
            total_width = 0;
            for (var j = 0; j < game.data.run.map.monster[i].length; j++) {
                if (game.data.run.map.monster[i][j] === -1) {
                    total_width = total_width + img_size;
                    continue;
                }
                var img = new Image();
                //怪物图片暂定一张图
                img.src = game.data.basic.monster[0];
                context.drawImage(img, game.data.basic.monster_detail[game.data.run.map.monster[i][j]][0], game.data.basic.monster_detail[game.data.run.map.monster[i][j]][1], monster_size, monster_size, total_width, total_height, img_size, img_size);
                total_width = total_width + img_size;
            }
            total_height = total_height + img_size;
        }
    };
    //绘制主角
    var drawActor = function (context) {
        var img_size = game.canvas.img_size;
        var direct = game.data.run.role.direct;
        var img = new Image();
        var offset = (game.canvas.actor.now  - 1) * game.canvas.actor.offset;
        img.src = game.data.basic.actor[game.data.run.role.actor_index];
        context.drawImage(img, game.data.basic.actor_detail[direct][0] + offset, game.data.basic.actor_detail[direct][1], game.canvas.actor.width, game.canvas.actor.height, img_size * game.data.run.role.position.x, img_size * game.data.run.role.position.y, img_size, img_size);
        game.canvas.actor.now = (game.canvas.actor.now % game.canvas.actor.max) + 1;
    };
    //绘制物品
    var drawGoods = function (context, img, x, y, num) {
        var good_size = game.canvas.good.size;
        var number_offset = game.canvas.good.number.number_offset;
        context.drawImage(img, x, y, good_size, good_size);
        context.strokeStyle = game.canvas.good.number.color;
        context.strokeText(num, x + number_offset, y + number_offset);
    };
    //绘制物品说明
    var drawGoodDesc = function (context) {
        if (game.flag.show_good_desc) {
            var good_size = game.canvas.good.size;
            var good_id = game.data.run.good[game.canvas.good.desc.count].id;
            var desc = game.data.basic.good_desc[good_id];
            var good_array = desc.split('|');
            context.fillStyle = game.canvas.good.desc.background;
            context.fillRect(game.canvas.good.desc.position.x, game.canvas.good.desc.position.y, game.canvas.good.desc.width, game.canvas.good.desc.height);
            var img = new Image();
            img.src = game.data.basic.good_lib[good_id];
            context.drawImage(img, game.canvas.good.desc.position.x + game.canvas.good.desc.img_offset, game.canvas.good.desc.position.y + game.canvas.good.desc.img_offset, good_size, good_size);
            context.strokeText(good_array[0], game.canvas.good.desc.position.x + game.canvas.good.desc.title_x_offset, game.canvas.good.desc.position.y + game.canvas.good.desc.title_y_offset);
            context.strokeText(good_array[1], game.canvas.good.desc.position.x + game.canvas.good.desc.text_x_offset, game.canvas.good.desc.position.y + game.canvas.good.desc.text_y_offset);
        }
    };
    //绘制物品栏
    var drawGoodTab = function (context) {
        var height = game.canvas.good.first_height;
        var width_interval = game.canvas.good.width_interval;
        var height_interval = game.canvas.good.height_interval;
        var img = new Image();
        img.src = game.canvas.good.background_img;
        context.drawImage(img, 0, 0, game.canvas.good.good_tab.width, game.canvas.good.good_tab.height);
        var draw_good_number = 1;
        var max_count = game.data.run.good.length;
        ok : for (var i = 1; i <= 6; i++) {
            var width = game.canvas.good.first_width;
            for (var j = 1; j <= 5; j++) {
                var good_id = game.data.run.good[draw_good_number - 1].id;
                var good_num = game.data.run.good[draw_good_number - 1].num;
                var good_img = new Image();
                good_img.src = game.data.basic.good_lib[good_id];
                drawGoods(context, good_img, width, height, good_num);
                if (draw_good_number >= max_count) {
                    break ok;
                }
                width += width_interval;
                draw_good_number++;
            }
            height += height_interval;
        }
        drawGoodDesc(context);
    };
    //绘制人物状态
    var drawStatus = function (context) {
        context.save();
        var img = new Image();
        img.src = game.canvas.good.background_img;
        context.drawImage(img, 0, 0, game.canvas.status.width, game.canvas.status.height);
        context.restore();
    };
    //绘制保存框
    var drawSaveTab = function (context) {
        context.save();
        var tab = game.data.basic.system[0];
        var yes = game.data.basic.system[3];
        var no = game.data.basic.system[4];
        drawSystemImgByObject(context, 350, 300, tab);
        drawSystemImgByObject(context, 400, 400, yes);
        drawSystemImgByObject(context, 550, 400, no);
        context.font = "30px Courier New";
        context.fillStyle = "#cccccc";
        context.fillText('是否保存', 439, 370);
        context.restore();
    };
    //绘制读取框
    var drawLoadTab = function (context) {
        context.save();
        var tab = game.data.basic.system[0];
        var yes = game.data.basic.system[3];
        var no = game.data.basic.system[4];
        drawSystemImgByObject(context, 350, 300, tab);
        drawSystemImgByObject(context, 400, 400, yes);
        drawSystemImgByObject(context, 550, 400, no);
        context.font = "30px Courier New";
        context.fillStyle = "#cccccc";
        context.fillText('是否读取', 439, 370);
        context.restore();
    };
    //绘制帮助框
    var drawHelpTab = function (context) {
        context.save();
        var tab = game.data.basic.system[0];
        drawSystemImgByObject(context, 350, 300, tab);
        var yes = game.data.basic.system[3];
        drawSystemImgByObject(context, 480, 400, yes);
        context.font = "30px Courier New";
        context.fillStyle = "#cccccc";
        context.fillText('暂时没啥帮助', 410, 370);
        context.restore();
    };
    //根据对象绘制图片(size <= 50)
    var drawImgByObject = function (context, x, y, drawObj) {
        x = x + (50 - drawObj.width) / 2;
        y = y + (50 - drawObj.height) / 2;
        var img = new Image();
        img.src = drawObj.src;
        context.drawImage(img, drawObj.sx, drawObj.sy, drawObj.swidth, drawObj.sheight, x, y, drawObj.width, drawObj.height);
    };
    //根据对象绘制系统图片(不限size)
    var drawSystemImgByObject = function (context, x, y, drawObj) {
        var img = new Image();
        img.src = drawObj.src;
        context.drawImage(img, drawObj.sx, drawObj.sy, drawObj.swidth, drawObj.sheight, x, y, drawObj.width, drawObj.height);
    };
    //切换按钮状态
    $scope.changeButtonStatus = function (flag) {
        if(flag !== 'show_good'){
            game.flag.show_good = false;
        }
        if(flag !== 'show_status'){
            game.flag.show_status = false;
        }
        if(flag !== 'show_good_desc'){
            game.flag.show_good_desc = false;
        }
        if(flag !== 'show_save_tab'){
            game.flag.show_save_tab = false;
        }
        if(flag !== 'show_load_tab'){
            game.flag.show_load_tab = false;
        }
        if(flag !== 'show_help_tab') {
            game.flag.show_help_tab = false;
        }
        game.flag[flag] = !game.flag[flag];
    };

    /**********操作区**********/
    //碰撞检测
    var collision = function (x, y) {
        //检测地形
        if (game.data.run.map.floor[y][x] === 4) {
            console.log('碰到' + game.data.basic.floor[game.data.run.map.floor[y][x]]);
            return false;
        //检测物体
        } else if (game.data.run.map.object[y][x] !== -1 && game.data.basic.object[game.data.run.map.object[y][x]].collision) {
            game.flag.lock_keyboard = true;
            console.log('碰到' + game.data.basic.object[game.data.run.map.object[y][x]]);
            mine.confirm('调查物体？').then(function (choose) {
                game.flag.lock_keyboard = false;
                if (choose) {
                    game.data.run.map.object[y][x] = -1;
                }
            });
            return false;
            //检测怪物
        } else if (game.data.run.map.monster[y][x] !== -1) {
            game.flag.lock_keyboard = true;
            console.log('碰到' + game.data.basic.monster_detail[game.data.run.map.monster[y][x]]);
            mine.confirm('是否攻击？').then(function (choose) {
                game.flag.lock_keyboard = false;
                if (choose) {
                    // game.flag.fight_flag = true;
                    game.data.run.map.monster[y][x] = -1;
                }
            });
            return false;
        } else {
            return true;
        }
    };
    //按键监听
    document.onkeydown = function (e) {
        var x = game.data.run.role.position.x;
        var y = game.data.run.role.position.y;
        e = window.event || e;
        if (game.flag.lock_keyboard) {
            e.preventDefault();
        } else {
            switch (e.keyCode) {
                case 37: //左键
                    if (!game.flag.fight_flag) {
                        x--;
                        if (collision((x < 0 ? 0 : x), y)) {
                            game.data.run.role.position.x = (x < 0 ? 0 : x);
                        }
                        game.data.run.role.direct = 'left';
                    }
                    e.preventDefault();
                    break;
                case 38: //向上键
                    if (!game.flag.fight_flag) {
                        y--;
                        if (collision(x, (y < 0 ? 0 : y))) {
                            game.data.run.role.position.y = (y < 0 ? 0 : y);
                        }
                        game.data.run.role.direct = 'up';
                    }
                    e.preventDefault();
                    break;
                case 39: //右键
                    if (!game.flag.fight_flag) {
                        x++;
                        if (collision((x > game.data.run.map.floor[0].length - 1 ? game.data.run.map.floor[0].length - 1 : x), y)) {
                            game.data.run.role.position.x = (x > game.data.run.map.floor[0].length - 1 ? game.data.run.map.floor[0].length - 1 : x);
                        }
                        game.data.run.role.direct = 'right';
                    }
                    e.preventDefault();
                    break;
                case 40: //向下键
                    if (!game.flag.fight_flag) {
                        y++;
                        if (collision(x, (y > game.data.run.map.floor.length - 1 ? game.data.run.map.floor.length - 1 : y))) {
                            game.data.run.role.position.y = (y > game.data.run.map.floor.length - 1 ? game.data.run.map.floor.length - 1 : y);
                        }
                        game.data.run.role.direct = 'down';
                    }
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        }
    };
    //Canvas/hover事件
    var onMouseMove = function (e) {
        if (game.flag.show_good) {
            if (e.offsetX || e.layerX) {
                var mx = e.offsetX === undefined ? e.layerX : e.offsetX;
                var my = e.offsetY === undefined ? e.layerY : e.offsetY;
                console.log(mx);
                console.log(my);
                var height = game.canvas.good.first_height;
                var width_interval = game.canvas.good.width_interval;
                var height_interval = game.canvas.good.height_interval;
                var good_size = game.canvas.good.size;
                var draw_good_number = 1;
                var max_count = game.data.run.good.length;
                ok : for (var i = 1; i <= 6; i++) {
                    var width = game.canvas.good.first_width;
                    for (var j = 1; j <= 5; j++) {
                        if (mx > width && mx < width + good_size && my > height && my < height + height_interval) {
                            game.flag.show_good_desc = true;
                            game.canvas.good.desc.position.x = mx;
                            game.canvas.good.desc.position.y = my;
                            game.canvas.good.desc.count = draw_good_number - 1;
                            break ok;
                        } else {
                            game.flag.show_good_desc = false;
                        }
                        if (draw_good_number >= max_count) {
                            break ok;
                        }
                        width += width_interval;
                        draw_good_number++;
                    }
                    height += height_interval;
                }
            }
        }
    };

    init();
});