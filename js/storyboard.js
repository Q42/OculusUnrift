

var storyboard = [
  sceneBoot,
  sceneCursor,
  sceneMumboJumbo,
  scenePrinting,
  sceneDashboard
];


var director = new (function () {
  var self = this;

  self.running = false;
  self.currentSceneIndex = 0;
  self.replay = false;

  self.playCurrentScene = function () {
    var scene = storyboard[self.currentSceneIndex];
    var postSceneDelay = 0;
    if (typeof scene === "object") {
      postSceneDelay = scene[1];
      scene = scene[0];
    }

    scene(function () {
      if (postSceneDelay) {
        setTimeout(function () { self.sceneCallBack(); }, postSceneDelay);
      }
      self.sceneCallBack();
    });

  };

  self.sceneCallBack = function () {
    if (!self.running) return;
    if (!self.replay) self.currentSceneIndex++;
    if (self.currentSceneIndex >= storyboard.length) {
      self.currentSceneIndex = 0;
      self.running = false;
      return;
    }
    self.playCurrentScene();
  };

  self.start = function() {
    if (self.running) return;
    self.running = true;
    self.playCurrentScene();
  };

  self.stop = function() {
    self.running = false;
  };

  self.replayToggle = function () {
    self.replay = !self.replay;
  }

  self.setScene = function (scene) {
     self.currentSceneIndex = scene % storyboard.length;
  }

})();



