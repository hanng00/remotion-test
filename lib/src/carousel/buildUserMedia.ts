import { NarrationScript, GraphicsLayer, MediaLayer, NarrationScriptTextItem, NarrationScriptMediaItem } from "./types";

export const levenshteinDistance = (str1: string, str2: string): number => {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store the distances
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + cost // substitution
        );
      }
    }
  }

  return dp[m][n];
}


export const sequentiallyMapCaptionsToTextItem = (textItem: NarrationScriptTextItem, captions: GraphicsLayer[]): GraphicsLayer[] => {
  // Iteratively map the captions to the text item, until the Lev distance is minimized.
  // If the Lev distance is minimized, then we have a match.
  var mappedCaptions = []

  let joinedCaptions = ""
  let minimumDistance = Infinity
  for (const captionItem of captions) {
    joinedCaptions += captionItem.content
    var dist = levenshteinDistance(textItem.content.replaceAll(" ", ""), joinedCaptions.replaceAll(" ", ""))

    if (dist > minimumDistance) {
      break
    }
    minimumDistance = dist
    mappedCaptions.push(captionItem)
  }

  return mappedCaptions
}


/* 
This maps the narration script to the user media composition data.
Extracting out the media IDs from the narration script is the easy part, 
the difficulty lies in mapping the start and end times.

To do this, the captions will be used as the source of truth. It contains data about
timed intervals and subsets of the glued narration script.

TIMELINE:
- NARRATION SCRIPT
  * Media       id_1 ------> id_2 ------------->
  * Narration   | ---- | --- | -- | -- | ----- |

- CAPTIONS
  * Caption     | - | -- | --- | ---- | -- | --   
  
Observing the timeline above, the difficulty lies in mapping the narration script to the captions.
The narration script split the total narration based on when media was shown, while the captions split
it based on a standardized max length of characters. 

We'll use the following projection approach, where "XXX" indicate an image that's not shown:
  * Media       id_1 ------> id_2 ------------->
  * Narration   | ---- | --- | -- | -- | ----- |
  * Caption     | - | -- | --- | ---- | -- | --   
  
  * Media Vis.  | - | -- | XXX | ---- | -- | --  

*/
export const buildUserMediaLayer = (narrationScript: NarrationScript, captions: GraphicsLayer[]): MediaLayer[] => {
  var userMediaArray: MediaLayer[] = []

  let currentMediaItem: NarrationScriptMediaItem | null = null
  let captionItemIndex = 0
  for (const item of narrationScript) {
    if (item.type == "media") {
      currentMediaItem = item
    }

    if (item.type == "narration") {
      const unmappedCaptions = captions.slice(captionItemIndex)
      const mappedCaptions = sequentiallyMapCaptionsToTextItem(item, unmappedCaptions)
      captionItemIndex += mappedCaptions.length

      if (currentMediaItem == null) {
        continue
      }

      const [startTime, endTime] = [mappedCaptions[0].start_time, mappedCaptions[mappedCaptions.length - 1].end_time]
      const reducedUserMedia = {
        type: "image" as const,
        media_access: {
          type: "storageId" as const,
          data: currentMediaItem.id
        },
        start_time: startTime,
        end_time: endTime
      }

      userMediaArray.push(reducedUserMedia)

    }
  }
  return userMediaArray
}
