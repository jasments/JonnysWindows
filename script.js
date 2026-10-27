const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.main-nav');
if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    siteNav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Service enquiry links pre-select the relevant service on the form.
const serviceSelect = document.getElementById('visitor-service');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

const form = document.getElementById('quote-form');
const helper = document.getElementById('form-helper');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('visitor-name');
  const postcode = document.getElementById('visitor-postcode');
  const contact = document.getElementById('visitor-contact');
  const service = document.getElementById('visitor-service');
  const message = document.getElementById('visitor-message');
  const required = [name, postcode, contact, service];
  required.forEach(el => el.removeAttribute('aria-invalid'));
  const invalid = required.find(el => !el.value.trim());
  if (invalid) {
    invalid.setAttribute('aria-invalid','true');
    invalid.focus();
    if (helper) {helper.textContent = 'Please complete the required fields before preparing your enquiry.'; helper.classList.add('error');}
    return;
  }
  const subject = `Free quote enquiry – ${service.value} – ${postcode.value}`;
  const body = [
    'Hello Brooks Coastal Cleaning,', '',
    'I would like a free quote, please.', '',
    `Name: ${name.value.trim()}`,
    `Postcode: ${postcode.value.trim()}`,
    `Contact details: ${contact.value.trim()}`,
    `Service: ${service.value}`,
    `Details: ${message.value.trim() || 'Not provided'}`,
    '', 'Thank you.'
  ].join('\n');
  if (helper) {helper.textContent = 'Your email app should open with your enquiry ready to send. Please press Send in your email app to complete it.'; helper.classList.remove('error');}
  window.location.href = `mailto:hello@brookscoastalcleaning.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
