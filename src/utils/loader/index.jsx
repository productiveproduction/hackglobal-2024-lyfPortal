// Orignally https://github.com/suren-atoyan/react-pwa/blob/master/src/utils/loader/index.tsx
import Loading from '../../components/Loading';
// import { loader as loaderDefaultOptions } from '@/config';

import asyncComponentLoader from './loader';

const loaderDefaultOptions = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const configuredAsyncComponentLoader = (
  loadComponent,
  additionalProps = {},
  loaderOptions = loaderDefaultOptions,
  FallbackWaiting = Loading,
) => asyncComponentLoader(loadComponent, additionalProps, loaderOptions, FallbackWaiting);

export { loaderDefaultOptions };
export default configuredAsyncComponentLoader;