document.getElementById('join-btn').addEventListener('click', function() {
    alert('EduVision\'a hoş geldiniz! Katılmak için login ekranına yönlendiriliyorsunuz.');
    // window.location.href = 'login.html';
});

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', function() {
    if (searchInput.classList.contains('active')) {
        const query = searchInput.value;
        if (query) {
            alert(`"${query}" için arama yapılıyor...`);
            searchInput.value = '';
        } else {
            alert('Lütfen bir arama terimi girin!');
        }
        searchInput.classList.remove('active');
    } else {
        searchInput.classList.add('active');
        searchInput.focus();
    }
});

document.addEventListener('click', function(event) {
    if (!searchBtn.contains(event.target) && !searchInput.contains(event.target)) {
        searchInput.classList.remove('active');
    }
});

window.addEventListener('scroll', function() {
    const topBar = document.querySelector('.top-bar');
    if (window.scrollY > 50) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});
