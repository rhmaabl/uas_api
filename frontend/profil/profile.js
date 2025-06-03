document.addEventListener('DOMContentLoaded', function() {
    // Load email from localStorage (set during registration/login)
    const emailInput = document.querySelector('input[type="email"]');
    const emailEditLink = document.querySelector('.email-edit-link');
    const saveBtn = document.querySelector('.btn-save');

    // Set email from localStorage if available
    if (localStorage.getItem('userEmail')) {
        emailInput.value = localStorage.getItem('userEmail');
    }

    // Make email editable when 'Ubah' is clicked
    if (emailEditLink) {
        emailEditLink.addEventListener('click', function(e) {
            e.preventDefault();
            emailInput.removeAttribute('readonly');
            emailInput.focus();
        });
    }

    // Save new email to localStorage on form submit
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('userEmail', emailInput.value);
            emailInput.setAttribute('readonly', 'readonly');
            alert('Profil berhasil disimpan!');
        });
    }
}); 