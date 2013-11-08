var streams = [];
var camera;
addEventListener('DOMContentLoaded',function() {
	var streaming = false,
			width = 320,
			height = 0;

	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	camera = new Camera();

	MediaStreamTrack.getSources(function(l){
		var vids = [];
		for(var i=0;i<l.length;i++)
			if(l[i].kind=='video') vids.push(l[i].id);
		streams.push(new vidStream(1,vids));
		streams.push(new vidStream(2,vids));
		//autoselect first videoinput for right screen
		//streams[0].start(document.getElementsByTagName('select')[0][1].value);
		//streams[1].start(document.getElementsByTagName('select')[0][1].value);
	});

	var raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
	(function drawFrame(){
		camera.draw();
		raf(drawFrame);
	})();


});

function vidStream(num,ids) {
	var me = this;
	var video = document.querySelector('#vid'+num);

  var currentID = -1;

  me.toggleSource = function () {
     currentID++;
    currentID %= ids.length;
    localStorage.setItem("vid_channel_" + num, currentID);
    me.start(ids[currentID]);

  };

	me.start = function(id){
		navigator.getMedia({
			video: {optional: [{sourceId: id}]},
			audio: false
		},function(stream) {
			video.addEventListener('canplaythrough',function(){
				camera.addStream(video,num);
				video.play();
			});
			if(navigator.mozGetUserMedia) video.mozSrcObject = stream;
			else video.src = (window.URL || window.webkitURL).createObjectURL(stream);
		},function(err) {
			console.log("An error occured! " + err);
		});
	};

  var i =  localStorage.getItem("vid_channel_" + num);
  if (i === null) i=0;
  currentID = i;
  me.start(i);
}
