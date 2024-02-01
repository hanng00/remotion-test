export type SRTSubtitle = {
  sequenceNumber: number;
  startTime: string;
  endTime: string;
  text: string;
};

export const parseSRT = (content: string): SRTSubtitle[] => {
  const subtitleEntries = trimNewlines(content).split(/\r?\n\r?\n/);


  return subtitleEntries.map((entry) => {
    const [sequenceNumber, timecode, ...textLines] = entry.split('\n');
    const [startTime, endTime] = timecode.split('-->');

    return {
      sequenceNumber: parseInt(sequenceNumber),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      text: textLines.join('\n').trim(),
    };
  });
};

export const trimNewlines = (inputString: string): string => {
  // Trim newlines from the start and end of the string
  return inputString.replace(/^\s+|\s+$/g, '');
}

export const timeStringToSeconds = (timeString: string): number => {
  const [hours, minutes, secondsAndMillis] = timeString.split(':');
  const [seconds, milliseconds] = secondsAndMillis.split(',');

  const totalSeconds =
    parseInt(hours, 10) * 3600 +
    parseInt(minutes, 10) * 60 +
    parseInt(seconds, 10);

  const totalMilliseconds = totalSeconds * 1000 + parseInt(milliseconds, 10);

  return totalMilliseconds / 1000; // Convert milliseconds to seconds
}