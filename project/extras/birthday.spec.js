var assert = require('assert');

describe('loading birthday', function() {
  var birthday;
  var today;
  var birthdayBefore;
  var birthdayAfter;
  beforeEach(function() {
    birthday = require('./birthday');
    today = new Date();
  });
  it('responds to Birthday being almost the next age', function birthdayBeforeNow() {
    birthdayBefore = new Date(today.setMonth(today.getMonth() - 23));
    assert.equal(birthday(birthdayBefore), 1);
  });
  it('responds to Birthday being exact age', function birthdayBeforeNow() {
    birthdayAfter = new Date(today.setMonth(today.getMonth() - 12));
    assert.equal(birthday(birthdayAfter), 1);
  });
});
