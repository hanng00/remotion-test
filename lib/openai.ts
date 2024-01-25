import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const waitUntilReadableStreamFinishes = async (
  stream: ReadableStream,
  onValue: (value: any) => void = () => { }
): Promise<void> => {
  const reader = stream.getReader();

  return new Promise<void>((resolve, reject) => {
    const handleChunk = async () => {
      const { value, done } = await reader.read();

      onValue(value)

      if (done) {
        resolve();
      } else {
        // Continue reading chunks until the stream finishes
        handleChunk();
      }
    };

    // Start reading the stream
    handleChunk().catch(reject);
  });
}