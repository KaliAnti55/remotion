import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile } from 'remotion';

export const TexilasAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const textY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const taglineY = interpolate(frame, [60, 90], [50, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFA500', justifyContent: 'center', alignItems: 'center' }}>
      <Audio src={staticFile('voiceover.mp3')} volume={0.8} />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: -200 }}>
        <Img
          src={staticFile('LOGO.png')}
          style={{
            width: 600,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: 200 }}>
        <h1
          style={{
            fontFamily: 'sans-serif',
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            margin: 0
          }}
        >
          https://texilas.online/
        </h1>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: 350 }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: 55,
            fontWeight: 'bold',
            color: '#333',
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            margin: 0,
            textAlign: 'center',
            maxWidth: 1600
          }}
        >
          الشبكة العربية الأكبر والمحدثة دائمًا للذكاء الاصطناعي في الوطن العربي
        </h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
