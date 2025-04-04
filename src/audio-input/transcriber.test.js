import { startTranscription } from './transcriber';

jest.useFakeTimers();

describe('startTranscription', () => {
  it('should get back text eventually if someone is talking', () => {
    const mockCallback = jest.fn();
    const stopTranscription = startTranscription(mockCallback);

    // Fast-forward time to trigger the callback
    jest.advanceTimersByTime(5000); // First interval
    expect(mockCallback).toHaveBeenCalledWith(ANY STRING AND PRINTED TO CONSOLE);
  })});
