import { ChatRequest, FunctionCall, FunctionCallHandler, nanoid } from "ai";

interface UseFunctionCallHandlerProps {
  onIndexChange: (index: number) => void;
}

const useFunctionCallHandler = ({
  onIndexChange
}: UseFunctionCallHandlerProps) => {

  const showUserImageByIndex = (
    functionResponse: ChatRequest,
    functionCall: FunctionCall
  ) => {
    if (!functionCall.arguments) return functionResponse;

    const parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
    onIndexChange(parsedFunctionCallArguments.index)

    functionResponse.messages.push({
      id: nanoid(),
      name: 'show_user_image_by_index',
      role: 'function' as const,
      content: `Irja selected image ${parsedFunctionCallArguments.index + 1}`,
    })
    return functionResponse;
  }

  const handleClientFunctionCall = (functionResponse: ChatRequest,
    functionCall: FunctionCall) => {
    console.log("functionCall", functionCall)
    switch (functionCall.name) {
      case 'show_user_image_by_index':
        return showUserImageByIndex(functionResponse, functionCall)
      default:
        return functionResponse
    }
  }

  const functionCallHandler: FunctionCallHandler = async (
    chatMessages,
    functionCall
  ) => {
    var functionResponse: ChatRequest = {
      messages: [
        ...chatMessages,
      ],
    };
    functionResponse = handleClientFunctionCall(functionResponse, functionCall)
    return functionResponse;
  }


  return ({
    functionCallHandler,
  });
}

export default useFunctionCallHandler;