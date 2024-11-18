// Function to handle login button click
function handleLoginClick() {
    // Redirect to login page
    window.location.href = 'login.html'; // Replace 'login.html' with your actual login page URL
  }
  
  // Function to handle register button click
  function handleRegisterClick() {
    // Redirect to register page
    window.location.href = 'register.html'; // Replace 'register.html' with your actual registration page URL
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Get the buttons
    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
  
    // Add event listeners to the buttons
    loginButton.addEventListener('click', handleLoginClick);
    registerButton.addEventListener('click', handleRegisterClick);
  }
  
  // Call the function to set up event listeners when the page loads
  setupEventListeners();