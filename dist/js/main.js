// 1. email уже занят (сверяться со статическим списком email-ов, который 
//   хоранится на глобальном уровне в переменной usedEmails) 
// ['author@mail.com', 'foo@mail.com', 'tester@mail.com']
// 2. Пароль слишком короток (до 5 символов)
// 3. Простой пароль (только числа, только буквы)
// 4. Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры)
// 5. Международный формат записи телефона не выдержан
// 6. Галочка "Согласен со всем" не поставлена.
// 7. Валидировать в процессе набора.

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];

(function () {
  var findRequireInputs = function findRequireInputs(collectionInside, collectionOutside) {
    collectionOutside = [];
    Array.prototype.slice.call(collectionInside).forEach(function (el, i) {
      if (el.parentNode.classList.contains('required')) {
        collectionOutside.push(el);
      }
    });
    return collectionOutside;
  };

  var FormValidation = function () {
    function FormValidation() {
      var _this = this;

      _classCallCheck(this, FormValidation);

      this.formMain = document.body.querySelector('[role="form"]');
      this.inputsHaveTextAll = this.formMain.querySelectorAll('.form-control');
      Array.prototype.slice.call(this.inputsHaveTextAll).forEach(function (el) {
        if (el.id === 'city') {
          return;
        }; // Have not any special validation for city.
        el.addEventListener('keyup', _this.checkInputs.bind(_this));
        el.addEventListener('blur', _this.checkInputs.bind(_this));
        el.addEventListener('change', _this.checkInputs.bind(_this));
      });

      this.button = this.formMain.querySelector('[type="submit"]');
      this.button.addEventListener('click', this.clickButton.bind(this));

      this.checkBox = this.formMain.querySelector('[type="checkbox"]');
      this.checkBoxMessage = this.formMain.querySelector('.button-msg');
      this.checkBox.addEventListener('click', this.clickCheckBox.bind(this));

      this.inputsHaveTextRequire = findRequireInputs(this.inputsHaveTextAll, this.inputsHaveTextRequire);

      this.alertMessagesAmount = document.querySelectorAll('.alert.alert-danger[hidden]').length;
      this.isSubmitMail;
      this.isSubmitPas;
    }

    _createClass(FormValidation, [{
      key: 'checkInputs',
      value: function checkInputs(e) {
        this.checkBoxMessage.hidden = true;
        if (e.target.id === 'email') {
          this.handlerEmail(e);
        } else if (e.target.id === 'password') {
          this.handlerPas(e);
        } else if (e.target.id === 'phone') {
          this.handlerPhone(e);
        }
      }
    }, {
      key: 'clickButton',
      value: function clickButton(e) {
        // debugger
        var alertMessages = document.querySelectorAll('.alert.alert-danger[hidden]');
        if (this.isSubmitMail === false || this.isSubmitPas === false) {
          e.preventDefault();
          this.checkBoxMessage.textContent = 'You didn\'t validate all require * fields';
          this.checkBoxMessage.hidden = false;
        } else if (alertMessages.length !== this.alertMessagesAmount) {
          e.preventDefault();
          this.checkBoxMessage.textContent = 'You didn\'t validate all fields';
          this.checkBoxMessage.hidden = false;
        } else if (!this.checkBox.checked) {
          e.preventDefault();
          this.checkBoxMessage.textContent = 'You didn\'t allow with ALL';
          this.checkBoxMessage.hidden = false;
        } else {
          alert('Congratulations!!! You have got validated this form');
        }
      }
    }, {
      key: 'clickCheckBox',
      value: function clickCheckBox(e) {
        if (e.target.checked) {
          this.checkBoxMessage.hidden = true;
        }
      }
    }, {
      key: 'handlerEmail',
      value: function handlerEmail(e) {
        var emailCorrect = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        var message = e.target.parentNode.querySelector('.alert.alert-danger');
        message.hidden = false;
        e.target.parentNode.classList.add('has-error');

        this.isSubmitMail = false;
        if (e.target.value.length === 0) {
          this.hasNoError(e, message);
          return;
        } else if (/\s/.test(e.target.value)) {
          message.textContent = 'E-mail have not to have spaces';
          return;
        } else if (!/^\S+@/.test(e.target.value)) {
          message.textContent = 'Email have to have symbol @';
          return;
        } else if (emailCorrect.test(e.target.value)) {
          for (var i = 0; i < usedEmails.length; i += 1) {
            if (usedEmails[i] === e.target.value) {
              message.textContent = 'Current e-mail have already taken';
              break;
            } else if (i === usedEmails.length - 1) {
              this.isSubmitMail = true;
              this.hasNoError(e, message);
            }
          }
        } else {
          message.textContent = 'Current e-mail does not exist';
          return;
        }
      }
    }, {
      key: 'handlerPas',
      value: function handlerPas(e) {
        var pasCorrect = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        var message = e.target.parentNode.querySelector('.alert.alert-danger');
        message.hidden = false;
        e.target.parentNode.classList.add('has-error');

        this.isSubmitPas = false;
        if (e.target.value.length === 0) {
          this.hasNoError(e, message);
          return;
        } else if (!/[0-9a-zA-Z]/.test(e.target.value)) {
          message.textContent = 'Password should have latin letters and numbers only';
          return;
        } else if (!/(?=[a-zA-Z]+[0-9]+)|(?=[0-9]+[a-zA-Z]+)/.test(e.target.value)) {
          message.textContent = 'Password should have no less than one letter and one number';
          return;
        } else if (pasCorrect.test(e.target.value)) {
          this.hasNoError(e, message);
          this.isSubmitPas = true;
        } else {
          message.textContent = 'Password should have no less than five symbols';
          return;
        }
      }
    }, {
      key: 'handlerCity',
      value: function handlerCity(e) {
        // Have not any special validation for city.
      }
    }, {
      key: 'handlerPhone',
      value: function handlerPhone(e) {
        var phoneCorrect = /^\+[\d\(\)\ -]{9,18}\d$/;
        var message = e.target.parentNode.querySelector('.alert.alert-danger');
        message.hidden = false;
        e.target.parentNode.classList.add('has-error');

        var realNumber = e.target.value.replace(/[\s\+\(\)-]/g, '');
        if (e.target.value.length === 0) {
          this.hasNoError(e, message);
          return;
        } else if (e.target.value[0] !== '+') {
          message.textContent = 'Phone number should has by international format starts by +X';
          return;
        } else if (/[^\d\+\(\)\ -]/.test(e.target.value)) {
          message.textContent = 'Phone number should has only numbers or symbols +, - or barackets';
          return;
        } else if (realNumber.length < 11) {
          message.textContent = 'Number is too short';
          return;
        } else if (phoneCorrect.test(e.target.value)) {
          this.hasNoError(e, message);
        } else {
          message.textContent = 'Number is too long';
        }
      }
    }, {
      key: 'hasNoError',
      value: function hasNoError(e, messageElement) {
        e.target.parentNode.classList.remove('has-error');
        messageElement.hidden = true;
      }
    }]);

    return FormValidation;
  }();

  window.FormValidation = FormValidation;
  // 
  var scrollToPos = function scrollToPos(scrollTo, clickTarget, durat) {
    if ((typeof scrollTo === 'undefined' ? 'undefined' : _typeof(scrollTo)) === 'object') {
      scrollTo = $(scrollTo).offset().top;
    }
    $(clickTarget).click(function () {
      $("html, body").animate({
        scrollTop: scrollTo
      }, durat);
    });
  };
  window.scrollToPos = scrollToPos;
  // 
  var hideElement = function hideElement(elToHide, elWhenHide) {
    var isElemInView = function isElemInView() {
      var hideMoment = elWhenHide.getBoundingClientRect().top;
      if ($(window).height() - hideMoment > 1) {
        elToHide.style.display = 'none';
        $(window).off('resize scroll', isElemInView);
        return;
      }
      elToHide.style.display = 'inline';
    };
    isElemInView();
    $(window).on('resize scroll', isElemInView);
  };
  window.hideElement = hideElement;
})();
$(function () {
  var buttonFixed = document.querySelector('.go-validate');
  new FormValidation();
  hideElement(buttonFixed, document.querySelector('.form-user'));
  scrollToPos(document.querySelector('.jumbotron'), buttonFixed, 600);
});