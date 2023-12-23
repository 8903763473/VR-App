(function() {

	"use strict";

	let prysm = {
		init: function () {
			this.Basic.init();
		},
		Basic: {
			init: function () {
				this.bigoCTATab();
				this.bigoCaseStudy();
				this.bigoProjectFilter();
				this.bigoTestimonial();
				this.bigoTeamCarousel();
				this.bigoToolTip();
			},

			// -------------------------------------------------------------
			//      CTA Option
			// -------------------------------------------------------------

			bigoCTATab: function () {
				var openlinkOne = $(".open-link-1");
				var openlinkTwo = $(".open-link-2");
				var openlinkThree = $(".open-link-3");
				var hovercontentOne = $(".hover-content-1");
				var hovercontentTwo = $(".hover-content-2");
				var hovercontentThree = $(".hover-content-3");
				var closelinkOne = $(".close-link-1");
				var closelinkTwo = $(".close-link-2");
				var closelinkThree = $(".close-link-3");


				openlinkOne.on("click" ,function(){
					hovercontentOne.addClass("open");
					return false;
				});

				closelinkOne.on("click" ,function() {
					hovercontentOne.removeClass("open");
					return false;
				});

				openlinkTwo.on("click" ,function(){
					hovercontentTwo.addClass("open");
					return false;
				});

				closelinkTwo.on("click" ,function() {
					hovercontentTwo.removeClass("open");
					return false;
				});

				openlinkThree.on("click" ,function(){
					hovercontentThree.addClass("open");
					return false;
				});

				closelinkThree.on("click" ,function() {
					hovercontentThree.removeClass("open");
					return false;
				});
			},

			bigoCaseStudy: function () {
				if ($('.bigo-creative-slider').length) {
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						slidesPerView: 'auto',
						paginationClickable: true,
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev'
					});
				}
			},

			bigoProjectFilter: function () {
				// isotop
				$('.bigo-grid').imagesLoaded( function() {
					// init Isotope
					var $grid = $('.bigo-grid').isotope({
						itemSelector: '.bigo-grid-item',
						percentPosition: true,
						masonry: {
							// use outer width of grid-sizer for columnWidth
							columnWidth: '.bigo-grid-item',
						}
					});

					// filter items on button click
					$('.bigo-project-menu').on( 'click', 'li', function() {
						var filterValue = $(this).attr('data-filter');
						$grid.isotope({ filter: filterValue });
					});
				});

				//for menu active class
				$('.bigo-project-menu li').on('click', function(event) {
					$(this).siblings('.active').removeClass('active');
					$(this).addClass('active');
					event.preventDefault();
				});
			},

			bigoTestimonial: function (){
				// testimonial slider
				$('.bigo-testimonial-slide').owlCarousel({
					loop: true,
					margin: 0,
					items: 1,
					autoplay: true,
					autoplayTimeout:5000,
					smartSpeed: 800,
					autoplayHoverPause:true,
					navText:['<i class="icon-v3 flaticon-left-arrow-1"></i>','<i class="icon-v3 flaticon-right-arrow-1"></i>'],
					nav: true,
					dots: false
				});
			},

			bigoCounter: function (){
				// Counter
				if ($('.bigo-counting-section').length) {
					$('.bigo-counting-section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
						if (visible) {
							$(this).find('.timer').each(function () {
								var $this = $(this);
								$({ Counter: 0 }).animate({ Counter: $this.text() }, {
									duration: 2000,
									easing: 'linear',
									step: function () {
										$this.text(Math.ceil(this.Counter));
									}
								});
							});

							$(this).off('inview');
						}
					});
				}
			},

			bigoTeamCarousel : function (){
				if ($('.bigo-team-carousel').length) {
					$('.bigo-team-carousel').owlCarousel({
						loop:true,
						autoplay:true,
						autoplayTimeout: 3000,
						margin:30,
						nav:true,
						navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
						responsive:{
							0:{
								items:1,
								nav:false,
								dots:true,
							},
							600:{
								items:2,
								nav:true,
								dots:true,
							},
							1000:{
								items:3
							}
						}
					});
				}
			},

			bigoToolTip : function (){
				$('[data-toggle="tooltip"]').tooltip()
			},









			/* End Of js
            ================================================*/
		}
	};
	jQuery(document).ready(function (){
		prysm.init();
		console.log('appilo bigo js loaded');
});

})();