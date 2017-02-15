;
var MyApp01 = angular.module("MyApp01", ["ionic", "ui.router", 'ngCordova']);
MyApp01.controller("MainCtrl", ["$scope", "$ionicSideMenuDelegate", "$state", "init_all", function MainCtrl($scope, $state, $ionicSideMenuDelegate, init_all) {

    //$state.transitionTo('index');
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.init_do = function() { //控制全局初始化（包含菜单初始化，页面载入动画初始化，swiper动画初始化等）
        init_all.index_banner();
        //init_all.index_deal();//菜单初始化，移除~	
    }
    $scope.init_do();



}])

MyApp01.controller("index", ["$scope", "$state", "$http", "init_all", function($scope, $state, $http, init_all) {
    $scope.news = null;
    $scope.order = null;
    $scope.select = null;
    $scope.selectByclick = function(a) {
            $scope.select = a;
        }
        //测试
    $scope.orderByclick = function(a) {
        $scope.select = null;
        $scope.order = "timen";
    }

    var promise_news = init_all.query(); //此处存在作用域问题，貌似是代码执行阶段必须涵盖于其作用域内，上部的函数执行操作在页面之内
    promise_news.then(function(data) {
        $scope.news = eval(JSON.parse(data));
    }, function() {
        console.log("新闻数据不存在或丢失");
    })
}])