// ========= SCENE BOOT
var sceneCrash = function(){
  // global var hud references to canvas.getContext("2d")
  
  // To skip this scene:
  //sceneCursor();
  //return;

  var lines = ['A fatal exception 0E has occurred at 0028:C011E36 in VXD VMM(01) +',
               '0001010E36. The current consciousness will be terminated.',
               '',
               '*  Press any key to terminate the current thought.',
               '*  Press CTRL+ALT+DEL again to restart your brain. You will',
               '   lose any unsaved memories in all thoughts.',
               '',
               '               Move any limb to continue _'];

  hud.fillStyle = '#00F';
  hud.fillRect(0, 0, canvas.width, canvas.height);

 
  hud.fillStyle = '#CCC';
  hud.fillRect(center_x - 20, center_y - (lines.length) * 8 - 40, 
    40, 14);
 
  hud.font = '7pt "perfect_dos_vga_437regular" normal';
  hud.fillStyle = '#00f';
  hud.textAlign = 'left';
  hud.fillText("UNRIFT", center_x-16, center_y - (lines.length) * 8 - 30);

  hud.font = '7pt "perfect_dos_vga_437regular" normal';
  hud.fillStyle = '#fff';
  hud.textAlign = 'left';
  y = center_y - (lines.length) * 8;
  for(line in lines)
  {
    hud.fillText(lines[line], center_x-150, y);
    y += 16;
  }

  //createjs.Sound.play('sounds/robotpoweron.mp3');

  setTimeout(sceneCursor, 50000);
}