import { startTranscription } from './audio-input/transcriber.js';
import { getChatGPTResponse } from './chat/chatManager.js';
import { displayMessage } from './ui/cliDisplay.js';

// Separate the core logic into a testable function
export async function processTranscription(text) {
  const answer = await getChatGPTResponse(text);
  displayMessage(answer);
  return answer; // Return for testing
}

// Create a function to set up the transcription callback
export function setupTranscription() {
  return startTranscription(processTranscription);
}

// Main function that can be called explicitly
export function main() {
  setupTranscription();
}

// Only run main when this file is executed directly, not when imported
if (import.meta.url === import.meta.main) {
  main();
}
