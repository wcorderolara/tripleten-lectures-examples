// Accessing Forms using JavaScript
const jobApplicationForm = document.getElementById("jobApplicationForm");

// Accessing Form Elements
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const positionSelect = document.getElementById("position");
const experienceInput = document.getElementById("experience");
const salaryInput = document.getElementById("salary");
const coverLetterTextarea = document.getElementById("coverLetter");
const agreeTermsCheckbox = document.getElementById("agreeTerms");
const resetButton = document.getElementById("resetBtn");
const submitButton = document.getElementById("submitBtn");

// Getting the value of Form Elements
function getFormValues() {
  return {
    fullName: fullNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    position: positionSelect.value,
    experience: experienceInput.value,
    salary: salaryInput.value,
    coverLetter: coverLetterTextarea.value,
    agreeTerms: agreeTermsCheckbox.checked,
  };
}

// The change and input Events
fullNameInput.addEventListener("input", function () {
  validateField("fullName");
  updateProgress();
});

emailInput.addEventListener("input", function () {
  validateField("email");
  updateProgress();
});

phoneInput.addEventListener("input", function () {
  validateField("phone");
  updateProgress();
});

positionSelect.addEventListener("change", function () {
  validateField("position");
  updateProgress();
});

experienceInput.addEventListener("input", function () {
  validateField("experience");
  updateProgress();
});

salaryInput.addEventListener("input", function () {
  // Salary is optional, but we can show a success message if provided
  const salarySuccess = document.getElementById("salarySuccess");
  if (salaryInput.value) {
    salarySuccess.style.display = "block";
  } else {
    salarySuccess.style.display = "none";
  }
  updateProgress();
});

coverLetterTextarea.addEventListener("input", function () {
  // Update character count
  const charCount = document.getElementById("charCount");
  charCount.textContent = coverLetterTextarea.value.length;

  validateField("coverLetter");
  updateProgress();
});

agreeTermsCheckbox.addEventListener("change", function () {
  validateField("agreeTerms");
  updateProgress();
});

// Form validation functions
function validateField(fieldName) {
  const values = getFormValues();
  let isValid = true;
  let errorMessage = "";

  switch (fieldName) {
    case "fullName":
      isValid = values.fullName.trim().length >= 2;
      errorMessage = "Please enter your full name (at least 2 characters)";
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(values.email);
      errorMessage = "Please enter a valid email address";
      break;
    case "phone":
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      isValid = phoneRegex.test(values.phone.replace(/\D/g, ""));
      errorMessage = "Please enter a valid phone number";
      break;
    case "position":
      isValid = values.position !== "";
      errorMessage = "Please select a position";
      break;
    case "experience":
      isValid =
        values.experience !== "" &&
        parseInt(values.experience) >= 0 &&
        parseInt(values.experience) <= 50;
      errorMessage = "Please enter years of experience (0-50)";
      break;
    case "coverLetter":
      isValid =
        values.coverLetter.length >= 50 && values.coverLetter.length <= 500;
      errorMessage = "Please provide a cover letter (50-500 characters)";
      break;
    case "agreeTerms":
      isValid = values.agreeTerms;
      errorMessage = "You must agree to the terms and conditions";
      break;
  }

  // Show/hide error message
  const errorElement = document.getElementById(fieldName + "Error");
  if (errorElement) {
    if (!isValid) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
    } else {
      errorElement.style.display = "none";
    }
  }

  return isValid;
}

function validateForm() {
  const fields = [
    "fullName",
    "email",
    "phone",
    "position",
    "experience",
    "coverLetter",
    "agreeTerms",
  ];
  let isValid = true;
  const errors = [];

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
      const fieldLabel = document.querySelector(
        `label[for="${field}"]`
      ).textContent;
      errors.push(`${fieldLabel} is invalid`);
    }
  });

  // Show validation summary if there are errors
  const validationSummary = document.getElementById("validationSummary");
  const errorList = document.getElementById("errorList");

  if (!isValid) {
    errorList.innerHTML = "";
    errors.forEach((error) => {
      const li = document.createElement("li");
      li.textContent = error;
      errorList.appendChild(li);
    });
    validationSummary.style.display = "block";

    // Scroll to validation summary
    validationSummary.scrollIntoView({ behavior: "smooth" });
  } else {
    validationSummary.style.display = "none";
  }

  return isValid;
}

// Update form progress
function updateProgress() {
  const fields = [
    "fullName",
    "email",
    "phone",
    "position",
    "experience",
    "coverLetter",
    "agreeTerms",
  ];
  let completedFields = 0;

  fields.forEach((field) => {
    if (validateField(field)) {
      completedFields++;
    }
  });

  const progressPercentage = (completedFields / fields.length) * 100;
  document.getElementById(
    "formProgress"
  ).style.width = `${progressPercentage}%`;
}

// The reset() method
resetButton.addEventListener("click", function () {
  // Using the reset() method on the form
  jobApplicationForm.reset();

  // Also hide all error messages
  document.querySelectorAll(".error").forEach((error) => {
    error.style.display = "none";
  });

  // Hide validation summary
  document.getElementById("validationSummary").style.display = "none";

  // Reset character count
  document.getElementById("charCount").textContent = "0";

  // Reset progress bar
  document.getElementById("formProgress").style.width = "0%";

  // Hide salary success message
  document.getElementById("salarySuccess").style.display = "none";
});

// Submitting Forms
jobApplicationForm.addEventListener("submit", function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Validate the form
  if (validateForm()) {
    // In a real application, you would send the data to a server here
    // For demonstration, we'll just show an alert
    alert(
      "Application submitted successfully! We will review your application and get back to you soon."
    );

    // Reset the form after successful submission
    jobApplicationForm.reset();
    document.getElementById("formProgress").style.width = "0%";
    document.getElementById("charCount").textContent = "0";
    document.getElementById("salarySuccess").style.display = "none";
  }
});

// Initialize progress bar
updateProgress();
