var assert = require('assert');

describe('loading birthday', function() {
  var birthday;
  var today;
  var birthdayBefore;
  var birthdayAfter;
  beforeEach(function() {
    birthday = require('./birthday');
    today = new Date();
    birthdayBefore = today.setDate(today.getDate() - 5);
    birthdayAfter = today.setDate(today.getDate() + 5);
  });
  it('responds to Birthday before Today\'s date', function birthdayBeforeNow() {
    // Todo: correct the test
    assert.equal(birthday(birthdayBefore), 0);
  });
  it('responds to Birthday after Today\'s date', function birthdayBeforeNow() {
    // Todo: correct the test
    assert.equal(birthday(birthdayAfter), 0);
  });
});
