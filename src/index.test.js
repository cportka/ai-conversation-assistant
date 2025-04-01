// src/__tests__/index.test.js
const { processTranscription, setupTranscription, main } = require('../index');
const { getChatGPTResponse } = require('../chat/chatManager');
const { displayMessage } = require('../ui/cliDisplay');
const { startTranscription } = require('../audio-input/transcriber');

// Mock dependencies
jest.mock('../chat/chatManager');
jest.mock('../ui/cliDisplay');
jest.mock('../audio-input/transcriber');

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
      // Setup - create a spy on setupTranscription
      const setupSpy = jest.spyOn({ setupTranscription }, 'setupTranscription');
      setupSpy.mockReturnValue('transcription instance');
      
      // Execute
      main();
      
      // Assert
      expect(setupSpy).toHaveBeenCalledTimes(1);
      
      // Cleanup
      setupSpy.mockRestore();
    });
  });

  describe('displayMessage', () => {
    it('should display error message when ChatGPT fails', async () => {
      // Setup
      const error = new Error('API error');
      getChatGPTResponse.mockRejectedValue(error);
      console.error = jest.fn(); // Mock console.error
      
      // Execute and Assert
      await expect(processTranscription('test input')).rejects.toThrow('API error');
      expect(getChatGPTResponse).toHaveBeenCalledWith('test input');
      expect(displayMessage).toHaveBeenCalledWith('Error: API error');
      expect(console.error).toHaveBeenCalled();
    });   
});
