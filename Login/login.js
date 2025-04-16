const container = document.getElementById('container');
const signInForm = document.querySelector('.sign-in form');

signInForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan gönderim işlemini engelle
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    if (email && password) {
        alert(`Oturum açma başarılı! E-posta: ${email}`);
        // Burada gerçek bir oturum açma işlemi yapılabilir (örneğin bir API çağrısı)
    } else {
        alert('Lütfen e-posta ve şifrenizi girin!');
    }
});