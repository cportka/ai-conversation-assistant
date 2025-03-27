const { startTranscription } = require('./stt/transcriber');
const { getChatGPTResponse } = require('./chat/chatManager');
const { displayMessage } = require('./ui/cliDisplay'); // or web UI

function main() {
  startTranscription(async (text) => {
    // Possibly detect if text is a question or statement
    // For now, we just pass the text to ChatGPT
    const answer = await getChatGPTResponse(text);
    displayMessage(answer);
  });
}

main();
