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
    description: "Lists image transcriptions and upload dates of the users images. Refetch whenever the user the user uploads a new image.",
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];

const listUserImageDescriptions = async ({ args }: { args: any }) => {
  return "Listing user image descriptions."
}

const show_user_image_by_index = async ({ index }: { index: number }) => {
  // This function is handled on the frontend. The server just responds
  // confirming that the action has been taken.
  // TODO - Maybe add the image description here, helping the LLM understanding
  //        what's shown? 

  return `Showing image at index ${index} to the user.`
}

export const runServerFunction = async (name: string, args: any) => {
  switch (name) {
    case "list_user_image_descriptions":
      return await listUserImageDescriptions({ args })
    case "show_user_image_by_index":
      return await show_user_image_by_index(args)
    default:
      return null
  }
}