import Plyr from 'plyr';
import Micromodal from 'micromodal';

export const initVideos = () => {
  const videosMap = new Map();

  Micromodal.init({
    disableFocus: true,
    disableScroll: true,
    onClose: modal => {
      const video = videosMap.get(modal.id);

      if (video) {
        video.stop();
      }
    },
  });

  const videos = document.querySelectorAll('[data-video]');

  if (!videos.length) {
    return;
  }

  videos.forEach(video => {
    const modal = video.closest('.modal');

    const plyr = new Plyr(video, {
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

    videosMap.set(modal.id, plyr);
  });
};
