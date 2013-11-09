

var Cursor = function (x,y,fontSizeInPixels, widthInChars, heightInLines, charDelay) {
  var self = this;
  self.x = x;
  self.y = y;
  self.currentIndex = 0;
  self.charDelay = charDelay || 50;
  self.text = "";

  function _outputText(text) {
    // Clear the canvas
    hud.clearRect(x, y, widthInChars*fontSizeInPixels * 0.7, heightInLines*fontSizeInPixels);
    hud.fillStyle = '#ffffff';
    hud.textAlign = 'left';
    hud.textBaseline = 'top';
    hud.font = fontSizeInPixels + 'px "visitor_tt1_brkregular" normal';
    text = text.split("\n");
    text = text.slice(Math.max(text.length - heightInLines, 0));

    $.each(text, function (i,v) {
      hud.fillText(v.substr(0,widthInChars), x + 2, y + i * fontSizeInPixels);
    });

  }

  self.drawNextChar = function () {
    if (self.currentIndex >= self.text.length) return;

    self.currentIndex ++;
    var curText = self.text.substr(0, self.currentIndex);
    _outputText(curText);
    if (self.currentIndex < self.text.length) {
      setTimeout(function () {
         self.drawNextChar();
      }, self.charDelay);
    }
  };

  self.appendLine = function (line) {
    if (self.text)
      self.text += "\n" + line;
    else
      self.text = line;

    self.drawNextChar();
  };

  self.setText = function (text) {
    self.text = text;
    self.currentIndex =0;
    self.drawNextChar();
  }
};

