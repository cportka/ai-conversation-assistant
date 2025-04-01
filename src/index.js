const { startTranscription } = require('./stt/transcriber');
const { getChatGPTResponse } = require('./chat/chatManager');
const { displayMessage } = require('./ui/cliDisplay'); // or web UI

// Separate the core logic into a testable function
async function processTranscription(text) {
  const answer = await getChatGPTResponse(text);
  displayMessage(answer);
  return answer; // Return for testing
}

// Create a function to set up the transcription callback
function setupTranscription() {
  return startTranscription(processTranscription);
}

// Main function that can be called explicitly
function main() {
  setupTranscription();
}

// Only run main when this file is executed directly, not when imported
if (require.main === module) {
  main();
}

// Export functions for testing
module.exports = {
  processTranscription,
  setupTranscription,
  main
};
