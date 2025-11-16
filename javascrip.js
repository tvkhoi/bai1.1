$(document).ready(function () {

    const images = $('.main__banner img');
    let currentIndex = 0;
    const dots = $('.main__banner__dots');

    images.each(function (i) {
        dots.append(`<span class="dot ${i === 0 ? 'active' : ''}"></span>`);
    });

    const allDots = dots.find('.dot');

    images.hide().eq(0).show();

    const widthImg = images.width();
    const heightImg = images.height();

    let isAnimating = false;

    function changeImage(nextIndex, direction = 1) {
        if (isAnimating) return;
        isAnimating = true;

        const oldImg = images.eq(currentIndex);
        const newImg = images.eq(nextIndex);

        oldImg
            .css({
                width: widthImg * 0.1,
                height: heightImg * 0.1
            })
            .addClass("hide-anim");

        setTimeout(() => {
            oldImg.hide().removeClass("hide-anim")
                .css({
                    width: widthImg,
                    height: heightImg
                });

            newImg
                .show()
                .addClass("show-anim");

            setTimeout(() => {
                newImg.removeClass("show-anim");
                isAnimating = false;
            }, 600);

        }, 600);

        currentIndex = nextIndex;

        allDots.removeClass("active").eq(currentIndex).addClass("active");
    }

    $('.main__banner__btn.--right').click(function () {
        const next = (currentIndex + 1) % images.length;
        changeImage(next, 1);
    });

    $('.main__banner__btn.--left').click(function () {
        const prev = (currentIndex - 1 + images.length) % images.length;
        changeImage(prev, -1);
    });

    allDots.click(function () {
        const index = $(this).index();
        if (index !== currentIndex) {
            changeImage(index, 1);
        }
    });

    $('.main__banner').hover(
        function () {
            $('.main__banner__btn').show();
        },
        function () {
            $('.main__banner__btn').hide();
        }
    );

    let startX = 0;
    let endX = 0;

    function handleSwipe() {
        if (endX < startX - 50) $('.--right').click();
        if (endX > startX + 50) $('.--left').click();
    }

    images.on('touchstart mousedown', function (e) {
        startX = e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.clientX;
    });

    images.on('touchmove mousemove', function (e) {
        endX = e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.clientX;
    });

    images.on('touchend mouseup', function () {
        handleSwipe();
    });

    $('.bar').on('click', function () {
        $('body').css('overflow', 'hidden');
        $('.nav__bar').css('display', 'flex');
        $('.overlay').toggleClass('active');
        $('.close-bar').css('display', 'block');
        $('.bar').css('display', 'none');

        $('.overlay').click(function () {
            $('body').css('overflow', 'auto');
            $('.nav__bar').css('display', 'none');
            $('.overlay').removeClass('active');
            $('.close-bar').css('display', 'none');
            $('.bar').css('display', 'block');
        });
    });

    let isUserInfoVisible = false;
    $('.icon_user').on('click', function () {
        if (isUserInfoVisible) {
            $('.header__content__user__info').css('display', 'none');
            isUserInfoVisible = false;
            return;
        }
        // Click ra ngoài info để đóng
        $(document).on('click', function (e) {
            // nếu click không phải trên info hoặc icon
            if (!$(e.target).closest('.header__content__user, .header__content__user__info').length) {
                $('.header__content__user__info').hide();
                isUserInfoVisible = false;
            }
        });
        $('.header__content__user__info').css('display', 'flex');
        isUserInfoVisible = true;
    });
});