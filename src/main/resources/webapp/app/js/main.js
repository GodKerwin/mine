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
    'GameCtrl'
]);

//主页控制器
App.controller('myCtrl', function ($scope, $rootScope, $location, $window, $cookies, $timeout, Session, mine) {

    $scope.init = function () {
        Session.create($cookies.getObject("mineCookie"));
        //校验用户登录状态
        $timeout(function () {
            //每次访问检查Session过期时间
            if (Session.get('auth_flag') === 'auth') {
                if (new Date() >= new Date(Session.get('date'))) {
                    Session.destroy();
                }
            }
            if (Session.get('auth_flag') !== 'auth') {
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

//主界面控制器
App.controller('homeCtrl', function ($scope, $location, mine) {
    console.log("this is home controller")
});

//=========本地存储数据服务============
App.factory('Session', ['$window', function ($window) {
    return {
        create: function (mineCookie) {
            if (mineCookie) {
                $window.localStorage['id'] = mineCookie.user_id;
                $window.localStorage['user_id'] = mineCookie.user_id;
                $window.localStorage['role_id'] = mineCookie.role_id;
                //此处设置一个1天有效期
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $window.localStorage['date'] = expireDate.toUTCString();
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