(function(){
	function controlM(len){
		this.index = 0;
		this.length = len;
		control.prototype = {
			prev:function(){
				return this.getIndex(-1);
			},
			next:function(){
				return this.getIndex(1);
			}
			getIndex:function(val){
				var index = index;
				var len = this.len;
				var curIndex = (index + val + len)%len;
				return curindex;
			}
		}
	}
})(window.Zepto,window.player||(window.player = {}))
