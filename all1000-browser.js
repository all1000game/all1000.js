// all1000-browser.js http://all1000.com/

All1000.prototype.displayScreen = function () {
  document.getElementById("screen").innerHTML = all1000.getDisplayText();
};

All1000.prototype.displayInput = function () {
  document.getElementById("input").innerHTML = this.inputNow + "\n" + this.inputQueue;
};

var all1000 = new All1000();

document.write('<pre id="screen"></pre>');
document.write('<pre id="input"></pre>');

document.body.onkeypress = function (e) {
  all1000.inputKey(String.fromCharCode(e.charCode));
  all1000.displayInput();
};
document.body.onkeydown = function (e) {
  if (e.keyCode == 8 || e.keyCode == 46) { // backspace || delete
    all1000.deleteInput();
    all1000.displayInput();
  }
};

window.setInterval(function () {
  all1000.next();
  all1000.displayScreen();
  all1000.displayInput();
}, 500);

all1000.displayScreen();


