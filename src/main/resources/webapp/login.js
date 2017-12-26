"use strict";

var App = angular.module("myApp", ['ngRoute', 'ui.bootstrap', 'ModalService', 'ModalCtrl']);

//配置路由
App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'login.html',
            controller: "loginCtrl"
        }).when('/register', {
            templateUrl: 'register.html',
            controller: "registerCtrl"
        }).when('/active/:code', {
            templateUrl: 'active.html',
            controller: "activeCtrl"
        }).otherwise({
                redirectTo: "/index"
            }
        );
    }
]);

//主页控制器
App.controller('myCtrl', function ($scope, $location) {

});

//登录控制器
App.controller('loginCtrl', function ($scope, $location, $window, HttpProvider, mine) {
    $scope.user = {};
    $scope.toRegist = function () {
        $location.url("/register");
    };
    $scope.toSubmit = function () {
        var Params = {
            srv_name: 'system/user/userLogin.do',
            data: {user_id: $scope.user.username, password: $scope.user.password}
        };
        HttpProvider.call(Params).then(function (data) {
            if (data.srv_status == 2) {
                mine.alert(data.message);
            } else if (data.srv_status == 1) {
                window.location.href = 'app/index.html';
            }
        }, function (error) {
            mine.alert(error.scode);
        })
    }
});

//注册控制器
App.controller('registerCtrl', function ($scope, $location, HttpProvider, mine) {
    $scope.reg = {};
    $scope.return = function () {
        $location.url("/index");
    };
    $scope.formSubmit = function () {
        $scope.reg.phone = parseInt($scope.reg.phone);
        var Params = {
            srv_name: 'system/user/userRegister.do',
            data: {
                user_id: $scope.reg.username,
                password: $scope.reg.password,
                user_cn_name: $scope.reg.cname,
                email: $scope.reg.email,
                phone: $scope.reg.phone
            }
        }
        HttpProvider.call(Params).then(function (data) {
            if (data.srv_status == 2) {
                mine.alert(data.message);
            } else if (data.srv_status == 1) {
                mine.alert('注册成功！请前往邮箱激活').then(function (choose) {
                    if (choose) {
                        $location.url("/index");
                    }
                });
            }
        }, function (error) {
            mine.alert(error.scode);
        });
    }
});

//激活用户控制器
App.controller('activeCtrl', function ($scope, $location, $routeParams, $timeout, $interval, HttpProvider, mine) {
    var Params = {srv_name: 'system/user/activeUser.do', data: {code: $routeParams.code}};
    HttpProvider.call(Params).then(function (data) {
        mine.alert("激活成功！请前往主页登陆！").then(function (choose) {
            if (choose) {
                $location.url("/index");
            }
        });
    }, function (error) {
        mine.alert(error.scode);
    });
});

//调用后台服务
App.service('HttpProvider', function ($http, $q) {
    this.call = function (Params) {
//      引入$q是为了让该服务有个回调方法，固定写法
        var _data = $q.defer();
        console.log(Params.srv_name, Params.data);
        //将参数传递的方式改成form
        var postCfg = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        };
        $http.post(Params.srv_name, Params.data, postCfg).success(function (data, status, headers, config) {
            var _res_head = data.sys_header;
            // if(_res_head.status == 'ok') {
            _data.resolve(data)
//             } else {
// //                      服务返回失败状态一，空对象就是error对象，可自己定义
//                 _data.reject(_res_head);
//             }
        }).error(function (data, status, headers, config) {
//              服务根本就没有通，失败状态三
            _data.reject({message: '发生未知错误'});
        });
        return _data.promise;
    }
});

//注册页定时指令
App.directive("timerButton", function ($timeout, $interval) {
    return {
        restrict: "AE",
        scope: {
            showtimer: '='
        },
        replace: true,
        link: function (scope, element, attrs) {
            scope.timer = false;
            scope.timeout = 60000;
            scope.timerCount = scope.timeout / 1000;
            scope.text = "获取验证码";

            scope.onclick = function () {
                scope.showtimer = true;
                scope.timer = true;
                scope.text = "秒后重新获取";
                var counter = $interval(function () {
                    scope.timerCount = scope.timerCount - 1;
                }, 1000);

                $timeout(function () {
                    scope.text = "获取验证码";
                    scope.timer = false;
                    $interval.cancel(counter);
                    scope.showtimer = false;
                    scope.timerCount = scope.timeout / 1000;
                }, scope.timeout);
            }
        },
        template: '<button ng-click="onclick()" ng-disabled="timer" class="btn btn-primary btn-regist" type="button"><span ng-if="showtimer">{{ timerCount }}</span>{{text}}</button> '
    };
});