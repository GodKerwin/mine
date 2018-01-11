/**
 * Created by Xul on 2018/1/11.
 */
var text = angular.module('TextCtrl', []);

//文字冒险游戏控制器
text.controller('textCtrl', function ($scope, $location) {
    $scope.gotonext = function (name) {
        $(".text-act").addClass("hidden");
        $(name).removeClass("hidden");
    }
});