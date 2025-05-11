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
const carousel = document.getElementById('auto-carousel');

let scrollAmount = 0;
const scrollStep = 2; 
const scrollDelay = 20; 

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



