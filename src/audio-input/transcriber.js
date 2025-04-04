// import mic from 'mic';
// import { transcribeAudio } from './whisperApi'; // or local whisper runner

export function startTranscription(callback) {
  // Mock implementation of the microphone stream
 const texts = ['hello?', 'how are you?', 'I am fine.', 'what about you?', 'goodbye!'];

  let index = 0;
  while (true) {
    setTimeout(() => {
      (index >= texts.length) ? index = 0 : index++;
      const text = texts[index];
      callback(text);
    }, 5000); // in milliseconds
  }

  /*
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
  */
}
