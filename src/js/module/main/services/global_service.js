;MyApp01.factory("init_all",['$http','$q',function($http,$q){//主页新闻页服务
	var factory={};
		factory.animate=function(){
			$.fn.extend({
			addam:function(sec,am,dur,del){
				sec.addClass("ani");
				sec.attr({"swiper-animate-effect":am,"swiper-animate-duration":dur+"s"});
				sec.attr({"swiper-animate-delay":del+"s"});
			}
			});
		}
		factory.index_banner=function(){//初始化swiper
			new Swiper(".swiper-container",{
				loop:false,
				pagination:".swiper-pagination",
				autoplay:3000,
				speed:1000,
				effect : 'cube',
				cube: {
				  slideShadows: true,
				  shadow: true,
				  shadowOffset: 10,
				  shadowScale: 1.5,
				}
			});
			Pace.on("start",function(){
				$(".loading_self").removeClass('disappear');
			});                              
			Pace.on("done",function(){
				$(".loading_self").addClass('disappear');
			});
		}
		/*factory.index_deal=function(){//菜单转换动作
			$(".head_title").click(function(){
				$("header").css({left:"100%"});
				$(".index_con").css({left:"100%"});
				$(".menu_global").css({left:"0%"});
			});
			$(".menu_close").click(function(){
				$("header").css({left:"0%"});
				$(".index_con").css({left:"0%"});
				$(".menu_global").css({left:"100%"});
			});
			$(".menu_content a").click(function(){
				$("header").css({left:"0%"});
				$(".index_con").css({left:"0%"});
				$(".menu_global").css({left:"100%"});
			});
			
		}*/
		factory.query=function(){//主页新闻页数据获取
			var defer=$q.defer();
			$http.get("http://clerkkent.duapp.com/php/datalist.php?code=1").success(function(data,status,headers,config){
				defer.resolve(data);
				console.log('获取新闻数据成功');
			}).error(function() {
				 defer.reject();      //声明执行失败
	            console.log('获取新闻数据失败');
			});
			return defer.promise;
		}	
		return factory;
}]);


MyApp01.factory('video_Service',['$http','$q',function($http,$q){//视频页服务
    return{
	       query:function(){
	        var defer=$q.defer();  //声明延后执行
	        $http.get('http://clerkkent.duapp.com/php/video.php?code=1').
	        success(function(data,status,headers,config){
	            defer.resolve(data);  //声明执行成功
	            console.log('获取视频数据成功');
	        }).
	        error(function(data,status,headers,config){
	            defer.reject();      //声明执行失败
	            console.log('获取视频数据失败');

	        });             
	        return defer.promise; //返回承诺，返回获取数据的API
	        },
	        video_play:function(){
	        	$("#video").on("click",".play-btn",function(){
	        		$("#video-frame").css({transform:"scale(1)"});
	        		$("#video-frame video").attr({poster:$(this).attr("cover_src"),src:$(this).attr("video_src")});
	        	});
	        	$(".row").on("touchend",".play-btn",function(){
	        		$("#video-frame").css({transform:"scale(1)"});
	        		$("#video-frame video").attr({poster:$(this).attr("cover_src"),src:$(this).attr("video_src")});
	        	});
	        	$(".video-close-btn").click(function(){
	        		$("#video-frame").css({transform:"scale(0)"});
	        		$("#video-frame video").attr({poster:"",src:""});
	        	})
	        }
        }//此处写成直接返回对象，或者声明对象变量，在进行返回赋值对象效果以相同
}]);


MyApp01.factory("role_Service",['$http','$q',function($http,$q){//角色页服务
	return{
	       query:function(urll){
	        var defer=$q.defer();  //声明延后执行
	        $http.get(urll,{cache:true}).
	        success(function(data,status,headers,config){
	            defer.resolve(eval(JSON.parse(data)));  //声明执行成功
	            console.log('获取角色数据成功');
	        }).
	        error(function(data,status,headers,config){
	            defer.reject();      //声明执行失败
	            console.log('获取角色数据失败');
	        });             
	        return defer.promise; //返回承诺，返回获取数据的API
	        }
	    }
}]);
MyApp01.factory("role_details_Service",['$http','$q',function($http,$q){//角色页服务
	return {
	       query:function(name,urll){
	        var defer=$q.defer();  //声明延后执行
	        $http.get(urll,{cache:true}).
	        success(function(data,status,headers,config){
	            defer.resolve(_.filter(eval(JSON.parse(data)),function(num){
	            	return num["eng"]==name
	            })[0]);  //声明执行成功
	            console.log('获取角色数据成功');
	        }).
	        error(function(data,status,headers,config){
	            defer.reject();      //声明执行失败
	            console.log('获取角色数据失败');
	        });             
	        return defer.promise; //返回承诺，返回获取数据的API
	        }
	       
	    }
}]);
MyApp01.factory("role_details_get",['$http','$q',function($http,$q){//
	return {
		indexget:function(point,date){
	       		var a=null;
	       		var temp=_.map(date,function(num){return num.eng})
	       		now=_.indexOf(temp,point)
	       		if(temp[now]==temp[temp.length-1]){
	       			a={pass:temp[now-1],nowd:point,future:temp[0],left:date[now-1].card,right:date[0].card}
	       		}else if(temp[now]==temp[0]){
	       			a={pass:temp[temp.length-1],nowd:point,future:temp[now+1],left:date[temp.length-1].card,right:date[now+1].card}
	       		}else{
	       			a={pass:temp[now-1],nowd:point,future:temp[now+1],left:date[now-1].card,right:date[now+1].card}
	       		}
	       		
	       		return a;
	       }
	}
}]);
