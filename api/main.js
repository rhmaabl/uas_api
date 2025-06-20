document.getElementById('keyForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');
  resultDiv.style.display = 'none';
  errorDiv.textContent = '';

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) {
      resultDiv.textContent = 'Your API Key: ' + data.apiKey;
      resultDiv.style.display = 'block';
    } else {
      errorDiv.textContent = data.error || 'Failed to get API key.';
    }
  } catch (err) {
    errorDiv.textContent = 'Network error.';
  }
}); 