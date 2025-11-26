// ========================================
// 1. ACCESSING THE FORM
// ========================================
const form = document.getElementById('registrationForm');

// ========================================
// 2. ACCESSING FORM ELEMENTS
// ========================================
const usernameInput = form.elements['username'];
const emailInput = form.elements['email'];
const passwordInput = form.elements['password'];
const ageInput = form.elements['age'];
const countrySelect = form.elements['country'];
const bioTextarea = form.elements['bio'];
const termsCheckbox = form.elements['terms'];
const newsletterCheckbox = form.elements['newsletter'];
const resetButton = document.getElementById('resetButton');

// Error message elements
const usernameError = document.getElementById('usernameError');
const usernameSuccess = document.getElementById('usernameSuccess');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const ageError = document.getElementById('ageError');
const termsError = document.getElementById('termsError');

// Character counter
const charCount = document.getElementById('charCount');

// Result display
const resultDiv = document.getElementById('result');

// ========================================
// 3. THE INPUT EVENT - Real-time validation
// ========================================

// Username validation (as user types)
usernameInput.addEventListener('input', function() {
  const value = this.value;
  
  // Clear previous messages
  usernameError.textContent = '';
  usernameSuccess.textContent = '';
  
  if (value.length > 0 && value.length < 3) {
    usernameError.textContent = 'Username must be at least 3 characters';
  } else if (value.length >= 3) {
    usernameSuccess.textContent = '✓ Username looks good!';
  }
});

// Password strength indicator (as user types)
passwordInput.addEventListener('input', function() {
  const value = this.value;
  
  passwordError.textContent = '';
  
  if (value.length > 0 && value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters';
  } else if (value.length >= 6 && value.length < 8) {
    passwordError.textContent = 'Password is okay (consider making it longer)';
    passwordError.style.color = 'orange';
  } else if (value.length >= 8) {
    passwordError.textContent = '✓ Strong password!';
    passwordError.style.color = 'green';
  }
});

// Character counter for bio (as user types)
bioTextarea.addEventListener('input', function() {
  const currentLength = this.value.length;
  charCount.textContent = currentLength;
  
  // Change color when approaching limit
  if (currentLength > 180) {
    charCount.style.color = 'red';
  } else if (currentLength > 150) {
    charCount.style.color = 'orange';
  } else {
    charCount.style.color = '#666';
  }
});

// ========================================
// 4. THE CHANGE EVENT - Validation after editing
// ========================================

// Email validation (after user finishes typing)
emailInput.addEventListener('change', function() {
  const value = this.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  emailError.textContent = '';
  
  if (value && !emailPattern.test(value)) {
    emailError.textContent = 'Please enter a valid email address';
  }
});

// Age validation (after user finishes editing)
ageInput.addEventListener('change', function() {
  const value = parseInt(this.value);
  
  ageError.textContent = '';
  
  if (value < 13) {
    ageError.textContent = 'You must be at least 13 years old to register';
  } else if (value > 120) {
    ageError.textContent = 'Please enter a valid age';
  }
});

// Country selection (when user selects)
countrySelect.addEventListener('change', function() {
  const value = this.value;
  
  if (value === 'other') {
    console.log('User selected "Other" country - might show additional field');
  }
});

// ========================================
// 5. FORM SUBMISSION
// ========================================

form.addEventListener('submit', function(event) {
  // Prevent default form submission
  event.preventDefault();
  
  // Clear previous errors
  termsError.textContent = '';
  
  // ========================================
  // 6. GETTING VALUES FROM FORM ELEMENTS
  // ========================================
  
  // Get all values
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const age = parseInt(ageInput.value);
  const country = countrySelect.value;
  const bio = bioTextarea.value.trim();
  const termsAccepted = termsCheckbox.checked;
  const subscribeNewsletter = newsletterCheckbox.checked;
  
  // Validation before submission
  let isValid = true;
  
  // Username validation
  if (username.length < 3) {
    usernameError.textContent = 'Username must be at least 3 characters';
    isValid = false;
  }
  
  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Password validation
  if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  // Age validation
  if (age < 13) {
    ageError.textContent = 'You must be at least 13 years old';
    isValid = false;
  }
  
  // Terms validation
  if (!termsAccepted) {
    termsError.textContent = 'You must accept the Terms and Conditions';
    isValid = false;
  }
  
  // If form is not valid, stop here
  if (!isValid) {
    alert('Please fix the errors before submitting');
    return;
  }
  
  // ========================================
  // Display the submitted data
  // ========================================
  
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <h2>Registration Successful! 🎉</h2>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Bio:</strong> ${bio || 'No bio provided'}</p>
    <p><strong>Newsletter:</strong> ${subscribeNewsletter ? 'Yes' : 'No'}</p>
    <p style="color: green;">Your account has been created successfully!</p>
  `;
  
  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth' });
  
  // In a real application, you would send this data to a server:
  console.log('Data to send to server:', {
    username,
    email,
    password, // In reality, NEVER log passwords!
    age,
    country,
    bio,
    subscribeNewsletter
  });
});

// ========================================
// 7. THE RESET METHOD
// ========================================

resetButton.addEventListener('click', function() {
  // Confirm before clearing
  const confirmReset = confirm('Are you sure you want to clear the form?');
  
  if (confirmReset) {
    // Clear the form using reset() method
    form.reset();
    
    // Clear all error messages
    usernameError.textContent = '';
    usernameSuccess.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    ageError.textContent = '';
    termsError.textContent = '';
    
    // Reset character counter
    charCount.textContent = '0';
    charCount.style.color = '#666';
    
    // Hide result
    resultDiv.style.display = 'none';
    
    // Show confirmation
    alert('Form has been cleared!');
    
    // Focus on first field
    usernameInput.focus();
  }
});

// ========================================
// BONUS: Form auto-save to localStorage
// ========================================

// Save form data as user types (every 2 seconds)
let saveTimeout;

function autoSaveForm() {
  clearTimeout(saveTimeout);
  
  saveTimeout = setTimeout(function() {
    const formData = {
      username: usernameInput.value,
      email: emailInput.value,
      age: ageInput.value,
      country: countrySelect.value,
      bio: bioTextarea.value,
      newsletter: newsletterCheckbox.checked
    };
    
    localStorage.setItem('registrationDraft', JSON.stringify(formData));
    console.log('Form auto-saved!');
  }, 2000);
}

// Listen to all form changes for auto-save
form.addEventListener('input', autoSaveForm);
form.addEventListener('change', autoSaveForm);

// Load saved data when page loads
window.addEventListener('load', function() {
  const savedData = localStorage.getItem('registrationDraft');
  
  if (savedData) {
    const data = JSON.parse(savedData);
    
    const restore = confirm('We found a saved draft. Would you like to restore it?');
    
    if (restore) {
      usernameInput.value = data.username || '';
      emailInput.value = data.email || '';
      ageInput.value = data.age || '';
      countrySelect.value = data.country || '';
      bioTextarea.value = data.bio || '';
      newsletterCheckbox.checked = data.newsletter || false;
      
      // Update character counter
      charCount.textContent = bioTextarea.value.length;
      
      alert('Your draft has been restored!');
    }
  }
});