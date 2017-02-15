;MyApp01.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	$stateProvider.state("index",{
		url:"/index",
		controller:"index",
		templateUrl:"html/SubHtml/index1.html",
	})
	.state("news",{
		url:"/news",
		controller:"index",
		templateUrl:"html/SubHtml/news.html"
	})
	.state("video",{
		url:"/video",
		templateUrl:"html/SubHtml/video.html",
		controller:function($scope,video_Service){
			$scope.video=null;
			video_Service.video_play();
			var promise_video=video_Service.query();
				promise_video.then(function(data){
					$scope.video=eval(eval(data));
				},function(){
					console.log("视频数据不存在或丢失");
			})
		},
	})
	.state("roles",{
		url:"/role",
		templateUrl:"html/SubHtml/role.html",
		controller:'roles',
	})
	.state("featuree",{
		url:"/feature",
		templateUrl:"html/SubHtml/feature.html",
		controller:"index",
	})
	.state("stigmata",{
		url:"/stigmata",
		templateUrl:"html/SubHtml/stigmata.html",
		controller:"stigmata",
	
	})
	.state("story",{
		url:"/story",
		templateUrl:"html/SubHtml/story.html",
	});
	
	var date=set("http://clerkkent.duapp.com/php/role.php");
	var datesti=set("http://clerkkent.duapp.com/php/stignata.php")
	function set(urll){
		var aa=null;
		$.ajax({
		   type: "get",
		   url: urll,
		   async:false,//此处使用同步的原因
		   success: function(data){
		     aa=eval(JSON.parse(data));
		   }
		});
		return aa;
	};
 	angular.forEach(date, function (value,key,array) {
  //判断state是否已经注册,有可能导致重复注入而报错
		  var state = {
		    "url": "/"+value.eng,
		    "templateUrl": "html/SubHtml/role_details.html",
		    "controller": "details",
		   	"resolve":{//此处的function亦可使用已经注册的服务
		   		person:"role_details_Service",//此处服务的使用方式有点特殊
		   		title:function(person){//此处请求数据次数过多~~~
		   			return person.query(value.eng,'http://clerkkent.duapp.com/php/role.php')
		   		},
		   		get:"role_details_get",
		   		index:function(get){
		   			return get.indexget(value.eng,array)
		   		}	
		   	}
		  };
		  var rolename="roles."+value.eng;
		
		  $stateProvider.state(rolename, state);
	});
	angular.forEach(datesti, function (value,key,array) {
  //判断state是否已经注册,有可能导致重复注入而报错
		  var state = {
		    "url": "/"+value.eng,
		    "templateUrl": "html/SubHtml/stigmatasub.html",
		    "controller": "details",
		   	"resolve":{//此处的function亦可使用已经注册的服务
		   		person:"role_details_Service",//此处服务的使用方式有点特殊
		   		title:function(person){
		   			return person.query(value.eng,"http://clerkkent.duapp.com/php/stignata.php")
		   		},
		   		get:"role_details_get",
		   		index:function(get){
		   			return get.indexget(value.eng,array)
		   		}	
		   	}
		  };
		  var rolename="stigmata."+value.eng;
		
		  $stateProvider.state(rolename, state);
	});
	$urlRouterProvider.otherwise("other");
	
}]);