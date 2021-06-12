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
window.addEventListener('scroll', function () {
  var documentTop =
  document.documentElement.scrollTop + document.body.scrollTop + 61;
  var tabsTop = tabs.offsetTop;
  var tabsBottom = tabs.offsetTop + tabs.offsetHeight;
  // console.log(document.documentElement.scrollTop + 61);
  // console.log(tabs.offsetTop);
  // console.log(tabsBottom);
  if (documentTop - tabsTop >= 0 && documentTop - tabsBottom < 0) {
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
//# sourceMappingURL=all.js.map
