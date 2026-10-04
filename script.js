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

  function validateRequiredRadioGroup() {
    const selectedUnit = form.querySelector('input[name="unit"]:checked');
    const unitRadioButtons = form.querySelectorAll('input[name="unit"]');

    unitRadioButtons.forEach((radio) => {
      radio.setCustomValidity('');
    });

    if (!selectedUnit) {
      unitRadioButtons.forEach((radio) => radio.setCustomValidity('Please select your unit.'));
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

  function validateDateTime(field, message) {
    if (!field || !field.value) {
      if (field) {
        field.setCustomValidity(message);
      }
      return false;
    }

    field.setCustomValidity('');
    return true;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isStudentIdValid = validateTextField(studentId, /^[0-9]{7,10}$/, 'Enter a student ID with 7 to 10 digits.');
    const isGivenNameValid = validateTextField(givenName, /^[A-Za-z ]{1,15}$/, 'Use letters only, up to 15 characters.');
    const isFamilyNameValid = validateTextField(familyName, /^[A-Za-z ]{1,15}$/, 'Use letters only, up to 15 characters.');
    const isTutorValid = validateSelectField(tutor, 'Please select your tutor.');
    const isUnitValid = validateRequiredRadioGroup();
    const isDateValid = validateDateTime(preferredDate, 'Please select a preferred date.');
    const isTimeValid = validateDateTime(preferredTime, 'Please select a preferred time.');

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
