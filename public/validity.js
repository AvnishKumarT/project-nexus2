function validateName() {
  var inputName = document.getElementById('inputName');
  var nameError = document.getElementById('nameError');

  if (inputName.validity.valid) {
    nameError.style.display = 'none';
  } else {
    nameError.style.display = 'block';
  }
}

function validateEmail() {
  var inputEmail = document.getElementById('inputEmail');
  var emailError = document.getElementById('emailError');

  if (inputEmail.validity.valid) {
    emailError.style.display = 'none';
  } else {
    emailError.style.display = 'block';
  }
}

function handleRegistration() {
  var inputNumber = document.getElementById('inputNumber');
  var phoneError = document.getElementById('phoneError');
  var nameError = document.getElementById('nameError');
  var emailError = document.getElementById('emailError');

  // Validate name
  validateName();

  // Validate phone number (10 digits)
  var phoneNumber = inputNumber.value.replace(/\D/g, ''); // Remove non-numeric characters
  if (phoneNumber.length === 10) {
    // Phone number is valid
    phoneError.style.display = 'none';
  } else {
    // Phone number is invalid
    phoneError.style.display = 'block';
    return; // Abort registration if phone number is invalid
  }

  // Validate email
  validateEmail();

  // Simulate a successful registration
  var registrationSuccessful = true;

  if (registrationSuccessful) {
    // Show the notification
    var notification = document.getElementById('registrationNotification');
    notification.style.display = 'block';

  }
}