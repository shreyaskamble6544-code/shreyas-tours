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

  // Contact / booking form: front-end only demo handling
  var form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('formSuccess');
      form.setAttribute('hidden', 'true');
      if (msg) msg.removeAttribute('hidden');
    });
  }

  // Footer year
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
