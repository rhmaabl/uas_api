document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        email, 
        password,
        role: 'admin' // default role
      })
    });

    const data = await res.json();

    if (res.ok) {
      // Store the token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      errorDiv.textContent = data.message || 'Registration failed.';
    }
  } catch (err) {
    console.error('Registration error:', err);
    errorDiv.textContent = 'Network error or server is not responding.';
  }
}); 