;(function() {
	
	'use strict';

	$("#age").selectmenu();

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Carousel Feature Slide
	var testimonialCarousel = function(){	
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: false
		});
	};

	var sliderMain = function() {	
	  	$('#qbootstrap-slider-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 10000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#qbootstrap-slider-veggie .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 17000,
			directionNav: true,			
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#qbootstrap-slider-responsum .flexslider').flexslider({
			animation: "slide",
			slideshow: false,
			animationLoop: false,
			directionNav: true,
			controlNav: true,
			prevText: "",
			nextText: "",
			start: function(slider) {
				slider.removeSlide(0);
			},
			before: function(slider) {
				//alert(slider.index);
				//alert(slider.currentSlide);
			}

	  	}).ready(function() { 

	  		function getTotalSlideCount() {
				var total = $('#qbootstrap-slider-responsum .form-person').length;
				return total;
	  		}	  		

		  	var slider = $('#qbootstrap-slider-responsum .flexslider').data("flexslider");

			const FORM_MAX_PEOPLE = 4;

			var slides = []
			for (var i = 0; i < FORM_MAX_PEOPLE; i++) {
				slides.push(false);
			}

			/**
			 * ADD
			 */

			// add  person
			$("#attendee-add").click(function() {
				//alert("add");
				addFormPerson(false);
			});

			function addFormPerson(first) {			
				// abort if full
				if (getTotalSlideCount() == FORM_MAX_PEOPLE) {
					alert("Maximum erreicht!");
					return;		
				}	
				// https://stackoverflow.com/questions/27542147/dynamic-add-slide-in-flexslider-carousel
				// add the line
				slider.addSlide($('<li>' + buildFormPerson(first) + '</li>'));	
			}

			function buildFormPerson(first) {		
				var btnType = first ? "add" : "sub";
				var btnVal = first ? "Hinzufügen" : "Entfernen";
				//var persNo = getTotalSlideCount() + 1;				
				function getFreePersNo() {
					if (slides.length > 0) {
						for (var i = 0; i < FORM_MAX_PEOPLE; i++) {
							if (!slides[i]) {
								slides[i] = true;
								return i;
							}
						}
					}
					return 0;
				}

				var persNo = getFreePersNo() + 1;
				return `
					<div class="col-md-10 form-group form-person">
						<div class="row">
					    	<h3>Person #${persNo}</h3>								
					    </div>
					    <div class="row">	
					    	<div class="col-md-5">
					    	    <div class="form-group">								      
					    	      <input type="text" class="form-control" id="fname-${persNo}" placeholder="Vorname" name="fname-${persNo}">
					    	    </div>
					    	    <div class="form-group">								      
					    	      <input type="text" class="form-control" id="lname-${persNo}" placeholder="Nachname" name="lname-${persNo}">
					    	    </div>
					    	</div>
					    	<div class="col-md-3">
					    		<div class="form-group">								      
					    			<input type="text" class="form-control" id="age-${persNo}" placeholder="Alter (falls Kind)" name="age-${persNo}" />
					    		</div>									
					    	    <div class="form-check form-check-inline">
					    		  <input class="form-check-input" type="radio" name="attend-${persNo}" id="attend-confirm-${persNo}" value="Nimmt teil" checked>
					    		  <label class="form-check-label" for="attend-confirm-${persNo}">
					    		    Nimmt teil
					    		  </label>
					    		</div>
					    		<div class="form-check form-check-inline">
					    		  <input class="form-check-input" type="radio" name="attend-${persNo}" id="attend-cancel-${persNo}" value="Kommt nicht">
					    		  <label class="form-check-label" for="attend-cancel-${persNo}">
					    		    Kommt nicht
					    		  </label>
					    		</div>							
					    	</div>
					    </div>	
					</div>`;			
			}

			/*
			function random() {
				return generateId(5);
			}

			function generateId(length) {
		   		var result = '';
		   		var characters = '0123456789';
		   		var charactersLength = characters.length;
		   		for (var i = 0; i < length; i++) {
		      		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		   		}
		   		return result;
			}
			*/

			/**
			 * REMOVE
			 */

			// remove person
			$(".btn-sub").click(function() {
				//alert("sub");
				//var index = $('#qbootstrap-slider-responsum li:has(.flex-active)').index('.flex-control-nav li') + 1;				
				//alert(index);
				removeFormPerson(); 
			});	

			// remove form line on sub-button click
			function removeFormPerson(index) {				
				//$("#attend-form-line-" + index).remove();		
				//TODO use slider
				slider.removeSlide(slider.currentSlide);
				slides[index] = false;
			}

			// first form line
			//addFormPerson(true);
			

			// submit logic

		    //$("#attendee-success-alert").hide();

			$("#attend-form").submit(function(e) {
				e.preventDefault();
				var $form = $(this);

				let success = true;
/*
				$("#attend-form-group .row").each(function() {	  		  
					var fname = $(this).find("input.fname").val();
					var lname = $(this).find("input.lname").val();
					var age = $(this).find("input.age").val();	  	
					
					if (fname === "") {	  		
						$(this).find("input.fname").addClass("error");
						success = false;
					} else {	  	
						$(this).find("input.fname").removeClass("error");
					}
					if (lname === "") {
						$(this).find("input.lname").addClass("error");
						success = false;
					} else {
						$(this).find("input.lname").removeClass("error");
					}
					if (age > 12) {
						$(this).find("input.age").addClass("error");
						success = false;
					} else {
						$(this).find("input.age").removeClass("error");
					}	  	
				});
				*/

				// on success
				if (success) {
					alert("SUCCESS!!!");
					// $.post($form.attr("action"), $form.serialize()).then(function() {
					// 	$("#attendee-success-alert").fadeTo(2000, 500).slideUp(500, function() {
					// 		$("#attendee-success-alert").slideUp(500);
					// 	});
					// });
				}

			});

			/* <-- Form Line */ 

		});		  
       
	};

	// animate-box
	var contentWayPoint = function() {
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this).hasClass('animated') ) {
				$(this.element).addClass('fadeInUp animated');
			}
		} , { offset: '75%' } );
	};


	// Burger Menu
	var burgerMenu = function() {
		$('body').on('click', '.js-qbootstrap-nav-toggle', function(event){
			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');	
			} else {
				$(this).addClass('active');	
			}
			event.preventDefault();
		});
	};

	// Parallax
	var parallax = function() {
		if (!isiPad() || !isiPhone()) {
			$(window).stellar();
		}
	};

	// Page Nav
	var clickMenu = function() {
		$('a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
		    $('html, body').animate({
		        scrollTop: $('[data-section="' + section + '"]').offset().top
		    }, 500);

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-qbootstrap-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});
	};

	// Reflect scrolling in navigation
	var navActive = function(section) {
		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});
	};
	var navigationSection = function() {
		var $section = $('div[data-section]');
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});
	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;
		$(window).scroll(function(event){
		   	var header = $('#qbootstrap-header'),
				scrlTop = $(this).scrollTop();
			if (scrlTop > 500 && scrlTop <= 2000) {
				header.addClass('navbar-fixed-top qbootstrap-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top qbootstrap-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top qbootstrap-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
				}, 50);	
			}
		}, { offset: '85%' } );
	};

	var inlineSVG = function() {
		$('img.svg').each(function() {
		    var $img = $(this);
		    var imgID = $img.attr('id');
		    var imgClass = $img.attr('class');
		    var imgURL = $img.attr('src');

		    $.get(imgURL, function(data) {
		        // Get the SVG tag, ignore the rest
		        var $svg = jQuery(data).find('svg');
		        // Add replaced image's ID to the new SVG
		        if(typeof imgID !== 'undefined') {
		            $svg = $svg.attr('id', imgID);
		        }
		        // Add replaced image's classes to the new SVG
		        if(typeof imgClass !== 'undefined') {
		            $svg = $svg.attr('class', imgClass+' replaced-svg');
		        }
		        // Remove any invalid XML tags as per http://validator.w3.org
		        $svg = $svg.removeAttr('xmlns:a');
		        // Replace image with new SVG
		        $img.replaceWith($svg);
		    }, 'xml');
		});
	};
	
	// Set the date we're counting down to
	var countDownDate = new Date("Mar 17, 2020 10:00:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function() {

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now an the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in an element with id="demo"
	// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
	// + minutes + "Minutes " + seconds + "Seconds ";

	// Display the result in an element with id="demo"
	document.getElementById("days").innerHTML = days +" <small>Tage</small>";
	document.getElementById("hours").innerHTML = hours + " <small>Stunden</small> ";
	document.getElementById("minutes").innerHTML = minutes + " <small>Minuten</small> ";
//		document.getElementById("seconds").innerHTML = seconds + " <small>Sekunden</small> ";

	// If the count down is finished, write some text 
	if (distance < 0) {
	    clearInterval(x);
	    document.getElementById("demo").innerHTML = "Wir sind Mann & Frau!";
	}

}, 1000);
			
var bgVideo = function() {
	$('.player').mb_YTPlayer();
};

// Document on load.
$(function() {
	burgerMenu();
	testimonialCarousel();
	sliderMain();
	clickMenu();
	parallax();
	// windowScroll();
	navigationSection();
	contentWayPoint();
	inlineSVG();
	bgVideo();
});


}());
