import Plyr from 'plyr';

export const initVideos = () => {
  const videos = document.querySelectorAll('[data-video]');

  if (!videos.length) {
    return;
  }

  videos.forEach(video => {
    new Plyr(video, {
      controls: [
        'settings',
        'play',
        'play-large',
        'progress',
        'mute',
        'volume',
      ],
      settings: ['quality', 'speed'],
    });
  });
};
