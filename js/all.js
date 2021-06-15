"use strict";var loginModal = document.getElementById('loginModal');
var account = document.getElementById('account');
var sponsorBtn = document.getElementById('sponsor-btn');
var sponsorForm = document.getElementById('sponsor');
var tabs = document.getElementById('tabs');

// 登入視窗
loginModal.addEventListener('shown.bs.modal', function () {
  account.focus();
});

// 釘選下選單顯示判斷
sponsorBtn.classList.add('d-none');
var exitIntro = false;
var inForm = false;

var options = {
  rootMargin: '0px',
  threshold: 0 };

var introObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    exitIntro = !entry.isIntersecting;
  });
}, options);
introObserver.observe(document.getElementById('intro'));

var formOptions = {
  rootMargin: '0px',
  threshold: 0.85 };

var formObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    inForm = entry.isIntersecting;
  });
}, formOptions);
formObserver.observe(sponsorForm);

window.addEventListener('scroll', function () {
  if (exitIntro && !inForm) {
    sponsorBtn.classList.remove('d-none');
  } else {
    sponsorBtn.classList.add('d-none');
  }
});

// 前往募資表單
sponsorBtn.addEventListener('click', function () {
  window.scroll({
    top: sponsorForm.offsetTop - 75,
    left: 0,
    behavior: 'smooth' });

});

// 工具提示框啟用
var tooltipTriggerList = [].slice.call(
document.querySelectorAll('[data-bs-toggle="tooltip"]'));

var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// 手風琴陰影效果客製化
var accordionBtns = Array.from(
document.getElementsByClassName('accordion-button'));

var accordionItems = Array.from(
document.getElementsByClassName('accordion-item'));


accordionBtns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.target.parentElement.parentElement.classList.toggle('accordion-shadow');
  });
});

// 客戶端表單驗證
var forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
  'submit',
  function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
  },
  false);

});
//# sourceMappingURL=all.js.map
