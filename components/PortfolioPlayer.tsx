
import React from 'react';

interface Props {
  videoUrl: string;
  autoplay?: boolean;
  className?: string;
}

const PortfolioPlayer: React.FC<Props> = ({ videoUrl, autoplay = true, className = "" }) => {
  return (
    <video
      className={`w-full aspect-video rounded-lg object-cover ${className}`}
      src={videoUrl}
      autoPlay={autoplay}
      muted
      loop
      controls={!autoplay}
      playsInline
    >
      Your browser doesn't support video.
    </video>
  );
};

export default PortfolioPlayer;
