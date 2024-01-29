import Head from 'next/head';
import Appbar from '@/components/appbar';
import BottomNav from '@/components/bottom-nav';
import Footer from './footer/footer';
import { isMobile } from 'react-device-detect';

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: Props) => (
  <>
    {title ? (
      <Head>
        <title>Hitch | {title}</title>
      </Head>
    ) : null}

    <Appbar />

    <main className={ 'pt-20 sm:pb-0 pb-20 pr-1 pl-1' }>
      <div className=''>{children}</div>
    </main>

    <BottomNav />
    <Footer />
  </>
);

export default Page;
