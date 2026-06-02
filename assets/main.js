/* ═══════════════════════════════════════════════════════
   Hacking101 Academy — Enhanced Client JS v3.0
   Menu toggle · Hero slider · Form validation · Accessibility
   ═══════════════════════════════════════════════════════ */

(function(){
  'use strict';

  /* ── Mobile Menu Toggle ── */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(){
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.innerHTML = open ? '&#10005;' : '&#9776;';
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close on Escape
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && nav.classList.contains('open')){
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded','false');
        menuToggle.innerHTML = '&#9776;';
        menuToggle.setAttribute('aria-label','Open menu');
        menuToggle.focus();
      }
    });
  }

  /* ── Hero Slider ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow.prev');
  const nextBtn = document.querySelector('.hero-arrow.next');
  const sliderRegion = document.querySelector('.hero-slider');

  if (slides.length && dots.length) {
    let heroIndex = 0;
    let autoplay;
    let userInteracting = false;

    function go(n){
      const len = slides.length;
      slides[heroIndex].classList.remove('active');
      if (dots[heroIndex]) dots[heroIndex].classList.remove('active');
      heroIndex = ((n % len) + len) % len;
      slides[heroIndex].classList.add('active');
      if (dots[heroIndex]) dots[heroIndex].classList.add('active');
      // Update aria-live for screen readers
      if (sliderRegion){
        sliderRegion.setAttribute('aria-label',
          'Slide ' + (heroIndex+1) + ' of ' + len);
      }
    }

    function startAutoplay(){
      stopAutoplay();
      autoplay = setInterval(function(){ go(heroIndex + 1); }, 7000);
    }

    function stopAutoplay(){
      if (autoplay) clearInterval(autoplay);
    }

    // Dot clicks
    dots.forEach(function(dot){
      dot.addEventListener('click', function(){
        const i = parseInt(this.getAttribute('data-i'),10);
        if (!isNaN(i)) go(i);
      });
    });

    // Arrow clicks
    if (prevBtn) prevBtn.addEventListener('click', function(){ go(heroIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ go(heroIndex + 1); });

    // Keyboard
    document.addEventListener('keydown', function(e){
      if (e.key === 'ArrowLeft') go(heroIndex - 1);
      if (e.key === 'ArrowRight') go(heroIndex + 1);
    });

    // Pause autoplay when user hovers or focuses inside the slider
    if (sliderRegion){
      sliderRegion.addEventListener('mouseenter', function(){ userInteracting=true; stopAutoplay(); });
      sliderRegion.addEventListener('mouseleave', function(){ userInteracting=false; startAutoplay(); });
      sliderRegion.addEventListener('focusin', function(){ userInteracting=true; stopAutoplay(); });
      sliderRegion.addEventListener('focusout', function(){ userInteracting=false; startAutoplay(); });
    }

    startAutoplay();
  }

  /* ── Form Validation & Submit ── */
  const forms = document.querySelectorAll('.enrol-form');
  forms.forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(function(field){
        if (!field.value.trim()){
          valid = false;
          field.style.borderColor = 'var(--danger)';
          field.setAttribute('aria-invalid','true');
        } else {
          field.style.borderColor = '';
          field.removeAttribute('aria-invalid');
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())){
          valid = false;
          emailField.style.borderColor = 'var(--danger)';
          emailField.setAttribute('aria-invalid','true');
        }
      }

      if (!valid) return;

      // Show success state (replace form with confirmation)
      const btn = form.querySelector('button[type="submit"]');
      if (btn){
        const origText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;

        // Simulate submission (replace with real endpoint when ready)
        setTimeout(function(){
          form.style.display = 'none';
          const success = document.createElement('div');
          success.className = 'form-success show';
          success.innerHTML = '<div class="success-icon">&#9989;</div>' +
            '<h3>Enquiry Received</h3>' +
            '<p>Human review within 1 business day. No spam.</p>' +
            '<p class="muted">We\'ll respond to your work email within 24 hours (usually sooner).</p>';
          form.parentNode.appendChild(success);
        }, 1200);
      }
    });

    // Clear validation styles on input
    form.querySelectorAll('input, select, textarea').forEach(function(field){
      field.addEventListener('input', function(){
        this.style.borderColor = '';
        this.removeAttribute('aria-invalid');
      });
    });
  });
})();
