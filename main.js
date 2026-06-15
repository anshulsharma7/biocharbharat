// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Waitlist form
const joinForm = document.getElementById('joinForm');
const joinSuccess = document.getElementById('joinSuccess');
const submitBtn = joinForm.querySelector('button[type="submit"]');

joinForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const formData = new FormData(joinForm);
  formData.append('access_key', 'REPLACE_WITH_WEB3FORMS_KEY');
  formData.append('subject', 'New Biochar Bharat Waitlist Registration — ' + formData.get('role'));
  formData.append('from_name', 'Biochar Bharat Website');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();

    if (json.success) {
      joinForm.style.display = 'none';
      joinSuccess.style.display = 'block';
    } else {
      throw new Error(json.message || 'Submission failed');
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Join the Waitlist →';
    alert('Something went wrong. Please email us directly at biocharbharat.official@gmail.com');
  }
});

// Smooth scroll offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .impact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
