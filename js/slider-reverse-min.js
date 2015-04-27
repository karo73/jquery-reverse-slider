/*
*
* Author Karo Hakobyan
*
*/

"use strict";!function(e){e.fn.sliderReverse=function(t){var a=e.extend({animateType:!1,autoPlaySpeed:!1,btnsText:{next:"",prev:"",play:"",pause:""},hoverPause:!1,navigation:!1,speed:"normal",swipe:!1,swipeLimit:!1,responsive:!1,width:"100%"},t);return this.each(function(t,n){if(e(".slider-box",e(n)).size()>1){var r={};r.wrapper=e(n).width(a.width),r.current=1,r.content=e('<div class="slider-content" style="overflow: hidden;"></div>'),r.engine=e('<div class="slider-engine"></div>'),r.next=e('<span class="slider-btns slider-next">'+a.btnsText.next+"</span>"),r.prev=e('<span class="slider-btns slider-prev">'+a.btnsText.prev+"</span>"),r.autoPlay=e('<span class="slider-play-toggle" data-pause="'+a.btnsText.pause+'" data-play="'+a.btnsText.play+'">'+a.btnsText.pause+"</span>"),r.navList=e('<ul class="slider-nav"></ul>'),r.count=e(".slider-box",r.wrapper).size(),r.engine.append(e(".slider-box",r.wrapper).width(r.wrapper.width())),r.content.append(r.engine.width(r.wrapper.width()*r.count)),r.wrapper.append(r.content,r.prev,r.next),r.sliderAnimate=function(t,n){a.navigation&&(e(".slider-nav-items.active",r.wrapper).removeClass("active"),e(".slider-nav-items",r.wrapper).eq(n-1).addClass("active")),r.engine.stop(!1,!0).animate({marginLeft:t+"px"},a.speed,a.animateType,function(){r.engine.removeClass("moving")})},a.navigation&&(e(".slider-box",r.wrapper).each(function(t){r.navList.append(e("<li class='slider-nav-items"+(0==t?" active":"")+"' data-index='"+(t+1)+"'>"+(t+1)+"</li>"))}),r.wrapper.append(r.navList),e(".slider-nav-items",r.wrapper).click(function(){var t=e(this).data("index");r.current!=t&&r.sliderAnimate("-"+r.wrapper.width()*(t-1),r.current=t)})),a.autoPlaySpeed&&(r.next.after(r.autoPlay),r.interval=function(e){r.timer=setInterval(function(){r.current<r.count?r.sliderAnimate("-="+r.wrapper.width(),++r.current):r.sliderAnimate(0,r.current=1)},e)},r.interval(a.autoPlaySpeed),r.autoPlay.click(function(){r.autoPlay.hasClass("pause")?(r.autoPlay.removeClass("pause").text(r.autoPlay.data("pause")),r.interval(a.autoPlaySpeed)):(r.autoPlay.addClass("pause").text(r.autoPlay.data("play")),clearInterval(r.timer))}),a.hoverPause&&e(".slider-box, .slider-btns, .slider-nav",r.wrapper).hover(function(){r.autoPlay.hasClass("pause")||(r.autoPlay.addClass("stop").text(r.autoPlay.data("play")),clearInterval(r.timer))},function(){r.autoPlay.hasClass("pause")||(r.autoPlay.removeClass("stop").text(r.autoPlay.data("pause")),r.interval(a.autoPlaySpeed))})),a.responsive&&e(window).resize(function(){var t=e(this).width();r.wrapper.width(t),r.engine.stop(!1,!0).css({marginLeft:1==r.current?"0px":"-"+t*(r.current-1)+"px",width:t*r.count+"px"}),e(".slider-box",r.wrapper).width(t)}),r.next.click(function(){r.current<r.count?r.sliderAnimate("-="+r.wrapper.width(),++r.current):r.sliderAnimate(0,r.current=1)}),r.prev.click(function(){1<r.current?r.sliderAnimate("+="+r.wrapper.width(),--r.current):r.sliderAnimate("-"+r.wrapper.width()*(r.count-1),r.current=r.count)}),a.swipe&&(r.linkPreventClick=function(e){e.click(function(){return r.engine.hasClass("moving")?!1:void 0})},r.engine.swipe({threshold:0,excludedElements:"button, input, select, textarea, .noSwipe",allowPageScroll:"vertical",swipeStatus:function(t,n,i,s){if("left"==i&&s){r.engine.addClass("moving"),r.linkPreventClick(e(".slider-box",r.wrapper));var p=r.wrapper.width()*(r.current-1)+s;r.engine.stop().css("margin-left","-"+p+"px"),s>a.swipeLimit&&"end"==n?r.current<r.count?r.sliderAnimate("-"+r.wrapper.width()*r.current,++r.current):r.sliderAnimate("-"+r.wrapper.width()*(r.count-1),r.current):s<a.swipeLimit&&"end"==n&&r.sliderAnimate("-"+r.wrapper.width()*(r.current-1),r.current)}if("right"==i&&s){r.engine.addClass("moving"),r.linkPreventClick(e(".slider-box",r.wrapper));var p=r.wrapper.width()*(r.current-1);1==r.current?r.engine.stop().css("margin-left",p+s+"px"):r.engine.stop().css("margin-left","-"+(p-s)+"px"),s>a.swipeLimit&&"end"==n?r.current>1?r.sliderAnimate("-"+r.wrapper.width()*(r.current-2),--r.current):r.sliderAnimate(0,r.current=1):s<a.swipeLimit&&"end"==n&&r.sliderAnimate("-"+r.wrapper.width()*(r.current-1),r.current)}}}))}})}}(jQuery);
