// all1000.js http://all1000.com/

var All1000 = function () {
  this.turn = 0;
  this.inputNow = "";
  this.inputQueue = "";
  this.techTree = {
    "a" : { "cost": {                }, "count": 10, "amount": 1000000, "auto": { "count": 0, cost: { "a" :10 } }, "time":  1 },
    "b" : { "cost": { "a": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "b" :10 } }, "time":  2 },
    "c" : { "cost": { "a": 1, "b": 1 }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "c" :10 } }, "time":  3 },
    "d" : { "cost": { "c": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "d" :10 } }, "time":  4 },
    "e" : { "cost": { "d": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "e" :10 } }, "time":  5 },
    "f" : { "cost": { "e": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "f" :10 } }, "time":  6 },
    "g" : { "cost": { "f": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "g" :10 } }, "time":  7 },
    "h" : { "cost": { "g": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "h" :10 } }, "time":  8 },
    "i" : { "cost": { "h": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "i" :10 } }, "time":  9 },
    "j" : { "cost": { "i": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "j" :10 } }, "time": 10 },
    "k" : { "cost": { "j": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "k" :10 } }, "time": 11 },
    "l" : { "cost": { "k": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "l" :10 } }, "time": 12 },
    "m" : { "cost": { "l": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "m" :10 } }, "time": 13 },
    "n" : { "cost": { "m": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "n" :10 } }, "time": 14 },
    "o" : { "cost": { "n": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "o" :10 } }, "time": 15 },
    "p" : { "cost": { "o": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "p" :10 } }, "time": 16 },
    "q" : { "cost": { "p": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "q" :10 } }, "time": 17 },
    "r" : { "cost": { "q": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "r" :10 } }, "time": 18 },
    "s" : { "cost": { "r": 1         }, "count": 10, "amount":   -1, "auto": { "count": 0, cost: { "s" :10 } }, "time": 19 },
    "t" : { "cost": { "s": 1         }, "count": 10000000000000, "amount":   -1, "auto": { "count": 0, cost: { "t" :10 } }, "time": 61 },
    "u" : { "cost": { "t": 1         }, "count": 1000000000000, "amount":   -1, "auto": { "count": 0, cost: { "u" :10 } }, "time": 100 },
    "v" : { "cost": { "u": 1         }, "count": 100000000000, "amount":   -1, "auto": { "count": 0, cost: { "v" :10 } }, "time": 601 },
    "w" : { "cost": { "v": 1         }, "count": 10000000000, "amount":   -1, "auto": { "count": 0, cost: { "w" :10 } }, "time": 600 },
    "x" : { "cost": { "w": 1         }, "count": 1000000000, "amount":   -1, "auto": { "count": 0, cost: { "x" :10 } }, "time": 24 },
    "y" : { "cost": { "x": 1         }, "count": 100000000, "amount":   -1, "auto": { "count": 0, cost: { "y" :10 } }, "time": 25 },
    "z" : { "cost": { "y": 1         }, "count": 1000000, "amount":   -1, "auto": { "count": 0, cost: { "z" :10 } }, "time": 26 }
  };
  this.techTree = this.createTechTree();

  this.history = "";
  this._updateCostString();
};

All1000.VERSION = "0.0.1";

// the initial seed
All1000.seed = 6;
 
// in order to work 'All1000.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
// http://indiegamr.com/generate-repeatable-random-numbers-in-js/
All1000.seededRandom = function(max, min) {
  max = max || 1;
  min = min || 0;

  All1000.seed = (All1000.seed * 9301 + 49297) % 233280;
  var rnd = All1000.seed / 233280;

  return min + rnd * (max - min);
}

All1000.prototype.createTechTree = function () {
  var tech_tree = {};
  var amount = 1000000000;
  All1000.DISP_ORDER.forEach(function (key, order) {
    var cost = {};
    var cost_depends = All1000.DISP_ORDER[Math.floor(All1000.seededRandom(order, 0))];
    if (cost_depends != key) {
      cost[cost_depends] = Math.floor(All1000.seededRandom((1 + order) * 1, 0)) + 1;
      amount = -1;
    }
    var time = Math.floor(All1000.seededRandom((1 + order) * 1, 0)) + 1;

    var auto_cost = {};
    cost_depends = All1000.DISP_ORDER[Math.floor(All1000.seededRandom(1 + order, 0))];
    auto_cost[cost_depends] = ( Math.floor(All1000.seededRandom((1 + order) * 1, 0)) + 1) * 10;

    tech_tree[key] = {
      "cost": cost,
      "count": 0,
      "amount": amount,
      "auto": {
        "count": 0,
        "cost": auto_cost
      },
      "time": time
    };
  });
  return tech_tree;
};


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
      }
      this.history += key;
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
    }
  }
};



All1000.prototype._resolveAuto = function () {
  var tech_tree = this.techTree;
  All1000.DISP_ORDER.forEach(function (key) {
    var tech_tree_key = tech_tree[key];
    if (tech_tree_key.autoNow) {
      --tech_tree_key.autoNow.time;
      if (tech_tree_key.autoNow.time == 0) {
        tech_tree_key.count += tech_tree_key.autoNow.count;
        tech_tree_key.autoNow = "";
      }
    }
    if (!tech_tree_key.autoNow && tech_tree_key.auto.count > 0) {
      var cost_ok = 0;
      for (var i = 0; i < tech_tree_key.auto.count; ++i) {
        if (this.getQueueFromKey(key)) {
          ++cost_ok;
        } else {
          break;
        }
      }
      if (cost_ok > 0) {
        tech_tree_key.autoNow = {
          time: tech_tree_key.time,
          count: cost_ok
        };
      }
    }
  }, this);
};

All1000.prototype._updateTechTreeAvailable = function () {
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

All1000.prototype._updateCostString = function () {
  var tech_tree = this.techTree;
  var max_cost_length = 0;
  All1000.DISP_ORDER.forEach(function (key) {
    var tech_tree_key = tech_tree[key];
    max_cost_length = Math.max(max_cost_length, All1000.cost2string(tech_tree_key.cost).length);
    max_cost_length = Math.max(max_cost_length, All1000.cost2string(tech_tree_key.auto.cost).length);
  });

  All1000.DISP_ORDER.forEach(function (key) {
    var tech_tree_key = tech_tree[key];
    tech_tree_key.costString = All1000.cost2string(tech_tree_key.cost, max_cost_length);
    tech_tree_key.auto.costString = All1000.cost2string(tech_tree_key.auto.cost, max_cost_length);
  });
};

All1000.IS_CREATE = /^[a-z]$/;
All1000.IS_AUTOMATE = /^[A-Z]$/;
All1000.IS_END = "!";
All1000.IS_AUTOMATE_STOP = "<";
All1000.IS_AUTOMATE_START = ">";
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
    //  これキューに入れなくてよくね？＞面倒なので
    this.checkAll1000();

  // < > でオートメートのストップスタートできるようにする ☞ 途中が資源不足に陥った場合に復旧不可能になるため
  } else if (All1000.IS_AUTOMATE_STOP == input_str) {
    
  } else if (All1000.IS_AUTOMATE_START == input_str) {
    
  }
};

All1000.prototype.getQueueFromKey = function (key) {
  this._updateTechTreeAvailable();
  // a-z
  if (All1000.IS_CREATE.exec(key)) {
    var tech_tree_key = this.techTree[key];
    return tech_tree_key.available == 0 ? "" : this.getQueueFromResources(key, tech_tree_key.cost);

  // A-Z
  } else if (All1000.IS_AUTOMATE.exec(key)) {
    var tech_tree_key = this.techTree[key.toLowerCase()];
    return tech_tree_key.auto.available == 0 ? "" : this.getQueueFromResources(key, tech_tree_key.auto.cost);
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
      // TODO /////////////////////////////////////////////////
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
      return " " + min + "m0" + sec + "s";
    } else {
      return " " + min + "m" + sec + "s";
    }
  } else if (time < 3600) {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    if (sec < 10) {
      return min + "m0" + sec + "s";
    } else {
      return min + "m" + sec + "s";
    }
  }
  return time;
};

All1000.number2string = function (number) {
  if (number < 10) {
    return "   " + number;
  } else if (number < 100) {
    return "  " + number;
  } else if (number < 1000) {
    return " " + number;
  } else if (number < 10000) {
    return number;
  } else if (number < 100000) {
    return " " + Math.floor(number / 1000) + "K";
  } else if (number < 1000000) {
    return Math.floor(number / 1000) + "K";
  } else if (number < 10000000) {
    return String(Math.floor(number / 100000)).replace(/(\d)/, "$1.") + "M";
  } else if (number < 100000000) {
    return " " + Math.floor(number / 1000000) + "M";
  } else if (number < 1000000000) {
    return Math.floor(number / 1000000) + "M";
  } else if (number < 10000000000) {
    return String(Math.floor(number / 100000000)).replace(/(\d)/, "$1.") + "G";
  } else if (number < 100000000000) {
    return " " + Math.floor(number / 1000000000) + "G";
  } else if (number < 1000000000000) {
    return Math.floor(number / 1000000000) + "G";
  } else if (number < 10000000000000) {
    return String(Math.floor(number / 100000000000)).replace(/(\d)/, "$1.") + "T";
  } else if (number < 100000000000000) {
    return " " + Math.floor(number / 1000000000000) + "T";
  } else if (number < 1000000000000000) {
    return Math.floor(number / 1000000000000) + "T";
  } else if (number < 10000000000000000) {
    return String(Math.floor(number / 100000000000000)).replace(/(\d)/, "$1.") + "P";
  } else if (number < 100000000000000000) {
    return " " + Math.floor(number / 1000000000000000) + "P";
  }
  return Math.floor(number / 1000000000000000) + "P";
};

All1000.cost2string = function (cost, max) {
  var str = JSON.stringify(cost).replace(/"/g, "");
  for (var i = str.length; i < max; ++i) {
    str += " ";
  }
  return str;
};

All1000.prototype.getDisplayText = function () {
  this._updateTechTreeAvailable();
  var result = "";
  var tech_tree = this.techTree;
  All1000.DISP_ORDER.forEach(function (key, order) {
    var tech_tree_key = tech_tree[key];
    result += key + " " + All1000.number2string(tech_tree_key.count)
      + "(" + All1000.number2string(tech_tree_key.available) + ")"
      + All1000.time2string(tech_tree_key.time) + tech_tree_key.costString
      + "|"
      + key.toUpperCase() + " " + All1000.number2string(tech_tree_key.auto.count)
      + "(" + All1000.number2string(tech_tree_key.auto.available) + ")"
      + All1000.time2string(tech_tree_key.autoNow ? tech_tree_key.autoNow.time : tech_tree_key.time) + tech_tree_key.auto.costString + "|";
    if (order < 10) {
      result += order + " " + All1000.number2string(tech_tree_key.count) +  "(" + All1000.number2string(tech_tree_key.available) + ")"
      + All1000.time2string(tech_tree_key.time) + tech_tree_key.costString + "|";
    }
    result += "\n";
  });
  return result;
};

// for node.js, not for CommonJS
if (typeof module === "object" && module) {
  module.exports = All1000;
}
