import { dest, src } from 'gulp';
import { BUILD_PATH, paths } from '../paths';

export const webconfigs = () =>
  src([paths.browserconfig.src, paths.manifest.src, paths.robots.src]).pipe(
    dest(BUILD_PATH),
  );
