var Route = angular.module("Route", ['ngRoute']);

//配置路由
Route.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/index2', {
            templateUrl: 'views/login.html',
            controller: "loginCtrl"
        }).when('/index', {
            templateUrl: 'views/game.html',
            controller: "gameCtrl"
        }).otherwise({
            redirectTo: "/index"
        })
    }
]);