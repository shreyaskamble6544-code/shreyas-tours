// Shreyas Tours & Travels — shared behaviour
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Mark current nav link
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // Contact / booking form: save each request to the shared Google Sheet.
  var form = document.getElementById('bookingForm');
  if (form) {
    var sheetEndpoint = 'https://script.google.com/macros/s/AKfycbwc9HYdt9p1sPJ13M3N8NB678Sr5x_2aeWSlUUrQgaYD6_8kisBMDK4h7E90gDYIB7c2g/exec';
    var submitButton = form.querySelector('button[type="submit"]');
    var originalButtonText = submitButton ? submitButton.textContent : '';
    var errorMessage = document.getElementById('formError');
    var submitting = false;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (submitting) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var msg = document.getElementById('formSuccess');
      submitting = true;
      if (errorMessage) errorMessage.setAttribute('hidden', 'true');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Saving your request…';
        submitButton.setAttribute('aria-busy', 'true');
      }

      try {
        var body = new URLSearchParams(new FormData(form));
        await fetch(sheetEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: body
        });

        form.reset();
        form.setAttribute('hidden', 'true');
        if (msg) msg.removeAttribute('hidden');
      } catch (error) {
        submitting = false;
        if (errorMessage) errorMessage.removeAttribute('hidden');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
          submitButton.removeAttribute('aria-busy');
        }
      }
    });
  }

  // Footer year
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
