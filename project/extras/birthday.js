var birthdate = require('./birthdate').birthdate;

var myBirthday = new Date(birthdate);
var rightNow = new Date();
var age = rightNow.getFullYear() - myBirthday.getFullYear();
var monthAge = rightNow.getMonth() - myBirthday.getMonth();
if (monthAge < 0 || (rightNow.getDate() < myBirthday.getDate())) {
  age = age - 1;
}
module.exports = {
  age: age
};
