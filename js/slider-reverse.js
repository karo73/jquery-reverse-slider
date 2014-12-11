/*
*
* Author Karo Hakobyan
*
*/

"use strict";

(function($){
	
	$.fn.sliderReverse = function(options){
			
		var settings = $.extend({
				autoPlaySpeed : false,
				btnsText      : {
					next      : "",
					prev      : "",
					play      : "",
					pause     : ""
				},
				hoverPause    : false,
				navigation    : false,
				speed         : "normal",
				swipe         : false,
				responsive    : false,
				width         : "100%"
			}, options);
	
		return this.each(function(i, elem){
		
			if ($(".slider-box", $(elem)).size() > 1) {
				
				var rs = {};
				
					rs.wrapper  = $(elem).width(settings.width);
					rs.current  = 1;
					rs.content  = $('<div class="slider-content" style="overflow: hidden;"></div>');
					rs.engine   = $('<div class="slider-engine"></div>');
					rs.next     = $('<span class="slider-btns slider-next">' + settings.btnsText.next + '</span>');
					rs.prev     = $('<span class="slider-btns slider-prev">' + settings.btnsText.prev + '</span>');
					rs.autoPlay = $('<span class="slider-play-toggle" data-pause="' + settings.btnsText.pause + '" data-play="' + settings.btnsText.play + '">' + settings.btnsText.pause + '</span>');
					rs.navList  = $('<ul class="slider-nav"></ul>');
					
					// Init slider
					
					rs.count = $(".slider-box", rs.wrapper).size();
					
					rs.engine.append($(".slider-box", rs.wrapper).width(rs.wrapper.width()));
					rs.content.append(rs.engine.width(rs.wrapper.width() * rs.count));
					rs.wrapper.append(rs.content, rs.prev, rs.next);
					
					// Slider animate fn
					
					rs.sliderAnimate = function (point, curElem) {
					
						if (settings.navigation) {
							$(".slider-nav-items.active", rs.wrapper).removeClass("active");
							$(".slider-nav-items", rs.wrapper).eq(curElem - 1).addClass("active");
						}
						
						rs.engine.stop(false, true).animate({marginLeft: point + "px"}, settings.speed);
					}
					
					// Pagination
					
					if (settings.navigation) {
					
						$(".slider-box", rs.wrapper).each(function(i, elem){
							rs.navList.append($("<li class='slider-nav-items" + ((i == 0) ? " active" : "") + "' data-index='" + (i+1) + "'>" + (i+1) + "</li>"));
						});
						
						rs.wrapper.append(rs.navList);
						
						$(".slider-nav-items", rs.wrapper).click(function(){
							var dataIndex = $(this).data("index");
							if (rs.current != dataIndex) {
								rs.sliderAnimate("-" + (rs.wrapper.width() * (dataIndex - 1)), rs.current = dataIndex);
							}
						});
						
					}
					
					// Auto play
					
					if (settings.autoPlaySpeed) {
						rs.next.after(rs.autoPlay);
						
						rs.interval = function (autoPlaySpeed) {
							rs.timer = setInterval(function(){
								(rs.current < rs.count) ? rs.sliderAnimate("-=" + rs.wrapper.width(), ++rs.current) : rs.sliderAnimate(0, rs.current = 1);
							}, autoPlaySpeed);
						}
						rs.interval(settings.autoPlaySpeed);
					
						rs.autoPlay.click(function(){
							if (!rs.autoPlay.hasClass("pause")) {
								rs.autoPlay.addClass("pause").text(rs.autoPlay.data("play"));
								clearInterval(rs.timer);
							} else {
								rs.autoPlay.removeClass("pause").text(rs.autoPlay.data("pause"));
								rs.interval(settings.autoPlaySpeed);
							}
						});
						
						if (settings.hoverPause) {
							$(".slider-box, .slider-btns, .slider-nav", rs.wrapper).hover(function(){
								if (!rs.autoPlay.hasClass("pause")) {
									rs.autoPlay.addClass("stop").text(rs.autoPlay.data("play"));
									clearInterval(rs.timer);
								}
							}, function(){
								if (!rs.autoPlay.hasClass("pause")) {
									rs.autoPlay.removeClass("stop").text(rs.autoPlay.data("pause"));
									rs.interval(settings.autoPlaySpeed);
								}
							});
						}
					}
					
					// Responsive
					
					if (settings.responsive) {
						$(window).resize(function(){
							var selfWidth = $(this).width();
							rs.wrapper.width(selfWidth);
							rs.engine.stop(false, true).css({
								marginLeft : (rs.current == 1) ? "0px" : "-" + (selfWidth * (rs.current - 1)) + "px",
								width      : (selfWidth * rs.count) + "px"
							});
							$(".slider-box", rs.wrapper).width(selfWidth);
						});
					}
					
					// Slider buttons
					
					rs.next.click(function(){
						(rs.current < rs.count) ? rs.sliderAnimate("-=" + rs.wrapper.width(), ++rs.current) : rs.sliderAnimate(0, rs.current = 1);
					});
					
					rs.prev.click(function(){
						(1 < rs.current) ? rs.sliderAnimate("+=" + rs.wrapper.width(), --rs.current) : rs.sliderAnimate("-" + rs.wrapper.width() * (rs.count - 1), rs.current = rs.count);
					});
					
					// Swipe
					
					if (settings.swipe) {
						rs.engine.swipe({
							swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
								(direction == "left") ? rs.next.click() : (direction == "right") ? rs.prev.click() : null;
							},
							threshold:0,
							fingers:'all'
						});
					}
			
			}
			
		});
	};
	
})(jQuery);