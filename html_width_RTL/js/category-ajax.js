/*
	** Category Ajax Js
	** Version: 1.0.1
*/
(function ($) {
	$(document).ready(function(){
		/* First Ajax */
		var el = $( '.active [data-catload=ajax]' );
		sw_click_ajax( el );

		$('.category-ajax-slider .tab-content').addClass( 'loading' );
		$('[data-catload=ajax]').on('click', function() {
			sw_click_ajax( $(this) );
		});

		function sw_click_ajax( element ) {			
			var ajaxurl 	= 'ajax/top_selling_';
			var catid 		= element.data( 'catid' );
			var id 			= $( "#category_ajax_" + catid );

			if( id.html() == '' ){	
				id.parent().addClass( 'loading' );
				jQuery.post(ajaxurl + catid + '.html', null, function(response) {
					id.html(response);
					sw_slider_ajax(catid);
					id.parent().removeClass( 'loading' );
				});
			}
		}

		function sw_slider_ajax( catid ) {	
			var element 	= $('#category_ajax_slider_' + catid );
			var $col_lg 	= element.data('lg');
			var $col_md 	= element.data('md');
			var $col_sm 	= element.data('sm');
			var $col_xs 	= element.data('xs');
			var $col_mobile = element.data('mobile');
			var $speed 		= element.data('speed');
			var $interval 	= element.data('interval');
			var $scroll 	= element.data('scroll');
			var $autoplay 	= element.data('autoplay');
			var $rtl = false;
			if( $( 'body' ).hasClass( 'rtl' ) ){
				$rtl = true;
			}
			$target = $('#category_ajax_slider_' + catid + ' .responsive');
			$target.slick({
			  appendArrows: $('#category_ajax_slider_' + catid ).parent(),
			  prevArrow: '<span data-role="none" class="res-button slick-prev" aria-label="previous"></span>',
			  nextArrow: '<span data-role="none" class="res-button slick-next" aria-label="next"></span>',
			  dots: false,
			  infinite: true,
			  speed: $speed,
			  slidesToShow: $col_lg,
			  slidesToScroll: $scroll,
			  autoplay: $autoplay,
			  autoplaySpeed: $interval,
			  rtl: $rtl,			  
			  responsive: [
				{
				  breakpoint: 1199,
				  settings: {
					slidesToShow: $col_md
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: $col_sm
				  }
				},
				{
				  breakpoint: 767,
				  settings: {
					slidesToShow: $col_xs
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
					slidesToShow: $col_mobile    
				  }
				}
			  ]
			});
			element.fadeIn(1000, function() {
				$(this).removeClass("loading");
				try {
					$('#category_ajax_slider_' + catid + ' .compare').colorbox({href:"ajax/compare.html", iframe: true, width: '90%', height: '90%'});
				} catch (e) {}
			});
		}
	});
})(jQuery);