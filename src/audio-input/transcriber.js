const mic = require('mic');
const { transcribeAudio } = require('./whisperApi'); // or local whisper runner

function startTranscription(callback) {
  const microphone = mic({
    rate: '16000',
    channels: '1',
    debug: false
  });

  const micInputStream = microphone.getAudioStream();
  micInputStream.on('data', async (data) => {
    // Pass chunk to local or remote STT
    const text = await transcribeAudio(data);
    if (text) {
      callback(text);
    }
  }); 

  microphone.start();
}

module.exports = {
  startTranscription
};
