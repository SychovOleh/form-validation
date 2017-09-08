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
var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];


(function() {
  let findRequireInputs = (collectionInside, collectionOutside) => {
    collectionOutside = [];
    Array.prototype.slice.call(collectionInside).forEach((el, i) => {
      if (el.parentNode.classList.contains('required')) {
        collectionOutside.push(el);
      }
    })
    return collectionOutside;
  }

  class FormValidation {
    constructor() {
      this.formMain = document.body.querySelector('[role="form"]');
      this.inputsHaveTextAll = this.formMain.querySelectorAll('.form-control');
      Array.prototype.slice.call(this.inputsHaveTextAll).forEach((el) => {
        if (el.id === 'city') { return }; // Have not any special validation for city.
        el.addEventListener('keyup', this.checkInputs.bind(this));
        el.addEventListener('blur', this.checkInputs.bind(this));
        el.addEventListener('change', this.checkInputs.bind(this));
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

    checkInputs(e) {
      this.checkBoxMessage.hidden = true;
      if (e.target.id === 'email') {
        this.handlerEmail(e)
      } else if (e.target.id === 'password') {
        this.handlerPas(e)
      } else if (e.target.id === 'phone') {
        this.handlerPhone(e)
      }
    }
    clickButton(e) {
      // debugger
      let alertMessages = document.querySelectorAll('.alert.alert-danger[hidden]')
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
        alert('Congratulations!!! You have got validated this form')
      }
    }

    clickCheckBox(e) {
      if (e.target.checked) {
        this.checkBoxMessage.hidden = true;
      }
    }

    handlerEmail(e) {
      let emailCorrect = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let message = e.target.parentNode.querySelector('.alert.alert-danger');
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
      } else
      if (emailCorrect.test(e.target.value)) {
        for (let i = 0; i < usedEmails.length; i += 1) {
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
    handlerPas(e) {
      let pasCorrect = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
      let message = e.target.parentNode.querySelector('.alert.alert-danger');
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
        this.hasNoError(e, message)
        this.isSubmitPas = true;
      } else {
        message.textContent = 'Password should have no less than five symbols';
        return;
      }
    }
    handlerCity(e) {
      // Have not any special validation for city.
    }
    handlerPhone(e) {
      let phoneCorrect = /^\+[\d\(\)\ -]{9,18}\d$/;
      let message = e.target.parentNode.querySelector('.alert.alert-danger');
      message.hidden = false;
      e.target.parentNode.classList.add('has-error');

      let realNumber = e.target.value.replace(/[\s\+\(\)-]/g, '');
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

    hasNoError(e, messageElement) {
      e.target.parentNode.classList.remove('has-error');
      messageElement.hidden = true;
    }
  }
  window.FormValidation = FormValidation;
  // 
  // const scrollToPos = (scrollTo, clickTarget, durat) => {
  //   if (typeof scrollTo === 'object') {
  //     scrollTo = $(scrollTo).offset().top;
  //   }
  //   $(clickTarget).click(function() {
  //     $("html, body").animate({
  //       scrollTop: scrollTo
  //     }, durat)
  //   })
  // }
  // window.scrollToPos = scrollToPos;
  // // 
  // const hideElement = (elToHide, elWhenHide) => {
  //   const isElemInView = () => {
  //     let hideMoment = elWhenHide.getBoundingClientRect().top
  //     if (($(window).height() - hideMoment) > 1) {
  //       elToHide.style.display = 'none';
  //       $(window).off('resize scroll', isElemInView)
  //       return;
  //     }
  //     elToHide.style.display = 'inline';
  //   }
  //   isElemInView()
  //   $(window).on('resize scroll', isElemInView)
  // }
  // window.hideElement = hideElement;
})();
$(function() {
  // let buttonFixed = document.querySelector('.go-validate');
  new FormValidation();
  // hideElement(buttonFixed, document.querySelector('.form-user'))
  // scrollToPos(document.querySelector('.jumbotron'), buttonFixed, 600);
})