import { Composition } from "remotion";
import { TexilasAd } from "./TexilasAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TexilasAd"
        component={TexilasAd}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
