async function handleLoginSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const emailOrUsername = document.getElementById('emailOrUsername').value;
    const password = document.getElementById('password').value;
  
    // Prepare data for sending to the backend
    const data = { emailOrUsername, password };
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Login successful!');
        window.location.href = 'main.html';  // Redirect to the main page after login
      } else {
        alert(result.message);  // Show error message from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  }
  
  // Attach event listener to the login form
  document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
  