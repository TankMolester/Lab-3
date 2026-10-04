document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');

  if (!form) {
    return;
  }

  const studentId = document.getElementById('studentId');
  const givenName = document.getElementById('givenName');
  const familyName = document.getElementById('familyName');
  const tutor = document.getElementById('tutor');
  const preferredDate = document.getElementById('preferredDate');
  const preferredTime = document.getElementById('preferredTime');

  function sanitizeDateInput(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 8);
    let day = digits.slice(0, 2);
    let month = digits.slice(2, 4);
    let year = digits.slice(4, 8);

    let formatted = day;
    if (digits.length > 2) {
      formatted += '/' + month;
    }
    if (digits.length > 4) {
      formatted += '/' + year;
    }

    input.value = formatted;
  }

  function sanitizeTimeInput(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 4);
    let hour = digits.slice(0, 2);
    let minute = digits.slice(2, 4);

    let formatted = hour;
    if (digits.length > 2) {
      formatted += ':' + minute;
    }

    input.value = formatted;
  }

  if (preferredDate) {
    preferredDate.addEventListener('input', () => sanitizeDateInput(preferredDate));
  }

  if (preferredTime) {
    preferredTime.addEventListener('input', () => sanitizeTimeInput(preferredTime));
  }

  function validateRequiredRadioGroup() {
    const unitRadioButtons = form.querySelectorAll('input[name="unit"]');
    const selectedUnit = form.querySelector('input[name="unit"]:checked');

    unitRadioButtons.forEach((radio) => radio.setCustomValidity(''));

    if (!selectedUnit) {
      unitRadioButtons.forEach((radio) => {
        radio.setCustomValidity('Please select your unit.');
      });
      return false;
    }

    return true;
  }

  function validateTextField(field, pattern, invalidMessage) {
    if (!field) {
      return true;
    }

    const value = field.value.trim();

    if (!value) {
      field.setCustomValidity(invalidMessage);
      return false;
    }

    if (!pattern.test(value)) {
      field.setCustomValidity(invalidMessage);
      return false;
    }

    field.setCustomValidity('');
    return true;
  }

  function validateSelectField(field, message) {
    if (!field) {
      return true;
    }

    if (!field.value) {
      field.setCustomValidity(message);
      return false;
    }

    field.setCustomValidity('');
    return true;
  }

  function validateDateTime(field, pattern, message) {
    if (!field) {
      return true;
    }

    if (!field.value) {
      field.setCustomValidity(message);
      return false;
    }

    if (!pattern.test(field.value)) {
      field.setCustomValidity(message);
      return false;
    }

    field.setCustomValidity('');
    return true;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isStudentIdValid = validateTextField(studentId, /^[0-9]{7,10}$/, 'Student ID must contain between 7 and 10 digits.');
    const isGivenNameValid = validateTextField(givenName, /^[A-Za-z ]{1,15}$/, 'Only alphabetic characters are allowed.');
    const isFamilyNameValid = validateTextField(familyName, /^[A-Za-z ]{1,15}$/, 'Only alphabetic characters are allowed.');
    const isTutorValid = validateSelectField(tutor, 'Please select your tutor.');
    const isUnitValid = validateRequiredRadioGroup();
    const isDateValid = validateDateTime(preferredDate, /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Please enter a valid date in dd/mm/yyyy format.');
    const isTimeValid = validateDateTime(preferredTime, /^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in 24-hour format.');

    if (
      isStudentIdValid &&
      isGivenNameValid &&
      isFamilyNameValid &&
      isTutorValid &&
      isUnitValid &&
      isDateValid &&
      isTimeValid
    ) {
      form.reset();
      alert('Appointment request submitted successfully.');
    } else {
      form.reportValidity();
    }
  });

  [studentId, givenName, familyName, tutor, preferredDate, preferredTime].forEach((field) => {
    if (!field) {
      return;
    }

    field.addEventListener('input', () => field.setCustomValidity(''));
    field.addEventListener('change', () => field.setCustomValidity(''));
  });

  form.querySelectorAll('input[name="unit"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      form.querySelectorAll('input[name="unit"]').forEach((item) => item.setCustomValidity(''));
    });
  });
});
