export const BASIC_NARRATION_SCRIPT = 
`TASK:
You'll be given a <CHAT_LOG> from a conversation between the user and our AI agent Irja. Your goal is to write and structure a powerful slideshow narration script based on the images and experiences shared by user in the <CHAT LOG>.

<NARRATION_STYLE>
- Identify the key emotions and feelings that the user is experiencing. Use these as the basis for the narration.
- Don't state anything too obvious displayed in the images.
`

export const replacePlaceholders = (script: string, replacements: Record<string, string>): string => {
  let replacedScript = script;
  Object.entries(replacements).forEach(([placeholder, value]) => {
    replacedScript = replacedScript.split(placeholder).join(value);
  });
  return replacedScript;
}