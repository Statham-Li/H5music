(function($,root){
	var $scope = $(document.body);
	var control;
	var $playlist = $("<div class = 'play-list'>"+
	"<div class = 'play-header'>播放列表</div>"+
	"<ul class='list-wrapper'></ul>"+
	"<div class='close-btn'>关闭</div>"+
	"</div>")
	/*渲染我们的播放列表DOM*/
	function renderList(songList){
		var html = '';
		for(var i = 0;i<songList.length;i++){
			html+="<li><h3>"+songList[i].song+"-<span>"+songList[i].singer+"</span></h3></li>"
		}
		$playlist.find('ul').html(html);
		$scope.append($playlist);
		bindEvent();
	}
	function show(controlmanager){
		control=controlmanager;
		$playlist.addClass("show");
		signSong(control.index);
	}
	function bindEvent(){
		$playlist.on("click",".close-btn",function(){
				$playlist.removeClass('show');
		})
		$playlist.find("li").on("click",function(){
			var index = $(this).index();
			signSong(index);
			control.index = index;
			$scope.trigger("play:change",index,true);
			setTimeout(function(){
				$playlist.removeClass("show");
			},200)
		})
	}
	function signSong(index){
		$playlist.find(".sign").removeClass("sign");
		$playlist.find("ul li").eq(index).addClass("sign");
	}
	root.playList = {
		renderList:renderList,
		show:show
	}
})(window.Zepto,window.player||(window.player={}))