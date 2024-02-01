import { describe, expect, it } from "vitest";
import { buildUserMediaLayer, levenshteinDistance, sequentiallyMapCaptionsToTextItem } from "../buildUserMedia"
import { GraphicsLayer, MediaLayer, NarrationScript, NarrationScriptTextItem } from "../types";

describe("levenshteinDistance", () => {
  it("correctly calculates the distance between two strings", () => {
    const str1 = "foo"
    const str2 = "bar"
    const expectedResult = 3

    const result = levenshteinDistance(str1, str2)

    expect(result).toEqual(expectedResult)
  })

  it("correctly calculates the distance between two strings of different lengths", () => {
    const str1 = "foo"
    const str2 = "foobar"
    const expectedResult = 3

    const result = levenshteinDistance(str1, str2)

    expect(result).toEqual(expectedResult)
  })

  it("correctly calculates the distance between two strings of different lengths and intermediate spaces", () => {
    const str1 = "hi there man"
    const str2 = "hi the ir man"
    const expectedResult = 3

    const result = levenshteinDistance(str1, str2)

    expect(result).toEqual(expectedResult)
  })
})

describe("sequentiallyMapCaptionsToTextItem", () => {
  it("correctly maps captions to a text item", () => {
    var textItem: NarrationScriptTextItem = {
      type: "narration",
      content: "Say Foo."
    }
    var captions: GraphicsLayer[] = [
      {
        type: "captions",
        content: "Say",
        start_time: 2,
        end_time: 3
      },
      {
        type: "captions",
        content: "Foo.",
        start_time: 3,
        end_time: 4
      },
      {
        type: "captions",
        content: "Or somethin else?",
        start_time: 5,
        end_time: 6
      }
    ]
    var expectedResult: GraphicsLayer[] = [
      {
        type: "captions",
        content: "Say",
        start_time: 2,
        end_time: 3
      },
      {
        type: "captions",
        content: "Foo.",
        start_time: 3,
        end_time: 4
      },
    ]

    const result = sequentiallyMapCaptionsToTextItem(textItem, captions)

    expect(result).toEqual(expectedResult)
  })
})

describe("buildUserMediaLayer", () => {
  let narrationScript: NarrationScript
  let captions: GraphicsLayer[]
  let expectedResult: MediaLayer[]

  narrationScript = [
    {
      type: "narration",
      content: "Say Foo."
    },
    {
      type: "media",
      id: "ID_1"
    },
    {
      type: "narration",
      content: "Then say Bar."
    },
    {
      type: "media",
      id: "ID_2"
    },
    {
      type: "narration",
      content: "Then say Baz."
    }
  ]

  it("handles aligned narration splits", () => {
    captions = [
      {
        type: "captions",
        content: "Say Foo.",
        start_time: 0,
        end_time: 1
      },
      {
        type: "captions",
        content: "Then say Bar.",
        start_time: 1,
        end_time: 2
      },
      {
        type: "captions",
        content: "Then say Baz.",
        start_time: 2,
        end_time: 3
      },
    ]
    expectedResult = [
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_1"
        },
        start_time: 1,
        end_time: 2
      },
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_2"
        },
        start_time: 2,
        end_time: 3
      },
    ]

    const result = buildUserMediaLayer(narrationScript, captions)

    expect(result).toEqual(expectedResult)
  })

  it("handles intermediate minor splits between aligned major splits of the narration text", () => {
    captions = [
      {
        type: "captions",
        content: "Say Foo.",
        start_time: 0,
        end_time: 1
      },
      {
        type: "captions",
        content: "Then say ",
        start_time: 1,
        end_time: 2
      },
      {
        type: "captions",
        content: "Bar.",
        start_time: 2,
        end_time: 3
      },
      {
        type: "captions",
        content: "Then say Baz.",
        start_time: 3,
        end_time: 4
      },
    ]
    expectedResult = [
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_1"
        },
        start_time: 1,
        end_time: 3
      },
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_2"
        },
        start_time: 3,
        end_time: 4
      },
    ]
    const result = buildUserMediaLayer(narrationScript, captions)

    expect(result).toEqual(expectedResult)

  })

  it("handles unaligned splits by allowing late starts", () => {
    captions = [
      {
        type: "captions",
        content: "Say Foo. Then",
        start_time: 0,
        end_time: 1
      },
      {
        type: "captions",
        content: "say Bar.",
        start_time: 1,
        end_time: 2
      },
      {
        type: "captions",
        content: "Then",
        start_time: 2,
        end_time: 3
      },
      {
        type: "captions",
        content: " say Baz.",
        start_time: 4,
        end_time: 5
      },
    ]

    expectedResult = [
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_1"
        },
        start_time: 1,
        end_time: 2
      },
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_2"
        },
        start_time: 2,
        end_time: 5
      },
    ]
    const result = buildUserMediaLayer(narrationScript, captions)

    expect(result).toEqual(expectedResult)

  })

  it("handles unaligned splits by allowing late starts with trimmed captions", () => {
    captions = [
      {
        type: "captions",
        content: "Say Foo. Then",
        start_time: 0,
        end_time: 1
      },
      {
        type: "captions",
        content: "say Bar.",
        start_time: 1,
        end_time: 2
      },
      {
        type: "captions",
        content: "Then",
        start_time: 2,
        end_time: 3
      },
      {
        type: "captions",
        content: "say Baz.",
        start_time: 4,
        end_time: 5
      },
    ]

    expectedResult = [
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_1"
        },
        start_time: 1,
        end_time: 2
      },
      {
        type: "image",
        media_access: {
          type: "storageId",
          data: "ID_2"
        },
        start_time: 2,
        end_time: 5
      },
    ]
    const result = buildUserMediaLayer(narrationScript, captions)

    expect(result).toEqual(expectedResult)
  })
})