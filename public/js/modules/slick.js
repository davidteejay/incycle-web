$(function(){
	$('.collectors-slider').slick({
		autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite:  true,
        dots: false,
		adaptiveHeight: true,
		prevArrow: `<button class="arrow prev-arrow"><i class="mdi mdi-chevron-left"></i></button>`,
		nextArrow: `<button class="arrow next-arrow"><i class="mdi mdi-chevron-right"></i></button>`,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
        ]
	})
})