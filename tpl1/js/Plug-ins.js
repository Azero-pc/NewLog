

var honeySwitch={};honeySwitch.themeColor="rgb(255, 85, 0)";honeySwitch.init=function(){var s="<span class='slider'></span>";$("[class^=switch]").append(s);$("[class^=switch]").click(function(){if($(this).hasClass("switch-disabled")){return;}
if($(this).hasClass("switch-on")){$(this).removeClass("switch-on").addClass("switch-off");$(".switch-off").css({'border-color':'#dfdfdf','box-shadow':'rgb(223, 223, 223) 0px 0px 0px 0px inset','background-color':'rgb(255, 255, 255)'});}else{$(this).removeClass("switch-off").addClass("switch-on");if(honeySwitch.themeColor){var c=honeySwitch.themeColor;$(this).css({'border-color':c,'box-shadow':c+' 0px 0px 0px 16px inset','background-color':c});}
if($(this).attr('themeColor')){var c2=$(this).attr('themeColor');$(this).css({'border-color':c2,'box-shadow':c2+' 0px 0px 0px 16px inset','background-color':c2});}}});window.switchEvent=function(ele,on,off){$(ele).click(function(){if($(this).hasClass("switch-disabled")){return;}
if($(this).hasClass('switch-on')){if(typeof on=='function'){on();}}else{if(typeof off=='function'){off();}}});}
if(this.themeColor){var c=this.themeColor;$(".switch-on").css({'border-color':c,'box-shadow':c+' 0px 0px 0px 16px inset','background-color':c});$(".switch-off").css({'border-color':'#dfdfdf','box-shadow':'rgb(223, 223, 223) 0px 0px 0px 0px inset','background-color':'rgb(255, 255, 255)'});}
if($('[themeColor]').length>0){$('[themeColor]').each(function(){var c=$(this).attr('themeColor')||honeySwitch.themeColor;if($(this).hasClass("switch-on")){$(this).css({'border-color':c,'box-shadow':c+' 0px 0px 0px 16px inset','background-color':c});}else{$(".switch-off").css({'border-color':'#dfdfdf','box-shadow':'rgb(223, 223, 223) 0px 0px 0px 0px inset','background-color':'rgb(255, 255, 255)'});}});}};honeySwitch.showOn=function(ele){$(ele).removeClass("switch-off").addClass("switch-on");if(honeySwitch.themeColor){var c=honeySwitch.themeColor;$(ele).css({'border-color':c,'box-shadow':c+' 0px 0px 0px 16px inset','background-color':c});}
if($(ele).attr('themeColor')){var c2=$(ele).attr('themeColor');$(ele).css({'border-color':c2,'box-shadow':c2+' 0px 0px 0px 16px inset','background-color':c2});}}
honeySwitch.showOff=function(ele){$(ele).removeClass("switch-on").addClass("switch-off");$(".switch-off").css({'border-color':'#dfdfdf','box-shadow':'rgb(223, 223, 223) 0px 0px 0px 0px inset','background-color':'rgb(255, 255, 255)'});}
$(function(){honeySwitch.init();});


// 倒计时
(function($,app){
	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	app.leftTime=function(setdate,callback,isCheckTime) {
		var timer=this.timer;
		if(!isCheckTime && isCheckTime != false) {
			isCheckTime = true;
		};
		var opts={};
		    opts.count=0;
		//定义变量 d,h,m,s保存倒计时的时间  
		var d = 0,
			h = 0,
			m = 0,
			s = 0,
			setCount=0,
			setCount2=0,
			stepCheck=0,
			status = false;
		if(typeof(setdate) === "object"){
			if(!setdate.init && setdate.init != true) {
				setdate.init = false;
			};
			var countTime=0,
			newDateTime,
            setDayNo=0;
            
			if(setdate.setday!=0 || setdate.setday!="0"){
				setDayNo=parseInt(setdate.setday)*86400000;
            }
            
			if(!setdate.nowdate || setdate.nowdate==null || setdate.nowdate==undefined || setdate.nowdate=="undefined"){
				setdate.nowdate=new Date().getTime();
				newDateTime=new Date();
			}else{
				countTime=(new Date().getTime())-parseInt(setdate.nowdate);
				newDateTime=new Date(setdate.nowdate);
			}
			var newSeverDateTime=new Date(parseInt(setdate.nowdate)+setDayNo);
			var severStart=0,severEnd=0;
			if((setdate.startdate!=0 && setdate.startdate!="0") && !setdate.init){
				if(typeof(setdate.startdate)==="string"){
					if(checkDateTime(setdate.startdate)){
						severStart=new Date((setdate.startdate).replace(/-/g,"/")).getTime();
					}else{
						if(checkIsTime(setdate.startdate)){
						severStart=new Date(newSeverDateTime.format("yyyy/MM/dd")+" "+setdate.startdate).getTime();
						}
					};
				}else if(typeof(setdate.startdate)==="number"){
					severStart=setdate.startdate;
				}
			}
			if(setdate.enddate!=0 || setdate.enddate!="0"){
				if(typeof(setdate.enddate)==="string"){
					if(checkDateTime(setdate.enddate)){
						severEnd=new Date((setdate.enddate).replace(/-/g,"/")).getTime();
					}else{
						if(checkIsTime(setdate.enddate)){
						 severEnd=new Date(newSeverDateTime.format("yyyy/MM/dd")+" "+setdate.enddate).getTime();
						}
					};
				}else if(typeof(setdate.enddate)==="number"){
					severStart=setdate.enddate;
				}
			};
			var currDateTime=newDateTime.getTime();
		};
		function checkDateTime(str){
            // console.log(str)
			if(str.indexOf("-")!=-1 || str.indexOf("/")!=-1){return true;}else{return false;}
		}
		function checkIsTime(str){
            
			var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
			if(reg.test($.trim(str))){return true;}else{return false;}
		}
		function checkTime(i) {
            // console.log(i)
			if(i < 10) {
				if(isCheckTime) {
					i = "0" + i;
				}
			}
			return i;
		}
		function leftTimeExeFn(){
			if(typeof(setdate) === "string" || typeof(setdate) === "number") {
				//获取当前时间  
				var startDate = new Date();
				var nowTime = startDate.getTime();
				//设置截止时间  
				var endTime=0;
				var leftTimeCount =0;
				if(typeof(setdate) === "string" || setdate.toString().length>=12){
					setdate=typeof(setdate) === "string"&&checkDateTime(setdate)==true?setdate.replace(/-/g,"/"):setdate;
					var endDate = new Date(setdate);
					endTime = endDate.getTime();
					leftTimeCount = endTime - nowTime;
				}else{
					endTime=setdate-opts.count;
					leftTimeCount=endTime*1000;
					opts.count++;
				}
				if(leftTimeCount>0) {
                    if(leftTimeCount <= 259200000){
                        // console.log(0)
                        d = 0
                        // d = Math.floor(leftTimeCount / 1000 / 60 / 60 / 24);
                        h = Math.floor(leftTimeCount / 1000 / 60 / 60 % 72);
                        m = Math.floor(leftTimeCount / 1000 / 60 % 60);
                        s = Math.floor(leftTimeCount / 1000 % 60);
                    }else{
                        d = Math.floor(leftTimeCount / 1000 / 60 / 60 / 24);
                        h = Math.floor(leftTimeCount / 1000 / 60 / 60 % 24);
                        m = Math.floor(leftTimeCount / 1000 / 60 % 60);
                        s = Math.floor(leftTimeCount / 1000 % 60);
                    }
                    // console.log(leftTimeCount)
					status = true;
				} else {
					window.clearInterval(timer);
					d = 0;
					h = 0;
					m = 0;
					s = 0;
					status = false;
				}
			}else if(typeof(setdate) === "object"){
				var nowTime=new Date().getTime()+(countTime>0?countTime*-1:Math.abs(countTime));
				var endTime=0;
				if(currDateTime<severStart){
					endTime=severStart;
					stepCheck=1;
				}else if(currDateTime>=severStart && currDateTime<severEnd){
					endTime=severEnd;
					stepCheck=2;
				}else if(currDateTime>=severEnd){
					stepCheck=3;
				}
				//时间差  
                var countEnd=endTime-nowTime;
				if(countEnd>0) {
                    // console.log('countEnd'+countEnd)
					d = Math.floor(countEnd / 1000 / 60 / 60 / 24);
					h = Math.floor(countEnd / 1000 / 60 / 60 % 24);
					m = Math.floor(countEnd / 1000 / 60 % 60);
					s = Math.floor(countEnd / 1000 % 60);
					status = true;
				} else {
					window.clearInterval(timer);
					d = 0;
					h = 0;
					m = 0;
					s = 0;
					status = false;
				}
            }
            if(d == 0){
                // alert(0)
                $('.isDateshow').hide();
            }
            var dataTime = {};
            // if(d >= 3){
            //     dataTime = {
            //         "d": checkTime(d),
            //         "h": checkTime(2),
            //         "m": checkTime(m),
            //         "s": checkTime(s)
            //     };
            // }else{
            //     dataTime = {
            //         "d": checkTime(d),
            //         "h": checkTime(h),
            //         "m": checkTime(m),
            //         "s": checkTime(s)
            //     };
            // }
			var dataTime = {
				"d": checkTime(d),
				"h": checkTime(h),
				"m": checkTime(m),
				"s": checkTime(s)
            };
            // console.log(s);
			dataTime.status=status;
			dataTime.step=stepCheck;
			if(callback && typeof(callback) === "function") {
                // console.log(s)
				return callback(dataTime);
			}
		}
		leftTimeExeFn();
		timer=setInterval(leftTimeExeFn,1000);
		if(timer!="undefined" || timer!=null || timer!=undefined){
			return timer;
		}
	};
	$.extend(app);
})(jQuery||zepto,{});

// VERSION: 2.2 LAST UPDATE: 13.03.2012
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */

// Documentation removed from script file (was kinda useless and outdated)

(function($) {
var supportedCSS,styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
for (var a=0;a<toCheck.length;a++) if (styles[toCheck[a]] !== undefined) supportedCSS = toCheck[a];
// Bad eval to preven google closure to remove it from code o_O
// After compresion replace it back to var IE = 'v' == '\v'
var IE = eval('"v"=="\v"');

jQuery.fn.extend({
    rotate:function(parameters)
    {
        if (this.length===0||typeof parameters=="undefined") return;
            if (typeof parameters=="number") parameters={angle:parameters};
        var returned=[];
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);    
                if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {
                    var paramClone = $.extend(true, {}, parameters); 
                    var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;
                    returned.push($(newRotObject));
                }
                else {
                    element.Wilq32.PhotoEffect._handleRotation(parameters);
                }
            }
            return returned;
    },
    getRotateAngle: function(){
        var ret = [];
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);    
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    ret[i] = element.Wilq32.PhotoEffect._angle;
                }
            }
            return ret;
    },
    stopRotate: function(){
        for (var i=0,i0=this.length;i<i0;i++)
            {
                var element=this.get(i);    
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    clearTimeout(element.Wilq32.PhotoEffect._timer);
                }
            }
    }
});

// Library agnostic interface

Wilq32=window.Wilq32||{};
Wilq32.PhotoEffect=(function(){

    if (supportedCSS) {
        return function(img,parameters){
            img.Wilq32 = {
                PhotoEffect: this
            };
            
            this._img = this._rootObj = this._eventObj = img;
            this._handleRotation(parameters);
        }
    } else {
        return function(img,parameters) {
            // Make sure that class and id are also copied - just in case you would like to refeer to an newly created object
            this._img = img;

            this._rootObj=document.createElement('span');
            this._rootObj.style.display="inline-block";
            this._rootObj.Wilq32 = 
                {
                    PhotoEffect: this
                };
            img.parentNode.insertBefore(this._rootObj,img);
            
            if (img.complete) {
                this._Loader(parameters);
            } else {
                var self=this;
                // TODO: Remove jQuery dependency
                jQuery(this._img).bind("load", function()
                {
                    self._Loader(parameters);
                });
            }
        }
    }
})();

Wilq32.PhotoEffect.prototype={
    _setupParameters : function (parameters){
        this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") this._angle = 0 ;
        if (typeof parameters.angle==="number") this._angle = parameters.angle;
        this._parameters.animateTo = (typeof parameters.animateTo==="number") ? (parameters.animateTo) : (this._angle); 

        this._parameters.step = parameters.step || this._parameters.step || null;
        this._parameters.easing = parameters.easing || this._parameters.easing || function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; }
        this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || function(){};
        if (parameters.bind && parameters.bind != this._parameters.bind) this._BindEvents(parameters.bind); 
    },
    _handleRotation : function(parameters){
          this._setupParameters(parameters);
          if (this._angle==this._parameters.animateTo) {
              this._rotate(this._angle);
          }
          else { 
              this._animateStart();          
          }
    },

    _BindEvents:function(events){
        if (events && this._eventObj) 
        {
            // Unbinding previous Events
            if (this._parameters.bind){
                var oldEvents = this._parameters.bind;
                for (var a in oldEvents) if (oldEvents.hasOwnProperty(a)) 
                        // TODO: Remove jQuery dependency
                        jQuery(this._eventObj).unbind(a,oldEvents[a]);
            }

            this._parameters.bind = events;
            for (var a in events) if (events.hasOwnProperty(a)) 
                // TODO: Remove jQuery dependency
                    jQuery(this._eventObj).bind(a,events[a]);
        }
    },

    _Loader:(function()
    {
        if (IE)
        return function(parameters)
        {
            var width=this._img.width;
            var height=this._img.height;
            this._img.parentNode.removeChild(this._img);
                            
            this._vimage = this.createVMLNode('image');
            this._vimage.src=this._img.src;
            this._vimage.style.height=height+"px";
            this._vimage.style.width=width+"px";
            this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
            this._vimage.style.top = "0px";
            this._vimage.style.left = "0px";

            /* Group minifying a small 1px precision problem when rotating object */
            this._container =  this.createVMLNode('group');
            this._container.style.width=width;
            this._container.style.height=height;
            this._container.style.position="absolute";
            this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
            this._container.appendChild(this._vimage);
            
            this._rootObj.appendChild(this._container);
            this._rootObj.style.position="relative"; // FIXES IE PROBLEM
            this._rootObj.style.width=width+"px";
            this._rootObj.style.height=height+"px";
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;            
            this._eventObj = this._rootObj; 
            this._handleRotation(parameters);   
        }
        else
        return function (parameters)
        {
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;
            
            this._width=this._img.width;
            this._height=this._img.height;
            this._widthHalf=this._width/2; // used for optimisation
            this._heightHalf=this._height/2;// used for optimisation
            
            var _widthMax=Math.sqrt((this._height)*(this._height) + (this._width) * (this._width));

            this._widthAdd = _widthMax - this._width;
            this._heightAdd = _widthMax - this._height; // widthMax because maxWidth=maxHeight
            this._widthAddHalf=this._widthAdd/2; // used for optimisation
            this._heightAddHalf=this._heightAdd/2;// used for optimisation
            
            this._img.parentNode.removeChild(this._img);    
            
            this._aspectW = ((parseInt(this._img.style.width,10)) || this._width)/this._img.width;
            this._aspectH = ((parseInt(this._img.style.height,10)) || this._height)/this._img.height;
            
            this._canvas=document.createElement('canvas');
            this._canvas.setAttribute('width',this._width);
            this._canvas.style.position="relative";
            this._canvas.style.left = -this._widthAddHalf + "px";
            this._canvas.style.top = -this._heightAddHalf + "px";
            this._canvas.Wilq32 = this._rootObj.Wilq32;
            
            this._rootObj.appendChild(this._canvas);
            this._rootObj.style.width=this._width+"px";
            this._rootObj.style.height=this._height+"px";
            this._eventObj = this._canvas;
            
            this._cnv=this._canvas.getContext('2d');
            this._handleRotation(parameters);
        }
    })(),

    _animateStart:function()
    {   
        if (this._timer) {
            clearTimeout(this._timer);
        }
        this._animateStartTime = +new Date;
        this._animateStartAngle = this._angle;
        this._animate();
    },
    _animate:function()
    {
         var actualTime = +new Date;
         var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

         // TODO: Bug for animatedGif for static rotation ? (to test)
         if (checkEnd && !this._parameters.animatedGif) 
         {
             clearTimeout(this._timer);
         }
         else 
         {
             if (this._canvas||this._vimage||this._img) {
                 var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                 this._rotate((~~(angle*10))/10);
             }
             if (this._parameters.step) {
                this._parameters.step(this._angle);
             }
             var self = this;
             this._timer = setTimeout(function()
                     {
                     self._animate.call(self);
                     }, 10);
         }

         // To fix Bug that prevents using recursive function in callback I moved this function to back
         if (this._parameters.callback && checkEnd){
             this._angle = this._parameters.animateTo;
             this._rotate(this._angle);
             this._parameters.callback.call(this._rootObj);
         }
     },

    _rotate : (function()
    {
        var rad = Math.PI/180;
        if (IE)
        return function(angle)
        {
            this._angle = angle;
            this._container.style.rotation=(angle%360)+"deg";
        }
        else if (supportedCSS)
        return function(angle){
            this._angle = angle;
            this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
        }
        else 
        return function(angle)
        {
            this._angle = angle;
            angle=(angle%360)* rad;
            // clear canvas 
            this._canvas.width = this._width+this._widthAdd;
            this._canvas.height = this._height+this._heightAdd;
                        
            // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
            this._cnv.translate(this._widthAddHalf,this._heightAddHalf);    // at least center image on screen
            this._cnv.translate(this._widthHalf,this._heightHalf);          // we move image back to its orginal 
            this._cnv.rotate(angle);                                        // rotate image
            this._cnv.translate(-this._widthHalf,-this._heightHalf);        // move image to its center, so we can rotate around its center
            this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
            this._cnv.drawImage(this._img, 0, 0);                           // First - we draw image
        }

    })()
}

if (IE)
{
Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            return function (tagName) {
                return document.createElement('<rvml:' + tagName + ' class="rvml">');
            };
        } catch (e) {
            return function (tagName) {
                return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }       
})();
}

})(jQuery);

/*!
 * jquery.base64.js 0.1 - https://github.com/yckart/jquery.base64.js
 * Base64 en & -decoding
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($){
    $.base64 = $.fn.base64 = function (dir, input) {

        var publ = {},
            self = this,
            b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // http://phpjs.org/functions/base64_encode/
        publ.encode = function (data) {
            data = !(self instanceof $) ? data : self.is(':input') ? self.val() : self.text();
            data = unescape(encodeURIComponent( data ));

            if (data === '') return;
            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
                ac = 0,
                enc = "",
                tmp_arr = [];

            if (!data) return data;

            do { // pack three octets into four hexets
                o1 = data.charCodeAt(i++);
                o2 = data.charCodeAt(i++);
                o3 = data.charCodeAt(i++);

                bits = o1 << 16 | o2 << 8 | o3;

                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;

                // use hexets to index into b64, and append result to encoded string
                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < data.length);

            enc = tmp_arr.join('');

            var r = data.length % 3;

            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
        };

        // http://phpjs.org/functions/base64_decode/
        publ.decode = function (data) {
            data = !(self instanceof $) ? data : self.is(':input') ? self.val() : self.text();

            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
                ac = 0,
                dec = "",
                tmp_arr = [];

            if (!data) return data;

            data += '';

            do { // unpack four hexets into three octets using index points in b64
                h1 = b64.indexOf(data.charAt(i++));
                h2 = b64.indexOf(data.charAt(i++));
                h3 = b64.indexOf(data.charAt(i++));
                h4 = b64.indexOf(data.charAt(i++));

                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

                o1 = bits >> 16 & 0xff;
                o2 = bits >> 8 & 0xff;
                o3 = bits & 0xff;

                if (h3 == 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1);
                } else if (h4 == 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2);
                } else {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
                }
            } while (i < data.length);

            dec = tmp_arr.join('');

            return decodeURIComponent(escape( dec ));
        };

        return input ? publ[dir](input) : dir ? null : publ;
    };
}(jQuery));
 /** 
 * jQuery MD5 hash algorithm function 
 *  
 *  <code> 
 *      Calculate the md5 hash of a String  
 *      String $.md5 ( String str ) 
 *  </code> 
 *  
 * Calculates the MD5 hash of str using the 禄 RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash.  
 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data. 
 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1. 
 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag).  
 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin. 
 *  
 * Example 
 *  Code 
 *      <code> 
 *          $.md5("I'm Persian.");  
 *      </code> 
 *  Result 
 *      <code> 
 *          "b8c901d0f02223f9761016cfff9d68df" 
 *      </code> 
 *  
 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com > 
 * @link http://www.semnanweb.com/jquery-plugin/md5.html 
 * @see http://www.webtoolkit.info/ 
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License] 
 * @param {jQuery} {md5:function(string)) 
 * @return string 
 */  
(function($){  
    var rotateLeft = function(lValue, iShiftBits) {  
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));  
    }  
    var addUnsigned = function(lX, lY) {  
        var lX4, lY4, lX8, lY8, lResult;  
        lX8 = (lX & 0x80000000);  
        lY8 = (lY & 0x80000000);  
        lX4 = (lX & 0x40000000);  
        lY4 = (lY & 0x40000000);  
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);  
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);  
        if (lX4 | lY4) {  
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);  
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);  
        } else {  
            return (lResult ^ lX8 ^ lY8);  
        }  
    }  
    var F = function(x, y, z) {  
        return (x & y) | ((~ x) & z);  
    }  
    var G = function(x, y, z) {  
        return (x & z) | (y & (~ z));  
    }  
    var H = function(x, y, z) {  
        return (x ^ y ^ z);  
    }  
    var I = function(x, y, z) {  
        return (y ^ (x | (~ z)));  
    }  
    var FF = function(a, b, c, d, x, s, ac) {  
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));  
        return addUnsigned(rotateLeft(a, s), b);  
    };  
    var GG = function(a, b, c, d, x, s, ac) {  
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));  
        return addUnsigned(rotateLeft(a, s), b);  
    };  
    var HH = function(a, b, c, d, x, s, ac) {  
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));  
        return addUnsigned(rotateLeft(a, s), b);  
    };  
    var II = function(a, b, c, d, x, s, ac) {  
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));  
        return addUnsigned(rotateLeft(a, s), b);  
    };  
    var convertToWordArray = function(string) {  
        var lWordCount;  
        var lMessageLength = string.length;  
        var lNumberOfWordsTempOne = lMessageLength + 8;  
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;  
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;  
        var lWordArray = Array(lNumberOfWords - 1);  
        var lBytePosition = 0;  
        var lByteCount = 0;  
        while (lByteCount < lMessageLength) {  
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;  
            lBytePosition = (lByteCount % 4) * 8;  
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));  
            lByteCount++;  
        }  
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;  
        lBytePosition = (lByteCount % 4) * 8;  
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);  
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;  
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;  
        return lWordArray;  
    };  
    var wordToHex = function(lValue) {  
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;  
        for (lCount = 0; lCount <= 3; lCount++) {  
            lByte = (lValue >>> (lCount * 8)) & 255;  
            WordToHexValueTemp = "0" + lByte.toString(16);  
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);  
        }  
        return WordToHexValue;  
    };  
    var uTF8Encode = function(string) {  
        string = string.replace(/\x0d\x0a/g, "\x0a");  
        var output = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                output += String.fromCharCode(c);  
            } else if ((c > 127) && (c < 2048)) {  
                output += String.fromCharCode((c >> 6) | 192);  
                output += String.fromCharCode((c & 63) | 128);  
            } else {  
                output += String.fromCharCode((c >> 12) | 224);  
                output += String.fromCharCode(((c >> 6) & 63) | 128);  
                output += String.fromCharCode((c & 63) | 128);  
            }  
        }  
        return output;  
    };  
    $.extend({  
        md5: function(string) {  
            var x = Array();  
            var k, AA, BB, CC, DD, a, b, c, d;  
            var S11=7, S12=12, S13=17, S14=22;  
            var S21=5, S22=9 , S23=14, S24=20;  
            var S31=4, S32=11, S33=16, S34=23;  
            var S41=6, S42=10, S43=15, S44=21;  
            string = uTF8Encode(string);  
            x = convertToWordArray(string);  
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;  
            for (k = 0; k < x.length; k += 16) {  
                AA = a; BB = b; CC = c; DD = d;  
                a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);  
                d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);  
                c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);  
                b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);  
                a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);  
                d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);  
                c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);  
                b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);  
                a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);  
                d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);  
                c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);  
                b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);  
                a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);  
                d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);  
                c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);  
                b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);  
                a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);  
                d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);  
                c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);  
                b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);  
                a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);  
                d = GG(d, a, b, c, x[k+10], S22, 0x2441453);  
                c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);  
                b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);  
                a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);  
                d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);  
                c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);  
                b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);  
                a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);  
                d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);  
                c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);  
                b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);  
                a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);  
                d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);  
                c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);  
                b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);  
                a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);  
                d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);  
                c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);  
                b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);  
                a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);  
                d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);  
                c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);  
                b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);  
                a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);  
                d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);  
                c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);  
                b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);  
                a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);  
                d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);  
                c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);  
                b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);  
                a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);  
                d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);  
                c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);  
                b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);  
                a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);  
                d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);  
                c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);  
                b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);  
                a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);  
                d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);  
                c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);  
                b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);  
                a = addUnsigned(a, AA);  
                b = addUnsigned(b, BB);  
                c = addUnsigned(c, CC);  
                d = addUnsigned(d, DD);  
            }  
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);  
            return tempValue.toLowerCase();  
        }  
    });  
})(jQuery);  
/** 
* jQuery SHA1 hash algorithm function 
* Download by http://www.bvbsoft.com 
*      <code> 
*              Calculate the sha1 hash of a String 
*              String $.sha1 ( String str ) 
*      </code> 
* 
* Calculates the sha1 hash of str using the US Secure Hash Algorithm 1. 
* SHA-1 the Secure Hash Algorithm (SHA) was developed by NIST and is specified in the Secure Hash Standard (SHS, FIPS 180). 
* This script is used to process variable length message into a fixed-length output using the SHA-1 algorithm. It is fully compatible with UTF-8 encoding. 
* If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
* This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin. 
* 
* Example 
*      Code 
*              <code> 
*                      $.sha1("I'm Persian."); 
*              </code> 
*      Result 
*              <code> 
*                      "1d302f9dc925d62fc859055999d2052e274513ed" 
*              </code> 
* 
* @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com > 
* @link http://www.semnanweb.com/jquery-plugin/sha1.html 
* @see http://www.webtoolkit.info/ 
* @license http://www.gnu.org/licenses/gpl.html [GNU General Public License] 
* @param {jQuery} {sha1:function(string)) 
* @return string 
*/  
(function($){  
        var rotateLeft = function(lValue, iShiftBits) {  
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));  
        }  
         
        var lsbHex = function(value) {  
                var string = "";  
                var i;  
                var vh;  
                var vl;  
                for(i = 0;i <= 6;i += 2) {  
                        vh = (value>>>(i * 4 + 4))&0x0f;  
                        vl = (value>>>(i*4))&0x0f;  
                        string += vh.toString(16) + vl.toString(16);  
                }  
                return string;  
        };  
         
        var cvtHex = function(value) {  
                var string = "";  
                var i;  
                var v;  
                for(i = 7;i >= 0;i--) {  
                        v = (value>>>(i * 4))&0x0f;  
                        string += v.toString(16);  
                }  
                return string;  
        };  
         
        var uTF8Encode = function(string) {  
                string = string.replace(/\x0d\x0a/g, "\x0a");  
                var output = "";  
                for (var n = 0; n < string.length; n++) {  
                        var c = string.charCodeAt(n);  
                        if (c < 128) {  
                                output += String.fromCharCode(c);  
                        } else if ((c > 127) && (c < 2048)) {  
                                output += String.fromCharCode((c >> 6) | 192);  
                                output += String.fromCharCode((c & 63) | 128);  
                        } else {  
                                output += String.fromCharCode((c >> 12) | 224);  
                                output += String.fromCharCode(((c >> 6) & 63) | 128);  
                                output += String.fromCharCode((c & 63) | 128);  
                        }  
                }  
                return output;  
        };  
         
        $.extend({  
                sha1: function(string) {  
                        var blockstart;  
                        var i, j;  
                        var W = new Array(80);  
                        var H0 = 0x67452301;  
                        var H1 = 0xEFCDAB89;  
                        var H2 = 0x98BADCFE;  
                        var H3 = 0x10325476;  
                        var H4 = 0xC3D2E1F0;  
                        var A, B, C, D, E;  
                        var tempValue;  
                        string = uTF8Encode(string);  
                        var stringLength = string.length;  
                        var wordArray = new Array();  
                        for(i = 0;i < stringLength - 3;i += 4) {  
                                j = string.charCodeAt(i)<<24 | string.charCodeAt(i + 1)<<16 | string.charCodeAt(i + 2)<<8 | string.charCodeAt(i + 3);  
                                wordArray.push(j);  
                        }  
                        switch(stringLength % 4) {  
                                case 0:  
                                        i = 0x080000000;  
                                break;  
                                case 1:  
                                        i = string.charCodeAt(stringLength - 1)<<24 | 0x0800000;  
                                break;  
                                case 2:  
                                        i = string.charCodeAt(stringLength - 2)<<24 | string.charCodeAt(stringLength - 1)<<16 | 0x08000;  
                                break;  
                                case 3:  
                                        i = string.charCodeAt(stringLength - 3)<<24 | string.charCodeAt(stringLength - 2)<<16 | string.charCodeAt(stringLength - 1)<<8 | 0x80;  
                                break;  
                        }  
                        wordArray.push(i);  
                        while((wordArray.length % 16) != 14 ) wordArray.push(0);  
                        wordArray.push(stringLength>>>29);  
                        wordArray.push((stringLength<<3)&0x0ffffffff);  
                        for(blockstart = 0;blockstart < wordArray.length;blockstart += 16) {  
                                for(i = 0;i < 16;i++) W[i] = wordArray[blockstart+i];  
                                for(i = 16;i <= 79;i++) W[i] = rotateLeft(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);  
                                A = H0;  
                                B = H1;  
                                C = H2;  
                                D = H3;  
                                E = H4;  
                                for(i = 0;i <= 19;i++) {  
                                        tempValue = (rotateLeft(A, 5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;  
                                        E = D;  
                                        D = C;  
                                        C = rotateLeft(B, 30);  
                                        B = A;  
                                        A = tempValue;  
                                }  
                                for(i = 20;i <= 39;i++) {  
                                        tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;  
                                        E = D;  
                                        D = C;  
                                        C = rotateLeft(B, 30);  
                                        B = A;  
                                        A = tempValue;  
                                }  
                                for(i = 40;i <= 59;i++) {  
                                        tempValue = (rotateLeft(A, 5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;  
                                        E = D;  
                                        D = C;  
                                        C = rotateLeft(B, 30);  
                                        B = A;  
                                        A = tempValue;  
                                }  
                                for(i = 60;i <= 79;i++) {  
                                        tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;  
                                        E = D;  
                                        D = C;  
                                        C = rotateLeft(B, 30);  
                                        B = A;  
                                        A = tempValue;  
                                }  
                                H0 = (H0 + A) & 0x0ffffffff;  
                                H1 = (H1 + B) & 0x0ffffffff;  
                                H2 = (H2 + C) & 0x0ffffffff;  
                                H3 = (H3 + D) & 0x0ffffffff;  
                                H4 = (H4 + E) & 0x0ffffffff;  
                        }  
                        var tempValue = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);  
                        return tempValue.toLowerCase();  
                }  
        });  
})(jQuery);


/*  This work is licensed under Creative Commons GNU LGPL License.

    License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.10
    Author:  Stefan Goessner/2006, Henrik Ingo/2013
    Web:     https://github.com/henrikingo/xml2json 
*/
function xml2json_translator() {
   var X = {
      err: function(msg) {
         alert("Error: " + msg);
      },
      toObj: function(xml, parent) {
         if (xml.nodeType==9) // document.node
            return X.toObj(xml.documentElement, parent);
         var o = {};

         if(   !parent                    // no parent = root element = first step in recursion
            || parent instanceof Array ){ // if parent is an Array, we cannot add attributes to it, so handle it with similar extra step as a root element
            if (xml.nodeType==1) { // element node
               o[xml.nodeName] = X.toObj(xml, o);
            }
            else
               X.err("unhandled node type: " + xml.nodeType);
            return o;
         }

         // second and following recursions      
         if (xml.nodeType==1) {   // element node ..

            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  parent[xml.nodeName+"@"+xml.attributes[i].nodeName] = xml.attributes[i].nodeValue;

            if (xml.firstChild) { // element has child nodes. Figure out some properties of it's structure, to guide us later.
               var textChild=0, cdataChild=0, hasElementChild=false, needsArray=false;
               var elemCount = {};
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) {
                     hasElementChild = true;
                     elemCount[n.nodeName] = (elemCount[n.nodeName] ? elemCount[n.nodeName] + 1 : 1);
                     if( elemCount[n.nodeName] > 1 ) needsArray=true;
                  }
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild && textChild) needsArray=true;
               if (hasElementChild && cdataChild) needsArray=true;
               if (textChild && cdataChild) needsArray=true;
               if (cdataChild > 1) needsArray=true;
               
               if (hasElementChild && !needsArray) { // Neatly structured and unique child elements, no plain text/cdata in the mix
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           //o["#text"] = X.escape(n.nodeValue);
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n, o);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n, o)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n, o);
                     }
               }
               else if ( needsArray ) {
                     o = [];
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           //o["#text"] = X.escape(n.nodeValue);
                           o[o.length] = X.escape(n.nodeValue); // TODO: shouldn't escape() happen in toJson() / printing phase???
                        else if (n.nodeType == 4)  // cdata node
                           o[o.length] = { "#cdata" : X.escape(n.nodeValue) }; // TODO: same here? especially with cdata?
                        else  { // element
                           o[o.length] = X.toObj(n, o); //push
                        }
                     }
               }
               else if (textChild) { // pure text
                  o = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // single cdata
                  X.removeWhite(xml);
                  o["#cdata"] = X.escape(xml.firstChild.nodeValue);
               }
            }

            //if (!xml.attributes.length && !xml.firstChild) o = null;
            if (!xml.firstChild) o = null;

         }
         else
            X.err("unhandled node type: " + xml.nodeType);

         return o;
      },
      toJson: function(o, ind) {
         var json = "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++) {
               // strings usually follow the colon, but in arrays we must add the usual indent
               var extra_indent = "";
               if ( typeof(o[i]) == "string" )
                   extra_indent = ind+"\t";
               o[i] = extra_indent + X.toJson(o[i], ind+"\t");
            }
            json += "[" + (o.length > 1 ? ("\n"+o.join(",\n")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += "null";
         else if (typeof(o) == "string")
            json += "\"" + o.toString() + "\"";
         else if (typeof(o) == "object") {
            json += ind+"{";
            // Count the members in o
            var i = 0;
            for (var member in o) 
                i++;
            // ...so that we know when we are at the last element when doing this
            for (var member in o) {
                json += "\n"+ ind + "\t\"" + member + "\":" + X.toJson(o[member], ind+"\t");
                json += (i > 1 ? "," : "\n"+ind ); 
                i--;
            }
            json += "}";            
         }
         else
            json += o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = ""
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      },
      parseXml: function(xmlString) {
         var dom = null;
            var xml = require("libxml");
            dom = xml.parseFromString(xmlString);
         return dom;
      }
   };

   return X;
}

function xml2json(xml, tab) {
   var X = xml2json_translator();
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
   var o = X.toObj(X.removeWhite(xml));
   var json = X.toJson(o, "");
   // If tab given, do pretty print, otherwise remove white space
   return (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, ""));
}

// node.js
if ( typeof module != 'undefined' ) {
    module.exports = xml2json_translator();
}

// 动态头条

(function(d){function m(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function j(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function g(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:m()}});var k=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(k,function(b,a){d.Tween.propHooks[a]={get:function(c){return d(c.elem).css(a)},set:function(c){var e=c.elem.style,i=g(d(c.elem).css(a)),h=g(c.end);c.run=function(f){e[a]=j(i,h,f)}}}});d.Tween.propHooks.borderColor={set:function(b){var a=b.elem.style,c=[],e=k.slice(2,6);d.each(e,function(h,f){c[f]=g(d(b.elem).css(f))});var i=g(b.end);b.run=function(h){d.each(e,function(f,l){a[l]=j(c[l],i,h)})}}}})(jQuery);(function(e){e.fn.smarticker=function(t){var n=e.extend({},e.fn.smarticker.defaults,t);return this.each(function(t){function h(t,n){var r=[];e.each(t,function(t,i){if(e.inArray(e(i).data(n),r)==-1&&e(i).data(n)!=undefined)r.push(e(i).data(n))});return p(r)}function p(e){for(var t,n,r=e.length;r;t=parseInt(Math.random()*r),n=e[--r],e[r]=e[t],e[t]=n);return e}function d(){if(n.category==false){v()}else{e(".active-ag",r).removeClass("active-ag");var t=e(".newsholder li",r).eq(u).data("category");t=e(".smarticker-category ul li",r).index(e('.smarticker-category ul li[data-category="'+t+'"]',r));e(".smarticker-category ul li",r).eq(t).addClass("active-ag");t=e(".active-ag",r);e(".smarticker-category",r).animate({scrollTop:t.offset().top-t.parent().offset().top+t.parent().scrollTop()},n.speed-n.speed/2.5,function(){if(n.subcategory!=false){v()}else{m()}var t=e(".newsholder",r).find("li").eq(u).data("color");if(t!=undefined&&n.catcolor!=false){e(".active-ag a",r).stop().animate({color:"#"+t},n.speed-n.speed/2.5)}else e(".active-ag a",r).stop().animate({color:"#999"},n.speed-n.speed/2.5)})}}function v(){if(n.subcategory==false){m();return false}e(".active-cat",r).removeClass("active-cat");var t=e(".newsholder li",r).eq(u).data("subcategory");t=e(".smarticker-cats li",r).index(e('.smarticker-cats li[data-subcategory="'+t+'"]',r));e(".smarticker-cats ul li",r).eq(t).addClass("active-cat");t=e(".active-cat",r);var i=t.parent();if(e(".catlist",r).length>0)i=e(".catlist",r);else i=e(".smarticker-cats",r);i.animate({scrollTop:Math.max(t.offset().top-i.offset().top+i.scrollTop(),0)},n.speed-n.speed/2.5,m);var s=e(".newsholder",r).find("li").eq(u).data("color");if(s!=undefined&&n.subcatcolor!=false){e(".smarticker-cats li",r).animate({backgroundColor:"#"+s},n.speed-n.speed/2.5)}else e(".smarticker-cats li",r).animate({backgroundColor:"#c3c3c3"},n.speed-n.speed/2.5)}function m(){e(".newsholder",r).css({display:"block",height:"100%"});f.css("width","100%").animate({width:0},n.pausetime);if(n.animation=="default"){if(e(".activeRollerItem",r).length>0){var t=e(".activeRollerItem",r);t.animate({top:-25,opacity:0},n.speed-n.speed/1.2,function(){t.css("display","none")}).removeClass("activeRollerItem")}var i=e(".newsholder",r).find("li").eq(u).addClass("activeRollerItem");i.css({top:"25px",display:"block"}).animate({opacity:1,top:0},n.speed-n.speed/2.5,function(){u++;if(u==e(".newsholder",r).find("li").length)u=0;nextInterval=setTimeout(d,n.pausetime)})}if(n.animation=="slide"){if(e(".activeRollerItem",r).length>0){t=e(".activeRollerItem",r);t.animate({left:250,opacity:0},n.speed-n.speed/1.5,function(){t.css("display","none")}).removeClass("activeRollerItem")}var i=e(".newsholder li",r).eq(u).addClass("activeRollerItem");i.css({left:"-150px",display:"block",opacity:"1"}).animate({opacity:1,left:10},n.speed-n.speed/3,function(){u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)})}if(n.animation=="fade"){if(e(".activeRollerItem",r).length>0){t=e(".activeRollerItem",r);t.fadeOut(n.speed/2,function(){t.removeClass("activeRollerItem")})}var i=e(".newsholder li",r).eq(u).addClass("activeRollerItem");i.css({top:"0",display:"none"}).fadeIn(n.speed/2,function(){u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)})}if(n.animation=="typing"){if(e(".activeRollerItem",r).length>0){t=e(".activeRollerItem",r);var s=e('<div class="hider"></div>');s.prependTo(e(".smarticker-news",r)).css({width:"0px",left:"0px",height:"100%",position:"absolute","background-color":r.css("background-color"),"z-index":"2"});s.animate({width:t.width()+30},n.speed,function(){t.fadeOut(100,function(){t.css("opacity","0").removeClass("activeRollerItem");s.fadeOut(100,function(){var t=e(".newsholder li",r).eq(u).addClass("activeRollerItem").css({display:"block",opacity:"1"});s.remove();var i=e('<div class="cover"><div class="flasher">_</div></div>');i.prependTo(e(".smarticker-news",r));i.css({"background-color":r.css("background-color")});i.animate({left:t.width()+30},t.width()*8,function(){i.remove();u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)})})})})}else{var i=e(".newsholder li",r).eq(u).addClass("activeRollerItem").css({display:"block",opacity:"1"});var o=e('<div class="cover"><div class="flasher">_</div></div>');o.prependTo(e(".smarticker-news",r));o.css({"background-color":r.css("background-color")});o.animate({left:i.width()+30},i.width()*8,function(){o.remove();if(c==0){u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)}})}}}var r=e(this);var i=e("li",r);var s=e('<div class="smarticker-cats"><ul></ul></div>');var o=e('<div class="smarticker-category"><ul></ul></div>');var u=n.startindex;var a=e('<div class="smart-controller"><span class="prev-news">Previous</span><span class="next-news">Next</span></div>');var f=e('<div class="progress-bar"></div>');var l=e('<div class="sec1-2 tickertitle"></div>');var c=0;r.addClass("smarticker").wrapInner('<div class="smarticker-news"></div>');if(h(i,"subcategory").length<1)n.subcategory=false;if(h(i,"category").length<1)n.category=false;if(n.subcategory==true){s.prependTo(r).addClass("sec1-2");e.each(h(i,"subcategory"),function(e,t){s.find("ul").append('<li data-subcategory="'+t+'"><a>'+t+"</a></li>")});if(n.theme==1||n.theme==2){s.find("ul").wrap('<div class="catlist"></div>');s.append('<span class="right"></span>').prepend('<span class="left"></span>')}}if(n.category==true&&h(i,"category").length>0){o.prependTo(r).addClass("sec1-2");e.each(h(i,"category"),function(e,t){o.find("ul").append('<li data-category="'+t+'"><a>'+t+"</a></li>")})}if(n.progressbar==true)f.appendTo(e(".smarticker-news",r));if(n.controller==true)a.appendTo(e(".smarticker-news",r));if(n.category==false)r.addClass("no-category");if(n.subcategory==false)r.addClass("no-subcategory");r.addClass("theme"+n.theme);r.addClass("box size1");r.addClass("c"+n.controllertype);e(".smarticker-news",r).addClass("sec7 newsholder hidden");e(".smarticker-news > ul",r).attr("id","newsholder").addClass("newsholder hidden");if(n.rounded==true)r.addClass("rounded");if(n.direction=="rtl")r.addClass("rtl");if(n.border==true)r.addClass("border");if(n.shadow==true)r.addClass("shadow");if(n.category==false||n.subcategory==false){e(".smarticker-news",r).removeClass("sec7").addClass("sec10")}if(n.category==false&&n.subcategory==false&&n.titlesection==true){e(".smarticker-news",r).removeClass("sec7").addClass("sec10");l.prependTo(r).text(n.title)}d()})};e.fn.smarticker.defaults={theme:1,animation:"default",speed:1e3,startindex:0,pausetime:3e3,rounded:false,shadow:true,border:false,category:true,subcategory:true,titlesection:true,title:"",progressbar:false,catcolor:true,subcatcolor:true}})(jQuery)


