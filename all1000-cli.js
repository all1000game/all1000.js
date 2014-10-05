#!/usr/bin/env node

var blessed = require('blessed');
var screen = blessed.screen();
screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var seed = process.argv[2];

var All1000, all1000;
try {
  All1000 = require('./all1000');
  All1000.seed = seed || All1000.seed;
  all1000 = new All1000();
} catch (e) {
  console.error(e);
  process.exit(1);
}

var title_box = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: 2,
  content: 'status1\nstatus2',
});
var display_box = blessed.box({
  top: 2,
  left: 0,
  width: '100%',
  height: screen.height - 3,
  content: 'log1\nlog2\nlog3',
  tags: true
});
screen.append(title_box);
screen.append(display_box);

title_box.setContent('all1000 v' + All1000.VERSION + ' #' + All1000.seed  + '\na-z - set worker, A-Z - remove worker, 0-9 - research');
display_box.setContent(all1000.getDisplayText());

var displayScreen = function () {
  display_box.setContent(all1000.getDisplayText());
  screen.render();
};

var onkeypress = function(ch, key) {
  //all1000.inputKey(String.fromCharCode(e.charCode));
  displayScreen();
};
display_box.key('enter', onkeypress);
display_box.focus();

var timer = setInterval(function () {
  if (all1000.next()) {
    clearInterval(timer);
  }
  displayScreen();
}, 725);
displayScreen();
