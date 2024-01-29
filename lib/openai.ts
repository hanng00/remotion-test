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


      if (done) {
        resolve();
      } else {
        onValue(value)
        // Continue reading chunks until the stream finishes
        handleChunk();
      }
    };

    // Start reading the stream
    handleChunk().catch(reject);
  });
}

// Convert readable stream to async generator yielding chunks
// It returns Uint8Arrays, so we need to type annotate that
export const streamToAsyncGenerator = async function* (
  stream: ReadableStream,
): AsyncGenerator<Uint8Array> {
  const reader = stream.getReader();

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      yield value;
    }
  } finally {
    reader.releaseLock();
  }
};
