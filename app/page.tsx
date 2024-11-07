import TransitionComponent from '@/components/Global/TransitionComponent';
import dynamic from 'next/dynamic';
export default function Home() {
  const LandingPageNOSSR = dynamic(() => import('./LandingPage'), { ssr: false });
  return (
    <div className='flex h-auto w-auto flex-col'>
      <div className='flex flex-col items-center justify-center'>
        <TransitionComponent />



        <LandingPageNOSSR />
      </div>
    </div>
  );
}
