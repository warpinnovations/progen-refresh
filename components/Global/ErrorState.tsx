import { Oxanium } from 'next/font/google';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

interface ErrorStateProps {
  message?: string;
  title?: string;
  errorDetails?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'There was an error loading this content. Please try again later.',
  title = 'Failed to load',
  errorDetails
}) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black text-white'>
      <div className='text-center p-8'>
        <h2 className={`text-2xl mb-4 ${oxaniumFont.className}`}>{title}</h2>
        <p>{message}</p>
        {errorDetails && <p className='mt-4 text-red-400'>{errorDetails}</p>}
      </div>
    </div>
  );
};

export default ErrorState;
