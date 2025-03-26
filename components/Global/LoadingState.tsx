import { Oxanium } from 'next/font/google';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black text-white'>
      <div className='text-center p-8'>
        <h2 className={`text-2xl mb-4 ${oxaniumFont.className}`}>{message}</h2>
        <div className='w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin mx-auto'></div>
      </div>
    </div>
  );
};

export default LoadingState;
