import { Audio } from "remotion";

interface BackgroundMusicSFXProps {
  src: string;
}

export const BackgroundMusicSFX = ({ src }: BackgroundMusicSFXProps) => {
  // TODO : Actually fetch the BG music. For now, just use a placeholder.

  src = "https://d1lwpr1oyt2a5u.cloudfront.net" + "/ES_Calmar_Adios.mp3";

  return <Audio volume={0.4} name="Background Music" loop src={src} />;
};
