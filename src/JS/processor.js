(function($,root){
	var $scope = $(document.body);
	var curDuration;
	var frameId;
	var lastPercentage = 0;
	var startTime;
	/*把秒转成分和秒*/
	function formatTime(duration){
		duration = Math.round(duration);
		var minute = Math.floor(duration/60);
		var second = duration-minute*60;
		if(minute<10){
			minute = "0"+minute;
		}
		if(second<10){
			second = "0"+second;
		}
		return minute + ":" +second;
	}
	function renderAllTime(duration){
		lastPercentage = 0;
		curDuration = duration;
		var allTime = formatTime(duration);
		$scope.find('.all-time').html(allTime);
	}
	function updata(percent){
		var curTime = percent*curDuration;
		curTime = formatTime(curTime);
		$scope.find('.cur-time').html(curTime);
		var percentage = (percent - 1)*100 +"%";
		$scope.find(".pro-top").css({
			transform:"translateX("+percentage+")"
		})
	}

	function start(percentage){
		lastPercentage = percentage === undefined?lastPercentage:percentage;
		cancelAnimationFrame(frameId);
		startTime = new Date().getTime();
		function frame(){
			var curTime = new Date().getTime();
			var percent = lastPercentage + (curTime - startTime)/(curDuration*1000);/*变成毫秒*/
			if(percent<1){
				frameId=requestAnimationFrame(frame);
				updata(percent);
				root.lyric.roller(percent,startTime);
			}else{
				cancelAnimationFrame(frameId);
			}
		}
		frame();
	}
	function stop(){
		var stopTime = new Date().getTime();
		lastPercentage = lastPercentage + (stopTime - startTime)/(curDuration*1000);
		cancelAnimationFrame(frameId);
	}
	root.processor = {
		renderAllTime:renderAllTime,
		start:start,
		stop:stop,
		updata:updata
	}
})(window.Zepto,window.player||(window.player={}))