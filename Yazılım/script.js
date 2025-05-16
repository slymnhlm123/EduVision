window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    if (window.scrollY > 50) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
});

document.getElementById('search-btn').addEventListener('click', () => {
    const input = document.querySelector('.search-bar input');
    input.classList.toggle('active');
    if (input.classList.contains('active')) {
        input.focus();
    } else {
        input.value = '';
    }
});

// Scroll animation for elements with animate-on-scroll class
const scrollElements = document.querySelectorAll('.animate-on-scroll');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial check
handleScrollAnimation();

// Progress Bar Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-item iframe');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-percent');
    const totalVideos = videos.length;

    // Ders adını URL'den al (örneğin, java.html -> java)
    const courseName = window.location.pathname.split('/').pop().split('.')[0];
    const storageKey = `watchedVideos${courseName.charAt(0).toUpperCase() + courseName.slice(1)}`;
    let watchedVideos = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Başlangıç ilerlemesini ayarla
    const updateProgress = () => {
        const progressPercent = (watchedVideos.length / totalVideos) * 100;
        if (progressBar && progressText) {
            progressBar.style.width = `${progressPercent}%`;
            progressText.textContent = `${Math.round(progressPercent)}%`;
        }
    };
    updateProgress();

    videos.forEach((video, index) => {
        const videoId = video.parentElement.dataset.videoId;
        video.addEventListener('ended', () => {
            if (!watchedVideos.includes(videoId)) {
                watchedVideos.push(videoId);
else {
                localStorage.setItem(storageKey, JSON.stringify(watchedVideos));
                updateProgress();
            }
        });
    });
});