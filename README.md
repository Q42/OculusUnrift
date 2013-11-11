Oculus Unrift
-------------

[w00tcamp](http://w00tcamp.nl) 2013 project

Authors:  
[Boaz Leskes](https://github.com/bleskes)  
[Christiaan Hees](https://github.com/chees)  
[Johan Huijkman](https://github.com/huijkman)  
[Marcel Duin](https://github.com/marcelduin)  
[Taco Ekkel](https://github.com/tacoe)  

Supported voice commands in sceneSound.js:  
"picture"  
"lights on"  
"lights off"  
"next"

Run the site through https to avoid the repeated camera and microphone permissions.

To deploy to GAE:
Install the [GAE SDK for Go](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Go) and run:
  appcfg.py update --oauth2 .

After that it will be running at:
https://oculusunrift.appspot.com
