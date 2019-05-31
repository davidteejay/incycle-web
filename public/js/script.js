$(function(){
	$('.carousel.carousel-slider').carousel({
		fullWidth: true,
		indicators: false
	})

	$('.arrow').on('click', function(e){
		e.preventDefault()

		const to = $(this).data('to')

		if (to === 1) $('.carousel').carousel('next')
		else $('.carousel').carousel('prev')
	})

	setInterval(function(){
		$('.carousel').carousel('next')
	}, 5000)
})
