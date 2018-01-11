/**
 * Created by Xul on 2018/1/11.
 */
var poker = angular.module('PokerCtrl', []);

/**
 * 斗地主场景控制器
 */
poker.controller('pokerCtrl', function ($scope, $location, $interval, $timeout, HttpProvider, mine) {
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
            var Params = {srv_name: 'game/poker/queryGroupPoker.do', data: {}};
            HttpProvider.call(Params).then(function (data) {
                if (data) {
                    data = data.data;
                    $scope.poker.playerA.playerPokers = data.groupPokers.playerA;
                    $scope.poker.playerB.playerPokers = data.groupPokers.playerB;
                    $scope.poker.playerC.playerPokers = data.groupPokers.playerC;
                    $scope.poker.hideCards = data.groupPokers.hideCards;
                    // $scope.global.callLandFlag = data.call_flag;
                }
                $scope.global.startPokerFlag = true;
                $scope.global.callLandFlag = true;
            }, function (error) {
                mine.alert('发生未知错误');
            });
        } else {
            mine.alert("已开局！")
        }
    };
    //叫地主
    $scope.callLandlord = function (user_id, player, flag) {
        if ($scope.global.callLandFlag) {
            var Params = {srv_name: 'game/poker/callLandlord.do', data: {player: player, call_flag: flag}};
            HttpProvider.call(Params).then(function (data) {
                if (data) {
                    data = data.data;
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
                mine.alert('发生未知错误');
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
                        player: player,
                        last_player: last_player,
                        push_pokers: angular.toJson(push_pokers),
                        last_push_pokers: angular.toJson(last_push_pokers)
                    }
                };
                HttpProvider.call(Params).then(function (data) {
                    if (data) {
                        if(data.code !== 0){
                            for (var i = 0; i < $scope.poker.playerA.playerPokers.length; i++) {
                                $scope.poker.playerA.playerPokers[i].choose_flag = 0;
                            }
                            $scope.poker.playerA.push_pokers = [];
                        }else {
                            data = data.data;
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
                    }
                }, function (error) {
                    mine.alert('发生未知错误');
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
                player: player,
                last_player: last_player,
                last_push_pokers: angular.toJson(last_push_pokers)
            }
        };
        HttpProvider.call(Params).then(function (data) {
            if (data) {
                data = data.data;
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