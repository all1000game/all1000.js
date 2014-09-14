// all1000.js http://all1000.com/

var All1000 = function () {
  this.turn = 0;
  this.inputNow = "";
  this.inputQueue = "";
  this.techTree = {
    "a" : { "cost": {                }, "count": 0, "amount": 1000, "auto": { "count": 0, cost: { "a" :10 } }, "time":  1 },
    "b" : { "cost": { "a": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "b" :10 } }, "time":  2 },
    "c" : { "cost": { "a": 1, "b": 1 }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "c" :10 } }, "time":  3 },
    "d" : { "cost": { "c": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "d" :10 } }, "time":  4 },
    "e" : { "cost": { "d": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "e" :10 } }, "time":  5 },
    "f" : { "cost": { "e": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "f" :10 } }, "time":  6 },
    "g" : { "cost": { "f": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "g" :10 } }, "time":  7 },
    "h" : { "cost": { "g": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "h" :10 } }, "time":  8 },
    "i" : { "cost": { "h": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "i" :10 } }, "time":  9 },
    "j" : { "cost": { "i": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "j" :10 } }, "time": 10 },
    "k" : { "cost": { "j": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "k" :10 } }, "time": 11 },
    "l" : { "cost": { "k": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "l" :10 } }, "time": 12 },
    "m" : { "cost": { "l": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "m" :10 } }, "time": 13 },
    "n" : { "cost": { "m": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "n" :10 } }, "time": 14 },
    "o" : { "cost": { "n": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "o" :10 } }, "time": 15 },
    "p" : { "cost": { "o": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "p" :10 } }, "time": 16 },
    "q" : { "cost": { "p": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "q" :10 } }, "time": 17 },
    "r" : { "cost": { "q": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "r" :10 } }, "time": 18 },
    "s" : { "cost": { "r": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "s" :10 } }, "time": 19 },
    "t" : { "cost": { "s": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "t" :10 } }, "time": 61 },
    "u" : { "cost": { "t": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "u" :10 } }, "time": 100 },
    "v" : { "cost": { "u": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "v" :10 } }, "time": 601 },
    "w" : { "cost": { "v": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "w" :10 } }, "time": 600 },
    "x" : { "cost": { "w": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "x" :10 } }, "time": 24 },
    "y" : { "cost": { "x": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "y" :10 } }, "time": 25 },
    "z" : { "cost": { "y": 1         }, "count": 0, "amount":   -1, "auto": { "count": 0, cost: { "z" :10 } }, "time": 26 }
  };

 this._availableChange = {};
 this._updateMaxCostLength();
};

All1000.VERSION = "0.0.1";

All1000.prototype.next = function () {
  ++this.turn;
  this._resolveInput();
  this._resolveAuto();
};

All1000.prototype._resolveInput = function () {
  if (this.inputNow) {
    --this.inputNow.time;
    if (this.inputNow.time == 0) {
      var key = this.inputNow.key;
      // a-z
      if (All1000.IS_CREATE.exec(key)) {
        ++this.techTree[key].count;

      // A-Z
      } else if (All1000.IS_AUTOMATE.exec(key)) {
        ++this.techTree[key.toLowerCase()].auto.count;

      // !
      } else if (All1000.IS_END.exec(key)) {
      // ああああああああああああああ

      }
      this.inputNow = "";
    }
  }
  if (!this.inputNow && this.inputQueue) {
    var key = this.inputQueue.charAt(0)
    // a-z
    if (All1000.IS_CREATE.exec(key)) {
      var tech_tree_key = this.techTree[key];
      this.inputNow = {
        key: key,
        time: tech_tree_key.time,
        toString: function () { return key + " " + All1000.time2string(this.time); }
      };
      this.inputQueue = this.inputQueue.substring(1);

    // A-Z
    } else if (All1000.IS_AUTOMATE.exec(key)) {;
      var tech_tree_key = this.techTree[key.toLowerCase()];
      this.inputNow = {
        key: key,
        time: tech_tree_key.time,
        toString: function () { return key + " " + All1000.time2string(this.time); }
      };
      this.inputQueue = this.inputQueue.substring(1);

    // !
    } else if (All1000.IS_END.exec(key)) {
            // ああああああああああああああ

      
    }
  }
};

All1000.prototype._resolveAuto = function () {

};

All1000.prototype.updateTechTreeAvailable = function () {
  var tech_tree = this.techTree;
  All1000.DISP_ORDER.forEach(function (key) {
    var tech_tree_key = tech_tree[key];
    if (tech_tree_key.amount == 0) {
      tech_tree_key.available = 0;
    } else {
      var cost = tech_tree_key.cost;
      var minimum = tech_tree_key.amount == -1 ? Number.MAX_VALUE : tech_tree_key.amount;
      for (var cost_key in cost) {
        if (tech_tree[cost_key].count < cost[cost_key]) {
          minimum = 0;
          break;
        } else {
          minimum = Math.min( minimum, Math.floor(tech_tree[cost_key].count / cost[cost_key]) );
        }
      }
      tech_tree_key.available = minimum;
    }

    var cost = tech_tree_key.auto.cost;
    var minimum = tech_tree_key.amount == -1 ? Number.MAX_VALUE : tech_tree_key.amount;
    for (var cost_key in cost) {
      if (tech_tree[cost_key].count < cost[cost_key]) {
        minimum = 0;
        break;
      } else {
        minimum = Math.min( minimum, Math.floor(tech_tree[cost_key].count / cost[cost_key]) );
      }
    }
    tech_tree_key.auto.available = minimum;
  });
};

All1000.prototype._updateMaxCostLength = function () {
  var tech_tree = this.techTree;
  this._maxCostLength = 0;
  All1000.DISP_ORDER.forEach(function (key) {
    var tech_tree_key = tech_tree[key];
    this._maxCostLength = Math.max(this._maxCostLength, JSON.stringify(tech_tree_key.cost).length);
    this._maxCostLength = Math.max(this._maxCostLength, JSON.stringify(tech_tree_key.auto.cost).length);
    
  }, this);
};

All1000.IS_CREATE = /^[a-z]$/;
All1000.IS_AUTOMATE = /^[A-Z]$/;
All1000.IS_END = "!";
All1000.prototype.inputKey = function (input_str) {
  var match;
  // a-z
  if (match = All1000.IS_CREATE.exec(input_str)) {
    var key = match[0];
    this.inputQueue += this.getQueueFromKey(key);

  // A-Z
  } else if (match = All1000.IS_AUTOMATE.exec(input_str)) {
    var key = match[0];
    this.inputQueue += this.getQueueFromKey(key);

  // !
  } else if (All1000.IS_END == input_str) {
    this.inputQueue += input_str;
  }
};

All1000.prototype.getQueueFromKey = function (key) {
  this.updateTechTreeAvailable();
  // a-z
  if (All1000.IS_CREATE.exec(key)) {
    var tech_tree_key = this.techTree[key];
    return tech_tree_key.available == 0 ? "" : this.getQueueFromResources(key, tech_tree_key.cost);

  // A-Z
  } else if (All1000.IS_AUTOMATE.exec(key)) {
    var tech_tree_key = this.techTree[key.toLowerCase()];
    return tech_tree_key.auto.available == 0 ? "" : this.getQueueFromResources(key, tech_tree_key.auto.cost);

  // !
  } else if (All1000.IS_END.exec(key)) {
          // ああああああああああああああ

    return "";
  }
};

All1000.prototype.getQueueFromResources = function (key, cost) {
  var tech_tree = this.techTree;
  var result = "";
  for (var cost_key in cost) {
    tech_tree[cost_key].count -= cost[cost_key];
  }
  if (All1000.IS_CREATE.exec(key) && tech_tree[key].amount != -1) {
    --tech_tree[key].amount;
  }
  return key;
};

All1000.prototype.deleteInput = function () {
  var key = null;
  if (this.inputQueue) {
    key = this.inputQueue.charAt(this.inputQueue.length - 1);
    this.inputQueue = this.inputQueue.slice(0, -1);

  } else if (this.inputNow) {
    key = this.inputNow.key;
    this.inputNow = "";
  }
  
  if (key) {
    var tech_tree = this.techTree;
    // a-z
    if (All1000.IS_CREATE.exec(key)) {
      var tech_tree_key = tech_tree[key];
      var cost = tech_tree_key.cost;
      for (var cost_key in cost) {
        tech_tree[cost_key].count += cost[cost_key];
      }
      if (tech_tree_key.amount != -1) {
        ++tech_tree[key].amount;
      }

    // A-Z
    } else if (All1000.IS_AUTOMATE.exec(key)) {
      var tech_tree_key = tech_tree[key.toLowerCase()];
      var cost = tech_tree_key.auto.cost;
      for (var cost_key in cost) {
        tech_tree[cost_key].count += cost[cost_key];
      }

    // !
    } else if (All1000.IS_END.exec(key)) {
      // ああああああああああああああ
    }
  }
};

All1000.DISP_ORDER = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

All1000.time2string = function (time) {
  if (time < 10) {
    return "    " + time + "s";
  } else if (time < 60) {
    return "   " + time + "s";
  } else if (time < 600) {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    if (sec < 10) {
      return " " + min + "m " + sec + "s";
    } else {
      return " " + min + "m" + sec + "s";
    }
  } else if (time < 3600) {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    if (sec < 10) {
      return min + "m " + sec + "s";
    } else {
      return min + "m" + sec + "s";
    }
  }
  return time;
};

All1000.number2string = function (number) {
  if (number < 10) {
    return "    " + number;
  } else if (number < 100) {
    return "   " + number;
  } else if (number < 1000) {
    return "  " + number;
  } else if (number < 10000) {
    return " " + number;
  } else if (number < 100000) {
    return number;
  } else if (number < 1000000) {
    return number;
  }
  return number;
};

All1000.cost2string = function (cost, max) {
  var str = JSON.stringify(cost);
  for (var i = str.length; i < max; ++i) {
    str += " ";
  }
  return str;
};

All1000.prototype.getDisplayText = function () {
  this.updateTechTreeAvailable();
  var result = "";
  var tech_tree = this.techTree;
  var max = this._maxCostLength;
  All1000.DISP_ORDER.forEach(function (key, order) {
    var tech_tree_key = tech_tree[key];
    result += key + " " + All1000.number2string(tech_tree_key.count) + "(" + All1000.number2string(tech_tree_key.available) + ")" + All1000.time2string(tech_tree_key.time) + All1000.cost2string(tech_tree_key.cost, max)
      + "|" + key.toUpperCase() + " " + All1000.number2string(tech_tree_key.auto.count) + "(" + All1000.number2string(tech_tree_key.auto.available) + ")" + All1000.time2string(tech_tree_key.time) + All1000.cost2string(tech_tree_key.auto.cost, max) + "\n";
  });
  return result;
};

// for node.js, not for CommonJS
if (typeof module === "object" && module) {
  module.exports = All1000;
}
