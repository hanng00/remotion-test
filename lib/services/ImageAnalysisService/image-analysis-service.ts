import { openai } from "@/lib/openai";
import { imageAnalysisPrompt } from "./prompts";

interface ImageAnalysisServiceProps {
  imageUrl: string;

}

export const ImageAnalysisService = async ({ imageUrl }: ImageAnalysisServiceProps): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: imageAnalysisPrompt },
          {
            type: "image_url",
            image_url: {
              "url": imageUrl,
              "detail": "low"
            },
          },
        ],
      },
    ],
    max_tokens: 400,
  });
  if (!response) {
    throw new Error("No response received from OpenAI")
  }
  const transcription = response.choices[0].message.content

  if (!transcription) {
    throw new Error("No transcription received from OpenAI")
  }
  return transcription
}
