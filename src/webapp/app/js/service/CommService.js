
/**
 * Created by Xul on 2017/3/16.
 */
var CommService = angular.module("CommService",[]);

CommService.service('HttpProvider',function($http,$q){
    this.call =  function(Params){
//              引入$q是为了让该服务有个回调方法，固定写法
        var _data = $q.defer();
        console.log(Params.srv_name, Params.data);
        //将参数传递的方式改成form
        var postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            }
        };
        $http.post(Params.srv_name, Params.data, postCfg).success(function(data, status, headers, config) {
            var _res_head = data.sys_header;
            // if(_res_head.status == 'ok') {
            _data.resolve(data)
//             } else {
// //                      服务返回失败状态一，空对象就是error对象，可自己定义
//                 _data.reject(_res_head);
//             }
        }).error(function(data, status, headers, config) {
//              服务根本就没有通，失败状态三
            _data.reject({message : '发生未知错误'});
        });
        return _data.promise;
    }
});