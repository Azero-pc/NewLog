define(function () {
    function extend() {
        var args = [].slice.call(arguments),
            len = args.length,
            i = 0,
            deep = typeof args[len - 1] === 'boolean' ? args.pop() : false,
            resource,
            key,
            target,
            hasOwnProperty = {}.hasOwnProperty;
        if (len == 1) {
            target = {};
            i = 1;
        } else {
            target = args.shift();
        }
        while ((resource = args[i++])) {
            for (key in resource) {
                if (!hasOwnProperty.call(target, key) || deep) {
                    target[key] = resource[key];
                }
            }
        }
        return target;
    }
    if(/i(phone|pad|os)/ig.test(window.navigator.userAgent)){//苹果
        // 获取用户信息
        var getUserInfo = function (callback,callback2) {
            try{
                window.userCallback=  function(data){
                    callback && callback(data);
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_user_info",
                    "request_callback_method":"userCallback",
                    "request_callback_have_param":true
                });
            }catch(e){
                callback2 && callback2();
                // console.log("getUserInfo")
                // window.userCallback=  function(data){
                //     callback && callback(data);
                // };
            }
        };
        //获取客户端信息
        var appInfo = function(callback){//获取客户端信息
            try{
                window.appCallback=  function(data){
                    callback && callback(data);
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_app_info",
                    "request_callback_method":"appCallback",
                    "request_callback_have_param":true
                });
            }catch(e){
                // console.log("appInfo")
            }
        };
        //跳到登录页
        var goLogin = function (callback) {
            try{
                window.loginCallback=  function(){
                    callback && callback();
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_jump_login",
                    "request_callback_method":"loginCallback",
                    "request_callback_have_param":true
                });
            }catch (e){
                // console.log("goLogin")
            }
        };
        //跳到注册页
        var goregister = function (callback) {
            try{
                window.registerCallback=  function(){
                    callback && callback();
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_jump_register",
                    "request_callback_method":"registerCallback",
                    "request_callback_have_param":true
                });
            }catch (e){
                // console.log("goregister")
            }
        };
        //sdk支付
        var paySdk = function (option,callback) {
            try{
                window.paySdkCallback = function(data){
                    callback && callback(data);
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_paysdk",
                    "request_callback_method":"paySdkCallback",
                    "request_data" : option,
                    "request_callback_have_param":true
                });
            }catch(e){
                // console.log("paySdk");
            }
        };
        //分享
        var share = function (ShareInfoConfig,activityId) {
            try{
                window.shareCallback = function(data){
                    callback && callback(data);
                };
                // alert(JSON.stringify(ShareInfoConfig));
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_share",
                    "request_callback_method":"shareCallback",
                    "request_data" : JSON.stringify(extend(ShareInfoConfig, {activityId: activityId})),
                    "request_callback_have_param":true
                });
            }catch(e){
                // console.log("share");
            }
        };
        //跳转app指定地址
        var jumpApp = function (jumpAppUrl) {
            // alert(jumpAppUrl);
            try{
                window.jumpAppCallback = function(data){
                    callback && callback(data);
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_jumpApp",
                    "request_callback_method":"jumpAppCallback",
                    "request_data" : jumpAppUrl,
                    "request_callback_have_param":true
                });
            }catch(e){
                // console.log("jumpApp");
            }
        };
       // 联系人
       var contact = function (callback) {
            try{
                window.contactCallback=  function(data){
                    callback && callback(data);
                };
                window.webkit.messageHandlers.iOSFYDH.postMessage({
                    "request_type":"do_type_choose_contact",
                    "request_callback_method":"contactCallback",
                    "request_callback_have_param":true
                });
            }catch(e){
                // callback2 && callback2();
                // console.log("getUserInfo")
            }
        };
    }else{
        // 获取用户信息
        var getUserInfo = function (callback,callback2) {
            try{
                window.userInfoCallback = function(response){
                    var data = null;
                    if(!!response){
                        // alert(1);
                        // alert(data);
                        data = JSON.parse(response);
                        // alert(data);
                    }
                    callback && callback(data);
                };
                // alert('测试'+0);
                window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_user_info",
                    "request_callback_method":"userInfoCallback",
                    "request_callback_have_param":true
                }));
                // return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                //     "request_type":"do_type_user_info",
                //     "request_callback_method":"userInfoCallback",
                //     "request_callback_have_param":true
                // })));
                // alert('测试'+2);
            }catch(e){
                callback2 && callback2();
                // console.log("getUserInfo")
            }
        };
        //获取客户端信息
        var appInfo = function(callback){//获取客户端信息
            try{
                window.appInfoCallback = function(response){
                    var data = null;
                    if(!!response){
                        data = JSON.parse(response);
                    }
                    callback && callback(data);
                };
                return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_app_info",
                    "request_callback_method":"appInfoCallback",
                    "request_callback_have_param":true
                })));
            }catch(e){
                // console.log("appInfo")
            }
        };
        //跳到登录页
        var goLogin = function (callback) {
            try{
                window.loginCallback=  function(){
                    callback && callback();
                };
                return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_jump_login",
                    "request_callback_method":"loginCallback",
                    "request_callback_have_param":true
                })));
            }catch (e){
                // console.log("goLogin")
            }
        };
        //跳到注册页
        var goregister = function (callback) {
            try{
                window.registerCallback=  function(){
                    callback && callback();
                };
                return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_jump_register",
                    "request_callback_method":"registerCallback",
                    "request_callback_have_param":true
                })));
            }catch (e){
                // console.log("goregister")
            }
        };
        //sdk支付
        var paySdk = function (option,callback) {
            try{
                window.paySdkCallback = function(response){
                    // alert(response)
                    var data = null;
                    if(!!response){
                        data = JSON.parse(response);
                    }
                    callback && callback(data);
                };
                return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_paysdk",
                    "request_callback_method":"paySdkCallback",
                    "request_data" : JSON.stringify(option),
                    "request_callback_have_param":true
                })));
            }catch(e){
                // console.log("paySdk")
            }
        };
        //分享
        var share = function (ShareInfoConfig,activityId) {
            var infoStr;
            try {
                    window.shareCallback=  function(data){
                    callback && callback(data);
                };
                // alert(JSON.stringify(ShareInfoConfig));
                infoStr = window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type": "do_type_share",
                    "request_callback_method": "shareCallback",
                    "request_data": JSON.stringify(extend(ShareInfoConfig, {activityId: activityId}))
                }));
            } catch(e) {
                // alert("share"+e);
            };
            return infoStr ? JSON.parse(infoStr) : {};
        };
        //跳转app指定地址
        var jumpApp = function (jumpAppUrl) {
            try{
                window.jumpAppCallback=  function(){
                    callback && callback();
                };
                return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_jumpApp",
                    "request_callback_method":"jumpAppCallback",
                    "request_data" : jumpAppUrl,
                    "request_callback_have_param":true
                })));
            }catch (e){
                console.log("jumpApp")
            }
         };
        // 联系人
        var contact = function (callback) {
            try{
                window.contactCallback=  function(datas){

                    var data = null;
                    if(!!datas){
                        data = JSON.parse(datas);
                    }
                    callback && callback(data);
                    // var data = datas
                    // data = JSON.parse(response);
                    // callback && callback(data);
                };
                return JSON.parse(window.JsManager.doSomethingByH5(JSON.stringify({
                    "request_type":"do_type_choose_contact",
                    "request_callback_method":"contactCallback",
                    "request_callback_have_param":true
                })));
            }catch (e){
                // console.log("goLogin")
            }
        };
   }
   return {
       "getUserInfo": getUserInfo,
       "appInfo": appInfo,
       "goLogin" : goLogin,
       "goregister" : goregister,
       "paySdk": paySdk,
       "share": share,
       "jumpApp":jumpApp,
       "contact": contact
   };
});