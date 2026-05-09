// DRAM University — main.js

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Active nav link highlighting
const currentPath = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href').endsWith(currentPath)) {
    link.classList.add('active');
  }
});

// TOC active section tracking (IntersectionObserver)
const headings = document.querySelectorAll('.prose h2, .prose h3');
const tocLinks = document.querySelectorAll('.toc-list a');

if (headings.length && tocLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0% -70% 0%' });

  headings.forEach(h => { if (h.id) observer.observe(h); });
}

// Animate module cards on scroll
const cards = document.querySelectorAll('.module-card, .why-card');
if (cards.length && 'IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    cardObserver.observe(card);
  });
}
