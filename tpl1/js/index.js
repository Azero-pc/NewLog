//项目配置
require.config({
    urlArgs : 'v=0.1.2',
    paths: {
        'jquery': './jquery.min',
		'plugins': './Plug-ins',
		'MobileSelect': './mobileSelect',
		'appService': './appService', //移动端方法
		'wx': 'https://res.wx.qq.com/open/js/jweixin-1.3.2'
    },
    shim: {
    	'jquery': {exports: '$'},
		'plugins':{deps:['jquery']},
		'MobileSelect':{deps:['jquery']},
		'wx':{deps:['jquery']},
    },
});
define(['jquery', 'plugins','MobileSelect','appService','wx'], function ($, plugins,MobileSelect,appService,wx) {
	setTimeout(function () {
		var configdata = [],
			config = "";
		var iframeObj, //获取 iframe 
			dynamicVal; // 获取 iframe dynamicVal 值
		try{
			iframeObj=$(window.frames["indexIframe"].document); 
			dynamicVal = iframeObj.find("#dynamicVal").val();
		}catch(e){
			dynamicVal = "$%dynamicVal%$";
		}
		var getUrlString = function(name) { //获取url参数
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				var urlVal = unescape(r[2]);
				if(name == "nickName" || name == "nickname"){ //微信昵称
					urlVal = r[2];
				}
				return urlVal; 
			}else{
				return null
			}
		}; 
		var originUrl = window.location.origin;
		var isLanData = true
			isLanVal = JSON.parse(getUrlString('isLan'));
		if(isLanVal != null){
			isLanData = isLanVal;
		}
		var isLan = isLanData;//true false 是否测试环境
		if(originUrl === 'https://promotion.phone580.com'){
			isLan = false;
		}
		// 微信
		// eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiMjI4Iiwib3RoZXJfb3JkZXJhZHBvcyI6IiIsImlvc19lcnJBZGNvZGUiOiIiLCJ0aXRsZSI6IuWwj+eoi+W6j+i2heWAvOegjeS7tyIsImJ0bl91cCI6IiIsImNsaWVudFR5cGUiOiJYQ1giLCJvdGhlcl9lcnJBZGNvZGUiOiIiLCJzaGFyZVRleHQiOiIiLCJzaGFyZUxvZ28iOiIiLCJpb3NfYWRwb3MiOiIiLCJhel9vcmRlcmFkcG9zIjoiRkxUUV9aRkNHXzg2NCIsIm90aGVyX2FkcG9zIjoiRkxUUV9aRkNHXzg2NCIsImlzX3NoYXJlIjoiMSIsImFkaCI6IjIyOCIsInRoZW1lY29kZSI6ImRlZmF1bHQiLCJhel9hZHBvcyI6IkZMVFFfWkZDR184NjQiLCJpc19ydWxlIjoiMCIsImlvc19vcmRlcmFkcG9zIjoiIiwiYWN0aXZpdHl0eXBlIjoiU1BDWCIsImFjdGl2aXR5aWQiOiLml6AiLCJiZ19jb2xvciI6IiIsInBsYW5jb2RlIjoiM2Q5MTQxZTRmZGU3NGI2ODhhYmVhZWNmNzM2ZTNkMzEiLCJjbnp6aWQiOiIiLCJpbnN0YW5jZWlkIjoia2oteGN4LXRlc3QxIiwib3JkZXJhZHciOiI4NjQiLCJzaGFyZVRpdGxlIjoiIiwiYWR3IjoiODY0Iiwic2hhcmVVcmwiOiIiLCJhel9lcnJBZGNvZGUiOiJGTFRRX1pGU05JfODY0In0=
		// defaultData = isLan ? "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiMjI4Iiwib3RoZXJfb3JkZXJhZHBvcyI6IiIsImlvc19lcnJBZGNvZGUiOiIiLCJ0aXRsZSI6IuWwj+eoi+W6j+i2heWAvOegjeS7tyIsImJ0bl91cCI6IiIsImNsaWVudFR5cGUiOiJYQ1giLCJvdGhlcl9lcnJBZGNvZGUiOiIiLCJzaGFyZVRleHQiOiIiLCJzaGFyZUxvZ28iOiIiLCJpb3NfYWRwb3MiOiIiLCJhel9vcmRlcmFkcG9zIjoiRkxUUV9aRkNHXzg2NCIsIm90aGVyX2FkcG9zIjoiRkxUUV9aRkNHXzg2NCIsImlzX3NoYXJlIjoiMSIsImFkaCI6IjIyOCIsInRoZW1lY29kZSI6ImRlZmF1bHQiLCJhel9hZHBvcyI6IkZMVFFfWkZDR184NjQiLCJpc19ydWxlIjoiMCIsImlvc19vcmRlcmFkcG9zIjoiIiwiYWN0aXZpdHl0eXBlIjoiU1BDWCIsImFjdGl2aXR5aWQiOiLml6AiLCJiZ19jb2xvciI6IiIsInBsYW5jb2RlIjoiM2Q5MTQxZTRmZGU3NGI2ODhhYmVhZWNmNzM2ZTNkMzEiLCJjbnp6aWQiOiIiLCJpbnN0YW5jZWlkIjoia2oteGN4LXRlc3QxIiwib3JkZXJhZHciOiI4NjQiLCJzaGFyZVRpdGxlIjoiIiwiYWR3IjoiODY0Iiwic2hhcmVVcmwiOiIiLCJhel9lcnJBZGNvZGUiOiJGTFRRX1pGU05JfODY0In0=" : "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiIiwib3RoZXJfb3JkZXJhZHBvcyI6IiIsImlvc19lcnJBZGNvZGUiOiIiLCJ0aXRsZSI6IjDlhYPotK0t5ZG85pyL5ZSk5Y+L5p2l56CN5Lu3IiwiYnRuX3VwIjoiIiwiY2xpZW50VHlwZSI6IkFQUCIsIm90aGVyX2VyckFkY29kZSI6IiIsInNoYXJlVGV4dCI6IuW/q+adpeWQp++8jOS4k+ayu+WQhOenjeS5sOS5sOS5sO+8ge+8ge+8gSIsInNoYXJlTG9nbyI6IiIsImlvc19hZHBvcyI6IiIsImF6X29yZGVyYWRwb3MiOiIiLCJvdGhlcl9hZHBvcyI6IiIsImlzX3NoYXJlIjoiMCIsImFkaCI6IiIsInRoZW1lY29kZSI6ImRlZmF1bHQiLCJhel9hZHBvcyI6IiIsImlzX3J1bGUiOiIwIiwiaW9zX29yZGVyYWRwb3MiOiIiLCJhY3Rpdml0eXR5cGUiOiJTUENYIiwiYWN0aXZpdHlpZCI6IuaXoCIsImNuenppZCI6IiIsInBsYW5jb2RlIjoiNjI4YWEwOWY3MTkwNDA5OWI1OTI1YzEyM2RmY2E5ODYiLCJiZ19jb2xvciI6IiIsImluc3RhbmNlaWQiOiJrai1menNhcHAtc2VsbCIsInNoYXJlVGl0bGUiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsIm9yZGVyYWR3IjoiIiwiYWR3IjoiIiwic2hhcmVVcmwiOiIiLCJhel9lcnJBZGNvZG5UiOiIifQ=="
		// app
		// defaultData = isLan ? "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiNDgwIiwib3RoZXJfb3JkZXJhZHBvcyI6IkZaU0FaX1hNTEFUT1BHRyIsImlvc19lcnJBZGNvZGUiOiJGWlNJT1NfWE1MQVRPUEdHIiwidGl0bGUiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsImJ0bl91cCI6IiIsImNsaWVudFR5cGUiOiJBUFAiLCJvdGhlcl9lcnJBZGNvZGUiOiJGWlNBWl9YTUxBVE9QR0ciLCJzaGFyZVRleHQiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsInNoYXJlTG9nbyI6IiIsImlvc19hZHBvcyI6IkZaU0lPU19YTUxBVE9QR0ciLCJhel9vcmRlcmFkcG9zIjoiRlpTQVpfWE1MQVRPUEdHIiwib3RoZXJfYWRwb3MiOiJGWlNBWl9YTUxBVE9QR0ciLCJpc19zaGFyZSI6IjAiLCJhZGgiOiI0ODAiLCJ0aGVtZWNvZGUiOiJkZWZhdWx0IiwiYXpfYWRwb3MiOiJGWlNBWl9YTUxBVE9QR0ciLCJpc19ydWxlIjoiMCIsImlvc19vcmRlcmFkcG9zIjoiRlpTSU9TX1hNTEFUT1BHRyIsImFjdGl2aXR5dHlwZSI6IlNQQ1giLCJhY3Rpdml0eWlkIjoi5pegIiwiY256emlkIjoiIiwicGxhbmNvZGUiOiI2MjhhYTA5ZjcxOTA0MDk5YjU5MjVjMTIzZGZjYTk4NiIsImJnX2NvbG9yIjoiZjNmM2YzIiwiaW5zdGFuY2VpZCI6ImtqLWZ6c2FwcC1zZWxsIiwic2hhcmVUaXRsZSI6IjDlhYPotK0t5ZG85pyL5ZSk5Y+L5p2l56CN5Lu3Iiwib3JkZXJhZHciOiIxMDgwIiwiYWR3IjoiMTA4MCIsInNoYXJlVXJsIjoiaHR0cHM6Ly9wcm9tb3Rpb24ucGhvbmU1ODAuY29tL2FjdGl2aXR5L2tqLWZ6c2FwcC1zZWxsIiwiYXpfZXJyQWRjb2RlIjoiRlpTQVpfWE1MQV5RPUEdHIn0=" : "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiNDgwIiwib3RoZXJfb3JkZXJhZHBvcyI6IkZaU0FaX1hNTEFUT1BHRyIsImlvc19lcnJBZGNvZGUiOiJGWlNJT1NfWE1MQVRPUEdHIiwidGl0bGUiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsImJ0bl91cCI6IiIsImNsaWVudFR5cGUiOiJBUFAiLCJvdGhlcl9lcnJBZGNvZGUiOiJGWlNBWl9YTUxBVE9QR0ciLCJzaGFyZVRleHQiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsInNoYXJlTG9nbyI6IiIsImlvc19hZHBvcyI6IkZaU0lPU19YTUxBVE9QR0ciLCJhel9vcmRlcmFkcG9zIjoiRlpTQVpfWE1MQVRPUEdHIiwib3RoZXJfYWRwb3MiOiJGWlNBWl9YTUxBVE9QR0ciLCJpc19zaGFyZSI6IjAiLCJhZGgiOiI0ODAiLCJ0aGVtZWNvZGUiOiJkZWZhdWx0IiwiYXpfYWRwb3MiOiJGWlNBWl9YTUxBVE9QR0ciLCJpc19ydWxlIjoiMCIsImlvc19vcmRlcmFkcG9zIjoiRlpTSU9TX1hNTEFUT1BHRyIsImFjdGl2aXR5dHlwZSI6IlNQQ1giLCJhY3Rpdml0eWlkIjoi5pegIiwiY256emlkIjoiIiwicGxhbmNvZGUiOiI2MjhhYTA5ZjcxOTA0MDk5YjU5MjVjMTIzZGZjYTk4NiIsImJnX2NvbG9yIjoiZjNmM2YzIiwiaW5zdGFuY2VpZCI6ImtqLWZ6c2FwcC1zZWxsIiwic2hhcmVUaXRsZSI6IjDlhYPotK0t5ZG85pyL5ZSk5Y+L5p2l56CN5Lu3Iiwib3JkZXJhZHciOiIxMDgwIiwiYWR3IjoiMTA4MCIsInNoYXJlVXJsIjoiaHR0cHM6Ly9wcm9tb3Rpb24ucGhvbmU1ODAuY29tL2FjdGl2aXR5L2tqLWZ6c2FwcC1zZWxsIiwiYXpfZXJyQWRjb2RlIjoiRlpTQVpfWE1MQV5RPUEdHIn0="
		// defaultData = isLan ? "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiIiwib3RoZXJfb3JkZXJhZHBvcyI6IiIsImlvc19lcnJBZGNvZGUiOiIiLCJ0aXRsZSI6IuegjeS7t+a0u+WKqOWwj+eoi+W6jyIsImJ0bl91cCI6IiIsImNsaWVudFR5cGUiOiJYQ1giLCJvdGhlcl9lcnJBZGNvZGUiOiIiLCJzaGFyZVRleHQiOiLnoI3ku7fmtLvliqjlsI/nqIvluo8gIOegjeS7t+a0u+WKqOWwj+eoi+W6jyAgIOegjeS7t+a0u+WKqOWwj+eoi+W6jyIsInNoYXJlTG9nbyI6InBhdGhcdTAwM2QlMkZpbWdzJTJGJUU4JTlDJTgyJUU1JThBJUE5JUU2JTg5JThCJUU2JUI0JUJCJUU1JThBJUE4JTJGJUU1JUJDJUI5JUU3JUFBJTk3JUU1JTlCJUJFJUU3JTg5JTg3LnBuZyIsImlvc19hZHBvcyI6IiIsImF6X29yZGVyYWRwb3MiOiIiLCJvdGhlcl9hZHBvcyI6IiIsImlzX3NoYXJlIjoiMSIsImFkaCI6IiIsInRoZW1lY29kZSI6ImRlZmF1bHQiLCJhel9hZHBvcyI6IiIsImlzX3J1bGUiOiIxIiwiaW9zX29yZGVyYWRwb3MiOiIiLCJhY3Rpdml0eXR5cGUiOiJTUENYIiwiYWN0aXZpdHlpZCI6IuaXoCIsImJnX2NvbG9yIjoiZjNmM2YzIiwicGxhbmNvZGUiOiIzZDkxNDFlNGZkZTc0YjY4OGFiZWFlY2Y3MzZlM2QzMSIsImNuenppZCI6IiIsImluc3RhbmNlaWQiOiJrai1taW5pLXRlc3QyIiwib3JkZXJhZHciOiIiLCJzaGFyZVRpdGxlIjoiMeegjeS7t+a0u+WKqOWwj+eoi+W6jyAg56CN5Lu35rS75Yqo5bCP56iL5bqPICDnoI3ku7fmtLvliqjlsI/nqIvluo8gIOegjeS7t+a0u+WKqOWwj+eoi+W6jyIsImFkdyI6IiIsInNoYXJlVXJsIjoiIiwiYXpfZXJyQWRjb25RlIjoiIn0=" : "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiIiwib3RoZXJfb3JkZXJhZHBvcyI6IiIsImlvc19lcnJBZGNvZGUiOiIiLCJ0aXRsZSI6IjDlhYPotK0t5ZG85pyL5ZSk5Y+L5p2l56CN5Lu3IiwiYnRuX3VwIjoiIiwiY2xpZW50VHlwZSI6IkFQUCIsIm90aGVyX2VyckFkY29kZSI6IiIsInNoYXJlVGV4dCI6IuW/q+adpeWQp++8jOS4k+ayu+WQhOenjeS5sOS5sOS5sO+8ge+8ge+8gSIsInNoYXJlTG9nbyI6IiIsImlvc19hZHBvcyI6IiIsImF6X29yZGVyYWRwb3MiOiIiLCJvdGhlcl9hZHBvcyI6IiIsImlzX3NoYXJlIjoiMCIsImFkaCI6IiIsInRoZW1lY29kZSI6ImRlZmF1bHQiLCJhel9hZHBvcyI6IiIsImlzX3J1bGUiOiIwIiwiaW9zX29yZGVyYWRwb3MiOiIiLCJhY3Rpdml0eXR5cGUiOiJTUENYIiwiYWN0aXZpdHlpZCI6IuaXoCIsImNuenppZCI6IiIsInBsYW5jb2RlIjoiNjI4YWEwOWY3MTkwNDA5OWI1OTI1YzEyM2RmY2E5ODYiLCJiZ19jb2xvciI6IiIsImluc3RhbmNlaWQiOiJrai1menNhcHAtc2VsbCIsInNoYXJlVGl0bGUiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsIm9yZGVyYWR3IjoiIiwiYWR3IjoiIiwic2hhcmVVcmwiOiIiLCJhel9lcnJBZGNvZG5UiOiIifQ=="
		defaultData = isLan ? "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiMjcwIiwib3RoZXJfb3JkZXJhZHBvcyI6IiIsImlvc19lcnJBZGNvZGUiOiJGWlNJT1NaRkNHX0dHIiwidGl0bGUiOiLnoI3ku7fmtLvliqgxLjAiLCJidG5fdXAiOiIiLCJjbGllbnRUeXBlIjoiQVBQIiwib3RoZXJfZXJyQWRjb2RlIjoiIiwic2hhcmVUZXh0Ijoi56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAg56CN5Lu35rS75Yqo5YaF5a65ICAgIiwic2hhcmVMb2dvIjoiaHR0cDovL3Rlc3Qud3d3LnBob25lNTgwLmNvbTo4MDAwL3hmb2xkZXIvYXBpL2dldGZpbGU/cGF0aFx1MDAzZCUyRmltZ3MlMkYlRTglOUMlODIlRTUlOEElQTklRTYlODklOEIlRTYlQjQlQkIlRTUlOEElQTglMkYlRTUlQkMlQjklRTclQUElOTclRTUlOUIlQkUlRTclODklODcucG5nIiwiaW9zX2FkcG9zIjoiIiwiYXpfb3JkZXJhZHBvcyI6IkZaU0FaWkZDR19HRyIsIm90aGVyX2FkcG9zIjoiIiwiaXNfc2hhcmUiOiIwIiwiYWRoIjoiNDgwIiwidGhlbWVjb2RlIjoiZGVmYXVsdCIsImF6X2FkcG9zIjoiRlpTQVpfWE1MQVRPUEdHIiwiaXNfcnVsZSI6IjAiLCJpb3Nfb3JkZXJhZHBvcyI6IkZaU0lPU1pGQ0dfR0ciLCJhY3Rpdml0eXR5cGUiOiJTUENYIiwiYWN0aXZpdHlpZCI6IuaXoCIsImJnX2NvbG9yIjoiZjNmM2YzIiwicGxhbmNvZGUiOiIzZDkxNDFlNGZkZTc0YjY4OGFiZWFlY2Y3MzZlM2QzMSIsImNuenppZCI6IiIsImluc3RhbmNlaWQiOiJrai1menMtdGVzdDEiLCJvcmRlcmFkdyI6IjEwODAiLCJzaGFyZVRpdGxlIjoi56CN5Lu35rS75Yqo5qCH6aKYICAg56CN5Lu35rS75Yqo5qCH6aKYICAg56CN5Lu35rS75Yqo5qCH6aKYICAgIiwiYWR3IjoiMTA4MCIsInNoYXJlVXJsIjoiaHR0cDovL3Rlc3Qud3d3LnBob25lNTgwLmNvbTo4MDAwL2FjdGl2aXR5L2tqLWZ6cy10ZXN0MSIsImF6X2VyckFkY29kZSI6IkZaU0FaWk5ZDR19HRyJ9" : "eyJidG5fZG593biI6IiIsIm9yZGVyYWRoIjoiNDgwIiwib3RoZXJfb3JkZXJhZHBvcyI6IkZaU0FaX1hNTEFUT1BHRyIsImlvc19lcnJBZGNvZGUiOiJGWlNJT1NfWE1MQVRPUEdHIiwidGl0bGUiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsImJ0bl91cCI6IiIsImNsaWVudFR5cGUiOiJBUFAiLCJvdGhlcl9lcnJBZGNvZGUiOiJGWlNBWl9YTUxBVE9QR0ciLCJzaGFyZVRleHQiOiIw5YWD6LStLeWRvOaci+WUpOWPi+adpeegjeS7tyIsInNoYXJlTG9nbyI6IiIsImlvc19hZHBvcyI6IkZaU0lPU19YTUxBVE9QR0ciLCJhel9vcmRlcmFkcG9zIjoiRlpTQVpfWE1MQVRPUEdHIiwib3RoZXJfYWRwb3MiOiJGWlNBWl9YTUxBVE9QR0ciLCJpc19zaGFyZSI6IjAiLCJhZGgiOiI0ODAiLCJ0aGVtZWNvZGUiOiJkZWZhdWx0IiwiYXpfYWRwb3MiOiJGWlNBWl9YTUxBVE9QR0ciLCJpc19ydWxlIjoiMCIsImlvc19vcmRlcmFkcG9zIjoiRlpTSU9TX1hNTEFUT1BHRyIsImFjdGl2aXR5dHlwZSI6IlNQQ1giLCJhY3Rpdml0eWlkIjoi5pegIiwiY256emlkIjoiIiwicGxhbmNvZGUiOiI2MjhhYTA5ZjcxOTA0MDk5YjU5MjVjMTIzZGZjYTk4NiIsImJnX2NvbG9yIjoiZjNmM2YzIiwiaW5zdGFuY2VpZCI6ImtqLWZ6c2FwcC1zZWxsIiwic2hhcmVUaXRsZSI6IjDlhYPotK0t5ZG85pyL5ZSk5Y+L5p2l56CN5Lu3Iiwib3JkZXJhZHciOiIxMDgwIiwiYWR3IjoiMTA4MCIsInNoYXJlVXJsIjoiaHR0cHM6Ly9wcm9tb3Rpb24ucGhvbmU1ODAuY29tL2FjdGl2aXR5L2tqLWZ6c2FwcC1zZWxsIiwiYXpfZXJyQWRjb2RlIjoiRlpTQVpfWE1MQV5RPUEdHIn0="
		if ($('body').hasClass('index')) {
			if(window.config == "$%dynamicVal%$"){
				configdata = defaultData;
			}else{
				configdata = window.config;
			}
		}else{
			if(dynamicVal == "$%dynamicVal%$"){
				configdata = defaultData;
			}else{
				configdata = dynamicVal;
			}
		}
		var conlength = configdata.length,
		config = JSON.parse($.base64().decode(configdata.substring(0, 10) + configdata.substring(11, conlength - 11) + configdata.substring(conlength - 10)));
		var model = {
			clientType : config.clientType,
			plancode : config.plancode,
			activityid : config.activityid,
			activitytype : config.activitytype,
			adh : config.adh, // 详情页广告高度
			adw : config.adw, // 详情页广告宽度
			az_adpos : config.az_adpos, // 安卓详情页广告标识
			az_errAdcode : config.az_errAdcode, // 安卓支付失败标识
			az_orderadpos : config.az_orderadpos, // 安卓支付成功标识
			bg_color : config.bg_color, // 背景色
			btn_down : config.btn_down, // 按钮颜色（下）
			btn_up : config.btn_up, // 按钮颜色（上）
			cnzzid : config.cnzzid, // 友盟统计ID
			instanceid : config.instanceid,
			ios_adpos : config.ios_adpos, // iOS详情页广告标识
			ios_errAdcode : config.ios_errAdcode, // iOS支付失败标识
			ios_orderadpos : config.ios_orderadpos, // iOS支付成功标识
			is_coupon : config.is_coupon, // 优惠券栏目
			is_rule : config.is_rule, // 是否显示规则
			is_share : config.is_share, // 是否分享
			nav_id : config.nav_id, // 导航id
			orderadh : config.orderadh, // 支付广告高度
			orderadw : config.orderadw, // 支付广告宽度
			other_adpos : config.other_adpos, // 其他详情页广告标识
			other_errAdcode : config.other_errAdcode, // 其他支付失败标识
			other_orderadpos : config.other_orderadpos, // 其他支付成功标识
			themecode : config.themecode, // 活动主题
			title : config.title, // 活动标题
			shareTitle : config.shareTitle, // 分享标题
			shareText : config.shareText, // 分享内容
			shareLogo : config.shareLogo, // 分享logo
			shareUrl : config.shareUrl // 分享链接
		};
		var appMain = appMain || {};
		appMain = {
			config: {
				loginPath :isLan ? "http://test.www.phone580.com:8000" : "https://www.phone580.com",
				promotion :isLan ? "http://test.promotion.phone580.com:8000" : "https://promotion.phone580.com",
				orderapiPath :isLan ? "http://test.orderapi.phone580.com:8000" : "https://orderapi.phone580.com",
				imgPath: isLan ? "http://test.www.phone580.com:8000" : "https://www.phone580.com",
				requestPath :isLan ? "http://test.s.phone580.com:8000" : "https://s.phone580.com",
				getValueurl :isLan ? "http://10.20.100.98:8089" : "https://www.phone580.com/vip_growth_api", // 会员体系 +成长值 +金币
				walletPath :isLan ? "http://test.wallet.phone580.com:8000/" : "https://wallet.phone580.com", // 优惠券
				vipapi :isLan ? "http://test.vipapi.phone580.com:8000" : "http://vipapi.phone580.com", // 优惠券
				modelid : isLan ? "26" : "24",
				templateid : isLan ? "60" : "61",
				appid : isLan ? "wxb623eddc3d11efe5" : "wxccc7300fd2fb895a",
				xcxappId : isLan ? "WXPAY_MINI_RH_FYS" : "WXPAY_MINI_FLTQ",
				loginUserId : isLan ? "374304" : "553884",
				stateSuccess :isLan ? "/activity/"+model.instanceid+"/state.html#/success" : "/activity/"+model.instanceid+"/state.html#/success", //状态页面  灰度加 assets
				stateFail :isLan ? "/activity/"+model.instanceid+"/state.html#/error" : "/activity/"+model.instanceid+"/state.html#/error",
				alApiOperator : isLan ? "http://tcc.taobao.com" : "https://tcc.taobao.com",
				shorten : isLan  ? "http://api.weibo.com" : "https://api.weibo.com",
			}
		};
		$('.index').css('background','#'+model.bg_color);
		$('title').html(model.title);
		$('.programme_list li').css('background','-webkit-gradient(linear, 0 0, 0 bottom, from(rgb('+model.up+')), to(rgba('+model.down+')))');
		if(model.is_rule == '1'){
			$('.dynamicnews').hide();
		}
		var _czc = _czc || [];
	    _czc.push(["_setAccount", model.cnzzid]);
		$("body").append('<div class="hide"><script src="https://s95.cnzz.com/z_stat.php?id='+model.cnzzid+'&web_id='+model.cnzzid+'" language="JavaScript"></script></div>');

		console.log(model);
		var WXTip = $('#WXTip'),
			ua = navigator.userAgent.toLowerCase();
		function isWX() {
			return /MicroMessenger/i.test(ua);
		};
		function isAndroid() {
			return /android/i.test(ua);
		};
		function isIOS() {
			return /iPhone|iPod|iPad/i.test(ua);
		};
		function customerEvent() {
			var evt;
			if (window.CustomEvent) {
				evt = new window.CustomEvent('click', {
					cancelBubble: true,
					cancelable: true
				});
			} else {
				evt = document.createEvent('MouseEvent');
				evt.initEvent('click', true, true);
			}
			return evt;
		};
		function openAppClient() {
			var openSchemeLink;
			var ifr = document.createElement('iframe'),
				st = Date.now(),
				ost;
			if (isIOS()) {
				if (ua.indexOf('safari') > -1 && (ua.indexOf('os 9_') > -1 || ua.indexOf('os 10_') > -1)) {
					openSchemeLink = document.createElement('a');
					openSchemeLink.style.display = 'none';
					document.body.appendChild(openSchemeLink);
					openSchemeLink.href = 'FZSAppStoreAPP://';
					openSchemeLink.dispatchEvent(customerEvent());
				} else {
					ifr.src = 'FZSAppStoreAPP://';
				}
				ost = setTimeout(function () {
					var et = Date.now();
					if (!st || et - st < 5200) {
						window.location.href = 'https://itunes.apple.com/cn/app/蜂助手/id1041859278?mt=8';
					}
				}, 500);
			}
			isAndroid() && (ifr.src = 'fzsmarket://phone580.com/launch/');
			ifr.style.display = 'none';
			document.body.appendChild(ifr);
			var it = setTimeout(function () {
				var et = Date.now();
				if (!st || et - st < 1200) {
					var fzsapp = getUrlString('channel_id') ? getUrlString('channel_id') : "fzs";
					!isIOS() && (window.location.href = 'http://app.phone580.com:8082/installupdate/FZS_MOBILE/' + fzsapp + '.apk');
				}
			}, 1000);
			window.onblur = function () {
				clearTimeout(it);
				clearTimeout(ost);
			};
		};
		var randomWord = function(randomFlag, min, max){ // 随机数
			var str = "",
				range = min,
				arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			// 随机产生
			if(randomFlag){
				range = Math.round(Math.random() * (max-min)) + min;
			}
			for(var i=0; i<range; i++){
				pos = Math.round(Math.random() * (arr.length-1));
				str += arr[pos];
			}
			userinfo.key = str
		};
		String.prototype.format=function(){ // for循环工具
			if(arguments.length==0) return this; 
			for(var s=this, i=0; i<arguments.length; i++) 
			s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
			return s; 
		};
		var userinfo = {
			userName : '13433986233',
			password : 'Hhs123456',
			// userName : '15915811400',
			// password : '811400',

			// userName : '13726898741',
			// password : '123456789',

			// userName : '18824138001',
			// password : '123456',

			// userName : 'zhangyuefeng0008',
			// password : 'Test123456',

			// userName : '18002241263',
			// password : '123456',

			// userName : '15914390478',
			// password : '390478',

			userName2 : '15914390478',
			password2 : '390478',

			// userName2 : '13726898741',
			// password2 : '123456789',

			// userName2 : '13112254260',
			// password2 : 'qqqqqq',

			// userName2 : '13433986233',
			// password2 : 'Hhs123456',
			userId : '',
			wxUserId : getUrlString("uid"),
			friendsId : getUrlString("fid")?getUrlString("fid"):"",
			authType : 'FZS',
			// cyAuthType:'FZS',
			authToken : '',
			salePrice : '',
			marketPrice : '',
			modelid : appMain.config.modelid,
			templateid : appMain.config.templateid,
			appId : "44461EE991786C6A026054A791DC3CDD",
			appKey : "00001",
			channelId : "KHD_QD",
			clientVersionId : getUrlString("clientVersionId")?getUrlString("clientVersionId"):'2',
			clientVersionNo : getUrlString("clientVersionNo")?getUrlString("clientVersionNo"):'1000',
			cardNo : '',
			pid : getUrlString("pid"),
			sid : getUrlString("skuid"),
			cos : '',
			key : '',
			mobile : '',//'15907642341',
			actcode : '', //行为编码
			category : '',
			nickName : '', // 昵称
			headPhotoUrl : '', // 头像
			pageNo : '1',
			pageSize : '10',
			shareTitle : '',
			shareText : '',
			shareLogoUrl: '',
			adPos : '',
			categoryid : 'FZSIOS_SPCX1',
			wxappId : 'wxdb66d51599b705f7',//'wxdb66d51599b705f7',
			openId : '',
			payprice :'',
			skuName : '',
			logoUrl : '',
			encryptedData : '',
			iv : ''
		}
		var uidinfo = userinfo.wxUserId;
		if(userinfo.userId != ''){
			isAndroid() && (userinfo.clientVersionId = '2',userinfo.channelId ='KHD_QD',userinfo.appId = '44461EE991786C6A026054A791DC3CDD',userinfo.userId ='161260',userinfo.categoryid="FZSAZ_SPCX1");
			isIOS() && (userinfo.clientVersionId = '36',userinfo.channelId ='FZSSJIOS',userinfo.appId = '8E1E8731C41A37E75A2D440A431B6E73',userinfo.userId ='180957',userinfo.categoryid="FZSIOS_SPCX1");
		} else{
			if(model.clientType === 'XCX'){
				userinfo.channelId ='XIAOCX';
				userinfo.clientVersionId = '330';
			}else{
				userinfo.clientVersionId = '2';
				userinfo.appId = '44461EE991786C6A026054A791DC3CDD';
				userinfo.userId ='161260';
			}
		}
		var isLogin = false,
			isStock = true,
			PayMethodList,
			entityTypeCode = '',
			businessType = '',
			isAppService = false,
			isshare = getUrlString("isshare"),
			debug = getUrlString("debug"),
			isService = false,
			clearTime,
			isChannel = false,
			isFinish = false,
			uidconfig;
		appService.appInfo(function (data) { //获取客户端信息
			if(!!data){
				if($('body').hasClass('index') || $('body').hasClass('share')){ // 下单页
					window.localStorage.removeItem('userinfoData');
				}
				isAppService = true;
				$('.sharingsign').show();
				userinfo.clientVersionId = data.clientVersionId;
				userinfo.clientVersionNo = data.clientVersionNo;
			}else{
				userinfo.clientVersionId = "";
				userinfo.clientVersionNo = "";
			}
		});
		var userinfoData = JSON.parse(window.localStorage.getItem('userinfoData'));
		try{
			userinfo.userId = userinfoData.valueObject.exjf.userId;
			userinfo.mobile = userinfoData.valueObject.userInfo.user.staffCode;
			userinfo.authToken = userinfoData.valueObject.authToken;
			userinfo.nickName = userinfoData.nickName;
			userinfo.headPhotoUrl = userinfoData.headPhotoUrl;
			if(model.clientType === 'XCX'){
				userinfo.wxappId = userinfoData.wxappId;
				userinfo.openId = userinfoData.openId;
			}
		}catch(e){
			console.log('用户数据错误');
		}
		appMain.init = function () {
			appMain.Module = $.extend(true, {}, $Module, appMain.Module || {});
			appMain.Utils = $.extend(true, {}, $Utils, appMain.Utils || {});
			appMain.API = $.extend(true, {}, $API, appMain.API || {});
			appMain.Loader = $.extend(true, {}, $Loader, appMain.Loade || {});
			// appMain.Module.error_message(1,"测试最新代码8883...");
			if(model.clientType == 'APP'){
				appService.getUserInfo(function(data) { // 获取客户端用户信息  // 在客户端里面
					if($('body').hasClass('index') || $('body').hasClass('share')){
						window.localStorage.removeItem('userinfoData');
					}
					isAndroid() && (userinfo.clientVersionId = '2',userinfo.channelId ='KHD_QD',userinfo.appId = '44461EE991786C6A026054A791DC3CDD',userinfo.userId ='161260',userinfo.categoryid="FZSAZ_SPCX1");
					if(isIOS()){
						userinfo.clientVersionId = '36';
						userinfo.channelId ='FZSSJIOS';
						userinfo.appId = '8E1E8731C41A37E75A2D440A431B6E73';
						userinfo.userId ='180957';
						userinfo.categoryid="FZSIOS_SPCX1";

						window.onpageshow = function(event){ //ios 刷新功能
							if (event.persisted) {  
								window.location.reload();
							}
						}
						userinfo.userId ='180957';
					}
					if(!!data){ //判断是否登录
						userinfo.authToken = data.token;
						userinfo.mobile = data.phoneNum;
						userinfo.userId = data.userID;
						userinfo.nickName = data.phoneNum;
						isService = true;
						appMain.Module.getuserinfo(data.token,isService); //获取用户信息头像
					}else{
						userinfo.authToken = "";
						userinfo.mobile = "";
					}
					if($('body').hasClass('index')){ // 首页
						appMain.Module.querySchemeSkuList();
					}else if($('body').hasClass('share')){ //发起详情页
						appMain.Module.openAdsapi();
						appMain.Module.querySchemeSkuList(userinfo.sid);
					}else if($('body').hasClass('order')){ // 下单页
						appMain.Module.productdetail();
					}else if($('body').hasClass('address')){ // 地址管理页
						appMain.Module.addresslist();
					}else if($('body').hasClass('invoice')){ // 发票管理页
					}else if($('body').hasClass('state')){ // 状态页
						appMain.Module.stateOpenAdsapi();
						appMain.Module.statePage();
					}
				},function(){ // 不在客户端里面
					if(isWX()){ // 微信里面 的参数
						userinfo.authType = 'WX_MINI';
						try{
							userinfoData = JSON.parse(window.localStorage.getItem('userinfoData'));
							userinfo.userId = userinfoData.valueObject.exjf.userId;
							userinfo.mobile = userinfoData.valueObject.userInfo.user.staffCode;
							userinfo.authToken = userinfoData.valueObject.authToken;
							userinfo.nickName = userinfoData.nickName;
							userinfo.headPhotoUrl = userinfoData.headPhotoUrl;
							userinfo.wxappId = userinfoData.wxappId;
							// appMain.Module.error_message(1,"授权成功");
						}catch(e){
							window.localStorage.removeItem('userinfoData');
						}
						if(getUrlString("unionId") != null ){
							userinfo.userId = getUrlString("unionId");
							userinfo.clientVersionId = '330';
							userinfo.channelId ='XIAOCX';
							userinfo.wxappId = getUrlString("appId");
							userinfo.openId = getUrlString("openid");
							userinfo.authToken = getUrlString("code");
							userinfo.nickName = getUrlString("nickName"); // 昵称
							userinfo.headPhotoUrl = getUrlString("headImgUrl"); // 头像
							userinfoData ={
								valueObject : {
									exjf : {
										userId : uidconfig,//getUrlString("uid")?getUrlString("uid"):'161260'
									},
									userInfo : {
										user : {
											staffCode : getUrlString("nickName")
										}
									},
									authToken : getUrlString("code")
								},
								nickName : getUrlString("nickName") ? getUrlString("nickname") : null,
								headPhotoUrl : getUrlString("headImgUrl"),
								wxappId : getUrlString("appId"),
								dataSkuList:{}
							}
							window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData));
						}
					}
					if($('body').hasClass('index')){ // 首页
						appMain.Module.querySchemeSkuList();
					}else if($('body').hasClass('share')){ //发起详情页
						if(!isWX()){
							if(isshare == "1" && debug == "1"){
								(!isAndroid() && !isIOS()) && appMain.Module.userlogin("1");
							}else{
								(!isAndroid() && !isIOS()) && appMain.Module.userlogin("2");
							}
						}
						appMain.Module.openAdsapi();
						appMain.Module.querySchemeSkuList(userinfo.sid);
					}else if($('body').hasClass('order')){ // 下单页
						// if (window.history && window.history.pushState) {
						// 	$(window).on('popstate', function () {
						// 	  var hashLocation = location.hash;
						// 	  var hashSplit = hashLocation.split("#!/");
						// 	  var hashName = hashSplit[1];
						// 	  if (hashName !== '') {
						// 		var hash = window.location.hash;
						// 		if (hash === '') {
						// 			setTimeout(function () {
						// 				window.location.reload();//去登录页面
						// 			}, 3000);
						// 		}
						// 	  }
						// 	});
						// 	window.location.reload();
						// 	// window.history.pushState('forward', null, './');
						// }
						appMain.Module.productdetail();
					}else if($('body').hasClass('address')){ // 地址管理页
						appMain.Module.addresslist();
					}else if($('body').hasClass('invoice')){ // 发票管理页
						
					}else if($('body').hasClass('state')){ // 状态页

						// if (window.history && window.history.pushState) {
							
						// 	$(window).on('popstate', function () {
						// 	  var hashLocation = location.hash;
						// 	  var hashSplit = hashLocation.split("#!/");
						// 	  var hashName = hashSplit[1];
						// 	  if (hashName !== '') {
						// 		var hash = window.location.hash;
						// 		if (hash === '') {
						// 			// setTimeout(function () {
						// 				window.location.reload();//去登录页面
						// 			// }, 3000);
						// 		}else{
						// 			window.location.href = 'order.html?pid='+userinfo.pid+'&sid='+userinfo.sid;
						// 			// window.history.pushState('forward', null, 'order.html?pid='+userinfo.pid+'&sid='+userinfo.sid);
						// 			// window.location.reload();//去登录页面
						// 		}
						// 	  }
						// 	});
						// 	// window.location.reload();
						// 	window.history.pushState('forward', null, './#forward');
						// 	// window.history.pushState('forward', null, 'order.html?pid='+userinfo.pid+'&sid='+userinfo.sid);
						// }

						appMain.Module.stateOpenAdsapi();
						appMain.Module.statePage();
					}
				});
			}else if(model.clientType == 'XCX'){
				// if(isWX()){ // 微信里面 的参数
				console.log('encryptedData1=='+getUrlString("encryptedData"));
				console.log('iv1=='+getUrlString("iv"));
				userinfo.authType = 'WX_MINI';
				if(isIOS()){
					window.onpageshow = function(event){ //小程序 ios 刷新功能
						//event.persisted 判断浏览器是否有缓存, 有为true, 没有为false
						if (event.persisted) {  
							window.location.reload();
						}
					}
				}
				// if(getUrlString("code") == null){
					if($('body').hasClass('index')){
						try{
							userinfoData = JSON.parse(window.localStorage.getItem('userinfoData'));
							userinfo.userId = userinfoData.valueObject.exjf.userId;
							userinfo.mobile = userinfoData.valueObject.userInfo.user.staffCode;
							userinfo.authToken = userinfoData.valueObject.authToken;
							userinfo.nickName = userinfoData.nickName;
							userinfo.headPhotoUrl = userinfoData.headPhotoUrl;
							userinfo.wxappId = userinfoData.wxappId;
							userinfo.openId = userinfoData.openId;
							userinfo.encryptedData = userinfoData.encryptedData;
							userinfo.iv = userinfoData.iv;
						}catch(e){
							if(getUrlString("uid") == null){
								window.localStorage.removeItem('userinfoData');
							}
						}
						var uidlength = uidinfo.length,
						uidconfig = $.base64().decode(uidinfo.substring(0, 10) + uidinfo.substring(11, uidlength - 11) + uidinfo.substring(uidlength - 10));
						if(getUrlString("openid") != null ){
							userinfo.userId = uidconfig;
						// userinfo.userId = getUrlString("uid");
						userinfo.clientVersionId = '330';
						userinfo.channelId ='XIAOCX';
						// userinfo.appId = 'wxccc7300fd2fb895a';
						userinfo.wxappId = getUrlString("appid");
						userinfo.openId = getUrlString("openid");
						// userinfo.userId ='553884'
						userinfo.authToken = getUrlString("code");
						// userinfo.userId = getUrlString("uid");
						userinfo.nickName = getUrlString("nickname"); // 昵称
						userinfo.headPhotoUrl = getUrlString("himg"); // 头像
						userinfo.encryptedData = encodeURIComponent(getUrlString("encryptedData")),
						userinfo.iv = encodeURIComponent(getUrlString("iv")),
						// userinfo.authToken = getUrlString("code");
						// userinfo.userId = getUrlString("unionId");
						// userinfo.nickName = getUrlString("nickName"); // 昵称
						// userinfo.headPhotoUrl = getUrlString("headImgUrl"); // 头像
						userinfoData ={
							valueObject : {
								exjf : {
									userId : userinfo.userId ? userinfo.userId:'161260'
								},
								userInfo : {
									user : {
										staffCode : getUrlString("nickname")
									}
								},
								authToken : getUrlString("code")
							},
							nickName : getUrlString("nickname") ? getUrlString("nickname") : null,
							headPhotoUrl : getUrlString("himg"),
							wxappId : getUrlString("appid") ? getUrlString("appid") : null,
							openId : getUrlString("openid"),
							encryptedData : encodeURIComponent(getUrlString("encryptedData")),
							iv : encodeURIComponent(getUrlString("iv")),
							dataSkuList:{}
						}
						window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData));
						}
						
					}else{
						if(isshare == '2'){
							// appMain.Module.error_message(1,"测试数据1");
							// if($()){
							// window.localStorage.removeItem('userinfoData');
							// }
							
							try{
								userinfoData = JSON.parse(window.localStorage.getItem('userinfoData'));
								userinfo.userId = userinfoData.valueObject.exjf.userId;
								userinfo.mobile = userinfoData.valueObject.userInfo.user.staffCode;
								userinfo.authToken = userinfoData.valueObject.authToken;
								userinfo.nickName = userinfoData.nickName;
								userinfo.headPhotoUrl = userinfoData.headPhotoUrl;
								userinfo.wxappId = userinfoData.wxappId;
								// appMain.Module.error_message(1,"授权成功");
							}catch(e){
								// if(getUrlString("unionId") == null){
									window.localStorage.removeItem('userinfoData');
								// }
								// appMain.Module.error_message(1,"有缓存清理缓存重新进入！");
							}
							// if($('body').hasClass('index')){
							if(getUrlString("openid") != null || getUrlString("unionId") != null ){
								userinfo.userId = getUrlString("unionId");
								userinfo.clientVersionId = '330';
								userinfo.channelId ='XIAOCX';
								userinfo.wxappId = getUrlString("appid");
								userinfo.openId = getUrlString("openid");
								userinfo.authToken = getUrlString("code");
								userinfo.nickName = getUrlString("nickName"); // 昵称
								userinfo.headPhotoUrl = getUrlString("headImgUrl"); // 头像
								userinfoData ={
									valueObject : {
										exjf : {
											userId : uidconfig,//getUrlString("uid")?getUrlString("uid"):'161260'
										},
										userInfo : {
											user : {
												staffCode : getUrlString("nickName")
											}
										},
										authToken : getUrlString("code")
									},
									nickName : getUrlString("nickName") ? getUrlString("nickname") : null,
									headPhotoUrl : getUrlString("headImgUrl"),
									wxappId : getUrlString("appid"),
									dataSkuList:{}
								}
								window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData));
							}
						}else{
							try{
								userinfoData = JSON.parse(window.localStorage.getItem('userinfoData'));
								userinfo.userId = userinfoData.valueObject.exjf.userId;
								userinfo.mobile = userinfoData.valueObject.userInfo.user.staffCode;
								userinfo.authToken = userinfoData.valueObject.authToken;
								userinfo.nickName = userinfoData.nickName;
								userinfo.headPhotoUrl = userinfoData.headPhotoUrl;
								userinfo.wxappId = userinfoData.wxappId;
								userinfo.openId = userinfoData.openId;
								userinfo.encryptedData = userinfoData.encryptedData;
								userinfo.iv = userinfoData.iv;
							}catch(e){
								console.log('用户信息错误');
							}
						}
					}

				console.log('encryptedData2=='+userinfo.encryptedData);
				console.log('iv2=='+userinfo.iv);
				if($('body').hasClass('index')){ // 首页
					appMain.Module.querySchemeSkuList();
				}else if($('body').hasClass('share')){ //发起详情页
					if(!isWX()){
						if(isshare == "1" && debug == "1"){
							(!isAndroid() && !isIOS()) && appMain.Module.userlogin("1");
						}else{
							(!isAndroid() && !isIOS()) && appMain.Module.userlogin("2");
						}
					}
					appMain.Module.openAdsapi();
					appMain.Module.querySchemeSkuList(userinfo.sid);
				}else if($('body').hasClass('order')){ // 下单页
					appMain.Module.productdetail();
				}else if($('body').hasClass('address')){ // 地址管理页
					appMain.Module.addresslist();
				}else if($('body').hasClass('invoice')){ // 发票管理页
					
				}else if($('body').hasClass('state')){ // 状态页
					
					appMain.Module.stateOpenAdsapi();
					appMain.Module.statePage();
				}

			}
			appMain.Module.allclick();
		};
		// API接口
		var $API = {
			// 模拟登陆
			userlogin: appMain.config.requestPath + "/fbsapi/api/user/login",//登录 //67登录接口
			// 营销
			querySchemeSkuList :appMain.config.promotion + "/fmapi/api/action/query-scheme-sku-list", //查询促销方案的商品列表接口
			productdetail :appMain.config.orderapiPath + "/fzs-product-api/product/api/productdetail", //商品详情接口
			userReceiveCxCptc :appMain.config.promotion + "/fmapi/api/cptc/user-receive-cx-cptc", //用户领取促销奖励接口
			openReward :appMain.config.promotion + "/fmapi/api/reward/open-reward", //开奖接口
			// aqyvalid :appMain.config.loginPath + "/fzs-order-api/stdnt/valid",//10.学生卡,校验号码是否已经存在
			collectUserAction :appMain.config.promotion + "/fmapi/api/action/collect-user-action", // 模拟登记用户行为
			placeorder :appMain.config.orderapiPath + "/fzs-order-api/order/api/placeorder", //下单接口
			userorderdetail :appMain.config.orderapiPath + "/fzs-order-api/order/api/userorderdetail", //订单详情查询接口
			openAdsapi :appMain.config.requestPath + "/openapi/fzsad/ads", //广告接口
			bargaindetails :appMain.config.promotion + "/fmapi/api/reward/query-user-bargain-details", //查询砍价详情列表
			// 用户
			smsVerify :appMain.config.loginPath + "/fzsuserapi/user/sendsmscode",//下发短信接口
			authLoginV2 :appMain.config.loginPath + "/fzsuserapi/api/user/authloginv2",//登录
			getValue :appMain.config.getValueurl + "/vip/front/getvalue", //获取成长值
		
			getuserinfo :appMain.config.getValueurl + "/vip/front/getuserinfo", //获取用户信息 -- 头像
			getuserinfo2 :appMain.config.loginPath + "/fzsuserinfoapi/user/userinfo",
			// 获取微信用户信息接口
			generateOauthUrl :appMain.config.promotion + "/fmapi/wechatoauth/generate-oauth-url", //获取微信用户信息接口
			// 优惠券
			getValidCouponNew :appMain.config.walletPath + "/fzswalletapi/coupon/getCouponDatas/web/getValidCouponNew", //下单前获取可用的优惠券(新订单系统)
			checkCouponExampleNew :appMain.config.walletPath + "/fzswalletapi/coupon/getCouponDatas/web/checkCouponExampleNew", //WF外放查询优惠券兑换码是否可用
			// 地址
			addresslist :appMain.config.loginPath + "/fzsuserinfoapi/address/list", // 9.获取收货地址列表
			setdefault :appMain.config.loginPath + "/fzsuserinfoapi/address/setdefault", // 默认地址
			addAddress :appMain.config.loginPath + "/fzsuserinfoapi/address/add", // 9.添加地址
			modify :appMain.config.loginPath + "/fzsuserinfoapi/address/modify", // 9.修改地址
			// 阿里接口  
			alApiOperator : appMain.config.alApiOperator + "/cc/json/mobile_tel_segment.htm", // 运营商和归属地接口
			// 微博短地址
			shorten : appMain.config.shorten + "/2/short_url/shorten.json?source=2849184197&url_long=" // 运营商和归属地接口
			
			
			
		};
		var $Utils = {
			config: {
				eventType: "click",
			},
			event: function (options) {
				options = $.extend(false, $Utils.config, options);
				$(document).off(options.eventType, options.obj).on(options.eventType, options.obj, function (e) {
					options.fn(this, e);
				});
			}
		};
		var $Loader = {
			load : function(options){
				$.ajax({
					url: options.url, //请求url
					type: options.method || 'GET', //请求类型
					dataType: options.dataType || 'JSON', //数据类型
					data: options.stringify?JSON.stringify(options.data):options.data,
					contentType: 'application/json', //options.contentType || 'application/json;charset=UTF-8',
					timeout: options.timeout || 30000
				}).then(function(data) {
					options.fn && options.fn(data);
				},function(data) {
					options.fn_e && options.fn_e(data);
				});
			}
		};
		var $Module = {
			userlogin: function (options) { // 账号密码登录接口
				var userName,password;
				if(options == "1"){
					userName = userinfo.userName;
					password = userinfo.password;
				}else{
					userName = userinfo.userName2;
					password = userinfo.password2;
				}
				appMain.Loader.load({
					stringify: false,
					url: appMain.API.userlogin,
					data: {
						userName: userName,
						password: password
					},
					fn: function (data) {
						console.log(data);
						window.localStorage.setItem('userinfoData',JSON.stringify(data)); // 11
						if(data.success == true){
							// console.log(data.valueObject.userInfo.user.bindMobile);
							// console.log(data.valueObject.userInfo.user.userName);
							var userName = data.valueObject.userInfo.user.bindMobile ? data.valueObject.userInfo.user.bindMobile : data.valueObject.userInfo.user.userName;
							userinfo.userId = data.valueObject.exjf.userId;
							userinfo.mobile = data.valueObject.userInfo.user.staffCode;
							userinfo.authToken = data.valueObject.authToken;
							userinfo.nickName = data.valueObject.userInfo.user.nickName ? data.valueObject.userInfo.user.nickName: userName;
							userinfo.headPhotoUrl = data.valueObject.userInfo.exUserInfo.headPhotoUrl; //userPerGroups
							// console.log("9999999"+userinfo.nickName);
							// console.log(userinfo.headPhotoUrl)
							appMain.Module.close_popup();
							// console.log(userinfo.userId);
							// appMain.Module.querySchemeSkuList(userinfo.sid);
							appMain.Module.getuserinfo(data.valueObject.authToken);
						}else{
							// userinfo.userId = "";
							userinfo.mobile = "";
							userinfo.authToken = "";
							if(data.code == "503"){
								$('.verificationbox input').attr('disabled',false);
								appMain.Module.falsehints(true,data.message);
							}else{
								appMain.Module.error_message(1,"请移驾至手机端打开页面");
							}
						}
					},
					fn_e: function (data) {
						userinfo.authToken = "";
					}
				});
			},
			generateOauthUrl:function(){ // 获取微信用户信息接口
				appMain.Module.error_message(1,"亲，授权登录中…");
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url: appMain.API.generateOauthUrl,
					data: {
						appId : 'wxdb66d51599b705f7',//userinfo.wxappId,
						url : window.location.href //'http://test.www.phone580.com:8000/activity/template/bargain/tpl1/share.html?isshare=1&sid=13DDEF0BC59613ADFB78A4A615491CE5'//window.location.href
					},
					fn: function (data) {
						if(data.success == true){
							window.location.href = data.datas.oauthUrl;
							window.open(data.datas.oauthUrl);
						}
					},
					fn_e: function (data) {
					}
				});
			},
			getuserinfo:function(authToken,isService){ // 获取蜂助手用户信息 - 获取头像
				if(authToken != ""){
					appMain.Loader.load({
						stringify: false,
						url: appMain.API.getuserinfo,
						data: {
							authToken:userinfo.authToken
						},
						fn: function (data) {
							if(data.code == "0000"){
								var orderbox = $('.orderbox').height() + $('.orderButtonbox').height(),
									orderButton = $('.orderButtonbox').height(),
								bodyh = $(document).height();
								// console.log(orderbox);
								// console.log(bodyh);
								if(orderbox > bodyh){
									$('.ordercontbox').css('margin','0 auto '+orderButton+'px');
									// $('.orderButtonbox').css('position','relative')
								}
								// console.log(data.data.nickName);
								// userinfo.nickName = data.data.nickName; // 昵称
								if(data.data.nickName != null){
									userinfo.nickName = data.data.nickName;
								}
								// else{
								// 	appMain.Module.getuserinfo2(userinfo.authToken);
								// }
								console.log(userinfo.nickName);
								userinfo.headPhotoUrl = './img/friend.jpg';
								if(data.data.hpCode != '' && data.data.hpCode != null){
									userinfo.headPhotoUrl = appMain.config.imgPath+"/xfolder/"+data.data.hpCode; // 头像
								}
								try{
									if(isService == true){
										$('.headimg').attr('src',userinfo.headPhotoUrl);
									}else{
										userinfoData.nickName = data.data.nickName;
										// console.log(userinfo.headPhotoUrl)
										userinfoData.headPhotoUrl = userinfo.headPhotoUrl;
										window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData)); // 22
										$('.headimg').attr('src',userinfoData.headPhotoUrl);
									}
								}catch(e){
									$('.headimg').attr('src',userinfoData.headPhotoUrl);
								}
							}
						},
						fn_e: function (data) {
						}
					});
				}
			},
			timeString : function(unixTime,isFull,ispoint) { // 时间插件 // 时间字符串
				if(unixTime == ""){
					var now = new Date();
				}else{
					var now = new Date(unixTime * 1);
				}
				var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate(),
					month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1),
					month2 = (now.getMonth() + 1) < 10 ? '' + (now.getMonth() + 1) : (now.getMonth() + 1),
					seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds(),
					minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
					hours = now.getHours() < 10 ? '' + now.getHours() : now.getHours();
				if(isFull){
					return now.getFullYear() + month + day + hours + minutes + seconds;
				}else if(ispoint){
					return now.getFullYear() + '/' + month +'/' + day +' '+ hours +':'+ minutes +':'+ seconds;
				}
			},
			pageloading : function(isshow,page){
				if(isshow){
					$('#load').show();
				}else{
					$('#load').hide();
					$('body .'+page+'').show();
				}

			},
			querySchemeSkuList : function(sid,phone,amount){ //查询促销方案的商品列表 schemeNo:方案编码 , css方案样式 , navlength方案长度
				var ext;
				if(isshare == '2'){ // 好友页面要加的参数
					ext = {
						cyUserId : userinfo.userId,
						cyAuthType : userinfo.authType
					}
				}
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.querySchemeSkuList,
					data : {
						clientId : userinfo.clientVersionId,
						userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
						// authId : phone,
						authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
						schemeNo : model.plancode,
						ext : JSON.stringify(ext)
					},
					fn : function(data){

						// var data = {
						// 	"success": true,
						// 	"errorCode": null,
						// 	"errorMessage": null,
						// 	"datas": [
						// 		{
						// 			"schemeNo": "d61d0437b70b40039d9d642d18f9448c",
						// 			"schemeName": "小程序福利特权国庆砍价第1期",
						// 			"schemeDesc": "<p><strong>——【你发起砍价时需要注意哦】——</strong></p>\n\n<p>（1）每个商品最多成功砍价1次，其中，你发起砍价时可自砍1刀；<br />\n（2）发起砍价后，在24小时内完成砍价，否则砍价视为失败，需重新发起；<br />\n（3）砍价成功后进行下单操作，无论是否支付成功即视为砍价完成，不可发起第2次砍价。</p>\n\n<p><strong>——【邀请好友帮砍是有限制的哦】——</strong></p>\n\n<p>（1）同一个活动商品，好友每天最多帮砍2次；<br />\n（2）同一个活动商品，好友在活动期间最多可帮砍5次。</p>\n\n<p><strong>——【啦啦啦！！不能乱来哦】——</strong></p>\n\n<p>（1）如用户在活动期间存在违反行为（包括但不限于机器作弊、刷IP），蜂助手有权取消用户获得的奖励资格，必要时有权追究法律责任；<br />\n（2）活动最终解析权归蜂助手所有。</p>\n",
						// 			"logoUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E6%96%B0%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%9B%BE%E6%A0%87%2F%E8%AF%9D%E8%B4%B9.png",
						// 			"bannerUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E7%A0%8D%E4%BB%B7%2F%E8%AF%9D%E8%B4%B9%2Fbanner.png",
						// 			"state": "1",
						// 			"dateBegin": "2018-09-28 10:00:00",
						// 			"dateEnd": "2018-10-31 10:00:00",
						// 			"countTime": "2726305182",
						// 			"skuList": [
						// 				{
						// 					"skuId": "EA23897D2DAC4659A49F647B6271E3DC",
						// 					"productId": "1E2CAFB1A865715ACBDD72109C4131FF",
						// 					"skuName": "移动100元话费 -【找25位好友帮砍即可0元得】",
						// 					"skuTag": null,
						// 					"logoUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E6%89%8B%E6%9C%BA%E5%85%85%E5%80%BC%2F%E4%BC%98%E6%83%A0%E5%88%B8%2F%E8%AF%9D%E8%B4%B9.png",
						// 					"url": null,
						// 					"limitNum": "10",
						// 					"sellingNum": "0",
						// 					"rate": "0",
						// 					"marketPrice": "100",
						// 					"salePrice": "100",
						// 					"skuDiscFee": "0",
						// 					"costPrice": "100",
						// 					"paramList": "{\"skuID\":\"05BBA82947987DD0FAE593A1B6AD2F11\",\"act_code\":\"TAS_WSNHJQJQ\"}",
						// 					"skuSort": "1",
						// 					"bargainTotalPrice": null,
						// 					"bargainCountTime": null,
						// 					"canOrder": false,
						// 					"canJoin": false,
						// 					"highestAmount": null,
						// 					"actionNo": null,
						// 					"productCode": "PF_DIRECT_YD",
						// 					"firstBargainRule": null,
						// 					"canBegin": false,
						// 					"beginTimes": "0",
						// 					"joinTimes": "0",
						// 					"lastResult": false,
						// 					"isFinish": false,
						// 					"cyAmount": null
						// 				},
						// 				{
						// 					"skuId": "E7E59F30A919EC955680F4FA351E660A",
						// 					"productId": "FDB2C9B2A2665EAEB795DF4925F16FD7",
						// 					"skuName": "芒果TV移动PC端会员- 【找7位好友帮砍即可0元得】",
						// 					"skuTag": null,
						// 					"logoUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E7%A6%8F%E5%88%A9%E7%89%B9%E6%9D%83%2F%E8%BD%AC%E7%9B%98%E6%8A%BD%E5%A5%96%2F%E8%8A%92%E6%9E%9C%E6%9C%88%E5%8D%A1.png",
						// 					"url": null,
						// 					"limitNum": "30",
						// 					"sellingNum": "0",
						// 					"rate": "0",
						// 					"marketPrice": "20",
						// 					"salePrice": "15.32",
						// 					"skuDiscFee": "0",
						// 					"costPrice": "18.4",
						// 					"paramList": "{\"skuID\":\"E7E59F30A919EC955680F4FA351E660A\",\"act_code\":\"TAS_ILWCBSKR\",\"prizepic\":\"http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E7%A6%8F%E5%88%A9%E7%89%B9%E6%9D%83%2F%E8%BD%AC%E7%9B%98%E6%8A%BD%E5%A5%96%2F%E8%8A%92%E6%9E%9C%E6%9C%88%E5%8D%A1.png\",\"prizetips\":\"请当前页面领取奖品，否则视为放弃哦～\"}",
						// 					"skuSort": "4",
						// 					"bargainTotalPrice": "3.08",
						// 					"bargainCountTime": 81741098,
						// 					"canOrder": true,
						// 					"canJoin": true,
						// 					"highestAmount": "18.4",
						// 					"actionNo": "ACT_JTKSOLFH",
						// 					"productCode": "MGTV-VIP-PC",
						// 					"firstBargainRule": "3-4",
						// 					"canBegin": false,
						// 					"beginTimes": "0",
						// 					"joinTimes": "0",
						// 					"lastResult": false,
						// 					"isFinish": false,
						// 					"cyAmount": null
						// 				},
						// 				{
						// 					"skuId": "4779D27DD0AE4ED1ED3DA1C0A57A9AA9",
						// 					"productId": "55E90669FD182DA0ABE2AEA745BBD87D",
						// 					"skuName": "爱奇艺黄金会员月卡 -【找7位好友帮砍即可0元得】",
						// 					"skuTag": null,
						// 					"logoUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E7%A6%8F%E5%88%A9%E7%89%B9%E6%9D%83%2F%E8%BD%AC%E7%9B%98%E6%8A%BD%E5%A5%96%2F8%E3%80%81%E7%88%B1%E5%A5%87%E8%89%BA%E6%9C%88%E5%8D%A1.png",
						// 					"url": null,
						// 					"limitNum": "20",
						// 					"sellingNum": "1232",
						// 					"rate": "0.984025559105431309904153354632587859425",
						// 					"marketPrice": "19.8",
						// 					"salePrice": "19",
						// 					"skuDiscFee": "0",
						// 					"costPrice": "19",
						// 					"paramList": "{\"skuID\":\"4C571394C5122A89A61DBBC02370B433\",\"act_code\":\"TAS_NYCJCVZF\",\"prizepic\":\"http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E7%A6%8F%E5%88%A9%E7%89%B9%E6%9D%83%2F%E8%BD%AC%E7%9B%98%E6%8A%BD%E5%A5%96%2F8%E3%80%81%E7%88%B1%E5%A5%87%E8%89%BA%E6%9C%88%E5%8D%A1.png\",\"prizetips\":\"请当前页面领取奖品，否则视为放弃哦～\"}",
						// 					"skuSort": "2",
						// 					"bargainTotalPrice": null,
						// 					"bargainCountTime": null,
						// 					"canOrder": false,
						// 					"canJoin": false,
						// 					"highestAmount": null,
						// 					"actionNo": null,
						// 					"productCode": "AIQIYI-VIP",
						// 					"firstBargainRule": null,
						// 					"canBegin": false,
						// 					"beginTimes": "0",
						// 					"joinTimes": "0",
						// 					"lastResult": false,
						// 					"isFinish": false,
						// 					"cyAmount": null
						// 				},
						// 				{
						// 					"skuId": "66C761D4957CD8ED1B257972A0118FF9",
						// 					"productId": "D08DC70FA387BD59A770953B8324DABB",
						// 					"skuName": "摩拜单车30次骑行卡 -【找8位好友帮砍即可0元得】",
						// 					"skuTag": null,
						// 					"logoUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2F%E8%9C%82%E5%8A%A9%E6%89%8B%E6%B4%BB%E5%8A%A8%2F%E7%A0%8D%E4%BB%B7%E6%B4%BB%E5%8A%A81.0%2F%E6%91%A9%E6%8B%9C.jpg",
						// 					"url": null,
						// 					"limitNum": "30",
						// 					"sellingNum": "1232",
						// 					"rate": "0.9762282091917591125198098256735340729",
						// 					"marketPrice": "30",
						// 					"salePrice": "11.24",
						// 					"skuDiscFee": "0",
						// 					"costPrice": "13",
						// 					"paramList": "{\"skuID\":\"66C761D4957CD8ED1B257972A0118FF9\",\"act_code\":\"TAS_BUEUFTZV\"}",
						// 					"skuSort": "5",
						// 					"bargainTotalPrice": "1.76",
						// 					"bargainCountTime": 85573092,
						// 					"canOrder": true,
						// 					"canJoin": true,
						// 					"highestAmount": "13",
						// 					"actionNo": "ACT_JGMQTRUN",
						// 					"productCode": "MOBIKE_QX",
						// 					"firstBargainRule": "1-2",
						// 					"canBegin": false,
						// 					"beginTimes": "0",
						// 					"joinTimes": "0",
						// 					"lastResult": false,
						// 					"isFinish": false,
						// 					"cyAmount": null
						// 				},
						// 				{
						// 					"skuId": "6717ED6BBD39A823C903E4D8A3AFF3CA",
						// 					"productId": "2BF77C193CC3489A11FC78189F976BE3",
						// 					"skuName": "优酷黄金会员月卡 -【找7位好友帮砍即可0元得】",
						// 					"skuTag": null,
						// 					"logoUrl": "http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E6%89%8B%E6%9C%BA%E5%85%85%E5%80%BC%2F%E4%BC%98%E6%83%A0%E5%88%B8%2F%E4%BC%98%E9%85%B7.png",
						// 					"url": null,
						// 					"limitNum": "20",
						// 					"sellingNum": "0",
						// 					"rate": "0",
						// 					"marketPrice": "20",
						// 					"salePrice": "19",
						// 					"skuDiscFee": "0",
						// 					"costPrice": "19",
						// 					"paramList": "{\"skuID\":\"6717ED6BBD39A823C903E4D8A3AFF3CA\",\"act_code\":\"TAS_CNQEZTUN\",\"prizepic\":\"http://www.phone580.com/xfolder/api/getfile?path=%2Fimgs%2FH5%E5%B9%BF%E5%91%8A%2F%E6%89%8B%E6%9C%BA%E5%85%85%E5%80%BC%2F%E4%BC%98%E6%83%A0%E5%88%B8%2F%E4%BC%98%E9%85%B7.png\",\"prizetips\":\"请当前页面领取奖品，否则视为放弃哦～\"}",
						// 					"skuSort": "3",
						// 					"bargainTotalPrice": null,
						// 					"bargainCountTime": null,
						// 					"canOrder": false,
						// 					"canJoin": false,
						// 					"highestAmount": "19",
						// 					"actionNo": "ACT_TQTIXDWB",
						// 					"productCode": "YOUKU-VIP-ZC",
						// 					"firstBargainRule": "2-3",
						// 					"canBegin": false,
						// 					"beginTimes": "1",
						// 					"joinTimes": "0",
						// 					"lastResult": true,
						// 					"isFinish": false,
						// 					"cyAmount": null
						// 				}
						// 			],
						// 			"taskSchemeId": 78100000005091
						// 		}
						// 	]
						// }
						if(data.success == true){
							if(data.datas[0].state == '1' || data.datas[0].state == '7'){
								var sortSkuList = data.datas[0].skuList;
								for(var s = 0; s < sortSkuList.length; s++) { // 排除不可砍价商品到最后面
									if(sortSkuList[s].canBegin == false && sortSkuList[s].canOrder == false && sortSkuList[s].canJoin == false){
										sortSkuList[s].skuSort = "99";
									}
									if(JSON.parse(sortSkuList[s].rate) >= 1){
										sortSkuList[s].skuSort = "100";
									}
								}
								try{ //json 排序----
									function up(x,y){
										return x.skuSort-y.skuSort;
									}
									var newdata=data.datas[0].skuList;
									newdata.sort(up);
								}catch(e){
									
								}
								var datas = data.datas;
								var skuList = datas[0].skuList;
								if(sid == undefined){ // 首页数据展示
									if(skuList.length != 0){
										$('.activityRulescont').html(datas[0].schemeDesc);
										userinfo.shareTitle = datas[0].schemeName;
										userinfo.shareText = datas[0].shareText;
										userinfo.shareLogoUrl = datas[0].bannerUrl;
										var	skuhtml = "",
											skulength = 0;
										for(var i = 0; i < skuList.length; i++) {
											// skuList[i].highestAmount = skuList[i].highestAmount?skuList[i].highestAmount:'0'
											var payPrice = (parseFloat(skuList[i].costPrice)*1000000000000000 - parseFloat(skuList[i].highestAmount)*1000000000000000)/1000000000000000;
											skulength ++;
											if(data.datas[0].state == '1'){
												if(JSON.parse(skuList[i].rate) < 1){
													if(skuList[i].canOrder == false && skuList[i].canJoin == false && skuList[i].canBegin == true && skuList[i].lastResult == true){
														// 未发起（canOrder:fasle;canJoin:false; canBegin:true;beginTimes等于0）
														skuhtml += '<li pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[i].logoUrl+' alt="">\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																		<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button>发起砍价</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else if((skuList[i].canOrder == true || skuList[i].canOrder == false) && skuList[i].canJoin == true && skuList[i].canBegin == false){  //canOrder:true/false;canJoin:true;canBegin:flase
														// 砍价中（canOrder:true/false;canJoin:true;canBegin:flase）
														skuhtml += '<li pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
															<div class="priceState" stateType="1"><p><span>砍价中</span></p></div>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[i].logoUrl+' alt="">\
																	<p class="homeTimebox" dataTime='+skuList[i].bargainCountTime+'>\
																		<span class="homeTimecont" id="dateShow'+skulength+'">\
																			剩余\
																			<span class="isDateshow" style="display: none;"><b class="date-tiem-span d">00</b>天</span>\
																			<span><b class="date-tiem-span h">00</b>:</span>\
																			<span><b class="date-tiem-span m">00</b>:</span>\
																			<span><b class="date-s-span s">00</b></span>\
																		</span>\
																	</p>\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																		<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button>继续砍价</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else if(skuList[i].canOrder == true && skuList[i].canJoin == false && skuList[i].canBegin == false){
														// 砍价成功(canOrder:true;canJoin:false;canBegin:false)
														skuhtml += '<li pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
															<div class="priceState" stateType="3"><p><span>砍完成</span></p></div>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[i].logoUrl+' alt="">\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																		<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button data-state="2">立即下单</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else if(skuList[i].canOrder == false && skuList[i].canJoin == false && (skuList[i].canBegin == true ||skuList[i].canBegin == false)){
														//  砍价失败(canOrder:false;canJoin:false;canBegin:true/false)
	
														if(skuList[i].lastResult == true){
															skuhtml += '<li commst="2" pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
																<div class="commoditybox">\
																	<div class="commodityimg">\
																		<img src='+skuList[i].logoUrl+' alt="">\
																	</div>\
																	<div class="commoditycont">\
																		<div class="commoditydescribe">\
																			<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																			<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																			<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																			<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																		</div>\
																		<div class="commoditybutton">\
																			<button disabled="disabled">砍价完成</button>\
																		</div>\
																	</div>\
																</div>\
															</li>';
														}else{
															skuhtml += '<li pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
																<div class="priceState" stateType="2"><p><span>砍价失败</span></p></div>\
																<div class="commoditybox">\
																	<div class="commodityimg">\
																		<img src='+skuList[i].logoUrl+' alt="">\
																	</div>\
																	<div class="commoditycont">\
																		<div class="commoditydescribe">\
																			<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																			<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																			<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																			<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																		</div>\
																		<div class="commoditybutton">\
																			<button>重新发起</button>\
																		</div>\
																	</div>\
																</div>\
															</li>';
														}
	
														
													}else if(skuList[i].canOrder == false && skuList[i].canJoin == false && (skuList[i].canBegin == true ||skuList[i].canBegin == false) && skuList[i].lastResult == false){
														// 砍价完成（canOrder:fasle;canJoin:false;canBegin:true/false；beginTimes大于0）
														skuhtml += '<li commst="2" pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[i].logoUrl+' alt="">\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																		<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button disabled="disabled">砍价完成</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}
												}else{
													if(skuList[i].canOrder == true && skuList[i].canJoin == false && skuList[i].canBegin == false){
														// 砍价成功(canOrder:true;canJoin:false;canBegin:false)
														skuhtml += '<li pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
															<div class="priceState" stateType="3"><p><span>砍完成</span></p></div>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[i].logoUrl+' alt="">\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																		<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button data-state="2">立即下单</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else{
														skuhtml += '<li commst="1" pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[i].logoUrl+' alt="">\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																		<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button disabled="disabled">已抢光</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}
												}
												if((skuList[i].canOrder == true || skuList[i].canOrder == false) && skuList[i].canJoin == true && skuList[i].canBegin == false){
													appMain.Module.atyleftTime(skulength,skuList[i].bargainCountTime);
												}
											}else{
												skuhtml += '<li commst="3" pid='+skuList[i].productId+' sid='+skuList[i].skuId+'>\
													<div class="commoditybox">\
														<div class="commodityimg">\
															<img src='+skuList[i].logoUrl+' alt="">\
														</div>\
														<div class="commoditycont">\
															<div class="commoditydescribe">\
																<h3 class="commodityname">'+skuList[i].skuName+'</h3>\
																<p class="dynamics">'+skuList[i].sellingNum+'人已砍价成功</p>\
																<del class="originalprice">￥'+skuList[i].costPrice+'</del>\
																<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
															</div>\
															<div class="commoditybutton">\
																<button disabled="disabled">发起砍价</button>\
															</div>\
														</div>\
													</div>\
												</li>';
											}
										}
										$('.bannerimg img').attr('src',datas[0].bannerUrl);
										$('.commoditylist ul li').remove();
										$('.commoditylist ul').html(skuhtml+'<li class="listBottom"><p>别扯啦，有种砍一刀</p></li>');
									}else{
										$('.abnormalbox').show();
										$('.dynamicnews,.indextopbox').hide();
									}
									appMain.Module.pageloading(false,'indexbox');
								}else{ // // 砍价页面
									// appMain.Module.collectUserAction();
									var paramList;
									var arr = [];
									for(var k = 0; k < skuList.length; k++) {
										if(skuList[k].skuId == sid){
											if(skuList[k].isFinish == true){
												var statedata = {
													isChannel : false,
													isFinish : true
												};
												window.localStorage.setItem('statedata',JSON.stringify(statedata));
											}
											paramList = JSON.parse(skuList[k].paramList);
												userinfoData ={
													valueObject : {
														exjf : {
															userId : userinfo.userId
														},
														userInfo : {
															user : {
																staffCode : userinfo.mobile
															}
														},
														authToken : userinfo.authToken
													},
													nickName : userinfo.nickName,
													headPhotoUrl : userinfo.headPhotoUrl,
													wxappId : userinfo.wxappId,
													openId : userinfo.openId,
													encryptedData : userinfo.encryptedData,
													iv : userinfo.iv,
													dataSkuList:{}
												}
												userinfoData.dataSkuList = skuList[k];
												window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData)); // "33"
											
											try {
												arr = paramList.skuID.split(',');
											} catch(e) {
												
											};
											if(skuList[k].firstBargainRule != null){
												$('.preferential').html('首刀省<b>'+skuList[k].firstBargainRule+'</b>元');
											}
											// if(skuList[k].canOrder == false && skuList[k].canJoin == false && skuList[k].canBegin == true && skuList[k].lastResult == true){
											if((skuList[k].canOrder == true || skuList[k].canOrder == false) &&  skuList[k].canJoin == true  && skuList[k].canBegin == false){
												// if(skuList[k].bargainCountTime != null){
												appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
											}
											if(skuList[k].lastResult == false){
												if(skuList[k].bargainCountTime < 0){
													$('.preferential').show().siblings('#dateShowX').hide();
												}else{
													$('#dateShowX').show().siblings('.preferential').hide();
												}
											}else{
												$('.preferential').show().siblings('#dateShowX').hide();
											}
											userinfo.actcode = skuList[k].actionNo;
											userinfo.pid = skuList[k].productId;
											userinfo.sid = skuList[k].skuId;
											// console.log('111=='+skuList[k].highestAmount);
											// console.log('222=='+skuList[k].bargainTotalPrice);
											var bargainTotalPrice = (parseFloat(skuList[k].highestAmount)*1000000000 - parseFloat(skuList[k].bargainTotalPrice)*1000000000  )/1000000000;
											bargainTotalPrice = bargainTotalPrice.toFixed(2);
											// console.log(bargainTotalPrice);
											$('.sharestate').html('<p><span>'+skuList[k].sellingNum+'</span>人已砍价成功</p>');
											if(isshare == '1'){ // 内页
												if(skuList[k].canOrder == false && skuList[k].canJoin == false && skuList[k].canBegin == true && skuList[k].lastResult == true){ // 未发起
													$('.sharecommoditybutton button').html('砍价靠颜值，先来试一刀').attr('data-state',4);
												}else if((skuList[k].canOrder == true || skuList[k].canOrder == false) && skuList[k].canJoin == true && skuList[k].canBegin == false){  //canOrder:true/false;canJoin:true;canBegin:flase
													// 砍价中（canOrder:true/false;canJoin:true;canBegin:flase）
													$('.friendname').html('活动进行时!');
													$('.sharecommoditybutton button').html('找好友，神补刀').attr('data-state',1);
													$('.sharestate').html('<p>已砍<span>'+skuList[k].bargainTotalPrice+'</span>元，还差<span>'+bargainTotalPrice+'</span>元</p>');
													$('#dateShowX').show().siblings('.preferential').hide();
													if(skuList[k].canOrder == true ){
														$('.burrentPrice').show();
														$('.burrentPrice button').attr('salePrice',skuList[k].salePrice).html(' 当前价 '+skuList[k].salePrice+'元购买');
													}
												}else if(skuList[k].canOrder == true && skuList[k].canJoin == false && skuList[k].canBegin == false){
													//砍价成功(canOrder:true;canJoin:false;canBegin:false)
													$('.friendname').html('已砍获！');
													$('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
													$('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
													$('.preferential').show().siblings('#dateShowX').hide();
													$('.sharestate').html('<p><span>'+skuList[k].sellingNum+'</span>人已砍价成功</p>');
												}else if(skuList[k].canOrder == false && skuList[k].canJoin == false && (skuList[k].canBegin == true ||skuList[k].canBegin == false)){
													// 砍价失败(canOrder:false;canJoin:false;canBegin:true/false)
													// $('.friendname').html('虽败犹荣!');
													// $('.preferential').html('只差<b>'+bargainTotalPrice+'</b>元');
													// $('.sharecommoditybutton button').html('砍价失败，重新发起').attr('data-state',4);
													// $('.preferential').show().siblings('#dateShowX').hide();
													if(skuList[k].lastResult == true){
														$('#dateShowX').hide();
														$('.preferential').hide();
														$('.friendname').html('商品已砍完啦！');
														$('.sharecommoditybutton button').html('砍价完成').attr({
															'disabled':true,
															'data-state':'4'
														});
													}else{
														$('.friendname').html('虽败犹荣!');
														$('.preferential').html('只差<b>'+bargainTotalPrice+'</b>元');
														$('.sharecommoditybutton button').html('砍价失败，重新发起').attr('data-state',4);
														$('.preferential').show().siblings('#dateShowX').hide();
														$('.sharestate').html('<p><span>'+skuList[k].sellingNum+'</span>人已砍价成功</p>');
													}
												}else if(skuList[k].canOrder == false && skuList[k].canJoin == false && (skuList[k].canBegin == true ||skuList[k].canBegin == false) && skuList[k].lastResult == false){
													$('.sharecommoditybutton button').html('砍价靠颜值，先来试一刀').attr('data-state',4);
												}

											}else{ // 外页 00
												// var prizeInfo = JSON.parse(skuList[k].paramList);
												try{
													$('.giveCont p').html(paramList.prizetips);
													$('.giveContimg img').attr('src',paramList.prizepic);
												}catch(e){
													console.log('无砍价奖品')
												}
												if(userinfo.userId == userinfo.friendsId){
													if(skuList[k].canOrder == false && skuList[k].canJoin == false && skuList[k].canBegin == true && skuList[k].lastResult == true){ // 未发起
														$('.sharecommoditybutton button').html('砍价靠颜值，先来试一刀').attr('data-state',5);
													}else if((skuList[k].canOrder == true || skuList[k].canOrder == false) && skuList[k].canJoin == true && skuList[k].canBegin == false){  //canOrder:true/false;canJoin:true;canBegin:flase
														appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
														$('.friendname').html('活动进行时!');
														$('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',6);  
														$('.sharestate').html('<p>快帮我砍一刀吧，我还要砍<span>'+bargainTotalPrice+'</span>元</p>');
														$('#dateShowX').show().siblings('.preferential').hide();
													}else if(skuList[k].canOrder == true && skuList[k].canJoin == false && skuList[k].canBegin == false){

														// appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
														// $('.friendname').html('活动进行时!');
														// $('.sharecommoditybutton button').html('找好友，神补刀').attr('data-state',2);
														// $('#dateShowX').show().siblings('.preferential').hide();

														
														// $('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
														// $('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',6);  
														// $('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
														
														// $('.friendname').html('已砍获！');
														// $('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
														// $('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
														// $('.preferential').show().siblings('#dateShowX').hide();



														$('.friendname').html('已砍获！');
														$('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
														$('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
														$('.preferential').show().siblings('#dateShowX').hide();
														$('.sharestate').html('<p><span>'+skuList[k].sellingNum+'</span>人已砍价成功</p>');
													}else if(skuList[k].canOrder == true && skuList[k].canJoin == true && skuList[k].canBegin == false){

														// $('.friendname').html('已砍获！');
														// $('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
														// $('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
														// $('.preferential').show().siblings('#dateShowX').hide();

														appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
														$('.friendname').html('活动进行时!');
														$('.sharecommoditybutton button').html('找好友，神补刀').attr('data-state',2);
														$('#dateShowX').show().siblings('.preferential').hide();

														
														// $('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
														// $('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',6);  
														// $('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
														

														// $('.friendname').html('已砍获！');
														// $('.sharecommoditybutton button').html('立即下单 ').attr('data-state',2);
														// $('.preferential').html('已省<b>'+skuList[k].bargainTotalPrice+'</b>元');
														// $('.preferential').show().siblings('#dateShowX').hide();
													}else if(skuList[k].canOrder == false && skuList[k].canJoin == false){
														if(skuList[k].bargainCountTime > 0){
															appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
															$('.friendname').html('活动进行时!');

															$('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',6);  
															$('.sharestate').html('<p>快帮我砍一刀吧，我还要砍<span>'+bargainTotalPrice+'</span>元</p>');
															$('#dateShowX').show().siblings('.preferential').hide();
														}else{
															$('.friendname').html('虽败犹荣!');
															$('.preferential').html('只差<b>'+bargainTotalPrice+'</b>元');
															$('.sharecommoditybutton button').html('砍价失败，重新发起').attr('data-state',5); //下载
															$('.preferential').show().siblings('#dateShowX').hide();
															$('.sharestate').html('<p><span>'+skuList[k].sellingNum+'</span>人已砍价成功</p>');
														}
														// if(skuList[k].joinTimes == '1'){
														// }
														// $('.friendname').html('虽败犹荣!');
														// $('.preferential').html('只差<b>'+bargainTotalPrice+'</b>元');
														// $('.sharecommoditybutton button').html('砍价失败，重新发起').attr('data-state',5); //下载
														// $('.preferential').show().siblings('#dateShowX').hide();
													}else if(skuList[k].canOrder == false && skuList[k].canJoin == false && (skuList[k].canBegin == true ||skuList[k].canBegin == false) && skuList[k].lastResult == false){
														$('.sharecommoditybutton button').html('砍价靠颜值，先来试一刀').attr('data-state',5); // 下载
													}
												}else{
													if(skuList[k].canOrder == false && skuList[k].canJoin == false && skuList[k].canBegin == true && skuList[k].lastResult == true){
														// 未发起（canOrder:fasle;canJoin:false; canBegin:true;beginTimes等于0）
														$('.sharecommoditybutton button').html('砍价靠颜值，先来试一刀').attr('data-state',5); // 下载
													}else if((skuList[k].canOrder == true || skuList[k].canOrder == false) && skuList[k].canJoin == true && skuList[k].canBegin == false){  //canOrder:true/false;canJoin:true;canBegin:flase
														// 砍价中（canOrder:true/false;canJoin:true;canBegin:flase）
														if(skuList[k].joinTimes == '1'){
															if(skuList[k].isFinish == true){
																$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
																$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																$('.preferential').hide();
																$('#dateShowX').hide();
															}else{
																$('.friendname').addClass('firstBargain').html('成功加入了我的斧头帮<br><i>谢谢你帮我砍了<b>'+skuList[k].cyAmount+'</b>元</i>');
																$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																$('.preferential').hide();
																$('#dateShowX').hide();
															}
															// if(amountVal == undefined){
															// 	$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
															// 	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
															// 	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
															// 	$('.preferential').hide();
															// 	$('#dateShowX').hide();
															// }else{
															// 	$('.friendname').addClass('firstBargain').html('成功加入了我的斧头帮<br><i>谢谢你帮我砍了<b>'+amountVal+'</b>元</i>');
															// 	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
															// 	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
															// 	$('.preferential').hide();
															// 	$('#dateShowX').hide();
															// }
														}else{
															appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
															$('.friendname').html('活动进行时!');
															$('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',4);
															$('.sharestate').html('<p>快帮我砍一刀吧，我还要砍<span>'+bargainTotalPrice+'</span>元</p>');
															$('#dateShowX').show().siblings('.preferential').hide();
														}
														
													}else if(skuList[k].canOrder == true && skuList[k].canJoin == false && skuList[k].canBegin == false){
														// 砍价成功(canOrder:true;canJoin:false;canBegin:false)
														if(skuList[k].isFinish == true){
															$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
															$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
															$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
															$('.preferential').hide();
															$('#dateShowX').hide();
														}else{
															if(skuList[k].joinTimes == '1'){
																$('.friendname').addClass('firstBargain').html('成功加入了我的斧头帮<br><i>谢谢你帮我砍了<b>'+skuList[k].cyAmount+'</b>元</i>');
																$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																$('.preferential').hide();
																$('#dateShowX').hide();
															}else{
																appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
																$('.friendname').html('活动进行时!');
																$('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',6);  
																$('.sharestate').html('<p>快帮我砍一刀吧，我还要砍<span>'+bargainTotalPrice+'</span>元</p>');
																$('#dateShowX').show().siblings('.preferential').hide();
															}
														}
														// if(amountVal == undefined){
														// 	$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
														// 	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
														// 	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
														// 	$('.preferential').hide();
														// 	$('#dateShowX').hide();
														// }else{
														// 	$('.friendname').addClass('firstBargain').html('成功加入了我的斧头帮<br><i>谢谢你帮我砍了<b>'+amountVal+'</b>元</i>');
														// 	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
														// 	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
														// 	$('.preferential').hide();
														// 	$('#dateShowX').hide();
														// }
													}else if(skuList[k].canOrder == false && skuList[k].canJoin == false && (skuList[k].canBegin == true || skuList[k].canBegin == false)){
														//  砍价失败(canOrder:false;canJoin:false;canBegin:true/false)
														if(skuList[k].joinTimes == '1'){

															if(skuList[k].isFinish == true){
																$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
																$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																$('.preferential').hide();
																$('#dateShowX').hide();
															}else{
																$('.friendname').addClass('firstBargain').html('成功加入了我的斧头帮<br><i>谢谢你帮我砍了<b>'+skuList[k].cyAmount+'</b>元</i>');
																$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																$('.preferential').hide();
																$('#dateShowX').hide();
															}
															// if(amountVal == undefined){
															// 	$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
															// 	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
															// 	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
															// 	$('.preferential').hide();
															// 	$('#dateShowX').hide();
															// }else{
															// 	$('.friendname').addClass('firstBargain').html('成功加入了我的斧头帮<br><i>谢谢你帮我砍了<b>'+amountVal+'</b>元</i>');
															// 	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
															// 	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
															// 	$('.preferential').hide();
															// 	$('#dateShowX').hide();
															// }
														}else{
															if(skuList[k].isFinish == true){
																$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
																$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																$('.preferential').hide();
																$('#dateShowX').hide();
															}else{
																if(skuList[k].bargainCountTime == null){
																	$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
																	$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																	$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																	$('.preferential').hide();
																	$('#dateShowX').hide();
																	// $('.friendname').html('虽败犹荣!');
																	// $('.preferential').html('只差<b>'+bargainTotalPrice+'</b>元');
																	// $('.sharecommoditybutton button').html('砍价失败，重新发起').attr('data-state',5); //下载
																	// $('.preferential').show().siblings('#dateShowX').hide();
																}else{
																	if(skuList[k].bargainCountTime > 0){
																		appMain.Module.atyleftTime("X",skuList[k].bargainCountTime);
																		$('.friendname').html('活动进行时!');
																		$('.sharecommoditybutton button').html('帮TA砍一刀').attr('data-state',6);  
																		$('.sharestate').html('<p>快帮我砍一刀吧，我还要砍<span>'+bargainTotalPrice+'</span>元</p>');
																		$('#dateShowX').show().siblings('.preferential').hide();
																	}else{
																		$('.friendname').addClass('firstBargain').html('砍价失败！我的砍价时间已过期<br><i>真遗憾，下次帮人不要犹豫啦</i>');
																		$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
																		$('.preferential').hide();
																		$('#dateShowX').hide();
																		$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
																	}
																}
															}
															// $('.friendname').addClass('firstBargain').html('砍价失败！我的砍价时间已过期<br><i>真遗憾，下次帮人不要犹豫啦</i>');
															// $('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
															// $('.preferential').hide();
															// $('#dateShowX').hide();
															// $('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
														}
														
													}else if(skuList[k].canOrder == false && skuList[k].canJoin == false && (skuList[k].canBegin == true ||skuList[k].canBegin == false) && skuList[k].lastResult == false){
														// 砍价完成（canOrder:fasle;canJoin:false;canBegin:true/false；beginTimes大于0）
														$('.friendname').addClass('firstBargain').html('砍价成功，我已经获得商品了<br><i>砍价就是这么容易成功哦，你也试试</i>');
														$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
														$('.sharestate').html('<p>你也可以发起砍价试试，首刀可以砍掉<span>'+skuList[k].firstBargainRule+'</span>元哦</p>');
														$('.preferential').hide();
														$('#dateShowX').hide();
													}
												}
											}
											var payPrice = (parseFloat(skuList[k].costPrice)*100 - parseFloat(skuList[k].highestAmount)*100)/100;
											userinfo.payprice = payPrice;
											userinfo.skuName = skuList[k].skuName;
											userinfo.logoUrl = skuList[k].logoUrl;
											$('.sharecommodityimg img').attr('src',(skuList[k].logoUrl));
											$('.sharecommodityname').html(skuList[k].skuName);
											$('.shareoriginalprice').html('原价 ￥ '+skuList[k].costPrice);
											$('.sharepayprice').html('砍获价 ￥<b>'+payPrice+'</b>');
											break;
										}
									}
									var arrshtml = "";
									skulength = 0;
									function repeatHtml(arrs,skuList) {
										console.log(arrs);
										for(var e = 0; e < skuList.length; e++) {
											skulength ++;
											var canpayPrice = (parseFloat(skuList[e].costPrice)*100 - parseFloat(skuList[e].highestAmount)*100)/100;
											if(skuList[e].skuId == arrs){
												if(JSON.parse(skuList[e].rate) < 1){
													if(skuList[e].canOrder == false && skuList[e].canJoin == false && skuList[e].canBegin == true && skuList[e].lastResult == true){
														// 未发起（canOrder:fasle;canJoin:false; canBegin:true;beginTimes等于0）
														arrshtml += '<li pid='+skuList[e].productId+' sid='+skuList[e].skuId+'>\
															<div class="promotebox">\
																<div class="promoteimg">\
																	<img src="'+skuList[e].logoUrl+'" alt="">\
																</div>\
																<div class="promotecont">\
																	<div class="promotedescribe">\
																		<h3 class="promotename">'+skuList[e].skuName+'</h3>\
																		<p class="promotedynamics">'+skuList[e].sellingNum+'人已砍价成功</p>\
																		<del class="promoteoriginalprice">￥'+skuList[e].costPrice+'</del>\
																		<h2 class="promotepayprice">￥<b>'+canpayPrice+'</b></h2>\
																	</div>\
																	<div class="promotebutton">\
																		<button>发起砍价</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else if((skuList[e].canOrder == true || skuList[e].canOrder == false) && skuList[e].canJoin == true && skuList[e].canBegin == false){  //canOrder:true/false;canJoin:true;canBegin:flase
														// 砍价中（canOrder:true/false;canJoin:true;canBegin:flase）
														arrshtml += '<li pid='+skuList[e].productId+' sid='+skuList[e].skuId+'>\
															<div class="priceState" stateType="1"><p><span>砍价中</span></p></div>\
															<div class="promotebox">\
																<div class="promoteimg">\
																	<img src="'+skuList[e].logoUrl+'" alt="">\
																	<p class="homeTimebox" dataTime='+skuList[e].bargainCountTime+'>\
																		<span class="homeTimecont" id="dateShow'+skulength+'">\
																			剩余\
																			<span class="isDateshow" style="display: none;"><b class="date-tiem-span d">00</b>天</span>\
																			<span><b class="date-tiem-span h">00</b>:</span>\
																			<span><b class="date-tiem-span m">00</b>:</span>\
																			<span><b class="date-s-span s">00</b></span>\
																		</span>\
																	</p>\
																</div>\
																<div class="promotecont">\
																	<div class="promotedescribe">\
																		<h3 class="promotename">'+skuList[e].skuName+'</h3>\
																		<p class="promotedynamics">'+skuList[e].sellingNum+'人已砍价成功</p>\
																		<del class="promoteoriginalprice">￥'+skuList[e].costPrice+'</del>\
																		<h2 class="promotepayprice">￥<b>'+canpayPrice+'</b></h2>\
																	</div>\
																	<div class="promotebutton">\
																		<button>继续砍价</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else if(skuList[e].canOrder == true && skuList[e].canJoin == false && skuList[e].canBegin == false){
														// 砍价成功(canOrder:true;canJoin:false;canBegin:false)
														arrshtml += '<li pid='+skuList[e].productId+' sid='+skuList[e].skuId+'>\
															<div class="priceState" stateType="3"><p><span>砍完成</span></p></div>\
															<div class="promotebox">\
																<div class="promoteimg">\
																	<img src="'+skuList[e].logoUrl+'" alt="">\
																</div>\
																<div class="promotecont">\
																	<div class="promotedescribe">\
																		<h3 class="promotename">'+skuList[e].skuName+'</h3>\
																		<p class="promotedynamics">'+skuList[e].sellingNum+'人已砍价成功</p>\
																		<del class="promoteoriginalprice">￥'+skuList[e].costPrice+'</del>\
																		<h2 class="promotepayprice">￥<b>'+canpayPrice+'</b></h2>\
																	</div>\
																	<div class="promotebutton">\
																		<button data-state="2">立即下单</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}else if(skuList[e].canOrder == false && skuList[e].canJoin == false && (skuList[e].canBegin == true ||skuList[e].canBegin == false)){
														//  砍价失败(canOrder:false;canJoin:false;canBegin:true/false)
														if(skuList[e].lastResult != true){
															arrshtml += '<li pid='+skuList[e].productId+' sid='+skuList[e].skuId+'>\
																<div class="priceState" stateType="2"><p><span>砍价失败</span></p></div>\
																<div class="promotebox">\
																	<div class="promoteimg">\
																		<img src="'+skuList[e].logoUrl+'" alt="">\
																	</div>\
																	<div class="promotecont">\
																		<div class="promotedescribe">\
																			<h3 class="promotename">'+skuList[e].skuName+'</h3>\
																			<p class="promotedynamics">'+skuList[e].sellingNum+'人已砍价成功</p>\
																			<del class="promoteoriginalprice">￥'+skuList[e].costPrice+'</del>\
																			<h2 class="promotepayprice">￥<b>'+canpayPrice+'</b></h2>\
																		</div>\
																		<div class="promotebutton">\
																			<button>重新发起</button>\
																		</div>\
																	</div>\
																</div>\
															</li>';
														}
													}else if(skuList[e].canOrder == false && skuList[e].canJoin == false && (skuList[e].canBegin == true ||skuList[e].canBegin == false) && skuList[e].lastResult == false){
														// 砍价完成（canOrder:fasle;canJoin:false;canBegin:true/false；beginTimes大于0）
														
													}
												}else{
													if(skuList[e].canOrder == true && skuList[e].canJoin == false && skuList[e].canBegin == false){
														// 砍价成功(canOrder:true;canJoin:false;canBegin:false)
														skuhtml += '<li pid='+skuList[e].productId+' sid='+skuList[e].skuId+'>\
															<div class="priceState" stateType="3"><p><span>砍完成</span></p></div>\
															<div class="commoditybox">\
																<div class="commodityimg">\
																	<img src='+skuList[e].logoUrl+' alt="">\
																</div>\
																<div class="commoditycont">\
																	<div class="commoditydescribe">\
																		<h3 class="commodityname">'+skuList[e].skuName+'</h3>\
																		<p class="dynamics">'+skuList[e].sellingNum+'人已砍价成功</p>\
																		<del class="originalprice">￥'+skuList[e].costPrice+'</del>\
																		<h2 class="payprice">￥<b>'+payPrice+'</b></h2>\
																	</div>\
																	<div class="commoditybutton">\
																		<button data-state="2">立即下单</button>\
																	</div>\
																</div>\
															</div>\
														</li>';
													}
												}
												if((skuList[e].canOrder == true || skuList[e].canOrder == false) && skuList[e].canJoin == true && skuList[e].canBegin == false){
													appMain.Module.atyleftTime(skulength,skuList[e].bargainCountTime);
												}
											}
										}
									}
									if(isshare == '1'){
										for(var a = 0; a < arr.length; a++) {
											repeatHtml(arr[a],skuList);
										}
									}
									$('.promotelist ul').html(arrshtml);
									var promotelength = $('.promotelist ul li').length;
									if(promotelength != 0){
										$('.promote').show();
									}
									appMain.Module.pageloading(false,'sharebox');
									appMain.Module.bargaindetails();
								}
							}else if(data.datas[0].state == '6'){

								$('.abnormalbox').show();
								$('.dynamicnews,.indextopbox').hide();
							}else if(data.datas[0].state == '7'){
								// $('.abnormalbox').show();
								// $('.dynamicnews,.indextopbox').hide();
								// $('.abnormalbox p').html('活动已经过期，下次请早~');
							}
						}else{
							$('.abnormalbox').show();
							$('.dynamicnews,.indextopbox').hide();
						}
						appMain.Module.pageloading(false,'indexbox');
						appMain.Module.pageloading(false,'sharebox');
						console.log(userinfo.actcode)
					},
					fn_e :function(){
						appMain.Module.pageloading(false,'indexbox');
						appMain.Module.pageloading(false,'sharebox');
						$('.abnormalbox').show();
						$('.dynamicnews,.indextopbox').hide();
						appMain.Module.error_message(1,"网络连接不上哦，请重试！");
					}
				});
			},
			bargaindetails : function(){ // 查询砍价详情列表
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.bargaindetails,
					data : {
						actionNo : userinfo.actcode,
						userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,//userinfo.userId,
						authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
						pageNo : userinfo.pageNo,
						pageSize : userinfo.pageSize
					},
					fn : function(data){
					
						if(data.recordCount != 0 &&data.success == true){
							var detailsList = data.datas;
							var	detailshtml = "",
								detailslength = 0,
								cyUrl,
								cyName;
							for(var i = 0; i < detailsList.length; i++) {
								detailslength ++;
								detailsList[i].skuSort = detailslength
							}
							for(var i = detailsList.length -1;i >= 0; i--) {
								cyUrl = '<img src="./img/friend.jpg" alt="">'
								if(detailsList[i].cyUrl != null){
									cyUrl = '<img src="'+detailsList[i].cyUrl+'" alt="">'
								}

								var cyNameVal
								if(detailsList[i].cyName != null){
									if(/^1[34578]\d{9}$/.test(detailsList[i].cyName)){
										cyNameVal = detailsList[i].cyName.substring(0,3)+"***"+detailsList[i].cyName.substring(7,11);
									}else{
										cyNameVal = decodeURIComponent(detailsList[i].cyName);
									}
								}else{
									cyNameVal = "找不到号码"
								}
								if(detailsList[i].skuSort <= 3){
									detailshtml += '<li>\
										<div class="axegangcont">\
											<p>\
												'+cyUrl+'\
												<span class="axegangname">'+cyNameVal+'</span>\
												<span class="axegangprice">助砍<b>'+detailsList[i].amount+'</b>元 <b class="axeganglabel details'+detailsList[i].skuSort+'"></b></span>\
											</p>\
										</div>\
									</li>';
								}else{
									detailshtml += '<li>\
										<div class="axegangcont">\
											<p>\
												'+cyUrl+'\
												<span class="axegangname">'+cyNameVal+'</span>\
												<span class="axegangprice">助砍<b>'+detailsList[i].amount+'</b>元 <b class="axeganglabel details'+4+'"></b></span>\
											</p>\
										</div>\
									</li>';
								}
							}
							if(data.recordCount > 3){
								$('.axegangMore').show();
							}
							$('.axeganglist ul').html(detailshtml);
							$('.details1').html('小蜂助砍');
							$('.details2').html('头号耳目');
							$('.details3').html('神补刀');
							$('.details4').html('神补刀');
							$('.axegang').show();
							if(detailsList.length  == 1){
								$('.axeganglist ul').append('<li class="popularity"><p><span>大家懒洋洋的，多发几个好友圈更容易成功喔。</span></p></li>');
							}
							// 大家懒洋洋的，多发几个好友圈更容易成功喔。  fffded  999999
						}else{
							$('.axegang').hide();
						}
					},
					fn_e :function(){
						appMain.Module.error_message(1,"网络连接不上哦，请重试！");
					}
				});
			},
			atyleftTime :function(skulength,Time){ // 砍价倒计时
				var CurTime = Date.parse(new Date()) + Time + 1000;
				var skuTime = appMain.Module.timeString(CurTime,false,true);
				window.clearInterval(clearTime);
				setTimeout(function () {
					clearTime=$.leftTime(skuTime,function(d){
						// console.log(d.status)
						if(d.status){
							var $dateShow4=$('#dateShow'+skulength+'');
							$dateShow4.find(".d").html(d.d);
							$dateShow4.find(".h").html(d.h);
							$dateShow4.find(".m").html(d.m);
							$dateShow4.find(".s").html(d.s);
						}else{
							// console.log(d.status);
							appMain.Module.querySchemeSkuList(userinfo.sid);
							if($('body').hasClass('share')){
								$('.burrentPrice').hide();
							}
						}
					});
					
				}, 100);
			},
			validateStaffCode:function(options) { // 验证手机号码
				appMain.Loader.load({
					stringify : false,
					url : appMain.API.validateStaffCode,
					data : {
						staffCode : options,
					},
					fn : function(data){
						$('.phonebutton button').removeClass('disabled registration logInBtn');
						if(data.code == "0"){
							isGoRegistered = true;
							$('.phonebutton button').addClass('registration');
						}else{
							isGoRegistered = false;
							$('.phonebutton button').addClass('logInBtn');
						}
					},
					fn_e :function(data){
						appMain.Module.error_message(2,"网络异常，请重试");
					}
				});
			},
			smsVerify : function(options,valiCode) { // 下发短信接口
				var phonenum = options,
					validCode = $('.graphicalbox input').val();
				appMain.Loader.load({
					stringify : false,
					url : appMain.API.smsVerify,
					data : {
						phonenum : phonenum,
						validCode : validCode,
						key : userinfo.key,
						modelid : userinfo.modelid,
						templateid : userinfo.templateid,
					},
					fn : function(data){
						// var data = {"success":true,"message":"发送短信成功","code":"0"}
						$('.Verification2_input input').val('');
						if(data.success == true && data.code == "0"){
							$('.verificationbox strong').html('已发送<span class="qrcodtime">60</span>s').addClass('disabled');
							appMain.Module.countdowntime();
							if(valiCode == ""){
								$('.graphicalbox').hide();
							}
							$('.verificationbox input').attr('disabled',false);
							$('.phoneNumbox input').attr('disabled',true);
							$('.graphicalbox input').attr('disabled',true);
						}else{
							$('.verificationbox strong').addClass('disabled');
							$('.messageInput').attr('disabled',true);
							$('.messageInput').val('');
							$('.registerBtn').attr('disabled',true);
							$('.registerBtn').val('');
							if(data.code == "9"){  //要入手图形验证码
								$('.verificationbox strong').removeClass('disabled');
								$('.graphicalbox').show();
								$('.graphicalbox input').attr('disabled',false);
								appMain.Module.falsehints(true,data.message);
								randomWord(true,32,32);
								$('.graphicalbox img').attr('src',appMain.config.imgPath+'/fzsCaptchaApi/captcah/captcah.jpg?key='+userinfo.key);
								// appMain.Module.error_message(1,"此手机号码操作频繁,"+data.message);
							}else if(data.code == "1"){//9操作频繁/
								appMain.Module.falsehints(true,"用户操作频繁");
								$('.phoneNumbox input').attr('disabled',false);
							}else if(data.code == "6"){ // 6 模板配置错误
								appMain.Module.falsehints(true,'模板配置错误');
							}else if(data.code == "2"){ // 6 模板配置错误
								appMain.Module.falsehints(true,'图形验证码不正确');
								$('.graphicalbox input').val('');
								randomWord(true,32,32);
								$('.graphicalbox img').attr('src',appMain.config.imgPath+'/fzsCaptchaApi/captcah/captcah.jpg?key='+userinfo.key);
							}else{
								appMain.Module.falsehints(true,data.message);
								$('.graphicalbox input').val('');
								randomWord(true,32,32);
								$('.graphicalbox img').attr('src',appMain.config.imgPath+'/fzsCaptchaApi/captcah/captcah.jpg?key='+userinfo.key);
							}
						}
					},
					fn_e :function(data){
						$('.verificationbox strong').removeClass('disabled');
						$('.messageInput').attr('disabled',true);
						$('.messageInput').val('');
						$('.registerBtn').attr('disabled',true);
						$('.registerBtn').val('');
						appMain.Module.error_message(2,"网络异常，请重试");
					}
				});
			},
			authLoginV2:function(){ // 一键登录-
				var mobile = $('.phoneNumbox input').val(),
					smsValiCode = $('.verificationbox input').val();
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url: appMain.API.authLoginV2,
					data: {
						clientVersionId: userinfo.clientVersionId,
						registerFrom: "FBSSJ_SYSTEM",
						channelId: userinfo.channelId,
						extendInfo: {
							extendType: 'SMS',
							modelid: userinfo.modelid,
							templateid: userinfo.templateid,
							smsValiCode: smsValiCode
						},
						mobile: mobile,
						password: '',
						loginType: '1'
					  },
					fn: function (data) {
						window.localStorage.setItem('userinfoData',JSON.stringify(data));
						if(data.success == true){
							var userName = data.valueObject.userInfo.user.bindMobile ? data.valueObject.userInfo.user.bindMobile : data.valueObject.userInfo.user.userName;
							userinfo.userId = data.valueObject.exjf.userId;
							userinfo.mobile = data.valueObject.userInfo.user.bindMobile;
							userinfo.authToken = data.valueObject.authToken;
							userinfo.nickName = data.valueObject.userInfo.user.nickName ? data.valueObject.userInfo.user.nickName : userName;
							userinfo.headPhotoUrl = data.valueObject.userInfo.exUserInfo.headPhotoUrl; //userPerGroups
							appMain.Module.close_popup();
							appMain.Module.querySchemeSkuList(userinfo.sid);
						}else{
							userinfo.mobile = "";
							userinfo.authToken = "";
							if(data.code == "503"){
								$('.verificationbox input').attr('disabled',false);
								appMain.Module.falsehints(true,data.message);
							}else{
								appMain.Module.error_message(1,"网络异常，请重试");
							}
						}
					},
					fn_e: function (data) {
						appMain.Module.error_message(1,"网络异常，请重试");
						userinfo.authToken = "";
					}
				});
			},
			collectUserAction : function(){ // 用户行为接口
				var nickName = userinfo.nickName?userinfo.nickName:'',
					headPhotoUrl = userinfo.headPhotoUrl?userinfo.headPhotoUrl:'';
				var ext = {
					cyAuthToken : userinfo.authToken,
					cyUserId : userinfo.userId,
					cyAuthType : userinfo.authType,
					cyName : nickName,
					cyUrl : headPhotoUrl,
				}
				if(model.clientType === 'XCX'){
					if(isshare == '1'){
						ext = {
							cyAuthToken : userinfo.authToken,
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
							cyName : nickName,
							cyUrl : headPhotoUrl,
							cyAppId : appMain.config.appid,
							encryptedData : userinfo.encryptedData,
							iv : userinfo.iv,
							openId : userinfo.openId
						}
					}else{
						if(!isWX()){
							userinfo.authType = 'FZS'
						}
						ext = {
							cyAuthToken : userinfo.authToken,
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
							cyName : nickName,
							cyUrl : headPhotoUrl,
						}
					}
				}
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.collectUserAction,
					data : {
						clientId : userinfo.clientVersionId,
						userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
						authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
						actionParams : {
							actionNo : userinfo.actcode,
							actionCode : ""
						},
						ext : JSON.stringify(ext)
					},
					fn : function(data){
						if(data.success == true){
							if(isshare == "1"){
								var statedata = {
									isChannel : false
								};
								window.localStorage.setItem('statedata',JSON.stringify(statedata));
								appMain.Module.firstKnifeSt(0,data.datas.amount);
							}else{
								if(data.datas.giftVoucherList.length  != 0){
									$('.giveCont h3').html('送你 '+data.datas.giftVoucherList[0].cptcDetailName);
									$('.giveCont p').html(data.datas.giftVoucherList[0].prizetips);
									$('.giveContimg img').attr('src',data.datas.giftVoucherList[0].prizepic);
									$('.prizeGivebox').attr('cVoucherNo',data.datas.giftVoucherList[0].cVoucherNo).show();
								}
								$('.sharecommoditybutton button').html('发起我的砍价').attr('data-state',5);
								appMain.Module.firstKnifeSt(1,data.datas.amount);
							}
							appMain.Module.querySchemeSkuList(userinfo.sid,'',data.datas.amount);
						}else{
							if(isshare == "1"){
								if(data.errorCode == '400131'){ // 砍价已完成
									appMain.Module.error_message(1,"用户信息失效了哦");
									window.localStorage.removeItem('userinfoData');
									if(model.clientType == 'APP'){
										appService.goLogin(function () {
											window.location.reload();//去登录页面
										});
									}else{
										appMain.Module.error_message(1,"用户信息不正确");
										// window.localStorage.removeItem('userinfoData');
										// setTimeout(function () {
										// 	// if(isWX()){
										// 	// 	appMain.Module.generateOauthUrl();
										// 	// 	// $('.addressinput input').val(userinfo.mobile);
										// 	// }else{
										// 	// 	window.location.reload();
										// 	// }
										// 	appMain.Module.generateOauthUrl();
										// 	// window.location.reload();//去登录页面
										// }, 100);
									}
								}else if(data.errorCode == '400038'){
									appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光");
									// appMain.Module.error_message(1,'活动太火爆了，请稍候重试');
									// appMain.Module.firstKnifeSt(2);
								}else{
									appMain.Module.error_message(1,data.errorMessage);
								}
							}else{
								if(data.errorCode == '400030'){ //已砍过
									appMain.Module.firstKnifeSt(2);
								}else if(data.errorCode == '400130'){
									appMain.Module.firstKnifeSt(2);
								}else if(data.errorCode == '400131'){ // 失效
									// appMain.Module.error_message(1,"");
									window.localStorage.removeItem('userinfoData');
									setTimeout(function () {
										// if(isWX()){
										// 	appMain.Module.generateOauthUrl();
										// 	// $('.addressinput input').val(userinfo.mobile);
										// }else{
										// 	window.location.reload();
										// }
										if(isWX()){
											appMain.Module.generateOauthUrl();
										}else{
											appMain.Module.error_message(1,data.errorMessage);
										}
										
										// window.location.reload();//去登录页面
									}, 100);
									// appMain.Module.firstKnifeSt(3);
								}else if(data.errorCode == '400128'){ // 砍价已完成
									window.localStorage.removeItem('userinfoData');
									setTimeout(function () {
										// if(isWX()){
										// 	appMain.Module.generateOauthUrl();
										// 	// $('.addressinput input').val(userinfo.mobile);
										// }else{
										// 	window.location.reload();
										// }
										// appMain.Module.generateOauthUrl();
										if(isWX()){
											appMain.Module.generateOauthUrl();
										}else{
											appMain.Module.error_message(1,data.errorMessage);
										}
										// window.location.reload();//去登录页面
									}, 100);
									// appMain.Module.firstKnifeSt(3);
								}else if(data.errorCode == '400127'){ // 砍价已完成
									appMain.Module.firstKnifeSt(3);
								}else if(data.errorCode == '400038'){
									appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光");
									// appMain.Module.error_message(1,'活动太火爆了，请稍候重试');
									// appMain.Module.firstKnifeSt(2);
								}
								// else{
								// 	appMain.Module.error_message(1,data.errorMessage);
								// }
							}
						}
					},
					fn_e :function(){
						appMain.Module.error_message(1,"网络异常，请重试");
					}
				});
			},
			openReward : function(cVoucherNo){ //用户领取促销奖励
				$('.prizeGivebox b').html('领取中');
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.openReward,
					data : {
						clientId : userinfo.clientVersionId,
						userId : userinfo.userId,
						authType : userinfo.authType,
						rVoucherNo : cVoucherNo,
					},
					fn : function(data){
						if(data.success == true){
							$('.prizeGivebox').addClass('disabled');
							$('.prizeGivebox b').html('领取成功');
							$('.giveCont p').html(data.datas.rewardInfo);
							appMain.Module.error_message(1,'领取成功');
							
						}else{
							$('.prizeGivebox b').html('重新领取');
							appMain.Module.error_message(1,'领取失败');
						}
					},
					fn_e :function(data){
						appMain.Module.error_message(1,"网络连接不上哦，请重试！");
					}
				});
			},
			userReceiveCxCptc : function(){ //用户领取促销奖励
				$('.receive_button button').html('领取中...');
				var orderId = $('.product_name').attr('orderId');
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.userReceiveCxCptc,
					data : {
						clientId : userinfo.clientVersionId,
						userId : userinfo.userId,
						authType : userinfo.userId,
						orderId : orderId,
					},
					fn : function(data){
						if(data.success == true){
							if(data.datas.resultFlag == '0'){
								$('.receive_button button').html('领取失败').addClass('disabled');
							}
							if(data.datas.resultFlag == '1'){
	
								$('.receive_button button').html('已领取').addClass('disabled');
								if(data.datas.rewardInfo != ""){
									$('.receiveexplain2').html(data.datas.rewardInfo);
								}
							}
							if(data.datas.resultFlag == '2'){
								$('.receive_button button').html('已领完').addClass('disabled');
							}
						}else{
							$('.receive_button button').html('领取失败');
							appMain.Module.error_message(data.errorMessage);
						}
					},
					fn_e :function(data){
						appMain.Module.error_message("网络连接不上哦，请重试！");
					}
				});
			},
			firstKnifeSt:function(options,cont){ // 弹出框内容
				var data = [
					[
						{src:'./img/img23.png'},
						{cont:'<h3>首刀砍掉<b>'+cont+'</b>元</h3>多发几个好友圈砍得更快喔'},
						{button:'找神补刀'},
						{state:options}
					],[
						{src:'./img/img28.png'},
						{cont:'<h3>谢谢您帮我砍了<b>'+cont+'</b>元</h3><span>真的超低价，您也可以挑选商品试试哦</span>'},
						{button:'我知道了'},
						{state:options}
					],[
						{src:'./img/img26.png'},
						{cont:'<h3>之前砍过啦，太殷勤有猫腻喔</h3>感兴趣，你也可以挑选商品试试哦～'},
						{button:'我知道了'},
						{state:options}
					],[
						{src:'./img/img25.png'},
						{cont:'<h3>TA的砍价已经完成了</h3>砍价就这么容易哦，你也可以参与试试～'},
						{button:'我知道了'},
						{state:options}
					],[
						{src:'./img/img24.png'},
						{cont:'<h3>好可惜，该商品已被无情地抢光</h3>赶快逛逛其他好物吧'},
						{button:'我知道了'},
						{state:options}
					],[
						{src:'./img/img25.png'},
						{cont:'<h3>请前往APP中参与砍价</h3>可以省超级多哦'},
						{button:'前往APP参与砍价'},
						{state:options}
					],[
						{src:'./img/wxCode.jpg'},
						{cont:'<h3>请在微信搜索【福利特权】</h3>小程序参与吧～'},
						{button:'我知道了'},
						{state:options}
					]
				]
				// console.log(data[options][3].state+1);
				$('.popuptopbox img').attr('src',data[options][0].src)
				$('.firstKnifecont').html(data[options][1].cont);
				$('.firstKnifecontbtn button').html(data[options][2].button).attr('data-state',data[options][3].state+1);
				appMain.Module.open_popup('firstKnife_box');
			},
			addAddress:function(){ // 添加地址
				var name = $('.addName').val(),
					phone = $('.addPhone').val(),
					regionName = $('.addCity').val() ,
					address = $('.addDetails').val();
				appMain.Loader.load({
					stringify : false,
					url: appMain.API.addAddress,
					data: {
						authToken : userinfo.authToken,
						name : name,
						phone : phone,
						region : "510000",
						regionName : regionName,
						address : address
					},
					fn: function (data) {
						if(data.success== true){
							appMain.Module.addresslist();
							// var cswitch = $('.setUpswitch span').hasClass('switch-on')
							// if(cswitch){

							// }
						}else{
							appMain.Module.error_message(1,data.errorMessage); 
						}
					},
					fn_e: function (data) {
						appMain.Module.error_message(1,"网络异常，请重试");
					}
				});
			},
			setdefault:function(id){ // 默认地址
				appMain.Loader.load({
					stringify : false,
					url: appMain.API.setdefault,
					data: {
						authToken : userinfo.authToken,
						id : id
					},
					fn: function (data) {
						if(data.success== true){
							$('.addresslist li[id='+id+']').addClass("addChoice").siblings().removeClass("addChoice");
							// $('.addresslist li b').attr("isDefault",'0');
							// $('.addresslist li[id='+id+'] b').attr("isDefault",'1');
							window.location.href = 'order.html?pid='+userinfo.pid+'&skuid='+userinfo.sid;
						}else{
							appMain.Module.error_message(1,data.errorMessage); 
						}
					},
					fn_e: function (data) {
						appMain.Module.error_message(1,"网络异常，请重试");
					}
				});
			},
			modify:function(id){ // 修改地址
				var name = $('.addName').val(),
					phone = $('.addPhone').val(),
					regionName = $('.addCity').val(),
					address = $('.addDetails').val();
				appMain.Loader.load({
					stringify : false,
					url: appMain.API.modify,
					data: {
						authToken : userinfo.authToken,
						name : name,
						phone : phone,
						region : "510000",
						regionName : regionName,
						address : address,
						id : id,
					},
					fn: function (data) {
						if(data.success== true){
							appMain.Module.addresslist();
						}else{
							appMain.Module.error_message(1,data.errorMessage); 
						}
					},
					fn_e: function (data) {
						appMain.Module.error_message(1,"网络异常，请重试");
					}
				});
			},
			addresslist:function(){ // 地址列表
				appMain.Loader.load({
					stringify : false,
					url: appMain.API.addresslist,
					data: {
						authToken : userinfo.authToken
					},
					fn: function (data) {
						// var data  = {"success":true,"errorCode":null,"errorMessage":null,"datas":[],"recordCount":0}
						if(data.success== true && data.recordCount != 0){
							$('.buttonCont button').attr('disabled',false);
							var datas = data.datas;
							if($('body').hasClass('order')){ // 下单页
								for(var i = 0; i < datas.length; i++) {
									if(datas[i].isDefault == 1){
										$('.addressMaterial').attr({
											name : datas[i].name,
											phone : datas[i].phone,
											regionName : datas[i].regionName,
											address : datas[i].address
										});
										$('.addressName').html(datas[i].name);
										$('.addressNum').html(datas[i].phone);
										$('.addressMaterial p').html(datas[i].regionName+datas[i].address);
									}else{
										
									}
								}
							}else if($('body').hasClass('address')){ // 地址管理页
								var addresshtml = "";
								for(var i = 0; i < datas.length; i++) {
									if(datas[i].isDefault == 1){
										addresshtml += '<li class="addChoice">\
											<div id='+datas[i].id+' staffCode='+datas[i].staffCode+' isDefault='+datas[i].isDefault+' region='+datas[i].region+' regionName='+datas[i].regionName+' phone='+datas[i].phone+' name='+datas[i].name+' address='+datas[i].address+' class="addressMaterials">\
												<h3><span class="addressNames">'+datas[i].name+'</span> <span class="addressNums">'+datas[i].phone+'</span></h3>\
												<p>'+datas[i].regionName+datas[i].address+'</p>\
											</div>\
											<b id='+datas[i].id+' staffCode='+datas[i].staffCode+' isDefault='+datas[i].isDefault+' region='+datas[i].region+' regionName='+datas[i].regionName+' phone='+datas[i].phone+' name='+datas[i].name+' address='+datas[i].address+' class="addedit"></b>\
										</li>'
									}else{
										addresshtml += '<li class="">\
											<div  id='+datas[i].id+' staffCode='+datas[i].staffCode+' isDefault='+datas[i].isDefault+' region='+datas[i].region+' regionName='+datas[i].regionName+' phone='+datas[i].phone+' name='+datas[i].name+' address='+datas[i].address+' class="addressMaterials">\
												<h3><span class="addressNames">'+datas[i].name+'</span> <span class="addressNums">'+datas[i].phone+'</span></h3>\
												<p>'+datas[i].regionName+datas[i].address+'</p>\
											</div>\
											<b id='+datas[i].id+' staffCode='+datas[i].staffCode+' isDefault='+datas[i].isDefault+' region='+datas[i].region+' regionName='+datas[i].regionName+' phone='+datas[i].phone+' name='+datas[i].name+' address='+datas[i].address+' class="addedit"></b>\
										</li>'
									}
								}
								$('.addresslist ul').html(addresshtml);
								// console.log(addresshtml);
								$('.addresscommoditylist').show().siblings('.addressdetails').hide();
								$('.addresslist').show();
							}
						}else{
							$('.buttonCont button').attr('disabled',true);
							if($('body').hasClass('order')){ // 下单页
								$('.addressMaterial').html('<p>请填写收货人信息</p>')
							}else if($('body').hasClass('address')){ // 地址管理页
								$('.addresscommoditylist').show().siblings('.addressdetails').hide();
								$('.addresscommoditylist .addbox,.noAddress').show();
							}
						}
						$('.addressMaterial').show();
						appMain.Module.pageloading(false,'addressbox');
					},
					fn_e: function (data) {
						appMain.Module.error_message(1,"网络异常，请重试");
					}
				});
			},
			productdetail : function(){ // 商品详情接口 pid:商品id , sid:单品id
				appMain.Loader.load({
					stringify : false,
					url : appMain.API.productdetail,
					data : {
						productId : userinfo.pid,
						userId : userinfo.userId,
						clientId : userinfo.clientVersionId,
						channelId :userinfo.channelId // "KHD_QD" //
						// categoryid :userinfo.categoryid, // "KHD_QD" //
					},
					fn : function(data){
						if(data.success == true && data.datas != null){	
							$('.explain_cont').html(data.datas.productTag);
							entityTypeCode = data.datas.entityTypeCode;
							businessType = data.datas.businessType;
							var typeCode = data.datas.entityTypeCode;
							if(data.datas.businessType == '4'){
								typeCode = data.datas.businessType;
							}
							$('.addressinput input').addClass('eliminateVal').attr({
								'placeholder':'请输入充值账号',
								'maxlength':'19',
							}).removeClass('contactVal');
							$('.addressinput b').addClass('eliminate');
							var materialObject = false;
							var type = appMain.Module.selectPayType();
							switch (typeCode){
							case "TRAFFIC":case "PF_DIRECT":case "PF_SLOW":case "FLOW_SERVICE":// 话费流量充值类
								$('.addressinput input').addClass('contactVal').attr({
									'placeholder':'请输入手机号码',
									'maxlength':'11'
								}).removeClass('eliminateVal');
								$('.addressinput b').addClass('contact').show();
								if(userinfo.mobile != null){
									if(!isWX()){
										$('.addressinput input').val(userinfo.mobile);
									}
								}
							break;
							case "YSHY":case "TENCENT_RECHARGE":case "GAME_RECHARGE":case "GIFT_RECHARGE":case "ZBCZ":case "FUEL_CARD":case "MUSIC_MEMBERS":case "READING_MEMBERS":case "SOCIAL_MEMBERS":case "LIVE_PLATFORM":case "MIFI_FLOW":case "MIFI_XF":case "MIFI_CARD":case "QQTV":case "FUEL_CARD_CHARGE":case "YOUKU":case "AIQIYI":case "MGTV":case "QQTV":case "SOHU":case "LETV":case "PPTV":case "FUEL_CARD_KEY":case "MUSIC_MEMBERS_N":case "YSHY_MGTV":case "GIFT_RECHARGE_B":
								$('.addressinput input').addClass('eliminateVal').attr({
									'placeholder':'请输入充值账号',
									'maxlength':'19',
								}).removeClass('contactVal');
								$('.addressinput b').addClass('eliminate');
							break;
							case "4":
								materialObject = true;
								$('.addressinput input').addClass('eliminateVal').attr({
									'placeholder':'请输入收货联系人',
									'maxlength':'36'
								}).removeClass('contactVal');
								$('.addressinput b').addClass('eliminate');
							break;
							}
							if($('.addressinput input').val() != ""){
								if(!$('.addressinput input').hasClass('eliminateVal')){
									appMain.Module.alApiOperator(userinfo.mobile);
									$('.buttonCont button').attr('disabled',false);
								}
							}
							$('.ordercommodityimg img').attr('src',userinfoData.dataSkuList.logoUrl);
							$('.ordercommodityname').html(userinfoData.dataSkuList.skuName);
							try{
								var state = JSON.parse(window.localStorage.getItem("statedata"));
								isChannel = state.isChannel;
								isFinish = state.isFinish;
							}catch(e){
								isChannel = false;
								isFinish = false;
							}
							var producPriceGo = (parseFloat(userinfoData.dataSkuList.costPrice)*10000000000 - parseFloat(userinfoData.dataSkuList.highestAmount)*10000000000)/10000000000;
							if(isFinish){
								producPriceGo = userinfoData.dataSkuList.salePrice;
							}
							var producPrice2 = (parseFloat(userinfoData.dataSkuList.marketPrice)*10000000000 - producPrice*10000000000)/10000000000;
							var skusList = data.datas.skus;
							$('.invoiceChoice').addClass('disabled');
							$('.invoiceChoice span').html('不可开发票');
							if(data.datas.isInvoice == '1'){
								$('.invoiceChoice').removeClass('disabled');
								$('.invoiceChoice span').html('不可开发票');
							}
							$('title').html(userinfoData.dataSkuList.skuName);
							for(var k = 0; k < skusList.length; k++) {
								if(skusList[k].skuId == userinfo.sid){
									var producPrice;
									$('.orderdynamics span').html(skusList[k].skuName);
									if(materialObject){
										var skuAttrGroup = [skusList[k].skuAttrGroup];
										var htmlGroup = '';
										try{
											skuAttrGroup[s].COLOR
											for(var s = 0; s < skuAttrGroup.length; s++) {
												console.log(skuAttrGroup[s].COLOR);
												htmlGroup += skuAttrGroup[s].COLOR+' ';
											}
											$('.orderdynamics span').html(htmlGroup);
										}catch(e){
											$('.orderdynamics span').remove();
										}
									}
									var orderdynamics = $('.orderdynamics span').html()
									if(orderdynamics == ""){
										$('.orderdynamics span').remove();
									}
									if(isChannel == false){
										$('.orderoriginalprice').html('￥'+userinfoData.dataSkuList.costPrice);
										if(userinfoData.dataSkuList.canJoin == true){
											producPrice = (parseFloat(userinfoData.dataSkuList.costPrice)*10000000000 - parseFloat(userinfoData.dataSkuList.salePrice)*10000000000)/10000000000;
											$('.orderpayprice').html('￥<b>'+userinfoData.dataSkuList.salePrice+'</b>');
											appMain.Module.productPrice(userinfoData.dataSkuList.salePrice,producPrice);
										}else{
											producPrice = (parseFloat(userinfoData.dataSkuList.costPrice)*10000000000 - parseFloat(producPriceGo)*10000000000)/10000000000;
											$('.orderpayprice').html('￥<b>'+producPriceGo+'</b>');
											appMain.Module.productPrice(producPriceGo,producPrice);
										}
									}else{
										$('.orderoriginalprice').html('￥'+skusList[k].marketPrice);
										$('.orderpayprice').html('￥<b>'+skusList[k].sellingPrice+'</b>');
										producPrice = (parseFloat(skusList[k].marketPrice)*10000000000 - parseFloat(skusList[k].sellingPrice)*10000000000)/10000000000;
										appMain.Module.productPrice(skusList[k].sellingPrice,producPrice);
									}
									break;
								}
							}
							if(data.datas.businessType == 4){
								$('.addressMaterial').show().siblings().hide();
								appMain.Module.addresslist();
							}else{
								$('.addressinput').show().siblings().hide();
							}

							if(isAppService){
								$('.addressinput b').show()
							}
							var datasku = data.datas.skus;
							userinfo.channelSkuId = datasku[0].id ? datasku[0].id :'';
							userinfo.sellingPrice = datasku[0].sellingPrice;
							userinfo.skuId = datasku[0].skuId;
							userinfo.productId = datasku[0].productId;
							userinfo.supplierGoodsId = data.datas.entityTypeId;
							entityTypeCode = data.datas.entityTypeCode;
							PayMethodList = data.datas.payMethodList;
							var paydatas = data.datas.payMethodList;
							var payList = [],
								paytpls = '';
								title = "",
								choice = "";
								// typecode = "";
							clearInterval(userinfo.repeateTask);
							clearInterval(userinfo.timeTask);
							for(var dd = 0; dd < paydatas.length; dd++) {
								if(paydatas[dd].paymentMethodId == "WXPAY"){
									title = "推荐安装微信5.0及以上版本";
									choice = "choice";
								}else if(paydatas[dd].paymentMethodId == "ALIPAY"){
									title = "推荐有支付宝账号的用户使用";
									choice = "";
								}else{
									title = "推荐有支付宝账号的用户使用";
									choice = ""
								}
								paytpls += '<li class="'+paydatas[dd].paymentMethodId+' '+choice+'" pay_codeid="'+paydatas[dd].paymentMethodId+'">\
									<h3>'+paydatas[dd].paymentMethodName+'<span>'+title+'</span><b><i></i></b></h3>\
								</li>';
							}
							$('.paymentList').html(paytpls);
							if(userinfoData.dataSkuList.salePrice == '0'){
								if(isChannel){
									$('.paymentList li').removeClass('nopay');
								}else{
									$('.paymentList li').addClass('nopay');
								}
							}
							appMain.Module.pageloading(false,'orderbox');
							
						}else{
							appMain.Module.error_message(1,"商品数据异常");
						}
						if(model.clientType === 'XCX'){
							$('.addressinput b').hide();
						}
						var orderbox = $('.orderbox').height() + $('.orderButtonbox').height(),
							orderButton = $('.orderButtonbox').height(),
							bodyh = $(document).height();
						if(orderbox > bodyh){
							$('.ordercontbox').css('margin','0 auto '+orderButton+'px');
							// $('.orderButtonbox').css('position','relative')
						}
					},
					fn_e :function(data){
						
					}
				});
			},
			productPrice:function(Price,Price2){ // 计算价格
				$('.orderPrice b').html(Price);
				$('.saveMoney').html('（已省￥<d>'+Price2.toFixed(2)+'</d>）');
				// 成长值
				if(model.clientType === 'APP'){
					appMain.Module.getValue(userinfo.sid,Price);
				}
			},
			alApiOperator : function(phoneNum){ //运营商 归属地
				appMain.Loader.load({
					stringify : false,
					dataType: "jsonp",
					url : appMain.API.alApiOperator,
					data : {
						tel : phoneNum
					},
					fn : function(data){
						if(data.province){
							var orderbox = $('.orderbox').height() + $('.orderButtonbox').height(),
							orderButton = $('.orderButtonbox').height(),
							bodyh = $(document).height();
							// console.log(orderbox);
							// console.log(bodyh);
							if(orderbox > bodyh){
								$('.ordercontbox').css('margin','0 auto '+orderButton+'px');
								// $('.orderButtonbox').css('position','relative')
							}
							$('.alapioperator').html(data.province+' '+data.catName).show();
						}else{
							$('.alapioperator').html('无法识别运营商和归属地').show();
						}
					},
					fn_e :function(){
						
					}
				});
			},
			getValue:function (sku,Price) { // 查询商品成长值金币值
				appMain.Loader.load({
					stringify : false,
					url : appMain.API.getValue,
					data : {
						authToken : userinfo.authToken,
						sku : sku,//userinfo.sku,
						price : Price//userinfo.Price
					},
					fn : function(data){
						// data.code = '0000';
						if(data.code == "0000"){
							$('.growthValuebox').show();
							if(data.data.growthValue != '0'){
								$('.growthValue').html('+'+data.data.growthValue);
								$('.growthbox').show();
							}
							// $('.growthValue').html('+'+data.data.growthValue);
							if(data.data.goldValue != '0'){
								$('.orange').html('+'+data.data.goldValue);
								$('.orangebox').show();
								
							}
							if(data.data.growthValue == '0' && data.data.goldValue == '0'){
								$('.growthValuebox').hide();
								
							}

							// $('.orange').html('+'+data.data.goldValue);
							// // $('.growthValue').show();
							// $('.growthValue').html('+'+data.data.growthValue);
							// $('.orange').html('+'+data.data.goldValue);
							// if(data.data.growthValue != "0"){
							// 	$('.growthValbox').show();
							// }else{
							// 	$('.growthValbox').hide();
							// }
							// if(data.data.goldValue != "0"){
							// 	$('.goldValbox').show();
							// }else{
							// 	$('.goldValbox').hide();
							// }
							// if(data.data.growthValue != "0" && data.data.goldValue != "0"){
							// 	$('.slash').show();
							// }else if(data.data.growthValue == "0" || data.data.goldValue == "0"){
							// 	$('.slash').hide();
							// }
							// // $('.goldVal').html(data.data.goldValue);
							// $('.leaguerVal').show();
						}else{
							$('.leaguerVal').hide();
						}
						// $('.index_mask').addClass('active');
						// $('.indexhead_rulepopup').css('bottom','0')
						// $('.indexpopup_cont').css('margin-top',-$('.indexpopup_cont').height());
						// submitInfo = true;
						// submitRenewInfo = true;
					},
					fn_e :function(data){
						appMain.Module.error_message(1,"网络连接不上哦，请重试！"); 
						// submitInfo = true;
						// submitRenewInfo = true;
					}
				});
			},
			getValidCouponNew:function(sellingPrice,skuId,productId,supplierGoodsId){  // 下单前获取可用的优惠券
				var data = {
					clientId : userinfo.clientVersionId,
					userId: userinfo.userId,
					orderFee : sellingPrice,
					productList : [{
						skuId : skuId, 
						productId : productId, 
						productTypeId : supplierGoodsId, 
						isPromotion : "0", 
						capacity : "1", 
						price : sellingPrice, 
						skuFee : sellingPrice
					}]
				};
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.getValidCouponNew+'?authToken='+userinfo.authToken,
					data : data,
					fn : function(data){

						$('.coupon_box').show();
						if(data.result == "SUCCESS"){
							if(data.recordCount != 0){
								var coupondatas = data.datas;
									couponList1 = [],
									couponList2 = [];
									var coupontpls1 = '<li class="" couponname="{0}" data-type="indexpopup_cont" couponstate="{3}" code="{4}" no="{5}" cosval="{8}" mode="{6}" datahtml="{9}">\
										<div class="coupon_contbox">\
											<b class="coupontop"></b>\
											<b class="couponbottom"></b>\
											<div class="coupon_title">\
												<div class="titlecont">\
													<p class="denomination"><b>{1}</b></p>\
													<p class="condition">满{7}元可用</p>\
												</div></div>\
											<div class="innerbar_box">\
												<div class="innerbarcont">\
													<h3 class="coupontype">{0}</h3>\
													<p class="validity">有效期：{2}</p>\
												</div>\
											</div>\
											<b class="optionb"><i></i></b>\
										</div>\
									</li>'

									var coupontpls2 = '<li couponname="{0}" data-type="indexpopup_cont" couponstate="{3}" code="{4}" no="{5}" cosval="{8}" mode="{6}" datahtml="{9}">\
										<div class="coupon_contbox">\
											<b class="coupontop"></b>\
											<b class="couponbottom"></b>\
											<div class="coupon_title">\
												<div class="titlecont">\
													<p class="denomination"><b>9999</b></p>\
													<p class="condition">满10000元可用</p>\
												</div></div>\
											<div class="innerbar_box">\
												<div class="innerbarcont">\
													<h3 class="coupontype">{0}</h3>\
													<p class="validity">有效期：{2}</p>\
												</div>\
											</div>\
											<b class="optionb"><i></i></b>\
										</div>\
									</li>'
								aQuantity = 0,
								uQuantity = 0,
								choice = "",
								typecode = "";
								for(var ff = 0; ff < coupondatas.length; ff++) {
									if(coupondatas[ff].isUsable == "1"){
										aQuantity ++
										switch (coupondatas[ff].couponMode){
											case "Cash":
												var payFormat1 = coupontpls1.format(coupondatas[ff].couponName,'￥'+coupondatas[ff].amountMin,coupondatas[ff].expiryDate,coupondatas[ff].isUsable,coupondatas[ff].couponCode,coupondatas[ff].couponNo,coupondatas[ff].couponMode,coupondatas[ff].limitMin,coupondatas[ff].amountMin,'￥'+coupondatas[ff].amountMin);
												couponList1.push(payFormat1);
											break;
											case "Discount":
												var payFormat1 = coupontpls1.format(coupondatas[ff].couponName,Math.ceil(coupondatas[ff].amountMin)+'折',coupondatas[ff].expiryDate,coupondatas[ff].isUsable,coupondatas[ff].couponCode,coupondatas[ff].couponNo,coupondatas[ff].couponMode,coupondatas[ff].limitMin,coupondatas[ff].discountFee,Math.ceil(coupondatas[ff].amountMin)+'折');
												couponList1.push(payFormat1);
											break;
											case "Random":
												var payFormat1 = coupontpls1.format(coupondatas[ff].couponName,'￥'+coupondatas[ff].amountMin+'~'+coupondatas[ff].amountMax,coupondatas[ff].expiryDate,coupondatas[ff].isUsable,coupondatas[ff].couponCode,coupondatas[ff].couponNo,coupondatas[ff].couponMode,coupondatas[ff].limitMin,'￥'+coupondatas[ff].amountMin+'~'+coupondatas[ff].amountMax,'￥'+coupondatas[ff].amountMin+'~'+coupondatas[ff].amountMax);
												couponList1.push(payFormat1);
											break;
										}
									}else{
										uQuantity ++
										switch (coupondatas[ff].couponMode){
											case "Cash":
												var payFormat2 = coupontpls2.format(coupondatas[ff].couponName,'￥'+coupondatas[ff].amountMin,coupondatas[ff].expiryDate,coupondatas[ff].isUsable,coupondatas[ff].couponCode,coupondatas[ff].couponNo,coupondatas[ff].couponMode,coupondatas[ff].limitMin,coupondatas[ff].amountMin,'￥'+coupondatas[ff].amountMin);
												couponList2.push(payFormat2);
											break;
											case "Discount":
												var payFormat2 = coupontpls2.format(coupondatas[ff].couponName,coupondatas[ff].discountFee*10+'折',coupondatas[ff].expiryDate,coupondatas[ff].isUsable,coupondatas[ff].couponCode,coupondatas[ff].couponNo,coupondatas[ff].couponMode,coupondatas[ff].limitMin,coupondatas[ff].discountFee,coupondatas[ff].amountMin+'折');
												couponList2.push(payFormat2);
											break;
											case "Random":
											var payFormat2 = coupontpls2.format(coupondatas[ff].couponName,'￥'+coupondatas[ff].amountMin+'~'+coupondatas[ff].amountMax,coupondatas[ff].expiryDate,coupondatas[ff].isUsable,coupondatas[ff].couponCode,coupondatas[ff].couponNo,coupondatas[ff].couponMode,coupondatas[ff].limitMin,'￥'+coupondatas[ff].amountMin+'~'+coupondatas[ff].amountMax,'￥'+coupondatas[ff].amountMin+'~'+coupondatas[ff].amountMax);
											couponList2.push(payFormat2);
											break;
										}
									}
								}
								$('.couponChoice span').html('有'+aQuantity+'张可用');
								// $('.availablecps h1 span').html('有'+aQuantity+'张可用');
								// $('.availablebox').attr('numdata',aQuantity);
								// $('.availabletitle h3 b').html('（'+aQuantity+'）');
								// $('.unavailabletitle h3 b').html('（'+uQuantity+'）');
								// $('.unavailablebox').attr('numdata',uQuantity);
								$('.couponType .effective ul').html(couponList1);
								$('.couponType .invalid ul').html(couponList2);
								if(aQuantity == 0){
									$('.availablecps h1 span').html('无可用');
								}
								$('.couponcontbox .couponType').show().siblings().hide();
							}else{
								$('.couponcontbox .noCouponsbox').show().siblings().hide();
								// $('.paymentpopup_box .couponlistBox').html('<div class="nocouponsBox"><img src="./img/nocoupons.png"><p>很遗憾，您暂无可以使用的优惠券</p></div>');
								// $('.availablecps h1 span').html('无可用');
								// $('.availablecps h1 span').hide();
							}
						}else{
							if(data.errorCode == "21"){
								appMain.Module.error_message(1,"登录失效，请重新登录");
								// window.localStorage.removeItem('userinfoData');
								setTimeout(function() {
									window.location.href = 'share.html?isshare=1&skuid='+userinfo.sid;
								},1000);
							}
							$('.paymentpopup_box .couponlistBox').html('<div class="nocouponsBox"><img src="./img/nocoupons.png"><p>很遗憾，您暂无可以使用的优惠券</p></div>');
							$('.availablecps h1 span').html('无可用');
							$('.availablecps h1 span').hide();
						}
					},
					fn_e :function(data){
						appMain.Module.error_message(1,"网络连接不上哦，请重试！");
					}
				});
			},
			checkCouponExampleNew:function(couponNo){ // 外放查询优惠券兑换码
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.checkCouponExampleNew,
					data : {
						couponNo : couponNo,
						userId: userinfo.userId,
						clientId : userinfo.clientVersionId,
						orderFee : userinfo.sellingPrice,
						productList : [{
							skuId :userinfo.skuId, 
							productId:userinfo.productId, 
							productTypeId:userinfo.supplierGoodsId, 
							isPromotion:"0", 
							capacity:"1", 
							price:userinfo.sellingPrice, 
							skuFee:"1"
						}]
					},
					fn : function(data){
						if(data.result =="SUCCESS"){
							var datas = data.datas;
							$('.usecodebutton button').attr({
								no : couponNo,
								mode : datas.couponMode,
								cosval :datas.amountMin,
								disabled : false
							});
						}else{
							$('.couponcodehints').html(data.resultDesc).show();
						}
					},
					fn_e :function(data){
						appMain.Module.error_message(1,"网络连接不上哦，请重试！");
					}
				});
			},
			placeorder : function (options) { // 下单接口
				try {
					_czc.push(["_trackEvent","下单按钮","砍价下单"]);
				}catch(e) {
				}
				var payMethodCode = $('.paymentList li.choice').attr('pay_codeid');
				userinfo.cardNo = $('.addressinput input').val();
				var filterPayList = appMain.Module.filterPayList(PayMethodList);
				var type = appMain.Module.selectPayType();
				console.log(type)
				var paymentMethodId = '',
					paymentMethodName = '',
					paymentSubMethodId = '',
					paymentSubMethodName = '',
					channelAccount = '',
					appId = userinfo.appId;
				console.log(filterPayList);
				for(var pl = 0; pl < filterPayList.length; pl++) {
					// console.log(filterPayList[pl].paymentMethodId);
					if(filterPayList[pl].paymentMethodId == payMethodCode){
						paymentMethodId = filterPayList[pl].paymentMethodId;
						paymentMethodName = filterPayList[pl].paymentMethodName;
						paymentSubMethodId = filterPayList[pl].paymentSubMethodId;
						paymentSubMethodName = filterPayList[pl].paymentSubMethodName;
					}
				}
				var ext ={phoneNum: userinfo.cardNo};
				console.log(entityTypeCode);
				var typeCode = entityTypeCode;
				if(businessType == '4'){
					typeCode = businessType;
				}
				console.log(typeCode);
				switch (typeCode){
				case "TRAFFIC":case "PF_DIRECT":case "PF_SLOW":case "FLOW_SERVICE": // 话费流量充值类
					ext ={phoneNum: userinfo.cardNo};
				break;
				case "GDJH_LPK":case "YSHY":case "TENCENT_RECHARGE":case "GAME_RECHARGE":case "GIFT_RECHARGE":case "ZBCZ":case "FUEL_CARD":case "MUSIC_MEMBERS":case "READING_MEMBERS":case "SOCIAL_MEMBERS":case "LIVE_PLATFORM":case "MIFI_FLOW":case "MIFI_XF":case "MIFI_CARD":case "QQTV":case "FUEL_CARD_CHARGE":case "YOUKU":case "AIQIYI":case "MGTV":case "QQTV":case "SOHU":case "LETV":case "PPTV":case "FUEL_CARD_KEY":case "LETV":case "LETV":case "LETV":
					ext ={account: userinfo.cardNo};	
				break;
				case "4":
					var name =  $('.addressMaterial').attr('name'),
						phone =  $('.addressMaterial').attr('phone'),
						regionName =  $('.addressMaterial').attr('regionName'),
						address =  $('.addressMaterial').attr('address');
					ext ={CONTACT_ADDRESS:address,CONTACT_DISTRICT:regionName,CONTACT_PHONE:phone,CONTACT_USER:name}
				break;
				}
				var coupons = [];
				if(userinfo.couponNo != ""){
					coupons = [{
						couponNo: userinfo.couponNo,
						couponType: userinfo.couponMode
					}]
				}
				// console.log(window.location.origin+appMain.config.stateSuccess);
				// console.log(window.location.origin+appMain.config.stateFail);
				var loginUserId = userinfo.userId,
					authToken = userinfo.authToken;
					// appId = appId;
				if(model.clientType === 'XCX'){
					loginUserId = appMain.config.loginUserId;
					authToken = '';
					appId = appMain.config.xcxappId;
					paymentSubMethodId = 'WXPAY_MINI';
				}
				var data = {
					client:{
						clientVersionId : userinfo.clientVersionId,//"267",
						clientVersionNo : userinfo.clientVersionNo,//"50",
						clientType:"",
						deviceId:"",
						deviceCode:"",
						deviceBrand:"",
						deviceType:"",
						position:"",
						positionName:"",
						srcType:"",
						srcObjectId:""
					},
					order:{
						orderItems:[{
							skuId : userinfo.sid,
							channelSkuId : '',//userinfo.channelSkuId,
							num : 1,
							ext : ext
						}],
						payMethodCode : paymentMethodId,
						payReturnUrl : window.location.origin + appMain.config.stateSuccess, 
						unpayReturnUrl :window.location.origin + appMain.config.stateFail,
						loginUserId : loginUserId, // userinfo.userId,//"327920",
						loginStaffId : "",
						channelOrderNo : "",
						channelId : userinfo.channelId,
						payMethodSubCode : paymentSubMethodId,
						channelAccount : channelAccount || '',
						appId : appId || ''
					},
					coupons : null,
					otherProperties : JSON.stringify({ // 新增字段写在这
						schemeNo:  model.plancode, // 方案编号
						authId : ''+userinfo.userId+'', // 认证ID 建行活动加密串
						authType : userinfo.authType, // 用户认证类型,默认FZS
						openId : userinfo.openId
					})
				}
				var sign = $.sha1(userinfo.appSecret+"appKey"+userinfo.appKey+"bizContent"+JSON.stringify(data)+"timestamp"+appMain.Module.timeString("",true,true)+userinfo.appSecret).toString().toUpperCase();
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.placeorder+"?authToken="+authToken+"&sign="+sign+"&appKey="+userinfo.appKey+"&timestamp="+appMain.Module.timeString("",true,true),
					data : data,
					fn : function(data){

						if(data.success == true){
							isLogin = true;
							$('.verificationCodebox strong').addClass('disabled');
							$('.verificationCodebox input').attr('disabled',true);
							// 由于后台可能没有配置上有商品，如果没有可以拿 userinfo.cardNo 卡号;
							userinfo.orderId = data.datas.orderId;
							userinfo.orderNo = data.datas.orderId;
							userinfo.orderTarget = data.datas.orderTarget;
							var orderTarget  = data.datas.orderTarget?data.datas.orderTarget:userinfo.cardNo;
							window.localStorage.setItem('statedata','');
							var statedata = {
								orderNo : data.datas.orderNo,
								productName : userinfoData.dataSkuList.skuName,
								orderTarget : orderTarget.replace(/[^A-Za-z0-9]/g,'').replace(/....(?!$)/g,'$& '),
								orderCreateTime : appMain.Module.timeString(data.datas.orderCreateTime,false,false,false,true),
								payMethodName : data.datas.payMethodName,
								payAmount : data.datas.payAmount,
								saleAmount : data.datas.saleAmount,
								couponAmount: data.datas.couponAmount,
								orderId : data.datas.orderId,
								skuId : data.datas.orderItems[0].skuId,
								skuCode : userinfo.skuCode,
								activityId : userinfo.activityId,
								placeorder : options,
								authToken : authToken,
								clientId : userinfo.clientVersionId,
								userId : userinfo.userId,
								isChannel : true
							};
							window.localStorage.setItem('statedata',JSON.stringify(statedata));
							var dataPay = {};
							var payStr = data.datas.payStr;
							clearInterval(userinfo.repeateTask);
							clearInterval(userinfo.timeTask);
							// if(data.datas.payAmount == '0'){

							// }
							// type = "2222"
							if(payStr != 'useless'){
								if(type == '_SDK'){
									if(data.datas.payMethodCode == "WXPAY"){
										dataPay = JSON.parse($.base64().decode(payStr));
										dataPay.PAY_METHOD_CODE = data.datas.payMethodCode;
									}else{
										dataPay.PAY_QR_CODE = data.datas.payStr; 
										dataPay.PAY_METHOD_CODE = data.datas.payMethodCode;
									}
									appService.paySdk(dataPay,function(data){
										var stateResult = ""
										if(data.result == "SUCCESS"){
											stateResult = "#/success";
										}else{
											stateResult = "#/error";
										}
										window.location.href = 'state.html'+stateResult+'';
									});
								}else{
									if(userinfo.clientVersionId == "325"){ // 快应用 支付
										var _payStr = '';
										if(data.datas.payMethodCode == "WXPAY"){
											appMain.Module.open_popup('wxpay_box');
											appMain.Module.repeateTask();
											appMain.Module.timeTask();
											var prepayidArr = data.datas.payStr.split('?')[1].split('&');
											var prepayid;
											prepayidArr.forEach(function(item){
												if (item.indexOf('prepay') > -1) {
													prepayid = item.split('=')[1]
												}
											});
											if (data.datas.payStr.indexOf('weixin') > -1) {
												_payStr = '/Result?paystr=' + encodeURIComponent(data.datas.payStr) + '&method=WXPAY&prepayid=' + prepayid
											} else {
												_payStr = '/Result?paystr=' + encodeURIComponent(data.datas.payStr) + '&method=RHPAY&prepayid=' + prepayid
											}
											// _payStr = '/Result?paystr=' + encodeURIComponent(data.datas.payStr) + '&method=RHPAY&prepayid=' + prepayid;
											$('.paybtnPrimary').attr('payurl',_payStr);
										}else{ // 快应用 支付宝sdk
											var href = window.location.origin + appMain.config.kyystate;
											_payStr = '/Result?paystr=' + encodeURIComponent($.base64().decode(payStr)) + '&method=' +data.datas.payMethodCode + '&resultURL=' + encodeURIComponent(href);
										}
										setTimeout(function() {
											system.go(_payStr);
										},1000);
									}else{
										if(model.clientType === 'XCX'){ // 小程序支付
											data.datas.wxType = 'pay';
											data.datas.success = window.location.origin + appMain.config.stateSuccess;
											data.datas.fail = window.location.origin + appMain.config.stateFail;
											var wxPayDatas = JSON.stringify(data.datas);
											wx.miniProgram.postMessage({ 'data': String(wxPayDatas)});
											wx.miniProgram.navigateBack({ 'delta': 1 });
										}else{
											appMain.Module.open_popup('wxpay_box');
											if(data.datas.payMethodCode == "WXPAY"){
												appMain.Module.repeateTask();
												appMain.Module.timeTask();
											}
											$('.paybtnPrimary').attr('payurl',data.datas.payStr);
											window.location.href = data.datas.payStr;
										}
									}
								}
							}else{
								window.location.href = 'state.html#/success';
							}
						}else{
							if(data.errorCode == '506'){
								appMain.Module.error_message(1,'暂不支持此号码充值');
							}else{
								appMain.Module.error_message(1,'提交订单失败，请稍后重试');
							}
						}
					},
					fn_e :function(data,txt,jqXHR){
						appMain.Module.error_message(1,"网络连接不上哦，请重试！");
					}
				});
			},
			userorderdetail:function (options) { // 订单列表详情查询
				console.log(options);
				var loginUserId = userinfo.userId;
				if(model.clientType === 'XCX'){
					// loginUserId = '553884';
				}
				var data = {
					clientVersionId : userinfo.clientVersionId,//"267",
					clientVersionNo : userinfo.clientVersionNo,//"50",
					orderTarget : userinfo.orderTarget,
					loginUserId: loginUserId,
					loginStaffId: userinfo.orderId,
					orderId: userinfo.orderId,
				}
				var sign = $.sha1(userinfo.appSecret+"appKey"+userinfo.appKey+"bizContent"+JSON.stringify(data)+"timestamp"+appMain.Module.timeString("",true,true)+userinfo.appSecret).toString().toUpperCase();
				appMain.Loader.load({
					method : "POST",
					stringify : true,
					url : appMain.API.userorderdetail + "?authToken="+userinfo.authToken+"&sign="+sign+"&appKey="+userinfo.appKey+"&timestamp="+appMain.Module.timeString("",true,true),
					data : data,
					fn : function(data){
						var data = options ? options : data
						var stateResult = ""
						if(data.success == true){
							if(data.datas.statusCode == 'CLOSE'){
								stateResult = '#/error';
								window.location.href = 'state.html'+stateResult+'';
							}else if(data.datas.statusCode != 'TO_BE_PAY'){
								appMain.Module.close_popup();
								clearInterval(userinfo.repeateTask);
								clearInterval(userinfo.timeTask);
								stateResult = '#/success';
								window.location.href = 'state.html'+stateResult+'';
							}
						}else{
							console.log('查询订单数据异常')
						}
					},
					fn_e :function(data,txt,jqXHR){
						clearInterval(userinfo.repeateTask);
						clearInterval(userinfo.timeTask);
					}
				});
			},
			repeateTask : function(){ // 轮循订单接口
				var data;
					// setTimeout(function() {  模拟订单状态
					// 	data = {
					// 		"success" : true,
					// 		"errorCode" : null,
					// 		"errorMessage" : null,
					// 		"datas" : {
					// 		"orderId" : "b0598152e74748a4a892a3e4cac0b7aa",
					// 		"orderNo" : "20180710104348866886",
					// 		"orderCreateTime" : 1531190628000,
					// 		"orderTarget" : "13433986233",
					// 		"payApplyId" : "9A7D86FEC2EB363EC9798FED03B7EA1F",
					// 		"payMethodCode" : "WXPAY",
					// 		"payMethodName" : "微信",
					// 		"payStr" : "weixin://wap/pay?appid%3Dwxfb51d68edffc90e2%26noncestr%3D248t2yyr%26package%3DWAP%26prepayid%3Dwx10104348969238a3d34de0784095689138%26sign%3D607A0DDA2CADB3AC1DF89A0A2BEA8E29%26timestamp%3D1531190627",
					// 		"saleAmount" : 1.0,
					// 		"couponAmount" : 0.0,
					// 		"payAmount" : 1.0,
					// 		"amountUnit" : "人民币",
					// 		"statusCode" : "ok",
					// 		"statusName" : "待支付",
					// 		"orderItems" : [ {
					// 			"productId" : "76D159C9AE702CDCA8ED64224AF29D9F",
					// 			"productName" : "移动全国",
					// 			"skuId" : "71B4BF5BB3C5A2E88FC4D240B206475B",
					// 			"channelSkuId" : null,
					// 			"skuName" : "30M",
					// 			"num" : 1
					// 		} ],
					// 		"ext" : {
					// 			"flowValue" : "30",
					// 			"effectStartTime" : "1",
					// 			"range" : "2",
					// 			"phoneNum" : "13433986233",
					// 			"effectTime" : "1"
					// 		},
					// 		"expCompCode" : null,
					// 		"expCompName" : null,
					// 		"expNo" : null
					// 		}
					// 	}
					// },6000);
				userinfo.repeateTask = setInterval(function(){
					appMain.Module.userorderdetail(data);
				},3000)
			},
			timeTask : function(){
				userinfo.timeTask = setTimeout(function() {
					clearInterval(userinfo.repeateTask);
					clearInterval(userinfo.timeTask);
				},120000);
			},
			cityAddress: function(){ // 城市地址
				var selectArea4;
				$.get('./img/data.json', function (result) {
					try{
						selectArea4 = JSON.parse(result);
					}catch (e){
						selectArea4 = result;
					}
					var UplinkData = selectArea4.data
					var mobileSelect5 = new MobileSelect({
						trigger: '#trigger2',
						title: '所在城市',
						wheels: [
							{data : UplinkData}
						],
						position: [1,22,1],
						transitionEnd:function(indexArr, data){
							//console.log(data);
						},
						callback:function(indexArr, data){
							console.log(data);
							var addnum = '';
							for (var p = 0; p < data.length; p++) {
								addnum+=data[p].value
							}
							// if(isphone && $('.userName').val().length >= 2 && $('.years').val()!=""){
							// 	$('.bubmission').attr('disabled',false);
							// }else{
							// 	$('.bubmission').attr('disabled',true);
							// }
							console.log(addnum)
							$('#trigger2').val(addnum);
						}
					});	
				});
			},
			countdowntime : function(){ // 定时器
				var time=60;
				var validCode=true;
					if (validCode) {
						validCode=false;
						userinfo.backwardtime = setInterval(function(){
						time--;
						$('.qrcodtime').html(time); 
						if (time==0) {
							// $('.craphicalInput').attr('disabled',false);
							// $('.graphical_box img').removeClass('disabled');
							$('.verificationbox strong').html('获取验证码').removeClass('disabled');
							clearInterval(userinfo.backwardtime);
							validCode=true;
						}
					},1000)
				}
			},
			isInWeChat : function() { // 判断微信环境
				return /micromessenger/.test(navigator.userAgent.toLowerCase());
			},
			isInApp : function() { // 判断App环境
				var res = (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.iOSFYDH) || window.JsManager || window.FlowPayManager;
				return res;
			},
			selectPayType : function() { // 下单类型
				var type = '';
				var isApp = appMain.Module.isInApp();
				var isWeChat = appMain.Module.isInWeChat();
				if (isApp) { // SDK支付
					type = '_SDK';
				} else {
					type = isWeChat ? '_PUBLIC' : '_H5';
				}
				return type;
			},
			filterPayList : function(paysList) { // paysList: 未处理的支付列表
				console.log(paysList)
				var type = appMain.Module.selectPayType(); // 当前的支付类型
				var payArr = [];
				for(var i = 0; i < paysList.length; i++) {
					var key = paysList[i];
					var aim = {};
					for (var j = 0; j < key.paySubMethodList.length; j++) { // 遍历支付子类（细化支付方式）
						if ((key.paySubMethodList[j].paymentSubMethodId).indexOf(type) > -1) {
							aim = key.paySubMethodList[j];
						}
					}
					if (aim['paymentSubMethodId']) { // obj 存在参数才压入数组
						aim.paymentMethodId = key.paymentMethodId;
						aim.paymentMethodName = key.paymentMethodName;
						payArr.push(aim);
					}
				}
				return payArr;
			},
			statePage : function(){ // 状态页面
				var state = JSON.parse(window.localStorage.getItem("statedata"));
				console.log(state);
				userinfo.userId = state.userId;
				try {
					var statehash = window.location.hash;
					var stateinfo = '';
					if(statehash.indexOf('#/success') > -1){
						stateinfo = 'success';
						$('.statetop h2').html('支付成功');
					}else{
						stateinfo = 'fail';
						$('.statetop h2').html('支付失败');
					}
					$('.stateimgbox img').attr('src','./img/'+stateinfo+'.png');
					$('.statetop h2').addClass(stateinfo);
					$('.stateProduct').html(state.productName);
					$('.statePrice b').html(state.payAmount);
				} catch(e) {
					// indexCardNo = "";
					// indexIccId = "";
				}
				appMain.Module.pageloading(false,'statebox');
			},
			openAdsapi : function (options) {// 图片广告
				if(isshare == '1'){
					if(model.clientType == 'APP'){
						isAndroid() && (userinfo.adPos = model.az_adpos);
						isIOS() && (userinfo.adPos = model.ios_adpos);
					}else{
						userinfo.adPos = model.az_adpos
					}
					// if(userinfo.clientVersionId == '2'){
					// 	userinfo.adPos = model.az_adpos;
					// }else if(userinfo.clientVersionId == '36'){
					// 	userinfo.adPos = model.ios_adpos;
					// }
				}else{
					userinfo.adPos = model.other_adpos;
				}
				
				appMain.Loader.load({
					url : appMain.API.openAdsapi,
					data : {
						pos : userinfo.adPos,
						w : model.adw,
						h : model.adh,
						client : userinfo.clientVersionId,
						channel : "0",
						model : "1"
					},
					fn : function(data){
						try {
							if(data.success == true){
								var datas = data.valueObject.items;
								if(datas.length != 0){
									var	conList = [],
									// <div class="swiper-slide"><a data-href="{0}"><img src="{1}" alt=""></a></div>
										contpls = '<div class="sharebottom1">\
											<a data-href="{0}">\
												<img src="{1}" alt="">\
											</a>\
										</div>',
										detailUrl ="";
									for(var p = 0; p < datas.length; p++) {
										if(datas[p].detailUrl == "http://"){
											detailUrl = "remove"
										}else{
											detailUrl =datas[p].detailUrl;
										}
										var contFormat = contpls.format(detailUrl,datas[p].content);
										conList.push(contFormat);	
									}
									$('.sharebottompos').html(conList);
									// //banner广告图轮播
									// 	var swiper = new Swiper('.swiper-container', {
									// 		autoplay: 5000,//可选选项，自动滑动
									// 	pagination: '.swiper-pagination',
									// 	paginationClickable: true,
									// 	autoHeight: true, //enable auto height
									// });
									if(datas.length == 0){
										$('.banner_box').hide();
									}
									if(datas.length == 1){
										$('.swiper-pagination-clickable').hide();
									}
									var autoplay = true
									if(datas.length == 1){
										autoplay = false
									}
								}else{
									$(".advert_box").hide();
								}
							}
						} catch(e) {
							appMain.Module.error_message(1,"文字广告接口异常"); 
						}	
					},
					fn_e :function(data){
						
					}
				});
			},
			stateOpenAdsapi : function (options) { // 状态页广告图片
				var pos = 'FZSAZZFCG_GG';
				if(model.clientType == 'APP'){
					if(isAndroid()){
						if(window.location.hash == '#/success'){
							pos = model.az_orderadpos;
						}else{
							pos = model.az_errAdcode
						}
					}else if(isIOS()){
						if(window.location.hash == '#/error'){
							pos = model.ios_orderadpos;
						}else{
							pos = model.ios_errAdcode
						}
					}
				}else{
					if(window.location.hash == '#/success'){
						pos = model.az_orderadpos;
					}else{
						pos = model.az_errAdcode
					}
				}
				
				appMain.Loader.load({
					stringify : false,
					url : appMain.API.openAdsapi,
					data : {
						pos : pos,
						w : model.orderadw,
						h : model.orderadh,
						client : userinfo.clientVersionId,
						channel : "0",
						model : "1"
					},
					fn : function(data){
						try {
							if(data.success == true){
								var datas = data.valueObject.items;
								if(datas.length != 0){
									var	conList = [],
									// <div class="swiper-slide"><a data-href="{0}"><img src="{1}" alt=""></a></div>
										contpls = '<div class="statebottom1">\
											<a data-href="{0}">\
												<img src="{1}" alt="">\
											</a>\
										</div>',
										detailUrl ="";
									for(var p = 0; p < datas.length; p++) {
										if(datas[p].detailUrl == "http://"){
											detailUrl = "remove"
										}else{
											detailUrl =datas[p].detailUrl;
										}
										var contFormat = contpls.format(detailUrl,datas[p].content);
										conList.push(contFormat);	
									}
									$('.statebottompos').html(conList);
									// //banner广告图轮播
									// 	var swiper = new Swiper('.swiper-container', {
									// 		autoplay: 5000,//可选选项，自动滑动
									// 	pagination: '.swiper-pagination',
									// 	paginationClickable: true,
									// 	autoHeight: true, //enable auto height
									// });
									if(datas.length == 0){
										$('.banner_box').hide();
									}
									if(datas.length == 1){
										$('.swiper-pagination-clickable').hide();
									}
									var autoplay = true
									if(datas.length == 1){
										autoplay = false
									}
								}else{
									$(".advert_box").hide();
								}
							}
						} catch(e) {
							appMain.Module.error_message("文字广告接口异常"); 
						}
					},
					fn_e :function(data){
						
					}
				});
			},
			error_message: function (errortype, prompt) { // 错误提示  错误类型errortype 1 或 2 ，prompt 提示语
				// console.log(errortype,prompt);
				$('.network_error').addClass("error" + errortype).show()
				$('.network_error p').addClass("shake animated infinite");
				$('.network_error p span').html(prompt);
				setTimeout(function () {
					$('.network_error p').removeClass("shake animated infinite");
				}, 1000);
				setTimeout(function () {
					$('.network_error p').addClass('flipOutX animated infinite');
					setTimeout(function () {
						$('.network_error').hide()
						$('.network_error p').removeClass('flipOutX animated infinite');
						$('.network_error p span').html("");
						$('.network_error').removeClass('error1 error2');
					}, 800);
				}, 4000);
			},
			open_popup: function (options) { // 打开弹出框
				$('.Goodluck_background').show();
				$('.Goodluck_rulesbox').addClass('bounceIn animated infinite')
				$('.' + options + '').show().siblings().hide();
				setTimeout(function () {
					$('.Goodluck_rulesbox').removeClass('bounceIn animated infinite');
					var bodyheight = $(window).height();
					if($('body').hasClass('index')){
						$('html, body, .indexbox').css({
							'height':bodyheight,
							'overflow-y':'hidden'
						});
					}
				}, 290);
			},
			close_popup: function (options) { // 关闭弹出框
				if($('body').hasClass('index')){
					// var bodyheight = $(window).height();
					$('html, body, .indexbox').attr('style','display: block;');
				}
				$('.Goodluck_rulesbox').addClass('bounceOut animated infinite');
				setTimeout(function () {
					clearInterval(userinfo.backwardtime);
					$('.Goodluck_rulesbox').removeClass('bounceOut animated infinite');
					$('.Goodluck_background').hide();
				}, 290);
			},
			couponPopup: function (options,type) {
				try{
					$('.' + type + '').show().siblings().hide();
				}catch (e){
					$('.couponcont').hide();
				}
				if(options){
					setTimeout(function () {
						$('.couponbox').addClass('mobileCoupon-show');
					}, 10);
				}else{
					$('.couponbox').removeClass('mobileCoupon-show');
				}
				
				
			},
			falsehints:function(isshow,prompt){
				if(isshow){
					$('.falsehints').html(prompt+'<br>').show();
					// setTimeout(function () {
					// 	$('.falsehints').hide()
					// }, 30000);
				}else{
					$('.falsehints').hide()
				}
			},
			slideOutFrame : function(isshow,typeBox){ //底部滑出框
				if(isshow){
					$('.'+typeBox+'').css('margin-top','0').show();
					$('.index_mask').addClass('active');
					$('.couponlistBox').animate({scrollTop:0},0);
					setTimeout(function() {
						$('.'+typeBox+'').css('margin-top',-$('.'+typeBox+'').height()).show();
					},100);
				}else{
					$('.'+typeBox+'').css('margin-top','0').show();
					$('.index_mask').removeClass('active');
					setTimeout(function() {
						$('.'+typeBox+'').css('margin-top',+$('.'+typeBox+'').height()).hide();
					},100);
				}
			},
			allclick: function (options) { // 点击事件池
				$("#trigger2").focus(function(){
					document.activeElement.blur();
				});
				// 点击商品跳转好友页面
				$('.commoditylist').on('click','ul li',function () {
					if(!$(this).hasClass('listBottom')){
						var pid = $(this).attr('pid'),
							sid = $(this).attr('sid'),
							commst = $(this).attr('commst'),
							ext;
						if(isshare == '2'){ // 好友页面要加的参数
							ext = {
								cyUserId : userinfo.userId,
								cyAuthType : userinfo.authType,
							}
						}
						appMain.Loader.load({
							method : "POST",
							stringify : true,
							url : appMain.API.querySchemeSkuList,
							data : {
								clientId : userinfo.clientVersionId,
								userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
								authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
								schemeNo : model.plancode,
								ext : JSON.stringify(ext)
							},
							fn : function(data){
								if(data.success == true){
									if(data.datas[0].state == '1'){
										var skuList = data.datas[0].skuList;
										for(var k = 0; k < skuList.length; k++) {
											if(skuList[k].skuId == sid){
												if(JSON.parse(skuList[k].rate) < 1){
													if(commst == '1'){
														appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光");
													}else if(commst == '2'){
														appMain.Module.error_message(1,"很遗憾，砍价机会已经用完了");
													}else if(commst == '3'){
														appMain.Module.error_message(1,"活动已结束，下次请早");
													}else{
														userinfoData ={
															valueObject : {
																exjf : {
																	userId : userinfo.userId
																},
																userInfo : {
																	user : {
																		staffCode : userinfo.mobile
																	}
																},
																authToken : userinfo.authToken
															},
															nickName : userinfo.nickName,
															headPhotoUrl : userinfo.headPhotoUrl,
															wxappId : userinfo.wxappId,
															openId : userinfo.openId,
															encryptedData : userinfo.encryptedData,
															iv : userinfo.iv,
															dataSkuList:{}
														}
														userinfoData.dataSkuList = skuList[k];
														window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData)); // "33"
														// if(getUrlString("uid") != null){
														if(model.clientType === 'XCX'){
															window.location.href = 'share.html?isshare=1&appid='+getUrlString("appid")+'&skuid='+sid;
														}else{
															window.location.href = 'share.html?isshare=1&skuid='+sid;
														}
														// window.location.href = 'share.html?isshare=1&isxcx=1&sid='+sid;
													}
												}else{
													appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光~");
												}
											}
										}
									}else if(data.datas[0].state == '0'){
										appMain.Module.error_message(1,"活动未开始哦，敬请期待~");
									}else if(data.datas[0].state == '7'){
										appMain.Module.error_message(1,"活动已经过期，下次请早~");
									}
								}
							},
							fn_e :function(){
								appMain.Module.error_message(1,"网络连接不上哦，请重试！");
							}
						});
						
					}
				});
				// 当前价格 去下单页面
				$('.burrentPrice button').click(function(){
					var ext;
					if(isshare == '2'){ // 好友页面要加的参数
						ext = {
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
						}
					}
					appMain.Loader.load({
						method : "POST",
						stringify : true,
						url : appMain.API.querySchemeSkuList,
						data : {
							clientId : userinfo.clientVersionId,
							userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
							authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
							schemeNo : model.plancode,
							ext : JSON.stringify(ext)
						},
						fn : function(data){
							if(data.success == true){
								if(data.datas[0].state == '1'){
									var skuList = data.datas[0].skuList;
									for(var k = 0; k < skuList.length; k++) {
										if(skuList[k].skuId == userinfo.sid){
											if(JSON.parse(skuList[k].rate) < 1){
												window.location.href = 'order.html?pid='+userinfo.pid+'&skuid='+userinfo.sid;
											}else{
												appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光~");
											}
											break;
										}
									}
								}else if(data.datas[0].state == '6'){
									appMain.Module.error_message(1,"活动未开始哦，敬请期待~");
								}else if(data.datas[0].state == '7'){
									appMain.Module.error_message(1,"活动已经过期，下次请早~");
								}
							}
						},
						fn_e :function(){
							appMain.Module.error_message(1,"网络连接不上哦，请重试！");
						}
					});

					
				});
				$('.promotelist').on('click','ul li',function () {
					var pid = $(this).attr('pid'),
						sid = $(this).attr('sid'),
						commst = $(this).attr('commst'),
						ext;
					if(isshare == '2'){ // 好友页面要加的参数
						ext = {
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
						}
					}
					appMain.Loader.load({
						method : "POST",
						stringify : true,
						url : appMain.API.querySchemeSkuList,
						data : {
							clientId : userinfo.clientVersionId,
							userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
							// authId : phone,
							authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
							schemeNo : model.plancode,
							ext : JSON.stringify(ext)
						},
						fn : function(data){
							if(data.success == true){
								if(data.datas[0].state == '1'){
									var skuList = data.datas[0].skuList;
									for(var k = 0; k < skuList.length; k++) {
										if(skuList[k].skuId == sid){
											if(JSON.parse(skuList[k].rate) < 1){
												if(commst == '1'){
													appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光");
												}else if(commst == '2'){
													appMain.Module.error_message(1,"很遗憾，砍价机会已经用完了");
												}else if(commst == '3'){
													appMain.Module.error_message(1,"活动已结束，下次请早");
												}else{
													userinfoData ={
														valueObject : {
															exjf : {
																userId : userinfo.userId
															},
															userInfo : {
																user : {
																	staffCode : userinfo.mobile
																}
															},
															authToken : userinfo.authToken
														},
														nickName : userinfo.nickName,
														headPhotoUrl : userinfo.headPhotoUrl,
														wxappId : userinfo.wxappId,
														openId : userinfo.openId,
														encryptedData : userinfo.encryptedData,
														iv : userinfo.iv,
														dataSkuList:{}
													}
													userinfoData.dataSkuList = skuList[k];
													window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData)); // "33"
													// if(getUrlString("uid") != null){
													if(model.clientType === 'XCX'){
														window.location.href = 'share.html?isshare=1&appid='+getUrlString("appid")+'&skuid='+sid;
													}else{
														window.location.href = 'share.html?isshare=1&skuid='+sid;
													}
												}
											}else{
												appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光~");
											}
										}
									}
								}else if(data.datas[0].state == '0'){
									appMain.Module.error_message(1,"活动未开始哦，敬请期待~");
								}else if(data.datas[0].state == '7'){
									appMain.Module.error_message(1,"活动已经过期，下次请早~");
								}
							}
						},
						fn_e :function(){
							appMain.Module.error_message(1,"网络连接不上哦，请重试！");
						}
					});
				});
				// 点击砍价
				$('.sharecommoditybutton button').click(function(){
					var state = $(this).attr('data-state');
					// if(isWX()){
					// 	if(userinfo.authToken !=''){}
					// 	appMain.Module.generateOauthUrl();
					// }else{
					var ext;
					if(isshare == '2'){ // 好友页面要加的参数
						ext = {
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
						}
					}
					
					appMain.Loader.load({
						method : "POST",
						stringify : true,
						url : appMain.API.querySchemeSkuList,
						data : {
							clientId : userinfo.clientVersionId,
							userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
							authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
							schemeNo : model.plancode,
							ext : JSON.stringify(ext)
						},
						fn : function(data){
							if(data.success == true){
								if(data.datas[0].state == '1'){
									var skuList = data.datas[0].skuList;
									for(var k = 0; k < skuList.length; k++) {
										if(skuList[k].skuId == userinfo.sid){
											if(JSON.parse(skuList[k].rate) < 1){
												if(userinfo.authToken != '' && userinfo.authToken != null){
													if(state == 1 || state == 3){
														if(model.clientType === 'XCX'){ // 判断是否小程序
															$.ajax({
																url: appMain.API.shorten+window.location.origin + window.location.pathname+"?isshare=2%26fid="+userinfo.userId+"%26atype="+userinfo.authType+"%26cid="+userinfo.clientVersionId+"%26skuid="+userinfo.sid,
																type: "GET",
																dataType: "jsonp", //指定服务器返回的数据类型
																success: function (data) {
																	console.log(data.data);
																	if(data.data.urls[0].result == true){
																		var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
																		var wxData = {
																			wxShortUrl : data.data.urls[0].url_short,
																			shareUrl : window.location.origin+"/activity/"+model.instanceid+'/share.html?isshare=1&skuid='+userinfo.sid,
																			wxLogoUrl : skuList[k].logoUrl,
																			wxSkuName : payPrice+'元 得'+skuList[k].skuName,
																			wxType : 'share'
																		}
																		wx.miniProgram.postMessage({ 'data': String(JSON.stringify(wxData))});
																		wx.miniProgram.navigateBack({ 'delta': 1 });
																	}else{
																		var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
																		var wxData = {
																			wxShortUrl : window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&skuid="+userinfo.sid,
																			wxLogoUrl : skuList[k].logoUrl,
																			wxSkuName : payPrice+'元 得'+skuList[k].skuName,
																			wxType : 'share'
																		}
																		wx.miniProgram.postMessage({ 'data': String(JSON.stringify(wxData))});
																		wx.miniProgram.navigateBack({ 'delta': 1 });
																	}
																}
															});
														}else{
															var ShareInfoConfig = {
																shareTitle: '快来帮我助力砍价'+userinfo.payprice+'元领'+userinfo.skuName,
																shareText: '这个活动100%真实，你也有机会领取超值礼品哦~',//userinfo.shareText,
																shareLongUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&skuid="+userinfo.sid,
																shareShortUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&skuid="+userinfo.sid,
																shareLogoUrl: userinfo.logoUrl,
															};
															var activityId = "";
															appService.share(ShareInfoConfig,activityId,function(data){
															});
														}
													}else if(state == 2){ // 发起我的砍价
														// window.location.href = 'order.html?pid='+userinfo.pid+'&sid='+userinfo.sid;
														if(isAppService == true){ // app里面砍价
															window.location.href = 'order.html?pid='+userinfo.pid+'&skuid='+userinfo.sid;
														}else{
															// appMain.Module.firstKnifeSt(5);
															// model.clientType == 'XCX'
															if(model.clientType == 'XCX'){ // 小程序里面砍价
																if(isshare == '1'){
																	window.location.href = 'order.html?pid='+userinfo.pid+'&skuid='+userinfo.sid;
																}else{
																	appMain.Module.firstKnifeSt(6); // 下载弹出框
																}
															}else{
																appMain.Module.firstKnifeSt(5);
															}
														}
													}else if(state == 5){ // 发起我的砍价
														// console.log('发起我的砍价');
														if(model.clientType == 'XCX'){
															appMain.Module.firstKnifeSt(6); // 下载弹出框
														}else{
															appMain.Module.firstKnifeSt(5); // 下载弹出框
														}
														// appMain.Module.collectUserAction();
														// window.location.href = 'share.html?isshare=1&sid='+userinfo.sid;
													}else if(state == 6){ // 发起我的砍价
														// console.log('发起我的砍价');
														appMain.Module.firstKnifeSt(2); // 有猫腻
														// appMain.Module.collectUserAction();
														// window.location.href = 'share.html?isshare=1&sid='+userinfo.sid;
													}else{
														if(model.clientType === 'XCX'){ // 判断是否小程序
															appMain.Module.collectUserAction();
														}else{
															// appMain.Module.collectUserAction();
															if(isAppService == true){ // app里面砍价
																appMain.Module.collectUserAction();
															}else{
																// if(isAppService == 'XCX'){ // 小程序里面砍价
																// 	appMain.Module.collectUserAction();
																// }else{
																if(isshare == '2'){
																	appMain.Module.collectUserAction();
																	
																}else{
																	if(model.clientType == 'XCX'){
																		appMain.Module.firstKnifeSt(6); // 下载弹出框
																	}else{
																		appMain.Module.firstKnifeSt(5); // 下载弹出框
																	}
																	// appMain.Module.firstKnifeSt(5);
																}
																// }
															}
														}
														
													}
												}else{
													if(isWX()){
														if(model.clientType === 'XCX'){ 
															appMain.Module.collectUserAction();
														}else{
															appMain.Module.generateOauthUrl();
														}
													}else{
														if(!isAppService){
															if(isshare == '2'){
																if(state == 2 || state == 5 || state == 6){
																	if(model.clientType == 'XCX'){
																		appMain.Module.firstKnifeSt(6); // 下载弹出框
																	}else{
																		appMain.Module.firstKnifeSt(5); // 下载弹出框
																	}
																	// appMain.Module.firstKnifeSt(5);
																}else{
																	appMain.Module.open_popup('logout_box');
																}
															}else{
																if(model.clientType == 'XCX'){
																	appMain.Module.firstKnifeSt(6); // 下载弹出框
																}else{
																	appMain.Module.firstKnifeSt(5); // 下载弹出框
																}
																// appMain.Module.firstKnifeSt(5);
															}
														}else{
															appService.goLogin(function () {
																window.location.reload();//去登录页面
															});
														}
													}
												}
											}else{
												appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光~");
											}
											break;
										}
									}
								}else if(data.datas[0].state == '6'){
									appMain.Module.error_message(1,"活动未开始哦，敬请期待~");
								}else if(data.datas[0].state == '7'){
									appMain.Module.error_message(1,"活动已经过期，下次请早~");
								}
							}
						},
						fn_e :function(){
							appMain.Module.error_message(1,"网络连接不上哦，请重试！");
						}
					});
				});
				// 找神补刀
				$('.firstKnifecontbtn button').click(function(){
					var state = $(this).attr('data-state');
					appMain.Module.close_popup();
					var ext;
					if(isshare == '2'){ // 好友页面要加的参数
						ext = {
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
						}
					}
					try {
						_czc.push(["_trackEvent","找神补刀","砍价按钮"]);
					}catch(e) {
					}
					appMain.Loader.load({
						method : "POST",
						stringify : true,
						url : appMain.API.querySchemeSkuList,
						data : {
							clientId : userinfo.clientVersionId,
							userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
							authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
							schemeNo : model.plancode,
							ext : JSON.stringify(ext)
						},
						fn : function(data){
							if(data.success == true){
								if(data.datas[0].state == '1'){
									var skuList = data.datas[0].skuList;
									for(var k = 0; k < skuList.length; k++) {
										if(skuList[k].skuId == userinfo.sid){
											if(JSON.parse(skuList[k].rate) < 1){


												if(state == "1"){

													if(model.clientType === 'XCX'){ // 判断是否小程序
														// model.miniprogramUrl
														// var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
														// var wxData = {
														// 	wxShortUrl : window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid,
														// 	wxLogoUrl : skuList[k].logoUrl,
														// 	wxSkuName : skuList[k].skuName,
														// 	payPrice : payPrice,
														// 	wxType : 'share'
														// }
														$.ajax({
															url: appMain.API.shorten+window.location.origin + window.location.pathname+"?isshare=2%26fid="+userinfo.userId+"%26atype="+userinfo.authType+"%26cid="+userinfo.clientVersionId+"%26skuid="+userinfo.sid,
															type: "GET",
															dataType: "jsonp", //指定服务器返回的数据类型
															success: function (data) {
																console.log(data.data);
																if(data.data.urls[0].result == true){
																	var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
																	var wxData = {
																		wxShortUrl : data.data.urls[0].url_short,
																		shareUrl : window.location.origin+"/activity/"+model.instanceid+'/share.html?isshare=1&skuid='+userinfo.sid,
																		wxLogoUrl : skuList[k].logoUrl,
																		wxSkuName : payPrice+'元 得'+skuList[k].skuName,
																		// payPrice : '价值'+skuList[k].costPrice+'元哦',
																		wxType : 'share'
																	}
																	wx.miniProgram.postMessage({ 'data': String(JSON.stringify(wxData))});
																	wx.miniProgram.navigateBack({ 'delta': 1 });
																}else{
																	var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
																	var wxData = {
																		wxShortUrl : window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&skuid="+userinfo.sid,
																		wxLogoUrl : skuList[k].logoUrl,
																		wxSkuName : payPrice+'元 得'+skuList[k].skuName,
																		// payPrice : '价值'+skuList[k].costPrice+'元哦',
																		wxType : 'share'
																	}
																	wx.miniProgram.postMessage({ 'data': String(JSON.stringify(wxData))});
																	wx.miniProgram.navigateBack({ 'delta': 1 });
																}
															}
														});

														// var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
														// 	var wxData = {
														// 		wxShortUrl : window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid,
														// 		shareUrl : 'share.html?isshare=1&sid='+userinfo.sid,
														// 		wxLogoUrl : skuList[k].logoUrl,
														// 		wxSkuName : payPrice+'元 得'+skuList[k].skuName,
														// 		// payPrice : '价值'+skuList[k].costPrice+'元哦',
														// 		wxType : 'share'
														// 	}
														// wx.miniProgram.postMessage({ 'data': String(JSON.stringify(wxData))});
														// wx.miniProgram.navigateBack({ 'delta': 1 });
													}else{
														var ShareInfoConfig = {
															shareTitle: '快来帮我助力砍价'+userinfo.payprice+'元领'+userinfo.skuName,
															shareText: '这个活动100%真实，你也有机会领取超值礼品哦~',//userinfo.shareText,
															shareLongUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&skuid="+userinfo.sid,
															shareShortUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&skuid="+userinfo.sid,
															shareLogoUrl: userinfo.logoUrl,
														};
														var activityId = "";
														// console.log(ShareInfoConfig);
														appService.share(ShareInfoConfig,activityId,function(data){
														});

														// console.log(window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid);
														// var ShareInfoConfig = {
														// 	shareTitle: '快来帮我助力砍价'+userinfo.payprice+'元领'+userinfo.skuName,
														// 	shareText: '这个活动100%真实，你也有机会领取超值礼品哦~',//userinfo.shareText,
														// 	shareLongUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid,
														// 	shareShortUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid,
														// 	shareLogoUrl: userinfo.logoUrl,
														// };
														// var activityId = "";
														// // console.log(ShareInfoConfig);
														// appService.share(ShareInfoConfig,activityId,function(data){
														// });
													
													}



													// payprice :'',
													// skuName : ''
													
													// var ShareInfoConfig = {
													// 	shareTitle: '快来帮我助力砍价'+userinfo.payprice+'元领'+userinfo.skuName,
													// 	shareText: '这个活动100%真实，你也有机会领取超值礼品哦~',//userinfo.shareText,
													// 	shareLongUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid,
													// 	shareShortUrl: window.location.origin + window.location.pathname+"?isshare=2&fid="+userinfo.userId+"&atype="+userinfo.authType+"&cid="+userinfo.clientVersionId+"&sid="+userinfo.sid,
													// 	shareLogoUrl: userinfo.logoUrl,
													// };
													// var activityId = "";
													// // console.log(ShareInfoConfig);
													// appService.share(ShareInfoConfig,activityId,function(data){
													// });
												}if(state == "1" || state == "2" || state == "3" || state == "4" || state == "5"){
													// appMain.Module.close_popup();
												}if(state == "6"){
													isWX() && (
														WXTip.show().on('click', function() {
															WXTip.hide();
														})
													);
													openAppClient();
												}else{
												}
												// window.localStorage.setItem('userinfoData',JSON.stringify(userinfoData));
												
											}else{
												appMain.Module.error_message(1,"好可惜，该商品已被无情地抢光~");
											}
											break;
										}
									}
								}else if(data.datas[0].state == '6'){
									appMain.Module.error_message(1,"活动未开始哦，敬请期待~");
								}else if(data.datas[0].state == '7'){
									appMain.Module.error_message(1,"活动已经过期，下次请早~");
								}
							}
						},
						fn_e :function(){
							appMain.Module.error_message(1,"网络连接不上哦，请重试！");
						}
					});
				});
				// 地址管理
				$('.addresscont .addressMaterial').click(function(){
					window.location.href = 'address.html?pid='+userinfo.pid+'&skuid='+userinfo.sid;
				});
				// 发票
				$('.invoiceChoice').click(function(){
					if(!$(this).hasClass('disabled')){
						// window.location.href = 'invoice.html';
						appMain.Module.error_message(1,"暂不可开发票");
					}else{
						appMain.Module.error_message(1,"暂不可开发票");
					}
				});
				// 优惠券
				$('.couponChoice').click(function(){
					appMain.Module.error_message(1,"暂不可使用券");
					// appMain.Module.couponPopup(true,'clipCoupons');
				});
				// 选择优惠券
				$('.couponlist').on('click','.effective ul li',function () {
					var cosval = $(this).attr('cosval'),
						orderPrice = $('.orderPrice b').html();
						saveMoney = $('.saveMoney d').html();
					var price = (parseFloat(orderPrice)*1000000000 - parseFloat(cosval)*1000000000  )/1000000000;
					var bargainTotalPrice = (parseFloat(saveMoney)*1000000000 + parseFloat(cosval)*1000000000  )/1000000000;
					if($(this).hasClass('choice')){
						$(this).removeClass("choice")
					}else{
						$(this).addClass("choice").siblings().removeClass("choice");
					}
					appMain.Module.productPrice(price,bargainTotalPrice)
					appMain.Module.couponPopup(false);					
				});
				// 关闭
				$('.couponClose b').click(function(){
					var couponbtntype = $(this).attr('couponbtntype');
					if(couponbtntype == "false"){
						appMain.Module.couponPopup(false);
						appMain.Module.couponPopup(true,'clipCoupons');
						$('.couponClose b').attr('couponbtntype',true);
					}else{
						appMain.Module.couponPopup(false);
						// appMain.Module.couponPopup(true,'clipCoupons');
					}
				});
				// 优惠码
				$('.couponCodebtn span').click(function(){
					appMain.Module.couponPopup(false);
					appMain.Module.couponPopup(true,'clipCouponCode');
					$('.couponClose b').attr('couponbtntype',false);
				});
				// 支付方式
				$('.paymentList').on('click','li',function () {
					if(!$(this).hasClass('nopay')){
						$(this).addClass("choice").siblings().removeClass("choice");
					}
					
				});
				// 发票类型
				$('.invoiceTypelist').on('click','li',function () {
					$(this).addClass("select").siblings().removeClass("select");
					if($(this).attr('data-type') == "no"){
						$('.invoiceTitlebox,.invoicebutton').hide();
					}else{
						$('.invoiceTitlebox,.invoicebutton').show();
					}	
				});
				// 发票抬头
				$('.invoiceTitlelist').on('click','li',function () {
					$(this).addClass("select").siblings().removeClass("select");
					if($(this).attr('data-type') == "ititle1"){
						$('.personal').show();
						$('.company,.invoicebutton p').hide();
					}else{
						$('.personal').hide();
						$('.company,.invoicebutton p').show();
					}
				});
				// 60秒倒计时
				$('.verificationbox strong').click(function(){
					var phoneNumval = $('.phoneNum').val();
					if(phoneNumval){
						if(!$('.graphicalbox').is(':hidden')){
							if(!$(this).hasClass('disabled')){
								var valiCode = $('.graphicalbox input').val();
								var phoneNumboxVal = $('.phoneNumbox input').val();
								appMain.Module.smsVerify(phoneNumboxVal,valiCode)
							}
						}else{
							if(!$(this).hasClass('disabled')){
								var phoneNumboxVal = $('.phoneNumbox input').val();
								appMain.Module.smsVerify(phoneNumboxVal,'')
							}
						}
					}
				});
				// 监听手机号码输入框
				$('.phoneNum').bind('input propertychange', function () {
					var phonenum = $(this).val();
					$('.verificationbox strong').addClass('disabled');
					$('.graphicalbox').hide();
					$('.graphicalbox input').val('').attr('disabled',true);
					appMain.Module.falsehints(false,"");
					if (phonenum.length == 11) {
					if(/^1[34578]\d{9}$/.test(phonenum)){
						$('.verificationbox strong').removeClass('disabled');
					}else{
						appMain.Module.falsehints(true,"请输入正确的手机号码");
					}
					}
				}); 
				// 监听图形验证码输入框
				$('.graphical').bind('input propertychange', function () {
					var graphical = $(this).val();
					$('.verificationbox strong').html('获取验证码').addClass('disabled');
					appMain.Module.falsehints(false,"");
					if(graphical.length == 4){
						$('.verificationbox strong').removeClass('disabled');
					}else{
						$('.verificationbox input').val('');
						$('.verificationbox input').attr('disabled',true);
					}
				});
				// 监听短信验证码输入框
				$('.verification').bind('input propertychange', function () {
					var verification = $(this).val();
					appMain.Module.falsehints(false,"");
					if(verification.length == 6){
						$('.signinbox button').attr('disabled',false);
					}else{
						$('.signinbox button').attr('disabled',true);
					}
				});
				// 图形验证码刷新
				$('.graphicalbox').on('click','b img',function () {
					$('.verificationbox strong').html('获取验证码').addClass('disabled');
					if(!$(this).hasClass('disabled')){
						$('.graphical ,.verification').val('');
						$('.graphical').attr('disabled',false);
						$('.verification').attr('disabled',true);
						$('.message_box').addClass('disabled');
						clearInterval(userinfo.backwardtime);
						if($('.graphicalbox input').val().length == 4){
							$('.verificationbox strong').html('获取验证码').removeClass('disabled');
						}
						randomWord(true,32,32);
						$('.graphicalbox img').attr('src',appMain.config.imgPath+'/fzsCaptchaApi/captcah/captcah.jpg?key='+userinfo.key);
					}
				});
				// 登录按钮
				$('.signinbox').click(function(){
					try {
						_czc.push(["_trackEvent",'登录按钮','登录答题',"客户端="+userinfo.cnzzType]);
					} catch(e) {
						console.log('统计失败...')
					}
					var signinNum = $('.phoneNumbox input').val(),
						signinGraphical = $('.graphicalbox input').val(),
						signinVerification = $('.verificationbox input').val();
					if($('.graphicalbox').is(':hidden')){
						if(signinNum != "" && signinVerification != ""){
							$('.verificationbox input').attr('disabled',true);
						}
					}else{
						if(signinNum != "" && signinGraphical !="" && signinVerification != ""){
							$('.graphicalbox input').attr('disabled',true);
							$('.verificationbox input').attr('disabled',true);
						}
					}
					appMain.Module.authLoginV2()
				});
				// 关闭登录弹出框
				$('.closePopupBoc img').click(function(){
					appMain.Module.close_popup();
					$('.phoneNumbox input').val('').attr('disabled',false);
					$('.graphicalbox input').val('').attr('disabled',true);
					$('.verificationbox input').val('').attr('disabled',true);
					$('.verificationbox strong').html('获取验证码').addClass('disabled');
					$('.graphicalbox').hide();
					appMain.Module.falsehints(false,"");
					clearInterval(userinfo.backwardtime);
				});
				// 下单按钮
				$('.buttonCont button').click(function(){
					appMain.Module.placeorder();
				});
				// 关闭轮循订单按钮
				$('.paybtnDefault').click(function () {
					clearInterval(userinfo.repeateTask);
					clearInterval(userinfo.timeTask);
					appMain.Module.close_popup();
				});
				// 弹出规则
				$('.dynamicnews').click(function () {
					var ext;
					if(isshare == '2'){ // 好友页面要加的参数
						ext = {
							cyUserId : userinfo.userId,
							cyAuthType : userinfo.authType,
						}
					}
					appMain.Loader.load({
						method : "POST",
						stringify : true,
						url : appMain.API.querySchemeSkuList,
						data : {
							clientId : userinfo.clientVersionId,
							userId : getUrlString("fid")?getUrlString("fid"): userinfo.userId,
							authType : getUrlString("atype")?getUrlString("atype"):userinfo.authType,
							schemeNo : model.plancode,
							ext : JSON.stringify(ext)
						},
						fn : function(data){
							if(data.success == true){
								if(data.datas[0].state == '1'){
									appMain.Module.open_popup('activityRules');
								}else if(data.datas[0].state == '6'){
									appMain.Module.error_message(1,"活动未开始哦，敬请期待~");
								}else if(data.datas[0].state == '7'){
									appMain.Module.error_message(1,"活动已经过期，下次请早~");
								}
							}
						},
						fn_e :function(){
							appMain.Module.error_message(1,"网络连接不上哦，请重试！");
						}
					});
					
				});
				// 首页分享
				$('.sharingsign img').click(function () {
					try {
						_czc.push(["_trackEvent","首页分享按钮","分享活动"]);
					}catch(e) {
					}
					if(model.clientType === 'XCX'){ // 判断是否小程序
						// model.miniprogramUrl
						// var payPrice = (parseFloat(skuList[k].costPrice)*1000000 - parseFloat(skuList[k].highestAmount)*1000000)/1000000;
						var wxData = {
							wxShortUrl : window.location.href,
							wxLogoUrl : model.shareLogo,
							wxSkuName : model.shareTitle,
							payPrice : model.shareText,
							wxType : 'share'
						}
						wx.miniProgram.postMessage({ 'data': String(JSON.stringify(wxData))});
						wx.miniProgram.navigateBack({ 'delta': 1 });
					}else{
						var ShareInfoConfig = {
							shareTitle: model.shareTitle,
							shareText: model.shareText,
							shareLongUrl: model.shareUrl,
							shareShortUrl: model.shareUrl,
							shareLogoUrl: model.shareLogo,
						};
						var activityId = "";
						console.log(ShareInfoConfig);
						appService.share(ShareInfoConfig,activityId,function(data){
						});
					}
					
				});
				// 通讯录
				$('.addressinput b').click(function(){
					appService.contact(function (data) {
						if(!!data){ 
							var inputval = data.phoneNum.replace(/\s/g, ""),
								inputlength = data.phoneNum.length;
							// $('.go_payment').addClass('disabled');
							// $('.saleinput_box input').val('');
							// $('.alapioperator').hide();
							if(inputlength == 11 && !/^1[34578]\d{9}$/.test(inputval)){
								appMain.Module.error_message(1,"请选择正确的手机号码");
							}else if(inputlength == 0){
								// $('.saleinput_box b').removeClass('eliminate').addClass('contact');
							}else{
								if(/^1[34578]\d{9}$/.test(inputval)){
									// appMain.Module.alApiOperator(data.phoneNum);
									$('.addressinput input').val(data.phoneNum);
									$('.buttonCont button').attr('disabled',false);
									if(!$('.addressinput input').hasClass('eliminateVal')){
										appMain.Module.alApiOperator(data.phoneNum);
									}
									// $('.go_payment').removeClass('disabled');
								}else{
									appMain.Module.error_message(1,"请选择正确的手机号码");
								}
							}
						}
						try {
							_czc.push(["_trackEvent",'通讯录','通讯录按钮','调起了通讯录，现在手机号码']);
						} catch(e) {
							// console.log('统计失败...')
						}
					});
				});
				// 监听手机号码
				$('.addressinput input').bind('input propertychange', function () {
					var phonenum = $(this).val();
					$('.alapioperator').hide();
					if($(this).hasClass('contactVal')){
						$('.buttonCont button').attr('disabled',true);
						if (phonenum.length == 11) {
							if(/^1[34578]\d{9}$/.test(phonenum)){
								$('.buttonCont button').attr('disabled',false);
								appMain.Module.alApiOperator(phonenum);
							}else if(!/^1[34578]\d{9}$/.test(phonenum)){
								
								appMain.Module.error_message(1,"请输入正确的手机号码");
							}
						}
					}else if($(this).hasClass('eliminateVal')){
						$('.buttonCont button').attr('disabled',true);
						if (phonenum.length > 5) {
							$('.buttonCont button').attr('disabled',false);
						}
					}
					
				});
				// 详情页 点击广告图片跳转（详情页）
				$('.sharebottompos').on('click','a',function () {
					var datahref = $(this).attr('data-href');
					if(datahref != 'remove'){
						window.location.href = datahref;
					}
				});
				// 状态页 点击广告图片跳转（详情页）
				$('.statebottompos').on('click','a',function () {
					var datahref = $(this).attr('data-href');
					if(datahref != 'remove'){
						window.location.href = datahref;
					}
				});
				// 关闭规则
				$('.rulesBtn button').click(function () {
					appMain.Module.close_popup();
				});
				// 监听优惠券码输入框
				$('.CouponCodeinput input').bind('input propertychange', function () {
					var couponno = $(this).val();
					$('.CouponCodebutton button').attr('disabled',true);
					// $('.couponcodehints').hide().html('');
					if(couponno.length == 8){
						appMain.Module.checkCouponExampleNew(couponno);
						// $('html,body').animate({scrollTop:0},'slow');
					}
				});
				// 立即使用按钮
				$('.CouponCodebutton button').click(function(){
					appMain.Module.couponPopup(false);
					// $().height
					// userinfo.couponNo = $(this).attr('no');
					// userinfo.couponMode = $(this).attr('mode');
					// var typeBox = $(this).attr('data-type');
					// appMain.Module.slideOutFrame(false,typeBox);
					// $('.usecodeinput input').val('');
					// $(this).attr('disabled',true);
					// $('.coupon_list li').removeClass('choice');
					// var cos = Number($('.explain_price del').attr('cos')) - Number($('.explain_price b').attr('priceval'));
					// var cosval = Number($(this).attr('cosval')) + cos,
					// 	priceval = $('.explain_price b').attr('priceval');
					// var savemoney = priceval - cosval;
					// appMain.Module.savemoney(savemoney,cosval);
				});
				// 添加·地址
				$('.addAddress p').click(function(){
					$('.addressdetails').show().siblings('.addresscommoditylist').hide();
					$('.setUpDefault').hide();
					$('.addressbuttonCont button').attr('id','');
					
					$('.addName').val('');
					$('.addPhone').val('');
					$('.addCity').val('');
					$('.addDetails').val('');
					
				});				
				// 用户姓名
				$('.addName').bind('input propertychange', function () {
					var addName = $(this).val();
					var addPhone = $('.addPhone').val(),
						addCity = $('.addCity').val(),
						addDetails = $('.addDetails').val();
						$('.addressbuttonCont button').attr('disabled',true);
					if(addName.length >= 2 && /^1[34578]\d{9}$/.test(addPhone) && addCity !=""&& addDetails.length >= 5){
						$('.addressbuttonCont button').attr('disabled',false);
					}else{

					}
					// $('.verificationbox strong').addClass('disabled');
					// $('.graphicalbox').hide();
					// $('.graphicalbox input').val('').attr('disabled',true);
					// appMain.Module.falsehints(false,"");
					// if (phonenum.length == 11) {
					// if(/^1[34578]\d{9}$/.test(phonenum)){
					// 	$('.verificationbox strong').removeClass('disabled');
					// }else{
					// 	appMain.Module.falsehints(true,"请输入正确的手机号码");
					// }
					// }
				}); 
				// 用户手机号码
				$('.addPhone').bind('input propertychange', function () {
					var addPhone = $(this).val();
					var addName = $('.addName').val(),
						addCity = $('.addCity').val(),
						addDetails = $('.addDetails').val();
					$('.addressbuttonCont button').attr('disabled',true);
					if (addPhone.length == 11) {
						if(/^1[34578]\d{9}$/.test(addPhone) && addName.length >= 2 && addCity !=""&& addDetails.length >= 5){
							$('.addressbuttonCont button').attr('disabled',false);
						}else if(!/^1[34578]\d{9}$/.test(addPhone)){
							appMain.Module.error_message(1,"请输入正确的手机号码");
						}
						// if(/^1[34578]\d{9}$/.test(phonenum)){
						// 	$('.addressbuttonCont').attr('disabled',true);
						// }else{
						// 	appMain.Module.error_message(1,"请输入正确的手机号码");
						// 	// appMain.Module.falsehints(true,"");
						// }
					}
				});
				// 展示更多
				$('.axegangMore span').click(function(){
					if($(this).attr('datamore') == '1'){
						$('.axeganglist ul').css({
							'max-height':'20rem',
							'overflow-x':'hidden',
							'-webkit-appearance':'none!important',
							'outline':'none!important'
						});
						$(this).attr('datamore','2').html('<b>收起<img src="./img/img33.png" alt=""></b>');
					}else{
						$('.axeganglist ul').css({
							'max-height':'12rem',
							'overflow-x': 'hidden',
							'-webkit-appearance': 'none !important',
							' outline': 'none !important'
						});
						$(this).attr('datamore','1').html('<b>展开更多<img src="./img/img7.png" alt=""></b>');
					}
				});
				// 用户地址详情
				$('.addDetails').bind('input propertychange', function () {
					var addDetails = $(this).val();
					var addPhone = $('.addPhone').val(),
						addCity = $('.addCity').val(),
						addName = $('.addName').val();
						$('.addressbuttonCont button').attr('disabled',true);
					if(addDetails.length >= 5 && /^1[34578]\d{9}$/.test(addPhone) && addCity !=""&& addName.length >= 2){
						$('.addressbuttonCont button').attr('disabled',false);
					}else{

					}
				});
				// 保存地址
				$('.addressbuttonCont button').click(function(){
					if($(this).attr('id') == ''){
						appMain.Module.addAddress();
					}else{
						appMain.Module.modify($(this).attr('id'));
					}
				});
				// 修改地址
				$('.addresslist').on('click','ul li b',function () {
					if($(this).hasClass('addedit')){

					}
					var dataAddress = $(this);
						// isdefault = $(this).attr('isdefault');
						// console.log(isdefault);
						// if(isdefault == '1'){
						// 	$('.setUpswitch #wifi').attr('class','switch-on')
						// }else{
						// 	$('.setUpswitch #wifi').attr({
						// 		'class':'switch-off',
						// 		'style':'border-color: rgb(223, 223, 223); box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; background-color: rgb(255, 255, 255);'
						// 	})
						// }
					// console.log();
					$('.addName').val(dataAddress.attr('name'));
					$('.addPhone').val(dataAddress.attr('phone'));
					$('.addCity').val(dataAddress.attr('regionname'));
					$('.addDetails').val(dataAddress.attr('address'));

					$('.addressbuttonCont button').attr('id',dataAddress.attr('id'));
					
					$('.addressdetails').show().siblings('.addresscommoditylist').hide();

				});
				// 开奖
				$('.prizeGivebox').click(function(){
					if(!$(this).hasClass('disabled')){
						var cVoucherNo = $(this).attr('cVoucherNo');
						appMain.Module.openReward(cVoucherNo)
					}
				});
				// 列表默认地址
				$('.addresslist').on('click','ul li .addressMaterials',function () {
					var id = $(this).attr('id')
					var addChoice = $(this).hasClass('addChoice')
					if(!addChoice){
						appMain.Module.setdefault(id);
					}
				});

				if($('body').hasClass('address')){
					appMain.Module.cityAddress();
				}
				// 下发短信验证码按钮 or 60秒倒计时
				$('.countDown').click(function(){
					var phoneNumval = $('.phoneNum').val();
					if(phoneNumval){
						if(!$('.graphicbox').is(':hidden')){
							if(!$(this).hasClass('disabled')){
								var valiCode = $('.graphicbox input').val();
								var phoneNumboxVal = $('.phoneNum').val();
								appMain.Module.smsVerify(phoneNumboxVal,valiCode)
							}
						}else{
							if(!$(this).hasClass('disabled')){
								var phoneNumboxVal = $('.phoneNum').val();
								appMain.Module.smsVerify(phoneNumboxVal,'')
							}
						}
					}
				});
				// 立即购买
				$('.purchasebutton').click(function(){
					if(isLogin){
						appMain.Module.slideOutFrame(true,'indexpopup_cont');
					}else{
						appMain.Module.authLoginV2()
					}
				});
				// 立即支付
				$('.paybuttonbox button').click(function(){
					var payStr = $(this).attr('data-url');
					if(payStr != "undefined"){
						window.location.href = payStr;
					}else{
						appMain.Module.error_message(1,'提交订单失败');
					}
					// appMain.Module.placeorder();
				});
				$('.popuptopbox b').click(function(){
					var typeBox = $(this).attr('data-type');
					appMain.Module.slideOutFrame(false,typeBox);
				});
				// 订单详情页广告跳转
				$('.statebottom').on('click','.swiper-slide a',function () {
					if($(this).attr('data-href') != "remove"){
						window.location.href = $(this).attr('data-href');
					}
				});
				// purchasebutton
				// 监听手机号码输入框
				$('.phoneNum').bind('input propertychange', function () {
					var phonenum = $(this).val();
					$('.countDown').addClass('disabled');
					$('.graphicbox').hide();
					$('.graphicbox input').val('').attr('disabled',true);
					appMain.Module.falsehints(false,"");
					isphone = false;
					$('.bubmission').attr('disabled',true);
					if (phonenum.length == 11) {
						if(/^1[34578]\d{9}$/.test(phonenum)){
							$('.countDown').removeClass('disabled');
							$('.verificationCodebox strong').removeClass('disabled');
						}else{
							isphone = false;
							appMain.Module.error_message(1,"请输入正确的手机号码");
						}
					}
				}); 
				// 图形验证码
				$('.graphicVal').bind('input propertychange', function () {
					var graphical = $(this).val();
					$('.verificationCodebox strong').html('获取验证码').addClass('disabled');
					if(graphical.length == 4){
						$('.verificationCodebox strong').removeClass('disabled');
						// appMain.Module.falsehints(false,"");
					}else{
						$('.verificationCodebox input').val('');
						$('.verificationCodebox input').attr('disabled',true);
					}
				}); 
				// 短信验证码
				$('.verificationCode').bind('input propertychange', function () {
					var verification = $(this).val();
					if(verification.length == 6){
						$('.purchasebutton').attr('disabled',false);
					}else{
						$('.purchasebutton').attr('disabled',true);
					}
				}); 
				// 图形验证码刷新
				$('.graphicbox').on('click','b img',function () {
					$('.verificationbox strong').html('获取验证码').addClass('disabled');
					if(!$(this).hasClass('disabled')){
						$('.graphical ,.verificationCode').val('');
						$('.graphical').attr('disabled',false);
						$('.verificationCode').attr('disabled',true);
						$('.countDown').addClass('disabled');
						clearInterval(userinfo.backwardtime);
						if($('.graphicbox input').val().length == 4){
							$('.verificationbox strong').html('获取验证码').removeClass('disabled');
						}
						randomWord(true,32,32);
						$('.graphicbox img').attr('src',appMain.config.imgPath+'/fzsCaptchaApi/captcah/captcah.jpg?key='+userinfo.key);
					}
				});
				// 支付方式选择
				$('.paymethod').on('click','ul li',function(){
					$(this).addClass("choice").siblings().removeClass("choice");
				});

				$('.bubmission').click(function(){
					appMain.Module.aqysync();
				});
			},
		};
		var appEvent = function () {
			appMain.init();
		};
		$(function () {
			appEvent();
		});
	}, 100);
});
