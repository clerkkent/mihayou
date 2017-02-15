;MyApp01.controller("roles",["$scope","role_Service","$state",function($scope,role_Service,$state){//此处参数位置不对，会导致代码错误
	$scope.roles=null;
	var promise_roles=role_Service.query('http://clerkkent.duapp.com/php/role.php');
		promise_roles.then(function(data){
			$scope.roles=data;
			$scope.roleSelectByclick=function(a){
			$state.go("."+a)	
		}
		},function(){
			console.log("角色数据不存在或丢失");
	})	
}]);

MyApp01.controller("details",["$scope","$stateParams","$sce","title","index","$state",function($scope,$stateParams,$sce,title,index,$state){
	$scope.roledata=title;
	$scope.leftgo=function(){//index中涵盖了较多数据，但有些数据如路由跳转可使用ui-router自带逻辑实现
		$state.go("^."+index.pass)
	}
	$scope.rightgo=function(){
		$state.go("^."+index.future)
	}
	$scope.passcard=index.left;
	$scope.futurecard=index.right;
	$scope.trustsrc=function(url){//保证数据正常传输;
    	return $sce.trustAsResourceUrl(url);
	}
	
}]);
MyApp01.controller("stigmata",["$scope","$state","role_Service",function($scope,$state,role_Service){
	var promise_roles=role_Service.query('http://clerkkent.duapp.com/php/stignata.php');
		promise_roles.then(function(data){
			$scope.roles=data;
			$scope.roleSelectByclick=function(a){
			$state.go("."+a)	
		}
		},function(){
			console.log("角色数据不存在或丢失");
	})
}]);