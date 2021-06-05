var loginModal = document.getElementById('loginModal');
var account = document.getElementById('account');

loginModal.addEventListener('shown.bs.modal', function () {
  account.focus();
});

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

var accordionBtns = Array.from(
  document.getElementsByClassName('accordion-button')
);
var accordionItems = Array.from(
  document.getElementsByClassName('accordion-item')
);

accordionBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.toggle('accordion-shadow');
  });
});
