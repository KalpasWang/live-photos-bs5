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
