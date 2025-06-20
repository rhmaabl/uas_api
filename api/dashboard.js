// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token || !user.username) {
  window.location.href = 'login.html';
}

const apiKeySpan = document.getElementById('apiKey');
const apiKeyError = document.getElementById('apiKeyError');
const generateBtn = document.getElementById('generateBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Update page with user info
document.querySelector('.hero p').textContent = `Welcome back, ${user.username}!`;

// Get user email from JWT (decode payload)
function getEmailFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email;
  } catch {
    return null;
  }
}

const email = getEmailFromToken(token);

async function fetchApiKey() {
  apiKeySpan.textContent = 'Loading...';
  apiKeyError.textContent = '';
  
  try {
    // First try to get existing API key
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    });
    
    const data = await res.json();
    
    if (res.ok && data.apiKey) {
      apiKeySpan.textContent = data.apiKey;
      apiKeyError.textContent = '';
    } else {
      // If no existing key, generate a new one
      const generateRes = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email })
      });
      
      const generateData = await generateRes.json();
      
      if (generateRes.ok && generateData.apiKey) {
        apiKeySpan.textContent = generateData.apiKey;
        apiKeyError.textContent = '';
      } else {
        apiKeySpan.textContent = 'Failed to generate key';
        apiKeyError.textContent = generateData.message || 'Could not generate API key.';
      }
    }
  } catch (err) {
    console.error('API Key error:', err);
    apiKeySpan.textContent = 'Error';
    apiKeyError.textContent = 'Network error or server is not responding.';
  }
}

generateBtn.onclick = fetchApiKey;
logoutBtn.onclick = function() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
};

// On load, fetch API key
fetchApiKey(); 