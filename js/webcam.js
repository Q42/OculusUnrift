var streams = [];
addEventListener('DOMContentLoaded',function() {
	var streaming = false,
			width = 320,
			height = 0;

	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	MediaStreamTrack.getSources(function(l){
		var vids = [];
		for(var i=0;i<l.length;i++)
			if(l[i].kind=='video') vids.push(l[i].id);
		streams.push(new vidStream(1,vids));
		streams.push(new vidStream(2,vids));
		//autoselect first videoinput for right screen
		//streams[1].start(document.getElementsByTagName('select')[0][1].value);
	});

});

function vidStream(num,ids) {
	var me = this;
	var video = document.querySelector('#vid'+num);

	var _sel = document.createElement('select');
	document.body.appendChild(_sel);

	var _none = document.createElement('option');
	_none.text = 'select for '+num;
	_sel.appendChild(_none);

	for(var i=0;i<ids.length;i++) {
		var _opt = document.createElement('option');
		_opt.value = ids[i];
		_opt.text = i;
		_sel.appendChild(_opt);
	}

	_sel.addEventListener('change',function(){
		if(_sel.value) me.start(_sel.value);
	});

	this.start = function(id){
		navigator.getMedia({
			video: {optional: [{sourceId: id}]},
			audio: false
		},function(stream) {
			video.addEventListener('canplaythrough',function(){
				cameras.push(new Camera(num,video));
				video.play();
			});
			if(navigator.mozGetUserMedia) video.mozSrcObject = stream;
			else video.src = (window.URL || window.webkitURL).createObjectURL(stream);
		},function(err) {
			console.log("An error occured! " + err);
		});
	};

};

var cameras = [];
var raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
(function drawFrame(){
	for(var i=0;i<cameras.length;i++)
		cameras[i].draw();
	raf(drawFrame);
})();
