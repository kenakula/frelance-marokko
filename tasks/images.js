import { dest, src } from 'gulp';
import debug from 'gulp-debug';
import { paths } from '../paths';

export const images = () =>
  src([paths.images.src, `!${paths.images.spriteSrc}`])
    .pipe(debug({ title: 'images copied: ' }))
    .pipe(dest(paths.images.dest));
