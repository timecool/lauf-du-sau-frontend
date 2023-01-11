import '../styles/global.scss';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { me } from '@/api/calls/auth';
import AppBar from '@/components/app-bar';
import Loading from '@/components/loading';
import Seo from '@/components/seo';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [userLoad, setUserLoad] = useState(true);

  const isAuth = async () => {
    await me();
    setUserLoad(false);
  };

  useEffect(() => {
    isAuth();
  }, []);
  if (userLoad) <Loading />;
  return (
    <div className="relative min-h-[100vh]">
      <Seo />
      <Component {...pageProps} />
      <AppBar />
    </div>
  );
};

export default MyApp;
