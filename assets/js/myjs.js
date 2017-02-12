$(document).ready(function() {
	// for preload
	var imageToLoad;

	/* Fade in section when scrolled */
	/* Every time the window is scrolled ... */
	$(window).scroll( function(){

		/* Check the location of each desired element */
		$('.hideme').each( function(i){
			var i = 0;
			var bottom_of_object = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();

			/* If the object is completely visible in the window, fade it it */
			if( bottom_of_window > bottom_of_object / 10 * 5 ){
				$(this).animate({'opacity':'1'},700);
			}
		}); 
	});

	/* Dismiss bootstrap navbar automatically when any of the links have been clicked */
	$('.navbar-collapse a').click(function(){
		$(".navbar-collapse").collapse('hide');
	});

	/* Smooth scroll function */
	$("a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});

	// perform preload of images
	$.preloadImages = function() {
		for (var i = 0; i < arguments.length; i++) {
			$("").attr("src", "../assets/images/bg-images/" + arguments[i] + "'");
		}
	}

	/* Add Animate.css animations */
	$('#cover-buttons').css({'display' : 'block'});
	$('#cover-buttons').addClass('animated flipInX');

	// applying form validation for enroll section
	//	var form = document.getElementById('formID');
	//	form.noValidate = true;
	//	form.addEventListener('submit', function(event) {
	//		if (!event.target.checkValidity()) {
	//			event.preventDefault();
	//			document.getElementById('form-error-message').style.display = 'block';
	//		}
	//	}, false);

	/* Preload Images */
	function preloadImages(arrOfImages) {
		for(var i = 0; i < arrOfImages.length; i++) {
			imageToLoad = new Image();
			imageToLoad.src = 'assets/images/bg-images/' + arrOfImages[i];
		}
	}

	function loadBg() {
		var backgroundImages = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];
		preloadImages(backgroundImages);

		var currIndex = 1;
		setInterval(function() {
			if(currIndex == backgroundImages.length) {
				currIndex = 0;
			}

			var img = backgroundImages[currIndex];

			$('.cover-image').css({"background-image":"url('assets/images/bg-images/" + img + "')"});	
			currIndex++;
		}, 7000);
	}
	window.onload = loadBg();

	/* Hide Bg Music Controls & Do Not Play on Mobile Devices */
	var bg_loop = document.getElementById("bg-loop");
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		bg_loop.pause();
		$("#bg-loop-btn").css("display", "none");
		$("#bg-loop-btn2").css("display", "none");
	}

	/* Controls for Bg Loop Music */
	$("#bg-loop-btn").click(function() {
		if(bg_loop.paused) {
			bg_loop.play();
		} else {
			bg_loop.pause();
		}
	});
	$("#bg-loop-btn2").click(function() {
		if(bg_loop.paused) {
			bg_loop.play();
		} else {
			bg_loop.pause();
		}
	});
});