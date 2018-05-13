(function($,root){
	var $scope = $(document.body);
	//渲染当前那这首歌的信息
	function renderInfo(info){
		var html = '<div class="song-name">'+info.song+'</div>\
		<div class="singer-name">'+info.singer+'</div>\
		<div class="album-name">'+info.album+'</div>';
		$scope.find(".song-info").html(html);
	}
	//渲染当前那这首歌的图片
	function renderImage(src){
		var img = new Image();
		img.onload = function(){/*
			root.blurImg(img,$scope);*/
			$scope.find(".song-img img").attr("src",src);
		}
		img.src = src;
	}

	function renderIsLike(isLike){
		if(isLike){
			$scope.find(".like-btn").addClass("liking");
		}else{
			$scope.find(".like-btn").removeClass("liking");
		}
	}
	root.render = function(data){
		renderInfo(data);
		renderImage(data.image);
		renderIsLike(data.islike);
	}
})(window.Zepto,window.player||(window.player = {}))
