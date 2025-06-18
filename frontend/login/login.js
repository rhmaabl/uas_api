// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.auth-form');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // Password toggle functionality
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const icon = input.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    // Form validation
    function validateForm() {
        let isValid = true;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError('email');
        }

        // Password validation
        if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            removeError('password');
        }

        return isValid;
    }

    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const inputContainer = field.closest('.input-icon');
        
        field.classList.add('error');
        
        // Remove existing error message if any
        const existingError = inputContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        inputContainer.appendChild(errorDiv);
    }

    // Remove error message
    function removeError(fieldId) {
        const field = document.getElementById(fieldId);
        const inputContainer = field.closest('.input-icon');
        
        field.classList.remove('error');
        
        const errorMessage = inputContainer.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Form submission handler
    window.handleLogin = async function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // Kirim data login ke backend
                const response = await fetch('http://localhost:3000/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password
                    })
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Login failed');
                }
                // Simpan token, email, dan id_user ke localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('userEmail', result.user.email);
                localStorage.setItem('id_user', result.user.id_user);
                // Redirect ke halaman utama
                window.location.href = '../index/index.html';
            } catch (error) {
                alert(error.message || 'Login failed. Please try again.');
            }
        }
    };

    // Real-time validation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                removeError(input.id);
            }
        });
    });

    // Remember me functionality
    if (rememberCheckbox) {
        // Check if there are saved credentials
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            rememberCheckbox.checked = true;
        }

        // Save email when checkbox is checked
        rememberCheckbox.addEventListener('change', () => {
            if (rememberCheckbox.checked) {
                const email = document.getElementById('email').value;
                if (email) {
                    localStorage.setItem('rememberedEmail', email);
                }
            } else {
                localStorage.removeItem('rememberedEmail');
            }
        });
    }

    // Forgot password handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            if (email && validateEmail(email)) {
                // Here you would typically send a password reset email
                console.log('Password reset requested for:', email);
                alert('Password reset instructions have been sent to your email.');
            } else {
                alert('Please enter a valid email address to reset your password.');
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Social login handlers
    document.querySelector('.social-btn.google').addEventListener('click', () => {
        // Implement Google login
        console.log('Google login clicked');
    });

    document.querySelector('.social-btn.facebook').addEventListener('click', () => {
        // Implement Facebook login
        console.log('Facebook login clicked');
    });
}); 