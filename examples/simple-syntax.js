var killingCommand = 'avada kedavra';

// matches "av" substring
var reg = /av/;

// matches any substring, that has 4 characters and starts with "ked". ("keda", "ked0", "kedd", "kedu" and so on)
var aSmth = /ked./;

// matches "female" and "male" substrings
var sex = /(fe)?male/;
console.log(sex.test('He is male')); // true

// matches any string, that starts with digit
var anyDigitFirst = /^\d/;

// matches "female" and "male" strings
var sexReg = /^(fe)?male$/
console.log(sexReg.test('male')); // true
console.log(sexReg.test('female')); // true
console.log(sexReg.test('He is male')); // false
