import { GraphicsLayer, MediaComposition, MediaLayer, NarrationScript, StorageID } from "../types"
import { OpenAI } from "openai"
import { MainComposition } from "../types"
import { buildUserMediaLayer } from "../buildUserMedia"
import { SRTSubtitle, parseSRT, timeStringToSeconds } from "../utils"
import { FileLike } from "openai/uploads"

export type VoiceOverMediaFile = {
  buffer: Buffer,
  mimetype: "mp3" | "flac"
}
const generateVoiceOver = async (narration: string, openai: OpenAI): Promise<VoiceOverMediaFile> => {
  console.log(`Generating voice over`)

  const MAXIMUM_CHARACTERS = 4096
  if (narration.length > MAXIMUM_CHARACTERS) {
    throw new Error(`Narration is too long for OpenAI's TTS. Maximum characters is ${MAXIMUM_CHARACTERS}`)
  }
  // Should call an API endpoint to generate a voice over mp3 file
  const flac = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: narration,
    response_format: "mp3"
  })

  const buffer = Buffer.from(await flac.arrayBuffer())
  return { buffer, mimetype: "mp3" }
}


const buildCaptions = (srtObjects: SRTSubtitle[]): GraphicsLayer[] => {
  // TODO: See if we can use the sequenceNumber to order the captions
  return srtObjects.map((srtObject) => {
    return {
      type: "captions",
      start_time: timeStringToSeconds(srtObject.startTime),
      end_time: timeStringToSeconds(srtObject.endTime),
      content: srtObject.text
    }
  })
}

class CustomFile implements FileLike {
  readonly size: number;
  readonly type: string;
  readonly lastModified: number;
  readonly name: string;
  private readonly buffer: Buffer;

  constructor(buffer: Buffer, name: string, type: string, lastModified: number) {
    this.buffer = buffer;
    this.size = buffer.length;
    this.name = name;
    this.type = type;
    this.lastModified = lastModified;
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return this.buffer.buffer.slice(0);
  }

  async text(): Promise<string> {
    const arrayBuffer = await this.arrayBuffer();
    const text = Buffer.from(arrayBuffer).toString('utf-8');
    return text;
  }

  slice(start?: number, end?: number): FileLike {
    const slicedBuffer = this.buffer.subarray(start, end);
    return new CustomFile(slicedBuffer, this.name, this.type, this.lastModified);
  }
}

export function bufferToFile(buffer: Buffer, name: string, type: string, lastModified: number): FileLike {
  return new CustomFile(buffer, name, type, lastModified);
}

export const transcribeVoiceOver = async (voiceOver: VoiceOverMediaFile, openai: OpenAI): Promise<SRTSubtitle[]> => {
  console.log(`Transcribing voice over`)
  const audioFile = bufferToFile(voiceOver.buffer, `voiceOver.${voiceOver.mimetype}`, `audio/${voiceOver.mimetype}`, new Date().getTime())

  const response = await openai.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1",
    language: "en",
    response_format: "srt"
  })

  const responseString = String(response)
  const srtObjects = parseSRT(responseString)
  return srtObjects
}


const glueNarration = (narrationScript: NarrationScript): string => {
  const narrationItems = narrationScript.flatMap((item) => {
    if (item.type == "narration") {
      return item.content
    } else {
      return []
    }
  })
  return narrationItems.join("\n")
}

const buildBackgroundMusicLayer = (): MediaLayer => {
  return {
    type: "audio" as const,
    start_time: 0,
    media_access: {
      type: "url",
      data: "https://d1lwpr1oyt2a5u.cloudfront.net" + "ES_Calmar_Adios.mp3",
    }
  }
}

const buildStockMediaLayer = (): MediaLayer => {
  return {
    type: "video" as const,
    start_time: 0,
    media_access: {
      type: "url",
      data: "https://d1lwpr1oyt2a5u.cloudfront.net" + "/background_forest_video.mp4",
    }
  }
}

interface BuildVoiceOverLayerArgs {
  voiceOver: VoiceOverMediaFile
  voiceOverCaptions: GraphicsLayer[]
  onStoreMedia: (file: Blob, mimetype: string) => Promise<StorageID>
}
const buildVoiceOverLayer = async ({ voiceOver, voiceOverCaptions, onStoreMedia }: BuildVoiceOverLayerArgs): Promise<MediaLayer> => {
  const voiceOverBlob = new Blob([voiceOver.buffer], { type: `audio/${voiceOver.mimetype}` })
  const storageId = await onStoreMedia(voiceOverBlob, voiceOver.mimetype)

  const [start_time, end_time] = [voiceOverCaptions[0].start_time, voiceOverCaptions[voiceOverCaptions.length - 1].end_time]
  return {
    type: "audio" as const,
    start_time: start_time,
    end_time: end_time,
    media_access: {
      type: "storageId",
      data: storageId
    }
  }
}

interface ComposeCarouselConfigArgs {
  narrationScript: NarrationScript
  openai: OpenAI
  onStoreMedia: (file: Blob, mimetype: string) => Promise<StorageID>
}

export const produceCarouselConfig = async ({
  narrationScript, openai, onStoreMedia
}: ComposeCarouselConfigArgs): Promise<MainComposition> => {
  // 1. Generate voice-over and captions
  const narration = glueNarration(narrationScript)
  const voiceOver = await generateVoiceOver(narration, openai)
  const voiceOverSRTTranscription = await transcribeVoiceOver(voiceOver, openai)

  const voiceOverCaptions = buildCaptions(voiceOverSRTTranscription)

  // var voiceOverCaptions = CAPTIONS
  // 2. Build the Media Composition Data
  const userMediaLayer = buildUserMediaLayer(narrationScript, voiceOverCaptions)
  const backgroundMusicLayer = buildBackgroundMusicLayer()
  const stockMediaLayer = buildStockMediaLayer()
  const voiceOverLayer = await buildVoiceOverLayer({ voiceOver, voiceOverCaptions, onStoreMedia })

  const mediaCompositionData: MediaComposition = {
    user_media: userMediaLayer,
    stock_media: stockMediaLayer,
    voice_over: voiceOverLayer,
    background_music: backgroundMusicLayer
  }
  const graphicsLayerData = voiceOverCaptions

  const basicSceneData = {
    media_composition: mediaCompositionData,
    graphics_composition: graphicsLayerData
  }

  return basicSceneData
}