var sigfig = {};

sigfig.getFriendsListForUser = function(id) {
  return ["a", "b", "c" ,"z"];
};

sigfig.getTradeTransactionsForUser = function(id) {
  switch (id) {
    case "z": 
      return ["2014-11-20,SELL,YHOO"]
    case "a":
      return [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,AAPL",
        "2014-11-15,BUY,EBAY",
        "2014-11-15,BUY,XOM",
        "2014-11-01,BUY,GOOG"
      ]
    case "b":
      return [
        "2014-11-20,SELL,YHOO",
        "2014-11-17,SELL,AAPL",
        "2014-11-15,BUY,EBAY",
        "2014-11-15,SELL,XOM",
        "2014-11-01,BUY,GOOG"
      ]
    case "c":
      return [
        "2014-11-20,BUY,FB",
        "2014-11-20,BUY,YHOO",
        "2014-11-17,BUY,AAPL",
        "2014-11-15,BUY,EBAY",
        "2014-11-01,BUY,GOOG"
      ]
  }
  return 
};

sigfig.isRecent = function(date, days) {
  var now = Date.now();
  var weekAgo = now - 1000 * 60 * 60 * 24 * days;
  return date.getTime() > weekAgo;
};

sigfig.parseTransaction = function(str)  {
  var parts = str.split(',');
  var date = new Date(parts[0]);
  var action = parts[1].toLowerCase();
  var symbol = parts[2].toLowerCase();
  var isBuy = action === 'buy';
  return {date: date, action: action, symbol: symbol, isBuy: isBuy};
};

sigfig.sort = function(m) {
  m = m.sort(function(a,b) {
    return a.count > b.count ? -1: 1;
  });
  return m;
};

sigfig.stringify = function(list) {
  var ret = [];
  list.forEach(function(s) {
    var symbol = s.symbol;
    var count = s.count;
    var action = count > 0 ? 'BUY' : 'SELL';
    if (count == 0) return '';
    ret.push(Math.abs(count) + ',' + action + ','  + symbol.toUpperCase());
  });
  return ret;
};

sigfig.getFriendsTransactions = function(id) {
  var transactions = [];
  sigfig.getFriendsListForUser(id).forEach(function(friendId) {
    transactions = transactions.concat(sigfig.getTradeTransactionsForUser(friendId));
  });
  return transactions;
}

sigfig.getFriendsAlerts = function(id) {
  var transactions = sigfig.getFriendsTransactions(id).map(sigfig.parseTransaction);
  return sigfig.processTransactions(transactions);
};

sigfig.processTransactions = function(transactions) {
  var hash = {};
  var queue = [];
  transactions.forEach(function(transaction) {
    if (sigfig.isRecent(transaction.date, 7)) {
      var queueIndex = hash[transaction.symbol]
      if (queueIndex === undefined) {
        queue.push({count: transaction.isBuy ? 1 : -1, symbol: transaction.symbol});
        hash[transaction.symbol] = queue.length - 1;
      } else {
        queue[queueIndex].count = transaction.isBuy ? ++(queue[queueIndex].count) : --(queue[queueIndex].count);
      }
    }
  });
  queue = sigfig.sort(queue);
  return queue;
};

sigfig.main = function(id) {
  var data = sigfig.getFriendsAlerts(id);
  var str = sigfig.stringify(data);
  return str;
}

module.exports = sigfig;

console.log(sigfig.main("me"));