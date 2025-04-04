// src/__tests__/index.test.js
import { jest } from '@jest/globals';
import { startTranscription } from '../audio-input/transcriber.js';
import { getChatGPTResponse } from '../chat/chatManager.js';
import { main, processTranscription, setupTranscription } from '../index.js';
import { displayMessage } from '../ui/cliDisplay.js';

// Mock dependencies
jest.mock('../chat/chatManager.js');
jest.mock('../ui/cliDisplay.js');
jest.mock('../audio-input/transcriber.js');

describe('Index module', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('processTranscription', () => {
    it('should get response from ChatGPT and display it', async () => {
      // Setup
      getChatGPTResponse.mockResolvedValue('mocked response');

      // Execute
      const result = await processTranscription('test input');

      // Assert
      expect(getChatGPTResponse).toHaveBeenCalledWith('test input');
      expect(displayMessage).toHaveBeenCalledWith('mocked response');
      expect(result).toBe('mocked response');
    });

    it('should handle errors from ChatGPT', async () => {
      // Setup
      const error = new Error('API error');
      getChatGPTResponse.mockRejectedValue(error);

      // Execute and Assert
      await expect(processTranscription('test input')).rejects.toThrow('API error');
      expect(getChatGPTResponse).toHaveBeenCalledWith('test input');
      expect(displayMessage).not.toHaveBeenCalled();
    });
  });

  describe('setupTranscription', () => {
    it('should call startTranscription with processTranscription callback', () => {
      // Setup
      startTranscription.mockReturnValue('transcription instance');

      // Execute
      const result = setupTranscription();

      // Assert
      expect(startTranscription).toHaveBeenCalledTimes(1);
      expect(startTranscription.mock.calls[0][0]).toBe(processTranscription);
      expect(result).toBe('transcription instance');
    });
  });

  describe('main', () => {
    it('should call setupTranscription', () => {
      // Create a spy on setupTranscription
      const originalSetupTranscription = setupTranscription;
      global.setupTranscription = jest.fn().mockReturnValue('transcription instance');

      // Execute
      main();

      // Assert
      expect(global.setupTranscription).toHaveBeenCalledTimes(1);

      // Cleanup
      global.setupTranscription = originalSetupTranscription;
    });
  });
});
