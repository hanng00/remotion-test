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


export const accumulateAndDecodeChunks = async (stream: ReadableStream<Uint8Array>) => {
  let content = ""
  for await (const chunk of streamToAsyncGenerator(stream)) {
    const decodedChunk = new TextDecoder().decode(chunk)
    content += decodedChunk
  }
  return content
}