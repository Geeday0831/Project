// Function to handle register form submission
async function handleRegisterSubmit(event) {
    event.preventDefault();
  
    // Get the form input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Prepare the data to be sent to the backend
    const data = {
      email,
      password,
    };
  
    try {
      // Send a POST request to the backend API
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // Check if the response is successful
      if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'main.html'; // Redirect to the main page after successful registration
      } else {
        alert(result.message); // Show error message from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering user');
    }
  }
  
  //This Sets up the form event listener when the page loads
  document.getElementById('register-form').addEventListener('submit', handleRegisterSubmit);