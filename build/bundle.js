(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/** ********************************************** **
	@Author			Dorin Grigoras
	@Website		www.stepofweb.com
	@Last Update	Friday, August 21, 2015

	NOTE! 	Do not change anything here if you want to
			be able to update in the future! Please use
			your custom script (eg. custom.js).


	TABLE CONTENTS
	-------------------------------


	INLINE SCRIPTS
	-------------------------------
		COUNT TO
			https://github.com/mhuggins/jquery-countTo

		BROWSER DETECT

		Appear
			https://github.com/bas2k/jquery.appear/
			
		Parallax
			http://www.ianlunn.co.uk/plugins/jquery-parallax/

		jQuery Easing v1.3
			http://gsgd.co.uk/sandbox/jquery/easing/

		WOW - v1.0.3
			http://mynameismatthieu.com/WOW/

		Modernizr 2.7.1
			http://modernizr.com/download/#-csstransforms3d-csstransitions-video-touch-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
*************************************************** **/
	window.width = jQuery(window).width();

	/* Init */
	jQuery(window).ready(function () {
		jQuery.browserDetect();

		// Load Bootstrap JS
		loadScript(plugin_path + 'bootstrap/js/bootstrap.min.js', function() {

			Init(false);

		});


		/* --- */
		if(jQuery("html").hasClass("chrome") && jQuery("body").hasClass("smoothscroll")) {
			loadScript(plugin_path + 'smoothscroll.js', function() {
				jQuery.smoothScroll();
			});
		}
		/* --- */
	});


/** Init
	Ajax Reinit:		Init(true);
 **************************************************************** **/
	function Init(is_ajax) {

		// First Load Only
		if(is_ajax != true) {
		
			_afterResize();
			_slider_full();
			_topNav();
			_sideNav();
			_stickyFooter();
			_infiniteScroll();

		}

		// Reinit on Ajax
		_owl_carousel();
		_flexslider();
		_popover();
		_lightbox();
		_mixitup();
		_animate();
		_onepageNav();
		_scrollTo(false, 0);
		_parallax();
		_video();
		_youtubeBG();
		_toggle();
		_placeholder();
		_wrotate();
		_lazyload();
		_misc();
		_countDown();
		_masonryGallery();
		_toastr(false,false,false,false);
		_charts();
		_select2();
		_form();
		_pickers();
		_editors();
		_pajinate();
		_zoom();
		_autosuggest();
		_stepper();
		_slimScroll();
		_modalAutoLoad();
		_bgimage();
		_widget_flickr();
		_widget_twitter();
		_widget_facebook();
		_widget_dribbble();
		_widget_media();

		/** Bootstrap Tooltip **/ 
		jQuery("a[data-toggle=tooltip], button[data-toggle=tooltip], span[data-toggle=tooltip]").tooltip();
	}



/** Preloader
 **************************************************************** **/
	if(jQuery('#preloader').length > 0) {

		jQuery(window).load(function() {
			
			jQuery('#preloader').fadeOut(1000, function() {
				jQuery('#preloader').remove();
			});

			// setTimeout(function() {}, 1000); 
		  
		});

	}



/** After Resize
 **************************************************************** **/
	function _afterResize() {

		/* 
			IMPORTAT!
			We need .load() to avoid conflicts
		*/
		jQuery(window).load(function() {
			"use strict";

			// On Resize
			jQuery(window).resize(function() {

				if(window.afterResizeApp) {
					clearTimeout(window.afterResizeApp);
				}

				window.afterResizeApp = setTimeout(function() {

					/**
						After Resize Code
						.................
					**/

					_slider_full();
					window.width = jQuery(window).width();

					// Resize Flex Slider if exists!
					if(jQuery('.flexslider').length > 0) {
						jQuery('.flexslider').resize();
					}

				}, 300);

			});

		});

	}



/** Load Script

	USAGE
	var pageInit = function() {}
	loadScript(plugin_path + "script.js", function);

	Load multiple scripts and call a final function
	loadScript(plugin_path + "script1.js", function(){
		loadScript(plugin_path + "script2.js", function(){
			loadScript(plugin_path + "script3.js", function(){
				loadScript(plugin_path + "script4.js", function);
			});
		});
	});
 **************************************************************** **/
	var _arr 	= {};
	function loadScript(scriptName, callback) {

		if (!_arr[scriptName]) {
			_arr[scriptName] = true;

			var body 		= document.getElementsByTagName('body')[0];
			var script 		= document.createElement('script');
			script.type 	= 'text/javascript';
			script.src 		= scriptName;

			// then bind the event to the callback function
			// there are several events for cross browser compatibility
			// script.onreadystatechange = callback;
			script.onload = callback;

			// fire the loading
			body.appendChild(script);

		} else if (callback) {

			callback();

		}

	};


 
/** 00. Slider Full Height
 **************************************************************** **/
	function _slider_full() {
		_headerHeight = 0;

		if(jQuery("#header").hasClass('transparent') || jQuery("#header").hasClass('translucent')) {
			_headerHeight = 0;
		} else {
			_headerHeight = jQuery("#header").outerHeight();
			
			if(jQuery("#topBar").length > 0) {
				_headerHeight = _headerHeight + jQuery("#topBar").outerHeight();
			}
		}

		_screenHeight = jQuery(window).height() - _headerHeight;

		jQuery("#slider.fullheight").height(_screenHeight);
	}



/** 01. Top Nav
 **************************************************************** **/
	function _topNav() {
		window.scrollTop 	= 0;
		var _header_el 		= jQuery("#header");

		jQuery(window).scroll(function() {
			_toTop();
		});

		/* Scroll To Top */
		function _toTop() {
			_scrollTop = jQuery(document).scrollTop();
			
			if(_scrollTop > 100) {

				if(jQuery("#toTop").is(":hidden")) {
					jQuery("#toTop").show();
				}

			} else {

				if(jQuery("#toTop").is(":visible")) {
					jQuery("#toTop").hide();
				}

			}

		}


		// Mobile Submenu
		var addActiveClass 	= false;
		jQuery("#topMain a.dropdown-toggle").bind("click", function(e) {
			
			if(jQuery(this).attr('href') == "#") {
				e.preventDefault();
			}

			addActiveClass = jQuery(this).parent().hasClass("resp-active");
			jQuery("#topMain").find(".resp-active").removeClass("resp-active");

			if(!addActiveClass) {
				jQuery(this).parents("li").addClass("resp-active");
			}

			return;

		});


		// Srearch
		jQuery('li.search i.fa').click(function () {
			if(jQuery('#header .search-box').is(":visible")) {
				jQuery('#header .search-box').fadeOut(300);
			} else {
				jQuery('.search-box').fadeIn(300);
				jQuery('#header .search-box form input').focus();

				// hide quick cart if visible
				if (jQuery('#header li.quick-cart div.quick-cart-box').is(":visible")) {
					jQuery('#header li.quick-cart div.quick-cart-box').fadeOut(300);
				}
			}
		}); 

		// close search box on body click
		if(jQuery('#header li.search i.fa').size() != 0) {
			jQuery('#header .search-box, #header li.search i.fa').on('click', function(e){
				e.stopPropagation();
			});

			jQuery('body').on('click', function() {
				if(jQuery('#header li.search .search-box').is(":visible")) {
					jQuery('#header .search-box').fadeOut(300);
				}
			});
		}

		jQuery(document).bind("click", function() {
			if(jQuery('#header li.search .search-box').is(":visible")) {
				jQuery('#header .search-box').fadeOut(300);
			}
		});


		// Close Fullscreen Search
		jQuery("#closeSearch").bind("click", function(e) {
			e.preventDefault();

			jQuery('#header .search-box').fadeOut(300);
		});



		// Page Menu [mobile]
		jQuery("button#page-menu-mobile").bind("click", function() {
			jQuery(this).next('ul').slideToggle(150);
		});


		// Quick Cart
		jQuery('li.quick-cart>a').click(function (e) {
			e.preventDefault();
			
			var _quick_cart_box = jQuery('li.quick-cart div.quick-cart-box');

			if(_quick_cart_box.is(":visible")) {
				_quick_cart_box.fadeOut(300);
			} else {
				_quick_cart_box.fadeIn(300);

				// close search if visible
				if(jQuery('li.search .search-box').is(":visible")) {
					jQuery('.search-box').fadeOut(300);
				}
			}
		});
		// close quick cart on body click
		if(jQuery('li.quick-cart>a').size() != 0) {
			jQuery('li.quick-cart').on('click', function(e){
				e.stopPropagation();
			});

			jQuery('body').on('click', function() {
				if (jQuery('li.quick-cart div.quick-cart-box').is(":visible")) {
					jQuery('li.quick-cart div.quick-cart-box').fadeOut(300);
				}
			});
		}


		// Page Menu [scrollTo]
		jQuery("#page-menu ul.menu-scrollTo>li").bind("click", function(e) {

			// calculate padding-top for scroll offset
			var _href 	= jQuery('a', this).attr('href');
			
			if(!jQuery('a', this).hasClass('external')) {
				e.preventDefault();

				jQuery("#page-menu ul.menu-scrollTo>li").removeClass('active');
				jQuery(this).addClass('active');

				if(jQuery(_href).length > 0) {

					_padding_top = 0;

					if(jQuery("#header").hasClass('sticky')) {
						_padding_top = jQuery(_href).css('padding-top');
						_padding_top = _padding_top.replace('px', '');
					}

					jQuery('html,body').animate({scrollTop: jQuery(_href).offset().top - _padding_top}, 800, 'easeInOutExpo');

				}

			}

		});
	

		// BOTTOM NAV
		if(_header_el.hasClass('bottom')) {

			// Add dropup class
			_header_el.addClass('dropup');
			window.homeHeight 	= jQuery(window).outerHeight() - 55;
		

			// sticky header
			if(_header_el.hasClass('sticky')) {
				window.isOnTop 		= true;


				// if scroll is > 60%, remove class dropup
				jQuery(window).scroll(function() {
					if(jQuery(document).scrollTop() > window.homeHeight / 2) {
						_header_el.removeClass('dropup');
					} else {
						_header_el.addClass('dropup');
					}
				});


				// Add fixed|not fixed & dropup|no dropup
				jQuery(window).scroll(function() {
					if(jQuery(document).scrollTop() > window.homeHeight) {
						if(window.isOnTop === true) {
							jQuery('#header').addClass('fixed');
							_header_el.removeClass('dropup');
							window.isOnTop = false;
						}
					} else {
						if(window.isOnTop === false) {
							jQuery('#header').removeClass('fixed');
							_header_el.addClass('dropup');
							window.isOnTop = true;
						}
					}
				});

				// get window height on resize
				jQuery(window).resize(function() {
					window.homeHeight = jQuery(window).outerHeight();
				});

			}

		} else

		// STICKY
		if(_header_el.hasClass('sticky')) {

			jQuery(window).scroll(function() {
				if(window.width > 768) {

					var _scrollTop 	= jQuery(document).scrollTop();
						_topBar_H 	= jQuery("#topBar").outerHeight() || 0;

					if(_scrollTop > _topBar_H) {
						_header_el.addClass('fixed');

						_header_H = _header_el.outerHeight() || 0;

						if(!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
							jQuery('body').css({"padding-top":_header_H+"px"});
						}

					} else {
						if(!_header_el.hasClass('transparent') && !_header_el.hasClass('translucent')) {
							jQuery('body').css({"padding-top":"0px"});
						}

						_header_el.removeClass('fixed');
					}

				}
			});

		} else 
		
		if(_header_el.hasClass('static')) {
			// _header_H = _header_el.outerHeight() + "px";
			// jQuery('body').css({"padding-top":_header_H});
		}



		// Slide Top
		jQuery("#slidetop a.slidetop-toggle").bind("click", function() {
			jQuery("#slidetop .container").slideToggle(150, function() {

				if(jQuery("#slidetop .container").is(":hidden")) {
					jQuery("#slidetop").removeClass('active');
				} else {
					jQuery("#slidetop").addClass('active');
				}

			});
		});
		// 'esc' key
		jQuery(document).keyup(function(e) {
			if(e.keyCode == 27) {
				if(jQuery("#slidetop").hasClass("active")) {
					jQuery("#slidetop .container").slideToggle(150, function() {
						jQuery("#slidetop").removeClass('active');
					});
				}
			}
		});

		// Slide Panel
		jQuery("a#sidepanel_btn").bind("click", function(e) {
			e.preventDefault();

			_pos = "right";
			if(jQuery("#sidepanel").hasClass('sidepanel-inverse')) {
				_pos = "left";
			}

			if(jQuery("#sidepanel").is(":hidden")) {

				jQuery("body").append('<span id="sidepanel_overlay"></span>');

				if(_pos == "left") {
					jQuery("#sidepanel").stop().show().animate({"left":"0px"}, 150);
				} else {
					jQuery("#sidepanel").stop().show().animate({"right":"0px"}, 150);
				}

			} else {

				jQuery("#sidepanel_overlay").remove();

				if(_pos == "left") {
					jQuery("#sidepanel").stop().animate({"left":"-300px"}, 300);
				} else {
					jQuery("#sidepanel").stop().animate({"right":"-300px"}, 300);
				}

				setTimeout(function() {
					jQuery("#sidepanel").hide();
				}, 500);

			}
			
			_sidepanel_overlay();

		});
		// button close
		jQuery("#sidepanel_close").bind("click", function(e) {
			e.preventDefault();
			jQuery("a#sidepanel_btn").trigger('click');
		});
		// overlay click
		function _sidepanel_overlay() {
			jQuery("#sidepanel_overlay").unbind();
			jQuery("#sidepanel_overlay").bind("click", function() {
				jQuery("a#sidepanel_btn").trigger('click');
			});
		}
		// 'esc' key
		jQuery(document).keyup(function(e) {
			if(e.keyCode == 27) {
				if(jQuery("#sidepanel").is(":visible")) {
					jQuery("a#sidepanel_btn").trigger('click');
				}
			}
		});



		/** OVERLAY MENU
		 *************************** **/
		if(jQuery("#menu_overlay_open").length > 0) {
			var is_ie9 = jQuery('html').hasClass('ie9') ? true : false;

			if(is_ie9 == true) {
				jQuery("#topMain").hide();
			}

			// open
			jQuery("#menu_overlay_open").bind("click", function(e) {
				e.preventDefault();
				
				jQuery('body').addClass('show-menu');

				if(is_ie9 == true) {
					jQuery("#topMain").show();
				}
			});

			// close
			jQuery("#menu_overlay_close").bind("click", function(e) {
				e.preventDefault();

				if(jQuery('body').hasClass('show-menu')) {
					jQuery('body').removeClass('show-menu');
				}

				if(is_ie9 == true) {
					jQuery("#topMain").hide();
				}
			});

			// 'esc' key
			jQuery(document).keyup(function(e) {
				if(e.keyCode == 27) {
					if(jQuery('body').hasClass('show-menu')) {
						jQuery('body').removeClass('show-menu');
					}

					if(is_ie9 == true) {
						jQuery("#topMain").hide();
					}
				}
			});

		}

		/** VERTICAL MENU SHOW|HIDE
		 *************************** **/
		// RTL supported!
		if(jQuery("#sidebar_vertical_btn").length > 0) {
			if(jQuery("body").hasClass('menu-vertical-hide')) {

				// Determine the position (left or right?)
				_paddingStatusL = jQuery("#mainMenu.sidebar-vertical").css('left');
				_paddingStatusR = jQuery("#mainMenu.sidebar-vertical").css('right');

				if(parseInt(_paddingStatusL) < 0) {
					var _pos = "left";
				} else

				if(parseInt(_paddingStatusR) < 0) {
					var _pos = "right";
				}

				else {
					var _pos = "left";
				}

				// Show|Hide Vertical Menu
				jQuery("#sidebar_vertical_btn").bind("click", function(e) {

					_paddingStatus = jQuery("#mainMenu.sidebar-vertical").css(_pos);

					if(parseInt(_paddingStatus) < 0) {
						if(_pos == "right") {
							jQuery("#mainMenu.sidebar-vertical").stop().animate({"right":"0px"}, 200);
						} else {
							jQuery("#mainMenu.sidebar-vertical").stop().animate({"left":"0px"}, 200);
						}
					} else {
						if(_pos == "right") {
							jQuery("#mainMenu.sidebar-vertical").stop().animate({"right":"-263px"}, 200);
						} else {
							jQuery("#mainMenu.sidebar-vertical").stop().animate({"left":"-263px"}, 200);
						}
					}
				});

				// Hide on scroll
				jQuery(window).scroll(function() {

					_paddingStatus = parseInt(jQuery("#mainMenu.sidebar-vertical").css(_pos));

					if(_paddingStatus >= 0) {
						if(_pos == "right") {
							jQuery("#mainMenu.sidebar-vertical").stop().animate({"right":"-263px"}, 200);
						} else {
							jQuery("#mainMenu.sidebar-vertical").stop().animate({"left":"-263px"}, 200);
						}
					}

				});

			}
		}

		// quick cart & search for mobile - top calculate
		// Quick Cart & top Search Fix (if #topBar exists).
		if(jQuery("#topBar").length > 0) {
			jQuery("#topNav ul").addClass('has-topBar');
		}
		
		// Hide Cart & Search on Scroll
		jQuery(window).scroll(function() {
			if(window.width < 769) {
				// hide quick cart if visible
				if (jQuery('#header li.quick-cart div.quick-cart-box').is(":visible")) {
					jQuery('#header li.quick-cart div.quick-cart-box').fadeOut(0);
				}
				// hide search if visible
				if(jQuery('#header li.search .search-box').is(":visible")) {
					jQuery('#header .search-box').fadeOut(0);
				}
			}
		});
	}




/** 02. Side Nav
 **************************************************************** **/
	function _sideNav() {

		/* Mobile Button */
		jQuery("div.side-nav").each(function() {
			var _t = jQuery('ul', this);
			jQuery('button', this).bind("click", function() {
				_t.slideToggle(300);
			});
		});


		/* Submenus */
		jQuery("div.side-nav>ul>li>a.dropdown-toggle").bind("click", function(e) {
			e.preventDefault();

			jQuery(this).next('ul').slideToggle(200);
			jQuery(this).closest('li').toggleClass('active');
		});

	}



/** 02. Animate

	EXAMPLE USAGE
	<img class="wow fadeInUp" data-wow-delay="0.1s" src="image.jpg" alt="" />
 **************************************************************** **/
	function _animate() {

		if(jQuery("body").hasClass('enable-animation')) {

			var wow = new WOW({
				boxClass: 		'wow',
				animateClass: 	'animated',
				offset: 		90,
				mobile: 		false, 
				live: 			true 
			});   
			
			wow.init();

		}

		// Count To
        jQuery(".countTo").appear(function(){
			var _t 					= jQuery(this),
				_from 				= _t.attr('data-from') 				|| 0,
				_speed 				= _t.attr('data-speed') 			|| 1300,
				_refreshInterval 	= _t.attr('data-refreshInterval') 	|| 60;
				

            _t.countTo({
                from: 				parseInt(_from),
                to: 				_t.html(),
                speed: 				parseInt(_speed),
                refreshInterval: 	parseInt(_refreshInterval),
            });
            
        });
	}



/** Onepage Nav
 **************************************************************** **/
	function _onepageNav() {
		var _container = jQuery("#topMain.nav-onepage");

		if(_container.length > 0) {

			loadScript(plugin_path + 'jquery.nav.min.js', function() {

				jQuery(_container).onePageNav({
					currentClass: 		'active',
					changeHash: 		false,
					scrollSpeed: 		750,
					scrollThreshold: 	0.5,
					filter: 			':not(.external)',
					easing: 			'easeInOutExpo'
				});

			});
		
		}

	}



/** 03. OWL Carousel
 **************************************************************** **/
	function _owl_carousel() {
		var _container = jQuery("div.owl-carousel");

		if(_container.length > 0) {

			loadScript(plugin_path + 'owl-carousel/owl.carousel.min.js', function() {

				_container.each(function() {

					var slider 		= jQuery(this);
					var options 	= slider.attr('data-plugin-options');

					// Progress Bar
					var $opt = eval('(' + options + ')');  // convert text to json

					if($opt.progressBar == 'true') {
						var afterInit = progressBar;
					} else {
						var afterInit = false;
					}

					var defaults = {
						items: 					5,
						itemsCustom: 			false,
						itemsDesktop: 			[1199,4],
						itemsDesktopSmall: 		[980,3],
						itemsTablet: 			[768,2],
						itemsTabletSmall: 		false,
						itemsMobile: 			[479,1],
						singleItem: 			true,
						itemsScaleUp: 			false,

						slideSpeed: 			200,
						paginationSpeed: 		800,
						rewindSpeed: 			1000,

						autoPlay: 				false,
						stopOnHover: 			false,

						navigation: 			false,
						navigationText: [
											'<i class="fa fa-angle-left"></i>',
											'<i class="fa fa-angle-right"></i>'
										],
						rewindNav: 				true,
						scrollPerPage: 			false,

						pagination: 			true,
						paginationNumbers: 		false,

						responsive: 			true,
						responsiveRefreshRate: 	200,
						responsiveBaseWidth: 	window,

						baseClass: 				"owl-carousel",
						theme: 					"owl-theme",

						lazyLoad: 				false,
						lazyFollow: 			true,
						lazyEffect: 			"fade",

						autoHeight: 			false,

						jsonPath: 				false,
						jsonSuccess: 			false,

						dragBeforeAnimFinish: 	true,
						mouseDrag: 				true,
						touchDrag: 				true,

						transitionStyle: 		false,

						addClassActive: 		false,

						beforeUpdate: 			false,
						afterUpdate: 			false,
						beforeInit: 			false,
						afterInit: 				afterInit,
						beforeMove: 			false,
						afterMove: 				(afterInit == false) ? false : moved,
						afterAction: 			false,
						startDragging: 			false,
						afterLazyLoad: 			false
					}

					var config = jQuery.extend({}, defaults, options, slider.data("plugin-options"));
					slider.owlCarousel(config).addClass("owl-carousel-init");
					

					// Progress Bar
					var elem = jQuery(this);

					//Init progressBar where elem is $("#owl-demo")
					function progressBar(elem){
					  $elem = elem;
					  //build progress bar elements
					  buildProgressBar();
					  //start counting
					  start();
					}
				 
					//create div#progressBar and div#bar then prepend to $("#owl-demo")
					function buildProgressBar(){
					  $progressBar = jQuery("<div>",{
						id:"progressBar"
					  });
					  $bar = jQuery("<div>",{
						id:"bar"
					  });
					  $progressBar.append($bar).prependTo($elem);
					}

					function start() {
					  //reset timer
					  percentTime = 0;
					  isPause = false;
					  //run interval every 0.01 second
					  tick = setInterval(interval, 10);
					};

			 
					var time = 7; // time in seconds
					function interval() {
					  if(isPause === false){
						percentTime += 1 / time;
						$bar.css({
						   width: percentTime+"%"
						 });
						//if percentTime is equal or greater than 100
						if(percentTime >= 100){
						  //slide to next item 
						  $elem.trigger('owl.next')
						}
					  }
					}
				 
					//pause while dragging 
					function pauseOnDragging(){
					  isPause = true;
					}
				 
					//moved callback
					function moved(){
					  //clear interval
					  clearTimeout(tick);
					  //start again
					  start();
					}

				});

			});
		}

	}

	
/** 04. Flexslider
 **************************************************************** **/
	function _flexslider() {
		var _container = jQuery(".flexslider");
		
		if(_container.length > 0) {

			loadScript(plugin_path + 'slider.flexslider/jquery.flexslider-min.js', function() {

				if(jQuery().flexslider) {
					var	_controlNav 	= _container.attr('data-controlNav'),
						_slideshowSpeed = _container.attr('data-slideshowSpeed') || 7000,
						_pauseOnHover	= _container.attr('data-pauseOnHover') || false;

					if(_pauseOnHover == "true") {
						_pauseOnHover = true;
					} else{
						_pauseOnHover = false;
					}

					if(_controlNav == 'thumbnails') {
						_controlNav = 'thumbnails';
					} else
					if(_controlNav == 'true') {
						_controlNav = true;
					} else
					if(_controlNav == 'false') {
						_controlNav = false;
					} else {
						_controlNav = true;
					}
					
					if(_controlNav == 'thumbnails' || _controlNav == false) {
						_directionNav = false;
					} else {
						_directionNav = true;
					}

					jQuery(_container).flexslider({
						animation		: "slide",
						controlNav		: _controlNav,
						slideshowSpeed	: parseInt(_slideshowSpeed) || 7000,
						directionNav 	: _directionNav,
						pauseOnHover	: _pauseOnHover,
						start: function(slider){
							jQuery('.flex-prev').html('<i class="fa fa-angle-left"></i>');
							jQuery('.flex-next').html('<i class="fa fa-angle-right"></i>');
						}
					});

					// Resize Flex Slider if exists!
					_container.resize();

				}

			});
		}
	}
	
	
	


/** 04. Popover
 **************************************************************** **/
	function _popover() {

			jQuery("a[data-toggle=popover]").bind("click", function(e) {
				jQuery('.popover-title .close').remove();
				e.preventDefault();
			});

			var isVisible 	= false,
				clickedAway = false;


			jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover({

					html: true,
					trigger: 'manual'

				}).click(function(e) {

					jQuery(this).popover('show');
					
					clickedAway = false;
					isVisible = true;
					e.preventDefault();

				});

				jQuery(document).click(function(e) {
					if(isVisible & clickedAway) {

						jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover('hide');
						isVisible = clickedAway = false;

					} else {


						clickedAway = true;

					}

				});

			jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover({

				html: true,
				trigger: 'manual'

			}).click(function(e) {

				$(this).popover('show');
				$('.popover-title').append('<button type="button" class="close">&times;</button>');
				$('.close').click(function(e){

					jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover('hide');

				});

				e.preventDefault();
			});


		// jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover();
	}



/** 05. LightBox
 **************************************************************** **/
	function _lightbox() {
		var _el = jQuery(".lightbox");

		if(_el.length > 0) {

			loadScript(plugin_path + 'magnific-popup/jquery.magnific-popup.min.js', function() {

				if(typeof(jQuery.magnificPopup) == "undefined") {
					return false;
				}

				jQuery.extend(true, jQuery.magnificPopup.defaults, {
					tClose: 		'Close',
					tLoading: 		'Loading...',

					gallery: {
						tPrev: 		'Previous',
						tNext: 		'Next',
						tCounter: 	'%curr% / %total%'
					},

					image: 	{ 
						tError: 	'Image not loaded!' 
					},

					ajax: 	{ 
						tError: 	'Content not loaded!' 
					}
				});

				_el.each(function() {

					var _t 			= jQuery(this),
						options 	= _t.attr('data-plugin-options'),
						config		= {},
						defaults 	= {
							type: 				'image',
							fixedContentPos: 	false,
							fixedBgPos: 		false,
							mainClass: 			'mfp-no-margins mfp-with-zoom',
							closeOnContentClick: true,
							closeOnBgClick: 	true,
							image: {
								verticalFit: 	true
							},

							zoom: {
								enabled: 		false,
								duration: 		300
							},

							gallery: {
								enabled: false,
								navigateByImgClick: true,
								preload: 			[0,1],
								arrowMarkup: 		'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
								tPrev: 				'Previous',
								tNext: 				'Next',
								tCounter: 			'<span class="mfp-counter">%curr% / %total%</span>'
							},
						};

					if(_t.data("plugin-options")) {
						config = jQuery.extend({}, defaults, options, _t.data("plugin-options"));
					}

					jQuery(this).magnificPopup(config);

				});

			});

		}

	}




/** 06. ScrollTo
 **************************************************************** **/
	function _scrollTo(to, offset) {

		if(to == false) {

			jQuery("a.scrollTo").bind("click", function(e) {
				e.preventDefault();

				var href 	= jQuery(this).attr('href'),
					_offset	= jQuery(this).attr('data-offset') || 0;

				if(href != '#' && href != '#top') {
					jQuery('html,body').animate({scrollTop: jQuery(href).offset().top - parseInt(_offset)}, 800, 'easeInOutExpo');
				}

				if(href == '#top') {
					jQuery('html,body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
				}
			});

			jQuery("#toTop").bind("click", function(e) {
				e.preventDefault();
				jQuery('html,body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
			});
		
		} else {

			// USAGE: _scrollTo("#footer", 150);
			jQuery('html,body').animate({scrollTop: jQuery(to).offset().top - offset}, 800, 'easeInOutExpo');

		}
	}




/** 07. Parallax
 **************************************************************** **/
	function _parallax() {

		if(jQuery().parallax) {

			// jQuery(".parallax-1").css("background-attachment", "fixed");
			jQuery(".parallax-1").parallax("50%", "0.1");

			// jQuery(".parallax-2").css("background-attachment", "fixed");
			jQuery(".parallax-2").parallax("50%", "0.2");

			// jQuery(".parallax-3").css("background-attachment", "fixed");
			jQuery(".parallax-3").parallax("50%", "0.3");

			// jQuery(".parallax-4").css("background-attachment", "fixed");
			jQuery(".parallax-4").parallax("50%", "0.4");

		}


		/** Slider Parallax 
			Do not use overlay - will be very slow!
		 **************************** **/
		var _slider = jQuery('#slider');

		if(_slider.length > 0) {
			if(_slider.hasClass('parallax-slider')) {

				var block_intro_top = _slider.offset().top;	
			
				jQuery(window).scroll(function() {

					var _currentTop = jQuery(document).scrollTop(); 
					
					if(_currentTop < 768) {
						var _sliderH 	= jQuery('#slider').height();

						jQuery('#slider>div').css('top', (_currentTop*0.5));
						jQuery('#slider>div').css('opacity', (1 - _currentTop/_sliderH*1));
					}

				});
		
			}
		}

	}




/** 07. Video
 **************************************************************** **/
	function _video() {

		if(jQuery("section.section-video").length > 0) {
			var _t = jQuery("section.section-video .section-container-video>video");
				_w = jQuery(window).width();

			_t.width(_w);
			
		}

	}



/** 07. Youtube Backround
 **************************************************************** **/
	function _youtubeBG() {
		var _container = jQuery('#YTPlayer');
		
		if(_container.length > 0) {
			loadScript(plugin_path + 'jquery.mb.YTPlayer.min.js', function() {


				if(jQuery().mb_YTPlayer) {
					var disableMobile = false;
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { 
						// disableMobile = true; 
					}

					if(disableMobile === false) {

						jQuery(".player").mb_YTPlayer();

						jQuery("#video-volume").bind("click", function(e) {
							e.preventDefault();

							jQuery('#YTPlayer').toggleVolume();
						});

						// audio control
						jQuery("#video-volume").bind("click", function() {
							if(jQuery('i.fa', this).hasClass('fa-volume-down')) {
								jQuery('i.fa', this).removeClass('fa-volume-down');
								jQuery('i.fa', this).removeClass('fa-volume-up');
								jQuery('i.fa', this).addClass('fa-volume-up');
							} else {
								jQuery('i.fa', this).removeClass('fa-volume-up');
								jQuery('i.fa', this).removeClass('fa-volume-v');
								jQuery('i.fa', this).addClass('fa-volume-down');
							}
						});

					} else {

						jQuery(".player , #video-volume").hide();

					}

				}
				
			});
		}
	}


/** 08. Mixitup Filter
 **************************************************************** **/
	function _mixitup() {
		var _container = jQuery('.mix-grid');
		
		if(_container.length > 0) {
			loadScript(plugin_path + 'mixitup/jquery.mixitup.min.js', function() {

				if(jQuery().mixitup) {

					_container.mixitup();
					jQuery("ul.mix-filter a").bind("click", function(e) {
						e.preventDefault();
					});

				}
			
			});
		
		}

	}



/** 09. Toggle
 **************************************************************** **/
	function _toggle() {

		var $_t = this,
			previewParClosedHeight = 25;

		jQuery("div.toggle.active > p").addClass("preview-active");
		jQuery("div.toggle.active > div.toggle-content").slideDown(400);
		jQuery("div.toggle > label").click(function(e) {

			var parentSection 	= jQuery(this).parent(),
				parentWrapper 	= jQuery(this).parents("div.toggle"),
				previewPar 		= false,
				isAccordion 	= parentWrapper.hasClass("toggle-accordion");

			if(isAccordion && typeof(e.originalEvent) != "undefined") {
				parentWrapper.find("div.toggle.active > label").trigger("click");
			}

			parentSection.toggleClass("active");

			if(parentSection.find("> p").get(0)) {

				previewPar 					= parentSection.find("> p");
				var previewParCurrentHeight = previewPar.css("height");
				var previewParAnimateHeight = previewPar.css("height");
				previewPar.css("height", "auto");
				previewPar.css("height", previewParCurrentHeight);

			}

			var toggleContent = parentSection.find("> div.toggle-content");

			if(parentSection.hasClass("active")) {

				jQuery(previewPar).animate({height: previewParAnimateHeight}, 350, function() {jQuery(this).addClass("preview-active");});
				toggleContent.slideDown(350);

			} else {

				jQuery(previewPar).animate({height: previewParClosedHeight}, 350, function() {jQuery(this).removeClass("preview-active");});
				toggleContent.slideUp(350);

			}

		});
	}



/** 11. Placeholder
 **************************************************************** **/
	function _placeholder() {

		//check for IE
		if(navigator.appVersion.indexOf("MSIE")!=-1) {

			jQuery('[placeholder]').focus(function() {

				var input = jQuery(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}

			}).blur(function() {

				var input = jQuery(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
				}

			}).blur();

		}

	}



/** 12. Word Rotate
 **************************************************************** **/
	function _wrotate() {
		jQuery(".word-rotator").each(function() {

			var _t 				= jQuery(this),
				_items 			= _t.find(".items"),
				items 			= _items.find("> span"),
				firstItem 		= items.eq(0),
				firstItemClone 	= firstItem.clone(),
				_iHeight 		= jQuery(this).height(),
				_cItem 			= 1,
				_cTop 			= 0,
				_delay 			= jQuery(this).attr('data-delay') || 2000;

			_items.append(firstItemClone);
			_t.height(_iHeight).addClass("active");

			setInterval(function() {
				_cTop = (_cItem * _iHeight);

				_items.animate({top: - (_cTop) + "px"}, 300, "easeOutQuad", function(){
					_cItem++;

					if(_cItem > items.length) {
						_items.css("top", 0);
						_cItem = 1;
					}

				});

			}, _delay);

		});


		var _container = jQuery('span.rotate');
		
		if(_container.length > 0) {

			loadScript(plugin_path + 'text-rotator/jquery.simple-text-rotator.min.js', function() {

				_container.each(function() {
					var _t 			= jQuery(this),
						_animation 	= _t.attr('data-animation') || 'fade', // fade|flip|flipCube|flipUp|spin
						_speed 		= _t.attr('data-speed') 	|| 2000;

					_t.textrotator({
						animation: 	_animation,
						speed: 		parseInt(_speed)
					});

				});

			});
		
		}
	}




/** 08. Lazy Load
	<img class="lazy" data-original="img/example.jpg" width="765" height="574">
 **************************************************************** **/
	function _lazyload() {
		var _container = jQuery('img.lazy');
		
		if(_container.length > 0) {
			loadScript(plugin_path + 'lazyload/jquery.lazyload.min.js', function() {

				if(jQuery().lazyload) {

					_container.each(function () {
						var _t 		= jQuery(this),
							_effect = _t.attr('data-effect') || 'fadeIn';

							_t.lazyload({
								effect : _effect
							});
					});

				}
			
			});
		
		}

	}





/** 13. Misc
 **************************************************************** **/
	function _misc() {

		/** Portfolio Bugfix
		 *********************** **/
		if(jQuery("#portfolio").length > 0) {
			jQuery("#portfolio .item-box .owl-carousel").each(function() {

				// Fix if has owl-carousel slider!
				jQuery(this).parent().parent().find('.item-box-desc').css({"padding-top":"29px"});

			});
		}

		/** Masonry
		 *********************** **/
		if(jQuery().masonry) {
			jQuery(".masonry").masonry();
		}



		/** Isotope Portfolio
		 *********************** **/
		var portfolio_isotope_container = jQuery("#portfolio.portfolio-isotope");

		if(portfolio_isotope_container.length > 0) {
			loadScript(plugin_path + 'isotope/isotope.pkgd.min.js', function() {

				// Isotope Portfolio
				if(jQuery().isotope) {

					var _container = jQuery('#portfolio');
					
					// Calculate Item Width on Fullwidth portfolio
					if(_container.hasClass('portfolio-isotope-2')) {
						_cols = 2;
					} else
					if(_container.hasClass('portfolio-isotope-3')) {
						_cols = 3;
					} else
					if(_container.hasClass('portfolio-isotope-4')) {
						_cols = 4;
					} else
					if(_container.hasClass('portfolio-isotope-5')) {
						_cols = 5;
					} else
					if(_container.hasClass('portfolio-isotope-6')) {
						_cols = 6;
					} else { _cols = 4; }



					function _recalcW() {
						_dw		= jQuery(document).width();

						if(_container.hasClass('fullwidth')) { // Fullwidth 

							// _w 		= jQuery(document).width(); // NOT USED - problems on aside header
							_w 		= _container.width();
							_wItem	= (_w/_cols);

							if(_dw < 760) {
								_wItem = (_w/2);
							}
							if(_dw < 480) {
								_wItem = jQuery("#portfolio").width();
							}

							// Apply item width
							jQuery("#portfolio>.portfolio-item").css({"width":_wItem});

						} else { // Non Fullwidth 

							_mR		= parseInt(jQuery("#portfolio>.portfolio-item").css('margin-right'));
							_w 		= jQuery("#portfolio").closest('.container').width();
							_wItem 	= _w / _cols - _mR;

							if(_dw < 760) {
								_wItem = (_w/2 - _mR);
							}
							if(_dw < 480) {
								_wItem = _w;
							}

							// Apply item & container width
							jQuery("#portfolio.portfolio-isotope").css({"width":_w});
							jQuery("#portfolio>.portfolio-item").css({"width":_wItem});

						}

						// Resize Flex Slider if exists!
						if(jQuery('.flexslider').length > 0) {
							jQuery('.flexslider').resize();
						}

					}	_recalcW();



					jQuery(window).load(function(){

						var _t = setTimeout(function(){ 

							_container.isotope({
								masonry: {},

								filter: '*',
								animationOptions: {
									duration: 750,
									easing: 'linear',
									queue: false
								}
							});

							jQuery('#portfolio_filter>li>a').bind("click", function(e){
								e.preventDefault();

								jQuery('#portfolio_filter>li.active').removeClass('active');
								jQuery(this).parent('li').addClass('active');

								var selector = jQuery(this).attr('data-filter');
								_container.isotope({
									filter: selector,
									animationOptions: {
										duration: 750,
										easing: 'linear',
										queue: false
									}
								 });

							}); 
							

						}, 50 );

						setTimeout(function() {
							_container.isotope('layout');
						}, 300);

					});



					// On Resize
					jQuery(window).resize(function() {

						if(window.afterResizeApp2) {
							clearTimeout(window.afterResizeApp2);
						}

						window.afterResizeApp2 = setTimeout(function() {

							_recalcW();

							setTimeout(function() {
								_container.isotope('layout');
							}, 300);

						}, 300);

					});

				
				}


			});
		}	/** end isotope **/




		/** Isotope Blog
		 *********************** **/
		var blog_isotope_container = jQuery("#blog.blog-isotope");

		if(blog_isotope_container.length > 0) {
			loadScript(plugin_path + 'isotope/isotope.pkgd.min.js', function() {

				// Isotope blog
				if(jQuery().isotope) {

					var _container = jQuery('#blog');
					
					// Calculate Item Width on Fullwidth Blog
					if(_container.hasClass('blog-isotope-2')) {
						_cols = 2;
					} else
					if(_container.hasClass('blog-isotope-3')) {
						_cols = 3;
					} else
					if(_container.hasClass('blog-isotope-4')) {
						_cols = 4;
					} else { _cols = 4; }


					function _recalcW() {
						_dw		= jQuery(document).width();

						if(_container.hasClass('fullwidth')) { // Fullwidth 

							_w 		= jQuery(document).width();
							_wItem	= (_w/_cols);

							if(_dw < 760) {
								_wItem = (_w/2);
							}
							if(_dw < 480) {
								_wItem = jQuery("#blog").width();
							}

							// Apply item width
							jQuery("#blog>.blog-post-item").css({"width":_wItem});

						} else { // Non Fullwidth 

							_mR		= parseInt(jQuery("#blog>.blog-post-item").css('margin-right'));
							_w 		= jQuery("#blog").closest('.container').width();
							_wItem 	= _w / _cols - _mR;

							if(_dw < 760) {
								_wItem = (_w/2 - _mR);
							}
							if(_dw < 480) {
								_wItem = _w;
							}

							// Apply item & container width
							jQuery("#blog.blog-isotope").css({"width":_w});
							jQuery("#blog>.blog-post-item").css({"width":_wItem});

						}

						// Resize Flex Slider if exists!
						if(jQuery('.flexslider').length > 0) {
							jQuery('.flexslider').resize();
						}

					}	_recalcW();



					jQuery(window).load(function(){

						var _t = setTimeout(function(){ 

							_container.isotope({
								masonry: {},

								filter: '*',
								animationOptions: {
									duration: 750,
									easing: 'linear',
									queue: false
								}
							});

							jQuery('#blog_filter>li>a').bind("click", function(e){
								e.preventDefault();

								jQuery('#blog_filter>li.active').removeClass('active');
								jQuery(this).parent('li').addClass('active');

								var selector = jQuery(this).attr('data-filter');
								_container.isotope({
									filter: selector,
									animationOptions: {
										duration: 750,
										easing: 'linear',
										queue: false
									}
								 });

							}); 
							

						}, 50 );

						setTimeout(function() {
							_container.isotope('layout');
						}, 300);

					});



					// On Resize
					jQuery(window).resize(function() {

						if(window.afterResizeApp2) {
							clearTimeout(window.afterResizeApp2);
						}

						window.afterResizeApp2 = setTimeout(function() {

							_recalcW();

							setTimeout(function() {
								_container.isotope('layout');
							}, 300);

						}, 300);

					});

				
				}


			});
		}	/** end isotope **/




		/** Flip Boxes
		 *********************** **/
		if(jQuery('.box-flip').length > 0) {
			
			jQuery('.box-flip').each(function() {
				_height1 = jQuery('.box1',this).outerHeight();
				_height2 = jQuery('.box2',this).outerHeight();

				if(_height1 >= _height2) {
					_height = _height1;
				} else {
					_height = _height2;
				}

				jQuery(this).css({"min-height":_height+"px"});
				jQuery('.box1',this).css({"min-height":_height+"px"});
				jQuery('.box2',this).css({"min-height":_height+"px"});
			});
			
			jQuery('.box-flip').hover(function() {
				jQuery(this).addClass('flip');
			},function(){
				jQuery(this).removeClass('flip');
			});
		}




		/** Sticky Side (social icons)
		 *********************** **/
		if(jQuery("div.sticky-side").length > 0) {
		
			var _t 	= jQuery("div.sticky-side");
				_h	= _t.height() / 2;
				
			_t.css({"margin-top":"-"+_h+"px"});
		}




		/** Increase / Decrease No.
			Example: shop-single-left.html
		 *********************** **/
		jQuery(".incr").bind("click", function(e) {
			e.preventDefault();

			var _for	= jQuery(this).attr('data-for'),
				_max	= parseInt(jQuery(this).attr('data-max')),
				_curVal	= parseInt(jQuery("#" + _for).val());

			if(_curVal < _max) {
				jQuery("#" + _for).val(_curVal + 1);
			}
		});

		jQuery(".decr").bind("click", function(e) {
			e.preventDefault();

			var _for	= jQuery(this).attr('data-for'),
				_min	= parseInt(jQuery(this).attr('data-min')),
				_curVal	= parseInt(jQuery("#" + _for).val());

			if(_curVal > _min) {
				jQuery("#" + _for).val(_curVal - 1);
			}
		});





		/** Default Button Toggle
		 *********************** **/
		jQuery("a.toggle-default").bind("click", function(e) {
			e.preventDefault();

			var _href = jQuery(this).attr('href');

			if(jQuery(_href).is(":hidden")) {

				jQuery(_href).slideToggle(200);
				jQuery('i.fa', this).removeClass('fa-plus-square').addClass('fa-minus-square');

			} else {

				jQuery(_href).slideToggle(200);
				jQuery('i.fa', this).removeClass('fa-minus-square').addClass('fa-plus-square');
			
			}

		});





		/** Custom File Upload
			<input class="custom-file-upload" type="file" id="file" name="myfiles[]" multiple />
		 *********************** **/
		var file_container = jQuery("input[type=file]");

		if(file_container.length > 0) {
			loadScript(plugin_path + 'custom.fle_upload.js');
		}



		/** Textarea Words Limit
		 *********************** **/
		jQuery("textarea.word-count").on('keyup', function() {
			var _t		= jQuery(this),
				words 	= this.value.match(/\S+/g).length,
				_limit	= _t.attr('data-maxlength') || 200;

			if (words > parseInt(_limit)) {

				// Split the string on first 200 words and rejoin on spaces
				var trimmed = _t.val().split(/\s+/, 200).join(" ");
				// Add a space at the end to keep new typing making new words
				_t.val(trimmed + " ");

			} else {

				var _data_info = _t.attr('data-info');

				if(_data_info == '' || _data_info == undefined) {
					var _infoContainer = _t.next('div');
					jQuery('span', _infoContainer).text(words + '/' + _limit);
				} else {
					jQuery('#' +_data_info).text(words + '/' + _limit);
				}


			}
		});

	}



/** Sticky Footer
 **************************************************************** **/
	function _stickyFooter() {
		if(jQuery("#footer").hasClass('sticky')) {

			var footerHeight = 0,
				footerTop 	= 0,
				_footer 		= jQuery("#footer.sticky");

			positionFooter();

			function positionFooter() {
				footerHeight = _footer.height();
				footerTop = (jQuery(window).scrollTop()+jQuery(window).height()-footerHeight)+"px";

				if((jQuery(document.body).height()+footerHeight) > jQuery(window).height()) {
					_footer.css({
						position: "absolute"
					}).stop().animate({
						top: footerTop
					},0);
				} else {
					_footer.css({position: "static"});
				}

			}

			jQuery(window).scroll(positionFooter).resize(positionFooter);

		}
	}





/** Countdown
 **************************************************************** **/
	function _countDown() {
		var _container 	= jQuery(".countdown"),
			_container2 = jQuery(".countdown-download");
		
		if(_container.length > 0 || _container2.length > 0) {

			loadScript(plugin_path + 'countdown/jquery.countdown.pack.min.js', function() {

				/** On Page Load **/
				_container.each(function() {
					var _t 		= jQuery(this),
						_date 	= _t.attr('data-from'),
						_labels	= _t.attr('data-labels');

						if(_labels) {
							_labels = _labels.split(",");
						}

						if(_date) {
							var _d = new Date(_date);
							jQuery(this).countdown({
								until: new Date(_d),
								labels: _labels || ["Years","Months","Weeks","Days","Hours","Minutes","Seconds"]
							});
						}
				});


				/** Download **/
				_container2.bind("click", function(e){
					e.preventDefault();

					var _t = jQuery(this),
						cd_container 	= _t.attr('data-for'),
						_countdown		= jQuery("#"+cd_container+' span.download-wait>.countdown'),
						_seconds 		= parseInt(_t.attr('data-seconds')),
						_dataURL		= _t.attr('href');

					_t.fadeOut(250, function(){
						jQuery("#"+cd_container).fadeIn(250, function() {

							var currentDate = new Date();
							currentDate.setSeconds(currentDate.getSeconds() + _seconds);

							_countdown.countdown({
								until: currentDate,
								format: 'S',
								expiryUrl: _dataURL,
								onExpiry: function(){
									jQuery("#"+cd_container+' span.download-message').removeClass('hide');
									jQuery("#"+cd_container+' span.download-wait').addClass('hide');
								}
							});

						});
					});

					return false;

				});


			});
		
		}

	}



/** Masonry Gallery
 **************************************************************** **/
	function _masonryGallery() {

		if(jQuery(".masonry-gallery").length > 0) {

			jQuery(".masonry-gallery").each(function() {
				var _container = jQuery(this),
					columns		= 4;

					 if(_container.hasClass('columns-2')) 	columns = 2;
				else if(_container.hasClass('columns-3')) 	columns = 3;
				else if(_container.hasClass('columns-4')) 	columns = 4;
				else if(_container.hasClass('columns-5')) 	columns = 5;
				else if(_container.hasClass('columns-6')) 	columns = 6;

				var _firstElemWidth 	= _container.find('a:eq(0)').outerWidth(),
					_bigImageNo 		= _container.attr('data-img-big'),
					_containerWidth		= _container.width();


				// Fix margins & Width
                var postWidth = (_containerWidth/columns);
					postWidth = Math.floor(postWidth);
                if((postWidth * columns) >= _containerWidth) { 
					_container.css({ 'margin-right': '-1px' }); 
				}
				if(columns < 6) {
					_container.children('a').css({"width":postWidth+"px"});
				}


				// Set Big Image
                if(parseInt(_bigImageNo) > 0) {

					_bigImageNo 	= Number(_bigImageNo) - 1; 
					_container.find('a:eq('+_bigImageNo+')').css({ width: _firstElemWidth*2 + 'px'});

					loadScript(plugin_path + 'isotope/isotope.pkgd.min.js', function() {

						setTimeout( function() {
							_container.isotope({
								masonry: {
									columnWidth: _firstElemWidth
								}
							});

							_container.isotope('layout');

						}, 1000);
					
					});

                }

			});


		}

	}



	
/** Toastr

	TYPE:
		primary
		info
		error
		sucess
		warning

	POSITION
		top-right
		top-left
		top-center
		top-full-width
		bottom-right
		bottom-left
		bottom-center
		bottom-full-width
		
	USAGE:
		_toastr("My Message here","top-right","error",false);
		
	NOTE:
		_onclick = url to redirect (example: http://www.stepofweb.com)
 **************************************************************** **/
	function _toastr(_message,_position,_notifyType,_onclick) {
		var _btn 	= jQuery(".toastr-notify");

		if(_btn.length > 0 || _message != false) {

			loadScript(plugin_path + 'toastr/toastr.js', function() {
				// toastr.clear();

				/** BUTTON CLICK
				 ********************* **/
				_btn.bind("click", function(e) {
					e.preventDefault();


					var _message 			= jQuery(this).attr('data-message'),
						_notifyType 		= jQuery(this).attr('data-notifyType')			|| "default",
						_position	 		= jQuery(this).attr('data-position')			|| "top-right",
						_progressBar 		= jQuery(this).attr('data-progressBar') 		== "true" ? true : false,
						_closeButton		= jQuery(this).attr('data-closeButton') 		== "true" ? true : false,
						_debug		 		= jQuery(this).attr('data-debug') 				== "true" ? true : false,
						_newestOnTop 		= jQuery(this).attr('data-newestOnTop') 		== "true" ? true : false,
						_preventDuplicates	= jQuery(this).attr('data-preventDuplicates') 	== "true" ? true : false,
						_showDuration 		= jQuery(this).attr('data-showDuration') 		|| "300",
						_hideDuration 		= jQuery(this).attr('data-hideDuration') 		|| "1000",
						_timeOut 			= jQuery(this).attr('data-timeOut') 			|| "5000",
						_extendedTimeOut	= jQuery(this).attr('data-extendedTimeOut')		|| "1000",
						_showEasing 		= jQuery(this).attr('data-showEasing') 			|| "swing",
						_hideEasing 		= jQuery(this).attr('data-hideEasing') 			|| "linear",
						_showMethod 		= jQuery(this).attr('data-showMethod') 			|| "fadeIn",
						_hideMethod 		= jQuery(this).attr('data-hideMethod') 			|| "fadeOut";

						toastr.options = {
							"closeButton": 			_closeButton,
							"debug": 				_debug,
							"newestOnTop": 			_newestOnTop,
							"progressBar": 			_progressBar,
							"positionClass": 		"toast-" + _position,
							"preventDuplicates": 	_preventDuplicates,
							"onclick": 				null,
							"showDuration": 		_showDuration,
							"hideDuration": 		_hideDuration,
							"timeOut": 				_timeOut,
							"extendedTimeOut": 		_extendedTimeOut,
							"showEasing": 			_showEasing,
							"hideEasing": 			_hideEasing,
							"showMethod": 			_showMethod,
							"hideMethod": 			_hideMethod
						}

					toastr[_notifyType](_message);
				});


				/** JAVSCRIPT / ON LOAD
				 ************************* **/
				if(_message != false) {

					if(_onclick != false) {
						onclick = function() {
							window.location = _onclick;
						}
					} else {
						onclick = null
					}

					toastr.options = {
						"closeButton": 			true,
						"debug": 				false,
						"newestOnTop": 			false,
						"progressBar": 			true,
						"positionClass": 		"toast-" + _position,
						"preventDuplicates": 	false,
						"onclick": 				onclick,
						"showDuration": 		"300",
						"hideDuration": 		"1000",
						"timeOut": 				"5000",
						"extendedTimeOut": 		"1000",
						"showEasing": 			"swing",
						"hideEasing": 			"linear",
						"showMethod": 			"fadeIn",
						"hideMethod": 			"fadeOut"
					}

					setTimeout(function(){
						toastr[_notifyType](_message);
					}, 1500); // delay 1.5s
				}
			});
		
		}

	}


/** Chart
 **************************************************************** **/
	function _charts() {

		/** Easy Pie Chart 
		 ************************* **/
		var _container = jQuery(".piechart");

		if(_container.length > 0) {

			loadScript(plugin_path + 'chart.easypiechart/dist/jquery.easypiechart.min.js', function() {

				jQuery(".piechart").each(function() {
					var _t = jQuery(this),
						_size 		= _t.attr('data-size') || 150,
						_animate 	= _t.attr('data-animate') || "3000";

					_t.easyPieChart({
						size: 			_size,
						animate: 		_animate,
						scaleColor: 	false,
						trackColor: 	_t.attr('data-trackcolor') || 'rgba(0,0,0,0.04)',
						lineWidth: 		_t.attr('data-width') || '2',
						lineCap: 		'square',
						barColor: 		_t.attr('data-color') || '#0093BF'
					});

					jQuery("span", this).attr('style', "line-height:"+_size+"px !important; height:"+_size+"px; width:"+_size+"px");
					jQuery("i", this).attr('style', "line-height:"+_size+"px !important; height:"+_size+"px; width:"+_size+"px");
					// jQuery("span", this).css({"line-height":_size+"px", "height":_size+"px", "width":_size+"px"});
					// jQuery("i", this).css({"line-height":_size+"px", "height":_size+"px", "width":_size+"px"});

				});
		
			});

		}

		
	}



/** Select2
 **************************************************************** **/
	function _select2() {
		var _container = jQuery('select.select2');
		
		if(_container.length > 0) {
			
			loadScript(plugin_path + 'select2/js/select2.full.min.js', function() {
		
				if(jQuery().select2) {
					jQuery('select.select2').select2();
				}

			});
		}

	}




/** Form [form plugin + validation plugin]
 **************************************************************** **/
	function _form() {


		/** Form Validate 
			LOAD PLUGIN ONLY!
		 ************************ **/
		if(jQuery('form.validate-plugin').length > 0) {

			loadScript(plugin_path + 'form.validate/jquery.form.min.js', function() {
				loadScript(plugin_path + 'form.validate/jquery.validation.min.js');
			});

		}



		/** Form Validate
		 ************************ **/
		if(jQuery('form.validate').length > 0) {

			loadScript(plugin_path + 'form.validate/jquery.form.min.js', function() {
				loadScript(plugin_path + 'form.validate/jquery.validation.min.js', function() {

					if(jQuery().validate) {

						jQuery('form.validate').each(function() {

							var _t 			= jQuery(this),
								_Smessage 	= _t.attr('data-success') 			|| "Successfully! Thank you!",
								_Cmessage 	= _t.attr('data-captcha') 			|| "Invalid Captcha!",
								_Tposition 	= _t.attr('data-toastr-position') 	|| "top-right",
								_Ttype	 	= _t.attr('data-toastr-type') 		|| "success";
								_Turl	 	= _t.attr('data-toastr-url') 		|| false;

							// Append 'is_ajax' hidden input field!
							_t.append('<input type="hidden" name="is_ajax" value="true" />');

							_t.validate({
								submitHandler: function(form) {

									// Show spin icon
									jQuery(form).find('.input-group-addon').find('.fa-envelope').removeClass('fa-envelope').addClass('fa-refresh fa-spin');

									jQuery(form).ajaxSubmit({

										target: 	jQuery(form).find('.validate-result').length > 0 ? jQuery(form).find('.validate-result') : '',

										error: 		function(data) { 
											_toastr("Sent Failed!",_Tposition,"error",false);
										},

										success: 	function(data) {
											var data = data.trim();

											// SMTP ERROR
											if(data == '_failed_') {
												_toastr("SMTP ERROR! Please, check your config file!",_Tposition,"error",false);
											}

											// CAPTCHA ERROR
											else if(data == '_captcha_') {
												_toastr("Invalid Captcha!",_Tposition,"error",false);


											// SUCCESS
											} else {

												// Remove spin icon
												jQuery(form).find('.input-group-addon').find('.fa-refresh').removeClass('fa-refresh fa-spin').addClass('fa-envelope');

												// Clear the form
												jQuery(form).find('input.form-control').val('');

												// Toastr Message
												_toastr(_Smessage,_Tposition,_Ttype,_Turl);
											
											}
										}
									});

								}
							});

						});

					}

				});
			});

		}




		/** Masked Input
		 ************************ **/
		var _container = jQuery('input.masked');
		if(_container.length > 0) {

			loadScript(plugin_path + 'form.masked/jquery.maskedinput.js', function() {
				
				_container.each(function() {
				
					var _t 				= jQuery(this);
						_format 		= _t.attr('data-format') 		|| '(999) 999-999999',
						_placeholder 	= _t.attr('data-placeholder') 	|| 'X';

					jQuery.mask.definitions['f'] = "[A-Fa-f0-9]";
					_t.mask(_format, {placeholder:_placeholder});

				});
				
			});

		}

	}





/** Pickers
 **************************************************************** **/
	function _pickers() {

		/** Date Picker
			<input type="text" class="form-control datepicker" data-format="yyyy-mm-dd" data-lang="en" data-RTL="false">
		 ******************* **/
		var _container_1 = jQuery('.datepicker');
		
		if(_container_1.length > 0) {
			loadScript(plugin_path + 'bootstrap.datepicker/js/bootstrap-datepicker.min.js', function() {
		
				if(jQuery().datepicker) {

					_container_1.each(function() {
						var _t 		= jQuery(this),
							_lang 	=	_t.attr('data-lang') || 'en';

						if(_lang != 'en' && _lang != '') { // load language file
							loadScript(plugin_path + 'bootstrap.datepicker/locales/bootstrap-datepicker.'+_lang+'.min.js');
						}

						jQuery(this).datepicker({
							format:			_t.attr('data-format') 			|| 'yyyy-mm-dd', 
							language: 		_lang,
							rtl: 			_t.attr('data-RTL') 			== "true"  ? true  : false,
							changeMonth: 	_t.attr('data-changeMonth') 	== "false" ? false : true,
							todayBtn: 		_t.attr('data-todayBtn') 		== "false" ? false : "linked",
							calendarWeeks: 	_t.attr('data-calendarWeeks') 	== "false" ? false : true,
							autoclose: 		_t.attr('data-autoclose') 		== "false" ? false : true,
							todayHighlight: _t.attr('data-todayHighlight') 	== "false" ? false : true,

							onRender: function(date) {
								// return date.valueOf() < nowDate.valueOf() ? 'disabled' : '';
							}
						}).on('changeDate', function(ev) {

							// AJAX POST - OPTIONAL

						}).data('datepicker'); 
					});
					
				}

			});
		}




		/** Range Picker
			<input type="text" class="form-control rangepicker" value="2015-01-01 - 2016-12-31" data-format="yyyy-mm-dd" data-from="2015-01-01" data-to="2016-12-31">
		 ******************* **/
		var _container_2 = jQuery('.rangepicker');
		
		if(_container_2.length > 0) {
			loadScript(plugin_path + 'bootstrap.daterangepicker/moment.min.js', function() {
				loadScript(plugin_path + 'bootstrap.daterangepicker/daterangepicker.js', function() {
			
					if(jQuery().datepicker) {

						_container_2.each(function() {
						
							var _t 		= jQuery(this),
								_format = _t.attr('data-format').toUpperCase() || 'YYYY-MM-DD';

							_t.daterangepicker(
							{
								format: 		_format,
								startDate: 		_t.attr('data-from'),
								endDate: 		_t.attr('data-to'),

								ranges: {
								   'Today': [moment(), moment()],
								   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
								   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
								   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
								   'This Month': [moment().startOf('month'), moment().endOf('month')],
								   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
								}
							}, 
							function(start, end, label) {
								// alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
							});

						});
						
					}

				});
			});
		}



		/** Time Picker
			<input type="text" class="form-control timepicker" value="11 : 55 : PM">
		 ******************* **/
		var _container_3 = jQuery('.timepicker');
		
		if(_container_3.length > 0) {
			loadScript(plugin_path + 'timepicki/timepicki.min.js', function() {
			
				if(jQuery().timepicki) {

					_container_3.timepicki();
					
				}

			});
		}



		/** Color Picker
		 ******************* **/
		var _container_4 = jQuery('.colorpicker');
		
		if(_container_4.length > 0) {
			loadScript(plugin_path + 'spectrum/spectrum.min.js', function() {
			
				if(jQuery().spectrum) {

					_container_4.each(function() {
						var _t 					= jQuery(this),
							_preferredFormat 	= _t.attr('data-format') 		|| "hex", // hex, hex3, hsl, rgb, name
							_palletteOnly		= _t.attr('data-palletteOnly') 	|| "false",
							_fullPicker			= _t.attr('data-fullpicker') 	|| "false",
							_allowEmpty			= _t.attr('data-allowEmpty') 	|| false;
							_flat				= _t.attr('data-flat') 			|| false;

							if(_palletteOnly == "true" || _fullPicker == "true") {

								var _palette = [
										["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
										["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
										["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
										["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
										["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
										["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
										["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
										["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
									];
	
							} else {
								_palette = null;
							}

							if(_t.attr('data-defaultColor')) {
								_color = _t.attr('data-defaultColor');
							} else {
								_color = "#ff0000";
							}
							
							if(!_t.attr('data-defaultColor') && _allowEmpty == "true") {
								_color = null;
							}

						_t.spectrum({
							showPaletteOnly: 	_palletteOnly == "true" ? true : false,
							togglePaletteOnly: 	_palletteOnly == "true" ? true : false,

							flat:				_flat 		== "true" ? true : false,
							showInitial: 		_allowEmpty == "true" ? true : false,
							showInput: 			_allowEmpty == "true" ? true : false,
							allowEmpty:			_allowEmpty == "true" ? true : false,

							chooseText: 		_t.attr('data-chooseText') || "Coose",
							cancelText: 		_t.attr('data-cancelText') || "Cancel",

							color: 				_color,
							showInput:			true,
							showPalette: 		true,
							preferredFormat: 	_preferredFormat,
							showAlpha: 			_preferredFormat == "rgb" ? true : false,
							palette: 			_palette
						});

					});
					
				}

			});
		}

	}





/** Editors
 **************************************************************** **/
	function _editors() {

		/** Summernote HTML Editor
			<textarea class="summernote form-control" data-height="200"></textarea>
		 ***************************** **/
		var _container_1 = jQuery('textarea.summernote');
		
		if(_container_1.length > 0) {
			
			loadScript(plugin_path + 'editor.summernote/summernote.min.js', function() {
		
				if(jQuery().summernote) {

					_container_1.each(function() {

						var _lang = jQuery(this).attr('data-lang') || 'en-US';

						if(_lang != 'en-US') { // Language!
						alert(_lang);
							loadScript(plugin_path + 'editor.summernote/lang/summernote-'+_lang+'.js');
						}

						jQuery(this).summernote({
							height: jQuery(this).attr('data-height') || 200,
							lang: 	jQuery(this).attr('data-lang') || 'en-US', // default: 'en-US'
							toolbar: [
							/*	[groupname, 	[button list]]	*/
								['style', 		['style']],
								['fontsize', 	['fontsize']],
								['style', 		['bold', 'italic', 'underline','strikethrough', 'clear']],
								['color', 		['color']],
								['para', 		['ul', 'ol', 'paragraph']],
								['table', 		['table']],
								['media', 		['link', 'picture', 'video']],
								['misc', 		['codeview', 'fullscreen', 'help']]
							]
						});
					});

				}
			});
		}





		/** Markdown HTML Editor
			<textarea class="markdown" data-height="300" name="content" data-provide="markdown" data-lang="en" rows="10"></textarea>
		 ***************************** **/
		var _container_2 = jQuery('textarea.markdown');
		
		if(_container_2.length > 0) {
			
			loadScript(plugin_path + 'editor.markdown/js/bootstrap-markdown.min.js', function() {
		
				if(jQuery().markdown) {

					_container_2.each(function() {
						var _t = jQuery(this);

						var _lang = _t.attr('data-lang') || 'en';

						if(_lang != 'en') { // Language!
							loadScript(plugin_path + 'editor.markdown/locale/bootstrap-markdown.'+_lang+'.js');
						}

						jQuery(this).markdown({
							autofocus:		_t.attr('data-autofocus') 	== "true" ? true : false,
							savable:		_t.attr('data-savable') 	== "true" ? true : false,
							height:			_t.attr('data-height') 		|| 'inherit',
							language:		_lang == 'en' ? null : _lang
						});

					});

				}
				
			});
			
		}

	}






/** Pajinate [jQuery Pagination]
	USAGE
	
	<div class="pajinate" data-pajinante-items-per-page="8" data-pajinate-container=".pajinate-container">
	
		<div class="pajinate-container">
		
			<div>item1</div>
			<div>item2</div>
			<div>item3</div>
			.....

		</div>

		<div class="pajinate-nav">
			<ul class="pagination"><!-- pages added by pajinate plugin --></ul>
		</div>

	</div>
 **************************************************************** **/
	function _pajinate() {
		var _container = jQuery('div.pajinate');

		if(_container.length > 0) {

			loadScript(plugin_path + 'pajinate/jquery.pajinate.bootstrap.min.js', function() {
			
				if(jQuery().pajinate) {

					_container.each(function() {
						var _t 			= jQuery(this),
							_perPage 	= _t.attr('data-pajinante-items-per-page') 	|| 8;
							_numLinks 	= _t.attr('data-pajinante-num-links') 		|| 5;

						_t.pajinate({
							items_per_page 				: parseInt(_perPage),
							num_page_links_to_display	: parseInt(_numLinks),
							item_container_id 			: _t.attr('data-pajinate-container') || '.pajinate-container',
							nav_panel_id 				: '.pajinate-nav ul',
							show_first_last 			: false,
							wrap_around					: true,
							abort_on_small_lists 		: true,
							start_page 					: 0,
							nav_label_prev 				: '&laquo;',
							nav_label_next 				: '&raquo;'
						});

					});
				}
			
			});
		
		}

	}





/** Infininte Scroll
 **************************************************************** **/
	function _infiniteScroll() {
		var _container 	= jQuery(".infinite-scroll");

		if(_container.length > 0) {

			loadScript(plugin_path + 'infinite-scroll/jquery.infinitescroll.min.js', function() {

					_navSelector	= _container.attr('data-nextSelector') || "#inf-load-nex",
					_itemSelector	= _container.attr('data-itemSelector') || ".item",
					_nextSelector	= _navSelector + " a";

				_container.infinitescroll({
					loading: {
						finishedMsg	: '<i class="fa fa-check"></i>',
						msgText		: '<i class="fa fa-refresh fa-spin"></i>',
						img			: "data:image/gif;base64,R0lGODlhGAAYAPUAABQSFCwuLBwaHAwKDKyurGxqbNze3CwqLCQmJLS2tOzu7OTi5JyenBweHBQWFJyanPz+/HRydLSytFxeXPz6/ExOTKSmpFRSVHR2dAwODAQCBOzq7PTy9ISChPT29IyKjIyOjISGhOTm5GRiZJSWlJSSlFRWVMTCxNza3ExKTNTS1KyqrHx6fGRmZKSipMzOzMTGxDQyNDw+PAQGBDQ2NERCRFxaXMzKzGxubDw6PCQiJLy+vERGRLy6vHx+fNTW1CH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAAACwAAAAAGAAYAEAGqECAcAhoRAiojQJFiAiI0Kh0qOsZOhqhDMK9ZadgAI0WBmhAXAhFVm5HbZR0aTYdsFpSkwqjo5sRLAtpIjxuUzZpECmGjI1QA4JcKH5lGVICDHFpGyoqGx4uDWENFh4iKjcbiR4MT1ItLJSPJWkUNo9uAyhpBpaOGjdpOY7ExcYaIQs9OsUpibfENZoQIF9gY1EpqlwiLAh+M4AqJmUCOBJJGz8EOKJRQQAh+QQJBQABACwAAAAAGAAYAAAGp8CAcBhoRBILDgdFKAiI0KHAB5rUZBUWDALxMJ5R4SCmiWpoJ67iEm4TZx0upOCuB1jyir2tuXE3DnthE3IlglENchwDh0QDG3ITjUQ7ciGTQxFybJgBGkcYGhoYPaGdARdyOKchcjunhH8znQAccmCYJZGnDpAQN2WdFXI+pwEFch2znRe+MDTBbzGMbQIPHlwwLBcyNSMgLIF2Ai0WKAocBhI4uERBACH5BAkFACwALAAAAAAYABgAAAaoQJZwyNIEJiAJCpWICIjQKFGD6Gw8D4d0C3UQIJsKd1wsQSgFMldjgUAu6q1jA27EpRg34x5FUCAeT3xDAx5uBQAMJyZ8GRxuFiRuFAF3B24QKguYE3cpmAubbil3I5gGKpgIdwF/EA9tgAN8JicMGQVuHLODQgKGEKu9QgxuGMNCDQpgAMgsF38rGs4Ffx/TyBUiECtayAIPHgohAdi9DRFKTCAj5VJBACH5BAkFAAAALAAAAAAYABgAAAa0QIBwSAQMaphHoVFsOoezlsEleFqJDsnmcu1qLJBW9zpQUSpjqwyycQgPBAIiLYRBGIDMAgJRaegREB4CE3wQFAN0NHwRYHwwdAANfBIqhlx0AXwGCnx+kQV8Cp0QBZEaL3wbBnwBkReGKgl8TGkadnwugRA0dBkUhhMNHhARdBqWEAsZAAwQkHQIEgQHQgIbFDKRTRUUL4nbRC0QFjPhRBcbEm7nQg0uBi3g7Q0RDxEyzFdBACH5BAkFAAgALAAAAAAYABgAAAaxQIRwSCwKHMWkssgLCZbQYmNnUgpMh6gQoIoUZQqIh6ZFHDjV7QLCLpURIcUTAWKzvWUBhYFwcOwnA28IOx4CBXY3AIMIJRAFEmwoSIwYEAQGbDWMQiwQBh4QKpxCjhyhbqQqEByZLKQ1bAaRr4wOKGwSiKlvADd2BQIeJ4MDJ3YcSA8UlFqWdiBCAgohbyR2C4tCJhwBZTQUEAo5RQUqzVAHJuhDJjsNpFIhKfFG7FFBACH5BAkFAAAALAAAAQAYABYAAAa3QIBQmEnlNMOkcgmoGSCQEJNIY048UIhhKqS1lClKFtLjClmmoWAzvunMgJmqIWRkDTYkHIBxARpiECUDe0MIHg0RUCV6hQAaGxESEAszjkkvEk8sl0kqKgoQCJ1CGiIKChuNlwcQCigvpGcQKBKxpAMLEBI4IpaXGiVQODoeb44DwhAUAgAuGIUaEyhZDEINKr9cCDdjG81CJpxmO2MUPEojVVy6UBQ2TDGEUyFQCzKyjzk880NBACH5BAkFAAEALAAAAAAYABgAAAazwIBwGABMOhcNcckUOkoKiJTVrAYqG6k2YWXiKFptpEs0gbWbXmFmHQwbWcjNJlCSYwIhQ9qxk4UaVAIeEB1/TCANBRAnfodCExEEEDSPSzUJKCeWSzQGHBicRBUcHimiQywKC5WoGjAoCTKoATQUBBETqDMnEAUNH6ghEBQOAT6OZBo+UgxCAjF/Mw0TN1IKeUJuVTMFPSJhEBePGOHEBZYJ4SI8nCxaHB/GnBoXISYATUEAIfkECQUAKgAsAAAAABgAGAAABqpAlXCoErQsr4WBlCE6nQ2XB0Ktup5Yk6LKhZywzgKlyplSKRfwsELdYA6DDCI1OaiFgg2EALirHxAfGn5gDR4rg4RPGhEbDopYAQkdkFgjBnaVTiEoiZpDCQmfRBooIKNDBwYjqEIdCQGtDgoFnpoaEh4NqBogEA+oDisQjn4xExUIAAMILCIQFBV+JmNUHh7VEAWEMF1VCmmELt4UDAKQGSUoCy8WI+dPQQAh+QQJBQAJACwAAAAAGAAYAAAGrMCEcJhoRCQoxUblmmSI0KGA4YFYr9bFIUqsbLBgK4ErLFAosEiuESi8sBKyifKqRTWXk+el4zYULgNkQhkaZBYShoOLOigAi5ARE5CQDzOUixGYi3abXANPnlE5olyapUQzD6hELaesDgYNrAkzEi5kMwOKnxYbs1EIKh4wF5dQNSoQF2QSWC8FATo0GDcUHi2DBGFgGymLBwvcEBQPDpQZNi4qGxsoEjgCXEEAIfkEBQUACAAsAAAAABgAGAAABqZAhHCIEBQIBg/HICk4iNCh4OGBWK9WTgkQHZoUlFMJwyKpsJCFrBvhhJ7QGgqrgA9tr0BX6HhhTUQNO3Z7ADBWFAdEIQJ7UAMRJTREAjyOl0MNmJucnZ6foKGio6SdmqQphDljA5wCIUQBVRAwXJcAO6dCJlg3tl0BPxdQAgpYKDVRAh8cOF05C2g/JSw+JTAeCsOFJRxoVx4PjZgORygcHCgETl1BADs=",
						speed		: 'normal'
					},
					nextSelector	: _nextSelector,
					navSelector		: _navSelector,
					itemSelector	: _itemSelector,
					behavior		: '',

					state: {
						isDone		: false
					}
				},

				function(newElements) {

					Init(true);

					if(jQuery().isotope) {

						_container.isotope('appended', jQuery(newElements));

						setTimeout( function(){ 
							_container.isotope('layout'); 
						}, 2000);

					}

				});

			});

		}

	}





/** Image Zoom
 **************************************************************** **/
	function _zoom() {
		var _container = jQuery('figure.zoom');
		
		if(_container.length > 0) {
		
			loadScript(plugin_path + 'image.zoom/jquery.zoom.min.js', function() {
				
				if(jQuery().zoom) {
				
					_container.each(function() {
						var _t 		= jQuery(this),
							_mode 	= _t.attr('data-mode'),
							_id		= _t.attr('id');

						if(_mode == 'grab') {
							_t.zoom({ on:'grab' });
						} else

						if(_mode == 'click') {
							_t.zoom({ on:'click' });
						} else

						if(_mode == 'toggle') {
							_t.zoom({ on:'toggle' });
						} else {
							_t.zoom();
						}


						// Thumbnails
						if(_id) {
							jQuery('.zoom-more[data-for='+_id+'] a').bind("click", function(e) {
								e.preventDefault();

								var _href = jQuery(this).attr('href');
								
								if(_href != "#") {
									jQuery('.zoom-more[data-for='+_id+'] a').removeClass('active');
									jQuery(this).addClass('active');

									jQuery('figure#'+_id + '>.lightbox').attr('href', _href);

									jQuery('figure#'+_id + '>img').fadeOut(0, function() {
										jQuery('figure#'+_id + '>img').attr('src', _href);
									}).fadeIn(500);


								}
							});
						}

					});

				}
			
			});
		
		}

	}





/** Autosuggest
	http://twitter.github.io/typeahead.js/
 **************************************************************** **/
	function _autosuggest() {
		_container = jQuery('div.autosuggest');

		if(_container.length > 0) {

			loadScript(plugin_path + 'typeahead.bundle.js', function() {

				if(jQuery().typeahead) {
					
					_container.each(function() {
						var	_t 					= jQuery(this),
							_minLength			= _t.attr('data-minLength') || 1,
							_qryURL 			= _t.attr('data-queryURL'),
							_limit	 			= _t.attr('data-limit') 	|| 10,
							_autoload 			= _t.attr('data-autoload');
							
							if(_autoload == "false") {
								return false;
							}

							/** **/
							/* Bloodhound (Suggestion Engine) */
							var _typeahead = new Bloodhound({
								datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
								queryTokenizer: Bloodhound.tokenizers.whitespace,
								limit:	_limit,
								remote: {
									url: _qryURL + '%QUERY',
								},
 							});

							jQuery('.typeahead', _t).typeahead({
								limit: 		_limit,
								hint: 		_t.attr('data-hint') 		== "false" ? false : true,
								highlight: 	_t.attr('data-highlight') 	== "false" ? false : true,
								minLength: parseInt(_minLength),

								cache: 			false,
							},
							{
								name: '_typeahead',
								source: _typeahead
							});
							/** **/
  
					});

					
				}
				
			});
			
		}

	}






/** Form Stepper
 **************************************************************** **/
	function _stepper() {
		var _container = jQuery('input.stepper');

		if(_container.length > 0) {

			loadScript(plugin_path + 'form.stepper/jquery.stepper.min.js', function() {

				if(jQuery().stepper) {

					jQuery(_container).each(function() {
						var _t 		= jQuery(this),
							_min 	= _t.attr('min') || null,
							_max 	= _t.attr('max') || null;

						_t.stepper({
							limit:						[_min,_max],
							floatPrecission:			_t.attr('data-floatPrecission') || 2,
							wheel_step: 				_t.attr('data-wheelstep') 		|| 0.1,
							arrow_step:	 				_t.attr('data-arrowstep') 		|| 0.2,
							allowWheel: 				_t.attr('data-mousescrool') 	== "false" ? false : true,
							UI: 						_t.attr('data-UI') 				== "false" ? false : true,
							// --
							type: 						_t.attr('data-type') 			|| "float",
							preventWheelAcceleration:	_t.attr('data-preventWheelAcceleration') == "false" ? false : true,
							incrementButton:			_t.attr('data-incrementButton') || "&blacktriangle;",
							decrementButton:			_t.attr('data-decrementButton') || "&blacktriangledown;",
							onStep:						null,
							onWheel:					null,
							onArrow:					null,
							onButton:					null,
							onKeyUp:					null
						});

					});

				}

			});

		}

	}






/** Slimscroll
 **************************************************************** **/
	function _slimScroll() {
		var _container = jQuery('.slimscroll');

		if(_container.length > 0) {

			loadScript(plugin_path + 'slimscroll/jquery.slimscroll.min.js', function() {

				if(jQuery().slimScroll) {

					jQuery('.slimscroll').each(function () {

						var height;
						if (jQuery(this).attr("data-height")) {
							height = jQuery(this).attr("data-height");
						} else {
							height = jQuery(this).height();
						}

						jQuery(this).slimScroll({
							size: 				jQuery(this).attr("data-size") 							|| '5px',
							opacity: 			jQuery(this).attr("data-opacity") 						|| .6,
							position: 			jQuery(this).attr("data-position") 						|| 'right',
							allowPageScroll:	false, // not working
							disableFadeOut: 	false,
							railVisible: 		true,
							railColor: 			jQuery(this).attr("data-railColor")						|| '#222',
							railOpacity: 		jQuery(this).attr("data-railOpacity") 					|| 0.05,
							alwaysVisible: 		(jQuery(this).attr("data-alwaysVisible") != "false" 	? true : false),
							railVisible: 		(jQuery(this).attr("data-railVisible")   != "false" 	? true : false),
							color: 				jQuery(this).attr("data-color")  						|| '#333',
							wrapperClass: 		jQuery(this).attr("data-wrapper-class") 				|| 'slimScrollDiv',
							railColor: 			jQuery(this).attr("data-railColor")  					|| '#eaeaea',
							height: 			height
						});
					

						// Disable body scroll on slimscroll hover
						if(jQuery(this).attr('disable-body-scroll') == 'true') {

							jQuery(this).bind('mousewheel DOMMouseScroll', function(e) {
								var scrollTo = null;

								if (e.type == 'mousewheel') {
									scrollTo = (e.originalEvent.wheelDelta * -1);
								}
								else if (e.type == 'DOMMouseScroll') {
									scrollTo = 40 * e.originalEvent.detail;
								}

								if (scrollTo) {
									e.preventDefault();
									jQuery(this).scrollTop(scrollTo + jQuery(this).scrollTop());
								}
							});

						}

					});

				}
				
			});

		}

	}




/** Modal Autoload

	USAGE:
	
	<div id="MODAL-ID-REQUIRED" class="modal fade" data-autoload="true" data-autoload-delay="2000">
		...
	</div>
 **************************************************************** **/
	function _modalAutoLoad() {
		if(jQuery("div.modal").length > 0) {

			jQuery("div.modal").each(function() {
				var _t 			= jQuery(this),
					_id			= _t.attr('id'),
					_autostart 	= _t.attr('data-autoload') || false;


				// reset allow
				// localStorage.removeItem(_id);


				if(_id != '') { // rewrite if set to hidden by the user
					if(localStorage.getItem(_id) == 'hidden') {
						_autostart = 'false';
					}
				}


				if(_autostart == 'true') {

					jQuery(window).load(function() { // required on load!
						var _delay = _t.attr('data-autoload-delay') || 1000; // delay when modal apprear

						setTimeout(
							function()  {

								_t.modal('toggle');

						}, parseInt(_delay));

					});

				}

				// LOCAL STORAGE - DO NOT HIDE ON NEXT PAGE LOAD!
				jQuery("input.loadModalHide", this).bind("click", function() {
					var _tt = jQuery(this);
					
					if(_tt.is(":checked")) {
						localStorage.setItem(_id, 'hidden');
						console.log('[Modal Autoload #'+_id+'] Added to localStorage');
					} else {
						localStorage.removeItem(_id);
						console.log('[Modal Autoload #'+_id+'] Removed from localStorage');
					}

				});

			});

		}
	}





/** 10. Background Image
	class="boxed" should be added to body.
	Add to body - example: data-background="assets/images/boxed_background/1.jpg"
 **************************************************************** **/
	function _bgimage() {
		var data_background = jQuery('body').attr('data-background') || '';

		if(data_background != '') {
		
			loadScript(plugin_path + 'jquery.backstretch.min.js', function() {

				if(data_background) {
					jQuery.backstretch(data_background);
					jQuery('body').addClass('transparent'); // remove backround color of boxed class
				}

			});

		}
	}




/** Flickr Widget
	<div class="widget-flickr clearfix lightbox margin-bottom-60" data-id="37304598@N02" data-limit="16" data-plugin-options='{"delegate": "a", "gallery": {"enabled": true}}'></div>
 **************************************************************** **/
	function _widget_flickr() {
		var _container = jQuery('.widget-flickr');

		if(_container.length > 0) {

			loadScript(plugin_path + 'widget.jflickr/jflickrfeed.min.js', function() {

				if(jQuery().jflickrfeed) {
					if(jQuery('.widget-flickr')) {

						/** **/
						_container.each(function() {
							var _t 		= jQuery(this),
								_id 	= _t.attr('data-id'),
								_limit 	= _t.attr('data-limit') || 14;

							_t.jflickrfeed({
								limit: parseInt(_limit),
								qstrings: {
									id: _id
								},
								itemTemplate: '<li>'+
												'<a href="{{image}}" title="{{title}}">' +
													'<img src="{{image_s}}" alt="{{title}}" width="63" height="63" />' +
												'</a>' +
											  '</li>'
							}, function(data) {
								_lightbox();
							});
						
						});
						/** **/

					}
				}

			});
		
		}

	}




/** Twitter Widget
 **************************************************************** **/
	function _widget_twitter() {
		var _container = jQuery(".widget-twitter");

		if(_container.length > 0) {

			loadScript(plugin_path + 'widget.twittie/twittie.min.js', function() {

				if(jQuery().twittie) {
					// jQuery('.example1 .tweet').twittie({
						// dateFormat: '%b. %d, %Y',
						// template: '{{tweet}} <div class="date">{{date}}</div>',
						// count: 1,
						// loadingText: 'Loading!'
					// });

						_container.each(function() {
							var _t 		= jQuery(this),
								_php 	= _t.attr('data-php'),			// PHP Script Path
								_usr 	= _t.attr('data-username'),		// Twitter Username
								_lmt 	= _t.attr('data-limit')	|| 3,	// Tweets Limit
								
								_url	= _php + "?username=" + _usr + "&limit=" + _lmt;

							jQuery.getJSON(_url, function(tweets){
								_t.html(format_twitter(tweets));
							});

						});

				}
			
			});
		
		}

	}

	function format_twitter(twitt) {
		var statusHTML = [];

		for(var i=0; i<twitt.length; i++) {
			var username = twitt[i].user.screen_name;

			var status = twitt[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
				return '<a href="'+url+'" target="_blank">'+url+'</a>';
			}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
				return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'" target="_blank">'+reply.substring(1)+'</a>';
			});

			statusHTML.push('<li><i class="fa fa-twitter"></i><span>'+status+'</span><small><a href="http://twitter.com/'+username+'/statuses/'+twitt[i].id_str+'" target="_blank">'+relative_time(twitt[i].created_at)+'</a></small></li>');
		}

		return statusHTML.join('');
	}


	function relative_time(time_value) {
		var values 		= time_value.split(" "),
			parsed_date = Date.parse(time_value),
			relative_to = (arguments.length > 1) ? arguments[1] : new Date(),
			delta 		= parseInt((relative_to.getTime() - parsed_date) / 1000);

		time_value 		= values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
		delta 			= delta + (relative_to.getTimezoneOffset() * 60);

		if (delta < 60) {
			return 'less than a minute ago';
		} else if(delta < 120) {
			return 'about a minute ago';
		} else if(delta < (60*60)) {
			return (parseInt(delta / 60)).toString() + ' minutes ago';
		} else if(delta < (120*60)) {
			return 'about an hour ago';
		} else if(delta < (24*60*60)) {
			return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
		} else if(delta < (48*60*60)) {
			return '1 day ago';
		} else {
			return (parseInt(delta / 86400)).toString() + ' days ago';
		}
	}




/** Facebook Widget
	<div class="fb-like" data-href="http://www.stepofweb.com" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
 **************************************************************** **/
	function _widget_facebook() {

		/** Like & Share Button
		 ************************ **/
		var _container_1 = jQuery('div.fb-like');
		var _container_2 = jQuery('div.fb-share-button');
		
		if(_container_1.length > 0 || _container_2.length > 0) {

			jQuery('body').append('<div id="fb-root"></div>');

			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		
		}

	}





/** Dribbble Widget
 **************************************************************** **/
	function _widget_dribbble() {
		var _container = jQuery(".widget-dribbble");
		
		if(_container.length > 0) {

			loadScript(plugin_path + 'widget.dribbble/jribbble.min.js', function() {

					var _token 	= _container.attr('data-token') 	|| 'f688ac519289f19ce5cebc1383c15ad5c02bd58205cd83c86cbb0ce09170c1b4', // demo default
						_target	= _container.attr('data-target') 	|| '_blank',
						_shots	= _container.attr('data-shots') 	|| 2046896; // demo default

					jQuery.jribbble.setToken(_token);

					jQuery.jribbble.shots(_shots).rebounds().then(function(res) {
						var html = [];

						res.forEach(function(shot) {
							html.push('<li>');
							html.push('<a href="' + shot.html_url + '" target="' + _target + '">');
							html.push('<img class="img-responsive" src="' + shot.images.normal + '" alt="image">');
							html.push('</a></li>');
						});

						_container.html(html.join(''));
					});
			

			});
		
		}

	}





/** Media Widget [mediaelement plugin]
 **************************************************************** **/
	function _widget_media() {
		var _container = jQuery(".widget-media");

		if(_container.length > 0) {

			loadScript(plugin_path + 'widget.mediaelementbuild/mediaelement-and-player.min.js', function() {


			
			});
		
		}

	}





/** **************************************************************************************************************** **/
/** **************************************************************************************************************** **/
/** **************************************************************************************************************** **/
/** **************************************************************************************************************** **/



	// scroll 
	function wheel(e) {
	  e.preventDefault();
	}

	function disable_scroll() {
	  if (window.addEventListener) {
		  window.addEventListener('DOMMouseScroll', wheel, false);
	  }
	  window.onmousewheel = document.onmousewheel = wheel;
	}

	function enable_scroll() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
	}

	// overlay
	function enable_overlay() {
		jQuery("span.global-overlay").remove(); // remove first!
		jQuery('body').append('<span class="global-overlay"></span>');
	}
	function disable_overlay() {
		jQuery("span.global-overlay").remove();
	}






/** COUNT TO
	https://github.com/mhuggins/jquery-countTo
 **************************************************************** **/
 (function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return jQuery(this).each(function () {
			// set options for current element
			var settings = jQuery.extend({}, $.fn.countTo.defaults, {
				from:            jQuery(this).data('from'),
				to:              jQuery(this).data('to'),
				speed:           jQuery(this).data('speed'),
				refreshInterval: jQuery(this).data('refresh-interval'),
				decimals:        jQuery(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = jQuery(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// __construct the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));




/** BROWSER DETECT
	Add browser to html class
 **************************************************************** **/
(function($) {
	$.extend({

		browserDetect: function() {

			var u = navigator.userAgent,
				ua = u.toLowerCase(),
				is = function (t) {
					return ua.indexOf(t) > -1;
				},
				g = 'gecko',
				w = 'webkit',
				s = 'safari',
				o = 'opera',
				h = document.documentElement,
				b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + parseFloat(navigator.appVersion.split("MSIE")[1])) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.jQuery1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.jQuery2 : '')) : is('konqueror') ? 'konqueror' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.jQuery1 : '') : is('mozilla/') ? g : '', is('j2me') ? 'mobile' : is('iphone') ? 'iphone' : is('ipod') ? 'ipod' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js'];

			c = b.join(' ');
			h.className += ' ' + c;

			var isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;

			if(isIE11) {
				jQuery('html').removeClass('gecko').addClass('ie ie11');
				return;
			}

		}

	});
})(jQuery);

 

/** Appear
	https://github.com/bas2k/jquery.appear/
 **************************************************************** **/
(function(a){a.fn.appear=function(d,b){var c=a.extend({data:undefined,one:true,accX:0,accY:0},b);return this.each(function(){var g=a(this);g.appeared=false;if(!d){g.trigger("appear",c.data);return}var f=a(window);var e=function(){if(!g.is(":visible")){g.appeared=false;return}var r=f.scrollLeft();var q=f.scrollTop();var l=g.offset();var s=l.left;var p=l.top;var i=c.accX;var t=c.accY;var k=g.height();var j=f.height();var n=g.width();var m=f.width();if(p+k+t>=q&&p<=q+j+t&&s+n+i>=r&&s<=r+m+i){if(!g.appeared){g.trigger("appear",c.data)}}else{g.appeared=false}};var h=function(){g.appeared=true;if(c.one){f.unbind("scroll",e);var j=a.inArray(e,a.fn.appear.checks);if(j>=0){a.fn.appear.checks.splice(j,1)}}d.apply(this,arguments)};if(c.one){g.one("appear",c.data,h)}else{g.bind("appear",c.data,h)}f.scroll(e);a.fn.appear.checks.push(e);(e)()})};a.extend(a.fn.appear,{checks:[],timeout:null,checkAll:function(){var b=a.fn.appear.checks.length;if(b>0){while(b--){(a.fn.appear.checks[b])()}}},run:function(){if(a.fn.appear.timeout){clearTimeout(a.fn.appear.timeout)}a.fn.appear.timeout=setTimeout(a.fn.appear.checkAll,20)}});a.each(["append","prepend","after","before","attr","removeAttr","addClass","removeClass","toggleClass","remove","css","show","hide"],function(c,d){var b=a.fn[d];if(b){a.fn[d]=function(){var e=b.apply(this,arguments);a.fn.appear.run();return e}}})})(jQuery);

/** Parallax
	http://www.ianlunn.co.uk/plugins/jquery-parallax/
 **************************************************************** **/
(function(a){var b=a(window);var c=b.height();b.resize(function(){c=b.height()});a.fn.parallax=function(e,d,g){var i=a(this);var j;var h;var f=0;function k(){i.each(function(){h=i.offset().top});if(g){j=function(m){return m.outerHeight(true)}}else{j=function(m){return m.height()}}if(arguments.length<1||e===null){e="50%"}if(arguments.length<2||d===null){d=0.5}if(arguments.length<3||g===null){g=true}var l=b.scrollTop();i.each(function(){var n=a(this);var o=n.offset().top;var m=j(n);if(o+m<l||o>l+c){return}i.css("backgroundPosition",e+" "+Math.round((h-l)*d)+"px")})}b.bind("scroll",k).resize(k);k()}})(jQuery);

/** jQuery Easing v1.3
	http://gsgd.co.uk/sandbox/jquery/easing/
 **************************************************************** **/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/** WOW - v1.0.3 - 2015-01-14
	http://mynameismatthieu.com/WOW/
 **************************************************************** **/
(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass,null!=this.config.callback?this.config.callback(a):void 0},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(e=d(a),c=e.getPropertyCSSValue(b),i=this.vendors,g=0,h=i.length;h>g;g++)f=i[g],c=c||e.getPropertyCSSValue("-"+f+"-"+b);return c},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);

/** Modernizr 2.7.1
	http://modernizr.com/download/#-csstransforms3d-csstransitions-video-touch-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 **************************************************************** **/
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.csstransforms3d=function(){var a=!!G("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return G("transition")},q.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,e.prefixed=function(a,b,c){return b?G(a,b,c):G(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

; browserify_shim__define__module__export__(typeof WB != "undefined" ? WB : window.WB);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
window.jQuery = window.$ = require('jquery');
require('angular');
require('lodash');
require('angular-modal-service');
require('angucomplete-alt');
require('angular-bootstrap');

var config = require('./config');

var app = angular.module('COMET', ['angularModalService', "angucomplete-alt", 'ui.bootstrap']);

require('./services.js');
require('./services/spinner');


app.controller('appCtrl', ['$scope', 'ajaxServices', 'jsonServices', function ($scope, ajaxServices, jsonServices) {

	var curForm = "WRX2002";
	var resId = "12404";
	var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;

	$scope.loadPath = url;
	

	$scope.menu = {};
}]);

require('./modalInstanceCtrl.js');

require('./directives/glyphSpinner');
require('./directives.js');
require('./directives/cometMenu');

window.plugin_path = 'assets/plugins/';
require('wb02dsn1b');


// .config(function($mdThemingProvider) {
//   // $mdThemingProvider.theme('altTheme')
//   //   .primaryPalette('purple')
// });

},{"./config":3,"./directives.js":4,"./directives/cometMenu":5,"./directives/glyphSpinner":6,"./modalInstanceCtrl.js":7,"./services.js":8,"./services/spinner":9,"angucomplete-alt":10,"angular":"angular","angular-bootstrap":"angular-bootstrap","angular-modal-service":"angular-modal-service","jquery":"jquery","lodash":"lodash","wb02dsn1b":1}],3:[function(require,module,exports){
module.exports = {
	base_url: "http://"+location.hostname,
	port: location.hostname.indexOf('lintechhq')>=0 ? 3757 : location.port

};

},{}],4:[function(require,module,exports){
var app = angular.module('COMET');
var config = require('./config');

app.directive('cometForm', ['jsonServices','$filter', 'ajaxServices', '$uibModal','autoCompleteServices', 'cometServices', 'afterFieldServices', 'menuServices', 'spinnerServ',
	function(jsonServices, $filter, ajaxServices, $uibModal, autoCompleteServices, cometServices, afterFieldServices, menuServices, spinnerServ) {
	return{
		restrict: 'E',
		transclude: true,
		scope: {
			loadPath: '=loadPath',
			formTitle: '=formTitle',
			closeFunction: '&'

		},
		controller: ['$scope', '$uibModal', '$log', "formService",
		function($scope, $uibModal, $log, formService, elem){
			var self = this;
			self.element = undefined;
			self.formScope = undefined;
			self.submitVal = "Send Form";
			require: 'form';
			self.sessionId ="";
			self.errorMessage="";
			self.urlPrefix = config.base_url+":"+config.port;
			self.modalLoaded = false;

			self.getFormData = function(){
				if(self.formData == undefined){
					return [];
				}
				return self.formData.fields;
			}
			self.hasError = function(){
				return self.errorMessage!="";
			}

			self.sendForm = function(){
			};

			self.buildAutoCompleteQuery = function(fieldId, request){
				return autoCompleteServices.buildAutoCompleteQuery(self.formData.form[0].id, fieldId, request, self.sessionId);
			};

			self.formatAutoCompleteResponse = function(result){
				if(result){
					return autoCompleteServices.formatAutoCompleteResponse(result);
				}
			};

			self.handleAutoCompleteResult = function(res){
				self.formData = autoCompleteServices.handleAutoCompleteResult(res, self.formData, self.dataMap);
				elementToValidate = jsonServices.getDataValue(self.formData, self.dataMap[this.id]);
				if(elementToValidate.ServerValidation){
					afterFieldServices.sendAfterFieldRequest(self.formData, self.dataMap, elementToValidate.id, elementToValidate.value, elementToValidate.ServerValidation, elementToValidate.ServerValidationParameters);
				}
			}

			self.loadModalForm = function (modalForm, modalFormParameters){
				var modalUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=DATAFORM&STAGE=REQUEST&MODE=0&\
	FORMCODE="+self.currentForm+"&REQUEST="+modalForm+"&DATA=^";
				var dataQueryString = cometServices.buildRequestQueryString(modalFormParameters, self.formData, self.dataMap);
				var modalQueryUrl = modalUrl+dataQueryString;
				var modalInstance = $uibModal.open({
	      			animation: true,
	      			templateUrl: "tpl/modal.tpl.html",
	      			controller: "ModalInstanceCtrl",
	      			 resolve: {
				        loadPath: function(){
				        	return modalQueryUrl;
				        }
				//        formTitle:  "Please wait. Loading form", 
				       // modal: this
	      			}
	    		});

			    modalInstance.result.then(function (modalRes) {
			     	afterFieldServices.handleAfterFieldResponse(modalRes, self.formData, self.dataMap);
					self.modalLoaded = false;
			  	});
			}




			/*	modalUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=DATAFORM&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&REQUEST="+modalForm+"&DATA=^";
				dataQueryString = cometServices.buildRequestQueryString(modalFormParameters, self.formData, self.dataMap);
				modalQueryUrl = modalUrl+dataQueryString;
				ModalService.showModal({
						templateUrl: "tpl/modal.tpl.html",
						controller: "modalController",
						inputs: { loadPath: modalQueryUrl, formTitle: "Please wait. Loading form", modal: this}
				}).then(function(modal){
						console.log(modal);
						modal.element.modal();
						console.log("modal open");
						self.modalLoaded = true;
						modal.close.then(function(modalRes){
							afterFieldServices.handleAfterFieldResponse(modalRes, self.formData, self.dataMap);
							self.modalLoaded = false;
						});
				}).catch(function(error){
					console.log(error);
				})
			};*/
			self.getFieldDisplay = function(field, row){
				if(field.visible=="false" || field.type=="hidden"){
					return "item-hidden";
				}
				var columnWidth = "col-md-"+Math.round(12/row.length);
				return "item "+columnWidth;
			};

			self.getDateField = function(fieldVal){
				return Date(fieldVal);
			}

			self.initForm = function initForm(){
				self.formScope = self.element.find('form').scope();
			};

			self.save = function() {
				console.log("Save");
				spinnerServ.show();
				if(self.modalLoaded == true){
					var queryString = jsonServices.buildQueryString(self.formData)+"&SERVICE=DATAFORM";
					ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(response){
						if(response.error){
							self.errorMessage =  response.error;
						}
						else{
							self.closeFunction({res: response});
						}
						spinnerServ.hide();
					});
					return;
				}
				var queryString = jsonServices.buildQueryString(self.formData);
				ajaxServices.httpPromise(self.urlPrefix, queryString).then(function(res){
					if(self.$modalInstance){
						$modalInstance.close();
					}
					else{
						self.handleResponse(res);
					}
					spinnerServ.hide();
				});

			};

			self.handleResponse = function(res){
				if (typeof res === "string") {
					return;
				}
				if(res.error){
					self.errorMessage = res.error;
				}
				else{
					self.errorMessage = "";
				}
				if(res.menu){
					console.log(res.menu);
					$scope.$parent.menu=res.menu;
					var curForm = "WRX2002";
					var resId = "12404";
					var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+curForm+"&STAGE=REQUEST&COMETSID="+self.sessionId+"&ID="+resId;
					menuServices.updateMenu(res.menu);
					self.loadNextForm(url);
					return;
				}
				if(res.instructions){
					self.loadNextForm(res.instructions[0].COMETMainLocation);
				}
				else{
					self.serverData = res;
					self.setupForm();
				}
			};

			self.loadNextForm = function(path){
				spinnerServ.show();
				ajaxServices.httpPromise(self.urlPrefix, path).then(function(res){
				//ajaxServices.httpPromise("", "json_src/wrx2002.json").then(function(res){
					self.handleResponse(res);
					spinnerServ.hide();
				});
			};

			self.setupForm = function(){
				serverData = self.serverData;
				self.sessionId = serverData.session[0].COMETSID;
				self.currentForm = serverData.form[0].id;
				self.formTitle = serverData.form[0].title;
				self.formData = jsonServices.parseJson(serverData);
				console.log(self.formData);
				self.dataMap = jsonServices.mapJson(serverData);
			};

			self.reset = function() {
				console.log("reset");
				$scope.$broadcast('show-errors-reset');
			};


			self.getElementLabel = function(elementId){
				element = jsonServices.getDataValue(self.formData, self.dataMap[elementId]);
				if(element != undefined){
					return element.label;
				}
				else
					return "";
			};

			self.buildRequestQueryString = function(fieldsStr){
				console.log(self.dataMap);
				return cometServices.buildRequestQueryString(fieldStr, self.formData, self.dataMap);

			};

			self.sendQuickSearchRequest =  function(fieldId, fieldValue, request){
					url = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+self.sessionId+"&COMETMode=JS&SERVICE=SRCHFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+self.currentForm+"&FIELD="+fieldId+"&SCRLN=undefined&REQUEST="+request+"&SRCHFLD="+fieldValue;
					ajaxServices.httpDebounce(self.urlPrefix, url, self.handleQuickSearchResponse);
			};


			self.loadNextForm(self.loadPath);

			$scope.$watch(function() {
				return formService.currentForm;
			}, function (curForm) {
				var url = "/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=DATAFORM&REQUEST="+
				curForm + "&STAGE=REQUEST&COMETSID=" + self.sessionId;
				self.loadNextForm(url);
			});


		}], //close controller

		controllerAs: 'formCtrl',
		bindToController: true,
		templateUrl: function(elem, attr){
			return 'tpl/form.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			elem.bind('blur', function(val){
			});	
			if(elem[0].attributes['close-function']){
				ctrl.modalLoaded = true;
			}
		}
	} // close return from first line of directive
}])

.directive('cometField',[ '$compile','ajaxServices', function( $compile, ajaxServices ){
	var getTemplate = function(type){
			return 'tpl/'+type+'.tpl.html';
		};
	var linker = function(scope, element, attr, ctrl){
			//fieldJson = JSON.parse(scope.field);

			var url = "tpl/"+scope.field.type+".tpl.html";
			ajaxServices.httpPromise(self.urlPrefix, url).then(function(result){
				var elem = $compile(result)(scope);	
				element.append(elem[0]);
			});

			element.bind('keyup', function(){
				//console.log(form)
			})
			

		};

	return{
		restrict: 'EA',
		scope: {
			field: '=',
		},
		link: linker,
		require: '?testForm',
	}
}])

.directive('showErrors', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, element, attr, formCtrl) {
			var inputEl = element[0].querySelector("[name]");
			var inputNgEl = angular.element(inputEl);

			scope.$on('show-errors-check-validity', function(){
				var inputName = inputNgEl.attr('name');
				if(inputName != undefined){
					element.toggleClass('has-error', formCtrl[inputName].$invalid);
				}
			});

			scope.$on('show-errors-reset', function() {
  				$timeout(function() {
    				element.removeClass('has-error');
  				}, 0, false);
			});

			scope.$on('hide-empty', function(){
				console.log(element);
			})
			

			

			inputNgEl.bind('blur', function(){
			 	var inputName = inputNgEl.attr('name');
			 	element.toggleClass('has-error', formCtrl[inputName].$invalid);
			});
			
		}
	};
}])


.directive('validateText', ['ajaxServices', 'jsonServices', 'afterFieldServices', function (ajaxServices, jsonServices, afterFieldServices) {
	return {
		restrict: 'A',
		require: '^cometForm',
		controller: ['$scope', function($scope) {
				self.isDisabled = function(fieldId){
				console.log(jsonServices.getDataValue(self.formData, self.dataMap[fieldId]));
				if(jsonServices.getDataValue(self.formData, self.dataMap[fieldId]).disabled=="true"){
					console.log(fieldId + " is disabled");
					return "true";
				}
				console.log(fieldId + " is enabled");
				return "false";
			}
		}],
		
		link: function (scope, element, attr, formCtrl) {
			element.bind('keyup', function(){
				var inputName = element.attr('name');
				var dataFormat = element.attr('dataformat');
				var valid = true;
			//	var callquickSearch = _.debounce(formCtrl.sendQuickSearchRequest,1500,false);
				if(dataFormat){
					switch(dataFormat.toLowerCase()){
						case "alphanumeric":
							element[0].$setValidity("alphanumeric",is.alphaNumeric(element[0].value));
						break;
						case "phonenumber":
							element[0].$setValidity("phonenumber",is.nanpPhone(element[0].value));
						break;
						case "socialsecuritynumber":
							element[0].$setValidity("socialsecurity",is.socialSecurityNumber(element[0].value));
						break;
						case "zipcode":
							element[0].$setValidity("zipcode",is.usZipCode(element[0].value));
						break;

					}
				}
				element.toggleClass('has-error', element[0].$invalid);
			});

			element.bind('blur', function(){
				if(element.attr('dataformat') != undefined && element.attr('dataformat').toLowerCase() == "capitalletters"){
					element.addClass("text-uppercase");
				}
				if(attr.afterTextValidation){
					afterFieldServices.sendAfterFieldRequest(formCtrl.formData, formCtrl.dataMap, element[0].name, element[0].value, attr.afterTextValidation, attr.afterTextParams);
				}
			});


		}
	};
}])

.directive('cometCheckbox', ['jsonServices', 'ajaxServices','afterFieldServices', function(jsonServices, ajaxServices,afterFieldServices){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('change', function(){
				numericVal = elem[0].checked ? 1 : 0;
				afterFieldServices.sendAfterFieldRequest(formCtrl.formData, formCtrl.dataMap, attr.name, numericVal, attr.afterTextValidation, attr.afterTextParams);
			});
		}
	}
}])

.directive('modalFormButton', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('click', function(){
				formCtrl.loadModalForm(attr.modalForm, attr.modalFormParams)
			});
		}
	}
}])

.directive('submitButton', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			elem.bind('click', function(){
				elem.toggleClass('active');
			});
		}
	}
}])


.directive('hideEmpty', [function(){
	return{
		restrict: 'A',
		require: '^cometForm',
		link: function(scope, elem, attr, formCtrl){
			if(attr.optionsCount==0){
				elem.parent().hide();
			}
		}
	}
}])



},{"./config":3}],5:[function(require,module,exports){
var app = angular.module('COMET');
var config = require('../config');

app.directive('cometMenu', ['jsonServices','$filter', 'ajaxServices', 'cometServices', 'menuServices',
function(jsonServices, $filter, ajaxServices, cometServices, menuServices ) {
	return {
		restrict: 'AE',
		scope: {},
		controller: ['$scope', 'formService',
		function($scope, formService, elem){
			var self = this;
			self.currentTopic = {};
			self.urlPrefix = config.base_url+":"+config.port;
			self.loadPath = "/comet.icsp?MGWLPN=iCOMET&COMETSID=&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WSY1001&STAGE=REQUEST";
			self.formTitle = "COMET Login"
			self.menuData = []; 

			$scope.reloadForm = function (item) {
				console.log(item.label);
				formService.updateForm(item.request);
			}

			$scope.$watch(function() {
				return menuServices.data;
			}, function (newValue, oldValue) {
				self.menuData = newValue;
			});
		}], //close controller

		controllerAs: 'menuCtrl',
		bindToController: true,
		transclude: false,
		templateUrl: function(elem, attr){
			return 'tpl/menu.tpl.html';
		},
		link: function(scope, elem, attr,ctrl){
			scope.$watch(
				"$scope.$parent.menu",
				function(menu){
					console.log("My Watch Watches");
					self.menuData = menu;
			})

		}
	} // close return from first line of directive
}]);
},{"../config":3}],6:[function(require,module,exports){
var app = angular.module('COMET');

app.directive('glyphSpinner', ['spinnerServ', function (spinnerServ) {

	function link(scope, elem, attr) {
		scope.display = spinnerServ.display;

		scope.$watch(function () {
			return spinnerServ.display;
		}, function (value) {
			scope.display = value;
		})
	}


	var template = "<div style='display: {{ display }}' class='glyph-spinner'><i class='fa fa-spinner fa-spin fa-3x'></i><span>Please wait while loading…</span></div>";

	return {	
		restrict: 'E',
		link: link,
		template: template
	}	
}]);
},{}],7:[function(require,module,exports){
// app.controller('modalController',['$scope', 'close','loadPath', 'formTitle', '$element', function($scope, close, loadPath, formTitle, $element){
	
// 	$scope.loadPath = loadPath;
// 	//$scope.formElements = data.form[0];
// 	$scope.title = formTitle;

// 	$scope.dismissModal = function(res){
// 		close(res, 200);
// 		//angular modal clashes with bootstrap modal. The following lines take care of bootstrap
// 		$(".modal-backdrop").remove();
// 		$("body").removeClass("modal-open");
// 	}

// }]);

app  = angular.module('COMET');
var $ = require('jquery');

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, loadPath) {

 

  $scope.loadPath = loadPath;
  
  console.log($scope);
  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.getPath = function(){
  	return loadPath;
  }
});
},{"jquery":"jquery"}],8:[function(require,module,exports){
var app = angular.module('COMET');
var config = require('./config');

app.factory('jsonServices', [ '$http' , function ($http) {
	return {
			parseJson: function(jsonObject){
				for(row in jsonObject.fields){
					for(singleField in jsonObject.fields[row]){
						var field = jsonObject.fields[row][singleField];
						if(field.type == undefined){
							continue;
						}
						if(field.type.toLowerCase() == "text"){
							if(field.search){
								field.type = "autocomplete";
							}
							if(field.Format!=undefined){
							switch(field.Format.toLowerCase()){
								case "date":
									if(field.value == undefined || field.value == ""){
										field.value = new Date();
									}
									else{
										field.value = new Date(field.value);
									}
									field.type = "date";
									break;
								case "time":
									if(field.value=""){
									//	field.value = "00:00:00";
									}
									field.type = "time";
									break;
								case "browse":
									field.required = "false";
									break;
								case "float":
								case "float1":
								case "float4":
								case "numeric":
									field.value= + field.value;
									field.type = "number";
									break;
							}
						}
					}
					if(field.value!=null && field.value!="" && angular.isString(field.value)){
							field.size = field.value.length * 10;
						
					}
					else{
						field.size=100;
					}
				}
			}
				return jsonObject;
			},

			mapJson: function(jsonObject){
				jsonMap = [];
				for(row in jsonObject.fields){
					for(singleField in jsonObject.fields[row]){
						var field = jsonObject.fields[row][singleField];
						jsonMap[field.id] = ""+row+"-"+singleField;
					}
				}
				return jsonMap;
			},

			getDataValue: function(jsonObject, key){
				if(key == undefined){
					return "";
				}
				var row = key.substring(0, key.indexOf("-"));
				var field = key.substring(key.indexOf("-")+1);
				return jsonObject.fields[row][field];
			},


			buildQueryString: function(formData){
				queryString = formData.session[0].COMETURL;
				queryString += "&REQUEST="+formData.form[0].id;
				for(row in formData.fields){
					for(field in formData.fields[row]){
						if(angular.isObject(formData.fields[row][field]))
							queryString += "&"+formData.fields[row][field].id+"="+formData.fields[row][field].value;
					}
				}
				queryString +="&STAGE=SAVE"
				return encodeURI(queryString);
			}
	};
}])


.factory('ajaxServices', ['$q', '$http', '$templateCache', function ($q, $http, $templateCache) {
	return {
		httpPromise: function(url_prefix, url){
			$http.defaults.useXDomain = true;
			var fullUrl = url_prefix+url;
			delete $http.defaults.headers.common['X-Requested-with'];
			var data = $templateCache.get(fullUrl);
			if (data) {
		         return $q.when(data);
		    } else {
		        var deferred = $q.defer();
		        $http.get(fullUrl, { cache: true}).success(function (html) {
		            $templateCache.put(url, html);

		            deferred.resolve(html);
		    	});
	        	return deferred.promise;
		    }
		},
		httpDebounce: _.debounce(function(prefix, url, callback){
			this.httpPromise(prefix,url).then(function(res){
				callback(res);
			
			})
		}, 500, false)
 	} 
}])

.factory('cometServices', ['jsonServices',function (jsonServices) {
	return {
		getUrlPrefix: function(){
			return config.base_url+":"+config.port;
		},

		buildRequestQueryString: function(fieldsStr, formData, dataMap){
			var dataArr = [];
			var queryString = "";
			if(fieldsStr != ""){
				dataArr = fieldsStr.split(";");
			}
			if(dataArr.length){
				for(element in dataArr){
					elementValue = jsonServices.getDataValue(formData, dataMap[dataArr[element]]);
					if(elementValue.type=="date"){
						elementDateValue = elementValue.value;
						elementStringValue = elementDateValue.getFullYear()+'-'+elementDateValue.getMonth()+'-'+elementDateValue.getDate();
					}
					else if(elementValue.type=="time"){
						elementTimeValue = elementValue.value;
						if(elementTimeValue != "")
						{
							var hr = elementTimeValue.getHours();
							if(hr < 10) hr = "0"+hr;
							var mn = elementTimeValue.getMinutes();
							if(mn < 10) mn = "0"+mn;
							elementStringValue = hr+':'+mn;
						}
					}	
					else {
						elementStringValue = elementValue.value;	
					}
					queryString += "^"+dataArr[element]+"="+elementStringValue;
				}
			}
			return queryString;
		}
	}
}])

.factory('autoCompleteServices', ['cometServices', 'jsonServices', function(cometServices, jsonServices){
	return{
		buildAutoCompleteQuery: function(formId, fieldId, request, sessionId){
			var queryString = cometServices.getUrlPrefix()+"/comet.icsp?MGWLPN=iCOMET&COMETMode=JS&SERVICE=SRCHFLD&STAGE=REQUEST&MODE=0&";
			queryString += "FORMCODE="+formId+"&FIELD="+fieldId+"&COMETSID="+sessionId+"&REQUEST="+request+"&SRCHFLD=";
			return queryString;
		},

		formatAutoCompleteResponse: function(result){
			for(line in result.results){
				disp = result.results[line].display;
				var displayList = "";
				// displayList = "<ul class=\"list-unstyled\">";
				for(element in disp){
					// displayList+= "<li>"+disp[element]+"</li>";
					displayList+= disp[element]+" | ";
				}
				// displayList+= "</ul>";
				result.results[line].finalDisplay = displayList;//"<ul  style='font-size:11px'><li>"+disp.data2+"</li><li>"+disp.data1+" - "+disp.data3+"</li></ul>";
				//result.results[line].finalDisplay = disp.data2+" ("+disp.data1+")";
			}
			return result;
		},

		handleAutoCompleteResult: function(res, formData, dataMap){
			var fieldsToUpdate = res.originalObject.update;
			for(field in fieldsToUpdate){
				element = jsonServices.getDataValue(formData, dataMap[field]);
				element.value = fieldsToUpdate[field];
			}
			return formData;
		}
	}
}])

.factory('afterFieldServices', ['cometServices', 'jsonServices', 'ajaxServices', function(cometServices, jsonServices, ajaxServices){
	return{
		handleAfterFieldResponse: function(responseJson, formData, dataMap){
			fields = responseJson.fields;
			for(field in fields){
				if( dataMap[fields[field].id] == undefined){
					console.log("An unrecognized attribute was received: "+fields[field].id + "("+fields[field].value+")");
				}
				else{
					fieldToChange = jsonServices.getDataValue(formData, dataMap[fields[field].id]);
					switch(fieldToChange.type){
						case "number":
							fields[field].value = parseInt(fields[field].value);
							break;
						case "date":
							fields[field].value = new Date(fields[field].value);
							break;
						case "time":
							var timeArray = fields[field].value.split(":");
							var inputDate = new Date();
							inputDate.setHours(timeArray[0]);
							inputDate.setMinutes(timeArray[1]);
							fields[field].value = inputDate;
					}
					for(attr in fields[field]){
						fieldToChange[attr] = fields[field][attr];
						if(attr == "disabled"){
							toDisable = fields[field][attr] == "true" ? true : false
								document.querySelector("#"+fields[field].id).disabled=toDisable;					
						}
					}
					
				}
			}
		return formData;
		//self.setupForm();
		},

		sendAfterFieldRequest: function(formData, dataMap, fieldId, fieldValue, request, data){
			var self = this;
			sessionId = formData.session[0].COMETSID;
			formId = formData.form[0].id;
			validateUrl = "/comet.icsp?MGWLPN=iCOMET&COMETSID="+sessionId+"&COMETMode=JS&SERVICE=AFTERFLD&STAGE=REQUEST&MODE=0&\
FORMCODE="+formId+"&FIELD="+fieldId+"&REQUEST="+request+"&DATA=^"+fieldId+"="+fieldValue;
			dataQueryString = cometServices.buildRequestQueryString(data, formData, dataMap);
			validateUrl = validateUrl+dataQueryString;
			ajaxServices.httpPromise(cometServices.getUrlPrefix(), validateUrl).then(function(res){
				formData = self.handleAfterFieldResponse(res, formData, dataMap);
			})
		}

	}
}])

.factory('menuServices', [function () {
	var menu = {
		data: {}	
	};

	menu.updateMenu = function (data) {
		// save 'divideRatio' in data for each category
		calculateDivideRatio(data);
		// save 'layoutColumns' in data for each category
		generateLayout(data);

		menu.data = data;
	}

	function calculateDivideRatio(data) {
		data.forEach(function(category, index) {
			// group title should be counted as well as group items 
			var items = category.groups.length; 

			category.groups.forEach(function(group) {
				// exclude the empty groups
				if (group.items.length === 0) items--; 
				
				// add group items
				items += group.items.length;
			});
			// an average value of dividing items into colums
			category.divideRatio = ~~(Math.sqrt(items) + 1); 
		}); 
	}

	function generateLayout(data) {
		data.forEach(function(category) {
			// change the ratio between columns and rows
			var rows = ~~(category.divideRatio * 1.67 + 2);

			var list = [ [] ];
			var currentColumn = 0, currentRow = 0;

			category.groups.forEach(function (group) {
				// we don't want to display empty groups
				if (group.items.length > 0) {

					// prevent the group title to be the last item in the column
					if (currentRow === rows - 1) nextColumn();

					// add group to the column
					list[currentColumn].push(group);
					currentRow++;
					if (currentRow >= rows) nextColumn();

					// add each item of the group to the column
					group.items.forEach(function (item) {
						list[currentColumn].push(item);
						currentRow++;
						if (currentRow >= rows) nextColumn();
					});
				};	
			});

			function nextColumn () {
				currentRow = 0; 
				currentColumn++; 
				list.push([]); 
			}

			category.layoutColumns = list;
		});
	}
	return menu;
}])

.factory("formService", function() {
	var form = {
		currentForm: "WRX2002"
	};

	form.updateForm = function (formCode) {
		form.currentForm = formCode;
	};

	return form;
});
},{"./config":3}],9:[function(require,module,exports){
var app = angular.module('COMET');

app.factory("spinnerServ", function() {
	var spin = 0;
	var spinner = {
		display: 'none'
	};

	spinner.show = function () {
		spinner.display = 'block';
		spin++;
	}

	spinner.hide = function () {
		spin = spin > 0 ? spin - 1 : 0;

		if (spin === 0) {
			spinner.display = 'none';
		}
	}
	return spinner;
});

},{}],10:[function(require,module,exports){
/*
 * angucomplete-alt
 * Autocomplete directive for AngularJS
 * This is a fork of Daryl Rowland's angucomplete with some extra features.
 * By Hidenari Nozaki
 */

/*! Copyright (c) 2014 Hidenari Nozaki and contributors | Licensed under the MIT license */

(function (root, factory) {
  'use strict';
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = factory(require('angular'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['angular'], factory);
  } else {
    // Global Variables
    factory(root.angular);
  }
}(window, function (angular) {
  'use strict';

  angular.module('angucomplete-alt', []).directive('angucompleteAlt', ['$q', '$parse', '$http', '$sce', '$timeout', '$templateCache', '$interpolate', function ($q, $parse, $http, $sce, $timeout, $templateCache, $interpolate) {
    // keyboard events
    var KEY_DW  = 40;
    var KEY_RT  = 39;
    var KEY_UP  = 38;
    var KEY_LF  = 37;
    var KEY_ES  = 27;
    var KEY_EN  = 13;
    var KEY_TAB =  9;

    var MIN_LENGTH = 3;
    var MAX_LENGTH = 524288;  // the default max length per the html maxlength attribute
    var PAUSE = 500;
    var BLUR_TIMEOUT = 200;

    // string constants
    var REQUIRED_CLASS = 'autocomplete-required';
    var TEXT_SEARCHING = 'Searching...';
    var TEXT_NORESULTS = 'No results found';
    var TEMPLATE_URL = '/angucomplete-alt/index.html';

    // Set the default template for this directive
    $templateCache.put(TEMPLATE_URL,
        '<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">' +
        '  <input id="{{id}}_value" name="{{inputName}}" tabindex="{{fieldTabindex}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)"/>' +
        '  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">' +
        '    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>' +
        '    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>' +
        '    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">' +
        '      <div ng-if="imageField" class="angucomplete-image-holder">' +
        '        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>' +
        '        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>' +
        '      </div>' +
        '      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>' +
        '      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>' +
        '      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>' +
        '      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );

    function link(scope, elem, attrs, ctrl) {
      var inputField = elem.find('input');
      var minlength = MIN_LENGTH;
      var searchTimer = null;
      var hideTimer;
      var requiredClassName = REQUIRED_CLASS;
      var responseFormatter;
      var validState = null;
      var httpCanceller = null;
      var dd = elem[0].querySelector('.angucomplete-dropdown');
      var isScrollOn = false;
      var mousedownOn = null;
      var unbindInitialValue;
      var displaySearching;
      var displayNoResults;

      elem.on('mousedown', function(event) {
        if (event.target.id) {
          mousedownOn = event.target.id;
          if (mousedownOn === scope.id + '_dropdown') {
            document.body.addEventListener('click', clickoutHandlerForDropdown);
          }
        }
        else {
          mousedownOn = event.target.className;
        }
      });

      scope.currentIndex = scope.focusFirst ? 0 : null;
      scope.searching = false;
      unbindInitialValue = scope.$watch('initialValue', function(newval) {
        if (newval) {
          // remove scope listener
          unbindInitialValue();
          // change input
          handleInputChange(newval, true);
        }
      });

      scope.$watch('fieldRequired', function(newval, oldval) {
        if (newval !== oldval) {
          if (!newval) {
            ctrl[scope.inputName].$setValidity(requiredClassName, true);
          }
          else if (!validState || scope.currentIndex === -1) {
            handleRequired(false);
          }
          else {
            handleRequired(true);
          }
        }
      });

      scope.$on('angucomplete-alt:clearInput', function (event, elementId) {
        if (!elementId || elementId === scope.id) {
          scope.searchStr = null;
          callOrAssign();
          handleRequired(false);
          clearResults();
        }
      });

      scope.$on('angucomplete-alt:changeInput', function (event, elementId, newval) {
        if (!!elementId && elementId === scope.id) {
          handleInputChange(newval);
        }
      });

      function handleInputChange(newval, initial) {
        if (newval) {
          if (typeof newval === 'object') {
            scope.searchStr = extractTitle(newval);
            callOrAssign({originalObject: newval});
          } else if (typeof newval === 'string' && newval.length > 0) {
            scope.searchStr = newval;
          } else {
            if (console && console.error) {
              console.error('Tried to set ' + (!!initial ? 'initial' : '') + ' value of angucomplete to', newval, 'which is an invalid value');
            }
          }

          handleRequired(true);
        }
      }

      // #194 dropdown list not consistent in collapsing (bug).
      function clickoutHandlerForDropdown(event) {
        mousedownOn = null;
        scope.hideResults(event);
        document.body.removeEventListener('click', clickoutHandlerForDropdown);
      }

      // for IE8 quirkiness about event.which
      function ie8EventNormalizer(event) {
        return event.which ? event.which : event.keyCode;
      }

      function callOrAssign(value) {
        if (typeof scope.selectedObject === 'function') {
          scope.selectedObject(value);
        }
        else {
          scope.selectedObject = value;
        }

        if (value) {
          handleRequired(true);
        }
        else {
          handleRequired(false);
        }
      }

      function callFunctionOrIdentity(fn) {
        return function(data) {
          return scope[fn] ? scope[fn](data) : data;
        };
      }

      function setInputString(str) {
        callOrAssign({originalObject: str});

        if (scope.clearSelected) {
          scope.searchStr = null;
        }
        clearResults();
      }

      function extractTitle(data) {
        // split title fields and run extractValue for each and join with ' '
        return scope.titleField.split(',')
          .map(function(field) {
            return extractValue(data, field);
          })
          .join(' ');
      }

      function extractValue(obj, key) {
        var keys, result;
        if (key) {
          keys= key.split('.');
          result = obj;
          for (var i = 0; i < keys.length; i++) {
            result = result[keys[i]];
          }
        }
        else {
          result = obj;
        }
        return result;
      }

      function findMatchString(target, str) {
        var result, matches, re;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        // Escape user input to be treated as a literal string within a regular expression
        re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        if (!target) { return; }
        if (!target.match || !target.replace) { target = target.toString(); }
        matches = target.match(re);
        if (matches) {
          result = target.replace(re,
              '<span class="'+ scope.matchClass +'">'+ matches[0] +'</span>');
        }
        else {
          result = target;
        }
        return $sce.trustAsHtml(result);
      }

      function handleRequired(valid) {
        scope.notEmpty = valid;
        validState = scope.searchStr;
        if (scope.fieldRequired && ctrl && scope.inputName) {
          ctrl[scope.inputName].$setValidity(requiredClassName, valid);
        }
      }

      function keyupHandler(event) {
        var which = ie8EventNormalizer(event);
        if (which === KEY_LF || which === KEY_RT) {
          // do nothing
          return;
        }

        if (which === KEY_UP || which === KEY_EN) {
          event.preventDefault();
        }
        else if (which === KEY_DW) {
          event.preventDefault();
          if (!scope.showDropdown && scope.searchStr && scope.searchStr.length >= minlength) {
            initResults();
            scope.searching = true;
            searchTimerComplete(scope.searchStr);
          }
        }
        else if (which === KEY_ES) {
          clearResults();
          scope.$apply(function() {
            inputField.val(scope.searchStr);
          });
        }
        else {
          if (minlength === 0 && !scope.searchStr) {
            return;
          }

          if (!scope.searchStr || scope.searchStr === '') {
            scope.showDropdown = false;
          } else if (scope.searchStr.length >= minlength) {
            initResults();

            if (searchTimer) {
              $timeout.cancel(searchTimer);
            }

            scope.searching = true;

            searchTimer = $timeout(function() {
              searchTimerComplete(scope.searchStr);
            }, scope.pause);
          }

          if (validState && validState !== scope.searchStr && !scope.clearSelected) {
            scope.$apply(function() {
              callOrAssign();
            });
          }
        }
      }

      function handleOverrideSuggestions(event) {
        if (scope.overrideSuggestions &&
            !(scope.selectedObject && scope.selectedObject.originalObject === scope.searchStr)) {
          if (event) {
            event.preventDefault();
          }

          // cancel search timer
          $timeout.cancel(searchTimer);
          // cancel http request
          cancelHttpRequest();

          setInputString(scope.searchStr);
        }
      }

      function dropdownRowOffsetHeight(row) {
        var css = getComputedStyle(row);
        return row.offsetHeight +
          parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
      }

      function dropdownHeight() {
        return dd.getBoundingClientRect().top +
          parseInt(getComputedStyle(dd).maxHeight, 10);
      }

      function dropdownRow() {
        return elem[0].querySelectorAll('.angucomplete-row')[scope.currentIndex];
      }

      function dropdownRowTop() {
        return dropdownRow().getBoundingClientRect().top -
          (dd.getBoundingClientRect().top +
           parseInt(getComputedStyle(dd).paddingTop, 10));
      }

      function dropdownScrollTopTo(offset) {
        dd.scrollTop = dd.scrollTop + offset;
      }

      function updateInputField(){
        var current = scope.results[scope.currentIndex];
        if (scope.matchClass) {
          inputField.val(extractTitle(current.originalObject));
        }
        else {
          inputField.val(current.title);
        }
      }

      function keydownHandler(event) {
        var which = ie8EventNormalizer(event);
        var row = null;
        var rowTop = null;

        if (which === KEY_EN && scope.results) {
          if (scope.currentIndex >= 0 && scope.currentIndex < scope.results.length) {
            event.preventDefault();
            scope.selectResult(scope.results[scope.currentIndex]);
          } else {
            handleOverrideSuggestions(event);
            clearResults();
          }
          scope.$apply();
        } else if (which === KEY_DW && scope.results) {
          event.preventDefault();
          if ((scope.currentIndex + 1) < scope.results.length && scope.showDropdown) {
            scope.$apply(function() {
              scope.currentIndex ++;
              updateInputField();
            });

            if (isScrollOn) {
              row = dropdownRow();
              if (dropdownHeight() < row.getBoundingClientRect().bottom) {
                dropdownScrollTopTo(dropdownRowOffsetHeight(row));
              }
            }
          }
        } else if (which === KEY_UP && scope.results) {
          event.preventDefault();
          if (scope.currentIndex >= 1) {
            scope.$apply(function() {
              scope.currentIndex --;
              updateInputField();
            });

            if (isScrollOn) {
              rowTop = dropdownRowTop();
              if (rowTop < 0) {
                dropdownScrollTopTo(rowTop - 1);
              }
            }
          }
          else if (scope.currentIndex === 0) {
            scope.$apply(function() {
              scope.currentIndex = -1;
              inputField.val(scope.searchStr);
            });
          }
        } else if (which === KEY_TAB) {
          if (scope.results && scope.results.length > 0 && scope.showDropdown) {
            if (scope.currentIndex === -1 && scope.overrideSuggestions) {
              // intentionally not sending event so that it does not
              // prevent default tab behavior
              handleOverrideSuggestions();
            }
            else {
              if (scope.currentIndex === -1) {
                scope.currentIndex = 0;
              }
              scope.selectResult(scope.results[scope.currentIndex]);
              scope.$digest();
            }
          }
          else {
            // no results
            // intentionally not sending event so that it does not
            // prevent default tab behavior
            if (scope.searchStr && scope.searchStr.length > 0) {
              handleOverrideSuggestions();
            }
          }
        } else if (which === KEY_ES) {
          // This is very specific to IE10/11 #272
          // without this, IE clears the input text
          event.preventDefault();
        }
      }

      function httpSuccessCallbackGen(str) {
        return function(responseData, status, headers, config) {
          // normalize return obejct from promise
          if (!status && !headers && !config && responseData.data) {
            responseData = responseData.data;
          }
          scope.searching = false;
          processResults(
            extractValue(responseFormatter(responseData), scope.remoteUrlDataField),
            str);
        };
      }

      function httpErrorCallback(errorRes, status, headers, config) {
        // cancelled/aborted
        if (status === 0 || status === -1) { return; }

        // normalize return obejct from promise
        if (!status && !headers && !config) {
          status = errorRes.status;
        }
        if (scope.remoteUrlErrorCallback) {
          scope.remoteUrlErrorCallback(errorRes, status, headers, config);
        }
        else {
          if (console && console.error) {
            console.error('http error');
          }
        }
      }

      function cancelHttpRequest() {
        if (httpCanceller) {
          httpCanceller.resolve();
        }
      }

      function getRemoteResults(str) {
        var params = {},
            url = scope.remoteUrl + encodeURIComponent(str);
        if (scope.remoteUrlRequestFormatter) {
          params = {params: scope.remoteUrlRequestFormatter(str)};
          url = scope.remoteUrl;
        }
        if (!!scope.remoteUrlRequestWithCredentials) {
          params.withCredentials = true;
        }
        cancelHttpRequest();
        httpCanceller = $q.defer();
        params.timeout = httpCanceller.promise;
        $http.get(url, params)
          .success(httpSuccessCallbackGen(str))
          .error(httpErrorCallback);
      }

      function getRemoteResultsWithCustomHandler(str) {
        cancelHttpRequest();

        httpCanceller = $q.defer();

        scope.remoteApiHandler(str, httpCanceller.promise)
          .then(httpSuccessCallbackGen(str))
          .catch(httpErrorCallback);

        /* IE8 compatible
        scope.remoteApiHandler(str, httpCanceller.promise)
          ['then'](httpSuccessCallbackGen(str))
          ['catch'](httpErrorCallback);
        */
      }

      function clearResults() {
        scope.showDropdown = false;
        scope.results = [];
        if (dd) {
          dd.scrollTop = 0;
        }
      }

      function initResults() {
        scope.showDropdown = displaySearching;
        scope.currentIndex = scope.focusFirst ? 0 : -1;
        scope.results = [];
      }

      function getLocalResults(str) {
        var i, match, s, value,
            searchFields = scope.searchFields.split(','),
            matches = [];
        if (typeof scope.parseInput() !== 'undefined') {
          str = scope.parseInput()(str);
        }
        for (i = 0; i < scope.localData.length; i++) {
          match = false;

          for (s = 0; s < searchFields.length; s++) {
            value = extractValue(scope.localData[i], searchFields[s]) || '';
            match = match || (value.toString().toLowerCase().indexOf(str.toString().toLowerCase()) >= 0);
          }

          if (match) {
            matches[matches.length] = scope.localData[i];
          }
        }
        return matches;
      }

      function checkExactMatch(result, obj, str){
        if (!str) { return false; }
        for(var key in obj){
          if(obj[key].toLowerCase() === str.toLowerCase()){
            scope.selectResult(result);
            return true;
          }
        }
        return false;
      }

      function searchTimerComplete(str) {
        // Begin the search
        if (!str || str.length < minlength) {
          return;
        }
        if (scope.localData) {
          scope.$apply(function() {
            var matches;
            if (typeof scope.localSearch() !== 'undefined') {
              matches = scope.localSearch()(str);
            } else {
              matches = getLocalResults(str);
            }
            scope.searching = false;
            processResults(matches, str);
          });
        }
        else if (scope.remoteApiHandler) {
          getRemoteResultsWithCustomHandler(str);
        } else {
          getRemoteResults(str);
        }
      }

      function processResults(responseData, str) {
        var i, description, image, text, formattedText, formattedDesc;

        if (responseData && responseData.length > 0) {
          scope.results = [];

          for (i = 0; i < responseData.length; i++) {
            if (scope.titleField && scope.titleField !== '') {
              text = formattedText = extractTitle(responseData[i]);
            }

            description = '';
            if (scope.descriptionField) {
              description = formattedDesc = extractValue(responseData[i], scope.descriptionField);
            }

            image = '';
            if (scope.imageField) {
              image = extractValue(responseData[i], scope.imageField);
            }

            if (scope.matchClass) {
              formattedText = findMatchString(text, str);
              formattedDesc = findMatchString(description, str);
            }

            scope.results[scope.results.length] = {
              title: formattedText,
              description: formattedDesc,
              image: image,
              originalObject: responseData[i]
            };
          }

        } else {
          scope.results = [];
        }

        if (scope.autoMatch && scope.results.length === 1 &&
            checkExactMatch(scope.results[0],
              {title: text, desc: description || ''}, scope.searchStr)) {
          scope.showDropdown = false;
        } else if (scope.results.length === 0 && !displayNoResults) {
          scope.showDropdown = false;
        } else {
          scope.showDropdown = true;
        }
      }

      function showAll() {
        if (scope.localData) {
          processResults(scope.localData, '');
        }
        else if (scope.remoteApiHandler) {
          getRemoteResultsWithCustomHandler('');
        }
        else {
          getRemoteResults('');
        }
      }

      scope.onFocusHandler = function() {
        if (scope.focusIn) {
          scope.focusIn();
        }
        if (minlength === 0 && (!scope.searchStr || scope.searchStr.length === 0)) {
          scope.currentIndex = scope.focusFirst ? 0 : scope.currentIndex;
          scope.showDropdown = true;
          showAll();
        }
      };

      scope.hideResults = function() {
        if (mousedownOn &&
            (mousedownOn === scope.id + '_dropdown' ||
             mousedownOn.indexOf('angucomplete') >= 0)) {
          mousedownOn = null;
        }
        else {
          hideTimer = $timeout(function() {
            clearResults();
            scope.$apply(function() {
              if (scope.searchStr && scope.searchStr.length > 0) {
                inputField.val(scope.searchStr);
              }
            });
          }, BLUR_TIMEOUT);
          cancelHttpRequest();

          if (scope.focusOut) {
            scope.focusOut();
          }

          if (scope.overrideSuggestions) {
            if (scope.searchStr && scope.searchStr.length > 0 && scope.currentIndex === -1) {
              handleOverrideSuggestions();
            }
          }
        }
      };

      scope.resetHideResults = function() {
        if (hideTimer) {
          $timeout.cancel(hideTimer);
        }
      };

      scope.hoverRow = function(index) {
        scope.currentIndex = index;
      };

      scope.selectResult = function(result) {
        // Restore original values
        if (scope.matchClass) {
          result.title = extractTitle(result.originalObject);
          result.description = extractValue(result.originalObject, scope.descriptionField);
        }

        if (scope.clearSelected) {
          scope.searchStr = null;
        }
        else {
          scope.searchStr = result.title;
        }
        callOrAssign(result);
        clearResults();
      };

      scope.inputChangeHandler = function(str) {
        if (str.length < minlength) {
          cancelHttpRequest();
          clearResults();
        }
        else if (str.length === 0 && minlength === 0) {
          scope.searching = false;
          showAll();
        }

        if (scope.inputChanged) {
          str = scope.inputChanged(str);
        }
        return str;
      };

      // check required
      if (scope.fieldRequiredClass && scope.fieldRequiredClass !== '') {
        requiredClassName = scope.fieldRequiredClass;
      }

      // check min length
      if (scope.minlength && scope.minlength !== '') {
        minlength = parseInt(scope.minlength, 10);
      }

      // check pause time
      if (!scope.pause) {
        scope.pause = PAUSE;
      }

      // check clearSelected
      if (!scope.clearSelected) {
        scope.clearSelected = false;
      }

      // check override suggestions
      if (!scope.overrideSuggestions) {
        scope.overrideSuggestions = false;
      }

      // check required field
      if (scope.fieldRequired && ctrl) {
        // check initial value, if given, set validitity to true
        if (scope.initialValue) {
          handleRequired(true);
        }
        else {
          handleRequired(false);
        }
      }

      scope.inputType = attrs.type ? attrs.type : 'text';

      // set strings for "Searching..." and "No results"
      scope.textSearching = attrs.textSearching ? attrs.textSearching : TEXT_SEARCHING;
      scope.textNoResults = attrs.textNoResults ? attrs.textNoResults : TEXT_NORESULTS;
      displaySearching = scope.textSearching === 'false' ? false : true;
      displayNoResults = scope.textNoResults === 'false' ? false : true;

      // set max length (default to maxlength deault from html
      scope.maxlength = attrs.maxlength ? attrs.maxlength : MAX_LENGTH;

      // register events
      inputField.on('keydown', keydownHandler);
      inputField.on('keyup', keyupHandler);

      // set response formatter
      responseFormatter = callFunctionOrIdentity('remoteUrlResponseFormatter');

      // set isScrollOn
      $timeout(function() {
        var css = getComputedStyle(dd);
        isScrollOn = css.maxHeight && css.overflowY === 'auto';
      });
    }

    return {
      restrict: 'EA',
      require: '^?form',
      scope: {
        selectedObject: '=',
        disableInput: '=',
        initialValue: '=',
        localData: '=',
        localSearch: '&',
        remoteUrlRequestFormatter: '=',
        remoteUrlRequestWithCredentials: '@',
        remoteUrlResponseFormatter: '=',
        remoteUrlErrorCallback: '=',
        remoteApiHandler: '=',
        id: '@',
        type: '@',
        placeholder: '@',
        remoteUrl: '@',
        remoteUrlDataField: '@',
        titleField: '@',
        descriptionField: '@',
        imageField: '@',
        inputClass: '@',
        pause: '@',
        searchFields: '@',
        minlength: '@',
        matchClass: '@',
        clearSelected: '@',
        overrideSuggestions: '@',
        fieldRequired: '=',
        fieldRequiredClass: '@',
        inputChanged: '=',
        autoMatch: '@',
        focusOut: '&',
        focusIn: '&',
        fieldTabindex: '@',
        inputName: '@',
        focusFirst: '@',
        parseInput: '&'
      },
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || TEMPLATE_URL;
      },
      compile: function(tElement) {
        var startSym = $interpolate.startSymbol();
        var endSym = $interpolate.endSymbol();
        if (!(startSym === '{{' && endSym === '}}')) {
          var interpolatedHtml = tElement.html()
            .replace(/\{\{/g, startSym)
            .replace(/\}\}/g, endSym);
          tElement.html(interpolatedHtml);
        }
        return link;
      }
    };
  }]);

}));

},{"angular":"angular"}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc2NyaXB0cy5qcyIsImpzL2FwcC5qcyIsImpzL2NvbmZpZy5qcyIsImpzL2RpcmVjdGl2ZXMuanMiLCJqcy9kaXJlY3RpdmVzL2NvbWV0TWVudS5qcyIsImpzL2RpcmVjdGl2ZXMvZ2x5cGhTcGlubmVyLmpzIiwianMvbW9kYWxJbnN0YW5jZUN0cmwuanMiLCJqcy9zZXJ2aWNlcy5qcyIsImpzL3NlcnZpY2VzL3NwaW5uZXIuanMiLCJub2RlX21vZHVsZXMvYW5ndWNvbXBsZXRlLWFsdC9hbmd1Y29tcGxldGUtYWx0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9VQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiOyB2YXIgX19icm93c2VyaWZ5X3NoaW1fcmVxdWlyZV9fPXJlcXVpcmU7KGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSwgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKipcblx0QEF1dGhvclx0XHRcdERvcmluIEdyaWdvcmFzXG5cdEBXZWJzaXRlXHRcdHd3dy5zdGVwb2Z3ZWIuY29tXG5cdEBMYXN0IFVwZGF0ZVx0RnJpZGF5LCBBdWd1c3QgMjEsIDIwMTVcblxuXHROT1RFISBcdERvIG5vdCBjaGFuZ2UgYW55dGhpbmcgaGVyZSBpZiB5b3Ugd2FudCB0b1xuXHRcdFx0YmUgYWJsZSB0byB1cGRhdGUgaW4gdGhlIGZ1dHVyZSEgUGxlYXNlIHVzZVxuXHRcdFx0eW91ciBjdXN0b20gc2NyaXB0IChlZy4gY3VzdG9tLmpzKS5cblxuXG5cdFRBQkxFIENPTlRFTlRTXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cdElOTElORSBTQ1JJUFRTXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRDT1VOVCBUT1xuXHRcdFx0aHR0cHM6Ly9naXRodWIuY29tL21odWdnaW5zL2pxdWVyeS1jb3VudFRvXG5cblx0XHRCUk9XU0VSIERFVEVDVFxuXG5cdFx0QXBwZWFyXG5cdFx0XHRodHRwczovL2dpdGh1Yi5jb20vYmFzMmsvanF1ZXJ5LmFwcGVhci9cblx0XHRcdFxuXHRcdFBhcmFsbGF4XG5cdFx0XHRodHRwOi8vd3d3Lmlhbmx1bm4uY28udWsvcGx1Z2lucy9qcXVlcnktcGFyYWxsYXgvXG5cblx0XHRqUXVlcnkgRWFzaW5nIHYxLjNcblx0XHRcdGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZy9cblxuXHRcdFdPVyAtIHYxLjAuM1xuXHRcdFx0aHR0cDovL215bmFtZWlzbWF0dGhpZXUuY29tL1dPVy9cblxuXHRcdE1vZGVybml6ciAyLjcuMVxuXHRcdFx0aHR0cDovL21vZGVybml6ci5jb20vZG93bmxvYWQvIy1jc3N0cmFuc2Zvcm1zM2QtY3NzdHJhbnNpdGlvbnMtdmlkZW8tdG91Y2gtc2hpdi1jc3NjbGFzc2VzLWFkZHRlc3QtcHJlZml4ZWQtdGVzdHN0eWxlcy10ZXN0cHJvcC10ZXN0YWxscHJvcHMtaGFzZXZlbnQtcHJlZml4ZXMtZG9tcHJlZml4ZXMtbG9hZFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHR3aW5kb3cud2lkdGggPSBqUXVlcnkod2luZG93KS53aWR0aCgpO1xuXG5cdC8qIEluaXQgKi9cblx0alF1ZXJ5KHdpbmRvdykucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdGpRdWVyeS5icm93c2VyRGV0ZWN0KCk7XG5cblx0XHQvLyBMb2FkIEJvb3RzdHJhcCBKU1xuXHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnYm9vdHN0cmFwL2pzL2Jvb3RzdHJhcC5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0SW5pdChmYWxzZSk7XG5cblx0XHR9KTtcblxuXG5cdFx0LyogLS0tICovXG5cdFx0aWYoalF1ZXJ5KFwiaHRtbFwiKS5oYXNDbGFzcyhcImNocm9tZVwiKSAmJiBqUXVlcnkoXCJib2R5XCIpLmhhc0NsYXNzKFwic21vb3Roc2Nyb2xsXCIpKSB7XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ3Ntb290aHNjcm9sbC5qcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuc21vb3RoU2Nyb2xsKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0LyogLS0tICovXG5cdH0pO1xuXG5cbi8qKiBJbml0XG5cdEFqYXggUmVpbml0Olx0XHRJbml0KHRydWUpO1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIEluaXQoaXNfYWpheCkge1xuXG5cdFx0Ly8gRmlyc3QgTG9hZCBPbmx5XG5cdFx0aWYoaXNfYWpheCAhPSB0cnVlKSB7XG5cdFx0XG5cdFx0XHRfYWZ0ZXJSZXNpemUoKTtcblx0XHRcdF9zbGlkZXJfZnVsbCgpO1xuXHRcdFx0X3RvcE5hdigpO1xuXHRcdFx0X3NpZGVOYXYoKTtcblx0XHRcdF9zdGlja3lGb290ZXIoKTtcblx0XHRcdF9pbmZpbml0ZVNjcm9sbCgpO1xuXG5cdFx0fVxuXG5cdFx0Ly8gUmVpbml0IG9uIEFqYXhcblx0XHRfb3dsX2Nhcm91c2VsKCk7XG5cdFx0X2ZsZXhzbGlkZXIoKTtcblx0XHRfcG9wb3ZlcigpO1xuXHRcdF9saWdodGJveCgpO1xuXHRcdF9taXhpdHVwKCk7XG5cdFx0X2FuaW1hdGUoKTtcblx0XHRfb25lcGFnZU5hdigpO1xuXHRcdF9zY3JvbGxUbyhmYWxzZSwgMCk7XG5cdFx0X3BhcmFsbGF4KCk7XG5cdFx0X3ZpZGVvKCk7XG5cdFx0X3lvdXR1YmVCRygpO1xuXHRcdF90b2dnbGUoKTtcblx0XHRfcGxhY2Vob2xkZXIoKTtcblx0XHRfd3JvdGF0ZSgpO1xuXHRcdF9sYXp5bG9hZCgpO1xuXHRcdF9taXNjKCk7XG5cdFx0X2NvdW50RG93bigpO1xuXHRcdF9tYXNvbnJ5R2FsbGVyeSgpO1xuXHRcdF90b2FzdHIoZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UpO1xuXHRcdF9jaGFydHMoKTtcblx0XHRfc2VsZWN0MigpO1xuXHRcdF9mb3JtKCk7XG5cdFx0X3BpY2tlcnMoKTtcblx0XHRfZWRpdG9ycygpO1xuXHRcdF9wYWppbmF0ZSgpO1xuXHRcdF96b29tKCk7XG5cdFx0X2F1dG9zdWdnZXN0KCk7XG5cdFx0X3N0ZXBwZXIoKTtcblx0XHRfc2xpbVNjcm9sbCgpO1xuXHRcdF9tb2RhbEF1dG9Mb2FkKCk7XG5cdFx0X2JnaW1hZ2UoKTtcblx0XHRfd2lkZ2V0X2ZsaWNrcigpO1xuXHRcdF93aWRnZXRfdHdpdHRlcigpO1xuXHRcdF93aWRnZXRfZmFjZWJvb2soKTtcblx0XHRfd2lkZ2V0X2RyaWJiYmxlKCk7XG5cdFx0X3dpZGdldF9tZWRpYSgpO1xuXG5cdFx0LyoqIEJvb3RzdHJhcCBUb29sdGlwICoqLyBcblx0XHRqUXVlcnkoXCJhW2RhdGEtdG9nZ2xlPXRvb2x0aXBdLCBidXR0b25bZGF0YS10b2dnbGU9dG9vbHRpcF0sIHNwYW5bZGF0YS10b2dnbGU9dG9vbHRpcF1cIikudG9vbHRpcCgpO1xuXHR9XG5cblxuXG4vKiogUHJlbG9hZGVyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0aWYoalF1ZXJ5KCcjcHJlbG9hZGVyJykubGVuZ3RoID4gMCkge1xuXG5cdFx0alF1ZXJ5KHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdFxuXHRcdFx0alF1ZXJ5KCcjcHJlbG9hZGVyJykuZmFkZU91dCgxMDAwLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5KCcjcHJlbG9hZGVyJykucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHt9LCAxMDAwKTsgXG5cdFx0ICBcblx0XHR9KTtcblxuXHR9XG5cblxuXG4vKiogQWZ0ZXIgUmVzaXplXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX2FmdGVyUmVzaXplKCkge1xuXG5cdFx0LyogXG5cdFx0XHRJTVBPUlRBVCFcblx0XHRcdFdlIG5lZWQgLmxvYWQoKSB0byBhdm9pZCBjb25mbGljdHNcblx0XHQqL1xuXHRcdGpRdWVyeSh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcInVzZSBzdHJpY3RcIjtcblxuXHRcdFx0Ly8gT24gUmVzaXplXG5cdFx0XHRqUXVlcnkod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0aWYod2luZG93LmFmdGVyUmVzaXplQXBwKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHdpbmRvdy5hZnRlclJlc2l6ZUFwcCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3aW5kb3cuYWZ0ZXJSZXNpemVBcHAgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHRBZnRlciBSZXNpemUgQ29kZVxuXHRcdFx0XHRcdFx0Li4uLi4uLi4uLi4uLi4uLi5cblx0XHRcdFx0XHQqKi9cblxuXHRcdFx0XHRcdF9zbGlkZXJfZnVsbCgpO1xuXHRcdFx0XHRcdHdpbmRvdy53aWR0aCA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCk7XG5cblx0XHRcdFx0XHQvLyBSZXNpemUgRmxleCBTbGlkZXIgaWYgZXhpc3RzIVxuXHRcdFx0XHRcdGlmKGpRdWVyeSgnLmZsZXhzbGlkZXInKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkoJy5mbGV4c2xpZGVyJykucmVzaXplKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0sIDMwMCk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cblx0fVxuXG5cblxuLyoqIExvYWQgU2NyaXB0XG5cblx0VVNBR0Vcblx0dmFyIHBhZ2VJbml0ID0gZnVuY3Rpb24oKSB7fVxuXHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgXCJzY3JpcHQuanNcIiwgZnVuY3Rpb24pO1xuXG5cdExvYWQgbXVsdGlwbGUgc2NyaXB0cyBhbmQgY2FsbCBhIGZpbmFsIGZ1bmN0aW9uXG5cdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyBcInNjcmlwdDEuanNcIiwgZnVuY3Rpb24oKXtcblx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgXCJzY3JpcHQyLmpzXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgXCJzY3JpcHQzLmpzXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyBcInNjcmlwdDQuanNcIiwgZnVuY3Rpb24pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdHZhciBfYXJyIFx0PSB7fTtcblx0ZnVuY3Rpb24gbG9hZFNjcmlwdChzY3JpcHROYW1lLCBjYWxsYmFjaykge1xuXG5cdFx0aWYgKCFfYXJyW3NjcmlwdE5hbWVdKSB7XG5cdFx0XHRfYXJyW3NjcmlwdE5hbWVdID0gdHJ1ZTtcblxuXHRcdFx0dmFyIGJvZHkgXHRcdD0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcblx0XHRcdHZhciBzY3JpcHQgXHRcdD0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0XHRzY3JpcHQudHlwZSBcdD0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdFx0XHRzY3JpcHQuc3JjIFx0XHQ9IHNjcmlwdE5hbWU7XG5cblx0XHRcdC8vIHRoZW4gYmluZCB0aGUgZXZlbnQgdG8gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdFx0XHQvLyB0aGVyZSBhcmUgc2V2ZXJhbCBldmVudHMgZm9yIGNyb3NzIGJyb3dzZXIgY29tcGF0aWJpbGl0eVxuXHRcdFx0Ly8gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGNhbGxiYWNrO1xuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGNhbGxiYWNrO1xuXG5cdFx0XHQvLyBmaXJlIHRoZSBsb2FkaW5nXG5cdFx0XHRib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cblx0XHR9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG5cblx0XHRcdGNhbGxiYWNrKCk7XG5cblx0XHR9XG5cblx0fTtcblxuXG4gXG4vKiogMDAuIFNsaWRlciBGdWxsIEhlaWdodFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9zbGlkZXJfZnVsbCgpIHtcblx0XHRfaGVhZGVySGVpZ2h0ID0gMDtcblxuXHRcdGlmKGpRdWVyeShcIiNoZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykgfHwgalF1ZXJ5KFwiI2hlYWRlclwiKS5oYXNDbGFzcygndHJhbnNsdWNlbnQnKSkge1xuXHRcdFx0X2hlYWRlckhlaWdodCA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9oZWFkZXJIZWlnaHQgPSBqUXVlcnkoXCIjaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG5cdFx0XHRcblx0XHRcdGlmKGpRdWVyeShcIiN0b3BCYXJcIikubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRfaGVhZGVySGVpZ2h0ID0gX2hlYWRlckhlaWdodCArIGpRdWVyeShcIiN0b3BCYXJcIikub3V0ZXJIZWlnaHQoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRfc2NyZWVuSGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLSBfaGVhZGVySGVpZ2h0O1xuXG5cdFx0alF1ZXJ5KFwiI3NsaWRlci5mdWxsaGVpZ2h0XCIpLmhlaWdodChfc2NyZWVuSGVpZ2h0KTtcblx0fVxuXG5cblxuLyoqIDAxLiBUb3AgTmF2XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3RvcE5hdigpIHtcblx0XHR3aW5kb3cuc2Nyb2xsVG9wIFx0PSAwO1xuXHRcdHZhciBfaGVhZGVyX2VsIFx0XHQ9IGpRdWVyeShcIiNoZWFkZXJcIik7XG5cblx0XHRqUXVlcnkod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRfdG9Ub3AoKTtcblx0XHR9KTtcblxuXHRcdC8qIFNjcm9sbCBUbyBUb3AgKi9cblx0XHRmdW5jdGlvbiBfdG9Ub3AoKSB7XG5cdFx0XHRfc2Nyb2xsVG9wID0galF1ZXJ5KGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcblx0XHRcdFxuXHRcdFx0aWYoX3Njcm9sbFRvcCA+IDEwMCkge1xuXG5cdFx0XHRcdGlmKGpRdWVyeShcIiN0b1RvcFwiKS5pcyhcIjpoaWRkZW5cIikpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjdG9Ub3BcIikuc2hvdygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYoalF1ZXJ5KFwiI3RvVG9wXCIpLmlzKFwiOnZpc2libGVcIikpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjdG9Ub3BcIikuaGlkZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXG5cdFx0Ly8gTW9iaWxlIFN1Ym1lbnVcblx0XHR2YXIgYWRkQWN0aXZlQ2xhc3MgXHQ9IGZhbHNlO1xuXHRcdGpRdWVyeShcIiN0b3BNYWluIGEuZHJvcGRvd24tdG9nZ2xlXCIpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcblx0XHRcdGlmKGpRdWVyeSh0aGlzKS5hdHRyKCdocmVmJykgPT0gXCIjXCIpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRhZGRBY3RpdmVDbGFzcyA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcyhcInJlc3AtYWN0aXZlXCIpO1xuXHRcdFx0alF1ZXJ5KFwiI3RvcE1haW5cIikuZmluZChcIi5yZXNwLWFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcInJlc3AtYWN0aXZlXCIpO1xuXG5cdFx0XHRpZighYWRkQWN0aXZlQ2xhc3MpIHtcblx0XHRcdFx0alF1ZXJ5KHRoaXMpLnBhcmVudHMoXCJsaVwiKS5hZGRDbGFzcyhcInJlc3AtYWN0aXZlXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9KTtcblxuXG5cdFx0Ly8gU3JlYXJjaFxuXHRcdGpRdWVyeSgnbGkuc2VhcmNoIGkuZmEnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZihqUXVlcnkoJyNoZWFkZXIgLnNlYXJjaC1ib3gnKS5pcyhcIjp2aXNpYmxlXCIpKSB7XG5cdFx0XHRcdGpRdWVyeSgnI2hlYWRlciAuc2VhcmNoLWJveCcpLmZhZGVPdXQoMzAwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGpRdWVyeSgnLnNlYXJjaC1ib3gnKS5mYWRlSW4oMzAwKTtcblx0XHRcdFx0alF1ZXJ5KCcjaGVhZGVyIC5zZWFyY2gtYm94IGZvcm0gaW5wdXQnKS5mb2N1cygpO1xuXG5cdFx0XHRcdC8vIGhpZGUgcXVpY2sgY2FydCBpZiB2aXNpYmxlXG5cdFx0XHRcdGlmIChqUXVlcnkoJyNoZWFkZXIgbGkucXVpY2stY2FydCBkaXYucXVpY2stY2FydC1ib3gnKS5pcyhcIjp2aXNpYmxlXCIpKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KCcjaGVhZGVyIGxpLnF1aWNrLWNhcnQgZGl2LnF1aWNrLWNhcnQtYm94JykuZmFkZU91dCgzMDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7IFxuXG5cdFx0Ly8gY2xvc2Ugc2VhcmNoIGJveCBvbiBib2R5IGNsaWNrXG5cdFx0aWYoalF1ZXJ5KCcjaGVhZGVyIGxpLnNlYXJjaCBpLmZhJykuc2l6ZSgpICE9IDApIHtcblx0XHRcdGpRdWVyeSgnI2hlYWRlciAuc2VhcmNoLWJveCwgI2hlYWRlciBsaS5zZWFyY2ggaS5mYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZihqUXVlcnkoJyNoZWFkZXIgbGkuc2VhcmNoIC5zZWFyY2gtYm94JykuaXMoXCI6dmlzaWJsZVwiKSkge1xuXHRcdFx0XHRcdGpRdWVyeSgnI2hlYWRlciAuc2VhcmNoLWJveCcpLmZhZGVPdXQoMzAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0alF1ZXJ5KGRvY3VtZW50KS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZihqUXVlcnkoJyNoZWFkZXIgbGkuc2VhcmNoIC5zZWFyY2gtYm94JykuaXMoXCI6dmlzaWJsZVwiKSkge1xuXHRcdFx0XHRqUXVlcnkoJyNoZWFkZXIgLnNlYXJjaC1ib3gnKS5mYWRlT3V0KDMwMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vIENsb3NlIEZ1bGxzY3JlZW4gU2VhcmNoXG5cdFx0alF1ZXJ5KFwiI2Nsb3NlU2VhcmNoXCIpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGpRdWVyeSgnI2hlYWRlciAuc2VhcmNoLWJveCcpLmZhZGVPdXQoMzAwKTtcblx0XHR9KTtcblxuXG5cblx0XHQvLyBQYWdlIE1lbnUgW21vYmlsZV1cblx0XHRqUXVlcnkoXCJidXR0b24jcGFnZS1tZW51LW1vYmlsZVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkodGhpcykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZSgxNTApO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBRdWljayBDYXJ0XG5cdFx0alF1ZXJ5KCdsaS5xdWljay1jYXJ0PmEnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XG5cdFx0XHR2YXIgX3F1aWNrX2NhcnRfYm94ID0galF1ZXJ5KCdsaS5xdWljay1jYXJ0IGRpdi5xdWljay1jYXJ0LWJveCcpO1xuXG5cdFx0XHRpZihfcXVpY2tfY2FydF9ib3guaXMoXCI6dmlzaWJsZVwiKSkge1xuXHRcdFx0XHRfcXVpY2tfY2FydF9ib3guZmFkZU91dCgzMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X3F1aWNrX2NhcnRfYm94LmZhZGVJbigzMDApO1xuXG5cdFx0XHRcdC8vIGNsb3NlIHNlYXJjaCBpZiB2aXNpYmxlXG5cdFx0XHRcdGlmKGpRdWVyeSgnbGkuc2VhcmNoIC5zZWFyY2gtYm94JykuaXMoXCI6dmlzaWJsZVwiKSkge1xuXHRcdFx0XHRcdGpRdWVyeSgnLnNlYXJjaC1ib3gnKS5mYWRlT3V0KDMwMCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLyBjbG9zZSBxdWljayBjYXJ0IG9uIGJvZHkgY2xpY2tcblx0XHRpZihqUXVlcnkoJ2xpLnF1aWNrLWNhcnQ+YScpLnNpemUoKSAhPSAwKSB7XG5cdFx0XHRqUXVlcnkoJ2xpLnF1aWNrLWNhcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRqUXVlcnkoJ2JvZHknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKGpRdWVyeSgnbGkucXVpY2stY2FydCBkaXYucXVpY2stY2FydC1ib3gnKS5pcyhcIjp2aXNpYmxlXCIpKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KCdsaS5xdWljay1jYXJ0IGRpdi5xdWljay1jYXJ0LWJveCcpLmZhZGVPdXQoMzAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblx0XHQvLyBQYWdlIE1lbnUgW3Njcm9sbFRvXVxuXHRcdGpRdWVyeShcIiNwYWdlLW1lbnUgdWwubWVudS1zY3JvbGxUbz5saVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXG5cdFx0XHQvLyBjYWxjdWxhdGUgcGFkZGluZy10b3AgZm9yIHNjcm9sbCBvZmZzZXRcblx0XHRcdHZhciBfaHJlZiBcdD0galF1ZXJ5KCdhJywgdGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0XG5cdFx0XHRpZighalF1ZXJ5KCdhJywgdGhpcykuaGFzQ2xhc3MoJ2V4dGVybmFsJykpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdGpRdWVyeShcIiNwYWdlLW1lbnUgdWwubWVudS1zY3JvbGxUbz5saVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0aWYoalF1ZXJ5KF9ocmVmKS5sZW5ndGggPiAwKSB7XG5cblx0XHRcdFx0XHRfcGFkZGluZ190b3AgPSAwO1xuXG5cdFx0XHRcdFx0aWYoalF1ZXJ5KFwiI2hlYWRlclwiKS5oYXNDbGFzcygnc3RpY2t5JykpIHtcblx0XHRcdFx0XHRcdF9wYWRkaW5nX3RvcCA9IGpRdWVyeShfaHJlZikuY3NzKCdwYWRkaW5nLXRvcCcpO1xuXHRcdFx0XHRcdFx0X3BhZGRpbmdfdG9wID0gX3BhZGRpbmdfdG9wLnJlcGxhY2UoJ3B4JywgJycpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGpRdWVyeSgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBqUXVlcnkoX2hyZWYpLm9mZnNldCgpLnRvcCAtIF9wYWRkaW5nX3RvcH0sIDgwMCwgJ2Vhc2VJbk91dEV4cG8nKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH0pO1xuXHRcblxuXHRcdC8vIEJPVFRPTSBOQVZcblx0XHRpZihfaGVhZGVyX2VsLmhhc0NsYXNzKCdib3R0b20nKSkge1xuXG5cdFx0XHQvLyBBZGQgZHJvcHVwIGNsYXNzXG5cdFx0XHRfaGVhZGVyX2VsLmFkZENsYXNzKCdkcm9wdXAnKTtcblx0XHRcdHdpbmRvdy5ob21lSGVpZ2h0IFx0PSBqUXVlcnkod2luZG93KS5vdXRlckhlaWdodCgpIC0gNTU7XG5cdFx0XG5cblx0XHRcdC8vIHN0aWNreSBoZWFkZXJcblx0XHRcdGlmKF9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3N0aWNreScpKSB7XG5cdFx0XHRcdHdpbmRvdy5pc09uVG9wIFx0XHQ9IHRydWU7XG5cblxuXHRcdFx0XHQvLyBpZiBzY3JvbGwgaXMgPiA2MCUsIHJlbW92ZSBjbGFzcyBkcm9wdXBcblx0XHRcdFx0alF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmKGpRdWVyeShkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPiB3aW5kb3cuaG9tZUhlaWdodCAvIDIpIHtcblx0XHRcdFx0XHRcdF9oZWFkZXJfZWwucmVtb3ZlQ2xhc3MoJ2Ryb3B1cCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfaGVhZGVyX2VsLmFkZENsYXNzKCdkcm9wdXAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0Ly8gQWRkIGZpeGVkfG5vdCBmaXhlZCAmIGRyb3B1cHxubyBkcm9wdXBcblx0XHRcdFx0alF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmKGpRdWVyeShkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPiB3aW5kb3cuaG9tZUhlaWdodCkge1xuXHRcdFx0XHRcdFx0aWYod2luZG93LmlzT25Ub3AgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCcjaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG5cdFx0XHRcdFx0XHRcdF9oZWFkZXJfZWwucmVtb3ZlQ2xhc3MoJ2Ryb3B1cCcpO1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cuaXNPblRvcCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZih3aW5kb3cuaXNPblRvcCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCcjaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG5cdFx0XHRcdFx0XHRcdF9oZWFkZXJfZWwuYWRkQ2xhc3MoJ2Ryb3B1cCcpO1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cuaXNPblRvcCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBnZXQgd2luZG93IGhlaWdodCBvbiByZXNpemVcblx0XHRcdFx0alF1ZXJ5KHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHdpbmRvdy5ob21lSGVpZ2h0ID0galF1ZXJ5KHdpbmRvdykub3V0ZXJIZWlnaHQoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZVxuXG5cdFx0Ly8gU1RJQ0tZXG5cdFx0aWYoX2hlYWRlcl9lbC5oYXNDbGFzcygnc3RpY2t5JykpIHtcblxuXHRcdFx0alF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZih3aW5kb3cud2lkdGggPiA3NjgpIHtcblxuXHRcdFx0XHRcdHZhciBfc2Nyb2xsVG9wIFx0PSBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuXHRcdFx0XHRcdFx0X3RvcEJhcl9IIFx0PSBqUXVlcnkoXCIjdG9wQmFyXCIpLm91dGVySGVpZ2h0KCkgfHwgMDtcblxuXHRcdFx0XHRcdGlmKF9zY3JvbGxUb3AgPiBfdG9wQmFyX0gpIHtcblx0XHRcdFx0XHRcdF9oZWFkZXJfZWwuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG5cblx0XHRcdFx0XHRcdF9oZWFkZXJfSCA9IF9oZWFkZXJfZWwub3V0ZXJIZWlnaHQoKSB8fCAwO1xuXG5cdFx0XHRcdFx0XHRpZighX2hlYWRlcl9lbC5oYXNDbGFzcygndHJhbnNwYXJlbnQnKSAmJiAhX2hlYWRlcl9lbC5oYXNDbGFzcygndHJhbnNsdWNlbnQnKSkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkoJ2JvZHknKS5jc3Moe1wicGFkZGluZy10b3BcIjpfaGVhZGVyX0grXCJweFwifSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYoIV9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykgJiYgIV9oZWFkZXJfZWwuaGFzQ2xhc3MoJ3RyYW5zbHVjZW50JykpIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCdib2R5JykuY3NzKHtcInBhZGRpbmctdG9wXCI6XCIwcHhcIn0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRfaGVhZGVyX2VsLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH0gZWxzZSBcblx0XHRcblx0XHRpZihfaGVhZGVyX2VsLmhhc0NsYXNzKCdzdGF0aWMnKSkge1xuXHRcdFx0Ly8gX2hlYWRlcl9IID0gX2hlYWRlcl9lbC5vdXRlckhlaWdodCgpICsgXCJweFwiO1xuXHRcdFx0Ly8galF1ZXJ5KCdib2R5JykuY3NzKHtcInBhZGRpbmctdG9wXCI6X2hlYWRlcl9IfSk7XG5cdFx0fVxuXG5cblxuXHRcdC8vIFNsaWRlIFRvcFxuXHRcdGpRdWVyeShcIiNzbGlkZXRvcCBhLnNsaWRldG9wLXRvZ2dsZVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoXCIjc2xpZGV0b3AgLmNvbnRhaW5lclwiKS5zbGlkZVRvZ2dsZSgxNTAsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGpRdWVyeShcIiNzbGlkZXRvcCAuY29udGFpbmVyXCIpLmlzKFwiOmhpZGRlblwiKSkge1xuXHRcdFx0XHRcdGpRdWVyeShcIiNzbGlkZXRvcFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0alF1ZXJ5KFwiI3NsaWRldG9wXCIpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHQvLyAnZXNjJyBrZXlcblx0XHRqUXVlcnkoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNykge1xuXHRcdFx0XHRpZihqUXVlcnkoXCIjc2xpZGV0b3BcIikuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjc2xpZGV0b3AgLmNvbnRhaW5lclwiKS5zbGlkZVRvZ2dsZSgxNTAsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFwiI3NsaWRldG9wXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gU2xpZGUgUGFuZWxcblx0XHRqUXVlcnkoXCJhI3NpZGVwYW5lbF9idG5cIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0X3BvcyA9IFwicmlnaHRcIjtcblx0XHRcdGlmKGpRdWVyeShcIiNzaWRlcGFuZWxcIikuaGFzQ2xhc3MoJ3NpZGVwYW5lbC1pbnZlcnNlJykpIHtcblx0XHRcdFx0X3BvcyA9IFwibGVmdFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihqUXVlcnkoXCIjc2lkZXBhbmVsXCIpLmlzKFwiOmhpZGRlblwiKSkge1xuXG5cdFx0XHRcdGpRdWVyeShcImJvZHlcIikuYXBwZW5kKCc8c3BhbiBpZD1cInNpZGVwYW5lbF9vdmVybGF5XCI+PC9zcGFuPicpO1xuXG5cdFx0XHRcdGlmKF9wb3MgPT0gXCJsZWZ0XCIpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjc2lkZXBhbmVsXCIpLnN0b3AoKS5zaG93KCkuYW5pbWF0ZSh7XCJsZWZ0XCI6XCIwcHhcIn0sIDE1MCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0alF1ZXJ5KFwiI3NpZGVwYW5lbFwiKS5zdG9wKCkuc2hvdygpLmFuaW1hdGUoe1wicmlnaHRcIjpcIjBweFwifSwgMTUwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGpRdWVyeShcIiNzaWRlcGFuZWxfb3ZlcmxheVwiKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRpZihfcG9zID09IFwibGVmdFwiKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KFwiI3NpZGVwYW5lbFwiKS5zdG9wKCkuYW5pbWF0ZSh7XCJsZWZ0XCI6XCItMzAwcHhcIn0sIDMwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0alF1ZXJ5KFwiI3NpZGVwYW5lbFwiKS5zdG9wKCkuYW5pbWF0ZSh7XCJyaWdodFwiOlwiLTMwMHB4XCJ9LCAzMDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjc2lkZXBhbmVsXCIpLmhpZGUoKTtcblx0XHRcdFx0fSwgNTAwKTtcblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRfc2lkZXBhbmVsX292ZXJsYXkoKTtcblxuXHRcdH0pO1xuXHRcdC8vIGJ1dHRvbiBjbG9zZVxuXHRcdGpRdWVyeShcIiNzaWRlcGFuZWxfY2xvc2VcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGpRdWVyeShcImEjc2lkZXBhbmVsX2J0blwiKS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdH0pO1xuXHRcdC8vIG92ZXJsYXkgY2xpY2tcblx0XHRmdW5jdGlvbiBfc2lkZXBhbmVsX292ZXJsYXkoKSB7XG5cdFx0XHRqUXVlcnkoXCIjc2lkZXBhbmVsX292ZXJsYXlcIikudW5iaW5kKCk7XG5cdFx0XHRqUXVlcnkoXCIjc2lkZXBhbmVsX292ZXJsYXlcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkoXCJhI3NpZGVwYW5lbF9idG5cIikudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvLyAnZXNjJyBrZXlcblx0XHRqUXVlcnkoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNykge1xuXHRcdFx0XHRpZihqUXVlcnkoXCIjc2lkZXBhbmVsXCIpLmlzKFwiOnZpc2libGVcIikpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCJhI3NpZGVwYW5lbF9idG5cIikudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblxuXHRcdC8qKiBPVkVSTEFZIE1FTlVcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdGlmKGpRdWVyeShcIiNtZW51X292ZXJsYXlfb3BlblwiKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgaXNfaWU5ID0galF1ZXJ5KCdodG1sJykuaGFzQ2xhc3MoJ2llOScpID8gdHJ1ZSA6IGZhbHNlO1xuXG5cdFx0XHRpZihpc19pZTkgPT0gdHJ1ZSkge1xuXHRcdFx0XHRqUXVlcnkoXCIjdG9wTWFpblwiKS5oaWRlKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG9wZW5cblx0XHRcdGpRdWVyeShcIiNtZW51X292ZXJsYXlfb3BlblwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygnc2hvdy1tZW51Jyk7XG5cblx0XHRcdFx0aWYoaXNfaWU5ID09IHRydWUpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjdG9wTWFpblwiKS5zaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBjbG9zZVxuXHRcdFx0alF1ZXJ5KFwiI21lbnVfb3ZlcmxheV9jbG9zZVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0aWYoalF1ZXJ5KCdib2R5JykuaGFzQ2xhc3MoJ3Nob3ctbWVudScpKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KCdib2R5JykucmVtb3ZlQ2xhc3MoJ3Nob3ctbWVudScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNfaWU5ID09IHRydWUpIHtcblx0XHRcdFx0XHRqUXVlcnkoXCIjdG9wTWFpblwiKS5oaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyAnZXNjJyBrZXlcblx0XHRcdGpRdWVyeShkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihlLmtleUNvZGUgPT0gMjcpIHtcblx0XHRcdFx0XHRpZihqUXVlcnkoJ2JvZHknKS5oYXNDbGFzcygnc2hvdy1tZW51JykpIHtcblx0XHRcdFx0XHRcdGpRdWVyeSgnYm9keScpLnJlbW92ZUNsYXNzKCdzaG93LW1lbnUnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihpc19pZTkgPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5KFwiI3RvcE1haW5cIikuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0XHQvKiogVkVSVElDQUwgTUVOVSBTSE9XfEhJREVcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdC8vIFJUTCBzdXBwb3J0ZWQhXG5cdFx0aWYoalF1ZXJ5KFwiI3NpZGViYXJfdmVydGljYWxfYnRuXCIpLmxlbmd0aCA+IDApIHtcblx0XHRcdGlmKGpRdWVyeShcImJvZHlcIikuaGFzQ2xhc3MoJ21lbnUtdmVydGljYWwtaGlkZScpKSB7XG5cblx0XHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiAobGVmdCBvciByaWdodD8pXG5cdFx0XHRcdF9wYWRkaW5nU3RhdHVzTCA9IGpRdWVyeShcIiNtYWluTWVudS5zaWRlYmFyLXZlcnRpY2FsXCIpLmNzcygnbGVmdCcpO1xuXHRcdFx0XHRfcGFkZGluZ1N0YXR1c1IgPSBqUXVlcnkoXCIjbWFpbk1lbnUuc2lkZWJhci12ZXJ0aWNhbFwiKS5jc3MoJ3JpZ2h0Jyk7XG5cblx0XHRcdFx0aWYocGFyc2VJbnQoX3BhZGRpbmdTdGF0dXNMKSA8IDApIHtcblx0XHRcdFx0XHR2YXIgX3BvcyA9IFwibGVmdFwiO1xuXHRcdFx0XHR9IGVsc2VcblxuXHRcdFx0XHRpZihwYXJzZUludChfcGFkZGluZ1N0YXR1c1IpIDwgMCkge1xuXHRcdFx0XHRcdHZhciBfcG9zID0gXCJyaWdodFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dmFyIF9wb3MgPSBcImxlZnRcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNob3d8SGlkZSBWZXJ0aWNhbCBNZW51XG5cdFx0XHRcdGpRdWVyeShcIiNzaWRlYmFyX3ZlcnRpY2FsX2J0blwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXG5cdFx0XHRcdFx0X3BhZGRpbmdTdGF0dXMgPSBqUXVlcnkoXCIjbWFpbk1lbnUuc2lkZWJhci12ZXJ0aWNhbFwiKS5jc3MoX3Bvcyk7XG5cblx0XHRcdFx0XHRpZihwYXJzZUludChfcGFkZGluZ1N0YXR1cykgPCAwKSB7XG5cdFx0XHRcdFx0XHRpZihfcG9zID09IFwicmlnaHRcIikge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkoXCIjbWFpbk1lbnUuc2lkZWJhci12ZXJ0aWNhbFwiKS5zdG9wKCkuYW5pbWF0ZSh7XCJyaWdodFwiOlwiMHB4XCJ9LCAyMDApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFwiI21haW5NZW51LnNpZGViYXItdmVydGljYWxcIikuc3RvcCgpLmFuaW1hdGUoe1wibGVmdFwiOlwiMHB4XCJ9LCAyMDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZihfcG9zID09IFwicmlnaHRcIikge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkoXCIjbWFpbk1lbnUuc2lkZWJhci12ZXJ0aWNhbFwiKS5zdG9wKCkuYW5pbWF0ZSh7XCJyaWdodFwiOlwiLTI2M3B4XCJ9LCAyMDApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFwiI21haW5NZW51LnNpZGViYXItdmVydGljYWxcIikuc3RvcCgpLmFuaW1hdGUoe1wibGVmdFwiOlwiLTI2M3B4XCJ9LCAyMDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gSGlkZSBvbiBzY3JvbGxcblx0XHRcdFx0alF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0X3BhZGRpbmdTdGF0dXMgPSBwYXJzZUludChqUXVlcnkoXCIjbWFpbk1lbnUuc2lkZWJhci12ZXJ0aWNhbFwiKS5jc3MoX3BvcykpO1xuXG5cdFx0XHRcdFx0aWYoX3BhZGRpbmdTdGF0dXMgPj0gMCkge1xuXHRcdFx0XHRcdFx0aWYoX3BvcyA9PSBcInJpZ2h0XCIpIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFwiI21haW5NZW51LnNpZGViYXItdmVydGljYWxcIikuc3RvcCgpLmFuaW1hdGUoe1wicmlnaHRcIjpcIi0yNjNweFwifSwgMjAwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeShcIiNtYWluTWVudS5zaWRlYmFyLXZlcnRpY2FsXCIpLnN0b3AoKS5hbmltYXRlKHtcImxlZnRcIjpcIi0yNjNweFwifSwgMjAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSk7XG5cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBxdWljayBjYXJ0ICYgc2VhcmNoIGZvciBtb2JpbGUgLSB0b3AgY2FsY3VsYXRlXG5cdFx0Ly8gUXVpY2sgQ2FydCAmIHRvcCBTZWFyY2ggRml4IChpZiAjdG9wQmFyIGV4aXN0cykuXG5cdFx0aWYoalF1ZXJ5KFwiI3RvcEJhclwiKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRqUXVlcnkoXCIjdG9wTmF2IHVsXCIpLmFkZENsYXNzKCdoYXMtdG9wQmFyJyk7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIEhpZGUgQ2FydCAmIFNlYXJjaCBvbiBTY3JvbGxcblx0XHRqUXVlcnkod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih3aW5kb3cud2lkdGggPCA3NjkpIHtcblx0XHRcdFx0Ly8gaGlkZSBxdWljayBjYXJ0IGlmIHZpc2libGVcblx0XHRcdFx0aWYgKGpRdWVyeSgnI2hlYWRlciBsaS5xdWljay1jYXJ0IGRpdi5xdWljay1jYXJ0LWJveCcpLmlzKFwiOnZpc2libGVcIikpIHtcblx0XHRcdFx0XHRqUXVlcnkoJyNoZWFkZXIgbGkucXVpY2stY2FydCBkaXYucXVpY2stY2FydC1ib3gnKS5mYWRlT3V0KDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGhpZGUgc2VhcmNoIGlmIHZpc2libGVcblx0XHRcdFx0aWYoalF1ZXJ5KCcjaGVhZGVyIGxpLnNlYXJjaCAuc2VhcmNoLWJveCcpLmlzKFwiOnZpc2libGVcIikpIHtcblx0XHRcdFx0XHRqUXVlcnkoJyNoZWFkZXIgLnNlYXJjaC1ib3gnKS5mYWRlT3V0KDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXG5cblxuLyoqIDAyLiBTaWRlIE5hdlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9zaWRlTmF2KCkge1xuXG5cdFx0LyogTW9iaWxlIEJ1dHRvbiAqL1xuXHRcdGpRdWVyeShcImRpdi5zaWRlLW5hdlwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIF90ID0galF1ZXJ5KCd1bCcsIHRoaXMpO1xuXHRcdFx0alF1ZXJ5KCdidXR0b24nLCB0aGlzKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF90LnNsaWRlVG9nZ2xlKDMwMCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0LyogU3VibWVudXMgKi9cblx0XHRqUXVlcnkoXCJkaXYuc2lkZS1uYXY+dWw+bGk+YS5kcm9wZG93bi10b2dnbGVcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0alF1ZXJ5KHRoaXMpLm5leHQoJ3VsJykuc2xpZGVUb2dnbGUoMjAwKTtcblx0XHRcdGpRdWVyeSh0aGlzKS5jbG9zZXN0KCdsaScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KTtcblxuXHR9XG5cblxuXG4vKiogMDIuIEFuaW1hdGVcblxuXHRFWEFNUExFIFVTQUdFXG5cdDxpbWcgY2xhc3M9XCJ3b3cgZmFkZUluVXBcIiBkYXRhLXdvdy1kZWxheT1cIjAuMXNcIiBzcmM9XCJpbWFnZS5qcGdcIiBhbHQ9XCJcIiAvPlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9hbmltYXRlKCkge1xuXG5cdFx0aWYoalF1ZXJ5KFwiYm9keVwiKS5oYXNDbGFzcygnZW5hYmxlLWFuaW1hdGlvbicpKSB7XG5cblx0XHRcdHZhciB3b3cgPSBuZXcgV09XKHtcblx0XHRcdFx0Ym94Q2xhc3M6IFx0XHQnd293Jyxcblx0XHRcdFx0YW5pbWF0ZUNsYXNzOiBcdCdhbmltYXRlZCcsXG5cdFx0XHRcdG9mZnNldDogXHRcdDkwLFxuXHRcdFx0XHRtb2JpbGU6IFx0XHRmYWxzZSwgXG5cdFx0XHRcdGxpdmU6IFx0XHRcdHRydWUgXG5cdFx0XHR9KTsgICBcblx0XHRcdFxuXHRcdFx0d293LmluaXQoKTtcblxuXHRcdH1cblxuXHRcdC8vIENvdW50IFRvXG4gICAgICAgIGpRdWVyeShcIi5jb3VudFRvXCIpLmFwcGVhcihmdW5jdGlvbigpe1xuXHRcdFx0dmFyIF90IFx0XHRcdFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0X2Zyb20gXHRcdFx0XHQ9IF90LmF0dHIoJ2RhdGEtZnJvbScpIFx0XHRcdFx0fHwgMCxcblx0XHRcdFx0X3NwZWVkIFx0XHRcdFx0PSBfdC5hdHRyKCdkYXRhLXNwZWVkJykgXHRcdFx0fHwgMTMwMCxcblx0XHRcdFx0X3JlZnJlc2hJbnRlcnZhbCBcdD0gX3QuYXR0cignZGF0YS1yZWZyZXNoSW50ZXJ2YWwnKSBcdHx8IDYwO1xuXHRcdFx0XHRcblxuICAgICAgICAgICAgX3QuY291bnRUbyh7XG4gICAgICAgICAgICAgICAgZnJvbTogXHRcdFx0XHRwYXJzZUludChfZnJvbSksXG4gICAgICAgICAgICAgICAgdG86IFx0XHRcdFx0X3QuaHRtbCgpLFxuICAgICAgICAgICAgICAgIHNwZWVkOiBcdFx0XHRcdHBhcnNlSW50KF9zcGVlZCksXG4gICAgICAgICAgICAgICAgcmVmcmVzaEludGVydmFsOiBcdHBhcnNlSW50KF9yZWZyZXNoSW50ZXJ2YWwpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cdH1cblxuXG5cbi8qKiBPbmVwYWdlIE5hdlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9vbmVwYWdlTmF2KCkge1xuXHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KFwiI3RvcE1haW4ubmF2LW9uZXBhZ2VcIik7XG5cblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdqcXVlcnkubmF2Lm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGpRdWVyeShfY29udGFpbmVyKS5vbmVQYWdlTmF2KHtcblx0XHRcdFx0XHRjdXJyZW50Q2xhc3M6IFx0XHQnYWN0aXZlJyxcblx0XHRcdFx0XHRjaGFuZ2VIYXNoOiBcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0c2Nyb2xsU3BlZWQ6IFx0XHQ3NTAsXG5cdFx0XHRcdFx0c2Nyb2xsVGhyZXNob2xkOiBcdDAuNSxcblx0XHRcdFx0XHRmaWx0ZXI6IFx0XHRcdCc6bm90KC5leHRlcm5hbCknLFxuXHRcdFx0XHRcdGVhc2luZzogXHRcdFx0J2Vhc2VJbk91dEV4cG8nXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblx0XHRcblx0XHR9XG5cblx0fVxuXG5cblxuLyoqIDAzLiBPV0wgQ2Fyb3VzZWxcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfb3dsX2Nhcm91c2VsKCkge1xuXHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KFwiZGl2Lm93bC1jYXJvdXNlbFwiKTtcblxuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ293bC1jYXJvdXNlbC9vd2wuY2Fyb3VzZWwubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0X2NvbnRhaW5lci5lYWNoKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0dmFyIHNsaWRlciBcdFx0PSBqUXVlcnkodGhpcyk7XG5cdFx0XHRcdFx0dmFyIG9wdGlvbnMgXHQ9IHNsaWRlci5hdHRyKCdkYXRhLXBsdWdpbi1vcHRpb25zJyk7XG5cblx0XHRcdFx0XHQvLyBQcm9ncmVzcyBCYXJcblx0XHRcdFx0XHR2YXIgJG9wdCA9IGV2YWwoJygnICsgb3B0aW9ucyArICcpJyk7ICAvLyBjb252ZXJ0IHRleHQgdG8ganNvblxuXG5cdFx0XHRcdFx0aWYoJG9wdC5wcm9ncmVzc0JhciA9PSAndHJ1ZScpIHtcblx0XHRcdFx0XHRcdHZhciBhZnRlckluaXQgPSBwcm9ncmVzc0Jhcjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dmFyIGFmdGVySW5pdCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBkZWZhdWx0cyA9IHtcblx0XHRcdFx0XHRcdGl0ZW1zOiBcdFx0XHRcdFx0NSxcblx0XHRcdFx0XHRcdGl0ZW1zQ3VzdG9tOiBcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdGl0ZW1zRGVza3RvcDogXHRcdFx0WzExOTksNF0sXG5cdFx0XHRcdFx0XHRpdGVtc0Rlc2t0b3BTbWFsbDogXHRcdFs5ODAsM10sXG5cdFx0XHRcdFx0XHRpdGVtc1RhYmxldDogXHRcdFx0Wzc2OCwyXSxcblx0XHRcdFx0XHRcdGl0ZW1zVGFibGV0U21hbGw6IFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdGl0ZW1zTW9iaWxlOiBcdFx0XHRbNDc5LDFdLFxuXHRcdFx0XHRcdFx0c2luZ2xlSXRlbTogXHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdGl0ZW1zU2NhbGVVcDogXHRcdFx0ZmFsc2UsXG5cblx0XHRcdFx0XHRcdHNsaWRlU3BlZWQ6IFx0XHRcdDIwMCxcblx0XHRcdFx0XHRcdHBhZ2luYXRpb25TcGVlZDogXHRcdDgwMCxcblx0XHRcdFx0XHRcdHJld2luZFNwZWVkOiBcdFx0XHQxMDAwLFxuXG5cdFx0XHRcdFx0XHRhdXRvUGxheTogXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdHN0b3BPbkhvdmVyOiBcdFx0XHRmYWxzZSxcblxuXHRcdFx0XHRcdFx0bmF2aWdhdGlvbjogXHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRuYXZpZ2F0aW9uVGV4dDogW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT4nXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRyZXdpbmROYXY6IFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdHNjcm9sbFBlclBhZ2U6IFx0XHRcdGZhbHNlLFxuXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uOiBcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbk51bWJlcnM6IFx0XHRmYWxzZSxcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2l2ZTogXHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdHJlc3BvbnNpdmVSZWZyZXNoUmF0ZTogXHQyMDAsXG5cdFx0XHRcdFx0XHRyZXNwb25zaXZlQmFzZVdpZHRoOiBcdHdpbmRvdyxcblxuXHRcdFx0XHRcdFx0YmFzZUNsYXNzOiBcdFx0XHRcdFwib3dsLWNhcm91c2VsXCIsXG5cdFx0XHRcdFx0XHR0aGVtZTogXHRcdFx0XHRcdFwib3dsLXRoZW1lXCIsXG5cblx0XHRcdFx0XHRcdGxhenlMb2FkOiBcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0bGF6eUZvbGxvdzogXHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdGxhenlFZmZlY3Q6IFx0XHRcdFwiZmFkZVwiLFxuXG5cdFx0XHRcdFx0XHRhdXRvSGVpZ2h0OiBcdFx0XHRmYWxzZSxcblxuXHRcdFx0XHRcdFx0anNvblBhdGg6IFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRqc29uU3VjY2VzczogXHRcdFx0ZmFsc2UsXG5cblx0XHRcdFx0XHRcdGRyYWdCZWZvcmVBbmltRmluaXNoOiBcdHRydWUsXG5cdFx0XHRcdFx0XHRtb3VzZURyYWc6IFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdHRvdWNoRHJhZzogXHRcdFx0XHR0cnVlLFxuXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uU3R5bGU6IFx0XHRmYWxzZSxcblxuXHRcdFx0XHRcdFx0YWRkQ2xhc3NBY3RpdmU6IFx0XHRmYWxzZSxcblxuXHRcdFx0XHRcdFx0YmVmb3JlVXBkYXRlOiBcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdGFmdGVyVXBkYXRlOiBcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdGJlZm9yZUluaXQ6IFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0YWZ0ZXJJbml0OiBcdFx0XHRcdGFmdGVySW5pdCxcblx0XHRcdFx0XHRcdGJlZm9yZU1vdmU6IFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0YWZ0ZXJNb3ZlOiBcdFx0XHRcdChhZnRlckluaXQgPT0gZmFsc2UpID8gZmFsc2UgOiBtb3ZlZCxcblx0XHRcdFx0XHRcdGFmdGVyQWN0aW9uOiBcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdHN0YXJ0RHJhZ2dpbmc6IFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0YWZ0ZXJMYXp5TG9hZDogXHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgY29uZmlnID0galF1ZXJ5LmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMsIHNsaWRlci5kYXRhKFwicGx1Z2luLW9wdGlvbnNcIikpO1xuXHRcdFx0XHRcdHNsaWRlci5vd2xDYXJvdXNlbChjb25maWcpLmFkZENsYXNzKFwib3dsLWNhcm91c2VsLWluaXRcIik7XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0XHQvLyBQcm9ncmVzcyBCYXJcblx0XHRcdFx0XHR2YXIgZWxlbSA9IGpRdWVyeSh0aGlzKTtcblxuXHRcdFx0XHRcdC8vSW5pdCBwcm9ncmVzc0JhciB3aGVyZSBlbGVtIGlzICQoXCIjb3dsLWRlbW9cIilcblx0XHRcdFx0XHRmdW5jdGlvbiBwcm9ncmVzc0JhcihlbGVtKXtcblx0XHRcdFx0XHQgICRlbGVtID0gZWxlbTtcblx0XHRcdFx0XHQgIC8vYnVpbGQgcHJvZ3Jlc3MgYmFyIGVsZW1lbnRzXG5cdFx0XHRcdFx0ICBidWlsZFByb2dyZXNzQmFyKCk7XG5cdFx0XHRcdFx0ICAvL3N0YXJ0IGNvdW50aW5nXG5cdFx0XHRcdFx0ICBzdGFydCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0IFxuXHRcdFx0XHRcdC8vY3JlYXRlIGRpdiNwcm9ncmVzc0JhciBhbmQgZGl2I2JhciB0aGVuIHByZXBlbmQgdG8gJChcIiNvd2wtZGVtb1wiKVxuXHRcdFx0XHRcdGZ1bmN0aW9uIGJ1aWxkUHJvZ3Jlc3NCYXIoKXtcblx0XHRcdFx0XHQgICRwcm9ncmVzc0JhciA9IGpRdWVyeShcIjxkaXY+XCIse1xuXHRcdFx0XHRcdFx0aWQ6XCJwcm9ncmVzc0JhclwiXG5cdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHQgICRiYXIgPSBqUXVlcnkoXCI8ZGl2PlwiLHtcblx0XHRcdFx0XHRcdGlkOlwiYmFyXCJcblx0XHRcdFx0XHQgIH0pO1xuXHRcdFx0XHRcdCAgJHByb2dyZXNzQmFyLmFwcGVuZCgkYmFyKS5wcmVwZW5kVG8oJGVsZW0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRcdFx0XHRcdCAgLy9yZXNldCB0aW1lclxuXHRcdFx0XHRcdCAgcGVyY2VudFRpbWUgPSAwO1xuXHRcdFx0XHRcdCAgaXNQYXVzZSA9IGZhbHNlO1xuXHRcdFx0XHRcdCAgLy9ydW4gaW50ZXJ2YWwgZXZlcnkgMC4wMSBzZWNvbmRcblx0XHRcdFx0XHQgIHRpY2sgPSBzZXRJbnRlcnZhbChpbnRlcnZhbCwgMTApO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdCBcblx0XHRcdFx0XHR2YXIgdGltZSA9IDc7IC8vIHRpbWUgaW4gc2Vjb25kc1xuXHRcdFx0XHRcdGZ1bmN0aW9uIGludGVydmFsKCkge1xuXHRcdFx0XHRcdCAgaWYoaXNQYXVzZSA9PT0gZmFsc2Upe1xuXHRcdFx0XHRcdFx0cGVyY2VudFRpbWUgKz0gMSAvIHRpbWU7XG5cdFx0XHRcdFx0XHQkYmFyLmNzcyh7XG5cdFx0XHRcdFx0XHQgICB3aWR0aDogcGVyY2VudFRpbWUrXCIlXCJcblx0XHRcdFx0XHRcdCB9KTtcblx0XHRcdFx0XHRcdC8vaWYgcGVyY2VudFRpbWUgaXMgZXF1YWwgb3IgZ3JlYXRlciB0aGFuIDEwMFxuXHRcdFx0XHRcdFx0aWYocGVyY2VudFRpbWUgPj0gMTAwKXtcblx0XHRcdFx0XHRcdCAgLy9zbGlkZSB0byBuZXh0IGl0ZW0gXG5cdFx0XHRcdFx0XHQgICRlbGVtLnRyaWdnZXIoJ293bC5uZXh0Jylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQgIH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCBcblx0XHRcdFx0XHQvL3BhdXNlIHdoaWxlIGRyYWdnaW5nIFxuXHRcdFx0XHRcdGZ1bmN0aW9uIHBhdXNlT25EcmFnZ2luZygpe1xuXHRcdFx0XHRcdCAgaXNQYXVzZSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQgXG5cdFx0XHRcdFx0Ly9tb3ZlZCBjYWxsYmFja1xuXHRcdFx0XHRcdGZ1bmN0aW9uIG1vdmVkKCl7XG5cdFx0XHRcdFx0ICAvL2NsZWFyIGludGVydmFsXG5cdFx0XHRcdFx0ICBjbGVhclRpbWVvdXQodGljayk7XG5cdFx0XHRcdFx0ICAvL3N0YXJ0IGFnYWluXG5cdFx0XHRcdFx0ICBzdGFydCgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cblxuXHRcbi8qKiAwNC4gRmxleHNsaWRlclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9mbGV4c2xpZGVyKCkge1xuXHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KFwiLmZsZXhzbGlkZXJcIik7XG5cdFx0XG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnc2xpZGVyLmZsZXhzbGlkZXIvanF1ZXJ5LmZsZXhzbGlkZXItbWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0aWYoalF1ZXJ5KCkuZmxleHNsaWRlcikge1xuXHRcdFx0XHRcdHZhclx0X2NvbnRyb2xOYXYgXHQ9IF9jb250YWluZXIuYXR0cignZGF0YS1jb250cm9sTmF2JyksXG5cdFx0XHRcdFx0XHRfc2xpZGVzaG93U3BlZWQgPSBfY29udGFpbmVyLmF0dHIoJ2RhdGEtc2xpZGVzaG93U3BlZWQnKSB8fCA3MDAwLFxuXHRcdFx0XHRcdFx0X3BhdXNlT25Ib3Zlclx0PSBfY29udGFpbmVyLmF0dHIoJ2RhdGEtcGF1c2VPbkhvdmVyJykgfHwgZmFsc2U7XG5cblx0XHRcdFx0XHRpZihfcGF1c2VPbkhvdmVyID09IFwidHJ1ZVwiKSB7XG5cdFx0XHRcdFx0XHRfcGF1c2VPbkhvdmVyID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2V7XG5cdFx0XHRcdFx0XHRfcGF1c2VPbkhvdmVyID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoX2NvbnRyb2xOYXYgPT0gJ3RodW1ibmFpbHMnKSB7XG5cdFx0XHRcdFx0XHRfY29udHJvbE5hdiA9ICd0aHVtYm5haWxzJztcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRpZihfY29udHJvbE5hdiA9PSAndHJ1ZScpIHtcblx0XHRcdFx0XHRcdF9jb250cm9sTmF2ID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRpZihfY29udHJvbE5hdiA9PSAnZmFsc2UnKSB7XG5cdFx0XHRcdFx0XHRfY29udHJvbE5hdiA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfY29udHJvbE5hdiA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKF9jb250cm9sTmF2ID09ICd0aHVtYm5haWxzJyB8fCBfY29udHJvbE5hdiA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0X2RpcmVjdGlvbk5hdiA9IGZhbHNlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfZGlyZWN0aW9uTmF2ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRqUXVlcnkoX2NvbnRhaW5lcikuZmxleHNsaWRlcih7XG5cdFx0XHRcdFx0XHRhbmltYXRpb25cdFx0OiBcInNsaWRlXCIsXG5cdFx0XHRcdFx0XHRjb250cm9sTmF2XHRcdDogX2NvbnRyb2xOYXYsXG5cdFx0XHRcdFx0XHRzbGlkZXNob3dTcGVlZFx0OiBwYXJzZUludChfc2xpZGVzaG93U3BlZWQpIHx8IDcwMDAsXG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25OYXYgXHQ6IF9kaXJlY3Rpb25OYXYsXG5cdFx0XHRcdFx0XHRwYXVzZU9uSG92ZXJcdDogX3BhdXNlT25Ib3Zlcixcblx0XHRcdFx0XHRcdHN0YXJ0OiBmdW5jdGlvbihzbGlkZXIpe1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkoJy5mbGV4LXByZXYnKS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+Jyk7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeSgnLmZsZXgtbmV4dCcpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBSZXNpemUgRmxleCBTbGlkZXIgaWYgZXhpc3RzIVxuXHRcdFx0XHRcdF9jb250YWluZXIucmVzaXplKCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0XG5cdFxuXHRcblxuXG4vKiogMDQuIFBvcG92ZXJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfcG9wb3ZlcigpIHtcblxuXHRcdFx0alF1ZXJ5KFwiYVtkYXRhLXRvZ2dsZT1wb3BvdmVyXVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRqUXVlcnkoJy5wb3BvdmVyLXRpdGxlIC5jbG9zZScpLnJlbW92ZSgpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIGlzVmlzaWJsZSBcdD0gZmFsc2UsXG5cdFx0XHRcdGNsaWNrZWRBd2F5ID0gZmFsc2U7XG5cblxuXHRcdFx0alF1ZXJ5KFwiYVtkYXRhLXRvZ2dsZT1wb3BvdmVyXSwgYnV0dG9uW2RhdGEtdG9nZ2xlPXBvcG92ZXJdXCIpLnBvcG92ZXIoe1xuXG5cdFx0XHRcdFx0aHRtbDogdHJ1ZSxcblx0XHRcdFx0XHR0cmlnZ2VyOiAnbWFudWFsJ1xuXG5cdFx0XHRcdH0pLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblxuXHRcdFx0XHRcdGpRdWVyeSh0aGlzKS5wb3BvdmVyKCdzaG93Jyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Y2xpY2tlZEF3YXkgPSBmYWxzZTtcblx0XHRcdFx0XHRpc1Zpc2libGUgPSB0cnVlO1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRqUXVlcnkoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRpZihpc1Zpc2libGUgJiBjbGlja2VkQXdheSkge1xuXG5cdFx0XHRcdFx0XHRqUXVlcnkoXCJhW2RhdGEtdG9nZ2xlPXBvcG92ZXJdLCBidXR0b25bZGF0YS10b2dnbGU9cG9wb3Zlcl1cIikucG9wb3ZlcignaGlkZScpO1xuXHRcdFx0XHRcdFx0aXNWaXNpYmxlID0gY2xpY2tlZEF3YXkgPSBmYWxzZTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblxuXHRcdFx0XHRcdFx0Y2xpY2tlZEF3YXkgPSB0cnVlO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRqUXVlcnkoXCJhW2RhdGEtdG9nZ2xlPXBvcG92ZXJdLCBidXR0b25bZGF0YS10b2dnbGU9cG9wb3Zlcl1cIikucG9wb3Zlcih7XG5cblx0XHRcdFx0aHRtbDogdHJ1ZSxcblx0XHRcdFx0dHJpZ2dlcjogJ21hbnVhbCdcblxuXHRcdFx0fSkuY2xpY2soZnVuY3Rpb24oZSkge1xuXG5cdFx0XHRcdCQodGhpcykucG9wb3Zlcignc2hvdycpO1xuXHRcdFx0XHQkKCcucG9wb3Zlci10aXRsZScpLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L2J1dHRvbj4nKTtcblx0XHRcdFx0JCgnLmNsb3NlJykuY2xpY2soZnVuY3Rpb24oZSl7XG5cblx0XHRcdFx0XHRqUXVlcnkoXCJhW2RhdGEtdG9nZ2xlPXBvcG92ZXJdLCBidXR0b25bZGF0YS10b2dnbGU9cG9wb3Zlcl1cIikucG9wb3ZlcignaGlkZScpO1xuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cblx0XHQvLyBqUXVlcnkoXCJhW2RhdGEtdG9nZ2xlPXBvcG92ZXJdLCBidXR0b25bZGF0YS10b2dnbGU9cG9wb3Zlcl1cIikucG9wb3ZlcigpO1xuXHR9XG5cblxuXG4vKiogMDUuIExpZ2h0Qm94XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX2xpZ2h0Ym94KCkge1xuXHRcdHZhciBfZWwgPSBqUXVlcnkoXCIubGlnaHRib3hcIik7XG5cblx0XHRpZihfZWwubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ21hZ25pZmljLXBvcHVwL2pxdWVyeS5tYWduaWZpYy1wb3B1cC5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRpZih0eXBlb2YoalF1ZXJ5Lm1hZ25pZmljUG9wdXApID09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRqUXVlcnkuZXh0ZW5kKHRydWUsIGpRdWVyeS5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLCB7XG5cdFx0XHRcdFx0dENsb3NlOiBcdFx0J0Nsb3NlJyxcblx0XHRcdFx0XHR0TG9hZGluZzogXHRcdCdMb2FkaW5nLi4uJyxcblxuXHRcdFx0XHRcdGdhbGxlcnk6IHtcblx0XHRcdFx0XHRcdHRQcmV2OiBcdFx0J1ByZXZpb3VzJyxcblx0XHRcdFx0XHRcdHROZXh0OiBcdFx0J05leHQnLFxuXHRcdFx0XHRcdFx0dENvdW50ZXI6IFx0JyVjdXJyJSAvICV0b3RhbCUnXG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdGltYWdlOiBcdHsgXG5cdFx0XHRcdFx0XHR0RXJyb3I6IFx0J0ltYWdlIG5vdCBsb2FkZWQhJyBcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0YWpheDogXHR7IFxuXHRcdFx0XHRcdFx0dEVycm9yOiBcdCdDb250ZW50IG5vdCBsb2FkZWQhJyBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9lbC5lYWNoKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0dmFyIF90IFx0XHRcdD0galF1ZXJ5KHRoaXMpLFxuXHRcdFx0XHRcdFx0b3B0aW9ucyBcdD0gX3QuYXR0cignZGF0YS1wbHVnaW4tb3B0aW9ucycpLFxuXHRcdFx0XHRcdFx0Y29uZmlnXHRcdD0ge30sXG5cdFx0XHRcdFx0XHRkZWZhdWx0cyBcdD0ge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcdFx0XHRcdCdpbWFnZScsXG5cdFx0XHRcdFx0XHRcdGZpeGVkQ29udGVudFBvczogXHRmYWxzZSxcblx0XHRcdFx0XHRcdFx0Zml4ZWRCZ1BvczogXHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRtYWluQ2xhc3M6IFx0XHRcdCdtZnAtbm8tbWFyZ2lucyBtZnAtd2l0aC16b29tJyxcblx0XHRcdFx0XHRcdFx0Y2xvc2VPbkNvbnRlbnRDbGljazogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0Y2xvc2VPbkJnQ2xpY2s6IFx0dHJ1ZSxcblx0XHRcdFx0XHRcdFx0aW1hZ2U6IHtcblx0XHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbEZpdDogXHR0cnVlXG5cdFx0XHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHRcdFx0em9vbToge1xuXHRcdFx0XHRcdFx0XHRcdGVuYWJsZWQ6IFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogXHRcdDMwMFxuXHRcdFx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0XHRcdGdhbGxlcnk6IHtcblx0XHRcdFx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0cHJlbG9hZDogXHRcdFx0WzAsMV0sXG5cdFx0XHRcdFx0XHRcdFx0YXJyb3dNYXJrdXA6IFx0XHQnPGJ1dHRvbiB0aXRsZT1cIiV0aXRsZSVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZnAtYXJyb3cgbWZwLWFycm93LSVkaXIlXCI+PC9idXR0b24+Jyxcblx0XHRcdFx0XHRcdFx0XHR0UHJldjogXHRcdFx0XHQnUHJldmlvdXMnLFxuXHRcdFx0XHRcdFx0XHRcdHROZXh0OiBcdFx0XHRcdCdOZXh0Jyxcblx0XHRcdFx0XHRcdFx0XHR0Q291bnRlcjogXHRcdFx0JzxzcGFuIGNsYXNzPVwibWZwLWNvdW50ZXJcIj4lY3VyciUgLyAldG90YWwlPC9zcGFuPidcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZihfdC5kYXRhKFwicGx1Z2luLW9wdGlvbnNcIikpIHtcblx0XHRcdFx0XHRcdGNvbmZpZyA9IGpRdWVyeS5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zLCBfdC5kYXRhKFwicGx1Z2luLW9wdGlvbnNcIikpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGpRdWVyeSh0aGlzKS5tYWduaWZpY1BvcHVwKGNvbmZpZyk7XG5cblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fVxuXG5cdH1cblxuXG5cblxuLyoqIDA2LiBTY3JvbGxUb1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9zY3JvbGxUbyh0bywgb2Zmc2V0KSB7XG5cblx0XHRpZih0byA9PSBmYWxzZSkge1xuXG5cdFx0XHRqUXVlcnkoXCJhLnNjcm9sbFRvXCIpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR2YXIgaHJlZiBcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2hyZWYnKSxcblx0XHRcdFx0XHRfb2Zmc2V0XHQ9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLW9mZnNldCcpIHx8IDA7XG5cblx0XHRcdFx0aWYoaHJlZiAhPSAnIycgJiYgaHJlZiAhPSAnI3RvcCcpIHtcblx0XHRcdFx0XHRqUXVlcnkoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogalF1ZXJ5KGhyZWYpLm9mZnNldCgpLnRvcCAtIHBhcnNlSW50KF9vZmZzZXQpfSwgODAwLCAnZWFzZUluT3V0RXhwbycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaHJlZiA9PSAnI3RvcCcpIHtcblx0XHRcdFx0XHRqUXVlcnkoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCwgJ2Vhc2VJbk91dEV4cG8nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGpRdWVyeShcIiN0b1RvcFwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGpRdWVyeSgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwLCAnZWFzZUluT3V0RXhwbycpO1xuXHRcdFx0fSk7XG5cdFx0XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gVVNBR0U6IF9zY3JvbGxUbyhcIiNmb290ZXJcIiwgMTUwKTtcblx0XHRcdGpRdWVyeSgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBqUXVlcnkodG8pLm9mZnNldCgpLnRvcCAtIG9mZnNldH0sIDgwMCwgJ2Vhc2VJbk91dEV4cG8nKTtcblxuXHRcdH1cblx0fVxuXG5cblxuXG4vKiogMDcuIFBhcmFsbGF4XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3BhcmFsbGF4KCkge1xuXG5cdFx0aWYoalF1ZXJ5KCkucGFyYWxsYXgpIHtcblxuXHRcdFx0Ly8galF1ZXJ5KFwiLnBhcmFsbGF4LTFcIikuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIsIFwiZml4ZWRcIik7XG5cdFx0XHRqUXVlcnkoXCIucGFyYWxsYXgtMVwiKS5wYXJhbGxheChcIjUwJVwiLCBcIjAuMVwiKTtcblxuXHRcdFx0Ly8galF1ZXJ5KFwiLnBhcmFsbGF4LTJcIikuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIsIFwiZml4ZWRcIik7XG5cdFx0XHRqUXVlcnkoXCIucGFyYWxsYXgtMlwiKS5wYXJhbGxheChcIjUwJVwiLCBcIjAuMlwiKTtcblxuXHRcdFx0Ly8galF1ZXJ5KFwiLnBhcmFsbGF4LTNcIikuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIsIFwiZml4ZWRcIik7XG5cdFx0XHRqUXVlcnkoXCIucGFyYWxsYXgtM1wiKS5wYXJhbGxheChcIjUwJVwiLCBcIjAuM1wiKTtcblxuXHRcdFx0Ly8galF1ZXJ5KFwiLnBhcmFsbGF4LTRcIikuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIsIFwiZml4ZWRcIik7XG5cdFx0XHRqUXVlcnkoXCIucGFyYWxsYXgtNFwiKS5wYXJhbGxheChcIjUwJVwiLCBcIjAuNFwiKTtcblxuXHRcdH1cblxuXG5cdFx0LyoqIFNsaWRlciBQYXJhbGxheCBcblx0XHRcdERvIG5vdCB1c2Ugb3ZlcmxheSAtIHdpbGwgYmUgdmVyeSBzbG93IVxuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdHZhciBfc2xpZGVyID0galF1ZXJ5KCcjc2xpZGVyJyk7XG5cblx0XHRpZihfc2xpZGVyLmxlbmd0aCA+IDApIHtcblx0XHRcdGlmKF9zbGlkZXIuaGFzQ2xhc3MoJ3BhcmFsbGF4LXNsaWRlcicpKSB7XG5cblx0XHRcdFx0dmFyIGJsb2NrX2ludHJvX3RvcCA9IF9zbGlkZXIub2Zmc2V0KCkudG9wO1x0XG5cdFx0XHRcblx0XHRcdFx0alF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0dmFyIF9jdXJyZW50VG9wID0galF1ZXJ5KGRvY3VtZW50KS5zY3JvbGxUb3AoKTsgXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoX2N1cnJlbnRUb3AgPCA3NjgpIHtcblx0XHRcdFx0XHRcdHZhciBfc2xpZGVySCBcdD0galF1ZXJ5KCcjc2xpZGVyJykuaGVpZ2h0KCk7XG5cblx0XHRcdFx0XHRcdGpRdWVyeSgnI3NsaWRlcj5kaXYnKS5jc3MoJ3RvcCcsIChfY3VycmVudFRvcCowLjUpKTtcblx0XHRcdFx0XHRcdGpRdWVyeSgnI3NsaWRlcj5kaXYnKS5jc3MoJ29wYWNpdHknLCAoMSAtIF9jdXJyZW50VG9wL19zbGlkZXJIKjEpKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSk7XG5cdFx0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXG5cblxuLyoqIDA3LiBWaWRlb1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF92aWRlbygpIHtcblxuXHRcdGlmKGpRdWVyeShcInNlY3Rpb24uc2VjdGlvbi12aWRlb1wiKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgX3QgPSBqUXVlcnkoXCJzZWN0aW9uLnNlY3Rpb24tdmlkZW8gLnNlY3Rpb24tY29udGFpbmVyLXZpZGVvPnZpZGVvXCIpO1xuXHRcdFx0XHRfdyA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCk7XG5cblx0XHRcdF90LndpZHRoKF93KTtcblx0XHRcdFxuXHRcdH1cblxuXHR9XG5cblxuXG4vKiogMDcuIFlvdXR1YmUgQmFja3JvdW5kXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3lvdXR1YmVCRygpIHtcblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnI1lUUGxheWVyJyk7XG5cdFx0XG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2pxdWVyeS5tYi5ZVFBsYXllci5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXG5cdFx0XHRcdGlmKGpRdWVyeSgpLm1iX1lUUGxheWVyKSB7XG5cdFx0XHRcdFx0dmFyIGRpc2FibGVNb2JpbGUgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiggL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSApIHsgXG5cdFx0XHRcdFx0XHQvLyBkaXNhYmxlTW9iaWxlID0gdHJ1ZTsgXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoZGlzYWJsZU1vYmlsZSA9PT0gZmFsc2UpIHtcblxuXHRcdFx0XHRcdFx0alF1ZXJ5KFwiLnBsYXllclwiKS5tYl9ZVFBsYXllcigpO1xuXG5cdFx0XHRcdFx0XHRqUXVlcnkoXCIjdmlkZW8tdm9sdW1lXCIpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0XHRqUXVlcnkoJyNZVFBsYXllcicpLnRvZ2dsZVZvbHVtZSgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8vIGF1ZGlvIGNvbnRyb2xcblx0XHRcdFx0XHRcdGpRdWVyeShcIiN2aWRlby12b2x1bWVcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRpZihqUXVlcnkoJ2kuZmEnLCB0aGlzKS5oYXNDbGFzcygnZmEtdm9sdW1lLWRvd24nKSkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnaS5mYScsIHRoaXMpLnJlbW92ZUNsYXNzKCdmYS12b2x1bWUtZG93bicpO1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnaS5mYScsIHRoaXMpLnJlbW92ZUNsYXNzKCdmYS12b2x1bWUtdXAnKTtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoJ2kuZmEnLCB0aGlzKS5hZGRDbGFzcygnZmEtdm9sdW1lLXVwJyk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCdpLmZhJywgdGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLXZvbHVtZS11cCcpO1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnaS5mYScsIHRoaXMpLnJlbW92ZUNsYXNzKCdmYS12b2x1bWUtdicpO1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnaS5mYScsIHRoaXMpLmFkZENsYXNzKCdmYS12b2x1bWUtZG93bicpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdGpRdWVyeShcIi5wbGF5ZXIgLCAjdmlkZW8tdm9sdW1lXCIpLmhpZGUoKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblxuLyoqIDA4LiBNaXhpdHVwIEZpbHRlclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9taXhpdHVwKCkge1xuXHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KCcubWl4LWdyaWQnKTtcblx0XHRcblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnbWl4aXR1cC9qcXVlcnkubWl4aXR1cC5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRpZihqUXVlcnkoKS5taXhpdHVwKSB7XG5cblx0XHRcdFx0XHRfY29udGFpbmVyLm1peGl0dXAoKTtcblx0XHRcdFx0XHRqUXVlcnkoXCJ1bC5taXgtZmlsdGVyIGFcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR9XG5cdFx0XHRcblx0XHRcdH0pO1xuXHRcdFxuXHRcdH1cblxuXHR9XG5cblxuXG4vKiogMDkuIFRvZ2dsZVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF90b2dnbGUoKSB7XG5cblx0XHR2YXIgJF90ID0gdGhpcyxcblx0XHRcdHByZXZpZXdQYXJDbG9zZWRIZWlnaHQgPSAyNTtcblxuXHRcdGpRdWVyeShcImRpdi50b2dnbGUuYWN0aXZlID4gcFwiKS5hZGRDbGFzcyhcInByZXZpZXctYWN0aXZlXCIpO1xuXHRcdGpRdWVyeShcImRpdi50b2dnbGUuYWN0aXZlID4gZGl2LnRvZ2dsZS1jb250ZW50XCIpLnNsaWRlRG93big0MDApO1xuXHRcdGpRdWVyeShcImRpdi50b2dnbGUgPiBsYWJlbFwiKS5jbGljayhmdW5jdGlvbihlKSB7XG5cblx0XHRcdHZhciBwYXJlbnRTZWN0aW9uIFx0PSBqUXVlcnkodGhpcykucGFyZW50KCksXG5cdFx0XHRcdHBhcmVudFdyYXBwZXIgXHQ9IGpRdWVyeSh0aGlzKS5wYXJlbnRzKFwiZGl2LnRvZ2dsZVwiKSxcblx0XHRcdFx0cHJldmlld1BhciBcdFx0PSBmYWxzZSxcblx0XHRcdFx0aXNBY2NvcmRpb24gXHQ9IHBhcmVudFdyYXBwZXIuaGFzQ2xhc3MoXCJ0b2dnbGUtYWNjb3JkaW9uXCIpO1xuXG5cdFx0XHRpZihpc0FjY29yZGlvbiAmJiB0eXBlb2YoZS5vcmlnaW5hbEV2ZW50KSAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdHBhcmVudFdyYXBwZXIuZmluZChcImRpdi50b2dnbGUuYWN0aXZlID4gbGFiZWxcIikudHJpZ2dlcihcImNsaWNrXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRwYXJlbnRTZWN0aW9uLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG5cdFx0XHRpZihwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IHBcIikuZ2V0KDApKSB7XG5cblx0XHRcdFx0cHJldmlld1BhciBcdFx0XHRcdFx0PSBwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IHBcIik7XG5cdFx0XHRcdHZhciBwcmV2aWV3UGFyQ3VycmVudEhlaWdodCA9IHByZXZpZXdQYXIuY3NzKFwiaGVpZ2h0XCIpO1xuXHRcdFx0XHR2YXIgcHJldmlld1BhckFuaW1hdGVIZWlnaHQgPSBwcmV2aWV3UGFyLmNzcyhcImhlaWdodFwiKTtcblx0XHRcdFx0cHJldmlld1Bhci5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuXHRcdFx0XHRwcmV2aWV3UGFyLmNzcyhcImhlaWdodFwiLCBwcmV2aWV3UGFyQ3VycmVudEhlaWdodCk7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIHRvZ2dsZUNvbnRlbnQgPSBwYXJlbnRTZWN0aW9uLmZpbmQoXCI+IGRpdi50b2dnbGUtY29udGVudFwiKTtcblxuXHRcdFx0aWYocGFyZW50U2VjdGlvbi5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xuXG5cdFx0XHRcdGpRdWVyeShwcmV2aWV3UGFyKS5hbmltYXRlKHtoZWlnaHQ6IHByZXZpZXdQYXJBbmltYXRlSGVpZ2h0fSwgMzUwLCBmdW5jdGlvbigpIHtqUXVlcnkodGhpcykuYWRkQ2xhc3MoXCJwcmV2aWV3LWFjdGl2ZVwiKTt9KTtcblx0XHRcdFx0dG9nZ2xlQ29udGVudC5zbGlkZURvd24oMzUwKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRqUXVlcnkocHJldmlld1BhcikuYW5pbWF0ZSh7aGVpZ2h0OiBwcmV2aWV3UGFyQ2xvc2VkSGVpZ2h0fSwgMzUwLCBmdW5jdGlvbigpIHtqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoXCJwcmV2aWV3LWFjdGl2ZVwiKTt9KTtcblx0XHRcdFx0dG9nZ2xlQ29udGVudC5zbGlkZVVwKDM1MCk7XG5cblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9XG5cblxuXG4vKiogMTEuIFBsYWNlaG9sZGVyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3BsYWNlaG9sZGVyKCkge1xuXG5cdFx0Ly9jaGVjayBmb3IgSUVcblx0XHRpZihuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTVNJRVwiKSE9LTEpIHtcblxuXHRcdFx0alF1ZXJ5KCdbcGxhY2Vob2xkZXJdJykuZm9jdXMoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0dmFyIGlucHV0ID0galF1ZXJ5KHRoaXMpO1xuXHRcdFx0XHRpZiAoaW5wdXQudmFsKCkgPT0gaW5wdXQuYXR0cigncGxhY2Vob2xkZXInKSkge1xuXHRcdFx0XHRcdGlucHV0LnZhbCgnJyk7XG5cdFx0XHRcdFx0aW5wdXQucmVtb3ZlQ2xhc3MoJ3BsYWNlaG9sZGVyJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYmx1cihmdW5jdGlvbigpIHtcblxuXHRcdFx0XHR2YXIgaW5wdXQgPSBqUXVlcnkodGhpcyk7XG5cdFx0XHRcdGlmIChpbnB1dC52YWwoKSA9PSAnJyB8fCBpbnB1dC52YWwoKSA9PSBpbnB1dC5hdHRyKCdwbGFjZWhvbGRlcicpKSB7XG5cdFx0XHRcdGlucHV0LmFkZENsYXNzKCdwbGFjZWhvbGRlcicpO1xuXHRcdFx0XHRpbnB1dC52YWwoaW5wdXQuYXR0cigncGxhY2Vob2xkZXInKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYmx1cigpO1xuXG5cdFx0fVxuXG5cdH1cblxuXG5cbi8qKiAxMi4gV29yZCBSb3RhdGVcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfd3JvdGF0ZSgpIHtcblx0XHRqUXVlcnkoXCIud29yZC1yb3RhdG9yXCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciBfdCBcdFx0XHRcdD0galF1ZXJ5KHRoaXMpLFxuXHRcdFx0XHRfaXRlbXMgXHRcdFx0PSBfdC5maW5kKFwiLml0ZW1zXCIpLFxuXHRcdFx0XHRpdGVtcyBcdFx0XHQ9IF9pdGVtcy5maW5kKFwiPiBzcGFuXCIpLFxuXHRcdFx0XHRmaXJzdEl0ZW0gXHRcdD0gaXRlbXMuZXEoMCksXG5cdFx0XHRcdGZpcnN0SXRlbUNsb25lIFx0PSBmaXJzdEl0ZW0uY2xvbmUoKSxcblx0XHRcdFx0X2lIZWlnaHQgXHRcdD0galF1ZXJ5KHRoaXMpLmhlaWdodCgpLFxuXHRcdFx0XHRfY0l0ZW0gXHRcdFx0PSAxLFxuXHRcdFx0XHRfY1RvcCBcdFx0XHQ9IDAsXG5cdFx0XHRcdF9kZWxheSBcdFx0XHQ9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWRlbGF5JykgfHwgMjAwMDtcblxuXHRcdFx0X2l0ZW1zLmFwcGVuZChmaXJzdEl0ZW1DbG9uZSk7XG5cdFx0XHRfdC5oZWlnaHQoX2lIZWlnaHQpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG5cdFx0XHRzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdFx0X2NUb3AgPSAoX2NJdGVtICogX2lIZWlnaHQpO1xuXG5cdFx0XHRcdF9pdGVtcy5hbmltYXRlKHt0b3A6IC0gKF9jVG9wKSArIFwicHhcIn0sIDMwMCwgXCJlYXNlT3V0UXVhZFwiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdF9jSXRlbSsrO1xuXG5cdFx0XHRcdFx0aWYoX2NJdGVtID4gaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRfaXRlbXMuY3NzKFwidG9wXCIsIDApO1xuXHRcdFx0XHRcdFx0X2NJdGVtID0gMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIF9kZWxheSk7XG5cblx0XHR9KTtcblxuXG5cdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkoJ3NwYW4ucm90YXRlJyk7XG5cdFx0XG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAndGV4dC1yb3RhdG9yL2pxdWVyeS5zaW1wbGUtdGV4dC1yb3RhdG9yLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdF9jb250YWluZXIuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgX3QgXHRcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0XHRfYW5pbWF0aW9uIFx0PSBfdC5hdHRyKCdkYXRhLWFuaW1hdGlvbicpIHx8ICdmYWRlJywgLy8gZmFkZXxmbGlwfGZsaXBDdWJlfGZsaXBVcHxzcGluXG5cdFx0XHRcdFx0XHRfc3BlZWQgXHRcdD0gX3QuYXR0cignZGF0YS1zcGVlZCcpIFx0fHwgMjAwMDtcblxuXHRcdFx0XHRcdF90LnRleHRyb3RhdG9yKHtcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjogXHRfYW5pbWF0aW9uLFxuXHRcdFx0XHRcdFx0c3BlZWQ6IFx0XHRwYXJzZUludChfc3BlZWQpXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXHRcdFxuXHRcdH1cblx0fVxuXG5cblxuXG4vKiogMDguIExhenkgTG9hZFxuXHQ8aW1nIGNsYXNzPVwibGF6eVwiIGRhdGEtb3JpZ2luYWw9XCJpbWcvZXhhbXBsZS5qcGdcIiB3aWR0aD1cIjc2NVwiIGhlaWdodD1cIjU3NFwiPlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9sYXp5bG9hZCgpIHtcblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnaW1nLmxhenknKTtcblx0XHRcblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnbGF6eWxvYWQvanF1ZXJ5Lmxhenlsb2FkLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGpRdWVyeSgpLmxhenlsb2FkKSB7XG5cblx0XHRcdFx0XHRfY29udGFpbmVyLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dmFyIF90IFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdFx0X2VmZmVjdCA9IF90LmF0dHIoJ2RhdGEtZWZmZWN0JykgfHwgJ2ZhZGVJbic7XG5cblx0XHRcdFx0XHRcdFx0X3QubGF6eWxvYWQoe1xuXHRcdFx0XHRcdFx0XHRcdGVmZmVjdCA6IF9lZmZlY3Rcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR9KTtcblx0XHRcblx0XHR9XG5cblx0fVxuXG5cblxuXG5cbi8qKiAxMy4gTWlzY1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9taXNjKCkge1xuXG5cdFx0LyoqIFBvcnRmb2xpbyBCdWdmaXhcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0aWYoalF1ZXJ5KFwiI3BvcnRmb2xpb1wiKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRqUXVlcnkoXCIjcG9ydGZvbGlvIC5pdGVtLWJveCAub3dsLWNhcm91c2VsXCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gRml4IGlmIGhhcyBvd2wtY2Fyb3VzZWwgc2xpZGVyIVxuXHRcdFx0XHRqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLml0ZW0tYm94LWRlc2MnKS5jc3Moe1wicGFkZGluZy10b3BcIjpcIjI5cHhcIn0pO1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKiogTWFzb25yeVxuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0XHRpZihqUXVlcnkoKS5tYXNvbnJ5KSB7XG5cdFx0XHRqUXVlcnkoXCIubWFzb25yeVwiKS5tYXNvbnJ5KCk7XG5cdFx0fVxuXG5cblxuXHRcdC8qKiBJc290b3BlIFBvcnRmb2xpb1xuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0XHR2YXIgcG9ydGZvbGlvX2lzb3RvcGVfY29udGFpbmVyID0galF1ZXJ5KFwiI3BvcnRmb2xpby5wb3J0Zm9saW8taXNvdG9wZVwiKTtcblxuXHRcdGlmKHBvcnRmb2xpb19pc290b3BlX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2lzb3RvcGUvaXNvdG9wZS5wa2dkLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIElzb3RvcGUgUG9ydGZvbGlvXG5cdFx0XHRcdGlmKGpRdWVyeSgpLmlzb3RvcGUpIHtcblxuXHRcdFx0XHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KCcjcG9ydGZvbGlvJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIEl0ZW0gV2lkdGggb24gRnVsbHdpZHRoIHBvcnRmb2xpb1xuXHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ3BvcnRmb2xpby1pc290b3BlLTInKSkge1xuXHRcdFx0XHRcdFx0X2NvbHMgPSAyO1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ3BvcnRmb2xpby1pc290b3BlLTMnKSkge1xuXHRcdFx0XHRcdFx0X2NvbHMgPSAzO1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ3BvcnRmb2xpby1pc290b3BlLTQnKSkge1xuXHRcdFx0XHRcdFx0X2NvbHMgPSA0O1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ3BvcnRmb2xpby1pc290b3BlLTUnKSkge1xuXHRcdFx0XHRcdFx0X2NvbHMgPSA1O1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ3BvcnRmb2xpby1pc290b3BlLTYnKSkge1xuXHRcdFx0XHRcdFx0X2NvbHMgPSA2O1xuXHRcdFx0XHRcdH0gZWxzZSB7IF9jb2xzID0gNDsgfVxuXG5cblxuXHRcdFx0XHRcdGZ1bmN0aW9uIF9yZWNhbGNXKCkge1xuXHRcdFx0XHRcdFx0X2R3XHRcdD0galF1ZXJ5KGRvY3VtZW50KS53aWR0aCgpO1xuXG5cdFx0XHRcdFx0XHRpZihfY29udGFpbmVyLmhhc0NsYXNzKCdmdWxsd2lkdGgnKSkgeyAvLyBGdWxsd2lkdGggXG5cblx0XHRcdFx0XHRcdFx0Ly8gX3cgXHRcdD0galF1ZXJ5KGRvY3VtZW50KS53aWR0aCgpOyAvLyBOT1QgVVNFRCAtIHByb2JsZW1zIG9uIGFzaWRlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRfdyBcdFx0PSBfY29udGFpbmVyLndpZHRoKCk7XG5cdFx0XHRcdFx0XHRcdF93SXRlbVx0PSAoX3cvX2NvbHMpO1xuXG5cdFx0XHRcdFx0XHRcdGlmKF9kdyA8IDc2MCkge1xuXHRcdFx0XHRcdFx0XHRcdF93SXRlbSA9IChfdy8yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihfZHcgPCA0ODApIHtcblx0XHRcdFx0XHRcdFx0XHRfd0l0ZW0gPSBqUXVlcnkoXCIjcG9ydGZvbGlvXCIpLndpZHRoKCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBBcHBseSBpdGVtIHdpZHRoXG5cdFx0XHRcdFx0XHRcdGpRdWVyeShcIiNwb3J0Zm9saW8+LnBvcnRmb2xpby1pdGVtXCIpLmNzcyh7XCJ3aWR0aFwiOl93SXRlbX0pO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvLyBOb24gRnVsbHdpZHRoIFxuXG5cdFx0XHRcdFx0XHRcdF9tUlx0XHQ9IHBhcnNlSW50KGpRdWVyeShcIiNwb3J0Zm9saW8+LnBvcnRmb2xpby1pdGVtXCIpLmNzcygnbWFyZ2luLXJpZ2h0JykpO1xuXHRcdFx0XHRcdFx0XHRfdyBcdFx0PSBqUXVlcnkoXCIjcG9ydGZvbGlvXCIpLmNsb3Nlc3QoJy5jb250YWluZXInKS53aWR0aCgpO1xuXHRcdFx0XHRcdFx0XHRfd0l0ZW0gXHQ9IF93IC8gX2NvbHMgLSBfbVI7XG5cblx0XHRcdFx0XHRcdFx0aWYoX2R3IDwgNzYwKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3dJdGVtID0gKF93LzIgLSBfbVIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKF9kdyA8IDQ4MCkge1xuXHRcdFx0XHRcdFx0XHRcdF93SXRlbSA9IF93O1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXBwbHkgaXRlbSAmIGNvbnRhaW5lciB3aWR0aFxuXHRcdFx0XHRcdFx0XHRqUXVlcnkoXCIjcG9ydGZvbGlvLnBvcnRmb2xpby1pc290b3BlXCIpLmNzcyh7XCJ3aWR0aFwiOl93fSk7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeShcIiNwb3J0Zm9saW8+LnBvcnRmb2xpby1pdGVtXCIpLmNzcyh7XCJ3aWR0aFwiOl93SXRlbX0pO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIFJlc2l6ZSBGbGV4IFNsaWRlciBpZiBleGlzdHMhXG5cdFx0XHRcdFx0XHRpZihqUXVlcnkoJy5mbGV4c2xpZGVyJykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkoJy5mbGV4c2xpZGVyJykucmVzaXplKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XHRfcmVjYWxjVygpO1xuXG5cblxuXHRcdFx0XHRcdGpRdWVyeSh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKXtcblxuXHRcdFx0XHRcdFx0dmFyIF90ID0gc2V0VGltZW91dChmdW5jdGlvbigpeyBcblxuXHRcdFx0XHRcdFx0XHRfY29udGFpbmVyLmlzb3RvcGUoe1xuXHRcdFx0XHRcdFx0XHRcdG1hc29ucnk6IHt9LFxuXG5cdFx0XHRcdFx0XHRcdFx0ZmlsdGVyOiAnKicsXG5cdFx0XHRcdFx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDc1MCxcblx0XHRcdFx0XHRcdFx0XHRcdGVhc2luZzogJ2xpbmVhcicsXG5cdFx0XHRcdFx0XHRcdFx0XHRxdWV1ZTogZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdGpRdWVyeSgnI3BvcnRmb2xpb19maWx0ZXI+bGk+YScpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoJyNwb3J0Zm9saW9fZmlsdGVyPmxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkodGhpcykucGFyZW50KCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RvciA9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWZpbHRlcicpO1xuXHRcdFx0XHRcdFx0XHRcdF9jb250YWluZXIuaXNvdG9wZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWx0ZXI6IHNlbGVjdG9yLFxuXHRcdFx0XHRcdFx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogNzUwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlYXNpbmc6ICdsaW5lYXInLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRxdWV1ZTogZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQgfSk7XG5cblx0XHRcdFx0XHRcdFx0fSk7IFxuXHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0fSwgNTAgKTtcblxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdsYXlvdXQnKTtcblx0XHRcdFx0XHRcdH0sIDMwMCk7XG5cblx0XHRcdFx0XHR9KTtcblxuXG5cblx0XHRcdFx0XHQvLyBPbiBSZXNpemVcblx0XHRcdFx0XHRqUXVlcnkod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdGlmKHdpbmRvdy5hZnRlclJlc2l6ZUFwcDIpIHtcblx0XHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHdpbmRvdy5hZnRlclJlc2l6ZUFwcDIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR3aW5kb3cuYWZ0ZXJSZXNpemVBcHAyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRfcmVjYWxjVygpO1xuXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdsYXlvdXQnKTtcblx0XHRcdFx0XHRcdFx0fSwgMzAwKTtcblxuXHRcdFx0XHRcdFx0fSwgMzAwKTtcblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFxuXHRcdFx0XHR9XG5cblxuXHRcdFx0fSk7XG5cdFx0fVx0LyoqIGVuZCBpc290b3BlICoqL1xuXG5cblxuXG5cdFx0LyoqIElzb3RvcGUgQmxvZ1xuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0XHR2YXIgYmxvZ19pc290b3BlX2NvbnRhaW5lciA9IGpRdWVyeShcIiNibG9nLmJsb2ctaXNvdG9wZVwiKTtcblxuXHRcdGlmKGJsb2dfaXNvdG9wZV9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdpc290b3BlL2lzb3RvcGUucGtnZC5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBJc290b3BlIGJsb2dcblx0XHRcdFx0aWYoalF1ZXJ5KCkuaXNvdG9wZSkge1xuXG5cdFx0XHRcdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkoJyNibG9nJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIEl0ZW0gV2lkdGggb24gRnVsbHdpZHRoIEJsb2dcblx0XHRcdFx0XHRpZihfY29udGFpbmVyLmhhc0NsYXNzKCdibG9nLWlzb3RvcGUtMicpKSB7XG5cdFx0XHRcdFx0XHRfY29scyA9IDI7XG5cdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0aWYoX2NvbnRhaW5lci5oYXNDbGFzcygnYmxvZy1pc290b3BlLTMnKSkge1xuXHRcdFx0XHRcdFx0X2NvbHMgPSAzO1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ2Jsb2ctaXNvdG9wZS00JykpIHtcblx0XHRcdFx0XHRcdF9jb2xzID0gNDtcblx0XHRcdFx0XHR9IGVsc2UgeyBfY29scyA9IDQ7IH1cblxuXG5cdFx0XHRcdFx0ZnVuY3Rpb24gX3JlY2FsY1coKSB7XG5cdFx0XHRcdFx0XHRfZHdcdFx0PSBqUXVlcnkoZG9jdW1lbnQpLndpZHRoKCk7XG5cblx0XHRcdFx0XHRcdGlmKF9jb250YWluZXIuaGFzQ2xhc3MoJ2Z1bGx3aWR0aCcpKSB7IC8vIEZ1bGx3aWR0aCBcblxuXHRcdFx0XHRcdFx0XHRfdyBcdFx0PSBqUXVlcnkoZG9jdW1lbnQpLndpZHRoKCk7XG5cdFx0XHRcdFx0XHRcdF93SXRlbVx0PSAoX3cvX2NvbHMpO1xuXG5cdFx0XHRcdFx0XHRcdGlmKF9kdyA8IDc2MCkge1xuXHRcdFx0XHRcdFx0XHRcdF93SXRlbSA9IChfdy8yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihfZHcgPCA0ODApIHtcblx0XHRcdFx0XHRcdFx0XHRfd0l0ZW0gPSBqUXVlcnkoXCIjYmxvZ1wiKS53aWR0aCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXBwbHkgaXRlbSB3aWR0aFxuXHRcdFx0XHRcdFx0XHRqUXVlcnkoXCIjYmxvZz4uYmxvZy1wb3N0LWl0ZW1cIikuY3NzKHtcIndpZHRoXCI6X3dJdGVtfSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIE5vbiBGdWxsd2lkdGggXG5cblx0XHRcdFx0XHRcdFx0X21SXHRcdD0gcGFyc2VJbnQoalF1ZXJ5KFwiI2Jsb2c+LmJsb2ctcG9zdC1pdGVtXCIpLmNzcygnbWFyZ2luLXJpZ2h0JykpO1xuXHRcdFx0XHRcdFx0XHRfdyBcdFx0PSBqUXVlcnkoXCIjYmxvZ1wiKS5jbG9zZXN0KCcuY29udGFpbmVyJykud2lkdGgoKTtcblx0XHRcdFx0XHRcdFx0X3dJdGVtIFx0PSBfdyAvIF9jb2xzIC0gX21SO1xuXG5cdFx0XHRcdFx0XHRcdGlmKF9kdyA8IDc2MCkge1xuXHRcdFx0XHRcdFx0XHRcdF93SXRlbSA9IChfdy8yIC0gX21SKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihfZHcgPCA0ODApIHtcblx0XHRcdFx0XHRcdFx0XHRfd0l0ZW0gPSBfdztcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIEFwcGx5IGl0ZW0gJiBjb250YWluZXIgd2lkdGhcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KFwiI2Jsb2cuYmxvZy1pc290b3BlXCIpLmNzcyh7XCJ3aWR0aFwiOl93fSk7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeShcIiNibG9nPi5ibG9nLXBvc3QtaXRlbVwiKS5jc3Moe1wid2lkdGhcIjpfd0l0ZW19KTtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBSZXNpemUgRmxleCBTbGlkZXIgaWYgZXhpc3RzIVxuXHRcdFx0XHRcdFx0aWYoalF1ZXJ5KCcuZmxleHNsaWRlcicpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCcuZmxleHNsaWRlcicpLnJlc2l6ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVx0X3JlY2FsY1coKTtcblxuXG5cblx0XHRcdFx0XHRqUXVlcnkod2luZG93KS5sb2FkKGZ1bmN0aW9uKCl7XG5cblx0XHRcdFx0XHRcdHZhciBfdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG5cblx0XHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKHtcblx0XHRcdFx0XHRcdFx0XHRtYXNvbnJ5OiB7fSxcblxuXHRcdFx0XHRcdFx0XHRcdGZpbHRlcjogJyonLFxuXHRcdFx0XHRcdFx0XHRcdGFuaW1hdGlvbk9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiA3NTAsXG5cdFx0XHRcdFx0XHRcdFx0XHRlYXNpbmc6ICdsaW5lYXInLFxuXHRcdFx0XHRcdFx0XHRcdFx0cXVldWU6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHRqUXVlcnkoJyNibG9nX2ZpbHRlcj5saT5hJykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnI2Jsb2dfZmlsdGVyPmxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkodGhpcykucGFyZW50KCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHRcdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RvciA9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWZpbHRlcicpO1xuXHRcdFx0XHRcdFx0XHRcdF9jb250YWluZXIuaXNvdG9wZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWx0ZXI6IHNlbGVjdG9yLFxuXHRcdFx0XHRcdFx0XHRcdFx0YW5pbWF0aW9uT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogNzUwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlYXNpbmc6ICdsaW5lYXInLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRxdWV1ZTogZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQgfSk7XG5cblx0XHRcdFx0XHRcdFx0fSk7IFxuXHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0fSwgNTAgKTtcblxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdsYXlvdXQnKTtcblx0XHRcdFx0XHRcdH0sIDMwMCk7XG5cblx0XHRcdFx0XHR9KTtcblxuXG5cblx0XHRcdFx0XHQvLyBPbiBSZXNpemVcblx0XHRcdFx0XHRqUXVlcnkod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdGlmKHdpbmRvdy5hZnRlclJlc2l6ZUFwcDIpIHtcblx0XHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHdpbmRvdy5hZnRlclJlc2l6ZUFwcDIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR3aW5kb3cuYWZ0ZXJSZXNpemVBcHAyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRfcmVjYWxjVygpO1xuXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdsYXlvdXQnKTtcblx0XHRcdFx0XHRcdFx0fSwgMzAwKTtcblxuXHRcdFx0XHRcdFx0fSwgMzAwKTtcblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFxuXHRcdFx0XHR9XG5cblxuXHRcdFx0fSk7XG5cdFx0fVx0LyoqIGVuZCBpc290b3BlICoqL1xuXG5cblxuXG5cdFx0LyoqIEZsaXAgQm94ZXNcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0aWYoalF1ZXJ5KCcuYm94LWZsaXAnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcblx0XHRcdGpRdWVyeSgnLmJveC1mbGlwJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0X2hlaWdodDEgPSBqUXVlcnkoJy5ib3gxJyx0aGlzKS5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRfaGVpZ2h0MiA9IGpRdWVyeSgnLmJveDInLHRoaXMpLm91dGVySGVpZ2h0KCk7XG5cblx0XHRcdFx0aWYoX2hlaWdodDEgPj0gX2hlaWdodDIpIHtcblx0XHRcdFx0XHRfaGVpZ2h0ID0gX2hlaWdodDE7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X2hlaWdodCA9IF9oZWlnaHQyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0alF1ZXJ5KHRoaXMpLmNzcyh7XCJtaW4taGVpZ2h0XCI6X2hlaWdodCtcInB4XCJ9KTtcblx0XHRcdFx0alF1ZXJ5KCcuYm94MScsdGhpcykuY3NzKHtcIm1pbi1oZWlnaHRcIjpfaGVpZ2h0K1wicHhcIn0pO1xuXHRcdFx0XHRqUXVlcnkoJy5ib3gyJyx0aGlzKS5jc3Moe1wibWluLWhlaWdodFwiOl9oZWlnaHQrXCJweFwifSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0alF1ZXJ5KCcuYm94LWZsaXAnKS5ob3ZlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5KHRoaXMpLmFkZENsYXNzKCdmbGlwJyk7XG5cdFx0XHR9LGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGpRdWVyeSh0aGlzKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblxuXG5cdFx0LyoqIFN0aWNreSBTaWRlIChzb2NpYWwgaWNvbnMpXG5cdFx0ICoqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdGlmKGpRdWVyeShcImRpdi5zdGlja3ktc2lkZVwiKS5sZW5ndGggPiAwKSB7XG5cdFx0XG5cdFx0XHR2YXIgX3QgXHQ9IGpRdWVyeShcImRpdi5zdGlja3ktc2lkZVwiKTtcblx0XHRcdFx0X2hcdD0gX3QuaGVpZ2h0KCkgLyAyO1xuXHRcdFx0XHRcblx0XHRcdF90LmNzcyh7XCJtYXJnaW4tdG9wXCI6XCItXCIrX2grXCJweFwifSk7XG5cdFx0fVxuXG5cblxuXG5cdFx0LyoqIEluY3JlYXNlIC8gRGVjcmVhc2UgTm8uXG5cdFx0XHRFeGFtcGxlOiBzaG9wLXNpbmdsZS1sZWZ0Lmh0bWxcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0alF1ZXJ5KFwiLmluY3JcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dmFyIF9mb3JcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtZm9yJyksXG5cdFx0XHRcdF9tYXhcdD0gcGFyc2VJbnQoalF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtbWF4JykpLFxuXHRcdFx0XHRfY3VyVmFsXHQ9IHBhcnNlSW50KGpRdWVyeShcIiNcIiArIF9mb3IpLnZhbCgpKTtcblxuXHRcdFx0aWYoX2N1clZhbCA8IF9tYXgpIHtcblx0XHRcdFx0alF1ZXJ5KFwiI1wiICsgX2ZvcikudmFsKF9jdXJWYWwgKyAxKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGpRdWVyeShcIi5kZWNyXCIpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHZhciBfZm9yXHQ9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWZvcicpLFxuXHRcdFx0XHRfbWluXHQ9IHBhcnNlSW50KGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLW1pbicpKSxcblx0XHRcdFx0X2N1clZhbFx0PSBwYXJzZUludChqUXVlcnkoXCIjXCIgKyBfZm9yKS52YWwoKSk7XG5cblx0XHRcdGlmKF9jdXJWYWwgPiBfbWluKSB7XG5cdFx0XHRcdGpRdWVyeShcIiNcIiArIF9mb3IpLnZhbChfY3VyVmFsIC0gMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXG5cblxuXHRcdC8qKiBEZWZhdWx0IEJ1dHRvbiBUb2dnbGVcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0alF1ZXJ5KFwiYS50b2dnbGUtZGVmYXVsdFwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR2YXIgX2hyZWYgPSBqUXVlcnkodGhpcykuYXR0cignaHJlZicpO1xuXG5cdFx0XHRpZihqUXVlcnkoX2hyZWYpLmlzKFwiOmhpZGRlblwiKSkge1xuXG5cdFx0XHRcdGpRdWVyeShfaHJlZikuc2xpZGVUb2dnbGUoMjAwKTtcblx0XHRcdFx0alF1ZXJ5KCdpLmZhJywgdGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLXBsdXMtc3F1YXJlJykuYWRkQ2xhc3MoJ2ZhLW1pbnVzLXNxdWFyZScpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGpRdWVyeShfaHJlZikuc2xpZGVUb2dnbGUoMjAwKTtcblx0XHRcdFx0alF1ZXJ5KCdpLmZhJywgdGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLW1pbnVzLXNxdWFyZScpLmFkZENsYXNzKCdmYS1wbHVzLXNxdWFyZScpO1xuXHRcdFx0XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cblxuXG5cdFx0LyoqIEN1c3RvbSBGaWxlIFVwbG9hZFxuXHRcdFx0PGlucHV0IGNsYXNzPVwiY3VzdG9tLWZpbGUtdXBsb2FkXCIgdHlwZT1cImZpbGVcIiBpZD1cImZpbGVcIiBuYW1lPVwibXlmaWxlc1tdXCIgbXVsdGlwbGUgLz5cblx0XHQgKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0dmFyIGZpbGVfY29udGFpbmVyID0galF1ZXJ5KFwiaW5wdXRbdHlwZT1maWxlXVwiKTtcblxuXHRcdGlmKGZpbGVfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnY3VzdG9tLmZsZV91cGxvYWQuanMnKTtcblx0XHR9XG5cblxuXG5cdFx0LyoqIFRleHRhcmVhIFdvcmRzIExpbWl0XG5cdFx0ICoqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdGpRdWVyeShcInRleHRhcmVhLndvcmQtY291bnRcIikub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgX3RcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdHdvcmRzIFx0PSB0aGlzLnZhbHVlLm1hdGNoKC9cXFMrL2cpLmxlbmd0aCxcblx0XHRcdFx0X2xpbWl0XHQ9IF90LmF0dHIoJ2RhdGEtbWF4bGVuZ3RoJykgfHwgMjAwO1xuXG5cdFx0XHRpZiAod29yZHMgPiBwYXJzZUludChfbGltaXQpKSB7XG5cblx0XHRcdFx0Ly8gU3BsaXQgdGhlIHN0cmluZyBvbiBmaXJzdCAyMDAgd29yZHMgYW5kIHJlam9pbiBvbiBzcGFjZXNcblx0XHRcdFx0dmFyIHRyaW1tZWQgPSBfdC52YWwoKS5zcGxpdCgvXFxzKy8sIDIwMCkuam9pbihcIiBcIik7XG5cdFx0XHRcdC8vIEFkZCBhIHNwYWNlIGF0IHRoZSBlbmQgdG8ga2VlcCBuZXcgdHlwaW5nIG1ha2luZyBuZXcgd29yZHNcblx0XHRcdFx0X3QudmFsKHRyaW1tZWQgKyBcIiBcIik7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dmFyIF9kYXRhX2luZm8gPSBfdC5hdHRyKCdkYXRhLWluZm8nKTtcblxuXHRcdFx0XHRpZihfZGF0YV9pbmZvID09ICcnIHx8IF9kYXRhX2luZm8gPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dmFyIF9pbmZvQ29udGFpbmVyID0gX3QubmV4dCgnZGl2Jyk7XG5cdFx0XHRcdFx0alF1ZXJ5KCdzcGFuJywgX2luZm9Db250YWluZXIpLnRleHQod29yZHMgKyAnLycgKyBfbGltaXQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGpRdWVyeSgnIycgK19kYXRhX2luZm8pLnRleHQod29yZHMgKyAnLycgKyBfbGltaXQpO1xuXHRcdFx0XHR9XG5cblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXG5cbi8qKiBTdGlja3kgRm9vdGVyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3N0aWNreUZvb3RlcigpIHtcblx0XHRpZihqUXVlcnkoXCIjZm9vdGVyXCIpLmhhc0NsYXNzKCdzdGlja3knKSkge1xuXG5cdFx0XHR2YXIgZm9vdGVySGVpZ2h0ID0gMCxcblx0XHRcdFx0Zm9vdGVyVG9wIFx0PSAwLFxuXHRcdFx0XHRfZm9vdGVyIFx0XHQ9IGpRdWVyeShcIiNmb290ZXIuc3RpY2t5XCIpO1xuXG5cdFx0XHRwb3NpdGlvbkZvb3RlcigpO1xuXG5cdFx0XHRmdW5jdGlvbiBwb3NpdGlvbkZvb3RlcigpIHtcblx0XHRcdFx0Zm9vdGVySGVpZ2h0ID0gX2Zvb3Rlci5oZWlnaHQoKTtcblx0XHRcdFx0Zm9vdGVyVG9wID0gKGpRdWVyeSh3aW5kb3cpLnNjcm9sbFRvcCgpK2pRdWVyeSh3aW5kb3cpLmhlaWdodCgpLWZvb3RlckhlaWdodCkrXCJweFwiO1xuXG5cdFx0XHRcdGlmKChqUXVlcnkoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkrZm9vdGVySGVpZ2h0KSA+IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpKSB7XG5cdFx0XHRcdFx0X2Zvb3Rlci5jc3Moe1xuXHRcdFx0XHRcdFx0cG9zaXRpb246IFwiYWJzb2x1dGVcIlxuXHRcdFx0XHRcdH0pLnN0b3AoKS5hbmltYXRlKHtcblx0XHRcdFx0XHRcdHRvcDogZm9vdGVyVG9wXG5cdFx0XHRcdFx0fSwwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfZm9vdGVyLmNzcyh7cG9zaXRpb246IFwic3RhdGljXCJ9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGpRdWVyeSh3aW5kb3cpLnNjcm9sbChwb3NpdGlvbkZvb3RlcikucmVzaXplKHBvc2l0aW9uRm9vdGVyKTtcblxuXHRcdH1cblx0fVxuXG5cblxuXG5cbi8qKiBDb3VudGRvd25cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfY291bnREb3duKCkge1xuXHRcdHZhciBfY29udGFpbmVyIFx0PSBqUXVlcnkoXCIuY291bnRkb3duXCIpLFxuXHRcdFx0X2NvbnRhaW5lcjIgPSBqUXVlcnkoXCIuY291bnRkb3duLWRvd25sb2FkXCIpO1xuXHRcdFxuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCB8fCBfY29udGFpbmVyMi5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnY291bnRkb3duL2pxdWVyeS5jb3VudGRvd24ucGFjay5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvKiogT24gUGFnZSBMb2FkICoqL1xuXHRcdFx0XHRfY29udGFpbmVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIF90IFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdF9kYXRlIFx0PSBfdC5hdHRyKCdkYXRhLWZyb20nKSxcblx0XHRcdFx0XHRcdF9sYWJlbHNcdD0gX3QuYXR0cignZGF0YS1sYWJlbHMnKTtcblxuXHRcdFx0XHRcdFx0aWYoX2xhYmVscykge1xuXHRcdFx0XHRcdFx0XHRfbGFiZWxzID0gX2xhYmVscy5zcGxpdChcIixcIik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmKF9kYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfZCA9IG5ldyBEYXRlKF9kYXRlKTtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5KHRoaXMpLmNvdW50ZG93bih7XG5cdFx0XHRcdFx0XHRcdFx0dW50aWw6IG5ldyBEYXRlKF9kKSxcblx0XHRcdFx0XHRcdFx0XHRsYWJlbHM6IF9sYWJlbHMgfHwgW1wiWWVhcnNcIixcIk1vbnRoc1wiLFwiV2Vla3NcIixcIkRheXNcIixcIkhvdXJzXCIsXCJNaW51dGVzXCIsXCJTZWNvbmRzXCJdXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdC8qKiBEb3dubG9hZCAqKi9cblx0XHRcdFx0X2NvbnRhaW5lcjIuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHZhciBfdCA9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdGNkX2NvbnRhaW5lciBcdD0gX3QuYXR0cignZGF0YS1mb3InKSxcblx0XHRcdFx0XHRcdF9jb3VudGRvd25cdFx0PSBqUXVlcnkoXCIjXCIrY2RfY29udGFpbmVyKycgc3Bhbi5kb3dubG9hZC13YWl0Pi5jb3VudGRvd24nKSxcblx0XHRcdFx0XHRcdF9zZWNvbmRzIFx0XHQ9IHBhcnNlSW50KF90LmF0dHIoJ2RhdGEtc2Vjb25kcycpKSxcblx0XHRcdFx0XHRcdF9kYXRhVVJMXHRcdD0gX3QuYXR0cignaHJlZicpO1xuXG5cdFx0XHRcdFx0X3QuZmFkZU91dCgyNTAsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRqUXVlcnkoXCIjXCIrY2RfY29udGFpbmVyKS5mYWRlSW4oMjUwLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHR2YXIgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RGF0ZS5zZXRTZWNvbmRzKGN1cnJlbnREYXRlLmdldFNlY29uZHMoKSArIF9zZWNvbmRzKTtcblxuXHRcdFx0XHRcdFx0XHRfY291bnRkb3duLmNvdW50ZG93bih7XG5cdFx0XHRcdFx0XHRcdFx0dW50aWw6IGN1cnJlbnREYXRlLFxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdDogJ1MnLFxuXHRcdFx0XHRcdFx0XHRcdGV4cGlyeVVybDogX2RhdGFVUkwsXG5cdFx0XHRcdFx0XHRcdFx0b25FeHBpcnk6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoXCIjXCIrY2RfY29udGFpbmVyKycgc3Bhbi5kb3dubG9hZC1tZXNzYWdlJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShcIiNcIitjZF9jb250YWluZXIrJyBzcGFuLmRvd25sb2FkLXdhaXQnKS5hZGRDbGFzcygnaGlkZScpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdH0pO1xuXHRcdFxuXHRcdH1cblxuXHR9XG5cblxuXG4vKiogTWFzb25yeSBHYWxsZXJ5XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX21hc29ucnlHYWxsZXJ5KCkge1xuXG5cdFx0aWYoalF1ZXJ5KFwiLm1hc29ucnktZ2FsbGVyeVwiKS5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGpRdWVyeShcIi5tYXNvbnJ5LWdhbGxlcnlcIikuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0Y29sdW1uc1x0XHQ9IDQ7XG5cblx0XHRcdFx0XHQgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy0yJykpIFx0Y29sdW1ucyA9IDI7XG5cdFx0XHRcdGVsc2UgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy0zJykpIFx0Y29sdW1ucyA9IDM7XG5cdFx0XHRcdGVsc2UgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy00JykpIFx0Y29sdW1ucyA9IDQ7XG5cdFx0XHRcdGVsc2UgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy01JykpIFx0Y29sdW1ucyA9IDU7XG5cdFx0XHRcdGVsc2UgaWYoX2NvbnRhaW5lci5oYXNDbGFzcygnY29sdW1ucy02JykpIFx0Y29sdW1ucyA9IDY7XG5cblx0XHRcdFx0dmFyIF9maXJzdEVsZW1XaWR0aCBcdD0gX2NvbnRhaW5lci5maW5kKCdhOmVxKDApJykub3V0ZXJXaWR0aCgpLFxuXHRcdFx0XHRcdF9iaWdJbWFnZU5vIFx0XHQ9IF9jb250YWluZXIuYXR0cignZGF0YS1pbWctYmlnJyksXG5cdFx0XHRcdFx0X2NvbnRhaW5lcldpZHRoXHRcdD0gX2NvbnRhaW5lci53aWR0aCgpO1xuXG5cblx0XHRcdFx0Ly8gRml4IG1hcmdpbnMgJiBXaWR0aFxuICAgICAgICAgICAgICAgIHZhciBwb3N0V2lkdGggPSAoX2NvbnRhaW5lcldpZHRoL2NvbHVtbnMpO1xuXHRcdFx0XHRcdHBvc3RXaWR0aCA9IE1hdGguZmxvb3IocG9zdFdpZHRoKTtcbiAgICAgICAgICAgICAgICBpZigocG9zdFdpZHRoICogY29sdW1ucykgPj0gX2NvbnRhaW5lcldpZHRoKSB7IFxuXHRcdFx0XHRcdF9jb250YWluZXIuY3NzKHsgJ21hcmdpbi1yaWdodCc6ICctMXB4JyB9KTsgXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoY29sdW1ucyA8IDYpIHtcblx0XHRcdFx0XHRfY29udGFpbmVyLmNoaWxkcmVuKCdhJykuY3NzKHtcIndpZHRoXCI6cG9zdFdpZHRoK1wicHhcIn0pO1xuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHQvLyBTZXQgQmlnIEltYWdlXG4gICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoX2JpZ0ltYWdlTm8pID4gMCkge1xuXG5cdFx0XHRcdFx0X2JpZ0ltYWdlTm8gXHQ9IE51bWJlcihfYmlnSW1hZ2VObykgLSAxOyBcblx0XHRcdFx0XHRfY29udGFpbmVyLmZpbmQoJ2E6ZXEoJytfYmlnSW1hZ2VObysnKScpLmNzcyh7IHdpZHRoOiBfZmlyc3RFbGVtV2lkdGgqMiArICdweCd9KTtcblxuXHRcdFx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnaXNvdG9wZS9pc290b3BlLnBrZ2QubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRfY29udGFpbmVyLmlzb3RvcGUoe1xuXHRcdFx0XHRcdFx0XHRcdG1hc29ucnk6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbHVtbldpZHRoOiBfZmlyc3RFbGVtV2lkdGhcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdF9jb250YWluZXIuaXNvdG9wZSgnbGF5b3V0Jyk7XG5cblx0XHRcdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cdFx0XHR9KTtcblxuXG5cdFx0fVxuXG5cdH1cblxuXG5cblx0XG4vKiogVG9hc3RyXG5cblx0VFlQRTpcblx0XHRwcmltYXJ5XG5cdFx0aW5mb1xuXHRcdGVycm9yXG5cdFx0c3VjZXNzXG5cdFx0d2FybmluZ1xuXG5cdFBPU0lUSU9OXG5cdFx0dG9wLXJpZ2h0XG5cdFx0dG9wLWxlZnRcblx0XHR0b3AtY2VudGVyXG5cdFx0dG9wLWZ1bGwtd2lkdGhcblx0XHRib3R0b20tcmlnaHRcblx0XHRib3R0b20tbGVmdFxuXHRcdGJvdHRvbS1jZW50ZXJcblx0XHRib3R0b20tZnVsbC13aWR0aFxuXHRcdFxuXHRVU0FHRTpcblx0XHRfdG9hc3RyKFwiTXkgTWVzc2FnZSBoZXJlXCIsXCJ0b3AtcmlnaHRcIixcImVycm9yXCIsZmFsc2UpO1xuXHRcdFxuXHROT1RFOlxuXHRcdF9vbmNsaWNrID0gdXJsIHRvIHJlZGlyZWN0IChleGFtcGxlOiBodHRwOi8vd3d3LnN0ZXBvZndlYi5jb20pXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3RvYXN0cihfbWVzc2FnZSxfcG9zaXRpb24sX25vdGlmeVR5cGUsX29uY2xpY2spIHtcblx0XHR2YXIgX2J0biBcdD0galF1ZXJ5KFwiLnRvYXN0ci1ub3RpZnlcIik7XG5cblx0XHRpZihfYnRuLmxlbmd0aCA+IDAgfHwgX21lc3NhZ2UgIT0gZmFsc2UpIHtcblxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICd0b2FzdHIvdG9hc3RyLmpzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIHRvYXN0ci5jbGVhcigpO1xuXG5cdFx0XHRcdC8qKiBCVVRUT04gQ0xJQ0tcblx0XHRcdFx0ICoqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0XHRcdFx0X2J0bi5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXG5cdFx0XHRcdFx0dmFyIF9tZXNzYWdlIFx0XHRcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtbWVzc2FnZScpLFxuXHRcdFx0XHRcdFx0X25vdGlmeVR5cGUgXHRcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtbm90aWZ5VHlwZScpXHRcdFx0fHwgXCJkZWZhdWx0XCIsXG5cdFx0XHRcdFx0XHRfcG9zaXRpb25cdCBcdFx0PSBqUXVlcnkodGhpcykuYXR0cignZGF0YS1wb3NpdGlvbicpXHRcdFx0fHwgXCJ0b3AtcmlnaHRcIixcblx0XHRcdFx0XHRcdF9wcm9ncmVzc0JhciBcdFx0PSBqUXVlcnkodGhpcykuYXR0cignZGF0YS1wcm9ncmVzc0JhcicpIFx0XHQ9PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZSxcblx0XHRcdFx0XHRcdF9jbG9zZUJ1dHRvblx0XHQ9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWNsb3NlQnV0dG9uJykgXHRcdD09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0X2RlYnVnXHRcdCBcdFx0PSBqUXVlcnkodGhpcykuYXR0cignZGF0YS1kZWJ1ZycpIFx0XHRcdFx0PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRfbmV3ZXN0T25Ub3AgXHRcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtbmV3ZXN0T25Ub3AnKSBcdFx0PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRfcHJldmVudER1cGxpY2F0ZXNcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtcHJldmVudER1cGxpY2F0ZXMnKSBcdD09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0X3Nob3dEdXJhdGlvbiBcdFx0PSBqUXVlcnkodGhpcykuYXR0cignZGF0YS1zaG93RHVyYXRpb24nKSBcdFx0fHwgXCIzMDBcIixcblx0XHRcdFx0XHRcdF9oaWRlRHVyYXRpb24gXHRcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtaGlkZUR1cmF0aW9uJykgXHRcdHx8IFwiMTAwMFwiLFxuXHRcdFx0XHRcdFx0X3RpbWVPdXQgXHRcdFx0PSBqUXVlcnkodGhpcykuYXR0cignZGF0YS10aW1lT3V0JykgXHRcdFx0fHwgXCI1MDAwXCIsXG5cdFx0XHRcdFx0XHRfZXh0ZW5kZWRUaW1lT3V0XHQ9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWV4dGVuZGVkVGltZU91dCcpXHRcdHx8IFwiMTAwMFwiLFxuXHRcdFx0XHRcdFx0X3Nob3dFYXNpbmcgXHRcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtc2hvd0Vhc2luZycpIFx0XHRcdHx8IFwic3dpbmdcIixcblx0XHRcdFx0XHRcdF9oaWRlRWFzaW5nIFx0XHQ9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWhpZGVFYXNpbmcnKSBcdFx0XHR8fCBcImxpbmVhclwiLFxuXHRcdFx0XHRcdFx0X3Nob3dNZXRob2QgXHRcdD0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtc2hvd01ldGhvZCcpIFx0XHRcdHx8IFwiZmFkZUluXCIsXG5cdFx0XHRcdFx0XHRfaGlkZU1ldGhvZCBcdFx0PSBqUXVlcnkodGhpcykuYXR0cignZGF0YS1oaWRlTWV0aG9kJykgXHRcdFx0fHwgXCJmYWRlT3V0XCI7XG5cblx0XHRcdFx0XHRcdHRvYXN0ci5vcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRcImNsb3NlQnV0dG9uXCI6IFx0XHRcdF9jbG9zZUJ1dHRvbixcblx0XHRcdFx0XHRcdFx0XCJkZWJ1Z1wiOiBcdFx0XHRcdF9kZWJ1Zyxcblx0XHRcdFx0XHRcdFx0XCJuZXdlc3RPblRvcFwiOiBcdFx0XHRfbmV3ZXN0T25Ub3AsXG5cdFx0XHRcdFx0XHRcdFwicHJvZ3Jlc3NCYXJcIjogXHRcdFx0X3Byb2dyZXNzQmFyLFxuXHRcdFx0XHRcdFx0XHRcInBvc2l0aW9uQ2xhc3NcIjogXHRcdFwidG9hc3QtXCIgKyBfcG9zaXRpb24sXG5cdFx0XHRcdFx0XHRcdFwicHJldmVudER1cGxpY2F0ZXNcIjogXHRfcHJldmVudER1cGxpY2F0ZXMsXG5cdFx0XHRcdFx0XHRcdFwib25jbGlja1wiOiBcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdFwic2hvd0R1cmF0aW9uXCI6IFx0XHRfc2hvd0R1cmF0aW9uLFxuXHRcdFx0XHRcdFx0XHRcImhpZGVEdXJhdGlvblwiOiBcdFx0X2hpZGVEdXJhdGlvbixcblx0XHRcdFx0XHRcdFx0XCJ0aW1lT3V0XCI6IFx0XHRcdFx0X3RpbWVPdXQsXG5cdFx0XHRcdFx0XHRcdFwiZXh0ZW5kZWRUaW1lT3V0XCI6IFx0XHRfZXh0ZW5kZWRUaW1lT3V0LFxuXHRcdFx0XHRcdFx0XHRcInNob3dFYXNpbmdcIjogXHRcdFx0X3Nob3dFYXNpbmcsXG5cdFx0XHRcdFx0XHRcdFwiaGlkZUVhc2luZ1wiOiBcdFx0XHRfaGlkZUVhc2luZyxcblx0XHRcdFx0XHRcdFx0XCJzaG93TWV0aG9kXCI6IFx0XHRcdF9zaG93TWV0aG9kLFxuXHRcdFx0XHRcdFx0XHRcImhpZGVNZXRob2RcIjogXHRcdFx0X2hpZGVNZXRob2Rcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRvYXN0cltfbm90aWZ5VHlwZV0oX21lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdC8qKiBKQVZTQ1JJUFQgLyBPTiBMT0FEXG5cdFx0XHRcdCAqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdFx0XHRpZihfbWVzc2FnZSAhPSBmYWxzZSkge1xuXG5cdFx0XHRcdFx0aWYoX29uY2xpY2sgIT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdG9uY2xpY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gX29uY2xpY2s7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG9uY2xpY2sgPSBudWxsXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dG9hc3RyLm9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcImNsb3NlQnV0dG9uXCI6IFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRcImRlYnVnXCI6IFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRcIm5ld2VzdE9uVG9wXCI6IFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0XCJwcm9ncmVzc0JhclwiOiBcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0XCJwb3NpdGlvbkNsYXNzXCI6IFx0XHRcInRvYXN0LVwiICsgX3Bvc2l0aW9uLFxuXHRcdFx0XHRcdFx0XCJwcmV2ZW50RHVwbGljYXRlc1wiOiBcdGZhbHNlLFxuXHRcdFx0XHRcdFx0XCJvbmNsaWNrXCI6IFx0XHRcdFx0b25jbGljayxcblx0XHRcdFx0XHRcdFwic2hvd0R1cmF0aW9uXCI6IFx0XHRcIjMwMFwiLFxuXHRcdFx0XHRcdFx0XCJoaWRlRHVyYXRpb25cIjogXHRcdFwiMTAwMFwiLFxuXHRcdFx0XHRcdFx0XCJ0aW1lT3V0XCI6IFx0XHRcdFx0XCI1MDAwXCIsXG5cdFx0XHRcdFx0XHRcImV4dGVuZGVkVGltZU91dFwiOiBcdFx0XCIxMDAwXCIsXG5cdFx0XHRcdFx0XHRcInNob3dFYXNpbmdcIjogXHRcdFx0XCJzd2luZ1wiLFxuXHRcdFx0XHRcdFx0XCJoaWRlRWFzaW5nXCI6IFx0XHRcdFwibGluZWFyXCIsXG5cdFx0XHRcdFx0XHRcInNob3dNZXRob2RcIjogXHRcdFx0XCJmYWRlSW5cIixcblx0XHRcdFx0XHRcdFwiaGlkZU1ldGhvZFwiOiBcdFx0XHRcImZhZGVPdXRcIlxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHRvYXN0cltfbm90aWZ5VHlwZV0oX21lc3NhZ2UpO1xuXHRcdFx0XHRcdH0sIDE1MDApOyAvLyBkZWxheSAxLjVzXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFxuXHRcdH1cblxuXHR9XG5cblxuLyoqIENoYXJ0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX2NoYXJ0cygpIHtcblxuXHRcdC8qKiBFYXN5IFBpZSBDaGFydCBcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeShcIi5waWVjaGFydFwiKTtcblxuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2NoYXJ0LmVhc3lwaWVjaGFydC9kaXN0L2pxdWVyeS5lYXN5cGllY2hhcnQubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0alF1ZXJ5KFwiLnBpZWNoYXJ0XCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIF90ID0galF1ZXJ5KHRoaXMpLFxuXHRcdFx0XHRcdFx0X3NpemUgXHRcdD0gX3QuYXR0cignZGF0YS1zaXplJykgfHwgMTUwLFxuXHRcdFx0XHRcdFx0X2FuaW1hdGUgXHQ9IF90LmF0dHIoJ2RhdGEtYW5pbWF0ZScpIHx8IFwiMzAwMFwiO1xuXG5cdFx0XHRcdFx0X3QuZWFzeVBpZUNoYXJ0KHtcblx0XHRcdFx0XHRcdHNpemU6IFx0XHRcdF9zaXplLFxuXHRcdFx0XHRcdFx0YW5pbWF0ZTogXHRcdF9hbmltYXRlLFxuXHRcdFx0XHRcdFx0c2NhbGVDb2xvcjogXHRmYWxzZSxcblx0XHRcdFx0XHRcdHRyYWNrQ29sb3I6IFx0X3QuYXR0cignZGF0YS10cmFja2NvbG9yJykgfHwgJ3JnYmEoMCwwLDAsMC4wNCknLFxuXHRcdFx0XHRcdFx0bGluZVdpZHRoOiBcdFx0X3QuYXR0cignZGF0YS13aWR0aCcpIHx8ICcyJyxcblx0XHRcdFx0XHRcdGxpbmVDYXA6IFx0XHQnc3F1YXJlJyxcblx0XHRcdFx0XHRcdGJhckNvbG9yOiBcdFx0X3QuYXR0cignZGF0YS1jb2xvcicpIHx8ICcjMDA5M0JGJ1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0alF1ZXJ5KFwic3BhblwiLCB0aGlzKS5hdHRyKCdzdHlsZScsIFwibGluZS1oZWlnaHQ6XCIrX3NpemUrXCJweCAhaW1wb3J0YW50OyBoZWlnaHQ6XCIrX3NpemUrXCJweDsgd2lkdGg6XCIrX3NpemUrXCJweFwiKTtcblx0XHRcdFx0XHRqUXVlcnkoXCJpXCIsIHRoaXMpLmF0dHIoJ3N0eWxlJywgXCJsaW5lLWhlaWdodDpcIitfc2l6ZStcInB4ICFpbXBvcnRhbnQ7IGhlaWdodDpcIitfc2l6ZStcInB4OyB3aWR0aDpcIitfc2l6ZStcInB4XCIpO1xuXHRcdFx0XHRcdC8vIGpRdWVyeShcInNwYW5cIiwgdGhpcykuY3NzKHtcImxpbmUtaGVpZ2h0XCI6X3NpemUrXCJweFwiLCBcImhlaWdodFwiOl9zaXplK1wicHhcIiwgXCJ3aWR0aFwiOl9zaXplK1wicHhcIn0pO1xuXHRcdFx0XHRcdC8vIGpRdWVyeShcImlcIiwgdGhpcykuY3NzKHtcImxpbmUtaGVpZ2h0XCI6X3NpemUrXCJweFwiLCBcImhlaWdodFwiOl9zaXplK1wicHhcIiwgXCJ3aWR0aFwiOl9zaXplK1wicHhcIn0pO1xuXG5cdFx0XHRcdH0pO1xuXHRcdFxuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0XHRcblx0fVxuXG5cblxuLyoqIFNlbGVjdDJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfc2VsZWN0MigpIHtcblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnc2VsZWN0LnNlbGVjdDInKTtcblx0XHRcblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdzZWxlY3QyL2pzL3NlbGVjdDIuZnVsbC5taW4uanMnLCBmdW5jdGlvbigpIHtcblx0XHRcblx0XHRcdFx0aWYoalF1ZXJ5KCkuc2VsZWN0Mikge1xuXHRcdFx0XHRcdGpRdWVyeSgnc2VsZWN0LnNlbGVjdDInKS5zZWxlY3QyKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH1cblxuXG5cblxuLyoqIEZvcm0gW2Zvcm0gcGx1Z2luICsgdmFsaWRhdGlvbiBwbHVnaW5dXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX2Zvcm0oKSB7XG5cblxuXHRcdC8qKiBGb3JtIFZhbGlkYXRlIFxuXHRcdFx0TE9BRCBQTFVHSU4gT05MWSFcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdGlmKGpRdWVyeSgnZm9ybS52YWxpZGF0ZS1wbHVnaW4nKS5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnZm9ybS52YWxpZGF0ZS9qcXVlcnkuZm9ybS5taW4uanMnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdmb3JtLnZhbGlkYXRlL2pxdWVyeS52YWxpZGF0aW9uLm1pbi5qcycpO1xuXHRcdFx0fSk7XG5cblx0XHR9XG5cblxuXG5cdFx0LyoqIEZvcm0gVmFsaWRhdGVcblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdGlmKGpRdWVyeSgnZm9ybS52YWxpZGF0ZScpLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdmb3JtLnZhbGlkYXRlL2pxdWVyeS5mb3JtLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2Zvcm0udmFsaWRhdGUvanF1ZXJ5LnZhbGlkYXRpb24ubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZihqUXVlcnkoKS52YWxpZGF0ZSkge1xuXG5cdFx0XHRcdFx0XHRqUXVlcnkoJ2Zvcm0udmFsaWRhdGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHZhciBfdCBcdFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdFx0XHRfU21lc3NhZ2UgXHQ9IF90LmF0dHIoJ2RhdGEtc3VjY2VzcycpIFx0XHRcdHx8IFwiU3VjY2Vzc2Z1bGx5ISBUaGFuayB5b3UhXCIsXG5cdFx0XHRcdFx0XHRcdFx0X0NtZXNzYWdlIFx0PSBfdC5hdHRyKCdkYXRhLWNhcHRjaGEnKSBcdFx0XHR8fCBcIkludmFsaWQgQ2FwdGNoYSFcIixcblx0XHRcdFx0XHRcdFx0XHRfVHBvc2l0aW9uIFx0PSBfdC5hdHRyKCdkYXRhLXRvYXN0ci1wb3NpdGlvbicpIFx0fHwgXCJ0b3AtcmlnaHRcIixcblx0XHRcdFx0XHRcdFx0XHRfVHR5cGVcdCBcdD0gX3QuYXR0cignZGF0YS10b2FzdHItdHlwZScpIFx0XHR8fCBcInN1Y2Nlc3NcIjtcblx0XHRcdFx0XHRcdFx0XHRfVHVybFx0IFx0PSBfdC5hdHRyKCdkYXRhLXRvYXN0ci11cmwnKSBcdFx0fHwgZmFsc2U7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXBwZW5kICdpc19hamF4JyBoaWRkZW4gaW5wdXQgZmllbGQhXG5cdFx0XHRcdFx0XHRcdF90LmFwcGVuZCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaXNfYWpheFwiIHZhbHVlPVwidHJ1ZVwiIC8+Jyk7XG5cblx0XHRcdFx0XHRcdFx0X3QudmFsaWRhdGUoe1xuXHRcdFx0XHRcdFx0XHRcdHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uKGZvcm0pIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU2hvdyBzcGluIGljb25cblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShmb3JtKS5maW5kKCcuaW5wdXQtZ3JvdXAtYWRkb24nKS5maW5kKCcuZmEtZW52ZWxvcGUnKS5yZW1vdmVDbGFzcygnZmEtZW52ZWxvcGUnKS5hZGRDbGFzcygnZmEtcmVmcmVzaCBmYS1zcGluJyk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShmb3JtKS5hamF4U3VibWl0KHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQ6IFx0alF1ZXJ5KGZvcm0pLmZpbmQoJy52YWxpZGF0ZS1yZXN1bHQnKS5sZW5ndGggPiAwID8galF1ZXJ5KGZvcm0pLmZpbmQoJy52YWxpZGF0ZS1yZXN1bHQnKSA6ICcnLFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBcdFx0ZnVuY3Rpb24oZGF0YSkgeyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfdG9hc3RyKFwiU2VudCBGYWlsZWQhXCIsX1Rwb3NpdGlvbixcImVycm9yXCIsZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IFx0ZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBkYXRhID0gZGF0YS50cmltKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTTVRQIEVSUk9SXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoZGF0YSA9PSAnX2ZhaWxlZF8nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfdG9hc3RyKFwiU01UUCBFUlJPUiEgUGxlYXNlLCBjaGVjayB5b3VyIGNvbmZpZyBmaWxlIVwiLF9UcG9zaXRpb24sXCJlcnJvclwiLGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBDQVBUQ0hBIEVSUk9SXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZihkYXRhID09ICdfY2FwdGNoYV8nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfdG9hc3RyKFwiSW52YWxpZCBDYXB0Y2hhIVwiLF9UcG9zaXRpb24sXCJlcnJvclwiLGZhbHNlKTtcblxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU1VDQ0VTU1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFJlbW92ZSBzcGluIGljb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShmb3JtKS5maW5kKCcuaW5wdXQtZ3JvdXAtYWRkb24nKS5maW5kKCcuZmEtcmVmcmVzaCcpLnJlbW92ZUNsYXNzKCdmYS1yZWZyZXNoIGZhLXNwaW4nKS5hZGRDbGFzcygnZmEtZW52ZWxvcGUnKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2xlYXIgdGhlIGZvcm1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeShmb3JtKS5maW5kKCdpbnB1dC5mb3JtLWNvbnRyb2wnKS52YWwoJycpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBUb2FzdHIgTWVzc2FnZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3RvYXN0cihfU21lc3NhZ2UsX1Rwb3NpdGlvbixfVHR5cGUsX1R1cmwpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0fVxuXG5cblxuXG5cdFx0LyoqIE1hc2tlZCBJbnB1dFxuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkoJ2lucHV0Lm1hc2tlZCcpO1xuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2Zvcm0ubWFza2VkL2pxdWVyeS5tYXNrZWRpbnB1dC5qcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0X2NvbnRhaW5lci5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgX3QgXHRcdFx0XHQ9IGpRdWVyeSh0aGlzKTtcblx0XHRcdFx0XHRcdF9mb3JtYXQgXHRcdD0gX3QuYXR0cignZGF0YS1mb3JtYXQnKSBcdFx0fHwgJyg5OTkpIDk5OS05OTk5OTknLFxuXHRcdFx0XHRcdFx0X3BsYWNlaG9sZGVyIFx0PSBfdC5hdHRyKCdkYXRhLXBsYWNlaG9sZGVyJykgXHR8fCAnWCc7XG5cblx0XHRcdFx0XHRqUXVlcnkubWFzay5kZWZpbml0aW9uc1snZiddID0gXCJbQS1GYS1mMC05XVwiO1xuXHRcdFx0XHRcdF90Lm1hc2soX2Zvcm1hdCwge3BsYWNlaG9sZGVyOl9wbGFjZWhvbGRlcn0pO1xuXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdH0pO1xuXG5cdFx0fVxuXG5cdH1cblxuXG5cblxuXG4vKiogUGlja2Vyc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9waWNrZXJzKCkge1xuXG5cdFx0LyoqIERhdGUgUGlja2VyXG5cdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBkYXRlcGlja2VyXCIgZGF0YS1mb3JtYXQ9XCJ5eXl5LW1tLWRkXCIgZGF0YS1sYW5nPVwiZW5cIiBkYXRhLVJUTD1cImZhbHNlXCI+XG5cdFx0ICoqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0dmFyIF9jb250YWluZXJfMSA9IGpRdWVyeSgnLmRhdGVwaWNrZXInKTtcblx0XHRcblx0XHRpZihfY29udGFpbmVyXzEubGVuZ3RoID4gMCkge1xuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdib290c3RyYXAuZGF0ZXBpY2tlci9qcy9ib290c3RyYXAtZGF0ZXBpY2tlci5taW4uanMnLCBmdW5jdGlvbigpIHtcblx0XHRcblx0XHRcdFx0aWYoalF1ZXJ5KCkuZGF0ZXBpY2tlcikge1xuXG5cdFx0XHRcdFx0X2NvbnRhaW5lcl8xLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgX3QgXHRcdD0galF1ZXJ5KHRoaXMpLFxuXHRcdFx0XHRcdFx0XHRfbGFuZyBcdD1cdF90LmF0dHIoJ2RhdGEtbGFuZycpIHx8ICdlbic7XG5cblx0XHRcdFx0XHRcdGlmKF9sYW5nICE9ICdlbicgJiYgX2xhbmcgIT0gJycpIHsgLy8gbG9hZCBsYW5ndWFnZSBmaWxlXG5cdFx0XHRcdFx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnYm9vdHN0cmFwLmRhdGVwaWNrZXIvbG9jYWxlcy9ib290c3RyYXAtZGF0ZXBpY2tlci4nK19sYW5nKycubWluLmpzJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGpRdWVyeSh0aGlzKS5kYXRlcGlja2VyKHtcblx0XHRcdFx0XHRcdFx0Zm9ybWF0Olx0XHRcdF90LmF0dHIoJ2RhdGEtZm9ybWF0JykgXHRcdFx0fHwgJ3l5eXktbW0tZGQnLCBcblx0XHRcdFx0XHRcdFx0bGFuZ3VhZ2U6IFx0XHRfbGFuZyxcblx0XHRcdFx0XHRcdFx0cnRsOiBcdFx0XHRfdC5hdHRyKCdkYXRhLVJUTCcpIFx0XHRcdD09IFwidHJ1ZVwiICA/IHRydWUgIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGNoYW5nZU1vbnRoOiBcdF90LmF0dHIoJ2RhdGEtY2hhbmdlTW9udGgnKSBcdD09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dG9kYXlCdG46IFx0XHRfdC5hdHRyKCdkYXRhLXRvZGF5QnRuJykgXHRcdD09IFwiZmFsc2VcIiA/IGZhbHNlIDogXCJsaW5rZWRcIixcblx0XHRcdFx0XHRcdFx0Y2FsZW5kYXJXZWVrczogXHRfdC5hdHRyKCdkYXRhLWNhbGVuZGFyV2Vla3MnKSBcdD09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0YXV0b2Nsb3NlOiBcdFx0X3QuYXR0cignZGF0YS1hdXRvY2xvc2UnKSBcdFx0PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR0b2RheUhpZ2hsaWdodDogX3QuYXR0cignZGF0YS10b2RheUhpZ2hsaWdodCcpIFx0PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlLFxuXG5cdFx0XHRcdFx0XHRcdG9uUmVuZGVyOiBmdW5jdGlvbihkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gcmV0dXJuIGRhdGUudmFsdWVPZigpIDwgbm93RGF0ZS52YWx1ZU9mKCkgPyAnZGlzYWJsZWQnIDogJyc7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZXYpIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBSkFYIFBPU1QgLSBPUFRJT05BTFxuXG5cdFx0XHRcdFx0XHR9KS5kYXRhKCdkYXRlcGlja2VyJyk7IFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cblxuXHRcdC8qKiBSYW5nZSBQaWNrZXJcblx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHJhbmdlcGlja2VyXCIgdmFsdWU9XCIyMDE1LTAxLTAxIC0gMjAxNi0xMi0zMVwiIGRhdGEtZm9ybWF0PVwieXl5eS1tbS1kZFwiIGRhdGEtZnJvbT1cIjIwMTUtMDEtMDFcIiBkYXRhLXRvPVwiMjAxNi0xMi0zMVwiPlxuXHRcdCAqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdHZhciBfY29udGFpbmVyXzIgPSBqUXVlcnkoJy5yYW5nZXBpY2tlcicpO1xuXHRcdFxuXHRcdGlmKF9jb250YWluZXJfMi5sZW5ndGggPiAwKSB7XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2Jvb3RzdHJhcC5kYXRlcmFuZ2VwaWNrZXIvbW9tZW50Lm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2Jvb3RzdHJhcC5kYXRlcmFuZ2VwaWNrZXIvZGF0ZXJhbmdlcGlja2VyLmpzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcblx0XHRcdFx0XHRpZihqUXVlcnkoKS5kYXRlcGlja2VyKSB7XG5cblx0XHRcdFx0XHRcdF9jb250YWluZXJfMi5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHZhciBfdCBcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0XHRcdFx0X2Zvcm1hdCA9IF90LmF0dHIoJ2RhdGEtZm9ybWF0JykudG9VcHBlckNhc2UoKSB8fCAnWVlZWS1NTS1ERCc7XG5cblx0XHRcdFx0XHRcdFx0X3QuZGF0ZXJhbmdlcGlja2VyKFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0OiBcdFx0X2Zvcm1hdCxcblx0XHRcdFx0XHRcdFx0XHRzdGFydERhdGU6IFx0XHRfdC5hdHRyKCdkYXRhLWZyb20nKSxcblx0XHRcdFx0XHRcdFx0XHRlbmREYXRlOiBcdFx0X3QuYXR0cignZGF0YS10bycpLFxuXG5cdFx0XHRcdFx0XHRcdFx0cmFuZ2VzOiB7XG5cdFx0XHRcdFx0XHRcdFx0ICAgJ1RvZGF5JzogW21vbWVudCgpLCBtb21lbnQoKV0sXG5cdFx0XHRcdFx0XHRcdFx0ICAgJ1llc3RlcmRheSc6IFttb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpXSxcblx0XHRcdFx0XHRcdFx0XHQgICAnTGFzdCA3IERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoNiwgJ2RheXMnKSwgbW9tZW50KCldLFxuXHRcdFx0XHRcdFx0XHRcdCAgICdMYXN0IDMwIERheXMnOiBbbW9tZW50KCkuc3VidHJhY3QoMjksICdkYXlzJyksIG1vbWVudCgpXSxcblx0XHRcdFx0XHRcdFx0XHQgICAnVGhpcyBNb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5lbmRPZignbW9udGgnKV0sXG5cdFx0XHRcdFx0XHRcdFx0ICAgJ0xhc3QgTW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuZW5kT2YoJ21vbnRoJyldXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LCBcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oc3RhcnQsIGVuZCwgbGFiZWwpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBhbGVydChcIkEgbmV3IGRhdGUgcmFuZ2Ugd2FzIGNob3NlbjogXCIgKyBzdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgdG8gJyArIGVuZC5mb3JtYXQoJ1lZWVktTU0tREQnKSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cblx0XHQvKiogVGltZSBQaWNrZXJcblx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHRpbWVwaWNrZXJcIiB2YWx1ZT1cIjExIDogNTUgOiBQTVwiPlxuXHRcdCAqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdHZhciBfY29udGFpbmVyXzMgPSBqUXVlcnkoJy50aW1lcGlja2VyJyk7XG5cdFx0XG5cdFx0aWYoX2NvbnRhaW5lcl8zLmxlbmd0aCA+IDApIHtcblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAndGltZXBpY2tpL3RpbWVwaWNraS5taW4uanMnLCBmdW5jdGlvbigpIHtcblx0XHRcdFxuXHRcdFx0XHRpZihqUXVlcnkoKS50aW1lcGlja2kpIHtcblxuXHRcdFx0XHRcdF9jb250YWluZXJfMy50aW1lcGlja2koKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXG5cdFx0LyoqIENvbG9yIFBpY2tlclxuXHRcdCAqKioqKioqKioqKioqKioqKioqICoqL1xuXHRcdHZhciBfY29udGFpbmVyXzQgPSBqUXVlcnkoJy5jb2xvcnBpY2tlcicpO1xuXHRcdFxuXHRcdGlmKF9jb250YWluZXJfNC5sZW5ndGggPiAwKSB7XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ3NwZWN0cnVtL3NwZWN0cnVtLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XG5cdFx0XHRcdGlmKGpRdWVyeSgpLnNwZWN0cnVtKSB7XG5cblx0XHRcdFx0XHRfY29udGFpbmVyXzQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBfdCBcdFx0XHRcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0XHRcdF9wcmVmZXJyZWRGb3JtYXQgXHQ9IF90LmF0dHIoJ2RhdGEtZm9ybWF0JykgXHRcdHx8IFwiaGV4XCIsIC8vIGhleCwgaGV4MywgaHNsLCByZ2IsIG5hbWVcblx0XHRcdFx0XHRcdFx0X3BhbGxldHRlT25seVx0XHQ9IF90LmF0dHIoJ2RhdGEtcGFsbGV0dGVPbmx5JykgXHR8fCBcImZhbHNlXCIsXG5cdFx0XHRcdFx0XHRcdF9mdWxsUGlja2VyXHRcdFx0PSBfdC5hdHRyKCdkYXRhLWZ1bGxwaWNrZXInKSBcdHx8IFwiZmFsc2VcIixcblx0XHRcdFx0XHRcdFx0X2FsbG93RW1wdHlcdFx0XHQ9IF90LmF0dHIoJ2RhdGEtYWxsb3dFbXB0eScpIFx0fHwgZmFsc2U7XG5cdFx0XHRcdFx0XHRcdF9mbGF0XHRcdFx0XHQ9IF90LmF0dHIoJ2RhdGEtZmxhdCcpIFx0XHRcdHx8IGZhbHNlO1xuXG5cdFx0XHRcdFx0XHRcdGlmKF9wYWxsZXR0ZU9ubHkgPT0gXCJ0cnVlXCIgfHwgX2Z1bGxQaWNrZXIgPT0gXCJ0cnVlXCIpIHtcblxuXHRcdFx0XHRcdFx0XHRcdHZhciBfcGFsZXR0ZSA9IFtcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiIzAwMFwiLFwiIzQ0NFwiLFwiIzY2NlwiLFwiIzk5OVwiLFwiI2NjY1wiLFwiI2VlZVwiLFwiI2YzZjNmM1wiLFwiI2ZmZlwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiI2YwMFwiLFwiI2Y5MFwiLFwiI2ZmMFwiLFwiIzBmMFwiLFwiIzBmZlwiLFwiIzAwZlwiLFwiIzkwZlwiLFwiI2YwZlwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiI2Y0Y2NjY1wiLFwiI2ZjZTVjZFwiLFwiI2ZmZjJjY1wiLFwiI2Q5ZWFkM1wiLFwiI2QwZTBlM1wiLFwiI2NmZTJmM1wiLFwiI2Q5ZDJlOVwiLFwiI2VhZDFkY1wiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiI2VhOTk5OVwiLFwiI2Y5Y2I5Y1wiLFwiI2ZmZTU5OVwiLFwiI2I2ZDdhOFwiLFwiI2EyYzRjOVwiLFwiIzlmYzVlOFwiLFwiI2I0YTdkNlwiLFwiI2Q1YTZiZFwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiI2UwNjY2NlwiLFwiI2Y2YjI2YlwiLFwiI2ZmZDk2NlwiLFwiIzkzYzQ3ZFwiLFwiIzc2YTVhZlwiLFwiIzZmYThkY1wiLFwiIzhlN2NjM1wiLFwiI2MyN2JhMFwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiI2MwMFwiLFwiI2U2OTEzOFwiLFwiI2YxYzIzMlwiLFwiIzZhYTg0ZlwiLFwiIzQ1ODE4ZVwiLFwiIzNkODVjNlwiLFwiIzY3NGVhN1wiLFwiI2E2NGQ3OVwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiIzkwMFwiLFwiI2I0NWYwNlwiLFwiI2JmOTAwMFwiLFwiIzM4NzYxZFwiLFwiIzEzNGY1Y1wiLFwiIzBiNTM5NFwiLFwiIzM1MWM3NVwiLFwiIzc0MWI0N1wiXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0W1wiIzYwMFwiLFwiIzc4M2YwNFwiLFwiIzdmNjAwMFwiLFwiIzI3NGUxM1wiLFwiIzBjMzQzZFwiLFwiIzA3Mzc2M1wiLFwiIzIwMTI0ZFwiLFwiIzRjMTEzMFwiXVxuXHRcdFx0XHRcdFx0XHRcdFx0XTtcblx0XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X3BhbGV0dGUgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYoX3QuYXR0cignZGF0YS1kZWZhdWx0Q29sb3InKSkge1xuXHRcdFx0XHRcdFx0XHRcdF9jb2xvciA9IF90LmF0dHIoJ2RhdGEtZGVmYXVsdENvbG9yJyk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2NvbG9yID0gXCIjZmYwMDAwXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdGlmKCFfdC5hdHRyKCdkYXRhLWRlZmF1bHRDb2xvcicpICYmIF9hbGxvd0VtcHR5ID09IFwidHJ1ZVwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0X2NvbG9yID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRfdC5zcGVjdHJ1bSh7XG5cdFx0XHRcdFx0XHRcdHNob3dQYWxldHRlT25seTogXHRfcGFsbGV0dGVPbmx5ID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHR0b2dnbGVQYWxldHRlT25seTogXHRfcGFsbGV0dGVPbmx5ID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlLFxuXG5cdFx0XHRcdFx0XHRcdGZsYXQ6XHRcdFx0XHRfZmxhdCBcdFx0PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHNob3dJbml0aWFsOiBcdFx0X2FsbG93RW1wdHkgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHNob3dJbnB1dDogXHRcdFx0X2FsbG93RW1wdHkgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGFsbG93RW1wdHk6XHRcdFx0X2FsbG93RW1wdHkgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cblx0XHRcdFx0XHRcdFx0Y2hvb3NlVGV4dDogXHRcdF90LmF0dHIoJ2RhdGEtY2hvb3NlVGV4dCcpIHx8IFwiQ29vc2VcIixcblx0XHRcdFx0XHRcdFx0Y2FuY2VsVGV4dDogXHRcdF90LmF0dHIoJ2RhdGEtY2FuY2VsVGV4dCcpIHx8IFwiQ2FuY2VsXCIsXG5cblx0XHRcdFx0XHRcdFx0Y29sb3I6IFx0XHRcdFx0X2NvbG9yLFxuXHRcdFx0XHRcdFx0XHRzaG93SW5wdXQ6XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRcdFx0c2hvd1BhbGV0dGU6IFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0XHRwcmVmZXJyZWRGb3JtYXQ6IFx0X3ByZWZlcnJlZEZvcm1hdCxcblx0XHRcdFx0XHRcdFx0c2hvd0FscGhhOiBcdFx0XHRfcHJlZmVycmVkRm9ybWF0ID09IFwicmdiXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHBhbGV0dGU6IFx0XHRcdF9wYWxldHRlXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9XG5cblxuXG5cblxuLyoqIEVkaXRvcnNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfZWRpdG9ycygpIHtcblxuXHRcdC8qKiBTdW1tZXJub3RlIEhUTUwgRWRpdG9yXG5cdFx0XHQ8dGV4dGFyZWEgY2xhc3M9XCJzdW1tZXJub3RlIGZvcm0tY29udHJvbFwiIGRhdGEtaGVpZ2h0PVwiMjAwXCI+PC90ZXh0YXJlYT5cblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0dmFyIF9jb250YWluZXJfMSA9IGpRdWVyeSgndGV4dGFyZWEuc3VtbWVybm90ZScpO1xuXHRcdFxuXHRcdGlmKF9jb250YWluZXJfMS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnZWRpdG9yLnN1bW1lcm5vdGUvc3VtbWVybm90ZS5taW4uanMnLCBmdW5jdGlvbigpIHtcblx0XHRcblx0XHRcdFx0aWYoalF1ZXJ5KCkuc3VtbWVybm90ZSkge1xuXG5cdFx0XHRcdFx0X2NvbnRhaW5lcl8xLmVhY2goZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdHZhciBfbGFuZyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWxhbmcnKSB8fCAnZW4tVVMnO1xuXG5cdFx0XHRcdFx0XHRpZihfbGFuZyAhPSAnZW4tVVMnKSB7IC8vIExhbmd1YWdlIVxuXHRcdFx0XHRcdFx0YWxlcnQoX2xhbmcpO1xuXHRcdFx0XHRcdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2VkaXRvci5zdW1tZXJub3RlL2xhbmcvc3VtbWVybm90ZS0nK19sYW5nKycuanMnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0alF1ZXJ5KHRoaXMpLnN1bW1lcm5vdGUoe1xuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWhlaWdodCcpIHx8IDIwMCxcblx0XHRcdFx0XHRcdFx0bGFuZzogXHRqUXVlcnkodGhpcykuYXR0cignZGF0YS1sYW5nJykgfHwgJ2VuLVVTJywgLy8gZGVmYXVsdDogJ2VuLVVTJ1xuXHRcdFx0XHRcdFx0XHR0b29sYmFyOiBbXG5cdFx0XHRcdFx0XHRcdC8qXHRbZ3JvdXBuYW1lLCBcdFtidXR0b24gbGlzdF1dXHQqL1xuXHRcdFx0XHRcdFx0XHRcdFsnc3R5bGUnLCBcdFx0WydzdHlsZSddXSxcblx0XHRcdFx0XHRcdFx0XHRbJ2ZvbnRzaXplJywgXHRbJ2ZvbnRzaXplJ11dLFxuXHRcdFx0XHRcdFx0XHRcdFsnc3R5bGUnLCBcdFx0Wydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCdzdHJpa2V0aHJvdWdoJywgJ2NsZWFyJ11dLFxuXHRcdFx0XHRcdFx0XHRcdFsnY29sb3InLCBcdFx0Wydjb2xvciddXSxcblx0XHRcdFx0XHRcdFx0XHRbJ3BhcmEnLCBcdFx0Wyd1bCcsICdvbCcsICdwYXJhZ3JhcGgnXV0sXG5cdFx0XHRcdFx0XHRcdFx0Wyd0YWJsZScsIFx0XHRbJ3RhYmxlJ11dLFxuXHRcdFx0XHRcdFx0XHRcdFsnbWVkaWEnLCBcdFx0WydsaW5rJywgJ3BpY3R1cmUnLCAndmlkZW8nXV0sXG5cdFx0XHRcdFx0XHRcdFx0WydtaXNjJywgXHRcdFsnY29kZXZpZXcnLCAnZnVsbHNjcmVlbicsICdoZWxwJ11dXG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cblxuXG5cdFx0LyoqIE1hcmtkb3duIEhUTUwgRWRpdG9yXG5cdFx0XHQ8dGV4dGFyZWEgY2xhc3M9XCJtYXJrZG93blwiIGRhdGEtaGVpZ2h0PVwiMzAwXCIgbmFtZT1cImNvbnRlbnRcIiBkYXRhLXByb3ZpZGU9XCJtYXJrZG93blwiIGRhdGEtbGFuZz1cImVuXCIgcm93cz1cIjEwXCI+PC90ZXh0YXJlYT5cblx0XHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0dmFyIF9jb250YWluZXJfMiA9IGpRdWVyeSgndGV4dGFyZWEubWFya2Rvd24nKTtcblx0XHRcblx0XHRpZihfY29udGFpbmVyXzIubGVuZ3RoID4gMCkge1xuXHRcdFx0XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2VkaXRvci5tYXJrZG93bi9qcy9ib290c3RyYXAtbWFya2Rvd24ubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0XHRcdGlmKGpRdWVyeSgpLm1hcmtkb3duKSB7XG5cblx0XHRcdFx0XHRfY29udGFpbmVyXzIuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBfdCA9IGpRdWVyeSh0aGlzKTtcblxuXHRcdFx0XHRcdFx0dmFyIF9sYW5nID0gX3QuYXR0cignZGF0YS1sYW5nJykgfHwgJ2VuJztcblxuXHRcdFx0XHRcdFx0aWYoX2xhbmcgIT0gJ2VuJykgeyAvLyBMYW5ndWFnZSFcblx0XHRcdFx0XHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdlZGl0b3IubWFya2Rvd24vbG9jYWxlL2Jvb3RzdHJhcC1tYXJrZG93bi4nK19sYW5nKycuanMnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0alF1ZXJ5KHRoaXMpLm1hcmtkb3duKHtcblx0XHRcdFx0XHRcdFx0YXV0b2ZvY3VzOlx0XHRfdC5hdHRyKCdkYXRhLWF1dG9mb2N1cycpIFx0PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdHNhdmFibGU6XHRcdF90LmF0dHIoJ2RhdGEtc2F2YWJsZScpIFx0PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGhlaWdodDpcdFx0XHRfdC5hdHRyKCdkYXRhLWhlaWdodCcpIFx0XHR8fCAnaW5oZXJpdCcsXG5cdFx0XHRcdFx0XHRcdGxhbmd1YWdlOlx0XHRfbGFuZyA9PSAnZW4nID8gbnVsbCA6IF9sYW5nXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdH1cblxuXHR9XG5cblxuXG5cblxuXG4vKiogUGFqaW5hdGUgW2pRdWVyeSBQYWdpbmF0aW9uXVxuXHRVU0FHRVxuXHRcblx0PGRpdiBjbGFzcz1cInBhamluYXRlXCIgZGF0YS1wYWppbmFudGUtaXRlbXMtcGVyLXBhZ2U9XCI4XCIgZGF0YS1wYWppbmF0ZS1jb250YWluZXI9XCIucGFqaW5hdGUtY29udGFpbmVyXCI+XG5cdFxuXHRcdDxkaXYgY2xhc3M9XCJwYWppbmF0ZS1jb250YWluZXJcIj5cblx0XHRcblx0XHRcdDxkaXY+aXRlbTE8L2Rpdj5cblx0XHRcdDxkaXY+aXRlbTI8L2Rpdj5cblx0XHRcdDxkaXY+aXRlbTM8L2Rpdj5cblx0XHRcdC4uLi4uXG5cblx0XHQ8L2Rpdj5cblxuXHRcdDxkaXYgY2xhc3M9XCJwYWppbmF0ZS1uYXZcIj5cblx0XHRcdDx1bCBjbGFzcz1cInBhZ2luYXRpb25cIj48IS0tIHBhZ2VzIGFkZGVkIGJ5IHBhamluYXRlIHBsdWdpbiAtLT48L3VsPlxuXHRcdDwvZGl2PlxuXG5cdDwvZGl2PlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9wYWppbmF0ZSgpIHtcblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnZGl2LnBhamluYXRlJyk7XG5cblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICdwYWppbmF0ZS9qcXVlcnkucGFqaW5hdGUuYm9vdHN0cmFwLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XG5cdFx0XHRcdGlmKGpRdWVyeSgpLnBhamluYXRlKSB7XG5cblx0XHRcdFx0XHRfY29udGFpbmVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgX3QgXHRcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0XHRcdF9wZXJQYWdlIFx0PSBfdC5hdHRyKCdkYXRhLXBhamluYW50ZS1pdGVtcy1wZXItcGFnZScpIFx0fHwgODtcblx0XHRcdFx0XHRcdFx0X251bUxpbmtzIFx0PSBfdC5hdHRyKCdkYXRhLXBhamluYW50ZS1udW0tbGlua3MnKSBcdFx0fHwgNTtcblxuXHRcdFx0XHRcdFx0X3QucGFqaW5hdGUoe1xuXHRcdFx0XHRcdFx0XHRpdGVtc19wZXJfcGFnZSBcdFx0XHRcdDogcGFyc2VJbnQoX3BlclBhZ2UpLFxuXHRcdFx0XHRcdFx0XHRudW1fcGFnZV9saW5rc190b19kaXNwbGF5XHQ6IHBhcnNlSW50KF9udW1MaW5rcyksXG5cdFx0XHRcdFx0XHRcdGl0ZW1fY29udGFpbmVyX2lkIFx0XHRcdDogX3QuYXR0cignZGF0YS1wYWppbmF0ZS1jb250YWluZXInKSB8fCAnLnBhamluYXRlLWNvbnRhaW5lcicsXG5cdFx0XHRcdFx0XHRcdG5hdl9wYW5lbF9pZCBcdFx0XHRcdDogJy5wYWppbmF0ZS1uYXYgdWwnLFxuXHRcdFx0XHRcdFx0XHRzaG93X2ZpcnN0X2xhc3QgXHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0d3JhcF9hcm91bmRcdFx0XHRcdFx0OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRhYm9ydF9vbl9zbWFsbF9saXN0cyBcdFx0OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRzdGFydF9wYWdlIFx0XHRcdFx0XHQ6IDAsXG5cdFx0XHRcdFx0XHRcdG5hdl9sYWJlbF9wcmV2IFx0XHRcdFx0OiAnJmxhcXVvOycsXG5cdFx0XHRcdFx0XHRcdG5hdl9sYWJlbF9uZXh0IFx0XHRcdFx0OiAnJnJhcXVvOydcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFxuXHRcdFx0fSk7XG5cdFx0XG5cdFx0fVxuXG5cdH1cblxuXG5cblxuXG4vKiogSW5maW5pbnRlIFNjcm9sbFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9pbmZpbml0ZVNjcm9sbCgpIHtcblx0XHR2YXIgX2NvbnRhaW5lciBcdD0galF1ZXJ5KFwiLmluZmluaXRlLXNjcm9sbFwiKTtcblxuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2luZmluaXRlLXNjcm9sbC9qcXVlcnkuaW5maW5pdGVzY3JvbGwubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRfbmF2U2VsZWN0b3JcdD0gX2NvbnRhaW5lci5hdHRyKCdkYXRhLW5leHRTZWxlY3RvcicpIHx8IFwiI2luZi1sb2FkLW5leFwiLFxuXHRcdFx0XHRcdF9pdGVtU2VsZWN0b3JcdD0gX2NvbnRhaW5lci5hdHRyKCdkYXRhLWl0ZW1TZWxlY3RvcicpIHx8IFwiLml0ZW1cIixcblx0XHRcdFx0XHRfbmV4dFNlbGVjdG9yXHQ9IF9uYXZTZWxlY3RvciArIFwiIGFcIjtcblxuXHRcdFx0XHRfY29udGFpbmVyLmluZmluaXRlc2Nyb2xsKHtcblx0XHRcdFx0XHRsb2FkaW5nOiB7XG5cdFx0XHRcdFx0XHRmaW5pc2hlZE1zZ1x0OiAnPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvaT4nLFxuXHRcdFx0XHRcdFx0bXNnVGV4dFx0XHQ6ICc8aSBjbGFzcz1cImZhIGZhLXJlZnJlc2ggZmEtc3BpblwiPjwvaT4nLFxuXHRcdFx0XHRcdFx0aW1nXHRcdFx0OiBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEdBQVlBUFVBQUJRU0ZDd3VMQndhSEF3S0RLeXVyR3hxYk56ZTNDd3FMQ1FtSkxTMnRPenU3T1RpNUp5ZW5Cd2VIQlFXRkp5YW5QeisvSFJ5ZExTeXRGeGVYUHo2L0V4T1RLU21wRlJTVkhSMmRBd09EQVFDQk96cTdQVHk5SVNDaFBUMjlJeUtqSXlPaklTR2hPVG01R1JpWkpTV2xKU1NsRlJXVk1UQ3hOemEzRXhLVE5UUzFLeXFySHg2ZkdSbVpLU2lwTXpPek1UR3hEUXlORHcrUEFRR0JEUTJORVJDUkZ4YVhNekt6R3h1YkR3NlBDUWlKTHkrdkVSR1JMeTZ2SHgrZk5UVzFDSC9DMDVGVkZORFFWQkZNaTR3QXdFQUFBQWgrUVFKQlFBQUFDd0FBQUFBR0FBWUFFQUdxRUNBY0Fob1JBaW9qUUpGaUFpSTBLaDBxT3NaT2hxaERNSzlaYWRnQUkwV0JtaEFYQWhGVm01SGJaUjBhVFlkc0ZwU2t3cWpvNXNSTEF0cElqeHVVelpwRUNtR2pJMVFBNEpjS0g1bEdWSUNESEZwR3lvcUd4NHVEV0VORmg0aUtqY2JpUjRNVDFJdExKU1BKV2tVTm85dUF5aHBCcGFPR2pkcE9ZN0V4Y1lhSVFzOU9zVXBpYmZFTlpvUUlGOWdZMUVwcWx3aUxBaCtNNEFxSm1VQ09CSkpHejhFT0tKUlFRQWgrUVFKQlFBQkFDd0FBQUFBR0FBWUFBQUdwOENBY0Job1JCSUxEZ2RGS0FpSTBLSEFCNXJVWkJVV0RBTHhNSjVSNFNDbWlXcG9KNjdpRW00VFp4MHVwT0N1QjFqeWlyMnR1WEUzRG50aEUzSWxnbEVOY2h3RGgwUURHM0lUalVRN2NpR1RReEZ5YkpnQkdrY1lHaG9ZUGFHZEFSZHlPS2NoY2p1bmhIOHpuUUFjY21DWUpaR25EcEFRTjJXZEZYSStwd0VGY2gyem5SZStNRFRCYnpHTWJRSVBIbHd3TEJjeU5TTWdMSUYyQWkwV0tBb2NCaEk0dUVSQkFDSDVCQWtGQUN3QUxBQUFBQUFZQUJnQUFBYW9RSlp3eU5JRUppQUpDcFdJQ0lqUUtGR0Q2R3c4RDRkMEMzVVFJSnNLZDF3c1FTZ0ZNbGRqZ1VBdTZxMWpBMjdFcFJnMzR4NUZVQ0FlVDN4REF4NXVCUUFNSnlaOEdSeHVGaVJ1RkFGM0IyNFFLZ3VZRTNjcG1BdWJiaWwzSTVnR0twZ0lkd0YvRUE5dGdBTjhKaWNNR1FWdUhMT0RRZ0tHRUt1OVFneHVHTU5DRFFwZ0FNZ3NGMzhyR3M0RmZ4L1R5QlVpRUN0YXlBSVBIZ29oQWRpOURSRktUQ0FqNVZKQkFDSDVCQWtGQUFBQUxBQUFBQUFZQUJnQUFBYTBRSUJ3U0FRTWFwaEhvVkZzT29lemxzRWxlRnFKRHNubWN1MXFMSkJXOXpwUVVTcGpxd3l5Y1FnUEJBSWlMWVJCR0lETUFnSlJhZWdSRUI0Q0Uzd1FGQU4wTkh3UllId3dkQUFOZkJJcWhseDBBWHdHQ254K2tRVjhDcDBRQlpFYUwzd2JCbndCa1JlR0tnbDhUR2thZG53dWdSQTBkQmtVaGhNTkhoQVJkQnFXRUFzWkFBd1FrSFFJRWdRSFFnSWJGREtSVFJVVUw0bmJSQzBRRmpQaFJCY2JFbTduUWcwdUJpM2c3UTBSRHhFeXpGZEJBQ0g1QkFrRkFBZ0FMQUFBQUFBWUFCZ0FBQWF4UUlSd1NDd0tITVdrc3NnTENaYlFZbU5uVWdwTWg2Z1FvSW9VWlFxSWg2WkZIRGpWN1FMQ0xwVVJJY1VUQVdLenZXVUJoWUZ3Y093bkEyOElPeDRDQlhZM0FJTUlKUkFGRW13b1NJd1lFQVFHYkRXTVFpd1FCaDRRS3B4Q2poeWhicVFxRUJ5WkxLUTFiQWFScjR3T0tHd1NpS2x2QURkMkJRSWVKNE1ESjNZY1NBOFVsRnFXZGlCQ0Fnb2hieVIyQzR0Q0pod0JaVFFVRUFvNVJRVXF6VkFISnVoREpqc05wRkloS2ZGRzdGRkJBQ0g1QkFrRkFBQUFMQUFBQVFBWUFCWUFBQWEzUUlCUW1FbmxOTU9rY2dtb0dTQ1FFSk5JWTA0OFVJaGhLcVMxbENsS0Z0TGpDbG1tb1dBenZ1bk1nSm1xSVdSa0RUWWtISUJ4QVJwaUVDVURlME1JSGcwUlVDVjZoUUFhR3hFU0VBc3pqa2t2RWs4c2wwa3FLZ29RQ0oxQ0dpSUtDaHVObHdjUUNpZ3ZwR2NRS0JLeHBBTUxFQkk0SXBhWEdpVlFPRG9lYjQ0RHdoQVVBZ0F1R0lVYUV5aFpERUlOS3I5Y0NEZGpHODFDSnB4bU8yTVVQRW9qVlZ5NlVCUTJUREdFVXlGUUN6S3lqems4ODBOQkFDSDVCQWtGQUFFQUxBQUFBQUFZQUJnQUFBYXp3SUJ3R0FCTU9oY05jY2tVT2tvS2lKVFZyQVlxRzZrMllXWGlLRnB0cEVzMGdiV2JYbUZtSFF3Yldjak5KbENTWXdJaFE5cXhrNFVhVkFJZUVCMS9UQ0FOQlJBbmZvZENFeEVFRURTUFN6VUpLQ2VXU3pRR0hCaWNSQlVjSGltaVF5d0tDNVdvR2pBb0NUS29BVFFVQkJFVHFETW5FQVVOSDZnaEVCUU9BVDZPWkJvK1VneENBakYvTXcwVE4xSUtlVUp1VlRNRlBTSmhFQmVQR09IRUJaWUo0U0k4bkN4YUhCL0duQm9YSVNZQVRVRUFJZmtFQ1FVQUtnQXNBQUFBQUJnQUdBQUFCcXBBbFhDb0VyUXNyNFdCbENFNm5RMlhCMEt0dXA1WWs2TEtoWnl3emdLbHlwbFNLUmZ3c0VMZFlBNkREQ0kxT2FpRmdnMkVBTGlySHhBZkduNWdEUjRyZzRSUEdoRWJEb3BZQVFrZGtGZ2pCbmFWVGlFb2lacERDUW1mUkJvb0lLTkRCd1lqcUVJZENRR3REZ29GbnBvYUVoNE5xQm9nRUErb0Rpc1FqbjR4RXhVSUFBTUlMQ0lRRkJWK0ptTlVIaDdWRUFXRU1GMVZDbW1FTHQ0VURBS1FHU1VvQ3k4V0krZFBRUUFoK1FRSkJRQUpBQ3dBQUFBQUdBQVlBQUFHck1DRWNKaG9SQ1FveFVibG1tU0kwS0dBNFlGWXI5YkZJVXFzYkxCZ0s0RXJMRkFvc0VpdUVTaThzQkt5aWZLcVJUV1hrK2VsNHpZVUxnTmtRaGthWkJZU2hvT0xPaWdBaTVBUkU1Q1FEek9VaXhHWWkzYWJYQU5QbmxFNW9seWFwVVF6RDZoRUxhZXNEZ1lOckFrekVpNWtNd09LbnhZYnMxRUlLaDR3RjVkUU5Tb1FGMlFTV0M4RkFUbzBHRGNVSGkyREJHRmdHeW1MQnd2Y0VCUVBEcFFaTmk0cUd4c29FamdDWEVFQUlma0VCUVVBQ0FBc0FBQUFBQmdBR0FBQUJxWkFoSENJRUJRSUJnL0hJQ2s0aU5DaDRPR0JXSzlXVGdrUUhab1VsRk1Kd3lLcHNKQ0ZyQnZoaEo3UUdncXJnQTl0cjBCWDZIaGhUVVFOTzNaN0FEQldGQWRFSVFKN1VBTVJKVFJFQWp5T2wwTU5tSnVjblo2Zm9LR2lvNlNkbXFRcGhEbGpBNXdDSVVRQlZSQXdYSmNBTzZkQ0psZzN0bDBCUHhkUUFncFlLRFZSQWg4Y09GMDVDMmcvSlN3K0pUQWVDc09GSlJ4b1Z4NFBqWmdPUnlnY0hDZ0VUbDFCQURzPVwiLFxuXHRcdFx0XHRcdFx0c3BlZWRcdFx0OiAnbm9ybWFsJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bmV4dFNlbGVjdG9yXHQ6IF9uZXh0U2VsZWN0b3IsXG5cdFx0XHRcdFx0bmF2U2VsZWN0b3JcdFx0OiBfbmF2U2VsZWN0b3IsXG5cdFx0XHRcdFx0aXRlbVNlbGVjdG9yXHQ6IF9pdGVtU2VsZWN0b3IsXG5cdFx0XHRcdFx0YmVoYXZpb3JcdFx0OiAnJyxcblxuXHRcdFx0XHRcdHN0YXRlOiB7XG5cdFx0XHRcdFx0XHRpc0RvbmVcdFx0OiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHRmdW5jdGlvbihuZXdFbGVtZW50cykge1xuXG5cdFx0XHRcdFx0SW5pdCh0cnVlKTtcblxuXHRcdFx0XHRcdGlmKGpRdWVyeSgpLmlzb3RvcGUpIHtcblxuXHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdhcHBlbmRlZCcsIGpRdWVyeShuZXdFbGVtZW50cykpO1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpeyBcblx0XHRcdFx0XHRcdFx0X2NvbnRhaW5lci5pc290b3BlKCdsYXlvdXQnKTsgXG5cdFx0XHRcdFx0XHR9LCAyMDAwKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0fVxuXG5cblxuXG5cbi8qKiBJbWFnZSBab29tXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX3pvb20oKSB7XG5cdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkoJ2ZpZ3VyZS56b29tJyk7XG5cdFx0XG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cdFx0XG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ2ltYWdlLnpvb20vanF1ZXJ5Lnpvb20ubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihqUXVlcnkoKS56b29tKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdF9jb250YWluZXIuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBfdCBcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0XHRcdF9tb2RlIFx0PSBfdC5hdHRyKCdkYXRhLW1vZGUnKSxcblx0XHRcdFx0XHRcdFx0X2lkXHRcdD0gX3QuYXR0cignaWQnKTtcblxuXHRcdFx0XHRcdFx0aWYoX21vZGUgPT0gJ2dyYWInKSB7XG5cdFx0XHRcdFx0XHRcdF90Lnpvb20oeyBvbjonZ3JhYicgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2VcblxuXHRcdFx0XHRcdFx0aWYoX21vZGUgPT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdFx0XHRfdC56b29tKHsgb246J2NsaWNrJyB9KTtcblx0XHRcdFx0XHRcdH0gZWxzZVxuXG5cdFx0XHRcdFx0XHRpZihfbW9kZSA9PSAndG9nZ2xlJykge1xuXHRcdFx0XHRcdFx0XHRfdC56b29tKHsgb246J3RvZ2dsZScgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfdC56b29tKCk7XG5cdFx0XHRcdFx0XHR9XG5cblxuXHRcdFx0XHRcdFx0Ly8gVGh1bWJuYWlsc1xuXHRcdFx0XHRcdFx0aWYoX2lkKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeSgnLnpvb20tbW9yZVtkYXRhLWZvcj0nK19pZCsnXSBhJykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgX2hyZWYgPSBqUXVlcnkodGhpcykuYXR0cignaHJlZicpO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdGlmKF9ocmVmICE9IFwiI1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoJy56b29tLW1vcmVbZGF0YS1mb3I9JytfaWQrJ10gYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeSgnZmlndXJlIycrX2lkICsgJz4ubGlnaHRib3gnKS5hdHRyKCdocmVmJywgX2hyZWYpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoJ2ZpZ3VyZSMnK19pZCArICc+aW1nJykuZmFkZU91dCgwLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCdmaWd1cmUjJytfaWQgKyAnPmltZycpLmF0dHIoJ3NyYycsIF9ocmVmKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhZGVJbig1MDApO1xuXG5cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR9KTtcblx0XHRcblx0XHR9XG5cblx0fVxuXG5cblxuXG5cbi8qKiBBdXRvc3VnZ2VzdFxuXHRodHRwOi8vdHdpdHRlci5naXRodWIuaW8vdHlwZWFoZWFkLmpzL1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9hdXRvc3VnZ2VzdCgpIHtcblx0XHRfY29udGFpbmVyID0galF1ZXJ5KCdkaXYuYXV0b3N1Z2dlc3QnKTtcblxuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ3R5cGVhaGVhZC5idW5kbGUuanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRpZihqUXVlcnkoKS50eXBlYWhlYWQpIHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRfY29udGFpbmVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXJcdF90IFx0XHRcdFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdFx0X21pbkxlbmd0aFx0XHRcdD0gX3QuYXR0cignZGF0YS1taW5MZW5ndGgnKSB8fCAxLFxuXHRcdFx0XHRcdFx0XHRfcXJ5VVJMIFx0XHRcdD0gX3QuYXR0cignZGF0YS1xdWVyeVVSTCcpLFxuXHRcdFx0XHRcdFx0XHRfbGltaXRcdCBcdFx0XHQ9IF90LmF0dHIoJ2RhdGEtbGltaXQnKSBcdHx8IDEwLFxuXHRcdFx0XHRcdFx0XHRfYXV0b2xvYWQgXHRcdFx0PSBfdC5hdHRyKCdkYXRhLWF1dG9sb2FkJyk7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZihfYXV0b2xvYWQgPT0gXCJmYWxzZVwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0LyoqICoqL1xuXHRcdFx0XHRcdFx0XHQvKiBCbG9vZGhvdW5kIChTdWdnZXN0aW9uIEVuZ2luZSkgKi9cblx0XHRcdFx0XHRcdFx0dmFyIF90eXBlYWhlYWQgPSBuZXcgQmxvb2Rob3VuZCh7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0dW1Ub2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy5vYmoud2hpdGVzcGFjZSgndmFsdWUnKSxcblx0XHRcdFx0XHRcdFx0XHRxdWVyeVRva2VuaXplcjogQmxvb2Rob3VuZC50b2tlbml6ZXJzLndoaXRlc3BhY2UsXG5cdFx0XHRcdFx0XHRcdFx0bGltaXQ6XHRfbGltaXQsXG5cdFx0XHRcdFx0XHRcdFx0cmVtb3RlOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1cmw6IF9xcnlVUkwgKyAnJVFVRVJZJyxcblx0XHRcdFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0alF1ZXJ5KCcudHlwZWFoZWFkJywgX3QpLnR5cGVhaGVhZCh7XG5cdFx0XHRcdFx0XHRcdFx0bGltaXQ6IFx0XHRfbGltaXQsXG5cdFx0XHRcdFx0XHRcdFx0aGludDogXHRcdF90LmF0dHIoJ2RhdGEtaGludCcpIFx0XHQ9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0OiBcdF90LmF0dHIoJ2RhdGEtaGlnaGxpZ2h0JykgXHQ9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0bWluTGVuZ3RoOiBwYXJzZUludChfbWluTGVuZ3RoKSxcblxuXHRcdFx0XHRcdFx0XHRcdGNhY2hlOiBcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdfdHlwZWFoZWFkJyxcblx0XHRcdFx0XHRcdFx0XHRzb3VyY2U6IF90eXBlYWhlYWRcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdC8qKiAqKi9cbiAgXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0fVxuXG5cdH1cblxuXG5cblxuXG5cbi8qKiBGb3JtIFN0ZXBwZXJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfc3RlcHBlcigpIHtcblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnaW5wdXQuc3RlcHBlcicpO1xuXG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnZm9ybS5zdGVwcGVyL2pxdWVyeS5zdGVwcGVyLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGpRdWVyeSgpLnN0ZXBwZXIpIHtcblxuXHRcdFx0XHRcdGpRdWVyeShfY29udGFpbmVyKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIF90IFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdFx0X21pbiBcdD0gX3QuYXR0cignbWluJykgfHwgbnVsbCxcblx0XHRcdFx0XHRcdFx0X21heCBcdD0gX3QuYXR0cignbWF4JykgfHwgbnVsbDtcblxuXHRcdFx0XHRcdFx0X3Quc3RlcHBlcih7XG5cdFx0XHRcdFx0XHRcdGxpbWl0Olx0XHRcdFx0XHRcdFtfbWluLF9tYXhdLFxuXHRcdFx0XHRcdFx0XHRmbG9hdFByZWNpc3Npb246XHRcdFx0X3QuYXR0cignZGF0YS1mbG9hdFByZWNpc3Npb24nKSB8fCAyLFxuXHRcdFx0XHRcdFx0XHR3aGVlbF9zdGVwOiBcdFx0XHRcdF90LmF0dHIoJ2RhdGEtd2hlZWxzdGVwJykgXHRcdHx8IDAuMSxcblx0XHRcdFx0XHRcdFx0YXJyb3dfc3RlcDpcdCBcdFx0XHRcdF90LmF0dHIoJ2RhdGEtYXJyb3dzdGVwJykgXHRcdHx8IDAuMixcblx0XHRcdFx0XHRcdFx0YWxsb3dXaGVlbDogXHRcdFx0XHRfdC5hdHRyKCdkYXRhLW1vdXNlc2Nyb29sJykgXHQ9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFVJOiBcdFx0XHRcdFx0XHRfdC5hdHRyKCdkYXRhLVVJJykgXHRcdFx0XHQ9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdC8vIC0tXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFx0XHRcdFx0XHRcdF90LmF0dHIoJ2RhdGEtdHlwZScpIFx0XHRcdHx8IFwiZmxvYXRcIixcblx0XHRcdFx0XHRcdFx0cHJldmVudFdoZWVsQWNjZWxlcmF0aW9uOlx0X3QuYXR0cignZGF0YS1wcmV2ZW50V2hlZWxBY2NlbGVyYXRpb24nKSA9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGluY3JlbWVudEJ1dHRvbjpcdFx0XHRfdC5hdHRyKCdkYXRhLWluY3JlbWVudEJ1dHRvbicpIHx8IFwiJmJsYWNrdHJpYW5nbGU7XCIsXG5cdFx0XHRcdFx0XHRcdGRlY3JlbWVudEJ1dHRvbjpcdFx0XHRfdC5hdHRyKCdkYXRhLWRlY3JlbWVudEJ1dHRvbicpIHx8IFwiJmJsYWNrdHJpYW5nbGVkb3duO1wiLFxuXHRcdFx0XHRcdFx0XHRvblN0ZXA6XHRcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0b25XaGVlbDpcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0b25BcnJvdzpcdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRcdFx0b25CdXR0b246XHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0XHRcdG9uS2V5VXA6XHRcdFx0XHRcdG51bGxcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdH1cblxuXHR9XG5cblxuXG5cblxuXG4vKiogU2xpbXNjcm9sbFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF9zbGltU2Nyb2xsKCkge1xuXHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KCcuc2xpbXNjcm9sbCcpO1xuXG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnc2xpbXNjcm9sbC9qcXVlcnkuc2xpbXNjcm9sbC5taW4uanMnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRpZihqUXVlcnkoKS5zbGltU2Nyb2xsKSB7XG5cblx0XHRcdFx0XHRqUXVlcnkoJy5zbGltc2Nyb2xsJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdHZhciBoZWlnaHQ7XG5cdFx0XHRcdFx0XHRpZiAoalF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLWhlaWdodFwiKSkge1xuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtaGVpZ2h0XCIpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0galF1ZXJ5KHRoaXMpLmhlaWdodCgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRqUXVlcnkodGhpcykuc2xpbVNjcm9sbCh7XG5cdFx0XHRcdFx0XHRcdHNpemU6IFx0XHRcdFx0alF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLXNpemVcIikgXHRcdFx0XHRcdFx0XHR8fCAnNXB4Jyxcblx0XHRcdFx0XHRcdFx0b3BhY2l0eTogXHRcdFx0alF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW9wYWNpdHlcIikgXHRcdFx0XHRcdFx0fHwgLjYsXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBcdFx0XHRqUXVlcnkodGhpcykuYXR0cihcImRhdGEtcG9zaXRpb25cIikgXHRcdFx0XHRcdFx0fHwgJ3JpZ2h0Jyxcblx0XHRcdFx0XHRcdFx0YWxsb3dQYWdlU2Nyb2xsOlx0ZmFsc2UsIC8vIG5vdCB3b3JraW5nXG5cdFx0XHRcdFx0XHRcdGRpc2FibGVGYWRlT3V0OiBcdGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRyYWlsVmlzaWJsZTogXHRcdHRydWUsXG5cdFx0XHRcdFx0XHRcdHJhaWxDb2xvcjogXHRcdFx0alF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLXJhaWxDb2xvclwiKVx0XHRcdFx0XHRcdHx8ICcjMjIyJyxcblx0XHRcdFx0XHRcdFx0cmFpbE9wYWNpdHk6IFx0XHRqUXVlcnkodGhpcykuYXR0cihcImRhdGEtcmFpbE9wYWNpdHlcIikgXHRcdFx0XHRcdHx8IDAuMDUsXG5cdFx0XHRcdFx0XHRcdGFsd2F5c1Zpc2libGU6IFx0XHQoalF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLWFsd2F5c1Zpc2libGVcIikgIT0gXCJmYWxzZVwiIFx0PyB0cnVlIDogZmFsc2UpLFxuXHRcdFx0XHRcdFx0XHRyYWlsVmlzaWJsZTogXHRcdChqUXVlcnkodGhpcykuYXR0cihcImRhdGEtcmFpbFZpc2libGVcIikgICAhPSBcImZhbHNlXCIgXHQ/IHRydWUgOiBmYWxzZSksXG5cdFx0XHRcdFx0XHRcdGNvbG9yOiBcdFx0XHRcdGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1jb2xvclwiKSAgXHRcdFx0XHRcdFx0fHwgJyMzMzMnLFxuXHRcdFx0XHRcdFx0XHR3cmFwcGVyQ2xhc3M6IFx0XHRqUXVlcnkodGhpcykuYXR0cihcImRhdGEtd3JhcHBlci1jbGFzc1wiKSBcdFx0XHRcdHx8ICdzbGltU2Nyb2xsRGl2Jyxcblx0XHRcdFx0XHRcdFx0cmFpbENvbG9yOiBcdFx0XHRqUXVlcnkodGhpcykuYXR0cihcImRhdGEtcmFpbENvbG9yXCIpICBcdFx0XHRcdFx0fHwgJyNlYWVhZWEnLFxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IFx0XHRcdGhlaWdodFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0XHRcdC8vIERpc2FibGUgYm9keSBzY3JvbGwgb24gc2xpbXNjcm9sbCBob3ZlclxuXHRcdFx0XHRcdFx0aWYoalF1ZXJ5KHRoaXMpLmF0dHIoJ2Rpc2FibGUtYm9keS1zY3JvbGwnKSA9PSAndHJ1ZScpIHtcblxuXHRcdFx0XHRcdFx0XHRqUXVlcnkodGhpcykuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgc2Nyb2xsVG8gPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PSAnbW91c2V3aGVlbCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNjcm9sbFRvID0gKGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhICogLTEpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChlLnR5cGUgPT0gJ0RPTU1vdXNlU2Nyb2xsJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2Nyb2xsVG8gPSA0MCAqIGUub3JpZ2luYWxFdmVudC5kZXRhaWw7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNjcm9sbFRvKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkodGhpcykuc2Nyb2xsVG9wKHNjcm9sbFRvICsgalF1ZXJ5KHRoaXMpLnNjcm9sbFRvcCgpKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0fVxuXG5cblxuXG4vKiogTW9kYWwgQXV0b2xvYWRcblxuXHRVU0FHRTpcblx0XG5cdDxkaXYgaWQ9XCJNT0RBTC1JRC1SRVFVSVJFRFwiIGNsYXNzPVwibW9kYWwgZmFkZVwiIGRhdGEtYXV0b2xvYWQ9XCJ0cnVlXCIgZGF0YS1hdXRvbG9hZC1kZWxheT1cIjIwMDBcIj5cblx0XHQuLi5cblx0PC9kaXY+XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblx0ZnVuY3Rpb24gX21vZGFsQXV0b0xvYWQoKSB7XG5cdFx0aWYoalF1ZXJ5KFwiZGl2Lm1vZGFsXCIpLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0alF1ZXJ5KFwiZGl2Lm1vZGFsXCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBfdCBcdFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRfaWRcdFx0XHQ9IF90LmF0dHIoJ2lkJyksXG5cdFx0XHRcdFx0X2F1dG9zdGFydCBcdD0gX3QuYXR0cignZGF0YS1hdXRvbG9hZCcpIHx8IGZhbHNlO1xuXG5cblx0XHRcdFx0Ly8gcmVzZXQgYWxsb3dcblx0XHRcdFx0Ly8gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oX2lkKTtcblxuXG5cdFx0XHRcdGlmKF9pZCAhPSAnJykgeyAvLyByZXdyaXRlIGlmIHNldCB0byBoaWRkZW4gYnkgdGhlIHVzZXJcblx0XHRcdFx0XHRpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShfaWQpID09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0XHRfYXV0b3N0YXJ0ID0gJ2ZhbHNlJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdGlmKF9hdXRvc3RhcnQgPT0gJ3RydWUnKSB7XG5cblx0XHRcdFx0XHRqUXVlcnkod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkgeyAvLyByZXF1aXJlZCBvbiBsb2FkIVxuXHRcdFx0XHRcdFx0dmFyIF9kZWxheSA9IF90LmF0dHIoJ2RhdGEtYXV0b2xvYWQtZGVsYXknKSB8fCAxMDAwOyAvLyBkZWxheSB3aGVuIG1vZGFsIGFwcHJlYXJcblxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSAge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3QubW9kYWwoJ3RvZ2dsZScpO1xuXG5cdFx0XHRcdFx0XHR9LCBwYXJzZUludChfZGVsYXkpKTtcblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMT0NBTCBTVE9SQUdFIC0gRE8gTk9UIEhJREUgT04gTkVYVCBQQUdFIExPQUQhXG5cdFx0XHRcdGpRdWVyeShcImlucHV0LmxvYWRNb2RhbEhpZGVcIiwgdGhpcykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciBfdHQgPSBqUXVlcnkodGhpcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoX3R0LmlzKFwiOmNoZWNrZWRcIikpIHtcblx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKF9pZCwgJ2hpZGRlbicpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1tNb2RhbCBBdXRvbG9hZCAjJytfaWQrJ10gQWRkZWQgdG8gbG9jYWxTdG9yYWdlJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKF9pZCk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnW01vZGFsIEF1dG9sb2FkICMnK19pZCsnXSBSZW1vdmVkIGZyb20gbG9jYWxTdG9yYWdlJyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH1cblx0fVxuXG5cblxuXG5cbi8qKiAxMC4gQmFja2dyb3VuZCBJbWFnZVxuXHRjbGFzcz1cImJveGVkXCIgc2hvdWxkIGJlIGFkZGVkIHRvIGJvZHkuXG5cdEFkZCB0byBib2R5IC0gZXhhbXBsZTogZGF0YS1iYWNrZ3JvdW5kPVwiYXNzZXRzL2ltYWdlcy9ib3hlZF9iYWNrZ3JvdW5kLzEuanBnXCJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfYmdpbWFnZSgpIHtcblx0XHR2YXIgZGF0YV9iYWNrZ3JvdW5kID0galF1ZXJ5KCdib2R5JykuYXR0cignZGF0YS1iYWNrZ3JvdW5kJykgfHwgJyc7XG5cblx0XHRpZihkYXRhX2JhY2tncm91bmQgIT0gJycpIHtcblx0XHRcblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnanF1ZXJ5LmJhY2tzdHJldGNoLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGRhdGFfYmFja2dyb3VuZCkge1xuXHRcdFx0XHRcdGpRdWVyeS5iYWNrc3RyZXRjaChkYXRhX2JhY2tncm91bmQpO1xuXHRcdFx0XHRcdGpRdWVyeSgnYm9keScpLmFkZENsYXNzKCd0cmFuc3BhcmVudCcpOyAvLyByZW1vdmUgYmFja3JvdW5kIGNvbG9yIG9mIGJveGVkIGNsYXNzXG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblx0XHR9XG5cdH1cblxuXG5cblxuLyoqIEZsaWNrciBXaWRnZXRcblx0PGRpdiBjbGFzcz1cIndpZGdldC1mbGlja3IgY2xlYXJmaXggbGlnaHRib3ggbWFyZ2luLWJvdHRvbS02MFwiIGRhdGEtaWQ9XCIzNzMwNDU5OEBOMDJcIiBkYXRhLWxpbWl0PVwiMTZcIiBkYXRhLXBsdWdpbi1vcHRpb25zPSd7XCJkZWxlZ2F0ZVwiOiBcImFcIiwgXCJnYWxsZXJ5XCI6IHtcImVuYWJsZWRcIjogdHJ1ZX19Jz48L2Rpdj5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfd2lkZ2V0X2ZsaWNrcigpIHtcblx0XHR2YXIgX2NvbnRhaW5lciA9IGpRdWVyeSgnLndpZGdldC1mbGlja3InKTtcblxuXHRcdGlmKF9jb250YWluZXIubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRsb2FkU2NyaXB0KHBsdWdpbl9wYXRoICsgJ3dpZGdldC5qZmxpY2tyL2pmbGlja3JmZWVkLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGpRdWVyeSgpLmpmbGlja3JmZWVkKSB7XG5cdFx0XHRcdFx0aWYoalF1ZXJ5KCcud2lkZ2V0LWZsaWNrcicpKSB7XG5cblx0XHRcdFx0XHRcdC8qKiAqKi9cblx0XHRcdFx0XHRcdF9jb250YWluZXIuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF90IFx0XHQ9IGpRdWVyeSh0aGlzKSxcblx0XHRcdFx0XHRcdFx0XHRfaWQgXHQ9IF90LmF0dHIoJ2RhdGEtaWQnKSxcblx0XHRcdFx0XHRcdFx0XHRfbGltaXQgXHQ9IF90LmF0dHIoJ2RhdGEtbGltaXQnKSB8fCAxNDtcblxuXHRcdFx0XHRcdFx0XHRfdC5qZmxpY2tyZmVlZCh7XG5cdFx0XHRcdFx0XHRcdFx0bGltaXQ6IHBhcnNlSW50KF9saW1pdCksXG5cdFx0XHRcdFx0XHRcdFx0cXN0cmluZ3M6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlkOiBfaWRcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1UZW1wbGF0ZTogJzxsaT4nK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCJ7e2ltYWdlfX1cIiB0aXRsZT1cInt7dGl0bGV9fVwiPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGltZyBzcmM9XCJ7e2ltYWdlX3N9fVwiIGFsdD1cInt7dGl0bGV9fVwiIHdpZHRoPVwiNjNcIiBoZWlnaHQ9XCI2M1wiIC8+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9hPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgJzwvbGk+J1xuXHRcdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0X2xpZ2h0Ym94KCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdC8qKiAqKi9cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcblx0XHR9XG5cblx0fVxuXG5cblxuXG4vKiogVHdpdHRlciBXaWRnZXRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfd2lkZ2V0X3R3aXR0ZXIoKSB7XG5cdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkoXCIud2lkZ2V0LXR3aXR0ZXJcIik7XG5cblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICd3aWRnZXQudHdpdHRpZS90d2l0dGllLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGpRdWVyeSgpLnR3aXR0aWUpIHtcblx0XHRcdFx0XHQvLyBqUXVlcnkoJy5leGFtcGxlMSAudHdlZXQnKS50d2l0dGllKHtcblx0XHRcdFx0XHRcdC8vIGRhdGVGb3JtYXQ6ICclYi4gJWQsICVZJyxcblx0XHRcdFx0XHRcdC8vIHRlbXBsYXRlOiAne3t0d2VldH19IDxkaXYgY2xhc3M9XCJkYXRlXCI+e3tkYXRlfX08L2Rpdj4nLFxuXHRcdFx0XHRcdFx0Ly8gY291bnQ6IDEsXG5cdFx0XHRcdFx0XHQvLyBsb2FkaW5nVGV4dDogJ0xvYWRpbmchJ1xuXHRcdFx0XHRcdC8vIH0pO1xuXG5cdFx0XHRcdFx0XHRfY29udGFpbmVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfdCBcdFx0PSBqUXVlcnkodGhpcyksXG5cdFx0XHRcdFx0XHRcdFx0X3BocCBcdD0gX3QuYXR0cignZGF0YS1waHAnKSxcdFx0XHQvLyBQSFAgU2NyaXB0IFBhdGhcblx0XHRcdFx0XHRcdFx0XHRfdXNyIFx0PSBfdC5hdHRyKCdkYXRhLXVzZXJuYW1lJyksXHRcdC8vIFR3aXR0ZXIgVXNlcm5hbWVcblx0XHRcdFx0XHRcdFx0XHRfbG10IFx0PSBfdC5hdHRyKCdkYXRhLWxpbWl0JylcdHx8IDMsXHQvLyBUd2VldHMgTGltaXRcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRfdXJsXHQ9IF9waHAgKyBcIj91c2VybmFtZT1cIiArIF91c3IgKyBcIiZsaW1pdD1cIiArIF9sbXQ7XG5cblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmdldEpTT04oX3VybCwgZnVuY3Rpb24odHdlZXRzKXtcblx0XHRcdFx0XHRcdFx0XHRfdC5odG1sKGZvcm1hdF90d2l0dGVyKHR3ZWV0cykpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR9KTtcblx0XHRcblx0XHR9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGZvcm1hdF90d2l0dGVyKHR3aXR0KSB7XG5cdFx0dmFyIHN0YXR1c0hUTUwgPSBbXTtcblxuXHRcdGZvcih2YXIgaT0wOyBpPHR3aXR0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgdXNlcm5hbWUgPSB0d2l0dFtpXS51c2VyLnNjcmVlbl9uYW1lO1xuXG5cdFx0XHR2YXIgc3RhdHVzID0gdHdpdHRbaV0udGV4dC5yZXBsYWNlKC8oKGh0dHBzP3xzP2Z0cHxzc2gpXFw6XFwvXFwvW15cIlxcc1xcPFxcPl0qW14uLDsnXCI+XFw6XFxzXFw8XFw+XFwpXFxdXFwhXSkvZywgZnVuY3Rpb24odXJsKSB7XG5cdFx0XHRcdHJldHVybiAnPGEgaHJlZj1cIicrdXJsKydcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nK3VybCsnPC9hPic7XG5cdFx0XHR9KS5yZXBsYWNlKC9cXEJAKFtfYS16MC05XSspL2lnLCBmdW5jdGlvbihyZXBseSkge1xuXHRcdFx0XHRyZXR1cm4gIHJlcGx5LmNoYXJBdCgwKSsnPGEgaHJlZj1cImh0dHA6Ly90d2l0dGVyLmNvbS8nK3JlcGx5LnN1YnN0cmluZygxKSsnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytyZXBseS5zdWJzdHJpbmcoMSkrJzwvYT4nO1xuXHRcdFx0fSk7XG5cblx0XHRcdHN0YXR1c0hUTUwucHVzaCgnPGxpPjxpIGNsYXNzPVwiZmEgZmEtdHdpdHRlclwiPjwvaT48c3Bhbj4nK3N0YXR1cysnPC9zcGFuPjxzbWFsbD48YSBocmVmPVwiaHR0cDovL3R3aXR0ZXIuY29tLycrdXNlcm5hbWUrJy9zdGF0dXNlcy8nK3R3aXR0W2ldLmlkX3N0cisnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JytyZWxhdGl2ZV90aW1lKHR3aXR0W2ldLmNyZWF0ZWRfYXQpKyc8L2E+PC9zbWFsbD48L2xpPicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdGF0dXNIVE1MLmpvaW4oJycpO1xuXHR9XG5cblxuXHRmdW5jdGlvbiByZWxhdGl2ZV90aW1lKHRpbWVfdmFsdWUpIHtcblx0XHR2YXIgdmFsdWVzIFx0XHQ9IHRpbWVfdmFsdWUuc3BsaXQoXCIgXCIpLFxuXHRcdFx0cGFyc2VkX2RhdGUgPSBEYXRlLnBhcnNlKHRpbWVfdmFsdWUpLFxuXHRcdFx0cmVsYXRpdmVfdG8gPSAoYXJndW1lbnRzLmxlbmd0aCA+IDEpID8gYXJndW1lbnRzWzFdIDogbmV3IERhdGUoKSxcblx0XHRcdGRlbHRhIFx0XHQ9IHBhcnNlSW50KChyZWxhdGl2ZV90by5nZXRUaW1lKCkgLSBwYXJzZWRfZGF0ZSkgLyAxMDAwKTtcblxuXHRcdHRpbWVfdmFsdWUgXHRcdD0gdmFsdWVzWzFdICsgXCIgXCIgKyB2YWx1ZXNbMl0gKyBcIiwgXCIgKyB2YWx1ZXNbNV0gKyBcIiBcIiArIHZhbHVlc1szXTtcblx0XHRkZWx0YSBcdFx0XHQ9IGRlbHRhICsgKHJlbGF0aXZlX3RvLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MCk7XG5cblx0XHRpZiAoZGVsdGEgPCA2MCkge1xuXHRcdFx0cmV0dXJuICdsZXNzIHRoYW4gYSBtaW51dGUgYWdvJztcblx0XHR9IGVsc2UgaWYoZGVsdGEgPCAxMjApIHtcblx0XHRcdHJldHVybiAnYWJvdXQgYSBtaW51dGUgYWdvJztcblx0XHR9IGVsc2UgaWYoZGVsdGEgPCAoNjAqNjApKSB7XG5cdFx0XHRyZXR1cm4gKHBhcnNlSW50KGRlbHRhIC8gNjApKS50b1N0cmluZygpICsgJyBtaW51dGVzIGFnbyc7XG5cdFx0fSBlbHNlIGlmKGRlbHRhIDwgKDEyMCo2MCkpIHtcblx0XHRcdHJldHVybiAnYWJvdXQgYW4gaG91ciBhZ28nO1xuXHRcdH0gZWxzZSBpZihkZWx0YSA8ICgyNCo2MCo2MCkpIHtcblx0XHRcdHJldHVybiAnYWJvdXQgJyArIChwYXJzZUludChkZWx0YSAvIDM2MDApKS50b1N0cmluZygpICsgJyBob3VycyBhZ28nO1xuXHRcdH0gZWxzZSBpZihkZWx0YSA8ICg0OCo2MCo2MCkpIHtcblx0XHRcdHJldHVybiAnMSBkYXkgYWdvJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIChwYXJzZUludChkZWx0YSAvIDg2NDAwKSkudG9TdHJpbmcoKSArICcgZGF5cyBhZ28nO1xuXHRcdH1cblx0fVxuXG5cblxuXG4vKiogRmFjZWJvb2sgV2lkZ2V0XG5cdDxkaXYgY2xhc3M9XCJmYi1saWtlXCIgZGF0YS1ocmVmPVwiaHR0cDovL3d3dy5zdGVwb2Z3ZWIuY29tXCIgZGF0YS1sYXlvdXQ9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cImxpa2VcIiBkYXRhLXNob3ctZmFjZXM9XCJmYWxzZVwiIGRhdGEtc2hhcmU9XCJmYWxzZVwiPjwvZGl2PlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF93aWRnZXRfZmFjZWJvb2soKSB7XG5cblx0XHQvKiogTGlrZSAmIFNoYXJlIEJ1dHRvblxuXHRcdCAqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdFx0dmFyIF9jb250YWluZXJfMSA9IGpRdWVyeSgnZGl2LmZiLWxpa2UnKTtcblx0XHR2YXIgX2NvbnRhaW5lcl8yID0galF1ZXJ5KCdkaXYuZmItc2hhcmUtYnV0dG9uJyk7XG5cdFx0XG5cdFx0aWYoX2NvbnRhaW5lcl8xLmxlbmd0aCA+IDAgfHwgX2NvbnRhaW5lcl8yLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0alF1ZXJ5KCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwiZmItcm9vdFwiPjwvZGl2PicpO1xuXG5cdFx0XHQoZnVuY3Rpb24oZCwgcywgaWQpIHtcblx0XHRcdFx0dmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuXHRcdFx0XHRpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybjtcblx0XHRcdFx0anMgPSBkLmNyZWF0ZUVsZW1lbnQocyk7IGpzLmlkID0gaWQ7XG5cdFx0XHRcdGpzLnNyYyA9IFwiLy9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanMjeGZibWw9MSZ2ZXJzaW9uPXYyLjNcIjtcblx0XHRcdFx0ZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuXHRcdFx0fShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcblx0XHRcblx0XHR9XG5cblx0fVxuXG5cblxuXG5cbi8qKiBEcmliYmJsZSBXaWRnZXRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuXHRmdW5jdGlvbiBfd2lkZ2V0X2RyaWJiYmxlKCkge1xuXHRcdHZhciBfY29udGFpbmVyID0galF1ZXJ5KFwiLndpZGdldC1kcmliYmJsZVwiKTtcblx0XHRcblx0XHRpZihfY29udGFpbmVyLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0bG9hZFNjcmlwdChwbHVnaW5fcGF0aCArICd3aWRnZXQuZHJpYmJibGUvanJpYmJibGUubWluLmpzJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHR2YXIgX3Rva2VuIFx0PSBfY29udGFpbmVyLmF0dHIoJ2RhdGEtdG9rZW4nKSBcdHx8ICdmNjg4YWM1MTkyODlmMTljZTVjZWJjMTM4M2MxNWFkNWMwMmJkNTgyMDVjZDgzYzg2Y2JiMGNlMDkxNzBjMWI0JywgLy8gZGVtbyBkZWZhdWx0XG5cdFx0XHRcdFx0XHRfdGFyZ2V0XHQ9IF9jb250YWluZXIuYXR0cignZGF0YS10YXJnZXQnKSBcdHx8ICdfYmxhbmsnLFxuXHRcdFx0XHRcdFx0X3Nob3RzXHQ9IF9jb250YWluZXIuYXR0cignZGF0YS1zaG90cycpIFx0fHwgMjA0Njg5NjsgLy8gZGVtbyBkZWZhdWx0XG5cblx0XHRcdFx0XHRqUXVlcnkuanJpYmJibGUuc2V0VG9rZW4oX3Rva2VuKTtcblxuXHRcdFx0XHRcdGpRdWVyeS5qcmliYmJsZS5zaG90cyhfc2hvdHMpLnJlYm91bmRzKCkudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRcdFx0XHRcdHZhciBodG1sID0gW107XG5cblx0XHRcdFx0XHRcdHJlcy5mb3JFYWNoKGZ1bmN0aW9uKHNob3QpIHtcblx0XHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8bGk+Jyk7XG5cdFx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPGEgaHJlZj1cIicgKyBzaG90Lmh0bWxfdXJsICsgJ1wiIHRhcmdldD1cIicgKyBfdGFyZ2V0ICsgJ1wiPicpO1xuXHRcdFx0XHRcdFx0XHRodG1sLnB1c2goJzxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIicgKyBzaG90LmltYWdlcy5ub3JtYWwgKyAnXCIgYWx0PVwiaW1hZ2VcIj4nKTtcblx0XHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8L2E+PC9saT4nKTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRfY29udGFpbmVyLmh0bWwoaHRtbC5qb2luKCcnKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcblxuXHRcdFx0fSk7XG5cdFx0XG5cdFx0fVxuXG5cdH1cblxuXG5cblxuXG4vKiogTWVkaWEgV2lkZ2V0IFttZWRpYWVsZW1lbnQgcGx1Z2luXVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG5cdGZ1bmN0aW9uIF93aWRnZXRfbWVkaWEoKSB7XG5cdFx0dmFyIF9jb250YWluZXIgPSBqUXVlcnkoXCIud2lkZ2V0LW1lZGlhXCIpO1xuXG5cdFx0aWYoX2NvbnRhaW5lci5sZW5ndGggPiAwKSB7XG5cblx0XHRcdGxvYWRTY3JpcHQocGx1Z2luX3BhdGggKyAnd2lkZ2V0Lm1lZGlhZWxlbWVudGJ1aWxkL21lZGlhZWxlbWVudC1hbmQtcGxheWVyLm1pbi5qcycsIGZ1bmN0aW9uKCkge1xuXG5cblx0XHRcdFxuXHRcdFx0fSk7XG5cdFx0XG5cdFx0fVxuXG5cdH1cblxuXG5cblxuXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cbi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cblxuXG5cblx0Ly8gc2Nyb2xsIFxuXHRmdW5jdGlvbiB3aGVlbChlKSB7XG5cdCAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGlzYWJsZV9zY3JvbGwoKSB7XG5cdCAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0ICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB3aGVlbCwgZmFsc2UpO1xuXHQgIH1cblx0ICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gd2hlZWw7XG5cdH1cblxuXHRmdW5jdGlvbiBlbmFibGVfc2Nyb2xsKCkge1xuXHRcdGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgd2hlZWwsIGZhbHNlKTtcblx0XHR9XG5cdFx0d2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ua2V5ZG93biA9IG51bGw7ICBcblx0fVxuXG5cdC8vIG92ZXJsYXlcblx0ZnVuY3Rpb24gZW5hYmxlX292ZXJsYXkoKSB7XG5cdFx0alF1ZXJ5KFwic3Bhbi5nbG9iYWwtb3ZlcmxheVwiKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIGZpcnN0IVxuXHRcdGpRdWVyeSgnYm9keScpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJnbG9iYWwtb3ZlcmxheVwiPjwvc3Bhbj4nKTtcblx0fVxuXHRmdW5jdGlvbiBkaXNhYmxlX292ZXJsYXkoKSB7XG5cdFx0alF1ZXJ5KFwic3Bhbi5nbG9iYWwtb3ZlcmxheVwiKS5yZW1vdmUoKTtcblx0fVxuXG5cblxuXG5cblxuLyoqIENPVU5UIFRPXG5cdGh0dHBzOi8vZ2l0aHViLmNvbS9taHVnZ2lucy9qcXVlcnktY291bnRUb1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG4gKGZ1bmN0aW9uICgkKSB7XG5cdCQuZm4uY291bnRUbyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHRyZXR1cm4galF1ZXJ5KHRoaXMpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gc2V0IG9wdGlvbnMgZm9yIGN1cnJlbnQgZWxlbWVudFxuXHRcdFx0dmFyIHNldHRpbmdzID0galF1ZXJ5LmV4dGVuZCh7fSwgJC5mbi5jb3VudFRvLmRlZmF1bHRzLCB7XG5cdFx0XHRcdGZyb206ICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmRhdGEoJ2Zyb20nKSxcblx0XHRcdFx0dG86ICAgICAgICAgICAgICBqUXVlcnkodGhpcykuZGF0YSgndG8nKSxcblx0XHRcdFx0c3BlZWQ6ICAgICAgICAgICBqUXVlcnkodGhpcykuZGF0YSgnc3BlZWQnKSxcblx0XHRcdFx0cmVmcmVzaEludGVydmFsOiBqUXVlcnkodGhpcykuZGF0YSgncmVmcmVzaC1pbnRlcnZhbCcpLFxuXHRcdFx0XHRkZWNpbWFsczogICAgICAgIGpRdWVyeSh0aGlzKS5kYXRhKCdkZWNpbWFscycpXG5cdFx0XHR9LCBvcHRpb25zKTtcblxuXHRcdFx0Ly8gaG93IG1hbnkgdGltZXMgdG8gdXBkYXRlIHRoZSB2YWx1ZSwgYW5kIGhvdyBtdWNoIHRvIGluY3JlbWVudCB0aGUgdmFsdWUgb24gZWFjaCB1cGRhdGVcblx0XHRcdHZhciBsb29wcyA9IE1hdGguY2VpbChzZXR0aW5ncy5zcGVlZCAvIHNldHRpbmdzLnJlZnJlc2hJbnRlcnZhbCksXG5cdFx0XHRcdGluY3JlbWVudCA9IChzZXR0aW5ncy50byAtIHNldHRpbmdzLmZyb20pIC8gbG9vcHM7XG5cblx0XHRcdC8vIHJlZmVyZW5jZXMgJiB2YXJpYWJsZXMgdGhhdCB3aWxsIGNoYW5nZSB3aXRoIGVhY2ggdXBkYXRlXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdCRzZWxmID0galF1ZXJ5KHRoaXMpLFxuXHRcdFx0XHRsb29wQ291bnQgPSAwLFxuXHRcdFx0XHR2YWx1ZSA9IHNldHRpbmdzLmZyb20sXG5cdFx0XHRcdGRhdGEgPSAkc2VsZi5kYXRhKCdjb3VudFRvJykgfHwge307XG5cblx0XHRcdCRzZWxmLmRhdGEoJ2NvdW50VG8nLCBkYXRhKTtcblxuXHRcdFx0Ly8gaWYgYW4gZXhpc3RpbmcgaW50ZXJ2YWwgY2FuIGJlIGZvdW5kLCBjbGVhciBpdCBmaXJzdFxuXHRcdFx0aWYgKGRhdGEuaW50ZXJ2YWwpIHtcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChkYXRhLmludGVydmFsKTtcblx0XHRcdH1cblx0XHRcdGRhdGEuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGVUaW1lciwgc2V0dGluZ3MucmVmcmVzaEludGVydmFsKTtcblxuXHRcdFx0Ly8gX19jb25zdHJ1Y3QgdGhlIGVsZW1lbnQgd2l0aCB0aGUgc3RhcnRpbmcgdmFsdWVcblx0XHRcdHJlbmRlcih2YWx1ZSk7XG5cblx0XHRcdGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xuXHRcdFx0XHR2YWx1ZSArPSBpbmNyZW1lbnQ7XG5cdFx0XHRcdGxvb3BDb3VudCsrO1xuXG5cdFx0XHRcdHJlbmRlcih2YWx1ZSk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZihzZXR0aW5ncy5vblVwZGF0ZSkgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHNldHRpbmdzLm9uVXBkYXRlLmNhbGwoc2VsZiwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGxvb3BDb3VudCA+PSBsb29wcykge1xuXHRcdFx0XHRcdC8vIHJlbW92ZSB0aGUgaW50ZXJ2YWxcblx0XHRcdFx0XHQkc2VsZi5yZW1vdmVEYXRhKCdjb3VudFRvJyk7XG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChkYXRhLmludGVydmFsKTtcblx0XHRcdFx0XHR2YWx1ZSA9IHNldHRpbmdzLnRvO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZihzZXR0aW5ncy5vbkNvbXBsZXRlKSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5vbkNvbXBsZXRlLmNhbGwoc2VsZiwgdmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiByZW5kZXIodmFsdWUpIHtcblx0XHRcdFx0dmFyIGZvcm1hdHRlZFZhbHVlID0gc2V0dGluZ3MuZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsdWUsIHNldHRpbmdzKTtcblx0XHRcdFx0JHNlbGYuaHRtbChmb3JtYXR0ZWRWYWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cblx0JC5mbi5jb3VudFRvLmRlZmF1bHRzID0ge1xuXHRcdGZyb206IDAsICAgICAgICAgICAgICAgLy8gdGhlIG51bWJlciB0aGUgZWxlbWVudCBzaG91bGQgc3RhcnQgYXRcblx0XHR0bzogMCwgICAgICAgICAgICAgICAgIC8vIHRoZSBudW1iZXIgdGhlIGVsZW1lbnQgc2hvdWxkIGVuZCBhdFxuXHRcdHNwZWVkOiAxMDAwLCAgICAgICAgICAgLy8gaG93IGxvbmcgaXQgc2hvdWxkIHRha2UgdG8gY291bnQgYmV0d2VlbiB0aGUgdGFyZ2V0IG51bWJlcnNcblx0XHRyZWZyZXNoSW50ZXJ2YWw6IDEwMCwgIC8vIGhvdyBvZnRlbiB0aGUgZWxlbWVudCBzaG91bGQgYmUgdXBkYXRlZFxuXHRcdGRlY2ltYWxzOiAwLCAgICAgICAgICAgLy8gdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byBzaG93XG5cdFx0Zm9ybWF0dGVyOiBmb3JtYXR0ZXIsICAvLyBoYW5kbGVyIGZvciBmb3JtYXR0aW5nIHRoZSB2YWx1ZSBiZWZvcmUgcmVuZGVyaW5nXG5cdFx0b25VcGRhdGU6IG51bGwsICAgICAgICAvLyBjYWxsYmFjayBtZXRob2QgZm9yIGV2ZXJ5IHRpbWUgdGhlIGVsZW1lbnQgaXMgdXBkYXRlZFxuXHRcdG9uQ29tcGxldGU6IG51bGwgICAgICAgLy8gY2FsbGJhY2sgbWV0aG9kIGZvciB3aGVuIHRoZSBlbGVtZW50IGZpbmlzaGVzIHVwZGF0aW5nXG5cdH07XG5cblx0ZnVuY3Rpb24gZm9ybWF0dGVyKHZhbHVlLCBzZXR0aW5ncykge1xuXHRcdHJldHVybiB2YWx1ZS50b0ZpeGVkKHNldHRpbmdzLmRlY2ltYWxzKTtcblx0fVxufShqUXVlcnkpKTtcblxuXG5cblxuLyoqIEJST1dTRVIgREVURUNUXG5cdEFkZCBicm93c2VyIHRvIGh0bWwgY2xhc3NcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuKGZ1bmN0aW9uKCQpIHtcblx0JC5leHRlbmQoe1xuXG5cdFx0YnJvd3NlckRldGVjdDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciB1ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCxcblx0XHRcdFx0dWEgPSB1LnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdGlzID0gZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gdWEuaW5kZXhPZih0KSA+IC0xO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRnID0gJ2dlY2tvJyxcblx0XHRcdFx0dyA9ICd3ZWJraXQnLFxuXHRcdFx0XHRzID0gJ3NhZmFyaScsXG5cdFx0XHRcdG8gPSAnb3BlcmEnLFxuXHRcdFx0XHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuXHRcdFx0XHRiID0gWyghKC9vcGVyYXx3ZWJ0di9pLnRlc3QodWEpKSAmJiAvbXNpZVxccyhcXGQpLy50ZXN0KHVhKSkgPyAoJ2llIGllJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24uc3BsaXQoXCJNU0lFXCIpWzFdKSkgOiBpcygnZmlyZWZveC8yJykgPyBnICsgJyBmZjInIDogaXMoJ2ZpcmVmb3gvMy41JykgPyBnICsgJyBmZjMgZmYzXzUnIDogaXMoJ2ZpcmVmb3gvMycpID8gZyArICcgZmYzJyA6IGlzKCdnZWNrby8nKSA/IGcgOiBpcygnb3BlcmEnKSA/IG8gKyAoL3ZlcnNpb25cXC8oXFxkKykvLnRlc3QodWEpID8gJyAnICsgbyArIFJlZ0V4cC5qUXVlcnkxIDogKC9vcGVyYShcXHN8XFwvKShcXGQrKS8udGVzdCh1YSkgPyAnICcgKyBvICsgUmVnRXhwLmpRdWVyeTIgOiAnJykpIDogaXMoJ2tvbnF1ZXJvcicpID8gJ2tvbnF1ZXJvcicgOiBpcygnY2hyb21lJykgPyB3ICsgJyBjaHJvbWUnIDogaXMoJ2lyb24nKSA/IHcgKyAnIGlyb24nIDogaXMoJ2FwcGxld2Via2l0LycpID8gdyArICcgJyArIHMgKyAoL3ZlcnNpb25cXC8oXFxkKykvLnRlc3QodWEpID8gJyAnICsgcyArIFJlZ0V4cC5qUXVlcnkxIDogJycpIDogaXMoJ21vemlsbGEvJykgPyBnIDogJycsIGlzKCdqMm1lJykgPyAnbW9iaWxlJyA6IGlzKCdpcGhvbmUnKSA/ICdpcGhvbmUnIDogaXMoJ2lwb2QnKSA/ICdpcG9kJyA6IGlzKCdtYWMnKSA/ICdtYWMnIDogaXMoJ2RhcndpbicpID8gJ21hYycgOiBpcygnd2VidHYnKSA/ICd3ZWJ0dicgOiBpcygnd2luJykgPyAnd2luJyA6IGlzKCdmcmVlYnNkJykgPyAnZnJlZWJzZCcgOiAoaXMoJ3gxMScpIHx8IGlzKCdsaW51eCcpKSA/ICdsaW51eCcgOiAnJywgJ2pzJ107XG5cblx0XHRcdGMgPSBiLmpvaW4oJyAnKTtcblx0XHRcdGguY2xhc3NOYW1lICs9ICcgJyArIGM7XG5cblx0XHRcdHZhciBpc0lFMTEgPSAhKHdpbmRvdy5BY3RpdmVYT2JqZWN0KSAmJiBcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3c7XG5cblx0XHRcdGlmKGlzSUUxMSkge1xuXHRcdFx0XHRqUXVlcnkoJ2h0bWwnKS5yZW1vdmVDbGFzcygnZ2Vja28nKS5hZGRDbGFzcygnaWUgaWUxMScpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fSk7XG59KShqUXVlcnkpO1xuXG4gXG5cbi8qKiBBcHBlYXJcblx0aHR0cHM6Ly9naXRodWIuY29tL2JhczJrL2pxdWVyeS5hcHBlYXIvXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cbihmdW5jdGlvbihhKXthLmZuLmFwcGVhcj1mdW5jdGlvbihkLGIpe3ZhciBjPWEuZXh0ZW5kKHtkYXRhOnVuZGVmaW5lZCxvbmU6dHJ1ZSxhY2NYOjAsYWNjWTowfSxiKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGc9YSh0aGlzKTtnLmFwcGVhcmVkPWZhbHNlO2lmKCFkKXtnLnRyaWdnZXIoXCJhcHBlYXJcIixjLmRhdGEpO3JldHVybn12YXIgZj1hKHdpbmRvdyk7dmFyIGU9ZnVuY3Rpb24oKXtpZighZy5pcyhcIjp2aXNpYmxlXCIpKXtnLmFwcGVhcmVkPWZhbHNlO3JldHVybn12YXIgcj1mLnNjcm9sbExlZnQoKTt2YXIgcT1mLnNjcm9sbFRvcCgpO3ZhciBsPWcub2Zmc2V0KCk7dmFyIHM9bC5sZWZ0O3ZhciBwPWwudG9wO3ZhciBpPWMuYWNjWDt2YXIgdD1jLmFjY1k7dmFyIGs9Zy5oZWlnaHQoKTt2YXIgaj1mLmhlaWdodCgpO3ZhciBuPWcud2lkdGgoKTt2YXIgbT1mLndpZHRoKCk7aWYocCtrK3Q+PXEmJnA8PXErait0JiZzK24raT49ciYmczw9cittK2kpe2lmKCFnLmFwcGVhcmVkKXtnLnRyaWdnZXIoXCJhcHBlYXJcIixjLmRhdGEpfX1lbHNle2cuYXBwZWFyZWQ9ZmFsc2V9fTt2YXIgaD1mdW5jdGlvbigpe2cuYXBwZWFyZWQ9dHJ1ZTtpZihjLm9uZSl7Zi51bmJpbmQoXCJzY3JvbGxcIixlKTt2YXIgaj1hLmluQXJyYXkoZSxhLmZuLmFwcGVhci5jaGVja3MpO2lmKGo+PTApe2EuZm4uYXBwZWFyLmNoZWNrcy5zcGxpY2UoaiwxKX19ZC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O2lmKGMub25lKXtnLm9uZShcImFwcGVhclwiLGMuZGF0YSxoKX1lbHNle2cuYmluZChcImFwcGVhclwiLGMuZGF0YSxoKX1mLnNjcm9sbChlKTthLmZuLmFwcGVhci5jaGVja3MucHVzaChlKTsoZSkoKX0pfTthLmV4dGVuZChhLmZuLmFwcGVhcix7Y2hlY2tzOltdLHRpbWVvdXQ6bnVsbCxjaGVja0FsbDpmdW5jdGlvbigpe3ZhciBiPWEuZm4uYXBwZWFyLmNoZWNrcy5sZW5ndGg7aWYoYj4wKXt3aGlsZShiLS0peyhhLmZuLmFwcGVhci5jaGVja3NbYl0pKCl9fX0scnVuOmZ1bmN0aW9uKCl7aWYoYS5mbi5hcHBlYXIudGltZW91dCl7Y2xlYXJUaW1lb3V0KGEuZm4uYXBwZWFyLnRpbWVvdXQpfWEuZm4uYXBwZWFyLnRpbWVvdXQ9c2V0VGltZW91dChhLmZuLmFwcGVhci5jaGVja0FsbCwyMCl9fSk7YS5lYWNoKFtcImFwcGVuZFwiLFwicHJlcGVuZFwiLFwiYWZ0ZXJcIixcImJlZm9yZVwiLFwiYXR0clwiLFwicmVtb3ZlQXR0clwiLFwiYWRkQ2xhc3NcIixcInJlbW92ZUNsYXNzXCIsXCJ0b2dnbGVDbGFzc1wiLFwicmVtb3ZlXCIsXCJjc3NcIixcInNob3dcIixcImhpZGVcIl0sZnVuY3Rpb24oYyxkKXt2YXIgYj1hLmZuW2RdO2lmKGIpe2EuZm5bZF09ZnVuY3Rpb24oKXt2YXIgZT1iLmFwcGx5KHRoaXMsYXJndW1lbnRzKTthLmZuLmFwcGVhci5ydW4oKTtyZXR1cm4gZX19fSl9KShqUXVlcnkpO1xuXG4vKiogUGFyYWxsYXhcblx0aHR0cDovL3d3dy5pYW5sdW5uLmNvLnVrL3BsdWdpbnMvanF1ZXJ5LXBhcmFsbGF4L1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG4oZnVuY3Rpb24oYSl7dmFyIGI9YSh3aW5kb3cpO3ZhciBjPWIuaGVpZ2h0KCk7Yi5yZXNpemUoZnVuY3Rpb24oKXtjPWIuaGVpZ2h0KCl9KTthLmZuLnBhcmFsbGF4PWZ1bmN0aW9uKGUsZCxnKXt2YXIgaT1hKHRoaXMpO3ZhciBqO3ZhciBoO3ZhciBmPTA7ZnVuY3Rpb24gaygpe2kuZWFjaChmdW5jdGlvbigpe2g9aS5vZmZzZXQoKS50b3B9KTtpZihnKXtqPWZ1bmN0aW9uKG0pe3JldHVybiBtLm91dGVySGVpZ2h0KHRydWUpfX1lbHNle2o9ZnVuY3Rpb24obSl7cmV0dXJuIG0uaGVpZ2h0KCl9fWlmKGFyZ3VtZW50cy5sZW5ndGg8MXx8ZT09PW51bGwpe2U9XCI1MCVcIn1pZihhcmd1bWVudHMubGVuZ3RoPDJ8fGQ9PT1udWxsKXtkPTAuNX1pZihhcmd1bWVudHMubGVuZ3RoPDN8fGc9PT1udWxsKXtnPXRydWV9dmFyIGw9Yi5zY3JvbGxUb3AoKTtpLmVhY2goZnVuY3Rpb24oKXt2YXIgbj1hKHRoaXMpO3ZhciBvPW4ub2Zmc2V0KCkudG9wO3ZhciBtPWoobik7aWYobyttPGx8fG8+bCtjKXtyZXR1cm59aS5jc3MoXCJiYWNrZ3JvdW5kUG9zaXRpb25cIixlK1wiIFwiK01hdGgucm91bmQoKGgtbCkqZCkrXCJweFwiKX0pfWIuYmluZChcInNjcm9sbFwiLGspLnJlc2l6ZShrKTtrKCl9fSkoalF1ZXJ5KTtcblxuLyoqIGpRdWVyeSBFYXNpbmcgdjEuM1xuXHRodHRwOi8vZ3NnZC5jby51ay9zYW5kYm94L2pxdWVyeS9lYXNpbmcvXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKi9cbmpRdWVyeS5lYXNpbmcuanN3aW5nPWpRdWVyeS5lYXNpbmcuc3dpbmc7alF1ZXJ5LmV4dGVuZChqUXVlcnkuZWFzaW5nLHtkZWY6XCJlYXNlT3V0UXVhZFwiLHN3aW5nOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGpRdWVyeS5lYXNpbmdbalF1ZXJ5LmVhc2luZy5kZWZdKGUsZixhLGgsZyl9LGVhc2VJblF1YWQ6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCooZi89ZykqZithfSxlYXNlT3V0UXVhZDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiAtaCooZi89ZykqKGYtMikrYX0sZWFzZUluT3V0UXVhZDpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqZipmK2F9cmV0dXJuIC1oLzIqKCgtLWYpKihmLTIpLTEpK2F9LGVhc2VJbkN1YmljOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGgqKGYvPWcpKmYqZithfSxlYXNlT3V0Q3ViaWM6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCooKGY9Zi9nLTEpKmYqZisxKSthfSxlYXNlSW5PdXRDdWJpYzpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqZipmKmYrYX1yZXR1cm4gaC8yKigoZi09MikqZipmKzIpK2F9LGVhc2VJblF1YXJ0OmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGgqKGYvPWcpKmYqZipmK2F9LGVhc2VPdXRRdWFydDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiAtaCooKGY9Zi9nLTEpKmYqZipmLTEpK2F9LGVhc2VJbk91dFF1YXJ0OmZ1bmN0aW9uKGUsZixhLGgsZyl7aWYoKGYvPWcvMik8MSl7cmV0dXJuIGgvMipmKmYqZipmK2F9cmV0dXJuIC1oLzIqKChmLT0yKSpmKmYqZi0yKSthfSxlYXNlSW5RdWludDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiBoKihmLz1nKSpmKmYqZipmK2F9LGVhc2VPdXRRdWludDpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiBoKigoZj1mL2ctMSkqZipmKmYqZisxKSthfSxlYXNlSW5PdXRRdWludDpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqZipmKmYqZipmK2F9cmV0dXJuIGgvMiooKGYtPTIpKmYqZipmKmYrMikrYX0sZWFzZUluU2luZTpmdW5jdGlvbihlLGYsYSxoLGcpe3JldHVybiAtaCpNYXRoLmNvcyhmL2cqKE1hdGguUEkvMikpK2grYX0sZWFzZU91dFNpbmU6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCpNYXRoLnNpbihmL2cqKE1hdGguUEkvMikpK2F9LGVhc2VJbk91dFNpbmU6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gLWgvMiooTWF0aC5jb3MoTWF0aC5QSSpmL2cpLTEpK2F9LGVhc2VJbkV4cG86ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4oZj09MCk/YTpoKk1hdGgucG93KDIsMTAqKGYvZy0xKSkrYX0sZWFzZU91dEV4cG86ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4oZj09Zyk/YStoOmgqKC1NYXRoLnBvdygyLC0xMCpmL2cpKzEpK2F9LGVhc2VJbk91dEV4cG86ZnVuY3Rpb24oZSxmLGEsaCxnKXtpZihmPT0wKXtyZXR1cm4gYX1pZihmPT1nKXtyZXR1cm4gYStofWlmKChmLz1nLzIpPDEpe3JldHVybiBoLzIqTWF0aC5wb3coMiwxMCooZi0xKSkrYX1yZXR1cm4gaC8yKigtTWF0aC5wb3coMiwtMTAqLS1mKSsyKSthfSxlYXNlSW5DaXJjOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIC1oKihNYXRoLnNxcnQoMS0oZi89ZykqZiktMSkrYX0sZWFzZU91dENpcmM6ZnVuY3Rpb24oZSxmLGEsaCxnKXtyZXR1cm4gaCpNYXRoLnNxcnQoMS0oZj1mL2ctMSkqZikrYX0sZWFzZUluT3V0Q2lyYzpmdW5jdGlvbihlLGYsYSxoLGcpe2lmKChmLz1nLzIpPDEpe3JldHVybiAtaC8yKihNYXRoLnNxcnQoMS1mKmYpLTEpK2F9cmV0dXJuIGgvMiooTWF0aC5zcXJ0KDEtKGYtPTIpKmYpKzEpK2F9LGVhc2VJbkVsYXN0aWM6ZnVuY3Rpb24oZixoLGUsbCxrKXt2YXIgaT0xLjcwMTU4O3ZhciBqPTA7dmFyIGc9bDtpZihoPT0wKXtyZXR1cm4gZX1pZigoaC89ayk9PTEpe3JldHVybiBlK2x9aWYoIWope2o9ayowLjN9aWYoZzxNYXRoLmFicyhsKSl7Zz1sO3ZhciBpPWovNH1lbHNle3ZhciBpPWovKDIqTWF0aC5QSSkqTWF0aC5hc2luKGwvZyl9cmV0dXJuIC0oZypNYXRoLnBvdygyLDEwKihoLT0xKSkqTWF0aC5zaW4oKGgqay1pKSooMipNYXRoLlBJKS9qKSkrZX0sZWFzZU91dEVsYXN0aWM6ZnVuY3Rpb24oZixoLGUsbCxrKXt2YXIgaT0xLjcwMTU4O3ZhciBqPTA7dmFyIGc9bDtpZihoPT0wKXtyZXR1cm4gZX1pZigoaC89ayk9PTEpe3JldHVybiBlK2x9aWYoIWope2o9ayowLjN9aWYoZzxNYXRoLmFicyhsKSl7Zz1sO3ZhciBpPWovNH1lbHNle3ZhciBpPWovKDIqTWF0aC5QSSkqTWF0aC5hc2luKGwvZyl9cmV0dXJuIGcqTWF0aC5wb3coMiwtMTAqaCkqTWF0aC5zaW4oKGgqay1pKSooMipNYXRoLlBJKS9qKStsK2V9LGVhc2VJbk91dEVsYXN0aWM6ZnVuY3Rpb24oZixoLGUsbCxrKXt2YXIgaT0xLjcwMTU4O3ZhciBqPTA7dmFyIGc9bDtpZihoPT0wKXtyZXR1cm4gZX1pZigoaC89ay8yKT09Mil7cmV0dXJuIGUrbH1pZighail7aj1rKigwLjMqMS41KX1pZihnPE1hdGguYWJzKGwpKXtnPWw7dmFyIGk9ai80fWVsc2V7dmFyIGk9ai8oMipNYXRoLlBJKSpNYXRoLmFzaW4obC9nKX1pZihoPDEpe3JldHVybiAtMC41KihnKk1hdGgucG93KDIsMTAqKGgtPTEpKSpNYXRoLnNpbigoaCprLWkpKigyKk1hdGguUEkpL2opKStlfXJldHVybiBnKk1hdGgucG93KDIsLTEwKihoLT0xKSkqTWF0aC5zaW4oKGgqay1pKSooMipNYXRoLlBJKS9qKSowLjUrbCtlfSxlYXNlSW5CYWNrOmZ1bmN0aW9uKGUsZixhLGksaCxnKXtpZihnPT11bmRlZmluZWQpe2c9MS43MDE1OH1yZXR1cm4gaSooZi89aCkqZiooKGcrMSkqZi1nKSthfSxlYXNlT3V0QmFjazpmdW5jdGlvbihlLGYsYSxpLGgsZyl7aWYoZz09dW5kZWZpbmVkKXtnPTEuNzAxNTh9cmV0dXJuIGkqKChmPWYvaC0xKSpmKigoZysxKSpmK2cpKzEpK2F9LGVhc2VJbk91dEJhY2s6ZnVuY3Rpb24oZSxmLGEsaSxoLGcpe2lmKGc9PXVuZGVmaW5lZCl7Zz0xLjcwMTU4fWlmKChmLz1oLzIpPDEpe3JldHVybiBpLzIqKGYqZiooKChnKj0oMS41MjUpKSsxKSpmLWcpKSthfXJldHVybiBpLzIqKChmLT0yKSpmKigoKGcqPSgxLjUyNSkpKzEpKmYrZykrMikrYX0sZWFzZUluQm91bmNlOmZ1bmN0aW9uKGUsZixhLGgsZyl7cmV0dXJuIGgtalF1ZXJ5LmVhc2luZy5lYXNlT3V0Qm91bmNlKGUsZy1mLDAsaCxnKSthfSxlYXNlT3V0Qm91bmNlOmZ1bmN0aW9uKGUsZixhLGgsZyl7aWYoKGYvPWcpPCgxLzIuNzUpKXtyZXR1cm4gaCooNy41NjI1KmYqZikrYX1lbHNle2lmKGY8KDIvMi43NSkpe3JldHVybiBoKig3LjU2MjUqKGYtPSgxLjUvMi43NSkpKmYrMC43NSkrYX1lbHNle2lmKGY8KDIuNS8yLjc1KSl7cmV0dXJuIGgqKDcuNTYyNSooZi09KDIuMjUvMi43NSkpKmYrMC45Mzc1KSthfWVsc2V7cmV0dXJuIGgqKDcuNTYyNSooZi09KDIuNjI1LzIuNzUpKSpmKzAuOTg0Mzc1KSthfX19fSxlYXNlSW5PdXRCb3VuY2U6ZnVuY3Rpb24oZSxmLGEsaCxnKXtpZihmPGcvMil7cmV0dXJuIGpRdWVyeS5lYXNpbmcuZWFzZUluQm91bmNlKGUsZioyLDAsaCxnKSowLjUrYX1yZXR1cm4galF1ZXJ5LmVhc2luZy5lYXNlT3V0Qm91bmNlKGUsZioyLWcsMCxoLGcpKjAuNStoKjAuNSthfX0pO1xuXG4vKiogV09XIC0gdjEuMC4zIC0gMjAxNS0wMS0xNFxuXHRodHRwOi8vbXluYW1laXNtYXR0aGlldS5jb20vV09XL1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKiovXG4oZnVuY3Rpb24oKXt2YXIgYSxiLGMsZCxlLGY9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShiLGFyZ3VtZW50cyl9fSxnPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0wLGM9dGhpcy5sZW5ndGg7Yz5iO2IrKylpZihiIGluIHRoaXMmJnRoaXNbYl09PT1hKXJldHVybiBiO3JldHVybi0xfTtiPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYSgpe31yZXR1cm4gYS5wcm90b3R5cGUuZXh0ZW5kPWZ1bmN0aW9uKGEsYil7dmFyIGMsZDtmb3IoYyBpbiBiKWQ9YltjXSxudWxsPT1hW2NdJiYoYVtjXT1kKTtyZXR1cm4gYX0sYS5wcm90b3R5cGUuaXNNb2JpbGU9ZnVuY3Rpb24oYSl7cmV0dXJuL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KGEpfSxhLnByb3RvdHlwZS5hZGRFdmVudD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIG51bGwhPWEuYWRkRXZlbnRMaXN0ZW5lcj9hLmFkZEV2ZW50TGlzdGVuZXIoYixjLCExKTpudWxsIT1hLmF0dGFjaEV2ZW50P2EuYXR0YWNoRXZlbnQoXCJvblwiK2IsYyk6YVtiXT1jfSxhLnByb3RvdHlwZS5yZW1vdmVFdmVudD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIG51bGwhPWEucmVtb3ZlRXZlbnRMaXN0ZW5lcj9hLnJlbW92ZUV2ZW50TGlzdGVuZXIoYixjLCExKTpudWxsIT1hLmRldGFjaEV2ZW50P2EuZGV0YWNoRXZlbnQoXCJvblwiK2IsYyk6ZGVsZXRlIGFbYl19LGEucHJvdG90eXBlLmlubmVySGVpZ2h0PWZ1bmN0aW9uKCl7cmV0dXJuXCJpbm5lckhlaWdodFwiaW4gd2luZG93P3dpbmRvdy5pbm5lckhlaWdodDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0fSxhfSgpLGM9dGhpcy5XZWFrTWFwfHx0aGlzLk1veldlYWtNYXB8fChjPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYSgpe3RoaXMua2V5cz1bXSx0aGlzLnZhbHVlcz1bXX1yZXR1cm4gYS5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGY7Zm9yKGY9dGhpcy5rZXlzLGI9ZD0wLGU9Zi5sZW5ndGg7ZT5kO2I9KytkKWlmKGM9ZltiXSxjPT09YSlyZXR1cm4gdGhpcy52YWx1ZXNbYl19LGEucHJvdG90eXBlLnNldD1mdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmLGc7Zm9yKGc9dGhpcy5rZXlzLGM9ZT0wLGY9Zy5sZW5ndGg7Zj5lO2M9KytlKWlmKGQ9Z1tjXSxkPT09YSlyZXR1cm4gdm9pZCh0aGlzLnZhbHVlc1tjXT1iKTtyZXR1cm4gdGhpcy5rZXlzLnB1c2goYSksdGhpcy52YWx1ZXMucHVzaChiKX0sYX0oKSksYT10aGlzLk11dGF0aW9uT2JzZXJ2ZXJ8fHRoaXMuV2Via2l0TXV0YXRpb25PYnNlcnZlcnx8dGhpcy5Nb3pNdXRhdGlvbk9ic2VydmVyfHwoYT1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgY29uc29sZSYmbnVsbCE9PWNvbnNvbGUmJmNvbnNvbGUud2FybihcIk11dGF0aW9uT2JzZXJ2ZXIgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXIuXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBjb25zb2xlJiZudWxsIT09Y29uc29sZSYmY29uc29sZS53YXJuKFwiV09XLmpzIGNhbm5vdCBkZXRlY3QgZG9tIG11dGF0aW9ucywgcGxlYXNlIGNhbGwgLnN5bmMoKSBhZnRlciBsb2FkaW5nIG5ldyBjb250ZW50LlwiKX1yZXR1cm4gYS5ub3RTdXBwb3J0ZWQ9ITAsYS5wcm90b3R5cGUub2JzZXJ2ZT1mdW5jdGlvbigpe30sYX0oKSksZD10aGlzLmdldENvbXB1dGVkU3R5bGV8fGZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmdldFByb3BlcnR5VmFsdWU9ZnVuY3Rpb24oYil7dmFyIGM7cmV0dXJuXCJmbG9hdFwiPT09YiYmKGI9XCJzdHlsZUZsb2F0XCIpLGUudGVzdChiKSYmYi5yZXBsYWNlKGUsZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi50b1VwcGVyQ2FzZSgpfSksKG51bGwhPShjPWEuY3VycmVudFN0eWxlKT9jW2JdOnZvaWQgMCl8fG51bGx9LHRoaXN9LGU9LyhcXC0oW2Etel0pezF9KS9nLHRoaXMuV09XPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShhKXtudWxsPT1hJiYoYT17fSksdGhpcy5zY3JvbGxDYWxsYmFjaz1mKHRoaXMuc2Nyb2xsQ2FsbGJhY2ssdGhpcyksdGhpcy5zY3JvbGxIYW5kbGVyPWYodGhpcy5zY3JvbGxIYW5kbGVyLHRoaXMpLHRoaXMuc3RhcnQ9Zih0aGlzLnN0YXJ0LHRoaXMpLHRoaXMuc2Nyb2xsZWQ9ITAsdGhpcy5jb25maWc9dGhpcy51dGlsKCkuZXh0ZW5kKGEsdGhpcy5kZWZhdWx0cyksdGhpcy5hbmltYXRpb25OYW1lQ2FjaGU9bmV3IGN9cmV0dXJuIGUucHJvdG90eXBlLmRlZmF1bHRzPXtib3hDbGFzczpcIndvd1wiLGFuaW1hdGVDbGFzczpcImFuaW1hdGVkXCIsb2Zmc2V0OjAsbW9iaWxlOiEwLGxpdmU6ITAsY2FsbGJhY2s6bnVsbH0sZS5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3ZhciBhO3JldHVybiB0aGlzLmVsZW1lbnQ9d2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcImludGVyYWN0aXZlXCI9PT0oYT1kb2N1bWVudC5yZWFkeVN0YXRlKXx8XCJjb21wbGV0ZVwiPT09YT90aGlzLnN0YXJ0KCk6dGhpcy51dGlsKCkuYWRkRXZlbnQoZG9jdW1lbnQsXCJET01Db250ZW50TG9hZGVkXCIsdGhpcy5zdGFydCksdGhpcy5maW5pc2hlZD1bXX0sZS5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt2YXIgYixjLGQsZTtpZih0aGlzLnN0b3BwZWQ9ITEsdGhpcy5ib3hlcz1mdW5jdGlvbigpe3ZhciBhLGMsZCxlO2ZvcihkPXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK3RoaXMuY29uZmlnLmJveENsYXNzKSxlPVtdLGE9MCxjPWQubGVuZ3RoO2M+YTthKyspYj1kW2FdLGUucHVzaChiKTtyZXR1cm4gZX0uY2FsbCh0aGlzKSx0aGlzLmFsbD1mdW5jdGlvbigpe3ZhciBhLGMsZCxlO2ZvcihkPXRoaXMuYm94ZXMsZT1bXSxhPTAsYz1kLmxlbmd0aDtjPmE7YSsrKWI9ZFthXSxlLnB1c2goYik7cmV0dXJuIGV9LmNhbGwodGhpcyksdGhpcy5ib3hlcy5sZW5ndGgpaWYodGhpcy5kaXNhYmxlZCgpKXRoaXMucmVzZXRTdHlsZSgpO2Vsc2UgZm9yKGU9dGhpcy5ib3hlcyxjPTAsZD1lLmxlbmd0aDtkPmM7YysrKWI9ZVtjXSx0aGlzLmFwcGx5U3R5bGUoYiwhMCk7cmV0dXJuIHRoaXMuZGlzYWJsZWQoKXx8KHRoaXMudXRpbCgpLmFkZEV2ZW50KHdpbmRvdyxcInNjcm9sbFwiLHRoaXMuc2Nyb2xsSGFuZGxlciksdGhpcy51dGlsKCkuYWRkRXZlbnQod2luZG93LFwicmVzaXplXCIsdGhpcy5zY3JvbGxIYW5kbGVyKSx0aGlzLmludGVydmFsPXNldEludGVydmFsKHRoaXMuc2Nyb2xsQ2FsbGJhY2ssNTApKSx0aGlzLmNvbmZpZy5saXZlP25ldyBhKGZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbihiKXt2YXIgYyxkLGUsZixnO2ZvcihnPVtdLGU9MCxmPWIubGVuZ3RoO2Y+ZTtlKyspZD1iW2VdLGcucHVzaChmdW5jdGlvbigpe3ZhciBhLGIsZSxmO2ZvcihlPWQuYWRkZWROb2Rlc3x8W10sZj1bXSxhPTAsYj1lLmxlbmd0aDtiPmE7YSsrKWM9ZVthXSxmLnB1c2godGhpcy5kb1N5bmMoYykpO3JldHVybiBmfS5jYWxsKGEpKTtyZXR1cm4gZ319KHRoaXMpKS5vYnNlcnZlKGRvY3VtZW50LmJvZHkse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSk6dm9pZCAwfSxlLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3RvcHBlZD0hMCx0aGlzLnV0aWwoKS5yZW1vdmVFdmVudCh3aW5kb3csXCJzY3JvbGxcIix0aGlzLnNjcm9sbEhhbmRsZXIpLHRoaXMudXRpbCgpLnJlbW92ZUV2ZW50KHdpbmRvdyxcInJlc2l6ZVwiLHRoaXMuc2Nyb2xsSGFuZGxlciksbnVsbCE9dGhpcy5pbnRlcnZhbD9jbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpOnZvaWQgMH0sZS5wcm90b3R5cGUuc3luYz1mdW5jdGlvbigpe3JldHVybiBhLm5vdFN1cHBvcnRlZD90aGlzLmRvU3luYyh0aGlzLmVsZW1lbnQpOnZvaWQgMH0sZS5wcm90b3R5cGUuZG9TeW5jPWZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGY7aWYobnVsbD09YSYmKGE9dGhpcy5lbGVtZW50KSwxPT09YS5ub2RlVHlwZSl7Zm9yKGE9YS5wYXJlbnROb2RlfHxhLGU9YS5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK3RoaXMuY29uZmlnLmJveENsYXNzKSxmPVtdLGM9MCxkPWUubGVuZ3RoO2Q+YztjKyspYj1lW2NdLGcuY2FsbCh0aGlzLmFsbCxiKTwwPyh0aGlzLmJveGVzLnB1c2goYiksdGhpcy5hbGwucHVzaChiKSx0aGlzLnN0b3BwZWR8fHRoaXMuZGlzYWJsZWQoKT90aGlzLnJlc2V0U3R5bGUoKTp0aGlzLmFwcGx5U3R5bGUoYiwhMCksZi5wdXNoKHRoaXMuc2Nyb2xsZWQ9ITApKTpmLnB1c2godm9pZCAwKTtyZXR1cm4gZn19LGUucHJvdG90eXBlLnNob3c9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYXBwbHlTdHlsZShhKSxhLmNsYXNzTmFtZT1cIlwiK2EuY2xhc3NOYW1lK1wiIFwiK3RoaXMuY29uZmlnLmFuaW1hdGVDbGFzcyxudWxsIT10aGlzLmNvbmZpZy5jYWxsYmFjaz90aGlzLmNvbmZpZy5jYWxsYmFjayhhKTp2b2lkIDB9LGUucHJvdG90eXBlLmFwcGx5U3R5bGU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU7cmV0dXJuIGQ9YS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdvdy1kdXJhdGlvblwiKSxjPWEuZ2V0QXR0cmlidXRlKFwiZGF0YS13b3ctZGVsYXlcIiksZT1hLmdldEF0dHJpYnV0ZShcImRhdGEtd293LWl0ZXJhdGlvblwiKSx0aGlzLmFuaW1hdGUoZnVuY3Rpb24oZil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGYuY3VzdG9tU3R5bGUoYSxiLGQsYyxlKX19KHRoaXMpKX0sZS5wcm90b3R5cGUuYW5pbWF0ZT1mdW5jdGlvbigpe3JldHVyblwicmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJpbiB3aW5kb3c/ZnVuY3Rpb24oYSl7cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYSl9OmZ1bmN0aW9uKGEpe3JldHVybiBhKCl9fSgpLGUucHJvdG90eXBlLnJlc2V0U3R5bGU9ZnVuY3Rpb24oKXt2YXIgYSxiLGMsZCxlO2ZvcihkPXRoaXMuYm94ZXMsZT1bXSxiPTAsYz1kLmxlbmd0aDtjPmI7YisrKWE9ZFtiXSxlLnB1c2goYS5zdHlsZS52aXNpYmlsaXR5PVwidmlzaWJsZVwiKTtyZXR1cm4gZX0sZS5wcm90b3R5cGUuY3VzdG9tU3R5bGU9ZnVuY3Rpb24oYSxiLGMsZCxlKXtyZXR1cm4gYiYmdGhpcy5jYWNoZUFuaW1hdGlvbk5hbWUoYSksYS5zdHlsZS52aXNpYmlsaXR5PWI/XCJoaWRkZW5cIjpcInZpc2libGVcIixjJiZ0aGlzLnZlbmRvclNldChhLnN0eWxlLHthbmltYXRpb25EdXJhdGlvbjpjfSksZCYmdGhpcy52ZW5kb3JTZXQoYS5zdHlsZSx7YW5pbWF0aW9uRGVsYXk6ZH0pLGUmJnRoaXMudmVuZG9yU2V0KGEuc3R5bGUse2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OmV9KSx0aGlzLnZlbmRvclNldChhLnN0eWxlLHthbmltYXRpb25OYW1lOmI/XCJub25lXCI6dGhpcy5jYWNoZWRBbmltYXRpb25OYW1lKGEpfSksYX0sZS5wcm90b3R5cGUudmVuZG9ycz1bXCJtb3pcIixcIndlYmtpdFwiXSxlLnByb3RvdHlwZS52ZW5kb3JTZXQ9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGUsZjtmPVtdO2ZvcihjIGluIGIpZD1iW2NdLGFbXCJcIitjXT1kLGYucHVzaChmdW5jdGlvbigpe3ZhciBiLGYsZyxoO2ZvcihnPXRoaXMudmVuZG9ycyxoPVtdLGI9MCxmPWcubGVuZ3RoO2Y+YjtiKyspZT1nW2JdLGgucHVzaChhW1wiXCIrZStjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Muc3Vic3RyKDEpXT1kKTtyZXR1cm4gaH0uY2FsbCh0aGlzKSk7cmV0dXJuIGZ9LGUucHJvdG90eXBlLnZlbmRvckNTUz1mdW5jdGlvbihhLGIpe3ZhciBjLGUsZixnLGgsaTtmb3IoZT1kKGEpLGM9ZS5nZXRQcm9wZXJ0eUNTU1ZhbHVlKGIpLGk9dGhpcy52ZW5kb3JzLGc9MCxoPWkubGVuZ3RoO2g+ZztnKyspZj1pW2ddLGM9Y3x8ZS5nZXRQcm9wZXJ0eUNTU1ZhbHVlKFwiLVwiK2YrXCItXCIrYik7cmV0dXJuIGN9LGUucHJvdG90eXBlLmFuaW1hdGlvbk5hbWU9ZnVuY3Rpb24oYSl7dmFyIGI7dHJ5e2I9dGhpcy52ZW5kb3JDU1MoYSxcImFuaW1hdGlvbi1uYW1lXCIpLmNzc1RleHR9Y2F0Y2goYyl7Yj1kKGEpLmdldFByb3BlcnR5VmFsdWUoXCJhbmltYXRpb24tbmFtZVwiKX1yZXR1cm5cIm5vbmVcIj09PWI/XCJcIjpifSxlLnByb3RvdHlwZS5jYWNoZUFuaW1hdGlvbk5hbWU9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlLnNldChhLHRoaXMuYW5pbWF0aW9uTmFtZShhKSl9LGUucHJvdG90eXBlLmNhY2hlZEFuaW1hdGlvbk5hbWU9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlLmdldChhKX0sZS5wcm90b3R5cGUuc2Nyb2xsSGFuZGxlcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNjcm9sbGVkPSEwfSxlLnByb3RvdHlwZS5zY3JvbGxDYWxsYmFjaz1mdW5jdGlvbigpe3ZhciBhO3JldHVybiF0aGlzLnNjcm9sbGVkfHwodGhpcy5zY3JvbGxlZD0hMSx0aGlzLmJveGVzPWZ1bmN0aW9uKCl7dmFyIGIsYyxkLGU7Zm9yKGQ9dGhpcy5ib3hlcyxlPVtdLGI9MCxjPWQubGVuZ3RoO2M+YjtiKyspYT1kW2JdLGEmJih0aGlzLmlzVmlzaWJsZShhKT90aGlzLnNob3coYSk6ZS5wdXNoKGEpKTtyZXR1cm4gZX0uY2FsbCh0aGlzKSx0aGlzLmJveGVzLmxlbmd0aHx8dGhpcy5jb25maWcubGl2ZSk/dm9pZCAwOnRoaXMuc3RvcCgpfSxlLnByb3RvdHlwZS5vZmZzZXRUb3A9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiO3ZvaWQgMD09PWEub2Zmc2V0VG9wOylhPWEucGFyZW50Tm9kZTtmb3IoYj1hLm9mZnNldFRvcDthPWEub2Zmc2V0UGFyZW50OyliKz1hLm9mZnNldFRvcDtyZXR1cm4gYn0sZS5wcm90b3R5cGUuaXNWaXNpYmxlPWZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlLGY7cmV0dXJuIGM9YS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdvdy1vZmZzZXRcIil8fHRoaXMuY29uZmlnLm9mZnNldCxmPXdpbmRvdy5wYWdlWU9mZnNldCxlPWYrTWF0aC5taW4odGhpcy5lbGVtZW50LmNsaWVudEhlaWdodCx0aGlzLnV0aWwoKS5pbm5lckhlaWdodCgpKS1jLGQ9dGhpcy5vZmZzZXRUb3AoYSksYj1kK2EuY2xpZW50SGVpZ2h0LGU+PWQmJmI+PWZ9LGUucHJvdG90eXBlLnV0aWw9ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9dGhpcy5fdXRpbD90aGlzLl91dGlsOnRoaXMuX3V0aWw9bmV3IGJ9LGUucHJvdG90eXBlLmRpc2FibGVkPWZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMuY29uZmlnLm1vYmlsZSYmdGhpcy51dGlsKCkuaXNNb2JpbGUobmF2aWdhdG9yLnVzZXJBZ2VudCl9LGV9KCl9KS5jYWxsKHRoaXMpO1xuXG4vKiogTW9kZXJuaXpyIDIuNy4xXG5cdGh0dHA6Ly9tb2Rlcm5penIuY29tL2Rvd25sb2FkLyMtY3NzdHJhbnNmb3JtczNkLWNzc3RyYW5zaXRpb25zLXZpZGVvLXRvdWNoLXNoaXYtY3NzY2xhc3Nlcy1hZGR0ZXN0LXByZWZpeGVkLXRlc3RzdHlsZXMtdGVzdHByb3AtdGVzdGFsbHByb3BzLWhhc2V2ZW50LXByZWZpeGVzLWRvbXByZWZpeGVzLWxvYWRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqL1xuO3dpbmRvdy5Nb2Rlcm5penI9ZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIEEoYSl7ai5jc3NUZXh0PWF9ZnVuY3Rpb24gQihhLGIpe3JldHVybiBBKG0uam9pbihhK1wiO1wiKSsoYnx8XCJcIikpfWZ1bmN0aW9uIEMoYSxiKXtyZXR1cm4gdHlwZW9mIGE9PT1ifWZ1bmN0aW9uIEQoYSxiKXtyZXR1cm4hIX4oXCJcIithKS5pbmRleE9mKGIpfWZ1bmN0aW9uIEUoYSxiKXtmb3IodmFyIGQgaW4gYSl7dmFyIGU9YVtkXTtpZighRChlLFwiLVwiKSYmaltlXSE9PWMpcmV0dXJuIGI9PVwicGZ4XCI/ZTohMH1yZXR1cm4hMX1mdW5jdGlvbiBGKGEsYixkKXtmb3IodmFyIGUgaW4gYSl7dmFyIGY9YlthW2VdXTtpZihmIT09YylyZXR1cm4gZD09PSExP2FbZV06QyhmLFwiZnVuY3Rpb25cIik/Zi5iaW5kKGR8fGIpOmZ9cmV0dXJuITF9ZnVuY3Rpb24gRyhhLGIsYyl7dmFyIGQ9YS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSthLnNsaWNlKDEpLGU9KGErXCIgXCIrby5qb2luKGQrXCIgXCIpK2QpLnNwbGl0KFwiIFwiKTtyZXR1cm4gQyhiLFwic3RyaW5nXCIpfHxDKGIsXCJ1bmRlZmluZWRcIik/RShlLGIpOihlPShhK1wiIFwiK3Auam9pbihkK1wiIFwiKStkKS5zcGxpdChcIiBcIiksRihlLGIsYykpfXZhciBkPVwiMi43LjFcIixlPXt9LGY9ITAsZz1iLmRvY3VtZW50RWxlbWVudCxoPVwibW9kZXJuaXpyXCIsaT1iLmNyZWF0ZUVsZW1lbnQoaCksaj1pLnN0eWxlLGssbD17fS50b1N0cmluZyxtPVwiIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtIFwiLnNwbGl0KFwiIFwiKSxuPVwiV2Via2l0IE1veiBPIG1zXCIsbz1uLnNwbGl0KFwiIFwiKSxwPW4udG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIikscT17fSxyPXt9LHM9e30sdD1bXSx1PXQuc2xpY2Usdix3PWZ1bmN0aW9uKGEsYyxkLGUpe3ZhciBmLGksaixrLGw9Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLG09Yi5ib2R5LG49bXx8Yi5jcmVhdGVFbGVtZW50KFwiYm9keVwiKTtpZihwYXJzZUludChkLDEwKSl3aGlsZShkLS0paj1iLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksai5pZD1lP2VbZF06aCsoZCsxKSxsLmFwcGVuZENoaWxkKGopO3JldHVybiBmPVtcIiYjMTczO1wiLCc8c3R5bGUgaWQ9XCJzJyxoLCdcIj4nLGEsXCI8L3N0eWxlPlwiXS5qb2luKFwiXCIpLGwuaWQ9aCwobT9sOm4pLmlubmVySFRNTCs9ZixuLmFwcGVuZENoaWxkKGwpLG18fChuLnN0eWxlLmJhY2tncm91bmQ9XCJcIixuLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsaz1nLnN0eWxlLm92ZXJmbG93LGcuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixnLmFwcGVuZENoaWxkKG4pKSxpPWMobCxhKSxtP2wucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsKToobi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pLGcuc3R5bGUub3ZlcmZsb3c9ayksISFpfSx4PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZChkLGUpe2U9ZXx8Yi5jcmVhdGVFbGVtZW50KGFbZF18fFwiZGl2XCIpLGQ9XCJvblwiK2Q7dmFyIGY9ZCBpbiBlO3JldHVybiBmfHwoZS5zZXRBdHRyaWJ1dGV8fChlPWIuY3JlYXRlRWxlbWVudChcImRpdlwiKSksZS5zZXRBdHRyaWJ1dGUmJmUucmVtb3ZlQXR0cmlidXRlJiYoZS5zZXRBdHRyaWJ1dGUoZCxcIlwiKSxmPUMoZVtkXSxcImZ1bmN0aW9uXCIpLEMoZVtkXSxcInVuZGVmaW5lZFwiKXx8KGVbZF09YyksZS5yZW1vdmVBdHRyaWJ1dGUoZCkpKSxlPW51bGwsZn12YXIgYT17c2VsZWN0OlwiaW5wdXRcIixjaGFuZ2U6XCJpbnB1dFwiLHN1Ym1pdDpcImZvcm1cIixyZXNldDpcImZvcm1cIixlcnJvcjpcImltZ1wiLGxvYWQ6XCJpbWdcIixhYm9ydDpcImltZ1wifTtyZXR1cm4gZH0oKSx5PXt9Lmhhc093blByb3BlcnR5LHo7IUMoeSxcInVuZGVmaW5lZFwiKSYmIUMoeS5jYWxsLFwidW5kZWZpbmVkXCIpP3o9ZnVuY3Rpb24oYSxiKXtyZXR1cm4geS5jYWxsKGEsYil9Ono9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYiBpbiBhJiZDKGEuY29uc3RydWN0b3IucHJvdG90eXBlW2JdLFwidW5kZWZpbmVkXCIpfSxGdW5jdGlvbi5wcm90b3R5cGUuYmluZHx8KEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPWZ1bmN0aW9uKGIpe3ZhciBjPXRoaXM7aWYodHlwZW9mIGMhPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgVHlwZUVycm9yO3ZhciBkPXUuY2FsbChhcmd1bWVudHMsMSksZT1mdW5jdGlvbigpe2lmKHRoaXMgaW5zdGFuY2VvZiBlKXt2YXIgYT1mdW5jdGlvbigpe307YS5wcm90b3R5cGU9Yy5wcm90b3R5cGU7dmFyIGY9bmV3IGEsZz1jLmFwcGx5KGYsZC5jb25jYXQodS5jYWxsKGFyZ3VtZW50cykpKTtyZXR1cm4gT2JqZWN0KGcpPT09Zz9nOmZ9cmV0dXJuIGMuYXBwbHkoYixkLmNvbmNhdCh1LmNhbGwoYXJndW1lbnRzKSkpfTtyZXR1cm4gZX0pLHEudG91Y2g9ZnVuY3Rpb24oKXt2YXIgYztyZXR1cm5cIm9udG91Y2hzdGFydFwiaW4gYXx8YS5Eb2N1bWVudFRvdWNoJiZiIGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaD9jPSEwOncoW1wiQG1lZGlhIChcIixtLmpvaW4oXCJ0b3VjaC1lbmFibGVkKSwoXCIpLGgsXCIpXCIsXCJ7I21vZGVybml6cnt0b3A6OXB4O3Bvc2l0aW9uOmFic29sdXRlfX1cIl0uam9pbihcIlwiKSxmdW5jdGlvbihhKXtjPWEub2Zmc2V0VG9wPT09OX0pLGN9LHEuY3NzdHJhbnNmb3JtczNkPWZ1bmN0aW9uKCl7dmFyIGE9ISFHKFwicGVyc3BlY3RpdmVcIik7cmV0dXJuIGEmJlwid2Via2l0UGVyc3BlY3RpdmVcImluIGcuc3R5bGUmJncoXCJAbWVkaWEgKHRyYW5zZm9ybS0zZCksKC13ZWJraXQtdHJhbnNmb3JtLTNkKXsjbW9kZXJuaXpye2xlZnQ6OXB4O3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDozcHg7fX1cIixmdW5jdGlvbihiLGMpe2E9Yi5vZmZzZXRMZWZ0PT09OSYmYi5vZmZzZXRIZWlnaHQ9PT0zfSksYX0scS5jc3N0cmFuc2l0aW9ucz1mdW5jdGlvbigpe3JldHVybiBHKFwidHJhbnNpdGlvblwiKX0scS52aWRlbz1mdW5jdGlvbigpe3ZhciBhPWIuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpLGM9ITE7dHJ5e2lmKGM9ISFhLmNhblBsYXlUeXBlKWM9bmV3IEJvb2xlYW4oYyksYy5vZ2c9YS5jYW5QbGF5VHlwZSgndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmFcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGMuaDI2ND1hLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxjLndlYm09YS5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpfWNhdGNoKGQpe31yZXR1cm4gY307Zm9yKHZhciBIIGluIHEpeihxLEgpJiYodj1ILnRvTG93ZXJDYXNlKCksZVt2XT1xW0hdKCksdC5wdXNoKChlW3ZdP1wiXCI6XCJuby1cIikrdikpO3JldHVybiBlLmFkZFRlc3Q9ZnVuY3Rpb24oYSxiKXtpZih0eXBlb2YgYT09XCJvYmplY3RcIilmb3IodmFyIGQgaW4gYSl6KGEsZCkmJmUuYWRkVGVzdChkLGFbZF0pO2Vsc2V7YT1hLnRvTG93ZXJDYXNlKCk7aWYoZVthXSE9PWMpcmV0dXJuIGU7Yj10eXBlb2YgYj09XCJmdW5jdGlvblwiP2IoKTpiLHR5cGVvZiBmIT1cInVuZGVmaW5lZFwiJiZmJiYoZy5jbGFzc05hbWUrPVwiIFwiKyhiP1wiXCI6XCJuby1cIikrYSksZVthXT1ifXJldHVybiBlfSxBKFwiXCIpLGk9az1udWxsLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gbChhLGIpe3ZhciBjPWEuY3JlYXRlRWxlbWVudChcInBcIiksZD1hLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXXx8YS5kb2N1bWVudEVsZW1lbnQ7cmV0dXJuIGMuaW5uZXJIVE1MPVwieDxzdHlsZT5cIitiK1wiPC9zdHlsZT5cIixkLmluc2VydEJlZm9yZShjLmxhc3RDaGlsZCxkLmZpcnN0Q2hpbGQpfWZ1bmN0aW9uIG0oKXt2YXIgYT1zLmVsZW1lbnRzO3JldHVybiB0eXBlb2YgYT09XCJzdHJpbmdcIj9hLnNwbGl0KFwiIFwiKTphfWZ1bmN0aW9uIG4oYSl7dmFyIGI9althW2hdXTtyZXR1cm4gYnx8KGI9e30saSsrLGFbaF09aSxqW2ldPWIpLGJ9ZnVuY3Rpb24gbyhhLGMsZCl7Y3x8KGM9Yik7aWYoaylyZXR1cm4gYy5jcmVhdGVFbGVtZW50KGEpO2R8fChkPW4oYykpO3ZhciBnO3JldHVybiBkLmNhY2hlW2FdP2c9ZC5jYWNoZVthXS5jbG9uZU5vZGUoKTpmLnRlc3QoYSk/Zz0oZC5jYWNoZVthXT1kLmNyZWF0ZUVsZW0oYSkpLmNsb25lTm9kZSgpOmc9ZC5jcmVhdGVFbGVtKGEpLGcuY2FuSGF2ZUNoaWxkcmVuJiYhZS50ZXN0KGEpJiYhZy50YWdVcm4/ZC5mcmFnLmFwcGVuZENoaWxkKGcpOmd9ZnVuY3Rpb24gcChhLGMpe2F8fChhPWIpO2lmKGspcmV0dXJuIGEuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2M9Y3x8bihhKTt2YXIgZD1jLmZyYWcuY2xvbmVOb2RlKCksZT0wLGY9bSgpLGc9Zi5sZW5ndGg7Zm9yKDtlPGc7ZSsrKWQuY3JlYXRlRWxlbWVudChmW2VdKTtyZXR1cm4gZH1mdW5jdGlvbiBxKGEsYil7Yi5jYWNoZXx8KGIuY2FjaGU9e30sYi5jcmVhdGVFbGVtPWEuY3JlYXRlRWxlbWVudCxiLmNyZWF0ZUZyYWc9YS5jcmVhdGVEb2N1bWVudEZyYWdtZW50LGIuZnJhZz1iLmNyZWF0ZUZyYWcoKSksYS5jcmVhdGVFbGVtZW50PWZ1bmN0aW9uKGMpe3JldHVybiBzLnNoaXZNZXRob2RzP28oYyxhLGIpOmIuY3JlYXRlRWxlbShjKX0sYS5jcmVhdGVEb2N1bWVudEZyYWdtZW50PUZ1bmN0aW9uKFwiaCxmXCIsXCJyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj1mLmNsb25lTm9kZSgpLGM9bi5jcmVhdGVFbGVtZW50O2guc2hpdk1ldGhvZHMmJihcIittKCkuam9pbigpLnJlcGxhY2UoL1tcXHdcXC1dKy9nLGZ1bmN0aW9uKGEpe3JldHVybiBiLmNyZWF0ZUVsZW0oYSksYi5mcmFnLmNyZWF0ZUVsZW1lbnQoYSksJ2MoXCInK2ErJ1wiKSd9KStcIik7cmV0dXJuIG59XCIpKHMsYi5mcmFnKX1mdW5jdGlvbiByKGEpe2F8fChhPWIpO3ZhciBjPW4oYSk7cmV0dXJuIHMuc2hpdkNTUyYmIWcmJiFjLmhhc0NTUyYmKGMuaGFzQ1NTPSEhbChhLFwiYXJ0aWNsZSxhc2lkZSxkaWFsb2csZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGhlYWRlcixoZ3JvdXAsbWFpbixuYXYsc2VjdGlvbntkaXNwbGF5OmJsb2NrfW1hcmt7YmFja2dyb3VuZDojRkYwO2NvbG9yOiMwMDB9dGVtcGxhdGV7ZGlzcGxheTpub25lfVwiKSksa3x8cShhLGMpLGF9dmFyIGM9XCIzLjcuMFwiLGQ9YS5odG1sNXx8e30sZT0vXjx8Xig/OmJ1dHRvbnxtYXB8c2VsZWN0fHRleHRhcmVhfG9iamVjdHxpZnJhbWV8b3B0aW9ufG9wdGdyb3VwKSQvaSxmPS9eKD86YXxifGNvZGV8ZGl2fGZpZWxkc2V0fGgxfGgyfGgzfGg0fGg1fGg2fGl8bGFiZWx8bGl8b2x8cHxxfHNwYW58c3Ryb25nfHN0eWxlfHRhYmxlfHRib2R5fHRkfHRofHRyfHVsKSQvaSxnLGg9XCJfaHRtbDVzaGl2XCIsaT0wLGo9e30sazsoZnVuY3Rpb24oKXt0cnl7dmFyIGE9Yi5jcmVhdGVFbGVtZW50KFwiYVwiKTthLmlubmVySFRNTD1cIjx4eXo+PC94eXo+XCIsZz1cImhpZGRlblwiaW4gYSxrPWEuY2hpbGROb2Rlcy5sZW5ndGg9PTF8fGZ1bmN0aW9uKCl7Yi5jcmVhdGVFbGVtZW50KFwiYVwiKTt2YXIgYT1iLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtyZXR1cm4gdHlwZW9mIGEuY2xvbmVOb2RlPT1cInVuZGVmaW5lZFwifHx0eXBlb2YgYS5jcmVhdGVEb2N1bWVudEZyYWdtZW50PT1cInVuZGVmaW5lZFwifHx0eXBlb2YgYS5jcmVhdGVFbGVtZW50PT1cInVuZGVmaW5lZFwifSgpfWNhdGNoKGMpe2c9ITAsaz0hMH19KSgpO3ZhciBzPXtlbGVtZW50czpkLmVsZW1lbnRzfHxcImFiYnIgYXJ0aWNsZSBhc2lkZSBhdWRpbyBiZGkgY2FudmFzIGRhdGEgZGF0YWxpc3QgZGV0YWlscyBkaWFsb2cgZmlnY2FwdGlvbiBmaWd1cmUgZm9vdGVyIGhlYWRlciBoZ3JvdXAgbWFpbiBtYXJrIG1ldGVyIG5hdiBvdXRwdXQgcHJvZ3Jlc3Mgc2VjdGlvbiBzdW1tYXJ5IHRlbXBsYXRlIHRpbWUgdmlkZW9cIix2ZXJzaW9uOmMsc2hpdkNTUzpkLnNoaXZDU1MhPT0hMSxzdXBwb3J0c1Vua25vd25FbGVtZW50czprLHNoaXZNZXRob2RzOmQuc2hpdk1ldGhvZHMhPT0hMSx0eXBlOlwiZGVmYXVsdFwiLHNoaXZEb2N1bWVudDpyLGNyZWF0ZUVsZW1lbnQ6byxjcmVhdGVEb2N1bWVudEZyYWdtZW50OnB9O2EuaHRtbDU9cyxyKGIpfSh0aGlzLGIpLGUuX3ZlcnNpb249ZCxlLl9wcmVmaXhlcz1tLGUuX2RvbVByZWZpeGVzPXAsZS5fY3Nzb21QcmVmaXhlcz1vLGUuaGFzRXZlbnQ9eCxlLnRlc3RQcm9wPWZ1bmN0aW9uKGEpe3JldHVybiBFKFthXSl9LGUudGVzdEFsbFByb3BzPUcsZS50ZXN0U3R5bGVzPXcsZS5wcmVmaXhlZD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIGI/RyhhLGIsYyk6RyhhLFwicGZ4XCIpfSxnLmNsYXNzTmFtZT1nLmNsYXNzTmFtZS5yZXBsYWNlKC8oXnxcXHMpbm8tanMoXFxzfCQpLyxcIiQxJDJcIikrKGY/XCIganMgXCIrdC5qb2luKFwiIFwiKTpcIlwiKSxlfSh0aGlzLHRoaXMuZG9jdW1lbnQpLGZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGEpe3JldHVyblwiW29iamVjdCBGdW5jdGlvbl1cIj09by5jYWxsKGEpfWZ1bmN0aW9uIGUoYSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGF9ZnVuY3Rpb24gZigpe31mdW5jdGlvbiBnKGEpe3JldHVybiFhfHxcImxvYWRlZFwiPT1hfHxcImNvbXBsZXRlXCI9PWF8fFwidW5pbml0aWFsaXplZFwiPT1hfWZ1bmN0aW9uIGgoKXt2YXIgYT1wLnNoaWZ0KCk7cT0xLGE/YS50P20oZnVuY3Rpb24oKXsoXCJjXCI9PWEudD9CLmluamVjdENzczpCLmluamVjdEpzKShhLnMsMCxhLmEsYS54LGEuZSwxKX0sMCk6KGEoKSxoKCkpOnE9MH1mdW5jdGlvbiBpKGEsYyxkLGUsZixpLGope2Z1bmN0aW9uIGsoYil7aWYoIW8mJmcobC5yZWFkeVN0YXRlKSYmKHUucj1vPTEsIXEmJmgoKSxsLm9ubG9hZD1sLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLGIpKXtcImltZ1wiIT1hJiZtKGZ1bmN0aW9uKCl7dC5yZW1vdmVDaGlsZChsKX0sNTApO2Zvcih2YXIgZCBpbiB5W2NdKXlbY10uaGFzT3duUHJvcGVydHkoZCkmJnlbY11bZF0ub25sb2FkKCl9fXZhciBqPWp8fEIuZXJyb3JUaW1lb3V0LGw9Yi5jcmVhdGVFbGVtZW50KGEpLG89MCxyPTAsdT17dDpkLHM6YyxlOmYsYTppLHg6an07MT09PXlbY10mJihyPTEseVtjXT1bXSksXCJvYmplY3RcIj09YT9sLmRhdGE9YzoobC5zcmM9YyxsLnR5cGU9YSksbC53aWR0aD1sLmhlaWdodD1cIjBcIixsLm9uZXJyb3I9bC5vbmxvYWQ9bC5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtrLmNhbGwodGhpcyxyKX0scC5zcGxpY2UoZSwwLHUpLFwiaW1nXCIhPWEmJihyfHwyPT09eVtjXT8odC5pbnNlcnRCZWZvcmUobCxzP251bGw6biksbShrLGopKTp5W2NdLnB1c2gobCkpfWZ1bmN0aW9uIGooYSxiLGMsZCxmKXtyZXR1cm4gcT0wLGI9Ynx8XCJqXCIsZShhKT9pKFwiY1wiPT1iP3Y6dSxhLGIsdGhpcy5pKyssYyxkLGYpOihwLnNwbGljZSh0aGlzLmkrKywwLGEpLDE9PXAubGVuZ3RoJiZoKCkpLHRoaXN9ZnVuY3Rpb24gaygpe3ZhciBhPUI7cmV0dXJuIGEubG9hZGVyPXtsb2FkOmosaTowfSxhfXZhciBsPWIuZG9jdW1lbnRFbGVtZW50LG09YS5zZXRUaW1lb3V0LG49Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXSxvPXt9LnRvU3RyaW5nLHA9W10scT0wLHI9XCJNb3pBcHBlYXJhbmNlXCJpbiBsLnN0eWxlLHM9ciYmISFiLmNyZWF0ZVJhbmdlKCkuY29tcGFyZU5vZGUsdD1zP2w6bi5wYXJlbnROb2RlLGw9YS5vcGVyYSYmXCJbb2JqZWN0IE9wZXJhXVwiPT1vLmNhbGwoYS5vcGVyYSksbD0hIWIuYXR0YWNoRXZlbnQmJiFsLHU9cj9cIm9iamVjdFwiOmw/XCJzY3JpcHRcIjpcImltZ1wiLHY9bD9cInNjcmlwdFwiOnUsdz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbihhKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PW8uY2FsbChhKX0seD1bXSx5PXt9LHo9e3RpbWVvdXQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi5sZW5ndGgmJihhLnRpbWVvdXQ9YlswXSksYX19LEEsQjtCPWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7dmFyIGE9YS5zcGxpdChcIiFcIiksYj14Lmxlbmd0aCxjPWEucG9wKCksZD1hLmxlbmd0aCxjPXt1cmw6YyxvcmlnVXJsOmMscHJlZml4ZXM6YX0sZSxmLGc7Zm9yKGY9MDtmPGQ7ZisrKWc9YVtmXS5zcGxpdChcIj1cIiksKGU9eltnLnNoaWZ0KCldKSYmKGM9ZShjLGcpKTtmb3IoZj0wO2Y8YjtmKyspYz14W2ZdKGMpO3JldHVybiBjfWZ1bmN0aW9uIGcoYSxlLGYsZyxoKXt2YXIgaT1iKGEpLGo9aS5hdXRvQ2FsbGJhY2s7aS51cmwuc3BsaXQoXCIuXCIpLnBvcCgpLnNwbGl0KFwiP1wiKS5zaGlmdCgpLGkuYnlwYXNzfHwoZSYmKGU9ZChlKT9lOmVbYV18fGVbZ118fGVbYS5zcGxpdChcIi9cIikucG9wKCkuc3BsaXQoXCI/XCIpWzBdXSksaS5pbnN0ZWFkP2kuaW5zdGVhZChhLGUsZixnLGgpOih5W2kudXJsXT9pLm5vZXhlYz0hMDp5W2kudXJsXT0xLGYubG9hZChpLnVybCxpLmZvcmNlQ1NTfHwhaS5mb3JjZUpTJiZcImNzc1wiPT1pLnVybC5zcGxpdChcIi5cIikucG9wKCkuc3BsaXQoXCI/XCIpLnNoaWZ0KCk/XCJjXCI6YyxpLm5vZXhlYyxpLmF0dHJzLGkudGltZW91dCksKGQoZSl8fGQoaikpJiZmLmxvYWQoZnVuY3Rpb24oKXtrKCksZSYmZShpLm9yaWdVcmwsaCxnKSxqJiZqKGkub3JpZ1VybCxoLGcpLHlbaS51cmxdPTJ9KSkpfWZ1bmN0aW9uIGgoYSxiKXtmdW5jdGlvbiBjKGEsYyl7aWYoYSl7aWYoZShhKSljfHwoaj1mdW5jdGlvbigpe3ZhciBhPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtrLmFwcGx5KHRoaXMsYSksbCgpfSksZyhhLGosYiwwLGgpO2Vsc2UgaWYoT2JqZWN0KGEpPT09YSlmb3IobiBpbiBtPWZ1bmN0aW9uKCl7dmFyIGI9MCxjO2ZvcihjIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShjKSYmYisrO3JldHVybiBifSgpLGEpYS5oYXNPd25Qcm9wZXJ0eShuKSYmKCFjJiYhLS1tJiYoZChqKT9qPWZ1bmN0aW9uKCl7dmFyIGE9W10uc2xpY2UuY2FsbChhcmd1bWVudHMpO2suYXBwbHkodGhpcyxhKSxsKCl9Ompbbl09ZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGI9W10uc2xpY2UuY2FsbChhcmd1bWVudHMpO2EmJmEuYXBwbHkodGhpcyxiKSxsKCl9fShrW25dKSksZyhhW25dLGosYixuLGgpKX1lbHNlIWMmJmwoKX12YXIgaD0hIWEudGVzdCxpPWEubG9hZHx8YS5ib3RoLGo9YS5jYWxsYmFja3x8ZixrPWosbD1hLmNvbXBsZXRlfHxmLG0sbjtjKGg/YS55ZXA6YS5ub3BlLCEhaSksaSYmYyhpKX12YXIgaSxqLGw9dGhpcy55ZXBub3BlLmxvYWRlcjtpZihlKGEpKWcoYSwwLGwsMCk7ZWxzZSBpZih3KGEpKWZvcihpPTA7aTxhLmxlbmd0aDtpKyspaj1hW2ldLGUoaik/ZyhqLDAsbCwwKTp3KGopP0Ioaik6T2JqZWN0KGopPT09aiYmaChqLGwpO2Vsc2UgT2JqZWN0KGEpPT09YSYmaChhLGwpfSxCLmFkZFByZWZpeD1mdW5jdGlvbihhLGIpe3pbYV09Yn0sQi5hZGRGaWx0ZXI9ZnVuY3Rpb24oYSl7eC5wdXNoKGEpfSxCLmVycm9yVGltZW91dD0xZTQsbnVsbD09Yi5yZWFkeVN0YXRlJiZiLmFkZEV2ZW50TGlzdGVuZXImJihiLnJlYWR5U3RhdGU9XCJsb2FkaW5nXCIsYi5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLEE9ZnVuY3Rpb24oKXtiLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsQSwwKSxiLnJlYWR5U3RhdGU9XCJjb21wbGV0ZVwifSwwKSksYS55ZXBub3BlPWsoKSxhLnllcG5vcGUuZXhlY3V0ZVN0YWNrPWgsYS55ZXBub3BlLmluamVjdEpzPWZ1bmN0aW9uKGEsYyxkLGUsaSxqKXt2YXIgaz1iLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksbCxvLGU9ZXx8Qi5lcnJvclRpbWVvdXQ7ay5zcmM9YTtmb3IobyBpbiBkKWsuc2V0QXR0cmlidXRlKG8sZFtvXSk7Yz1qP2g6Y3x8ZixrLm9ucmVhZHlzdGF0ZWNoYW5nZT1rLm9ubG9hZD1mdW5jdGlvbigpeyFsJiZnKGsucmVhZHlTdGF0ZSkmJihsPTEsYygpLGsub25sb2FkPWsub25yZWFkeXN0YXRlY2hhbmdlPW51bGwpfSxtKGZ1bmN0aW9uKCl7bHx8KGw9MSxjKDEpKX0sZSksaT9rLm9ubG9hZCgpOm4ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoayxuKX0sYS55ZXBub3BlLmluamVjdENzcz1mdW5jdGlvbihhLGMsZCxlLGcsaSl7dmFyIGU9Yi5jcmVhdGVFbGVtZW50KFwibGlua1wiKSxqLGM9aT9oOmN8fGY7ZS5ocmVmPWEsZS5yZWw9XCJzdHlsZXNoZWV0XCIsZS50eXBlPVwidGV4dC9jc3NcIjtmb3IoaiBpbiBkKWUuc2V0QXR0cmlidXRlKGosZFtqXSk7Z3x8KG4ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZSxuKSxtKGMsMCkpfX0odGhpcyxkb2N1bWVudCksTW9kZXJuaXpyLmxvYWQ9ZnVuY3Rpb24oKXt5ZXBub3BlLmFwcGx5KHdpbmRvdyxbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywwKSl9O1xuXG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiBXQiAhPSBcInVuZGVmaW5lZFwiID8gV0IgOiB3aW5kb3cuV0IpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiBkZWZpbmVFeHBvcnQoZXgpIHsgbW9kdWxlLmV4cG9ydHMgPSBleDsgfSk7XG4iLCJ3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnJlcXVpcmUoJ2FuZ3VsYXInKTtcbnJlcXVpcmUoJ2xvZGFzaCcpO1xucmVxdWlyZSgnYW5ndWxhci1tb2RhbC1zZXJ2aWNlJyk7XG5yZXF1aXJlKCdhbmd1Y29tcGxldGUtYWx0Jyk7XG5yZXF1aXJlKCdhbmd1bGFyLWJvb3RzdHJhcCcpO1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDT01FVCcsIFsnYW5ndWxhck1vZGFsU2VydmljZScsIFwiYW5ndWNvbXBsZXRlLWFsdFwiLCAndWkuYm9vdHN0cmFwJ10pO1xuXG5yZXF1aXJlKCcuL3NlcnZpY2VzLmpzJyk7XG5yZXF1aXJlKCcuL3NlcnZpY2VzL3NwaW5uZXInKTtcblxuXG5hcHAuY29udHJvbGxlcignYXBwQ3RybCcsIFsnJHNjb3BlJywgJ2FqYXhTZXJ2aWNlcycsICdqc29uU2VydmljZXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBhamF4U2VydmljZXMsIGpzb25TZXJ2aWNlcykge1xuXG5cdHZhciBjdXJGb3JtID0gXCJXUlgyMDAyXCI7XG5cdHZhciByZXNJZCA9IFwiMTI0MDRcIjtcblx0dmFyIHVybCA9IFwiL2NvbWV0Lmljc3A/TUdXTFBOPWlDT01FVCZDT01FVE1vZGU9SlMmU0VSVklDRT1EQVRBRk9STSZSRVFVRVNUPVwiK2N1ckZvcm0rXCImU1RBR0U9UkVRVUVTVCZDT01FVFNJRD1cIitzZWxmLnNlc3Npb25JZCtcIiZJRD1cIityZXNJZDtcblxuXHQkc2NvcGUubG9hZFBhdGggPSB1cmw7XG5cdFxuXG5cdCRzY29wZS5tZW51ID0ge307XG59XSk7XG5cbnJlcXVpcmUoJy4vbW9kYWxJbnN0YW5jZUN0cmwuanMnKTtcblxucmVxdWlyZSgnLi9kaXJlY3RpdmVzL2dseXBoU3Bpbm5lcicpO1xucmVxdWlyZSgnLi9kaXJlY3RpdmVzLmpzJyk7XG5yZXF1aXJlKCcuL2RpcmVjdGl2ZXMvY29tZXRNZW51Jyk7XG5cbndpbmRvdy5wbHVnaW5fcGF0aCA9ICdhc3NldHMvcGx1Z2lucy8nO1xucmVxdWlyZSgnd2IwMmRzbjFiJyk7XG5cblxuLy8gLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcbi8vICAgLy8gJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdhbHRUaGVtZScpXG4vLyAgIC8vICAgLnByaW1hcnlQYWxldHRlKCdwdXJwbGUnKVxuLy8gfSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0YmFzZV91cmw6IFwiaHR0cDovL1wiK2xvY2F0aW9uLmhvc3RuYW1lLFxuXHRwb3J0OiBsb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCdsaW50ZWNoaHEnKT49MCA/IDM3NTcgOiBsb2NhdGlvbi5wb3J0XG5cbn07XG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NPTUVUJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxuYXBwLmRpcmVjdGl2ZSgnY29tZXRGb3JtJywgWydqc29uU2VydmljZXMnLCckZmlsdGVyJywgJ2FqYXhTZXJ2aWNlcycsICckdWliTW9kYWwnLCdhdXRvQ29tcGxldGVTZXJ2aWNlcycsICdjb21ldFNlcnZpY2VzJywgJ2FmdGVyRmllbGRTZXJ2aWNlcycsICdtZW51U2VydmljZXMnLCAnc3Bpbm5lclNlcnYnLFxuXHRmdW5jdGlvbihqc29uU2VydmljZXMsICRmaWx0ZXIsIGFqYXhTZXJ2aWNlcywgJHVpYk1vZGFsLCBhdXRvQ29tcGxldGVTZXJ2aWNlcywgY29tZXRTZXJ2aWNlcywgYWZ0ZXJGaWVsZFNlcnZpY2VzLCBtZW51U2VydmljZXMsIHNwaW5uZXJTZXJ2KSB7XG5cdHJldHVybntcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRyYW5zY2x1ZGU6IHRydWUsXG5cdFx0c2NvcGU6IHtcblx0XHRcdGxvYWRQYXRoOiAnPWxvYWRQYXRoJyxcblx0XHRcdGZvcm1UaXRsZTogJz1mb3JtVGl0bGUnLFxuXHRcdFx0Y2xvc2VGdW5jdGlvbjogJyYnXG5cblx0XHR9LFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyR1aWJNb2RhbCcsICckbG9nJywgXCJmb3JtU2VydmljZVwiLFxuXHRcdGZ1bmN0aW9uKCRzY29wZSwgJHVpYk1vZGFsLCAkbG9nLCBmb3JtU2VydmljZSwgZWxlbSl7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRzZWxmLmVsZW1lbnQgPSB1bmRlZmluZWQ7XG5cdFx0XHRzZWxmLmZvcm1TY29wZSA9IHVuZGVmaW5lZDtcblx0XHRcdHNlbGYuc3VibWl0VmFsID0gXCJTZW5kIEZvcm1cIjtcblx0XHRcdHJlcXVpcmU6ICdmb3JtJztcblx0XHRcdHNlbGYuc2Vzc2lvbklkID1cIlwiO1xuXHRcdFx0c2VsZi5lcnJvck1lc3NhZ2U9XCJcIjtcblx0XHRcdHNlbGYudXJsUHJlZml4ID0gY29uZmlnLmJhc2VfdXJsK1wiOlwiK2NvbmZpZy5wb3J0O1xuXHRcdFx0c2VsZi5tb2RhbExvYWRlZCA9IGZhbHNlO1xuXG5cdFx0XHRzZWxmLmdldEZvcm1EYXRhID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYoc2VsZi5mb3JtRGF0YSA9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2VsZi5mb3JtRGF0YS5maWVsZHM7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLmhhc0Vycm9yID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuZXJyb3JNZXNzYWdlIT1cIlwiO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxmLnNlbmRGb3JtID0gZnVuY3Rpb24oKXtcblx0XHRcdH07XG5cblx0XHRcdHNlbGYuYnVpbGRBdXRvQ29tcGxldGVRdWVyeSA9IGZ1bmN0aW9uKGZpZWxkSWQsIHJlcXVlc3Qpe1xuXHRcdFx0XHRyZXR1cm4gYXV0b0NvbXBsZXRlU2VydmljZXMuYnVpbGRBdXRvQ29tcGxldGVRdWVyeShzZWxmLmZvcm1EYXRhLmZvcm1bMF0uaWQsIGZpZWxkSWQsIHJlcXVlc3QsIHNlbGYuc2Vzc2lvbklkKTtcblx0XHRcdH07XG5cblx0XHRcdHNlbGYuZm9ybWF0QXV0b0NvbXBsZXRlUmVzcG9uc2UgPSBmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRpZihyZXN1bHQpe1xuXHRcdFx0XHRcdHJldHVybiBhdXRvQ29tcGxldGVTZXJ2aWNlcy5mb3JtYXRBdXRvQ29tcGxldGVSZXNwb25zZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRzZWxmLmhhbmRsZUF1dG9Db21wbGV0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdHNlbGYuZm9ybURhdGEgPSBhdXRvQ29tcGxldGVTZXJ2aWNlcy5oYW5kbGVBdXRvQ29tcGxldGVSZXN1bHQocmVzLCBzZWxmLmZvcm1EYXRhLCBzZWxmLmRhdGFNYXApO1xuXHRcdFx0XHRlbGVtZW50VG9WYWxpZGF0ZSA9IGpzb25TZXJ2aWNlcy5nZXREYXRhVmFsdWUoc2VsZi5mb3JtRGF0YSwgc2VsZi5kYXRhTWFwW3RoaXMuaWRdKTtcblx0XHRcdFx0aWYoZWxlbWVudFRvVmFsaWRhdGUuU2VydmVyVmFsaWRhdGlvbil7XG5cdFx0XHRcdFx0YWZ0ZXJGaWVsZFNlcnZpY2VzLnNlbmRBZnRlckZpZWxkUmVxdWVzdChzZWxmLmZvcm1EYXRhLCBzZWxmLmRhdGFNYXAsIGVsZW1lbnRUb1ZhbGlkYXRlLmlkLCBlbGVtZW50VG9WYWxpZGF0ZS52YWx1ZSwgZWxlbWVudFRvVmFsaWRhdGUuU2VydmVyVmFsaWRhdGlvbiwgZWxlbWVudFRvVmFsaWRhdGUuU2VydmVyVmFsaWRhdGlvblBhcmFtZXRlcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHNlbGYubG9hZE1vZGFsRm9ybSA9IGZ1bmN0aW9uIChtb2RhbEZvcm0sIG1vZGFsRm9ybVBhcmFtZXRlcnMpe1xuXHRcdFx0XHR2YXIgbW9kYWxVcmwgPSBcIi9jb21ldC5pY3NwP01HV0xQTj1pQ09NRVQmQ09NRVRTSUQ9XCIrc2VsZi5zZXNzaW9uSWQrXCImQ09NRVRNb2RlPUpTJlNFUlZJQ0U9REFUQUZPUk0mU1RBR0U9UkVRVUVTVCZNT0RFPTAmXFxcblx0Rk9STUNPREU9XCIrc2VsZi5jdXJyZW50Rm9ybStcIiZSRVFVRVNUPVwiK21vZGFsRm9ybStcIiZEQVRBPV5cIjtcblx0XHRcdFx0dmFyIGRhdGFRdWVyeVN0cmluZyA9IGNvbWV0U2VydmljZXMuYnVpbGRSZXF1ZXN0UXVlcnlTdHJpbmcobW9kYWxGb3JtUGFyYW1ldGVycywgc2VsZi5mb3JtRGF0YSwgc2VsZi5kYXRhTWFwKTtcblx0XHRcdFx0dmFyIG1vZGFsUXVlcnlVcmwgPSBtb2RhbFVybCtkYXRhUXVlcnlTdHJpbmc7XG5cdFx0XHRcdHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuXHQgICAgICBcdFx0XHRhbmltYXRpb246IHRydWUsXG5cdCAgICAgIFx0XHRcdHRlbXBsYXRlVXJsOiBcInRwbC9tb2RhbC50cGwuaHRtbFwiLFxuXHQgICAgICBcdFx0XHRjb250cm9sbGVyOiBcIk1vZGFsSW5zdGFuY2VDdHJsXCIsXG5cdCAgICAgIFx0XHRcdCByZXNvbHZlOiB7XG5cdFx0XHRcdCAgICAgICAgbG9hZFBhdGg6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCAgICAgICAgXHRyZXR1cm4gbW9kYWxRdWVyeVVybDtcblx0XHRcdFx0ICAgICAgICB9XG5cdFx0XHRcdC8vICAgICAgICBmb3JtVGl0bGU6ICBcIlBsZWFzZSB3YWl0LiBMb2FkaW5nIGZvcm1cIiwgXG5cdFx0XHRcdCAgICAgICAvLyBtb2RhbDogdGhpc1xuXHQgICAgICBcdFx0XHR9XG5cdCAgICBcdFx0fSk7XG5cblx0XHRcdCAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChtb2RhbFJlcykge1xuXHRcdFx0ICAgICBcdGFmdGVyRmllbGRTZXJ2aWNlcy5oYW5kbGVBZnRlckZpZWxkUmVzcG9uc2UobW9kYWxSZXMsIHNlbGYuZm9ybURhdGEsIHNlbGYuZGF0YU1hcCk7XG5cdFx0XHRcdFx0c2VsZi5tb2RhbExvYWRlZCA9IGZhbHNlO1xuXHRcdFx0ICBcdH0pO1xuXHRcdFx0fVxuXG5cblxuXG5cdFx0XHQvKlx0bW9kYWxVcmwgPSBcIi9jb21ldC5pY3NwP01HV0xQTj1pQ09NRVQmQ09NRVRTSUQ9XCIrc2VsZi5zZXNzaW9uSWQrXCImQ09NRVRNb2RlPUpTJlNFUlZJQ0U9REFUQUZPUk0mU1RBR0U9UkVRVUVTVCZNT0RFPTAmXFxcbkZPUk1DT0RFPVwiK3NlbGYuY3VycmVudEZvcm0rXCImUkVRVUVTVD1cIittb2RhbEZvcm0rXCImREFUQT1eXCI7XG5cdFx0XHRcdGRhdGFRdWVyeVN0cmluZyA9IGNvbWV0U2VydmljZXMuYnVpbGRSZXF1ZXN0UXVlcnlTdHJpbmcobW9kYWxGb3JtUGFyYW1ldGVycywgc2VsZi5mb3JtRGF0YSwgc2VsZi5kYXRhTWFwKTtcblx0XHRcdFx0bW9kYWxRdWVyeVVybCA9IG1vZGFsVXJsK2RhdGFRdWVyeVN0cmluZztcblx0XHRcdFx0TW9kYWxTZXJ2aWNlLnNob3dNb2RhbCh7XG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogXCJ0cGwvbW9kYWwudHBsLmh0bWxcIixcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXI6IFwibW9kYWxDb250cm9sbGVyXCIsXG5cdFx0XHRcdFx0XHRpbnB1dHM6IHsgbG9hZFBhdGg6IG1vZGFsUXVlcnlVcmwsIGZvcm1UaXRsZTogXCJQbGVhc2Ugd2FpdC4gTG9hZGluZyBmb3JtXCIsIG1vZGFsOiB0aGlzfVxuXHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uKG1vZGFsKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKG1vZGFsKTtcblx0XHRcdFx0XHRcdG1vZGFsLmVsZW1lbnQubW9kYWwoKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwibW9kYWwgb3BlblwiKTtcblx0XHRcdFx0XHRcdHNlbGYubW9kYWxMb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0bW9kYWwuY2xvc2UudGhlbihmdW5jdGlvbihtb2RhbFJlcyl7XG5cdFx0XHRcdFx0XHRcdGFmdGVyRmllbGRTZXJ2aWNlcy5oYW5kbGVBZnRlckZpZWxkUmVzcG9uc2UobW9kYWxSZXMsIHNlbGYuZm9ybURhdGEsIHNlbGYuZGF0YU1hcCk7XG5cdFx0XHRcdFx0XHRcdHNlbGYubW9kYWxMb2FkZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHR9KVxuXHRcdFx0fTsqL1xuXHRcdFx0c2VsZi5nZXRGaWVsZERpc3BsYXkgPSBmdW5jdGlvbihmaWVsZCwgcm93KXtcblx0XHRcdFx0aWYoZmllbGQudmlzaWJsZT09XCJmYWxzZVwiIHx8IGZpZWxkLnR5cGU9PVwiaGlkZGVuXCIpe1xuXHRcdFx0XHRcdHJldHVybiBcIml0ZW0taGlkZGVuXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGNvbHVtbldpZHRoID0gXCJjb2wtbWQtXCIrTWF0aC5yb3VuZCgxMi9yb3cubGVuZ3RoKTtcblx0XHRcdFx0cmV0dXJuIFwiaXRlbSBcIitjb2x1bW5XaWR0aDtcblx0XHRcdH07XG5cblx0XHRcdHNlbGYuZ2V0RGF0ZUZpZWxkID0gZnVuY3Rpb24oZmllbGRWYWwpe1xuXHRcdFx0XHRyZXR1cm4gRGF0ZShmaWVsZFZhbCk7XG5cdFx0XHR9XG5cblx0XHRcdHNlbGYuaW5pdEZvcm0gPSBmdW5jdGlvbiBpbml0Rm9ybSgpe1xuXHRcdFx0XHRzZWxmLmZvcm1TY29wZSA9IHNlbGYuZWxlbWVudC5maW5kKCdmb3JtJykuc2NvcGUoKTtcblx0XHRcdH07XG5cblx0XHRcdHNlbGYuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNhdmVcIik7XG5cdFx0XHRcdHNwaW5uZXJTZXJ2LnNob3coKTtcblx0XHRcdFx0aWYoc2VsZi5tb2RhbExvYWRlZCA9PSB0cnVlKXtcblx0XHRcdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBqc29uU2VydmljZXMuYnVpbGRRdWVyeVN0cmluZyhzZWxmLmZvcm1EYXRhKStcIiZTRVJWSUNFPURBVEFGT1JNXCI7XG5cdFx0XHRcdFx0YWpheFNlcnZpY2VzLmh0dHBQcm9taXNlKHNlbGYudXJsUHJlZml4LCBxdWVyeVN0cmluZykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdFx0XHRpZihyZXNwb25zZS5lcnJvcil7XG5cdFx0XHRcdFx0XHRcdHNlbGYuZXJyb3JNZXNzYWdlID0gIHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0c2VsZi5jbG9zZUZ1bmN0aW9uKHtyZXM6IHJlc3BvbnNlfSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzcGlubmVyU2Vydi5oaWRlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBxdWVyeVN0cmluZyA9IGpzb25TZXJ2aWNlcy5idWlsZFF1ZXJ5U3RyaW5nKHNlbGYuZm9ybURhdGEpO1xuXHRcdFx0XHRhamF4U2VydmljZXMuaHR0cFByb21pc2Uoc2VsZi51cmxQcmVmaXgsIHF1ZXJ5U3RyaW5nKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0aWYoc2VsZi4kbW9kYWxJbnN0YW5jZSl7XG5cdFx0XHRcdFx0XHQkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0c2VsZi5oYW5kbGVSZXNwb25zZShyZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzcGlubmVyU2Vydi5oaWRlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHRzZWxmLmhhbmRsZVJlc3BvbnNlID0gZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0aWYgKHR5cGVvZiByZXMgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYocmVzLmVycm9yKXtcblx0XHRcdFx0XHRzZWxmLmVycm9yTWVzc2FnZSA9IHJlcy5lcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdHNlbGYuZXJyb3JNZXNzYWdlID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihyZXMubWVudSl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzLm1lbnUpO1xuXHRcdFx0XHRcdCRzY29wZS4kcGFyZW50Lm1lbnU9cmVzLm1lbnU7XG5cdFx0XHRcdFx0dmFyIGN1ckZvcm0gPSBcIldSWDIwMDJcIjtcblx0XHRcdFx0XHR2YXIgcmVzSWQgPSBcIjEyNDA0XCI7XG5cdFx0XHRcdFx0dmFyIHVybCA9IFwiL2NvbWV0Lmljc3A/TUdXTFBOPWlDT01FVCZDT01FVE1vZGU9SlMmU0VSVklDRT1EQVRBRk9STSZSRVFVRVNUPVwiK2N1ckZvcm0rXCImU1RBR0U9UkVRVUVTVCZDT01FVFNJRD1cIitzZWxmLnNlc3Npb25JZCtcIiZJRD1cIityZXNJZDtcblx0XHRcdFx0XHRtZW51U2VydmljZXMudXBkYXRlTWVudShyZXMubWVudSk7XG5cdFx0XHRcdFx0c2VsZi5sb2FkTmV4dEZvcm0odXJsKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYocmVzLmluc3RydWN0aW9ucyl7XG5cdFx0XHRcdFx0c2VsZi5sb2FkTmV4dEZvcm0ocmVzLmluc3RydWN0aW9uc1swXS5DT01FVE1haW5Mb2NhdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRzZWxmLnNlcnZlckRhdGEgPSByZXM7XG5cdFx0XHRcdFx0c2VsZi5zZXR1cEZvcm0oKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0c2VsZi5sb2FkTmV4dEZvcm0gPSBmdW5jdGlvbihwYXRoKXtcblx0XHRcdFx0c3Bpbm5lclNlcnYuc2hvdygpO1xuXHRcdFx0XHRhamF4U2VydmljZXMuaHR0cFByb21pc2Uoc2VsZi51cmxQcmVmaXgsIHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0Ly9hamF4U2VydmljZXMuaHR0cFByb21pc2UoXCJcIiwgXCJqc29uX3NyYy93cngyMDAyLmpzb25cIikudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdHNlbGYuaGFuZGxlUmVzcG9uc2UocmVzKTtcblx0XHRcdFx0XHRzcGlubmVyU2Vydi5oaWRlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblxuXHRcdFx0c2VsZi5zZXR1cEZvcm0gPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRzZXJ2ZXJEYXRhID0gc2VsZi5zZXJ2ZXJEYXRhO1xuXHRcdFx0XHRzZWxmLnNlc3Npb25JZCA9IHNlcnZlckRhdGEuc2Vzc2lvblswXS5DT01FVFNJRDtcblx0XHRcdFx0c2VsZi5jdXJyZW50Rm9ybSA9IHNlcnZlckRhdGEuZm9ybVswXS5pZDtcblx0XHRcdFx0c2VsZi5mb3JtVGl0bGUgPSBzZXJ2ZXJEYXRhLmZvcm1bMF0udGl0bGU7XG5cdFx0XHRcdHNlbGYuZm9ybURhdGEgPSBqc29uU2VydmljZXMucGFyc2VKc29uKHNlcnZlckRhdGEpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWxmLmZvcm1EYXRhKTtcblx0XHRcdFx0c2VsZi5kYXRhTWFwID0ganNvblNlcnZpY2VzLm1hcEpzb24oc2VydmVyRGF0YSk7XG5cdFx0XHR9O1xuXG5cdFx0XHRzZWxmLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicmVzZXRcIik7XG5cdFx0XHRcdCRzY29wZS4kYnJvYWRjYXN0KCdzaG93LWVycm9ycy1yZXNldCcpO1xuXHRcdFx0fTtcblxuXG5cdFx0XHRzZWxmLmdldEVsZW1lbnRMYWJlbCA9IGZ1bmN0aW9uKGVsZW1lbnRJZCl7XG5cdFx0XHRcdGVsZW1lbnQgPSBqc29uU2VydmljZXMuZ2V0RGF0YVZhbHVlKHNlbGYuZm9ybURhdGEsIHNlbGYuZGF0YU1hcFtlbGVtZW50SWRdKTtcblx0XHRcdFx0aWYoZWxlbWVudCAhPSB1bmRlZmluZWQpe1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmxhYmVsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdH07XG5cblx0XHRcdHNlbGYuYnVpbGRSZXF1ZXN0UXVlcnlTdHJpbmcgPSBmdW5jdGlvbihmaWVsZHNTdHIpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWxmLmRhdGFNYXApO1xuXHRcdFx0XHRyZXR1cm4gY29tZXRTZXJ2aWNlcy5idWlsZFJlcXVlc3RRdWVyeVN0cmluZyhmaWVsZFN0ciwgc2VsZi5mb3JtRGF0YSwgc2VsZi5kYXRhTWFwKTtcblxuXHRcdFx0fTtcblxuXHRcdFx0c2VsZi5zZW5kUXVpY2tTZWFyY2hSZXF1ZXN0ID0gIGZ1bmN0aW9uKGZpZWxkSWQsIGZpZWxkVmFsdWUsIHJlcXVlc3Qpe1xuXHRcdFx0XHRcdHVybCA9IFwiL2NvbWV0Lmljc3A/TUdXTFBOPWlDT01FVCZDT01FVFNJRD1cIitzZWxmLnNlc3Npb25JZCtcIiZDT01FVE1vZGU9SlMmU0VSVklDRT1TUkNIRkxEJlNUQUdFPVJFUVVFU1QmTU9ERT0wJlxcXG5GT1JNQ09ERT1cIitzZWxmLmN1cnJlbnRGb3JtK1wiJkZJRUxEPVwiK2ZpZWxkSWQrXCImU0NSTE49dW5kZWZpbmVkJlJFUVVFU1Q9XCIrcmVxdWVzdCtcIiZTUkNIRkxEPVwiK2ZpZWxkVmFsdWU7XG5cdFx0XHRcdFx0YWpheFNlcnZpY2VzLmh0dHBEZWJvdW5jZShzZWxmLnVybFByZWZpeCwgdXJsLCBzZWxmLmhhbmRsZVF1aWNrU2VhcmNoUmVzcG9uc2UpO1xuXHRcdFx0fTtcblxuXG5cdFx0XHRzZWxmLmxvYWROZXh0Rm9ybShzZWxmLmxvYWRQYXRoKTtcblxuXHRcdFx0JHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGZvcm1TZXJ2aWNlLmN1cnJlbnRGb3JtO1xuXHRcdFx0fSwgZnVuY3Rpb24gKGN1ckZvcm0pIHtcblx0XHRcdFx0dmFyIHVybCA9IFwiL2NvbWV0Lmljc3A/TUdXTFBOPWlDT01FVCZDT01FVE1vZGU9SlMmU0VSVklDRT1EQVRBRk9STSZSRVFVRVNUPVwiK1xuXHRcdFx0XHRjdXJGb3JtICsgXCImU1RBR0U9UkVRVUVTVCZDT01FVFNJRD1cIiArIHNlbGYuc2Vzc2lvbklkO1xuXHRcdFx0XHRzZWxmLmxvYWROZXh0Rm9ybSh1cmwpO1xuXHRcdFx0fSk7XG5cblxuXHRcdH1dLCAvL2Nsb3NlIGNvbnRyb2xsZXJcblxuXHRcdGNvbnRyb2xsZXJBczogJ2Zvcm1DdHJsJyxcblx0XHRiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuXHRcdHRlbXBsYXRlVXJsOiBmdW5jdGlvbihlbGVtLCBhdHRyKXtcblx0XHRcdHJldHVybiAndHBsL2Zvcm0udHBsLmh0bWwnO1xuXHRcdH0sXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIsY3RybCl7XG5cdFx0XHRlbGVtLmJpbmQoJ2JsdXInLCBmdW5jdGlvbih2YWwpe1xuXHRcdFx0fSk7XHRcblx0XHRcdGlmKGVsZW1bMF0uYXR0cmlidXRlc1snY2xvc2UtZnVuY3Rpb24nXSl7XG5cdFx0XHRcdGN0cmwubW9kYWxMb2FkZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fSAvLyBjbG9zZSByZXR1cm4gZnJvbSBmaXJzdCBsaW5lIG9mIGRpcmVjdGl2ZVxufV0pXG5cbi5kaXJlY3RpdmUoJ2NvbWV0RmllbGQnLFsgJyRjb21waWxlJywnYWpheFNlcnZpY2VzJywgZnVuY3Rpb24oICRjb21waWxlLCBhamF4U2VydmljZXMgKXtcblx0dmFyIGdldFRlbXBsYXRlID0gZnVuY3Rpb24odHlwZSl7XG5cdFx0XHRyZXR1cm4gJ3RwbC8nK3R5cGUrJy50cGwuaHRtbCc7XG5cdFx0fTtcblx0dmFyIGxpbmtlciA9IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyLCBjdHJsKXtcblx0XHRcdC8vZmllbGRKc29uID0gSlNPTi5wYXJzZShzY29wZS5maWVsZCk7XG5cblx0XHRcdHZhciB1cmwgPSBcInRwbC9cIitzY29wZS5maWVsZC50eXBlK1wiLnRwbC5odG1sXCI7XG5cdFx0XHRhamF4U2VydmljZXMuaHR0cFByb21pc2Uoc2VsZi51cmxQcmVmaXgsIHVybCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHR2YXIgZWxlbSA9ICRjb21waWxlKHJlc3VsdCkoc2NvcGUpO1x0XG5cdFx0XHRcdGVsZW1lbnQuYXBwZW5kKGVsZW1bMF0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVsZW1lbnQuYmluZCgna2V5dXAnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGZvcm0pXG5cdFx0XHR9KVxuXHRcdFx0XG5cblx0XHR9O1xuXG5cdHJldHVybntcblx0XHRyZXN0cmljdDogJ0VBJyxcblx0XHRzY29wZToge1xuXHRcdFx0ZmllbGQ6ICc9Jyxcblx0XHR9LFxuXHRcdGxpbms6IGxpbmtlcixcblx0XHRyZXF1aXJlOiAnP3Rlc3RGb3JtJyxcblx0fVxufV0pXG5cbi5kaXJlY3RpdmUoJ3Nob3dFcnJvcnMnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRyZXF1aXJlOiAnXmZvcm0nLFxuXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0ciwgZm9ybUN0cmwpIHtcblx0XHRcdHZhciBpbnB1dEVsID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKFwiW25hbWVdXCIpO1xuXHRcdFx0dmFyIGlucHV0TmdFbCA9IGFuZ3VsYXIuZWxlbWVudChpbnB1dEVsKTtcblxuXHRcdFx0c2NvcGUuJG9uKCdzaG93LWVycm9ycy1jaGVjay12YWxpZGl0eScsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBpbnB1dE5hbWUgPSBpbnB1dE5nRWwuYXR0cignbmFtZScpO1xuXHRcdFx0XHRpZihpbnB1dE5hbWUgIT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0XHRlbGVtZW50LnRvZ2dsZUNsYXNzKCdoYXMtZXJyb3InLCBmb3JtQ3RybFtpbnB1dE5hbWVdLiRpbnZhbGlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHNjb3BlLiRvbignc2hvdy1lcnJvcnMtcmVzZXQnLCBmdW5jdGlvbigpIHtcbiAgXHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICBcdFx0XHRcdGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICBcdFx0XHRcdH0sIDAsIGZhbHNlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRzY29wZS4kb24oJ2hpZGUtZW1wdHknLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlbGVtZW50KTtcblx0XHRcdH0pXG5cdFx0XHRcblxuXHRcdFx0XG5cblx0XHRcdGlucHV0TmdFbC5iaW5kKCdibHVyJywgZnVuY3Rpb24oKXtcblx0XHRcdCBcdHZhciBpbnB1dE5hbWUgPSBpbnB1dE5nRWwuYXR0cignbmFtZScpO1xuXHRcdFx0IFx0ZWxlbWVudC50b2dnbGVDbGFzcygnaGFzLWVycm9yJywgZm9ybUN0cmxbaW5wdXROYW1lXS4kaW52YWxpZCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdH1cblx0fTtcbn1dKVxuXG5cbi5kaXJlY3RpdmUoJ3ZhbGlkYXRlVGV4dCcsIFsnYWpheFNlcnZpY2VzJywgJ2pzb25TZXJ2aWNlcycsICdhZnRlckZpZWxkU2VydmljZXMnLCBmdW5jdGlvbiAoYWpheFNlcnZpY2VzLCBqc29uU2VydmljZXMsIGFmdGVyRmllbGRTZXJ2aWNlcykge1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0cmVxdWlyZTogJ15jb21ldEZvcm0nLFxuXHRcdGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdFx0XHRcdHNlbGYuaXNEaXNhYmxlZCA9IGZ1bmN0aW9uKGZpZWxkSWQpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhqc29uU2VydmljZXMuZ2V0RGF0YVZhbHVlKHNlbGYuZm9ybURhdGEsIHNlbGYuZGF0YU1hcFtmaWVsZElkXSkpO1xuXHRcdFx0XHRpZihqc29uU2VydmljZXMuZ2V0RGF0YVZhbHVlKHNlbGYuZm9ybURhdGEsIHNlbGYuZGF0YU1hcFtmaWVsZElkXSkuZGlzYWJsZWQ9PVwidHJ1ZVwiKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhmaWVsZElkICsgXCIgaXMgZGlzYWJsZWRcIik7XG5cdFx0XHRcdFx0cmV0dXJuIFwidHJ1ZVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnNvbGUubG9nKGZpZWxkSWQgKyBcIiBpcyBlbmFibGVkXCIpO1xuXHRcdFx0XHRyZXR1cm4gXCJmYWxzZVwiO1xuXHRcdFx0fVxuXHRcdH1dLFxuXHRcdFxuXHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0ciwgZm9ybUN0cmwpIHtcblx0XHRcdGVsZW1lbnQuYmluZCgna2V5dXAnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgaW5wdXROYW1lID0gZWxlbWVudC5hdHRyKCduYW1lJyk7XG5cdFx0XHRcdHZhciBkYXRhRm9ybWF0ID0gZWxlbWVudC5hdHRyKCdkYXRhZm9ybWF0Jyk7XG5cdFx0XHRcdHZhciB2YWxpZCA9IHRydWU7XG5cdFx0XHQvL1x0dmFyIGNhbGxxdWlja1NlYXJjaCA9IF8uZGVib3VuY2UoZm9ybUN0cmwuc2VuZFF1aWNrU2VhcmNoUmVxdWVzdCwxNTAwLGZhbHNlKTtcblx0XHRcdFx0aWYoZGF0YUZvcm1hdCl7XG5cdFx0XHRcdFx0c3dpdGNoKGRhdGFGb3JtYXQudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdFx0XHRjYXNlIFwiYWxwaGFudW1lcmljXCI6XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnRbMF0uJHNldFZhbGlkaXR5KFwiYWxwaGFudW1lcmljXCIsaXMuYWxwaGFOdW1lcmljKGVsZW1lbnRbMF0udmFsdWUpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInBob25lbnVtYmVyXCI6XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnRbMF0uJHNldFZhbGlkaXR5KFwicGhvbmVudW1iZXJcIixpcy5uYW5wUGhvbmUoZWxlbWVudFswXS52YWx1ZSkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwic29jaWFsc2VjdXJpdHludW1iZXJcIjpcblx0XHRcdFx0XHRcdFx0ZWxlbWVudFswXS4kc2V0VmFsaWRpdHkoXCJzb2NpYWxzZWN1cml0eVwiLGlzLnNvY2lhbFNlY3VyaXR5TnVtYmVyKGVsZW1lbnRbMF0udmFsdWUpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcInppcGNvZGVcIjpcblx0XHRcdFx0XHRcdFx0ZWxlbWVudFswXS4kc2V0VmFsaWRpdHkoXCJ6aXBjb2RlXCIsaXMudXNaaXBDb2RlKGVsZW1lbnRbMF0udmFsdWUpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2hhcy1lcnJvcicsIGVsZW1lbnRbMF0uJGludmFsaWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVsZW1lbnQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmKGVsZW1lbnQuYXR0cignZGF0YWZvcm1hdCcpICE9IHVuZGVmaW5lZCAmJiBlbGVtZW50LmF0dHIoJ2RhdGFmb3JtYXQnKS50b0xvd2VyQ2FzZSgpID09IFwiY2FwaXRhbGxldHRlcnNcIil7XG5cdFx0XHRcdFx0ZWxlbWVudC5hZGRDbGFzcyhcInRleHQtdXBwZXJjYXNlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGF0dHIuYWZ0ZXJUZXh0VmFsaWRhdGlvbil7XG5cdFx0XHRcdFx0YWZ0ZXJGaWVsZFNlcnZpY2VzLnNlbmRBZnRlckZpZWxkUmVxdWVzdChmb3JtQ3RybC5mb3JtRGF0YSwgZm9ybUN0cmwuZGF0YU1hcCwgZWxlbWVudFswXS5uYW1lLCBlbGVtZW50WzBdLnZhbHVlLCBhdHRyLmFmdGVyVGV4dFZhbGlkYXRpb24sIGF0dHIuYWZ0ZXJUZXh0UGFyYW1zKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblxuXHRcdH1cblx0fTtcbn1dKVxuXG4uZGlyZWN0aXZlKCdjb21ldENoZWNrYm94JywgWydqc29uU2VydmljZXMnLCAnYWpheFNlcnZpY2VzJywnYWZ0ZXJGaWVsZFNlcnZpY2VzJywgZnVuY3Rpb24oanNvblNlcnZpY2VzLCBhamF4U2VydmljZXMsYWZ0ZXJGaWVsZFNlcnZpY2VzKXtcblx0cmV0dXJue1xuXHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0cmVxdWlyZTogJ15jb21ldEZvcm0nLFxuXHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyLCBmb3JtQ3RybCl7XG5cdFx0XHRlbGVtLmJpbmQoJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdG51bWVyaWNWYWwgPSBlbGVtWzBdLmNoZWNrZWQgPyAxIDogMDtcblx0XHRcdFx0YWZ0ZXJGaWVsZFNlcnZpY2VzLnNlbmRBZnRlckZpZWxkUmVxdWVzdChmb3JtQ3RybC5mb3JtRGF0YSwgZm9ybUN0cmwuZGF0YU1hcCwgYXR0ci5uYW1lLCBudW1lcmljVmFsLCBhdHRyLmFmdGVyVGV4dFZhbGlkYXRpb24sIGF0dHIuYWZ0ZXJUZXh0UGFyYW1zKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufV0pXG5cbi5kaXJlY3RpdmUoJ21vZGFsRm9ybUJ1dHRvbicsIFtmdW5jdGlvbigpe1xuXHRyZXR1cm57XG5cdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRyZXF1aXJlOiAnXmNvbWV0Rm9ybScsXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIsIGZvcm1DdHJsKXtcblx0XHRcdGVsZW0uYmluZCgnY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRmb3JtQ3RybC5sb2FkTW9kYWxGb3JtKGF0dHIubW9kYWxGb3JtLCBhdHRyLm1vZGFsRm9ybVBhcmFtcylcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufV0pXG5cbi5kaXJlY3RpdmUoJ3N1Ym1pdEJ1dHRvbicsIFtmdW5jdGlvbigpe1xuXHRyZXR1cm57XG5cdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRyZXF1aXJlOiAnXmNvbWV0Rm9ybScsXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHIsIGZvcm1DdHJsKXtcblx0XHRcdGVsZW0uYmluZCgnY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRlbGVtLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufV0pXG5cblxuLmRpcmVjdGl2ZSgnaGlkZUVtcHR5JywgW2Z1bmN0aW9uKCl7XG5cdHJldHVybntcblx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdHJlcXVpcmU6ICdeY29tZXRGb3JtJyxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0ciwgZm9ybUN0cmwpe1xuXHRcdFx0aWYoYXR0ci5vcHRpb25zQ291bnQ9PTApe1xuXHRcdFx0XHRlbGVtLnBhcmVudCgpLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1dKVxuXG5cbiIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ09NRVQnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuYXBwLmRpcmVjdGl2ZSgnY29tZXRNZW51JywgWydqc29uU2VydmljZXMnLCckZmlsdGVyJywgJ2FqYXhTZXJ2aWNlcycsICdjb21ldFNlcnZpY2VzJywgJ21lbnVTZXJ2aWNlcycsXG5mdW5jdGlvbihqc29uU2VydmljZXMsICRmaWx0ZXIsIGFqYXhTZXJ2aWNlcywgY29tZXRTZXJ2aWNlcywgbWVudVNlcnZpY2VzICkge1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnQUUnLFxuXHRcdHNjb3BlOiB7fSxcblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsICdmb3JtU2VydmljZScsXG5cdFx0ZnVuY3Rpb24oJHNjb3BlLCBmb3JtU2VydmljZSwgZWxlbSl7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRzZWxmLmN1cnJlbnRUb3BpYyA9IHt9O1xuXHRcdFx0c2VsZi51cmxQcmVmaXggPSBjb25maWcuYmFzZV91cmwrXCI6XCIrY29uZmlnLnBvcnQ7XG5cdFx0XHRzZWxmLmxvYWRQYXRoID0gXCIvY29tZXQuaWNzcD9NR1dMUE49aUNPTUVUJkNPTUVUU0lEPSZDT01FVE1vZGU9SlMmU0VSVklDRT1EQVRBRk9STSZSRVFVRVNUPVdTWTEwMDEmU1RBR0U9UkVRVUVTVFwiO1xuXHRcdFx0c2VsZi5mb3JtVGl0bGUgPSBcIkNPTUVUIExvZ2luXCJcblx0XHRcdHNlbGYubWVudURhdGEgPSBbXTsgXG5cblx0XHRcdCRzY29wZS5yZWxvYWRGb3JtID0gZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0Y29uc29sZS5sb2coaXRlbS5sYWJlbCk7XG5cdFx0XHRcdGZvcm1TZXJ2aWNlLnVwZGF0ZUZvcm0oaXRlbS5yZXF1ZXN0KTtcblx0XHRcdH1cblxuXHRcdFx0JHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1lbnVTZXJ2aWNlcy5kYXRhO1xuXHRcdFx0fSwgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuXHRcdFx0XHRzZWxmLm1lbnVEYXRhID0gbmV3VmFsdWU7XG5cdFx0XHR9KTtcblx0XHR9XSwgLy9jbG9zZSBjb250cm9sbGVyXG5cblx0XHRjb250cm9sbGVyQXM6ICdtZW51Q3RybCcsXG5cdFx0YmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcblx0XHR0cmFuc2NsdWRlOiBmYWxzZSxcblx0XHR0ZW1wbGF0ZVVybDogZnVuY3Rpb24oZWxlbSwgYXR0cil7XG5cdFx0XHRyZXR1cm4gJ3RwbC9tZW51LnRwbC5odG1sJztcblx0XHR9LFxuXHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyLGN0cmwpe1xuXHRcdFx0c2NvcGUuJHdhdGNoKFxuXHRcdFx0XHRcIiRzY29wZS4kcGFyZW50Lm1lbnVcIixcblx0XHRcdFx0ZnVuY3Rpb24obWVudSl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJNeSBXYXRjaCBXYXRjaGVzXCIpO1xuXHRcdFx0XHRcdHNlbGYubWVudURhdGEgPSBtZW51O1xuXHRcdFx0fSlcblxuXHRcdH1cblx0fSAvLyBjbG9zZSByZXR1cm4gZnJvbSBmaXJzdCBsaW5lIG9mIGRpcmVjdGl2ZVxufV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ09NRVQnKTtcblxuYXBwLmRpcmVjdGl2ZSgnZ2x5cGhTcGlubmVyJywgWydzcGlubmVyU2VydicsIGZ1bmN0aW9uIChzcGlubmVyU2Vydikge1xuXG5cdGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHIpIHtcblx0XHRzY29wZS5kaXNwbGF5ID0gc3Bpbm5lclNlcnYuZGlzcGxheTtcblxuXHRcdHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gc3Bpbm5lclNlcnYuZGlzcGxheTtcblx0XHR9LCBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHNjb3BlLmRpc3BsYXkgPSB2YWx1ZTtcblx0XHR9KVxuXHR9XG5cblxuXHR2YXIgdGVtcGxhdGUgPSBcIjxkaXYgc3R5bGU9J2Rpc3BsYXk6IHt7IGRpc3BsYXkgfX0nIGNsYXNzPSdnbHlwaC1zcGlubmVyJz48aSBjbGFzcz0nZmEgZmEtc3Bpbm5lciBmYS1zcGluIGZhLTN4Jz48L2k+PHNwYW4+UGxlYXNlIHdhaXQgd2hpbGUgbG9hZGluZ+KApjwvc3Bhbj48L2Rpdj5cIjtcblxuXHRyZXR1cm4ge1x0XG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRsaW5rOiBsaW5rLFxuXHRcdHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHR9XHRcbn1dKTsiLCIvLyBhcHAuY29udHJvbGxlcignbW9kYWxDb250cm9sbGVyJyxbJyRzY29wZScsICdjbG9zZScsJ2xvYWRQYXRoJywgJ2Zvcm1UaXRsZScsICckZWxlbWVudCcsIGZ1bmN0aW9uKCRzY29wZSwgY2xvc2UsIGxvYWRQYXRoLCBmb3JtVGl0bGUsICRlbGVtZW50KXtcblx0XG4vLyBcdCRzY29wZS5sb2FkUGF0aCA9IGxvYWRQYXRoO1xuLy8gXHQvLyRzY29wZS5mb3JtRWxlbWVudHMgPSBkYXRhLmZvcm1bMF07XG4vLyBcdCRzY29wZS50aXRsZSA9IGZvcm1UaXRsZTtcblxuLy8gXHQkc2NvcGUuZGlzbWlzc01vZGFsID0gZnVuY3Rpb24ocmVzKXtcbi8vIFx0XHRjbG9zZShyZXMsIDIwMCk7XG4vLyBcdFx0Ly9hbmd1bGFyIG1vZGFsIGNsYXNoZXMgd2l0aCBib290c3RyYXAgbW9kYWwuIFRoZSBmb2xsb3dpbmcgbGluZXMgdGFrZSBjYXJlIG9mIGJvb3RzdHJhcFxuLy8gXHRcdCQoXCIubW9kYWwtYmFja2Ryb3BcIikucmVtb3ZlKCk7XG4vLyBcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJtb2RhbC1vcGVuXCIpO1xuLy8gXHR9XG5cbi8vIH1dKTtcblxuYXBwICA9IGFuZ3VsYXIubW9kdWxlKCdDT01FVCcpO1xudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuYXBwLmNvbnRyb2xsZXIoJ01vZGFsSW5zdGFuY2VDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGxvYWRQYXRoKSB7XG5cbiBcblxuICAkc2NvcGUubG9hZFBhdGggPSBsb2FkUGF0aDtcbiAgXG4gIGNvbnNvbGUubG9nKCRzY29wZSk7XG4gICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuc2VsZWN0ZWQuaXRlbSk7XG4gIH07XG5cbiAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgfTtcblxuICAkc2NvcGUuZ2V0UGF0aCA9IGZ1bmN0aW9uKCl7XG4gIFx0cmV0dXJuIGxvYWRQYXRoO1xuICB9XG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NPTUVUJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxuYXBwLmZhY3RvcnkoJ2pzb25TZXJ2aWNlcycsIFsgJyRodHRwJyAsIGZ1bmN0aW9uICgkaHR0cCkge1xuXHRyZXR1cm4ge1xuXHRcdFx0cGFyc2VKc29uOiBmdW5jdGlvbihqc29uT2JqZWN0KXtcblx0XHRcdFx0Zm9yKHJvdyBpbiBqc29uT2JqZWN0LmZpZWxkcyl7XG5cdFx0XHRcdFx0Zm9yKHNpbmdsZUZpZWxkIGluIGpzb25PYmplY3QuZmllbGRzW3Jvd10pe1xuXHRcdFx0XHRcdFx0dmFyIGZpZWxkID0ganNvbk9iamVjdC5maWVsZHNbcm93XVtzaW5nbGVGaWVsZF07XG5cdFx0XHRcdFx0XHRpZihmaWVsZC50eXBlID09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoZmllbGQudHlwZS50b0xvd2VyQ2FzZSgpID09IFwidGV4dFwiKXtcblx0XHRcdFx0XHRcdFx0aWYoZmllbGQuc2VhcmNoKXtcblx0XHRcdFx0XHRcdFx0XHRmaWVsZC50eXBlID0gXCJhdXRvY29tcGxldGVcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihmaWVsZC5Gb3JtYXQhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0XHRcdHN3aXRjaChmaWVsZC5Gb3JtYXQudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcImRhdGVcIjpcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGZpZWxkLnZhbHVlID09IHVuZGVmaW5lZCB8fCBmaWVsZC52YWx1ZSA9PSBcIlwiKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmllbGQudmFsdWUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmllbGQudmFsdWUgPSBuZXcgRGF0ZShmaWVsZC52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWVsZC50eXBlID0gXCJkYXRlXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwidGltZVwiOlxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZmllbGQudmFsdWU9XCJcIil7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1x0ZmllbGQudmFsdWUgPSBcIjAwOjAwOjAwXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWVsZC50eXBlID0gXCJ0aW1lXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiYnJvd3NlXCI6XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWVsZC5yZXF1aXJlZCA9IFwiZmFsc2VcIjtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJmbG9hdFwiOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJmbG9hdDFcIjpcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiZmxvYXQ0XCI6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIm51bWVyaWNcIjpcblx0XHRcdFx0XHRcdFx0XHRcdGZpZWxkLnZhbHVlPSArIGZpZWxkLnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmllbGQudHlwZSA9IFwibnVtYmVyXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihmaWVsZC52YWx1ZSE9bnVsbCAmJiBmaWVsZC52YWx1ZSE9XCJcIiAmJiBhbmd1bGFyLmlzU3RyaW5nKGZpZWxkLnZhbHVlKSl7XG5cdFx0XHRcdFx0XHRcdGZpZWxkLnNpemUgPSBmaWVsZC52YWx1ZS5sZW5ndGggKiAxMDtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0ZmllbGQuc2l6ZT0xMDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcdHJldHVybiBqc29uT2JqZWN0O1xuXHRcdFx0fSxcblxuXHRcdFx0bWFwSnNvbjogZnVuY3Rpb24oanNvbk9iamVjdCl7XG5cdFx0XHRcdGpzb25NYXAgPSBbXTtcblx0XHRcdFx0Zm9yKHJvdyBpbiBqc29uT2JqZWN0LmZpZWxkcyl7XG5cdFx0XHRcdFx0Zm9yKHNpbmdsZUZpZWxkIGluIGpzb25PYmplY3QuZmllbGRzW3Jvd10pe1xuXHRcdFx0XHRcdFx0dmFyIGZpZWxkID0ganNvbk9iamVjdC5maWVsZHNbcm93XVtzaW5nbGVGaWVsZF07XG5cdFx0XHRcdFx0XHRqc29uTWFwW2ZpZWxkLmlkXSA9IFwiXCIrcm93K1wiLVwiK3NpbmdsZUZpZWxkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4ganNvbk1hcDtcblx0XHRcdH0sXG5cblx0XHRcdGdldERhdGFWYWx1ZTogZnVuY3Rpb24oanNvbk9iamVjdCwga2V5KXtcblx0XHRcdFx0aWYoa2V5ID09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHJvdyA9IGtleS5zdWJzdHJpbmcoMCwga2V5LmluZGV4T2YoXCItXCIpKTtcblx0XHRcdFx0dmFyIGZpZWxkID0ga2V5LnN1YnN0cmluZyhrZXkuaW5kZXhPZihcIi1cIikrMSk7XG5cdFx0XHRcdHJldHVybiBqc29uT2JqZWN0LmZpZWxkc1tyb3ddW2ZpZWxkXTtcblx0XHRcdH0sXG5cblxuXHRcdFx0YnVpbGRRdWVyeVN0cmluZzogZnVuY3Rpb24oZm9ybURhdGEpe1xuXHRcdFx0XHRxdWVyeVN0cmluZyA9IGZvcm1EYXRhLnNlc3Npb25bMF0uQ09NRVRVUkw7XG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9IFwiJlJFUVVFU1Q9XCIrZm9ybURhdGEuZm9ybVswXS5pZDtcblx0XHRcdFx0Zm9yKHJvdyBpbiBmb3JtRGF0YS5maWVsZHMpe1xuXHRcdFx0XHRcdGZvcihmaWVsZCBpbiBmb3JtRGF0YS5maWVsZHNbcm93XSl7XG5cdFx0XHRcdFx0XHRpZihhbmd1bGFyLmlzT2JqZWN0KGZvcm1EYXRhLmZpZWxkc1tyb3ddW2ZpZWxkXSkpXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5U3RyaW5nICs9IFwiJlwiK2Zvcm1EYXRhLmZpZWxkc1tyb3ddW2ZpZWxkXS5pZCtcIj1cIitmb3JtRGF0YS5maWVsZHNbcm93XVtmaWVsZF0udmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9XCImU1RBR0U9U0FWRVwiXG5cdFx0XHRcdHJldHVybiBlbmNvZGVVUkkocXVlcnlTdHJpbmcpO1xuXHRcdFx0fVxuXHR9O1xufV0pXG5cblxuLmZhY3RvcnkoJ2FqYXhTZXJ2aWNlcycsIFsnJHEnLCAnJGh0dHAnLCAnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJHEsICRodHRwLCAkdGVtcGxhdGVDYWNoZSkge1xuXHRyZXR1cm4ge1xuXHRcdGh0dHBQcm9taXNlOiBmdW5jdGlvbih1cmxfcHJlZml4LCB1cmwpe1xuXHRcdFx0JGh0dHAuZGVmYXVsdHMudXNlWERvbWFpbiA9IHRydWU7XG5cdFx0XHR2YXIgZnVsbFVybCA9IHVybF9wcmVmaXgrdXJsO1xuXHRcdFx0ZGVsZXRlICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLVJlcXVlc3RlZC13aXRoJ107XG5cdFx0XHR2YXIgZGF0YSA9ICR0ZW1wbGF0ZUNhY2hlLmdldChmdWxsVXJsKTtcblx0XHRcdGlmIChkYXRhKSB7XG5cdFx0ICAgICAgICAgcmV0dXJuICRxLndoZW4oZGF0YSk7XG5cdFx0ICAgIH0gZWxzZSB7XG5cdFx0ICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXHRcdCAgICAgICAgJGh0dHAuZ2V0KGZ1bGxVcmwsIHsgY2FjaGU6IHRydWV9KS5zdWNjZXNzKGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0ICAgICAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KHVybCwgaHRtbCk7XG5cblx0XHQgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGh0bWwpO1xuXHRcdCAgICBcdH0pO1xuXHQgICAgICAgIFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0ICAgIH1cblx0XHR9LFxuXHRcdGh0dHBEZWJvdW5jZTogXy5kZWJvdW5jZShmdW5jdGlvbihwcmVmaXgsIHVybCwgY2FsbGJhY2spe1xuXHRcdFx0dGhpcy5odHRwUHJvbWlzZShwcmVmaXgsdXJsKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdGNhbGxiYWNrKHJlcyk7XG5cdFx0XHRcblx0XHRcdH0pXG5cdFx0fSwgNTAwLCBmYWxzZSlcbiBcdH0gXG59XSlcblxuLmZhY3RvcnkoJ2NvbWV0U2VydmljZXMnLCBbJ2pzb25TZXJ2aWNlcycsZnVuY3Rpb24gKGpzb25TZXJ2aWNlcykge1xuXHRyZXR1cm4ge1xuXHRcdGdldFVybFByZWZpeDogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiBjb25maWcuYmFzZV91cmwrXCI6XCIrY29uZmlnLnBvcnQ7XG5cdFx0fSxcblxuXHRcdGJ1aWxkUmVxdWVzdFF1ZXJ5U3RyaW5nOiBmdW5jdGlvbihmaWVsZHNTdHIsIGZvcm1EYXRhLCBkYXRhTWFwKXtcblx0XHRcdHZhciBkYXRhQXJyID0gW107XG5cdFx0XHR2YXIgcXVlcnlTdHJpbmcgPSBcIlwiO1xuXHRcdFx0aWYoZmllbGRzU3RyICE9IFwiXCIpe1xuXHRcdFx0XHRkYXRhQXJyID0gZmllbGRzU3RyLnNwbGl0KFwiO1wiKTtcblx0XHRcdH1cblx0XHRcdGlmKGRhdGFBcnIubGVuZ3RoKXtcblx0XHRcdFx0Zm9yKGVsZW1lbnQgaW4gZGF0YUFycil7XG5cdFx0XHRcdFx0ZWxlbWVudFZhbHVlID0ganNvblNlcnZpY2VzLmdldERhdGFWYWx1ZShmb3JtRGF0YSwgZGF0YU1hcFtkYXRhQXJyW2VsZW1lbnRdXSk7XG5cdFx0XHRcdFx0aWYoZWxlbWVudFZhbHVlLnR5cGU9PVwiZGF0ZVwiKXtcblx0XHRcdFx0XHRcdGVsZW1lbnREYXRlVmFsdWUgPSBlbGVtZW50VmFsdWUudmFsdWU7XG5cdFx0XHRcdFx0XHRlbGVtZW50U3RyaW5nVmFsdWUgPSBlbGVtZW50RGF0ZVZhbHVlLmdldEZ1bGxZZWFyKCkrJy0nK2VsZW1lbnREYXRlVmFsdWUuZ2V0TW9udGgoKSsnLScrZWxlbWVudERhdGVWYWx1ZS5nZXREYXRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoZWxlbWVudFZhbHVlLnR5cGU9PVwidGltZVwiKXtcblx0XHRcdFx0XHRcdGVsZW1lbnRUaW1lVmFsdWUgPSBlbGVtZW50VmFsdWUudmFsdWU7XG5cdFx0XHRcdFx0XHRpZihlbGVtZW50VGltZVZhbHVlICE9IFwiXCIpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHZhciBociA9IGVsZW1lbnRUaW1lVmFsdWUuZ2V0SG91cnMoKTtcblx0XHRcdFx0XHRcdFx0aWYoaHIgPCAxMCkgaHIgPSBcIjBcIitocjtcblx0XHRcdFx0XHRcdFx0dmFyIG1uID0gZWxlbWVudFRpbWVWYWx1ZS5nZXRNaW51dGVzKCk7XG5cdFx0XHRcdFx0XHRcdGlmKG1uIDwgMTApIG1uID0gXCIwXCIrbW47XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnRTdHJpbmdWYWx1ZSA9IGhyKyc6Jyttbjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XHRcblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW1lbnRTdHJpbmdWYWx1ZSA9IGVsZW1lbnRWYWx1ZS52YWx1ZTtcdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRxdWVyeVN0cmluZyArPSBcIl5cIitkYXRhQXJyW2VsZW1lbnRdK1wiPVwiK2VsZW1lbnRTdHJpbmdWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xuXHRcdH1cblx0fVxufV0pXG5cbi5mYWN0b3J5KCdhdXRvQ29tcGxldGVTZXJ2aWNlcycsIFsnY29tZXRTZXJ2aWNlcycsICdqc29uU2VydmljZXMnLCBmdW5jdGlvbihjb21ldFNlcnZpY2VzLCBqc29uU2VydmljZXMpe1xuXHRyZXR1cm57XG5cdFx0YnVpbGRBdXRvQ29tcGxldGVRdWVyeTogZnVuY3Rpb24oZm9ybUlkLCBmaWVsZElkLCByZXF1ZXN0LCBzZXNzaW9uSWQpe1xuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gY29tZXRTZXJ2aWNlcy5nZXRVcmxQcmVmaXgoKStcIi9jb21ldC5pY3NwP01HV0xQTj1pQ09NRVQmQ09NRVRNb2RlPUpTJlNFUlZJQ0U9U1JDSEZMRCZTVEFHRT1SRVFVRVNUJk1PREU9MCZcIjtcblx0XHRcdHF1ZXJ5U3RyaW5nICs9IFwiRk9STUNPREU9XCIrZm9ybUlkK1wiJkZJRUxEPVwiK2ZpZWxkSWQrXCImQ09NRVRTSUQ9XCIrc2Vzc2lvbklkK1wiJlJFUVVFU1Q9XCIrcmVxdWVzdCtcIiZTUkNIRkxEPVwiO1xuXHRcdFx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xuXHRcdH0sXG5cblx0XHRmb3JtYXRBdXRvQ29tcGxldGVSZXNwb25zZTogZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdGZvcihsaW5lIGluIHJlc3VsdC5yZXN1bHRzKXtcblx0XHRcdFx0ZGlzcCA9IHJlc3VsdC5yZXN1bHRzW2xpbmVdLmRpc3BsYXk7XG5cdFx0XHRcdHZhciBkaXNwbGF5TGlzdCA9IFwiXCI7XG5cdFx0XHRcdC8vIGRpc3BsYXlMaXN0ID0gXCI8dWwgY2xhc3M9XFxcImxpc3QtdW5zdHlsZWRcXFwiPlwiO1xuXHRcdFx0XHRmb3IoZWxlbWVudCBpbiBkaXNwKXtcblx0XHRcdFx0XHQvLyBkaXNwbGF5TGlzdCs9IFwiPGxpPlwiK2Rpc3BbZWxlbWVudF0rXCI8L2xpPlwiO1xuXHRcdFx0XHRcdGRpc3BsYXlMaXN0Kz0gZGlzcFtlbGVtZW50XStcIiB8IFwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGRpc3BsYXlMaXN0Kz0gXCI8L3VsPlwiO1xuXHRcdFx0XHRyZXN1bHQucmVzdWx0c1tsaW5lXS5maW5hbERpc3BsYXkgPSBkaXNwbGF5TGlzdDsvL1wiPHVsICBzdHlsZT0nZm9udC1zaXplOjExcHgnPjxsaT5cIitkaXNwLmRhdGEyK1wiPC9saT48bGk+XCIrZGlzcC5kYXRhMStcIiAtIFwiK2Rpc3AuZGF0YTMrXCI8L2xpPjwvdWw+XCI7XG5cdFx0XHRcdC8vcmVzdWx0LnJlc3VsdHNbbGluZV0uZmluYWxEaXNwbGF5ID0gZGlzcC5kYXRhMitcIiAoXCIrZGlzcC5kYXRhMStcIilcIjtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdGhhbmRsZUF1dG9Db21wbGV0ZVJlc3VsdDogZnVuY3Rpb24ocmVzLCBmb3JtRGF0YSwgZGF0YU1hcCl7XG5cdFx0XHR2YXIgZmllbGRzVG9VcGRhdGUgPSByZXMub3JpZ2luYWxPYmplY3QudXBkYXRlO1xuXHRcdFx0Zm9yKGZpZWxkIGluIGZpZWxkc1RvVXBkYXRlKXtcblx0XHRcdFx0ZWxlbWVudCA9IGpzb25TZXJ2aWNlcy5nZXREYXRhVmFsdWUoZm9ybURhdGEsIGRhdGFNYXBbZmllbGRdKTtcblx0XHRcdFx0ZWxlbWVudC52YWx1ZSA9IGZpZWxkc1RvVXBkYXRlW2ZpZWxkXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmb3JtRGF0YTtcblx0XHR9XG5cdH1cbn1dKVxuXG4uZmFjdG9yeSgnYWZ0ZXJGaWVsZFNlcnZpY2VzJywgWydjb21ldFNlcnZpY2VzJywgJ2pzb25TZXJ2aWNlcycsICdhamF4U2VydmljZXMnLCBmdW5jdGlvbihjb21ldFNlcnZpY2VzLCBqc29uU2VydmljZXMsIGFqYXhTZXJ2aWNlcyl7XG5cdHJldHVybntcblx0XHRoYW5kbGVBZnRlckZpZWxkUmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlSnNvbiwgZm9ybURhdGEsIGRhdGFNYXApe1xuXHRcdFx0ZmllbGRzID0gcmVzcG9uc2VKc29uLmZpZWxkcztcblx0XHRcdGZvcihmaWVsZCBpbiBmaWVsZHMpe1xuXHRcdFx0XHRpZiggZGF0YU1hcFtmaWVsZHNbZmllbGRdLmlkXSA9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiQW4gdW5yZWNvZ25pemVkIGF0dHJpYnV0ZSB3YXMgcmVjZWl2ZWQ6IFwiK2ZpZWxkc1tmaWVsZF0uaWQgKyBcIihcIitmaWVsZHNbZmllbGRdLnZhbHVlK1wiKVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdGZpZWxkVG9DaGFuZ2UgPSBqc29uU2VydmljZXMuZ2V0RGF0YVZhbHVlKGZvcm1EYXRhLCBkYXRhTWFwW2ZpZWxkc1tmaWVsZF0uaWRdKTtcblx0XHRcdFx0XHRzd2l0Y2goZmllbGRUb0NoYW5nZS50eXBlKXtcblx0XHRcdFx0XHRcdGNhc2UgXCJudW1iZXJcIjpcblx0XHRcdFx0XHRcdFx0ZmllbGRzW2ZpZWxkXS52YWx1ZSA9IHBhcnNlSW50KGZpZWxkc1tmaWVsZF0udmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJkYXRlXCI6XG5cdFx0XHRcdFx0XHRcdGZpZWxkc1tmaWVsZF0udmFsdWUgPSBuZXcgRGF0ZShmaWVsZHNbZmllbGRdLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwidGltZVwiOlxuXHRcdFx0XHRcdFx0XHR2YXIgdGltZUFycmF5ID0gZmllbGRzW2ZpZWxkXS52YWx1ZS5zcGxpdChcIjpcIik7XG5cdFx0XHRcdFx0XHRcdHZhciBpbnB1dERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdFx0XHRpbnB1dERhdGUuc2V0SG91cnModGltZUFycmF5WzBdKTtcblx0XHRcdFx0XHRcdFx0aW5wdXREYXRlLnNldE1pbnV0ZXModGltZUFycmF5WzFdKTtcblx0XHRcdFx0XHRcdFx0ZmllbGRzW2ZpZWxkXS52YWx1ZSA9IGlucHV0RGF0ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGF0dHIgaW4gZmllbGRzW2ZpZWxkXSl7XG5cdFx0XHRcdFx0XHRmaWVsZFRvQ2hhbmdlW2F0dHJdID0gZmllbGRzW2ZpZWxkXVthdHRyXTtcblx0XHRcdFx0XHRcdGlmKGF0dHIgPT0gXCJkaXNhYmxlZFwiKXtcblx0XHRcdFx0XHRcdFx0dG9EaXNhYmxlID0gZmllbGRzW2ZpZWxkXVthdHRyXSA9PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIrZmllbGRzW2ZpZWxkXS5pZCkuZGlzYWJsZWQ9dG9EaXNhYmxlO1x0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRyZXR1cm4gZm9ybURhdGE7XG5cdFx0Ly9zZWxmLnNldHVwRm9ybSgpO1xuXHRcdH0sXG5cblx0XHRzZW5kQWZ0ZXJGaWVsZFJlcXVlc3Q6IGZ1bmN0aW9uKGZvcm1EYXRhLCBkYXRhTWFwLCBmaWVsZElkLCBmaWVsZFZhbHVlLCByZXF1ZXN0LCBkYXRhKXtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHNlc3Npb25JZCA9IGZvcm1EYXRhLnNlc3Npb25bMF0uQ09NRVRTSUQ7XG5cdFx0XHRmb3JtSWQgPSBmb3JtRGF0YS5mb3JtWzBdLmlkO1xuXHRcdFx0dmFsaWRhdGVVcmwgPSBcIi9jb21ldC5pY3NwP01HV0xQTj1pQ09NRVQmQ09NRVRTSUQ9XCIrc2Vzc2lvbklkK1wiJkNPTUVUTW9kZT1KUyZTRVJWSUNFPUFGVEVSRkxEJlNUQUdFPVJFUVVFU1QmTU9ERT0wJlxcXG5GT1JNQ09ERT1cIitmb3JtSWQrXCImRklFTEQ9XCIrZmllbGRJZCtcIiZSRVFVRVNUPVwiK3JlcXVlc3QrXCImREFUQT1eXCIrZmllbGRJZCtcIj1cIitmaWVsZFZhbHVlO1xuXHRcdFx0ZGF0YVF1ZXJ5U3RyaW5nID0gY29tZXRTZXJ2aWNlcy5idWlsZFJlcXVlc3RRdWVyeVN0cmluZyhkYXRhLCBmb3JtRGF0YSwgZGF0YU1hcCk7XG5cdFx0XHR2YWxpZGF0ZVVybCA9IHZhbGlkYXRlVXJsK2RhdGFRdWVyeVN0cmluZztcblx0XHRcdGFqYXhTZXJ2aWNlcy5odHRwUHJvbWlzZShjb21ldFNlcnZpY2VzLmdldFVybFByZWZpeCgpLCB2YWxpZGF0ZVVybCkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRmb3JtRGF0YSA9IHNlbGYuaGFuZGxlQWZ0ZXJGaWVsZFJlc3BvbnNlKHJlcywgZm9ybURhdGEsIGRhdGFNYXApO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0fVxufV0pXG5cbi5mYWN0b3J5KCdtZW51U2VydmljZXMnLCBbZnVuY3Rpb24gKCkge1xuXHR2YXIgbWVudSA9IHtcblx0XHRkYXRhOiB7fVx0XG5cdH07XG5cblx0bWVudS51cGRhdGVNZW51ID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHQvLyBzYXZlICdkaXZpZGVSYXRpbycgaW4gZGF0YSBmb3IgZWFjaCBjYXRlZ29yeVxuXHRcdGNhbGN1bGF0ZURpdmlkZVJhdGlvKGRhdGEpO1xuXHRcdC8vIHNhdmUgJ2xheW91dENvbHVtbnMnIGluIGRhdGEgZm9yIGVhY2ggY2F0ZWdvcnlcblx0XHRnZW5lcmF0ZUxheW91dChkYXRhKTtcblxuXHRcdG1lbnUuZGF0YSA9IGRhdGE7XG5cdH1cblxuXHRmdW5jdGlvbiBjYWxjdWxhdGVEaXZpZGVSYXRpbyhkYXRhKSB7XG5cdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGNhdGVnb3J5LCBpbmRleCkge1xuXHRcdFx0Ly8gZ3JvdXAgdGl0bGUgc2hvdWxkIGJlIGNvdW50ZWQgYXMgd2VsbCBhcyBncm91cCBpdGVtcyBcblx0XHRcdHZhciBpdGVtcyA9IGNhdGVnb3J5Lmdyb3Vwcy5sZW5ndGg7IFxuXG5cdFx0XHRjYXRlZ29yeS5ncm91cHMuZm9yRWFjaChmdW5jdGlvbihncm91cCkge1xuXHRcdFx0XHQvLyBleGNsdWRlIHRoZSBlbXB0eSBncm91cHNcblx0XHRcdFx0aWYgKGdyb3VwLml0ZW1zLmxlbmd0aCA9PT0gMCkgaXRlbXMtLTsgXG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBhZGQgZ3JvdXAgaXRlbXNcblx0XHRcdFx0aXRlbXMgKz0gZ3JvdXAuaXRlbXMubGVuZ3RoO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBhbiBhdmVyYWdlIHZhbHVlIG9mIGRpdmlkaW5nIGl0ZW1zIGludG8gY29sdW1zXG5cdFx0XHRjYXRlZ29yeS5kaXZpZGVSYXRpbyA9IH5+KE1hdGguc3FydChpdGVtcykgKyAxKTsgXG5cdFx0fSk7IFxuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVMYXlvdXQoZGF0YSkge1xuXHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihjYXRlZ29yeSkge1xuXHRcdFx0Ly8gY2hhbmdlIHRoZSByYXRpbyBiZXR3ZWVuIGNvbHVtbnMgYW5kIHJvd3Ncblx0XHRcdHZhciByb3dzID0gfn4oY2F0ZWdvcnkuZGl2aWRlUmF0aW8gKiAxLjY3ICsgMik7XG5cblx0XHRcdHZhciBsaXN0ID0gWyBbXSBdO1xuXHRcdFx0dmFyIGN1cnJlbnRDb2x1bW4gPSAwLCBjdXJyZW50Um93ID0gMDtcblxuXHRcdFx0Y2F0ZWdvcnkuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwKSB7XG5cdFx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZGlzcGxheSBlbXB0eSBncm91cHNcblx0XHRcdFx0aWYgKGdyb3VwLml0ZW1zLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0XHRcdC8vIHByZXZlbnQgdGhlIGdyb3VwIHRpdGxlIHRvIGJlIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGNvbHVtblxuXHRcdFx0XHRcdGlmIChjdXJyZW50Um93ID09PSByb3dzIC0gMSkgbmV4dENvbHVtbigpO1xuXG5cdFx0XHRcdFx0Ly8gYWRkIGdyb3VwIHRvIHRoZSBjb2x1bW5cblx0XHRcdFx0XHRsaXN0W2N1cnJlbnRDb2x1bW5dLnB1c2goZ3JvdXApO1xuXHRcdFx0XHRcdGN1cnJlbnRSb3crKztcblx0XHRcdFx0XHRpZiAoY3VycmVudFJvdyA+PSByb3dzKSBuZXh0Q29sdW1uKCk7XG5cblx0XHRcdFx0XHQvLyBhZGQgZWFjaCBpdGVtIG9mIHRoZSBncm91cCB0byB0aGUgY29sdW1uXG5cdFx0XHRcdFx0Z3JvdXAuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0XHRcdFx0bGlzdFtjdXJyZW50Q29sdW1uXS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdFx0Y3VycmVudFJvdysrO1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRSb3cgPj0gcm93cykgbmV4dENvbHVtbigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1x0XG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVuY3Rpb24gbmV4dENvbHVtbiAoKSB7XG5cdFx0XHRcdGN1cnJlbnRSb3cgPSAwOyBcblx0XHRcdFx0Y3VycmVudENvbHVtbisrOyBcblx0XHRcdFx0bGlzdC5wdXNoKFtdKTsgXG5cdFx0XHR9XG5cblx0XHRcdGNhdGVnb3J5LmxheW91dENvbHVtbnMgPSBsaXN0O1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBtZW51O1xufV0pXG5cbi5mYWN0b3J5KFwiZm9ybVNlcnZpY2VcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBmb3JtID0ge1xuXHRcdGN1cnJlbnRGb3JtOiBcIldSWDIwMDJcIlxuXHR9O1xuXG5cdGZvcm0udXBkYXRlRm9ybSA9IGZ1bmN0aW9uIChmb3JtQ29kZSkge1xuXHRcdGZvcm0uY3VycmVudEZvcm0gPSBmb3JtQ29kZTtcblx0fTtcblxuXHRyZXR1cm4gZm9ybTtcbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ09NRVQnKTtcblxuYXBwLmZhY3RvcnkoXCJzcGlubmVyU2VydlwiLCBmdW5jdGlvbigpIHtcblx0dmFyIHNwaW4gPSAwO1xuXHR2YXIgc3Bpbm5lciA9IHtcblx0XHRkaXNwbGF5OiAnbm9uZSdcblx0fTtcblxuXHRzcGlubmVyLnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c3Bpbm5lci5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRzcGluKys7XG5cdH1cblxuXHRzcGlubmVyLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c3BpbiA9IHNwaW4gPiAwID8gc3BpbiAtIDEgOiAwO1xuXG5cdFx0aWYgKHNwaW4gPT09IDApIHtcblx0XHRcdHNwaW5uZXIuZGlzcGxheSA9ICdub25lJztcblx0XHR9XG5cdH1cblx0cmV0dXJuIHNwaW5uZXI7XG59KTtcbiIsIi8qXG4gKiBhbmd1Y29tcGxldGUtYWx0XG4gKiBBdXRvY29tcGxldGUgZGlyZWN0aXZlIGZvciBBbmd1bGFySlNcbiAqIFRoaXMgaXMgYSBmb3JrIG9mIERhcnlsIFJvd2xhbmQncyBhbmd1Y29tcGxldGUgd2l0aCBzb21lIGV4dHJhIGZlYXR1cmVzLlxuICogQnkgSGlkZW5hcmkgTm96YWtpXG4gKi9cblxuLyohIENvcHlyaWdodCAoYykgMjAxNCBIaWRlbmFyaSBOb3pha2kgYW5kIGNvbnRyaWJ1dG9ycyB8IExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdhbmd1bGFyJykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZShbJ2FuZ3VsYXInXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gR2xvYmFsIFZhcmlhYmxlc1xuICAgIGZhY3Rvcnkocm9vdC5hbmd1bGFyKTtcbiAgfVxufSh3aW5kb3csIGZ1bmN0aW9uIChhbmd1bGFyKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYW5ndWNvbXBsZXRlLWFsdCcsIFtdKS5kaXJlY3RpdmUoJ2FuZ3Vjb21wbGV0ZUFsdCcsIFsnJHEnLCAnJHBhcnNlJywgJyRodHRwJywgJyRzY2UnLCAnJHRpbWVvdXQnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJGludGVycG9sYXRlJywgZnVuY3Rpb24gKCRxLCAkcGFyc2UsICRodHRwLCAkc2NlLCAkdGltZW91dCwgJHRlbXBsYXRlQ2FjaGUsICRpbnRlcnBvbGF0ZSkge1xuICAgIC8vIGtleWJvYXJkIGV2ZW50c1xuICAgIHZhciBLRVlfRFcgID0gNDA7XG4gICAgdmFyIEtFWV9SVCAgPSAzOTtcbiAgICB2YXIgS0VZX1VQICA9IDM4O1xuICAgIHZhciBLRVlfTEYgID0gMzc7XG4gICAgdmFyIEtFWV9FUyAgPSAyNztcbiAgICB2YXIgS0VZX0VOICA9IDEzO1xuICAgIHZhciBLRVlfVEFCID0gIDk7XG5cbiAgICB2YXIgTUlOX0xFTkdUSCA9IDM7XG4gICAgdmFyIE1BWF9MRU5HVEggPSA1MjQyODg7ICAvLyB0aGUgZGVmYXVsdCBtYXggbGVuZ3RoIHBlciB0aGUgaHRtbCBtYXhsZW5ndGggYXR0cmlidXRlXG4gICAgdmFyIFBBVVNFID0gNTAwO1xuICAgIHZhciBCTFVSX1RJTUVPVVQgPSAyMDA7XG5cbiAgICAvLyBzdHJpbmcgY29uc3RhbnRzXG4gICAgdmFyIFJFUVVJUkVEX0NMQVNTID0gJ2F1dG9jb21wbGV0ZS1yZXF1aXJlZCc7XG4gICAgdmFyIFRFWFRfU0VBUkNISU5HID0gJ1NlYXJjaGluZy4uLic7XG4gICAgdmFyIFRFWFRfTk9SRVNVTFRTID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuICAgIHZhciBURU1QTEFURV9VUkwgPSAnL2FuZ3Vjb21wbGV0ZS1hbHQvaW5kZXguaHRtbCc7XG5cbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgdGVtcGxhdGUgZm9yIHRoaXMgZGlyZWN0aXZlXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KFRFTVBMQVRFX1VSTCxcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJhbmd1Y29tcGxldGUtaG9sZGVyXCIgbmctY2xhc3M9XCJ7XFwnYW5ndWNvbXBsZXRlLWRyb3Bkb3duLXZpc2libGVcXCc6IHNob3dEcm9wZG93bn1cIj4nICtcbiAgICAgICAgJyAgPGlucHV0IGlkPVwie3tpZH19X3ZhbHVlXCIgbmFtZT1cInt7aW5wdXROYW1lfX1cIiB0YWJpbmRleD1cInt7ZmllbGRUYWJpbmRleH19XCIgbmctY2xhc3M9XCJ7XFwnYW5ndWNvbXBsZXRlLWlucHV0LW5vdC1lbXB0eVxcJzogbm90RW1wdHl9XCIgbmctbW9kZWw9XCJzZWFyY2hTdHJcIiBuZy1kaXNhYmxlZD1cImRpc2FibGVJbnB1dFwiIHR5cGU9XCJ7e2lucHV0VHlwZX19XCIgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBtYXhsZW5ndGg9XCJ7e21heGxlbmd0aH19XCIgbmctZm9jdXM9XCJvbkZvY3VzSGFuZGxlcigpXCIgY2xhc3M9XCJ7e2lucHV0Q2xhc3N9fVwiIG5nLWZvY3VzPVwicmVzZXRIaWRlUmVzdWx0cygpXCIgbmctYmx1cj1cImhpZGVSZXN1bHRzKCRldmVudClcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiIGF1dG9jb3JyZWN0PVwib2ZmXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgbmctY2hhbmdlPVwiaW5wdXRDaGFuZ2VIYW5kbGVyKHNlYXJjaFN0cilcIi8+JyArXG4gICAgICAgICcgIDxkaXYgaWQ9XCJ7e2lkfX1fZHJvcGRvd25cIiBjbGFzcz1cImFuZ3Vjb21wbGV0ZS1kcm9wZG93blwiIG5nLXNob3c9XCJzaG93RHJvcGRvd25cIj4nICtcbiAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwiYW5ndWNvbXBsZXRlLXNlYXJjaGluZ1wiIG5nLXNob3c9XCJzZWFyY2hpbmdcIiBuZy1iaW5kPVwidGV4dFNlYXJjaGluZ1wiPjwvZGl2PicgK1xuICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJhbmd1Y29tcGxldGUtc2VhcmNoaW5nXCIgbmctc2hvdz1cIiFzZWFyY2hpbmcgJiYgKCFyZXN1bHRzIHx8IHJlc3VsdHMubGVuZ3RoID09IDApXCIgbmctYmluZD1cInRleHROb1Jlc3VsdHNcIj48L2Rpdj4nICtcbiAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwiYW5ndWNvbXBsZXRlLXJvd1wiIG5nLXJlcGVhdD1cInJlc3VsdCBpbiByZXN1bHRzXCIgbmctY2xpY2s9XCJzZWxlY3RSZXN1bHQocmVzdWx0KVwiIG5nLW1vdXNlZW50ZXI9XCJob3ZlclJvdygkaW5kZXgpXCIgbmctY2xhc3M9XCJ7XFwnYW5ndWNvbXBsZXRlLXNlbGVjdGVkLXJvd1xcJzogJGluZGV4ID09IGN1cnJlbnRJbmRleH1cIj4nICtcbiAgICAgICAgJyAgICAgIDxkaXYgbmctaWY9XCJpbWFnZUZpZWxkXCIgY2xhc3M9XCJhbmd1Y29tcGxldGUtaW1hZ2UtaG9sZGVyXCI+JyArXG4gICAgICAgICcgICAgICAgIDxpbWcgbmctaWY9XCJyZXN1bHQuaW1hZ2UgJiYgcmVzdWx0LmltYWdlICE9IFxcJ1xcJ1wiIG5nLXNyYz1cInt7cmVzdWx0LmltYWdlfX1cIiBjbGFzcz1cImFuZ3Vjb21wbGV0ZS1pbWFnZVwiLz4nICtcbiAgICAgICAgJyAgICAgICAgPGRpdiBuZy1pZj1cIiFyZXN1bHQuaW1hZ2UgJiYgcmVzdWx0LmltYWdlICE9IFxcJ1xcJ1wiIGNsYXNzPVwiYW5ndWNvbXBsZXRlLWltYWdlLWRlZmF1bHRcIj48L2Rpdj4nICtcbiAgICAgICAgJyAgICAgIDwvZGl2PicgK1xuICAgICAgICAnICAgICAgPGRpdiBjbGFzcz1cImFuZ3Vjb21wbGV0ZS10aXRsZVwiIG5nLWlmPVwibWF0Y2hDbGFzc1wiIG5nLWJpbmQtaHRtbD1cInJlc3VsdC50aXRsZVwiPjwvZGl2PicgK1xuICAgICAgICAnICAgICAgPGRpdiBjbGFzcz1cImFuZ3Vjb21wbGV0ZS10aXRsZVwiIG5nLWlmPVwiIW1hdGNoQ2xhc3NcIj57eyByZXN1bHQudGl0bGUgfX08L2Rpdj4nICtcbiAgICAgICAgJyAgICAgIDxkaXYgbmctaWY9XCJtYXRjaENsYXNzICYmIHJlc3VsdC5kZXNjcmlwdGlvbiAmJiByZXN1bHQuZGVzY3JpcHRpb24gIT0gXFwnXFwnXCIgY2xhc3M9XCJhbmd1Y29tcGxldGUtZGVzY3JpcHRpb25cIiBuZy1iaW5kLWh0bWw9XCJyZXN1bHQuZGVzY3JpcHRpb25cIj48L2Rpdj4nICtcbiAgICAgICAgJyAgICAgIDxkaXYgbmctaWY9XCIhbWF0Y2hDbGFzcyAmJiByZXN1bHQuZGVzY3JpcHRpb24gJiYgcmVzdWx0LmRlc2NyaXB0aW9uICE9IFxcJ1xcJ1wiIGNsYXNzPVwiYW5ndWNvbXBsZXRlLWRlc2NyaXB0aW9uXCI+e3tyZXN1bHQuZGVzY3JpcHRpb259fTwvZGl2PicgK1xuICAgICAgICAnICAgIDwvZGl2PicgK1xuICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xuXG4gICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICAgIHZhciBpbnB1dEZpZWxkID0gZWxlbS5maW5kKCdpbnB1dCcpO1xuICAgICAgdmFyIG1pbmxlbmd0aCA9IE1JTl9MRU5HVEg7XG4gICAgICB2YXIgc2VhcmNoVGltZXIgPSBudWxsO1xuICAgICAgdmFyIGhpZGVUaW1lcjtcbiAgICAgIHZhciByZXF1aXJlZENsYXNzTmFtZSA9IFJFUVVJUkVEX0NMQVNTO1xuICAgICAgdmFyIHJlc3BvbnNlRm9ybWF0dGVyO1xuICAgICAgdmFyIHZhbGlkU3RhdGUgPSBudWxsO1xuICAgICAgdmFyIGh0dHBDYW5jZWxsZXIgPSBudWxsO1xuICAgICAgdmFyIGRkID0gZWxlbVswXS5xdWVyeVNlbGVjdG9yKCcuYW5ndWNvbXBsZXRlLWRyb3Bkb3duJyk7XG4gICAgICB2YXIgaXNTY3JvbGxPbiA9IGZhbHNlO1xuICAgICAgdmFyIG1vdXNlZG93bk9uID0gbnVsbDtcbiAgICAgIHZhciB1bmJpbmRJbml0aWFsVmFsdWU7XG4gICAgICB2YXIgZGlzcGxheVNlYXJjaGluZztcbiAgICAgIHZhciBkaXNwbGF5Tm9SZXN1bHRzO1xuXG4gICAgICBlbGVtLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkKSB7XG4gICAgICAgICAgbW91c2Vkb3duT24gPSBldmVudC50YXJnZXQuaWQ7XG4gICAgICAgICAgaWYgKG1vdXNlZG93bk9uID09PSBzY29wZS5pZCArICdfZHJvcGRvd24nKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tvdXRIYW5kbGVyRm9yRHJvcGRvd24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBtb3VzZWRvd25PbiA9IGV2ZW50LnRhcmdldC5jbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzY29wZS5jdXJyZW50SW5kZXggPSBzY29wZS5mb2N1c0ZpcnN0ID8gMCA6IG51bGw7XG4gICAgICBzY29wZS5zZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgIHVuYmluZEluaXRpYWxWYWx1ZSA9IHNjb3BlLiR3YXRjaCgnaW5pdGlhbFZhbHVlJywgZnVuY3Rpb24obmV3dmFsKSB7XG4gICAgICAgIGlmIChuZXd2YWwpIHtcbiAgICAgICAgICAvLyByZW1vdmUgc2NvcGUgbGlzdGVuZXJcbiAgICAgICAgICB1bmJpbmRJbml0aWFsVmFsdWUoKTtcbiAgICAgICAgICAvLyBjaGFuZ2UgaW5wdXRcbiAgICAgICAgICBoYW5kbGVJbnB1dENoYW5nZShuZXd2YWwsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgc2NvcGUuJHdhdGNoKCdmaWVsZFJlcXVpcmVkJywgZnVuY3Rpb24obmV3dmFsLCBvbGR2YWwpIHtcbiAgICAgICAgaWYgKG5ld3ZhbCAhPT0gb2xkdmFsKSB7XG4gICAgICAgICAgaWYgKCFuZXd2YWwpIHtcbiAgICAgICAgICAgIGN0cmxbc2NvcGUuaW5wdXROYW1lXS4kc2V0VmFsaWRpdHkocmVxdWlyZWRDbGFzc05hbWUsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICghdmFsaWRTdGF0ZSB8fCBzY29wZS5jdXJyZW50SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICBoYW5kbGVSZXF1aXJlZChmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlUmVxdWlyZWQodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgc2NvcGUuJG9uKCdhbmd1Y29tcGxldGUtYWx0OmNsZWFySW5wdXQnLCBmdW5jdGlvbiAoZXZlbnQsIGVsZW1lbnRJZCkge1xuICAgICAgICBpZiAoIWVsZW1lbnRJZCB8fCBlbGVtZW50SWQgPT09IHNjb3BlLmlkKSB7XG4gICAgICAgICAgc2NvcGUuc2VhcmNoU3RyID0gbnVsbDtcbiAgICAgICAgICBjYWxsT3JBc3NpZ24oKTtcbiAgICAgICAgICBoYW5kbGVSZXF1aXJlZChmYWxzZSk7XG4gICAgICAgICAgY2xlYXJSZXN1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzY29wZS4kb24oJ2FuZ3Vjb21wbGV0ZS1hbHQ6Y2hhbmdlSW5wdXQnLCBmdW5jdGlvbiAoZXZlbnQsIGVsZW1lbnRJZCwgbmV3dmFsKSB7XG4gICAgICAgIGlmICghIWVsZW1lbnRJZCAmJiBlbGVtZW50SWQgPT09IHNjb3BlLmlkKSB7XG4gICAgICAgICAgaGFuZGxlSW5wdXRDaGFuZ2UobmV3dmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZUlucHV0Q2hhbmdlKG5ld3ZhbCwgaW5pdGlhbCkge1xuICAgICAgICBpZiAobmV3dmFsKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXd2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzY29wZS5zZWFyY2hTdHIgPSBleHRyYWN0VGl0bGUobmV3dmFsKTtcbiAgICAgICAgICAgIGNhbGxPckFzc2lnbih7b3JpZ2luYWxPYmplY3Q6IG5ld3ZhbH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5ld3ZhbCA9PT0gJ3N0cmluZycgJiYgbmV3dmFsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNjb3BlLnNlYXJjaFN0ciA9IG5ld3ZhbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUcmllZCB0byBzZXQgJyArICghIWluaXRpYWwgPyAnaW5pdGlhbCcgOiAnJykgKyAnIHZhbHVlIG9mIGFuZ3Vjb21wbGV0ZSB0bycsIG5ld3ZhbCwgJ3doaWNoIGlzIGFuIGludmFsaWQgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBoYW5kbGVSZXF1aXJlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAjMTk0IGRyb3Bkb3duIGxpc3Qgbm90IGNvbnNpc3RlbnQgaW4gY29sbGFwc2luZyAoYnVnKS5cbiAgICAgIGZ1bmN0aW9uIGNsaWNrb3V0SGFuZGxlckZvckRyb3Bkb3duKGV2ZW50KSB7XG4gICAgICAgIG1vdXNlZG93bk9uID0gbnVsbDtcbiAgICAgICAgc2NvcGUuaGlkZVJlc3VsdHMoZXZlbnQpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tvdXRIYW5kbGVyRm9yRHJvcGRvd24pO1xuICAgICAgfVxuXG4gICAgICAvLyBmb3IgSUU4IHF1aXJraW5lc3MgYWJvdXQgZXZlbnQud2hpY2hcbiAgICAgIGZ1bmN0aW9uIGllOEV2ZW50Tm9ybWFsaXplcihldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQud2hpY2ggPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNhbGxPckFzc2lnbih2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHNjb3BlLnNlbGVjdGVkT2JqZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgc2NvcGUuc2VsZWN0ZWRPYmplY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNjb3BlLnNlbGVjdGVkT2JqZWN0ID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICBoYW5kbGVSZXF1aXJlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVSZXF1aXJlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2FsbEZ1bmN0aW9uT3JJZGVudGl0eShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHJldHVybiBzY29wZVtmbl0gPyBzY29wZVtmbl0oZGF0YSkgOiBkYXRhO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRJbnB1dFN0cmluZyhzdHIpIHtcbiAgICAgICAgY2FsbE9yQXNzaWduKHtvcmlnaW5hbE9iamVjdDogc3RyfSk7XG5cbiAgICAgICAgaWYgKHNjb3BlLmNsZWFyU2VsZWN0ZWQpIHtcbiAgICAgICAgICBzY29wZS5zZWFyY2hTdHIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyUmVzdWx0cygpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBleHRyYWN0VGl0bGUoZGF0YSkge1xuICAgICAgICAvLyBzcGxpdCB0aXRsZSBmaWVsZHMgYW5kIHJ1biBleHRyYWN0VmFsdWUgZm9yIGVhY2ggYW5kIGpvaW4gd2l0aCAnICdcbiAgICAgICAgcmV0dXJuIHNjb3BlLnRpdGxlRmllbGQuc3BsaXQoJywnKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBleHRyYWN0VmFsdWUoZGF0YSwgZmllbGQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZXh0cmFjdFZhbHVlKG9iaiwga2V5KSB7XG4gICAgICAgIHZhciBrZXlzLCByZXN1bHQ7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBrZXlzPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgICByZXN1bHQgPSBvYmo7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHRba2V5c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IG9iajtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmaW5kTWF0Y2hTdHJpbmcodGFyZ2V0LCBzdHIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCwgbWF0Y2hlcywgcmU7XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvR3VpZGUvUmVndWxhcl9FeHByZXNzaW9uc1xuICAgICAgICAvLyBFc2NhcGUgdXNlciBpbnB1dCB0byBiZSB0cmVhdGVkIGFzIGEgbGl0ZXJhbCBzdHJpbmcgd2l0aGluIGEgcmVndWxhciBleHByZXNzaW9uXG4gICAgICAgIHJlID0gbmV3IFJlZ0V4cChzdHIucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKSwgJ2knKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICghdGFyZ2V0Lm1hdGNoIHx8ICF0YXJnZXQucmVwbGFjZSkgeyB0YXJnZXQgPSB0YXJnZXQudG9TdHJpbmcoKTsgfVxuICAgICAgICBtYXRjaGVzID0gdGFyZ2V0Lm1hdGNoKHJlKTtcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICByZXN1bHQgPSB0YXJnZXQucmVwbGFjZShyZSxcbiAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiJysgc2NvcGUubWF0Y2hDbGFzcyArJ1wiPicrIG1hdGNoZXNbMF0gKyc8L3NwYW4+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHJlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVpcmVkKHZhbGlkKSB7XG4gICAgICAgIHNjb3BlLm5vdEVtcHR5ID0gdmFsaWQ7XG4gICAgICAgIHZhbGlkU3RhdGUgPSBzY29wZS5zZWFyY2hTdHI7XG4gICAgICAgIGlmIChzY29wZS5maWVsZFJlcXVpcmVkICYmIGN0cmwgJiYgc2NvcGUuaW5wdXROYW1lKSB7XG4gICAgICAgICAgY3RybFtzY29wZS5pbnB1dE5hbWVdLiRzZXRWYWxpZGl0eShyZXF1aXJlZENsYXNzTmFtZSwgdmFsaWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGtleXVwSGFuZGxlcihldmVudCkge1xuICAgICAgICB2YXIgd2hpY2ggPSBpZThFdmVudE5vcm1hbGl6ZXIoZXZlbnQpO1xuICAgICAgICBpZiAod2hpY2ggPT09IEtFWV9MRiB8fCB3aGljaCA9PT0gS0VZX1JUKSB7XG4gICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aGljaCA9PT0gS0VZX1VQIHx8IHdoaWNoID09PSBLRVlfRU4pIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdoaWNoID09PSBLRVlfRFcpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmICghc2NvcGUuc2hvd0Ryb3Bkb3duICYmIHNjb3BlLnNlYXJjaFN0ciAmJiBzY29wZS5zZWFyY2hTdHIubGVuZ3RoID49IG1pbmxlbmd0aCkge1xuICAgICAgICAgICAgaW5pdFJlc3VsdHMoKTtcbiAgICAgICAgICAgIHNjb3BlLnNlYXJjaGluZyA9IHRydWU7XG4gICAgICAgICAgICBzZWFyY2hUaW1lckNvbXBsZXRlKHNjb3BlLnNlYXJjaFN0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdoaWNoID09PSBLRVlfRVMpIHtcbiAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcbiAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnZhbChzY29wZS5zZWFyY2hTdHIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChtaW5sZW5ndGggPT09IDAgJiYgIXNjb3BlLnNlYXJjaFN0cikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc2NvcGUuc2VhcmNoU3RyIHx8IHNjb3BlLnNlYXJjaFN0ciA9PT0gJycpIHtcbiAgICAgICAgICAgIHNjb3BlLnNob3dEcm9wZG93biA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NvcGUuc2VhcmNoU3RyLmxlbmd0aCA+PSBtaW5sZW5ndGgpIHtcbiAgICAgICAgICAgIGluaXRSZXN1bHRzKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWFyY2hUaW1lcikge1xuICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwoc2VhcmNoVGltZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29wZS5zZWFyY2hpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBzZWFyY2hUaW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzZWFyY2hUaW1lckNvbXBsZXRlKHNjb3BlLnNlYXJjaFN0cik7XG4gICAgICAgICAgICB9LCBzY29wZS5wYXVzZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbGlkU3RhdGUgJiYgdmFsaWRTdGF0ZSAhPT0gc2NvcGUuc2VhcmNoU3RyICYmICFzY29wZS5jbGVhclNlbGVjdGVkKSB7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNhbGxPckFzc2lnbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZU92ZXJyaWRlU3VnZ2VzdGlvbnMoZXZlbnQpIHtcbiAgICAgICAgaWYgKHNjb3BlLm92ZXJyaWRlU3VnZ2VzdGlvbnMgJiZcbiAgICAgICAgICAgICEoc2NvcGUuc2VsZWN0ZWRPYmplY3QgJiYgc2NvcGUuc2VsZWN0ZWRPYmplY3Qub3JpZ2luYWxPYmplY3QgPT09IHNjb3BlLnNlYXJjaFN0cikpIHtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2FuY2VsIHNlYXJjaCB0aW1lclxuICAgICAgICAgICR0aW1lb3V0LmNhbmNlbChzZWFyY2hUaW1lcik7XG4gICAgICAgICAgLy8gY2FuY2VsIGh0dHAgcmVxdWVzdFxuICAgICAgICAgIGNhbmNlbEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICBzZXRJbnB1dFN0cmluZyhzY29wZS5zZWFyY2hTdHIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duUm93T2Zmc2V0SGVpZ2h0KHJvdykge1xuICAgICAgICB2YXIgY3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3cpO1xuICAgICAgICByZXR1cm4gcm93Lm9mZnNldEhlaWdodCArXG4gICAgICAgICAgcGFyc2VJbnQoY3NzLm1hcmdpblRvcCwgMTApICsgcGFyc2VJbnQoY3NzLm1hcmdpbkJvdHRvbSwgMTApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkcm9wZG93bkhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIGRkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArXG4gICAgICAgICAgcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShkZCkubWF4SGVpZ2h0LCAxMCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duUm93KCkge1xuICAgICAgICByZXR1cm4gZWxlbVswXS5xdWVyeVNlbGVjdG9yQWxsKCcuYW5ndWNvbXBsZXRlLXJvdycpW3Njb3BlLmN1cnJlbnRJbmRleF07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRyb3Bkb3duUm93VG9wKCkge1xuICAgICAgICByZXR1cm4gZHJvcGRvd25Sb3coKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLVxuICAgICAgICAgIChkZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgK1xuICAgICAgICAgICBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGRkKS5wYWRkaW5nVG9wLCAxMCkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkcm9wZG93blNjcm9sbFRvcFRvKG9mZnNldCkge1xuICAgICAgICBkZC5zY3JvbGxUb3AgPSBkZC5zY3JvbGxUb3AgKyBvZmZzZXQ7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUlucHV0RmllbGQoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBzY29wZS5yZXN1bHRzW3Njb3BlLmN1cnJlbnRJbmRleF07XG4gICAgICAgIGlmIChzY29wZS5tYXRjaENsYXNzKSB7XG4gICAgICAgICAgaW5wdXRGaWVsZC52YWwoZXh0cmFjdFRpdGxlKGN1cnJlbnQub3JpZ2luYWxPYmplY3QpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpbnB1dEZpZWxkLnZhbChjdXJyZW50LnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBrZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgICAgICB2YXIgd2hpY2ggPSBpZThFdmVudE5vcm1hbGl6ZXIoZXZlbnQpO1xuICAgICAgICB2YXIgcm93ID0gbnVsbDtcbiAgICAgICAgdmFyIHJvd1RvcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHdoaWNoID09PSBLRVlfRU4gJiYgc2NvcGUucmVzdWx0cykge1xuICAgICAgICAgIGlmIChzY29wZS5jdXJyZW50SW5kZXggPj0gMCAmJiBzY29wZS5jdXJyZW50SW5kZXggPCBzY29wZS5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNjb3BlLnNlbGVjdFJlc3VsdChzY29wZS5yZXN1bHRzW3Njb3BlLmN1cnJlbnRJbmRleF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVPdmVycmlkZVN1Z2dlc3Rpb25zKGV2ZW50KTtcbiAgICAgICAgICAgIGNsZWFyUmVzdWx0cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aGljaCA9PT0gS0VZX0RXICYmIHNjb3BlLnJlc3VsdHMpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmICgoc2NvcGUuY3VycmVudEluZGV4ICsgMSkgPCBzY29wZS5yZXN1bHRzLmxlbmd0aCAmJiBzY29wZS5zaG93RHJvcGRvd24pIHtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2NvcGUuY3VycmVudEluZGV4ICsrO1xuICAgICAgICAgICAgICB1cGRhdGVJbnB1dEZpZWxkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGlzU2Nyb2xsT24pIHtcbiAgICAgICAgICAgICAgcm93ID0gZHJvcGRvd25Sb3coKTtcbiAgICAgICAgICAgICAgaWYgKGRyb3Bkb3duSGVpZ2h0KCkgPCByb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25TY3JvbGxUb3BUbyhkcm9wZG93blJvd09mZnNldEhlaWdodChyb3cpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh3aGljaCA9PT0gS0VZX1VQICYmIHNjb3BlLnJlc3VsdHMpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChzY29wZS5jdXJyZW50SW5kZXggPj0gMSkge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzY29wZS5jdXJyZW50SW5kZXggLS07XG4gICAgICAgICAgICAgIHVwZGF0ZUlucHV0RmllbGQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaXNTY3JvbGxPbikge1xuICAgICAgICAgICAgICByb3dUb3AgPSBkcm9wZG93blJvd1RvcCgpO1xuICAgICAgICAgICAgICBpZiAocm93VG9wIDwgMCkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duU2Nyb2xsVG9wVG8ocm93VG9wIC0gMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoc2NvcGUuY3VycmVudEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNjb3BlLmN1cnJlbnRJbmRleCA9IC0xO1xuICAgICAgICAgICAgICBpbnB1dEZpZWxkLnZhbChzY29wZS5zZWFyY2hTdHIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBLRVlfVEFCKSB7XG4gICAgICAgICAgaWYgKHNjb3BlLnJlc3VsdHMgJiYgc2NvcGUucmVzdWx0cy5sZW5ndGggPiAwICYmIHNjb3BlLnNob3dEcm9wZG93bikge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmN1cnJlbnRJbmRleCA9PT0gLTEgJiYgc2NvcGUub3ZlcnJpZGVTdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAvLyBpbnRlbnRpb25hbGx5IG5vdCBzZW5kaW5nIGV2ZW50IHNvIHRoYXQgaXQgZG9lcyBub3RcbiAgICAgICAgICAgICAgLy8gcHJldmVudCBkZWZhdWx0IHRhYiBiZWhhdmlvclxuICAgICAgICAgICAgICBoYW5kbGVPdmVycmlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNjb3BlLmN1cnJlbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNjb3BlLnNlbGVjdFJlc3VsdChzY29wZS5yZXN1bHRzW3Njb3BlLmN1cnJlbnRJbmRleF0pO1xuICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gbm8gcmVzdWx0c1xuICAgICAgICAgICAgLy8gaW50ZW50aW9uYWxseSBub3Qgc2VuZGluZyBldmVudCBzbyB0aGF0IGl0IGRvZXMgbm90XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgdGFiIGJlaGF2aW9yXG4gICAgICAgICAgICBpZiAoc2NvcGUuc2VhcmNoU3RyICYmIHNjb3BlLnNlYXJjaFN0ci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGhhbmRsZU92ZXJyaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9FUykge1xuICAgICAgICAgIC8vIFRoaXMgaXMgdmVyeSBzcGVjaWZpYyB0byBJRTEwLzExICMyNzJcbiAgICAgICAgICAvLyB3aXRob3V0IHRoaXMsIElFIGNsZWFycyB0aGUgaW5wdXQgdGV4dFxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaHR0cFN1Y2Nlc3NDYWxsYmFja0dlbihzdHIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlc3BvbnNlRGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAvLyBub3JtYWxpemUgcmV0dXJuIG9iZWpjdCBmcm9tIHByb21pc2VcbiAgICAgICAgICBpZiAoIXN0YXR1cyAmJiAhaGVhZGVycyAmJiAhY29uZmlnICYmIHJlc3BvbnNlRGF0YS5kYXRhKSB7XG4gICAgICAgICAgICByZXNwb25zZURhdGEgPSByZXNwb25zZURhdGEuZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuc2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgcHJvY2Vzc1Jlc3VsdHMoXG4gICAgICAgICAgICBleHRyYWN0VmFsdWUocmVzcG9uc2VGb3JtYXR0ZXIocmVzcG9uc2VEYXRhKSwgc2NvcGUucmVtb3RlVXJsRGF0YUZpZWxkKSxcbiAgICAgICAgICAgIHN0cik7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGh0dHBFcnJvckNhbGxiYWNrKGVycm9yUmVzLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuICAgICAgICAvLyBjYW5jZWxsZWQvYWJvcnRlZFxuICAgICAgICBpZiAoc3RhdHVzID09PSAwIHx8IHN0YXR1cyA9PT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIHJldHVybiBvYmVqY3QgZnJvbSBwcm9taXNlXG4gICAgICAgIGlmICghc3RhdHVzICYmICFoZWFkZXJzICYmICFjb25maWcpIHtcbiAgICAgICAgICBzdGF0dXMgPSBlcnJvclJlcy5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnJlbW90ZVVybEVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICBzY29wZS5yZW1vdGVVcmxFcnJvckNhbGxiYWNrKGVycm9yUmVzLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignaHR0cCBlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjYW5jZWxIdHRwUmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKGh0dHBDYW5jZWxsZXIpIHtcbiAgICAgICAgICBodHRwQ2FuY2VsbGVyLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRSZW1vdGVSZXN1bHRzKHN0cikge1xuICAgICAgICB2YXIgcGFyYW1zID0ge30sXG4gICAgICAgICAgICB1cmwgPSBzY29wZS5yZW1vdGVVcmwgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyKTtcbiAgICAgICAgaWYgKHNjb3BlLnJlbW90ZVVybFJlcXVlc3RGb3JtYXR0ZXIpIHtcbiAgICAgICAgICBwYXJhbXMgPSB7cGFyYW1zOiBzY29wZS5yZW1vdGVVcmxSZXF1ZXN0Rm9ybWF0dGVyKHN0cil9O1xuICAgICAgICAgIHVybCA9IHNjb3BlLnJlbW90ZVVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISFzY29wZS5yZW1vdGVVcmxSZXF1ZXN0V2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgcGFyYW1zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FuY2VsSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgaHR0cENhbmNlbGxlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgIHBhcmFtcy50aW1lb3V0ID0gaHR0cENhbmNlbGxlci5wcm9taXNlO1xuICAgICAgICAkaHR0cC5nZXQodXJsLCBwYXJhbXMpXG4gICAgICAgICAgLnN1Y2Nlc3MoaHR0cFN1Y2Nlc3NDYWxsYmFja0dlbihzdHIpKVxuICAgICAgICAgIC5lcnJvcihodHRwRXJyb3JDYWxsYmFjayk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFJlbW90ZVJlc3VsdHNXaXRoQ3VzdG9tSGFuZGxlcihzdHIpIHtcbiAgICAgICAgY2FuY2VsSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICBodHRwQ2FuY2VsbGVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBzY29wZS5yZW1vdGVBcGlIYW5kbGVyKHN0ciwgaHR0cENhbmNlbGxlci5wcm9taXNlKVxuICAgICAgICAgIC50aGVuKGh0dHBTdWNjZXNzQ2FsbGJhY2tHZW4oc3RyKSlcbiAgICAgICAgICAuY2F0Y2goaHR0cEVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgIC8qIElFOCBjb21wYXRpYmxlXG4gICAgICAgIHNjb3BlLnJlbW90ZUFwaUhhbmRsZXIoc3RyLCBodHRwQ2FuY2VsbGVyLnByb21pc2UpXG4gICAgICAgICAgWyd0aGVuJ10oaHR0cFN1Y2Nlc3NDYWxsYmFja0dlbihzdHIpKVxuICAgICAgICAgIFsnY2F0Y2gnXShodHRwRXJyb3JDYWxsYmFjayk7XG4gICAgICAgICovXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFyUmVzdWx0cygpIHtcbiAgICAgICAgc2NvcGUuc2hvd0Ryb3Bkb3duID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLnJlc3VsdHMgPSBbXTtcbiAgICAgICAgaWYgKGRkKSB7XG4gICAgICAgICAgZGQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbml0UmVzdWx0cygpIHtcbiAgICAgICAgc2NvcGUuc2hvd0Ryb3Bkb3duID0gZGlzcGxheVNlYXJjaGluZztcbiAgICAgICAgc2NvcGUuY3VycmVudEluZGV4ID0gc2NvcGUuZm9jdXNGaXJzdCA/IDAgOiAtMTtcbiAgICAgICAgc2NvcGUucmVzdWx0cyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRMb2NhbFJlc3VsdHMoc3RyKSB7XG4gICAgICAgIHZhciBpLCBtYXRjaCwgcywgdmFsdWUsXG4gICAgICAgICAgICBzZWFyY2hGaWVsZHMgPSBzY29wZS5zZWFyY2hGaWVsZHMuc3BsaXQoJywnKSxcbiAgICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY29wZS5wYXJzZUlucHV0KCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgc3RyID0gc2NvcGUucGFyc2VJbnB1dCgpKHN0cik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNjb3BlLmxvY2FsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgICBmb3IgKHMgPSAwOyBzIDwgc2VhcmNoRmllbGRzLmxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGV4dHJhY3RWYWx1ZShzY29wZS5sb2NhbERhdGFbaV0sIHNlYXJjaEZpZWxkc1tzXSkgfHwgJyc7XG4gICAgICAgICAgICBtYXRjaCA9IG1hdGNoIHx8ICh2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzdHIudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGhdID0gc2NvcGUubG9jYWxEYXRhW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2hlY2tFeGFjdE1hdGNoKHJlc3VsdCwgb2JqLCBzdHIpe1xuICAgICAgICBpZiAoIXN0cikgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgICAgICBpZihvYmpba2V5XS50b0xvd2VyQ2FzZSgpID09PSBzdHIudG9Mb3dlckNhc2UoKSl7XG4gICAgICAgICAgICBzY29wZS5zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNlYXJjaFRpbWVyQ29tcGxldGUoc3RyKSB7XG4gICAgICAgIC8vIEJlZ2luIHRoZSBzZWFyY2hcbiAgICAgICAgaWYgKCFzdHIgfHwgc3RyLmxlbmd0aCA8IG1pbmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUubG9jYWxEYXRhKSB7XG4gICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLmxvY2FsU2VhcmNoKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIG1hdGNoZXMgPSBzY29wZS5sb2NhbFNlYXJjaCgpKHN0cik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXRjaGVzID0gZ2V0TG9jYWxSZXN1bHRzKHN0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY29wZS5zZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHByb2Nlc3NSZXN1bHRzKG1hdGNoZXMsIHN0cik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2NvcGUucmVtb3RlQXBpSGFuZGxlcikge1xuICAgICAgICAgIGdldFJlbW90ZVJlc3VsdHNXaXRoQ3VzdG9tSGFuZGxlcihzdHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdldFJlbW90ZVJlc3VsdHMoc3RyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwcm9jZXNzUmVzdWx0cyhyZXNwb25zZURhdGEsIHN0cikge1xuICAgICAgICB2YXIgaSwgZGVzY3JpcHRpb24sIGltYWdlLCB0ZXh0LCBmb3JtYXR0ZWRUZXh0LCBmb3JtYXR0ZWREZXNjO1xuXG4gICAgICAgIGlmIChyZXNwb25zZURhdGEgJiYgcmVzcG9uc2VEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzY29wZS5yZXN1bHRzID0gW107XG5cbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzcG9uc2VEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUudGl0bGVGaWVsZCAmJiBzY29wZS50aXRsZUZpZWxkICE9PSAnJykge1xuICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0dGVkVGV4dCA9IGV4dHJhY3RUaXRsZShyZXNwb25zZURhdGFbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAgICAgaWYgKHNjb3BlLmRlc2NyaXB0aW9uRmllbGQpIHtcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSBmb3JtYXR0ZWREZXNjID0gZXh0cmFjdFZhbHVlKHJlc3BvbnNlRGF0YVtpXSwgc2NvcGUuZGVzY3JpcHRpb25GaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGltYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoc2NvcGUuaW1hZ2VGaWVsZCkge1xuICAgICAgICAgICAgICBpbWFnZSA9IGV4dHJhY3RWYWx1ZShyZXNwb25zZURhdGFbaV0sIHNjb3BlLmltYWdlRmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2NvcGUubWF0Y2hDbGFzcykge1xuICAgICAgICAgICAgICBmb3JtYXR0ZWRUZXh0ID0gZmluZE1hdGNoU3RyaW5nKHRleHQsIHN0cik7XG4gICAgICAgICAgICAgIGZvcm1hdHRlZERlc2MgPSBmaW5kTWF0Y2hTdHJpbmcoZGVzY3JpcHRpb24sIHN0cik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLnJlc3VsdHNbc2NvcGUucmVzdWx0cy5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICB0aXRsZTogZm9ybWF0dGVkVGV4dCxcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGZvcm1hdHRlZERlc2MsXG4gICAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgICAgb3JpZ2luYWxPYmplY3Q6IHJlc3BvbnNlRGF0YVtpXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY29wZS5yZXN1bHRzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NvcGUuYXV0b01hdGNoICYmIHNjb3BlLnJlc3VsdHMubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgICBjaGVja0V4YWN0TWF0Y2goc2NvcGUucmVzdWx0c1swXSxcbiAgICAgICAgICAgICAge3RpdGxlOiB0ZXh0LCBkZXNjOiBkZXNjcmlwdGlvbiB8fCAnJ30sIHNjb3BlLnNlYXJjaFN0cikpIHtcbiAgICAgICAgICBzY29wZS5zaG93RHJvcGRvd24gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChzY29wZS5yZXN1bHRzLmxlbmd0aCA9PT0gMCAmJiAhZGlzcGxheU5vUmVzdWx0cykge1xuICAgICAgICAgIHNjb3BlLnNob3dEcm9wZG93biA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjb3BlLnNob3dEcm9wZG93biA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hvd0FsbCgpIHtcbiAgICAgICAgaWYgKHNjb3BlLmxvY2FsRGF0YSkge1xuICAgICAgICAgIHByb2Nlc3NSZXN1bHRzKHNjb3BlLmxvY2FsRGF0YSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNjb3BlLnJlbW90ZUFwaUhhbmRsZXIpIHtcbiAgICAgICAgICBnZXRSZW1vdGVSZXN1bHRzV2l0aEN1c3RvbUhhbmRsZXIoJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGdldFJlbW90ZVJlc3VsdHMoJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNjb3BlLm9uRm9jdXNIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzY29wZS5mb2N1c0luKSB7XG4gICAgICAgICAgc2NvcGUuZm9jdXNJbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW5sZW5ndGggPT09IDAgJiYgKCFzY29wZS5zZWFyY2hTdHIgfHwgc2NvcGUuc2VhcmNoU3RyLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICBzY29wZS5jdXJyZW50SW5kZXggPSBzY29wZS5mb2N1c0ZpcnN0ID8gMCA6IHNjb3BlLmN1cnJlbnRJbmRleDtcbiAgICAgICAgICBzY29wZS5zaG93RHJvcGRvd24gPSB0cnVlO1xuICAgICAgICAgIHNob3dBbGwoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2NvcGUuaGlkZVJlc3VsdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG1vdXNlZG93bk9uICYmXG4gICAgICAgICAgICAobW91c2Vkb3duT24gPT09IHNjb3BlLmlkICsgJ19kcm9wZG93bicgfHxcbiAgICAgICAgICAgICBtb3VzZWRvd25Pbi5pbmRleE9mKCdhbmd1Y29tcGxldGUnKSA+PSAwKSkge1xuICAgICAgICAgIG1vdXNlZG93bk9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoaWRlVGltZXIgPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsZWFyUmVzdWx0cygpO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2NvcGUuc2VhcmNoU3RyICYmIHNjb3BlLnNlYXJjaFN0ci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRGaWVsZC52YWwoc2NvcGUuc2VhcmNoU3RyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgQkxVUl9USU1FT1VUKTtcbiAgICAgICAgICBjYW5jZWxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgaWYgKHNjb3BlLmZvY3VzT3V0KSB7XG4gICAgICAgICAgICBzY29wZS5mb2N1c091dCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzY29wZS5vdmVycmlkZVN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuc2VhcmNoU3RyICYmIHNjb3BlLnNlYXJjaFN0ci5sZW5ndGggPiAwICYmIHNjb3BlLmN1cnJlbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgaGFuZGxlT3ZlcnJpZGVTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2NvcGUucmVzZXRIaWRlUmVzdWx0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaGlkZVRpbWVyKSB7XG4gICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKGhpZGVUaW1lcik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHNjb3BlLmhvdmVyUm93ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgc2NvcGUuY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICB9O1xuXG4gICAgICBzY29wZS5zZWxlY3RSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLy8gUmVzdG9yZSBvcmlnaW5hbCB2YWx1ZXNcbiAgICAgICAgaWYgKHNjb3BlLm1hdGNoQ2xhc3MpIHtcbiAgICAgICAgICByZXN1bHQudGl0bGUgPSBleHRyYWN0VGl0bGUocmVzdWx0Lm9yaWdpbmFsT2JqZWN0KTtcbiAgICAgICAgICByZXN1bHQuZGVzY3JpcHRpb24gPSBleHRyYWN0VmFsdWUocmVzdWx0Lm9yaWdpbmFsT2JqZWN0LCBzY29wZS5kZXNjcmlwdGlvbkZpZWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY29wZS5jbGVhclNlbGVjdGVkKSB7XG4gICAgICAgICAgc2NvcGUuc2VhcmNoU3RyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzY29wZS5zZWFyY2hTdHIgPSByZXN1bHQudGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbE9yQXNzaWduKHJlc3VsdCk7XG4gICAgICAgIGNsZWFyUmVzdWx0cygpO1xuICAgICAgfTtcblxuICAgICAgc2NvcGUuaW5wdXRDaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIGlmIChzdHIubGVuZ3RoIDwgbWlubGVuZ3RoKSB7XG4gICAgICAgICAgY2FuY2VsSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdHIubGVuZ3RoID09PSAwICYmIG1pbmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNjb3BlLnNlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNob3dBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY29wZS5pbnB1dENoYW5nZWQpIHtcbiAgICAgICAgICBzdHIgPSBzY29wZS5pbnB1dENoYW5nZWQoc3RyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfTtcblxuICAgICAgLy8gY2hlY2sgcmVxdWlyZWRcbiAgICAgIGlmIChzY29wZS5maWVsZFJlcXVpcmVkQ2xhc3MgJiYgc2NvcGUuZmllbGRSZXF1aXJlZENsYXNzICE9PSAnJykge1xuICAgICAgICByZXF1aXJlZENsYXNzTmFtZSA9IHNjb3BlLmZpZWxkUmVxdWlyZWRDbGFzcztcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgbWluIGxlbmd0aFxuICAgICAgaWYgKHNjb3BlLm1pbmxlbmd0aCAmJiBzY29wZS5taW5sZW5ndGggIT09ICcnKSB7XG4gICAgICAgIG1pbmxlbmd0aCA9IHBhcnNlSW50KHNjb3BlLm1pbmxlbmd0aCwgMTApO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBwYXVzZSB0aW1lXG4gICAgICBpZiAoIXNjb3BlLnBhdXNlKSB7XG4gICAgICAgIHNjb3BlLnBhdXNlID0gUEFVU0U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGNsZWFyU2VsZWN0ZWRcbiAgICAgIGlmICghc2NvcGUuY2xlYXJTZWxlY3RlZCkge1xuICAgICAgICBzY29wZS5jbGVhclNlbGVjdGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIG92ZXJyaWRlIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAoIXNjb3BlLm92ZXJyaWRlU3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgc2NvcGUub3ZlcnJpZGVTdWdnZXN0aW9ucyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayByZXF1aXJlZCBmaWVsZFxuICAgICAgaWYgKHNjb3BlLmZpZWxkUmVxdWlyZWQgJiYgY3RybCkge1xuICAgICAgICAvLyBjaGVjayBpbml0aWFsIHZhbHVlLCBpZiBnaXZlbiwgc2V0IHZhbGlkaXRpdHkgdG8gdHJ1ZVxuICAgICAgICBpZiAoc2NvcGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgaGFuZGxlUmVxdWlyZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaGFuZGxlUmVxdWlyZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNjb3BlLmlucHV0VHlwZSA9IGF0dHJzLnR5cGUgPyBhdHRycy50eXBlIDogJ3RleHQnO1xuXG4gICAgICAvLyBzZXQgc3RyaW5ncyBmb3IgXCJTZWFyY2hpbmcuLi5cIiBhbmQgXCJObyByZXN1bHRzXCJcbiAgICAgIHNjb3BlLnRleHRTZWFyY2hpbmcgPSBhdHRycy50ZXh0U2VhcmNoaW5nID8gYXR0cnMudGV4dFNlYXJjaGluZyA6IFRFWFRfU0VBUkNISU5HO1xuICAgICAgc2NvcGUudGV4dE5vUmVzdWx0cyA9IGF0dHJzLnRleHROb1Jlc3VsdHMgPyBhdHRycy50ZXh0Tm9SZXN1bHRzIDogVEVYVF9OT1JFU1VMVFM7XG4gICAgICBkaXNwbGF5U2VhcmNoaW5nID0gc2NvcGUudGV4dFNlYXJjaGluZyA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIGRpc3BsYXlOb1Jlc3VsdHMgPSBzY29wZS50ZXh0Tm9SZXN1bHRzID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAvLyBzZXQgbWF4IGxlbmd0aCAoZGVmYXVsdCB0byBtYXhsZW5ndGggZGVhdWx0IGZyb20gaHRtbFxuICAgICAgc2NvcGUubWF4bGVuZ3RoID0gYXR0cnMubWF4bGVuZ3RoID8gYXR0cnMubWF4bGVuZ3RoIDogTUFYX0xFTkdUSDtcblxuICAgICAgLy8gcmVnaXN0ZXIgZXZlbnRzXG4gICAgICBpbnB1dEZpZWxkLm9uKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuICAgICAgaW5wdXRGaWVsZC5vbigna2V5dXAnLCBrZXl1cEhhbmRsZXIpO1xuXG4gICAgICAvLyBzZXQgcmVzcG9uc2UgZm9ybWF0dGVyXG4gICAgICByZXNwb25zZUZvcm1hdHRlciA9IGNhbGxGdW5jdGlvbk9ySWRlbnRpdHkoJ3JlbW90ZVVybFJlc3BvbnNlRm9ybWF0dGVyJyk7XG5cbiAgICAgIC8vIHNldCBpc1Njcm9sbE9uXG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoZGQpO1xuICAgICAgICBpc1Njcm9sbE9uID0gY3NzLm1heEhlaWdodCAmJiBjc3Mub3ZlcmZsb3dZID09PSAnYXV0byc7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICByZXF1aXJlOiAnXj9mb3JtJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHNlbGVjdGVkT2JqZWN0OiAnPScsXG4gICAgICAgIGRpc2FibGVJbnB1dDogJz0nLFxuICAgICAgICBpbml0aWFsVmFsdWU6ICc9JyxcbiAgICAgICAgbG9jYWxEYXRhOiAnPScsXG4gICAgICAgIGxvY2FsU2VhcmNoOiAnJicsXG4gICAgICAgIHJlbW90ZVVybFJlcXVlc3RGb3JtYXR0ZXI6ICc9JyxcbiAgICAgICAgcmVtb3RlVXJsUmVxdWVzdFdpdGhDcmVkZW50aWFsczogJ0AnLFxuICAgICAgICByZW1vdGVVcmxSZXNwb25zZUZvcm1hdHRlcjogJz0nLFxuICAgICAgICByZW1vdGVVcmxFcnJvckNhbGxiYWNrOiAnPScsXG4gICAgICAgIHJlbW90ZUFwaUhhbmRsZXI6ICc9JyxcbiAgICAgICAgaWQ6ICdAJyxcbiAgICAgICAgdHlwZTogJ0AnLFxuICAgICAgICBwbGFjZWhvbGRlcjogJ0AnLFxuICAgICAgICByZW1vdGVVcmw6ICdAJyxcbiAgICAgICAgcmVtb3RlVXJsRGF0YUZpZWxkOiAnQCcsXG4gICAgICAgIHRpdGxlRmllbGQ6ICdAJyxcbiAgICAgICAgZGVzY3JpcHRpb25GaWVsZDogJ0AnLFxuICAgICAgICBpbWFnZUZpZWxkOiAnQCcsXG4gICAgICAgIGlucHV0Q2xhc3M6ICdAJyxcbiAgICAgICAgcGF1c2U6ICdAJyxcbiAgICAgICAgc2VhcmNoRmllbGRzOiAnQCcsXG4gICAgICAgIG1pbmxlbmd0aDogJ0AnLFxuICAgICAgICBtYXRjaENsYXNzOiAnQCcsXG4gICAgICAgIGNsZWFyU2VsZWN0ZWQ6ICdAJyxcbiAgICAgICAgb3ZlcnJpZGVTdWdnZXN0aW9uczogJ0AnLFxuICAgICAgICBmaWVsZFJlcXVpcmVkOiAnPScsXG4gICAgICAgIGZpZWxkUmVxdWlyZWRDbGFzczogJ0AnLFxuICAgICAgICBpbnB1dENoYW5nZWQ6ICc9JyxcbiAgICAgICAgYXV0b01hdGNoOiAnQCcsXG4gICAgICAgIGZvY3VzT3V0OiAnJicsXG4gICAgICAgIGZvY3VzSW46ICcmJyxcbiAgICAgICAgZmllbGRUYWJpbmRleDogJ0AnLFxuICAgICAgICBpbnB1dE5hbWU6ICdAJyxcbiAgICAgICAgZm9jdXNGaXJzdDogJ0AnLFxuICAgICAgICBwYXJzZUlucHV0OiAnJidcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24oZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJzLnRlbXBsYXRlVXJsIHx8IFRFTVBMQVRFX1VSTDtcbiAgICAgIH0sXG4gICAgICBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCkge1xuICAgICAgICB2YXIgc3RhcnRTeW0gPSAkaW50ZXJwb2xhdGUuc3RhcnRTeW1ib2woKTtcbiAgICAgICAgdmFyIGVuZFN5bSA9ICRpbnRlcnBvbGF0ZS5lbmRTeW1ib2woKTtcbiAgICAgICAgaWYgKCEoc3RhcnRTeW0gPT09ICd7eycgJiYgZW5kU3ltID09PSAnfX0nKSkge1xuICAgICAgICAgIHZhciBpbnRlcnBvbGF0ZWRIdG1sID0gdEVsZW1lbnQuaHRtbCgpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFx7XFx7L2csIHN0YXJ0U3ltKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcfVxcfS9nLCBlbmRTeW0pO1xuICAgICAgICAgIHRFbGVtZW50Lmh0bWwoaW50ZXJwb2xhdGVkSHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KSk7XG4iXX0=
