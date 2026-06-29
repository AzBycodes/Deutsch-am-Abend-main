/**
 * REGISTRATION FORM — MAILTO VERSION
 * ====================================
 * This form does NOT use any third-party email service. When the visitor
 * clicks "Submit registration," their own email app opens with all the
 * details already filled in — they just need to press Send.
 *
 * No setup, no API keys, no account needed. The address it sends to is
 * set in the EMAIL_TO constant below.
 */

var EMAIL_TO = 'info.deutschamabend@gmail.com';

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('reg-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var formData = new FormData(form);
    var firstname = formData.get('firstname') || '';
    var lastname = formData.get('lastname') || '';
    var email = formData.get('email') || '';
    var phone = formData.get('phone') || '';
    var dob = formData.get('dob') || '';
    var street = formData.get('street') || '';
    var housenumber = formData.get('housenumber') || '';
    var city = formData.get('city') || '';
    var postalcode = formData.get('postalcode') || '';
    var country = formData.get('country') || '';
    var course = formData.get('course') || '';
    var priorlevel = formData.get('priorlevel') || '';
    var schedule = formData.get('schedule') || 'No preference';
    var goals = formData.get('goals') || '';
    var termsAgreed = formData.get('terms') ? 'Yes' : 'No';

    var subject = 'Course Registration: ' + course + ' — ' + firstname + ' ' + lastname;

    var bodyLines = [
      'NEW COURSE REGISTRATION',
      '========================',
      '',
      'Name: ' + firstname + ' ' + lastname,
      'Email: ' + email,
      'Phone: ' + phone,
      'Date of birth: ' + dob,
      '',
      'Address:',
      street + ' ' + housenumber,
      postalcode + ' ' + city,
      country,
      '',
      'Course selected: ' + course,
      'Prior German level: ' + priorlevel,
      'Preferred schedule: ' + schedule,
      '',
      'Goals / questions:',
      goals,
      '',
      'Agreed to Terms & Conditions: ' + termsAgreed,
      '',
      '========================',
      'Sent from the Deutsch am Abend website registration form.'
    ];

    var body = bodyLines.join('\n');

    var mailtoUrl =
      'mailto:' + EMAIL_TO +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoUrl;

    // Let the visitor know what's happening, since opening the email app
    // can take a moment and isn't always an obvious visual change.
    showFormStatus(
      'success',
      'Opening your email app… Please review and press Send to complete your registration. ' +
      'If nothing opens, please email us directly at ' + EMAIL_TO + '.'
    );
  });
});

function showFormStatus(type, message) {
  var existingStatus = document.querySelector('.form-status');
  if (existingStatus) {
    existingStatus.remove();
  }

  var statusEl = document.createElement('div');
  statusEl.className = 'form-status ' + type;
  statusEl.textContent = message;

  var form = document.getElementById('reg-form');
  form.parentNode.insertBefore(statusEl, form);
  statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Pre-select course from query param if present (e.g. services.html?course=A1)
(function () {
  var params = new URLSearchParams(window.location.search);
  var courseParam = params.get('course');
  if (courseParam) {
    var courseMap = {
      'A1': 'A1 — Beginner',
      'A2': 'A2 — Elementary',
      'B1': 'B1 — Intermediate',
      'B2': 'B2 — Upper Intermediate',
      'Exam-Prep': 'Goethe-Zertifikat Exam Prep'
    };
    var targetValue = courseMap[courseParam];
    if (targetValue) {
      var radio = document.querySelector('input[name="course"][value="' + targetValue + '"]');
      if (radio) {
        radio.checked = true;
      }
    }
  }
})();
