addEventListener('DOMContentLoaded',function() {
	var streaming = false,
			width = 320,
			height = 0;

	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	MediaStreamTrack.getSources(function(l){
		var vids = [];
		for(var i=0;i<l.length;i++)
			if(l[i].kind=='video') {
				vids.push(l[i].id);
			}
		vidStream(1,vids);
		vidStream(2,vids);
	});

});

function vidStream(num,ids) {
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
		if(_sel.value) startStream(video,_sel.value);
	});

	function startStream(video,id){
		navigator.getMedia({
			video: {optional: [{sourceId: id}]},
			audio: false
		},function(stream) {
			if(navigator.mozGetUserMedia)
				video.mozSrcObject = stream;
			else
				video.src = (window.URL || window.webkitURL).createObjectURL(stream);
			video.play();
		},function(err) {
			console.log("An error occured! " + err);
		});
	};
};
