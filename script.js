document.getElementById('join-btn').addEventListener('click', function() {
    alert('EduVision\'a hoş geldiniz! Katılmak için login ekranına yönlendiriliyorsunuz.');
    // window.location.href = 'login.html';
});

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', function() {
    // Arama alanı açık mı kontrol et
    if (searchInput.classList.contains('active')) {
        // Arama alanı açıksa, arama işlemini gerçekleştir ve kapat
        const query = searchInput.value;
        if (query) {
            alert(`"${query}" için arama yapılıyor...`);
        } else {
            alert('Lütfen bir arama terimi girin!');
        }
        searchInput.classList.remove('active'); // Kapat
    } else {
        // Arama alanı kapalıysa, aç
        searchInput.classList.add('active');
        searchInput.focus(); // Arama alanına odaklan
    }
});

// Arama alanının dışına tıklandığında kapanmasını sağla
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