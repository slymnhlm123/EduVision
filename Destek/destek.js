document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const btn = document.getElementById('button');

  if (!commentForm) {
    console.error("HATA: Form elementi bulunamadı! ID 'commentForm' olan bir form olduğundan emin olun.");
    return;
  }

  if (!btn) {
    console.error("HATA: Buton elementi bulunamadı! ID 'button' olan bir buton olduğundan emin olun.");
    return;
  }

  if (typeof emailjs === 'undefined') {
    console.error("HATA: EmailJS yüklenmedi! EmailJS scriptinin doğru yüklendiğinden emin olun.");
    return;
  }

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    btn.textContent = 'Gönderiliyor...';

    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const contribution = document.getElementById('contribution').value.trim();
    const extra = document.getElementById('extra').value.trim();

    if (!name || !comment || !contribution) {
      console.warn("UYARI: Lütfen tüm zorunlu alanları doldurun!");
      alert("Ad, yorum ve katkı alanlarını doldurmanız gerekiyor!");
      btn.textContent = 'Gönder';
      return;
    }

    const templateParams = {
      user_name: name,
      user_comment: comment,
      user_contribution: contribution,
      user_extra: extra || "Yok",
      date_time: new Date().toLocaleString()
    };

    console.log("EmailJS gönderimi başlıyor:", templateParams);

    emailjs.send("service_w4c8xrc", "template_84q42kj", templateParams)
      .then(() => {
        console.log("BAŞARILI: Email gönderildi!");
        btn.textContent = 'Gönder';
        window.location.href = 'bitis.html'; // Yönlendirme
      })
      .catch((err) => {
        console.error("HATA: Email gönderimi başarısız!", err);
        btn.textContent = 'Gönder';
        alert("Email gönderimi başarısız oldu: " + JSON.stringify(err));
      });
  });
});
