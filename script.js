/* उत्तम संवाद - interactions */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Today's date in Hindi
  var dateEl = document.getElementById('uttamToday');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Breaking news ticker: duplicate content for seamless loop
  var track = document.getElementById('uttamTickerTrack');
  if (track) { track.innerHTML += track.innerHTML; }

  // Search panel
  var searchBtn = document.getElementById('uttamSearchToggle');
  var searchPanel = document.getElementById('uttamSearchPanel');
  var searchInput = document.getElementById('uttamSearchInput');
  searchBtn.addEventListener('click', function () {
    var open = searchPanel.classList.toggle('uttam-open');
    searchBtn.querySelector('i').className = open ? 'bi bi-x-lg' : 'bi bi-search';
    if (open) { searchInput.focus(); }
  });
  document.getElementById('uttamSearchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!searchInput.value.trim()) { searchInput.focus(); return; }
    // Backend hook: window.location.href = '/search?q=' + encodeURIComponent(searchInput.value.trim());
    alert('खोज: ' + searchInput.value.trim());
  });

  // Active nav state + close mobile menu on click
  var navLinks = document.querySelectorAll('.uttam-menu .nav-link:not(.dropdown-toggle)');
  var menu = document.getElementById('uttamMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
      if (menu.classList.contains('show')) { bootstrap.Collapse.getOrCreateInstance(menu).hide(); }
    });
  });

  // Video play buttons
  document.querySelectorAll('.uttam-play-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var playing = btn.classList.toggle('uttam-playing');
      btn.innerHTML = playing ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
      btn.setAttribute('aria-label', playing ? 'वीडियो रोकें' : 'वीडियो चलाएं');
    });
  });

  // Gallery lightbox
  var lightboxEl = document.getElementById('uttamLightbox');
  var lightbox = new bootstrap.Modal(lightboxEl);
  document.querySelectorAll('.uttam-gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = document.getElementById('uttamLightboxImg');
      img.src = item.getAttribute('data-uttam-full');
      img.alt = item.getAttribute('data-uttam-cap');
      document.getElementById('uttamLightboxCap').textContent = item.getAttribute('data-uttam-cap');
      lightbox.show();
    });
  });

  // Newsletter validation
  var form = document.getElementById('uttamNewsletterForm');
  var email = document.getElementById('uttamEmail');
  var msg = document.getElementById('uttamFormMessage');
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = email.value.trim();
    msg.className = 'uttam-form-message';
    if (!value) {
      email.classList.add('uttam-invalid'); msg.classList.add('uttam-error'); msg.textContent = 'कृपया अपना ईमेल पता दर्ज करें।'; return;
    }
    if (!pattern.test(value)) {
      email.classList.add('uttam-invalid'); msg.classList.add('uttam-error'); msg.textContent = 'ईमेल पता सही नहीं है। उदाहरण: naam@example.com'; return;
    }
    email.classList.remove('uttam-invalid');
    msg.classList.add('uttam-success');
    msg.textContent = 'धन्यवाद! आपकी सदस्यता सफलतापूर्वक दर्ज हो गई है।';
    form.reset();
  });
  email.addEventListener('input', function () { email.classList.remove('uttam-invalid'); });

  // Back to top
  var topBtn = document.getElementById('uttamBackTop');
  window.addEventListener('scroll', function () {
    topBtn.classList.toggle('uttam-visible', window.scrollY > 400);
  }, { passive: true });
  topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Image fallback so layout never breaks if a photo fails to load
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.uttamFallback) { return; }
      img.dataset.uttamFallback = '1';
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#e1e6ee"/><text x="50%" y="50%" fill="#0b3b8f" font-size="40" text-anchor="middle" font-family="sans-serif">उत्तम संवाद</text></svg>');
    });
  });
});
