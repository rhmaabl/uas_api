document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';

  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email, 
        password 
      })
    });

    const data = await res.json();

    if (res.ok) {
      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      errorDiv.textContent = data.message || 'Login failed.';
    }
  } catch (err) {
    console.error('Login error:', err);
    errorDiv.textContent = 'Network error or server is not responding.';
  }
}); 