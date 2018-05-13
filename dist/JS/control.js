(function($,root){
	function controlManager(len){
		this.index = 0;
		this.len = len;
	}
		controlManager.prototype = {
			prev:function(){
				return this.getIndex(-1);
			},
			next:function(){
				return this.getIndex(1);
			},
			getIndex:function(val){/**********！important算法***********/
				var index = this.index;
				var len = this.len;
				var curIndex = (index + val + len)%len;/*取出当前下标*/
				this.index = curIndex; 
				return curIndex;/*完成切换*/
			}
		}
		root.controlManager = controlManager;
})(window.Zepto,window.player||(window.player = {}))
