function setup() {
  audioEl = createAudio('../lucky_dragons_-_power_melody.mp3');
  audioEl.showControls(true);
  audioEl.onended(sayDone);
}

function sayDone(elt) {
  alert('done playing ' + elt.src );
}