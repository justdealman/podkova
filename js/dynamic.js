function slider() {
	$('.slider .temp > div').each(function() {
		var path = $(this).children('img').attr('src');
		$(this).css({
			'background': 'url("'+path+'") no-repeat center center'
		});
	})
	$('.slider .container').empty();
	$('.slider .prev, .slider .next, .slider .pagination').remove();
	$('.slider .container').html($('.slider .temp').html());
	$('.slider, .slider .container, .slider .container > div').width($('.wrapper').width());
	$('.slider').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 10000,
		pause: 2500,
		slidesLoaded: function() {
			var current = $('.slider .pagination li.current').index();
			$('.nav-index li').eq(current).addClass('active').siblings().removeClass('active');
		},
		animationComplete: function() {
			var current = $('.slider .pagination li.current').index();
			$('.nav-index li').eq(current).addClass('active').siblings().removeClass('active');
		}
	});
}
$(function() {
	slider();
	$('.slider').bind('swipeleft', function() {
		$('.slider .next').trigger('click');
	});
	$('.slider').bind('swiperight', function() {
		$('.slider .prev').trigger('click');
	});
	$(window).on('resize', function() {
		slider();
	});
	$('.nav-index a').on('click', function(e) {
		e.preventDefault();
		$('.slider .pagination li').eq($(this).parent().index()).find('a').trigger('click');
	});
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$(window).load(function() {
		$('.nav-index em').each(function() {
			$(this).css({
				'margin-top': (38-$(this).outerHeight())/2+'px',
				'opacity': '1'
			});
		});
		$('.sign-i h4 span').each(function() {
			var m = (46-$(this).outerHeight())/2;
			/*if ( m < 0 ) {
				m = 0;
			}*/
			$(this).css({
				'margin-top': m+'px',
				'opacity': '1'
			});
		});
		$('.sign-i').each(function() {
			var cols = 4;
			var lines = Math.ceil($(this).find('ul li').size()/cols);
			for ( var i=0; i<=lines; i++ ) {
				var max = 0;
				console.log(i);
				for ( var j=1; j<=cols; j++ ) {
					$(this).find('li:nth-of-type('+eval(i*cols+j)+')').each(function() {
						var h = $(this).outerHeight(); 
						max = h > max ? h : max;
					});
				}
				for ( var j=1; j<=cols; j++ ) {
					$(this).find('li:nth-of-type('+eval(i*cols+j)+')').outerHeight(max);
				}
			}
		});
		$('.leader-b .group ul li h4 span').each(function() {
			$(this).css({
				'margin-top': (44-$(this).outerHeight())/2+'px',
				'opacity': '1'
			});
		});
		$('.leader-b .group ul li p span').each(function() {
			if ( $(this).outerHeight() < $(this).parent().outerHeight() ) {
				$(this).css({
					'margin-bottom': $(this).parent().outerHeight()-$(this).outerHeight()-3+'px',
					'opacity': '1'
				});
			}
		});
		$('.banner-mini p, .banner-bg p, .contacts-b .address .nav ul li div').each(function() {
			$(this).css({
				'margin-top': -$(this).outerHeight()/2+'px',
				'opacity': '1'
			});
		});
		$('.options-add > ul li label, .options-add > ul li p').each(function() {
			$(this).css({
				'margin-top': (72-$(this).outerHeight())/2+'px',
				'opacity': '1'
			});
		});
	});
	$('.auto-type-nav a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('.filter-general .season input[type="radio"]').change(function() {
		if ( $(this).prop('checked') == true ) {
			$(this).parents('li').addClass('active').siblings().removeClass('active');
		}
	});
	$('.selection-i .list li input[type="checkbox"]').change(function() {
		if ( $(this).prop('checked') == true ) {
			$(this).parents('li').addClass('active');
		} else {
			$(this).parents('li').removeClass('active');
		}
	});
	$('.selection-i .type li a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('.selection-i .multiply li').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
	$('.scroll').jScrollPane({
		autoReinitialise: true,
		verticalGutter: -27,
	});
	$('.price-range').each(function() {
		var t = $(this)
		var thisMin = eval(t.find('.slide').attr('data-min'));
		var thisMax = eval(t.find('.slide').attr('data-max'));
		var start = eval(t.find('.slide').attr('data-start'));
		var end = eval(t.find('.slide').attr('data-end'));
		var step = eval(t.find('.slide').attr('data-step'));
		$(this).find('.slide').slider({
			value: 20000,
			range: true,
			min: thisMin,
			max: thisMax,
			step: step,
			values: [start, end],
			slide: function(event, ui) {
				t.find('.input .from').val(ui.values[0]);
				t.find('.input .to').val(ui.values[1]);
			}
		});
		t.find('.min-max .from').text(thisMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' руб.');
		t.find('.min-max .to').text(thisMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' руб.');
		t.find('.input .from').val(start);
		t.find('.input .to').val(end);
		t.find('.input .from').keyup(function() {
			t.find('.slide').slider('values',0,$(this).val());
		});
		t.find('.input .to').keyup(function() {
			t.find('.slide').slider('values',1,$(this).val());
		});
		t.find('.input .from').change(function() {
			if ( $(this).val() < thisMin ) {
				$(this).val(thisMin);
			}
			if ( $(this).val() > $(this).siblings('.to').val() ) {
				$(this).val($(this).siblings('.to').val());
			}
			t.find('.slide').slider('values',0,$(this).val());
		});
		t.find('.input .to').change(function() {
			if ( $(this).val() > thisMax ) {
				$(this).val(thisMax);
			}
			if ( $(this).val() < $(this).siblings('.from').val() ) {
				$(this).val($(this).siblings('.from').val());
			}
			t.find('.slide').slider('values',1,$(this).val());
		});
	});
	$(window).on('scroll load', function() {
		if ( $(document).scrollTop() > $('header').height() ) {
			$('nav').addClass('fixed');
			$('header').css({
				'margin-bottom': '70px'
			});
		} else {
			$('nav').removeClass('fixed');
			$('header').css({
				'margin-bottom': '0'
			});
		}
	});
	$('nav .search').hover(
		function() {
			var t = $(this);
			setTimeout(function() {
				t.addClass('opened');
			}, 300);
		},
		function() {
			var t = $(this);
			setTimeout(function() {
				t.removeClass('opened');
			}, 500);
		}
	);
	$('nav .search .button').on('click', function() {
		if ( $(this).parent().hasClass('opened') && $(this).siblings('input[type="text"]').val().length > 0 ) {
			alert('Launch search');
		}
	});
	$('nav > ul > li > div').parent('li').hover(
		function() {
			var t = $(this);
			t.children('div').stop().delay(300).slideDown(400, function() {
				t.addClass('current');
			});
			$('.sub-nav-bg').stop().delay(300).fadeIn(400);
			$('.tip-message').hide();
			$('.tip-icon').removeClass('opened');
		},
		function() {
			var t = $(this);
			setTimeout(function() {
				t.children('div').stop().slideUp(0);
				$('.sub-nav-bg').stop().fadeOut(0);
				t.removeClass('current');
			}, 300);
		}
	);
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('disabled') > 0 ) {
			$('.lk-drop').stop().slideUp(250);
			$('.lk-open').removeClass('opened');
			var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
			$('.fade').stop(true,true).fadeIn(500);
			var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
			if ( h < $(window).scrollTop()+40 ) {
				h = $(window).scrollTop()+20;
			}
			t.css({
				'top': h+'px'
			}).stop(true,true).fadeIn(500);
		}
	});
	$('.fade, .modal .close, .modal .continue').on('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	$('.modal .back-link').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.modal').find('.close').trigger('click');
	});
	$('[data-open="add-to-basket"]').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('disabled') ) {
			$(this).addClass('disabled');
			$(this).text('В корзине');
			$(this).removeAttr('data-open');
		} else {
			e.stopPropagation();
		}
	});
	$('form.standart input, form.standart textarea').each(function() {
		if ( $(this).val().length > 0 ) {
			$(this).parent().addClass('complete').removeClass('focus');
		}
		$(this).focusin(function() {
			$(this).parent().addClass('focus');
		});
		$(this).focusout(function() {
			if ( $(this).val().length > 0 ) {
				$(this).parent().addClass('complete').removeClass('focus');
			}
			else {
				$(this).parent().removeClass('focus complete');
			}
		});
	});
	$('form.standart p > span').on('click', function(e) {
		e.preventDefault();
		$(this).siblings('input, textarea').focus();
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.rating-e').each(function() {
		for ( var i=1; i<=5; i++ ) {
			$(this).append('<span></span>');
		}
		for ( var j=1; j<=eval($(this).attr('data-current')); j++ ) {
			$(this).find('span:nth-child('+j+')').addClass('active');
		}
	});
	$('.card-b .core .quantity').each(function() {
		for ( var i=1; i<=5; i++ ) {
			$(this).append('<em></em>');
		}
		for ( var j=1; j<=eval($(this).attr('data-current')); j++ ) {
			$(this).find('em:nth-child('+j+')').addClass('active');
		}
	});
	$('.card-b .gallery, .new-e .gallery').each(function() {
		var t = $(this);
		t.slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 10000,
			pause: 2500
		});
		t.find('.pagination li a').each(function() {
			var src = t.find('.container > div > div:nth-child('+eval($(this).parent().index()+1)+')').attr('data-preview');
			$(this).append('<img src="'+src+'" alt="">');
		});
	});
	$('.carousel-e .core').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		adaptiveHeight: true,
		infinite: true,
		arrows: true,
		draggable: true
	});
	$('.tip-icon').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('opened') ) {
			$('.tip-message').html($(this).attr('data-html')).css({
				'left': $(this).offset().left+'px',
				'top': $(this).offset().top-$('.tip-message').outerHeight()+'px'
			}).show();
			$('.tip-icon').removeClass('opened');
			$(this).addClass('opened');
		} else {
			$('.tip-message').hide();
			$(this).removeClass('opened');
		}
		$('.lk-drop').hide();
	});
	$('body, html').click(function() {
		$('.tip-message, .lk-drop').hide();
		$('.tip-icon').removeClass('opened');
	});
	$('.tip-icon, .tip-message, .lk-drop, header .lk').on('click', function(e) {
		e.stopPropagation();
	});
	$('.contacts-b .address .nav ul li').on('click', function(e) {
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.quantity-i em.minus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('.quantity-i em.plus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('header .lk a').on('click', function(e) {
		e.preventDefault();
		if ( $('.lk-drop').is(':hidden') ) {
			$('.lk-drop').stop().slideDown(0);
		} else {
			$('.lk-drop').stop().slideUp(0);
		}
		$('.tip-message').hide();
	});
	$('.custom-page-benefits .nav p span').each(function() {
		$(this).css({
			'margin-top': (46-$(this).outerHeight())/2+'px'
		});
	});
	$('.custom-page-benefits .nav li a').on('click', function(e) {
		e.preventDefault();
		$('.custom-page-benefits .pagination li').eq(eval($(this).parent().index())).find('a').trigger('click');
	});

	
	function infoPosition() {
		$('.custom-page-benefits .core .info').each(function() {
			$(this).css({
				'margin-top': -$(this).outerHeight()/2+'px',
				'opacity': '1'
			});
		});
	}
	$('.custom-page-benefits .core').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 10000,
		pause: 2500,
		slidesLoaded: function() {
			infoPosition();
			var current = $('.custom-page-benefits .pagination li.current').index();
			$('.custom-page-benefits .nav li').eq(current).addClass('active').siblings().removeClass('active');
		},
		animationStart: function() {
			$('.custom-page-benefits .core .info').css({
				'opacity': '0'
			});
		},
		animationComplete: function() {
			infoPosition();
			var current = $('.custom-page-benefits .pagination li.current').index();
			$('.custom-page-benefits .nav li').eq(current).addClass('active').siblings().removeClass('active');
		}
	});
	$('.custom-page-benefits .core').bind('swipeleft', function() {
		$('.custom-page-benefits .core .next').trigger('click');
	});
	$('.custom-page-benefits .core').bind('swiperight', function() {
		$('.custom-page-benefits .core .prev').trigger('click');
	});
	if ( $('.custom-service .gallery > div').length > 0 ) {
		$('.custom-service .gallery > div').masonry({
			columnWidth: 235,
			gutter: 5,
			itemSelector: '.item'
		});
	}
	$(function() {
		var max = 0;
		$('.custom-catalog .list li').each(function() {
			var h = $(this).height(); 
			max = h > max ? h : max;
		});
		$('.custom-catalog .list li').height(max);
	});
	if ( $('.list-content .item-s-slider ul').length > 0 || $('.list-content .banner-s ul').length > 0 ) {
		$('.list-content .item-s-slider ul, .list-content .banner-s ul').jcarousel({
			scroll: 1,
			animation: 500,
			slideEasing: 'easeInOutQuad',
			wrap: 'circular'
		});
	}
	$(function() {
		$('.mega-menu li > ul').each(function() {
			$(this).siblings('a').append('<span class="arrow"></span>');
		});
		var bg = $('.mega-menu .bg');
		var sub1 = $('.mega-menu > ul');
		var min = 404;
		if ( sub1.height() > min ) {
			min = lvl1.height();
		}
		var lvl2 = 0;
		var sub2 = $('.mega-menu > ul > li > ul');
		var lvl3 = 0;
		var sub3 = $('.mega-menu > ul > li > ul > li > ul');
		$('.mega-menu > ul > li > ul').parent().on('mouseenter', function() {
			var t = $(this).children('ul');
			t.show();
			$('.bg').width(532);
			lvl2 = t.outerHeight();
			if ( lvl2 < min ) {
				lvl2 = min;
			}
			sub1.css({
				'min-height': lvl2+'px'
			});
			sub2.css({
				'min-height': lvl2+'px'
			});
		});
		$('.mega-menu > ul > li > ul').parent().on('mouseleave', function() {
			var t = $(this).children('ul');
			t.hide();
			$('.bg').width(859);
			sub1.css({
				'min-height': min+'px'
			});
			sub2.css({
				'min-height': '0'
			});
		});
		$('.mega-menu > ul > li > ul > li > ul').parent().on('mouseenter', function() {
			var t = $(this).children('ul');
			t.show();
			$('.bg').width(0);
			
			lvl3 = t.outerHeight();
			if ( lvl3 < lvl2 ) {
				lvl3 = lvl2;
			}
			sub1.css({
				'min-height': lvl3+'px'
			});
			sub2.css({
				'min-height': lvl3+'px'
			});
			sub3.css({
				'min-height': lvl3+'px'
			});
		});
		$('.mega-menu > ul > li > ul > li > ul').parent().on('mouseleave', function() {
			var t = $(this).children('ul');
			t.hide();
			$('.bg').width(532);
			sub1.css({
				'min-height': lvl2+'px'
			});
			sub2.css({
				'min-height': lvl2+'px'
			});
			sub3.css({
				'min-height': '0'
			});
		});
	});
	if ( $('.about-b').length > 0 ) {
		$(window).bind('scroll', function() {
			var t = $('.about-b .bigtire');
			var bgDiff = t.find('.bg').attr('height')-t.outerHeight();
			var bigDiff = t.find('.big').attr('height');
			var progress;
			if ( $(document).scrollTop() < t.offset().top-$(window).height() ) {
				progress = 0;
			} else if ( $(document).scrollTop() >= t.offset().top-$(window).height() && $(document).scrollTop() <= t.offset().top+t.height()-71-$(window).height()/2 ) {
				progress = ($(document).scrollTop()-t.offset().top+$(window).height())/(t.height()-71+$(window).height()/2);
			} else {
				progress = 1;
			}
			t.find('.bg').css({
				'top': -progress*bgDiff+'px' 
			});
			t.find('.big').css({
				'margin-top': -progress*bigDiff+'px' 
			});
		});
		$(window).trigger('scroll');
		$('.about-b .benefits ul li h5 span').each(function() {
			if ( $(this).outerHeight() < 36 ) {
				$(this).css({
					'padding-top': (36-$(this).outerHeight())/2+'px'
				});
			}
		});
	}
	$('.about-b .goals .core .nav li a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
});
$(function() {
	var footerHeight = $('footer').height();
	var footerContactsHeight = $('footer .contacts-b .address').height();
	$('footer .map-link a').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			$('footer').stop().animate({
				'height': footerHeight+footerContactsHeight+'px',
				'margin-top': -footerHeight-footerContactsHeight+'px',
			}, 500);
			$('div.clear').stop().animate({
				'height': footerHeight+footerContactsHeight+'px'
			}, 500);
			$('footer .contacts-b').stop().animate({
				'height': footerContactsHeight+'px'
			}, 500);
			$('footer .contacts-b .address').stop().animate({
				'margin-top': '0'
			}, 500);
			$(this).addClass('active');
		} else {
			$('footer').stop().animate({
				'height': footerHeight+'px',
				'margin-top': -footerHeight+'px',
			}, 500);
			$('div.clear').stop().animate({
				'height': footerHeight+'px'
			}, 500);
			$('footer .contacts-b').stop().animate({
				'height': '0'
			}, 500);
			$('footer .contacts-b .address').stop().animate({
				'margin-top': -footerContactsHeight/2+'px'
			}, 500);
			$(this).removeClass('active');
		}
	});
	function entryService() {
		executed = true;
		var i = -1;
		var changeSpeed = 2000;
		var fadeSpeed = 300;
		var t = $('.sign-i li');
		t.each(function() {
			$(this).find('p span').eq(0).show().addClass('active');
		});
		setInterval(function() {	
			i = i+1;
			if ( i >= t.size() ) {
				i = 0;
			}
			var e = t.eq(i).find('p span.active').next('span');
			if ( e.length == 0 ) {
				e = t.eq(i).find('p span').eq(0);
			}
			e.siblings().stop().fadeOut(fadeSpeed).removeClass('active');
			setTimeout(function() {
				e.stop().fadeIn(fadeSpeed).addClass('active');
			}, fadeSpeed);
		}, changeSpeed);
	}
	if ( $('.sign-i').length > 0 ) {
		var executed = false;
		$(window).on('scroll', function() {
			if ( $(document).scrollTop() > $('.sign-i p').offset().top-$(window).height() && executed == false ) {
				entryService();
			}
		});
		$(window).trigger('scroll');
	}
	$('.about-b .goals .core .nav li a').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.nav').siblings('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
	}).filter(':first').click();
});