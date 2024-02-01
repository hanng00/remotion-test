import { SRTSubtitle, parseSRT, timeStringToSeconds, trimNewlines } from "../utils";
import { test, expect, describe } from "vitest"

describe("parseSRT", () => {
  const expectedOutput: SRTSubtitle[] = [{
    sequenceNumber: 1,
    startTime: "00:00:00,000",
    endTime: "00:00:03,160",
    text: "Once upon a time,"
  },
  {
    sequenceNumber: 2,
    startTime: "00:00:03,160",
    endTime: "00:00:05,160",
    text: "who was about"
  }]

  test("correctly parses an SRT input", () => {
    const srtInput =
      `
    1
    00:00:00,000 --> 00:00:03,160
    Once upon a time,

    2
    00:00:03,160 --> 00:00:05,160
    who was about
    `

    expect(parseSRT(srtInput)).toEqual(expectedOutput)
  })

  test("correctly parses an SRT input with trailing newlines", () => {
    const srtInput =
      `


    1
    00:00:00,000 --> 00:00:03,160
    Once upon a time,

    2
    00:00:03,160 --> 00:00:05,160
    who was about



    `

    expect(parseSRT(srtInput)).toEqual(expectedOutput)
  })
})

describe("trimNewlines", () => {
  test("correctly trims newlines", () => {
    const input = `
    
    
    
    Hello world



    `

    const expectedOutput = "Hello world"

    expect(trimNewlines(input)).toEqual(expectedOutput)
  })
})

describe("timeStringToSeconds", () => {
  test("correctly converts a time string to seconds", () => {
    const input = "00:00:03,160"

    const expectedOutput = 3.16

    expect(timeStringToSeconds(input)).toEqual(expectedOutput)
  })

})