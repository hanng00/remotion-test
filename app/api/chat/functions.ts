import type { ChatCompletionCreateParams } from 'openai/resources/chat';


export const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: 'show_user_image_by_index',
    description: 'Shows the indexed image to the user on the frontend. Always show the image you are talking about.',
    parameters: {
      type: 'object',
      properties: {
        index: {
          type: 'integer',
          description: 'The index of the image to show.',
        },
      },
      required: ['index'],
    },
  },
  {
    name: "list_user_image_descriptions",
    description: "Lists all descriptions generated by our Vision API of the users previously uploaded images.",
    parameters: {
      type: 'object',
      properties: {},
    },
  },
  /* {
    name: "get_user_image_description_by_index",
    description: "Gets the description of the image at the given index.",
    parameters: {
      type: 'object',
      properties: {
        index: {
          type: 'integer',
          description: 'The index of the image to show.',
        },
      },
      required: ['index'],
    },
  } */
];

const get_user_image_description_by_index = async ({ index }: { index: number }) => {
  const mockData = await list_user_image_descriptions(false)
  return mockData[index]
}

const list_user_image_descriptions = async (format: boolean = true) => {
  const mockData = [
    {
      index: 0,
      image_description: 'This image contains a cute cat. It has yellow eyes and white fur, with black ears.',
    },
    {
      index: 1,
      image_description: 'This image contains two cute dogs. They are both brown. They are outside in the summer',
    },
    {
      index: 2,
      image_description: 'This image contains two big trees out on a hill. The sun is setting behind them.',
    },
  ]
  if (format) {
    return mockData.map(({ index, image_description }) => {
      return `Index ${index}: ${image_description}`
    }).join("\n\n")
  }
  return mockData
}

export const runServerFunction = async (name: string, args: any) => {
  console.log("Running server function", name, args)
  switch (name) {
    case "list_user_image_descriptions":
      return await list_user_image_descriptions(args)
    case "get_user_image_description_by_index":
      return await get_user_image_description_by_index(args.index)
    default:
      return null
  }
}