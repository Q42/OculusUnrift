

var storyboard = [
  sceneBoot,
  sceneCursor,
  sceneMumboJumbo,
  scenePrinting
];


var _director = function () {
  this.running = false;
  this.currentSceneIndex = 0;

};

_director.prototype.playCurrentScene = function () {
  var self = this;
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

_director.prototype.sceneCallBack = function () {
  if (!this.running) return;
  this.currentSceneIndex++;
  if (this.currentSceneIndex >= storyboard.length) {
    this.currentSceneIndex = 0;
    this.running = false;
    return;
  }
  this.playCurrentScene();
};

_director.prototype.start = function() {
  if (this.running) return;
  this.running = true;
  this.playCurrentScene();
};

_director.prototype.stop = function() {
  this.running = false;
};


var director = new _director();



