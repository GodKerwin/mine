"use strict";
var App = angular.module("myApp", [
    'Route',
    'ui.bootstrap',
    'MineDirective',
    'CommService',
    'ModalService',
    'ModalCtrl',
    'GameCtrl',
    'MineWorldCtrl'
]);

//主页控制器
App.controller('myCtrl', function ($scope, $location, $window, mine) {
    $scope.moveTo = function(url){
        $location.url(url);
    };
    $scope.logout = function(){
        mine.confirm('确定要注销？').then(function (choose) {
            if (choose) {
                $window.location.href='../index.html';
            }
        });
    }
});

//关于控制器
App.controller('aboutCtrl', function ($scope, $location, $window, mine) {

});