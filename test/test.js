var should = require('should');
var chai = require('chai');
var sigfig = require(__dirname + '/../stock');

describe('sigfig', function() {
  describe('isRecent', function() {
    it('should return true if input date is not older than x days', function(done) {
      var threeDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3);
      sigfig.isRecent(threeDaysAgo, 7).should.equal(true);
      done();
    });
    it('should return false if input date is older than x days', function(done) {
      var twentyDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 20);
      sigfig.isRecent(twentyDaysAgo, 7).should.equal(false);
      done();
    });
  });
  
  describe('stringify', function() {
    it('should stringify a list of transaction alert in correct format', function(done) {
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var data = sigfig.processTransactions(transactions);
      var stringifyData = sigfig.stringify(data);
      stringifyData.length.should.equal(0);
      
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var data = sigfig.processTransactions(transactions);
      var stringifyData = sigfig.stringify(data);
      stringifyData[0].should.equal('2,SELL,YHOO');
      
      transactions = [
        "2014-11-20,BUY,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var data = sigfig.processTransactions(transactions);
      var stringifyData = sigfig.stringify(data);
      stringifyData[0].should.equal('2,BUY,YHOO');
      
      done();
    });
  });
  
  describe('net count', function() {
    it('should calculate net count correctly', function(done) {
      
      var transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(-2);
      
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(0);
      
      transactions = [
        "2014-11-20,BUY,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(2);      
      
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(-2);        
      
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,BUY,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(1);
      
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(-1);  
      
      transactions = [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,YHOO",
        "2014-11-17,BUY,YHOO",
      ];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result[0].count.should.equal(-1);        
      
      transactions = [];
      transactions = transactions.map(sigfig.parseTransaction);
      var result = sigfig.processTransactions(transactions);
      result.length.should.equal(0);
      
      done();
    });
  });
});