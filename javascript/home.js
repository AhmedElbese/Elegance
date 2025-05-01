const audio = document.getElementById('background-audio');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');

muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateIcon();
});

window.addEventListener('load', () => {
    audio.muted = false;
    audio.play().catch(() => {
        console.log("User interaction needed to play audio");
    });
    updateIcon();
});

function updateIcon() {
    if (audio.muted) {
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    } else {
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
    }
}
// Auto-scroll for product carousel
const carousel = document.getElementById('auto-carousel');

let scrollAmount = 0;
const scrollStep = 2; // سرعة الحركة
const scrollDelay = 20; // الفاصل الزمني بين كل حركة (ms)

function autoScrollCarousel() {
    if (carousel.scrollWidth - carousel.clientWidth <= scrollAmount) {
        scrollAmount = 0;
    } else {
        scrollAmount += scrollStep;
    }
    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

setInterval(autoScrollCarousel, scrollDelay);



