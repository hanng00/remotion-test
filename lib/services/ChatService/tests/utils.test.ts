import { describe, expect, test } from "vitest";
import { streamToAsyncGenerator, accumulateAndDecodeChunks } from "../utils";

describe("streamToAsyncGenerator", async (t) => {
  const testStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("hello"));
      controller.enqueue(new TextEncoder().encode("world"));
      controller.close();
    },
  });


  test("converts a stream to an async generator", async () => {
    const chunks = [];

    for await (const chunk of streamToAsyncGenerator(testStream)) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual([
      new TextEncoder().encode("hello"),
      new TextEncoder().encode("world"),
    ])
  })
})


describe("accumulateAndDecodeChunks", async (t) => {
  const testStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("hello"));
      controller.enqueue(new TextEncoder().encode("world"));
      controller.close();
    },
  });

  test("accumulates and decodes a readable stream", async () => {
    const content = await accumulateAndDecodeChunks(testStream)
    expect(content).toEqual("helloworld")
  })
})