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

// Başarım Çubuğu İşlevselliği
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
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${Math.round(progressPercent)}%`;
    };
    updateProgress();

    videos.forEach((video, index) => {
        const videoId = video.parentElement.dataset.videoId;
        video.addEventListener('ended', () => {
            if (!watchedVideos.includes(videoId)) {
                watchedVideos.push(videoId);
                localStorage.setItem(storageKey, JSON.stringify(watchedVideos));
                updateProgress();
            }
        });
    });
});