
interface UseFunctionCallHandlerProps {
  onMediaIndexChange: (index: number) => void;
}

export interface FunctionCallHandlerProps {
  functionCall: { name: string, arguments: string }; // JSON stringified object
}

export const useFunctionCallHandler = ({
  onMediaIndexChange
}: UseFunctionCallHandlerProps) => {

  const showUserImageByIndex = (
    index: string
  ) => {
    onMediaIndexChange(parseInt(index))

    const returnMessage = {
      role: 'notification' as const,
      content: `Irja selected image ${index + 1}`,
    }
    return returnMessage;
  }

  /*
  For OpenAI Function Calls, the message history is structured as follows:
  "messages": [
    ...
    {"role": "user", "content": "What is the weather like in Boston?"},
    <---- FUNCTION CALL SERIES START ---->
    {"role": "assistant", "content": null, "function_call": {"name": "get_current_weather", "arguments": "{ \"location\": \"Boston, MA\"}"}},
    {"role": "function", "name": "get_current_weather", "content": "{\"temperature\": "22", \"unit\": \"celsius\", \"description\": \"Sunny\"}"}
    <---- FUNCTION CALL SERIES END ---->
    {"role": "assistant", "content": "It's sunny and 22 degrees celsius in Boston.", "function_call": null}
    ...
  ]
  
  This handler takes the two messages in the series, named "function_request", and "function_call". 
  It returns a "notification" message that gets inserted in the message queue.

  If the function call is not recognized, it returns null.
  */
  const functionCallHandler = ({ functionCall }: FunctionCallHandlerProps) => {

    switch (functionCall.name) {
      case 'show_user_image_by_index':
        return showUserImageByIndex(functionCall.arguments)
      default:
        return null
    }
  }

  return ({
    functionCallHandler,
  }
  )
}