$(document).ready(function () {
    let images = $('.main__banner img');
    let currentIndex = 0;
    let dotsContainer = $('.main__banner__dots');

    for (let i = 0; i < images.length; i++) {
        let dot = $('<span class="dot"></span>');

        if (i === currentIndex) {
            dot.addClass('active');
        }

        dotsContainer.append(dot);
    }

    images.eq(currentIndex).show();
    images.not(':eq(' + currentIndex + ')').hide();

    let width__img = images.width();
    let height__img = images.height();

    $('.main__banner__btn.--right').click(function () {
        $('.main__banner__btn.--right').css({
            'pointer-events': 'none'
        });
        images.eq(currentIndex).animate({
            rotate: '+=360deg',
            opacity: '0.5',
            width: width__img * 0.1,
            height: height__img * 0.1
        }, 1000, function () {
            $(this).hide();
            currentIndex = (currentIndex + 1) % images.length;
            images.eq(currentIndex).css({
                rotate: '0deg',
                opacity: '1',
                width: width__img,
                height: height__img
            });
            images.eq(currentIndex).show();
            $('.main__banner__btn.--right').css({
                'pointer-events': 'auto'
            });
        });
        dotsContainer.find('.dot').removeClass('active').eq(currentIndex).addClass('active');
    });

    $('.main__banner__btn.--left').click(function () {
        $('.main__banner__btn.--left').css({
            'pointer-events': 'none'
        });
        images.eq(currentIndex).animate({
            rotate: '-=360deg',
            opacity: '0.5',
            width: width__img * 0.1,
            height: height__img * 0.1
        }, 1000, function () {
            $(this).hide();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            images.eq(currentIndex).css({
                rotate: '0deg',
                opacity: '1',
                width: width__img,
                height: height__img
            });
            images.eq(currentIndex).show();
            $('.main__banner__btn.--left').css({
                'pointer-events': 'auto'
            });
        });
        dotsContainer.find('.dot').removeClass('active').eq(currentIndex).addClass('active');
    });

    dotsContainer.find('.dot').click(function () {
        $('.main__banner__dots').css({
            'display': 'none'
        });
        let index = $(this).index();
        images.eq(currentIndex).animate({
            rotate: '+=360deg',
            opacity: '0.5',
            width: width__img * 0.1,
            height: height__img * 0.1
        }, 1000, function () {
            $(this).hide();
            currentIndex = index;
            images.eq(currentIndex).css({
                rotate: '0deg',
                opacity: '1',
                width: width__img,
                height: height__img
            });
            images.eq(currentIndex).show();
            $('.main__banner__dots').css({
                'display': 'flex'
            });

            dotsContainer.find('.dot').removeClass('active').eq(currentIndex).addClass('active');
        });

        $('.main__banner').on('mouseenter', function () {
            $('.main__banner__btn').show();
        }).on('mouseleave', function () {
            $('.main__banner__btn').hide();
        });

        let touchStartX = 0;
        let touchEndX = 0;

        images.on('touchstart', function (e) {
            touchStartX = e.originalEvent.touches[0].clientX;
        });
        images.on('touchmove', function (e) {
            touchEndX = e.originalEvent.touches[0].clientX;
        });
        images.on('touchend', function (e) {
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                $('.main__banner__btn.--right').click();
            }
            if (touchEndX > touchStartX + 50) {
                $('.main__banner__btn.--left').click();
            }
        }

        images.mousedown(function (e) {
            e.preventDefault();
            touchStartX = e.clientX;
        });
        images.mousemove(function (e) {
            e.preventDefault();
            touchEndX = e.clientX;
        });
        images.mouseup(function (e) {
            e.preventDefault();
            handleSwipe();
        });

    });
});