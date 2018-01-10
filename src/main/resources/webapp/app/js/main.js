"use strict";
var App = angular.module("myApp", [
    'Route',
    'ui.bootstrap',
    'Interceptor',
    'ngCookies',
    'MineDirective',
    'CommService',
    'ModalService',
    'ModalCtrl',
    'GameCtrl',
    'MineWorldCtrl'
]);

//主页控制器
App.controller('myCtrl', function ($scope, $location, $window, $cookies, $timeout, Session, mine) {

    $scope.init = function () {
        Session.create($cookies.getObject("mineCookie"));
        console.log("init");
        console.log(Session.get('auth_flag'));
        //校验用户登录状态
        $timeout(function () {
            if(Session.get('auth_flag') !== 'auth'){
                console.log("check!!!");
                //用户未登录，跳回登录页
                $window.location.href = '../index.html';
            }
        }, 50);
    };

    $scope.moveTo = function (url) {
        $location.url(url);
    };

    $scope.logout = function () {
        mine.confirm('确定要注销？').then(function (choose) {
            if (choose) {
                Session.destroy();
                $window.location.href = '../index.html';
            }
        });
    };
    $window.onload = $scope.init();
});

//关于控制器
App.controller('aboutCtrl', function ($scope, $location, mine) {
    console.log("this is about controller")
});

//=========本地存储数据服务============
App.factory('Session', ['$window', function ($window) {
    return {
        create: function (mineCookie) {
            if (mineCookie) {
                $window.localStorage['id'] = mineCookie.user_id;
                $window.localStorage['user_id'] = mineCookie.user_id;
                $window.localStorage['role_id'] = mineCookie.role_id;
                $window.localStorage['auth_flag'] = 'auth';
            }
        },

        get: function (key) {
            return $window.localStorage[key];
        },

        destroy: function () {
            $window.localStorage['id'] = null;
            $window.localStorage['user_id'] = null;
            $window.localStorage['role_id'] = null;
            $window.localStorage['auth_flag'] = null;
        }
    }
}]);