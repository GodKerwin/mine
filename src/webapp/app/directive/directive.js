var mineDirective = angular.module("MineDirective", []);

mineDirective.directive("goElf", function () {
    return{
        restrict: "AE",
        replace:true,
        scope: {
            elfname:'@'
        },
        link: function(scope, element, attrs) {
            scope.imgname = "./img/go/"+scope.elfname+".jpg"
        },
        template:' <div class="go-elf-div col-xs-1"><label class="go-elf-text">{{elfname}}</label><img src="./img/border.jpg" class="go-elf-border"><img src={{imgname}} alt={{elfname}} class="go-img"></div>'
    };
});