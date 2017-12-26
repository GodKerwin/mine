var Route = angular.module("Route", ['ngRoute']);

//配置路由
Route.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'views/mineworld/mineworld.html',
            controller: "mineworldCtrl"
        }).when('/about', {
            templateUrl: 'views/about.html',
            controller: "aboutCtrl"
        }).when('/mine', {
            templateUrl: 'views/mineworld/mine.html',
            controller: "mineCtrl"
        }).when('/mine2', {
            templateUrl: 'views/mineworld/mine2.html',
            controller: "mine2Ctrl"
        }).when('/mine3', {
            templateUrl: 'views/mineworld/mine3.html',
            controller: "mine3Ctrl"
        }).when('/mine4', {
            templateUrl: 'views/mineworld/mine4.html',
            controller: "mine4Ctrl"
        }).when('/mine5', {
            templateUrl: 'views/mineworld/mine5.html',
            controller: "mine5Ctrl"
        }).when('/mine6', {
            templateUrl: 'views/mineworld/mine6.html',
            controller: "mine6Ctrl"
        }).when('/mine7', {
            templateUrl: 'views/mineworld/mine7.html',
            controller: "mine7Ctrl"
        }).when('/mine8', {
            templateUrl: 'views/mineworld/mine8.html',
            controller: "mine8Ctrl"
        }).when('/game_index', {
            templateUrl: 'views/game/game_index.html',
            controller: "gameIndexCtrl"
        }).when('/fight_scene', {
            templateUrl: 'views/game/rpg/fight_scene.html',
            controller: "fightSceneCtrl"
        }).when('/poker_scene', {
            templateUrl: 'views/game/poker/poker_scene.html',
            controller: "pokerSceneCtrl"
        }).when('/fish_scene', {
            templateUrl: 'views/game/fish/fish_scene.html',
            controller: "fishSceneCtrl"
        }).when('/card_index', {
            templateUrl: 'views/game/card/card_index.html',
            controller: "cardIndexCtrl"
        }).when('/card_scene', {
            templateUrl: 'views/game/card/card_scene.html',
            controller: "cardSceneCtrl"
        }).otherwise({
            redirectTo: "/index"
        });
    }]);