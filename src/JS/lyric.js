(function($,root){
	$scope = $(document.body);
	$lyricDiv = $('.lyric .lrc-ul');
	$lyc = $('.lyric .lrc-ul .lrc-item')
	$lyric = $scope.find('.lyric .lrc-ul');
	var curTime;
	var timing;
	var curDuration;
	var lastPercentage = 0;
	var starttime;
	function cut(songList){
			source = songList;
			var rule = /\[.*\]/g;
			var res=songList.split(rule);
			var num = res.length;
		for(var i = 3;i<num;i++){
			var item = res[i];
			$lyric.append("<li class='lrc-item'>"+item+"</li>")
		}
	}
	function lrcFormatTime(duration){
		duration = Math.round(duration);
		var minute = Math.floor(duration/60);
		var second = duration-minute*60;
		if(minute<10){
			minute = "0"+minute;
		}
		if(second<10){
			second = "0"+second;
		}
		console.log(minute + ":" +second);
		return minute + ":" +second;
	}
		function changed(curTime){
			console.log(curTime);
			var res1 = source.split(/\n/g);
			for(var i = 0;i<res1.length;i++){
						if(res1[i].match(/\[.*\]/)){
							timing1=res1[i].match(/\[.*\]/).toString();
							timing = (timing1.match(/[0-9][0-9]:[0-9][0-9]/))+"";
								if(curTime==timing){
									console.log(timing);
								}
						}
			}
		}
	function roller(percent,startTime){
		starttime = startTime
		var curTime = new Date().getTime();
		var now = (curTime - startTime)/1000;
		console.log(now);
		var percentage = (percent - 1)*100 ;
		$lyricDiv.css({
			transform:"translateY("+(-100-percentage)+"%)"
		})
		/*--------------------------------*/
		function lrcframe(){
			var curTime = new Date().getTime();
			var now = (curTime - startTime)/1000;
			/*var percent = lastPercentage + (curTime - startTime)/(curDuration*1000);*//*变成毫秒*/
			/*if(percent<1){
				frameId=requestAnimationFrame(lrcframe);
				updata(percent);
				root.lyric.roller(percent);
			}else{
				cancelAnimationFrame(frameId);
			}*/
			curtime = lrcFormatTime(now);
			console.log(curtime);
			changed(curtime);
		}
		lrcframe();
		
	}
	
		function stopLrc(starttime){
				var stopTime = new Date().getTime();
				lastPercentage = lastPercentage + (stopTime - starttime)/(curDuration*1000);
			}
	root.lyric = {
		cut:cut,
		roller:roller,
		stopLrc:stopLrc
	}
})(window.Zepto,window.player||(window.player={}))