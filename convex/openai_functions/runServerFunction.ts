import { GenericActionCtx } from "convex/server"
import { DataModel, Id } from "../_generated/dataModel"
import { internal } from "../_generated/api"


export class OpenAIFunctionCallManager {
  private slideId: Id<"slides">
  private userId: string
  private actionCtx: GenericActionCtx<DataModel>

  constructor(slideId: Id<"slides">, userId: string, actionCtx: GenericActionCtx<DataModel>) {
    this.slideId = slideId
    this.userId = userId
    this.actionCtx = actionCtx
  }


  private creationTimeToDateString = (creationTime: number) => {
    const date = new Date(creationTime)
    return date.toLocaleDateString()
  }

  private listUserImageDescriptions = async ({ }) => {
    const imageDescriptions = await this.actionCtx.runQuery(internal.imageMessages.internalListImageDescriptions, {
      slideId: this.slideId,
      userId: this.userId,
    })


    const formattedReturn = imageDescriptions.map(({ _id, _creationTime, transcription }) => {
      return {
        _id,
        createdAt: this.creationTimeToDateString(_creationTime),
        transcription: transcription || "No transcription available"
      }
    })

    return formattedReturn
  }

  private show_user_image_by_index = async ({ index }: { index: number }) => {
    return `Showing image at index ${index} to the user.`
  }

  runServerFunction = async (name: string, args: any) => {
    console.log("Running server function", name, args)
    switch (name) {
      case "list_user_image_descriptions":
        return await this.listUserImageDescriptions({ args })
      case "show_user_image_by_index":
        return await this.show_user_image_by_index(args)
      default:
        return null
    }
  }

  getRunServerFunction(): (name: string, args: any) => Promise<any> {
    return async (name, args) => await this.runServerFunction(name, args)
  }
}




