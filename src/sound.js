import * as SC from './soundCloud.js';
var Sound = function(id) {
  var clientId = id;
  SC.initialize({
    client_id: clientId
  });
  var track_url = 'https://soundcloud.com/idiotape/06-heyday-192rv';
  var audio = new Audio();
      audio.ctx = new (window.AudioContext || window.webkitAudioContext);
  var source = audio.ctx.createMediaElementSource(audio);
  this.analyser = audio.ctx.createAnalyser();
  source.fftSize = 256;
  source.connect(this.analyser);
  source.connect(audio.ctx.destination);
  audio.crossOrigin = "anonymous";
  var getComments = function (track) {
    var streamUrl = track.stream_url + '?client_id=' + clientId;
    audio.src = 'data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
    audio.setAttribute('src', streamUrl);
    audio.play();
  };
  SC.resolve(track_url).then(getComments);
};


export default Sound;