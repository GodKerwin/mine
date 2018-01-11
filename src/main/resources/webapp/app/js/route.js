var Route = angular.module("Route", ['ngRoute']);

//配置路由
Route.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'views/home.html',
            controller: "homeCtrl"
        }).when('/about', {
            templateUrl: 'views/about.html',
            controller: "aboutCtrl"
        }).when('/game_index', {
            templateUrl: 'views/game/game_index.html',
            controller: "gameIndexCtrl"
        }).when('/text', {
            templateUrl: 'views/game/text/text.html',
            controller: "textCtrl"
        }).when('/elf', {
            templateUrl: 'views/game/elf/elf.html',
            controller: "elfCtrl"
        }).when('/3Dtext', {
            templateUrl: 'views/game/canvas/3Dtext.html',
            controller: "3DtextCtrl"
        }).when('/star', {
            templateUrl: 'views/game/canvas/star.html',
            controller: "starCtrl"
        }).when('/clock', {
            templateUrl: 'views/game/canvas/clock.html',
            controller: "clockCtrl"
        }).when('/tangram', {
            templateUrl: 'views/game/canvas/tangram.html',
            controller: "tangramCtrl"
        }).when('/count', {
            templateUrl: 'views/game/canvas/count.html',
            controller: "countCtrl"
        }).when('/rpg', {
            templateUrl: 'views/game/rpg/rpg.html',
            controller: "rpgCtrl"
        }).when('/poker', {
            templateUrl: 'views/game/poker/poker.html',
            controller: "pokerCtrl"
        }).when('/fish', {
            templateUrl: 'views/game/fish/fish.html',
            controller: "fishCtrl"
        }).otherwise({
            redirectTo: "/index"
        })
    }]);