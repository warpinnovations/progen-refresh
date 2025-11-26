'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import interstellarLogo from '../../../../public/interstellar-logo.png';
import backgroundImage from '../../../../public/awards-background.png';
import PRLogo from '../../../../public/PR_logo_Silver.png';

interface FileDriveResponse {
  success: boolean;
  folderName?: string;
  files?: Array<{
    id: string;
    name: string;
    mimeType: string;
    webViewLink?: string;
    webContentLink?: string;
  }>;
  error?: string;
}

interface FullscreenVideoElement extends HTMLVideoElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
}

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const folderName = searchParams.get('name');

  const videoRef = useRef<HTMLVideoElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<FileDriveResponse>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [showGuestPhotos, setShowGuestPhotos] = useState(false);
  const [enableEvent, setEnableEvent] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePlay = () => {
    const video = videoRef.current as FullscreenVideoElement | null;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  useEffect(() => {
    // Create animated stars
    if (starsRef.current) {
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
               position: absolute;
               width: ${Math.random() * 2 + 1}px;
               height: ${Math.random() * 2 + 1}px;
               background: white;
               border-radius: 50%;
               left: ${Math.random() * 100}%;
               top: ${Math.random() * 100}%;
               animation: twinkle ${Math.random() * 3 + 2}s infinite;
               animation-delay: ${Math.random() * 3}s;
               box-shadow: 0 0 ${Math.random() * 3 + 2}px rgba(255, 255, 255, 0.8);
            `;
        starsRef.current.appendChild(star);
      }
    }
  }, []);

  useEffect(() => {
    if (!folderName || !showGuestPhotos) {
      setLoadingPhotos(false);
      return;
    }

    const fetchGuestPhotos = async () => {
      try {
        const response = await fetch(`/api/guest/fetch-photos/${folderName}`);
        const data: FileDriveResponse = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching guest photos:', error);
      } finally {
        setLoadingPhotos(false);
      }
    };

    fetchGuestPhotos();
  }, [folderName, showGuestPhotos]);

  useEffect(() => {
    try {
      const fetchAdminToggles = async () => {
        const response = await fetch('/api/admin');
        const data = await response.json();
        setShowGuestPhotos(data.show_photos ?? false);
        setEnableEvent(data.event_enabled ?? false);
        setLoading(false);

        if (data.show_photos) {
          setLoadingPhotos(true);
        }
      };
      fetchAdminToggles();
    } catch (error) {
      console.error('Error fetching admin toggles:', error);
    }
  }, []);

  if (loading || (showGuestPhotos && loadingPhotos)) {
    return (
      <div
        className='relative min-h-screen w-full text-gray-100 overflow-hidden flex items-center justify-center opacity-100 transition-opacity duration-700'
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div ref={starsRef} className='absolute inset-0 pointer-events-none z-10' />

        <div className='absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.15)_0%,transparent_50%)]' />
        <div className='w-full flex justify-center animate-fadeIn'>
          <Image
            src={interstellarLogo}
            alt='Loading...'
            width={180}
            height={180}
            className='animate-pulse-scale'
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className='relative min-h-screen w-full text-gray-100 overflow-hidden'
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div ref={starsRef} className='absolute inset-0 pointer-events-none z-10' />

        <div className='absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.15)_0%,transparent_50%)]' />

        <div className='relative z-30 flex flex-col mx-auto min-h-screen'>
          <main className='lg:flex flex-1 min-h-screen relative flex-col items-center justify-center lg:px-72 px-6 overflow-hidden'>
            {!enableEvent ? (
              <div
                className='w-full max-w-2xl mb-5 animate-fadeInUp'
                style={{ animationDelay: '0.9s' }}
              >
                <>
                  <div className='animate-fadeInDown w-full flex justify-center'>
                    <div className='w-full'>
                      <Image
                        src={PRLogo}
                        alt='Interstellar Gala 2025 logo'
                        width={600}
                        height={600}
                        className='mt-3 h-auto mx-auto w-40 md:w-52'
                        priority
                      />
                    </div>
                  </div>
                  <div className='animate-fadeInDown w-full flex justify-center'>
                    <div className='w-full max-w-2xl'>
                      <Image
                        src={interstellarLogo}
                        alt='Interstellar Gala 2025 logo'
                        width={600}
                        height={600}
                        className='w-full h-auto mx-auto mb-5'
                        priority
                      />
                    </div>
                  </div>
                  <p className='text-center pb-3'>
                    We&apos;re excited to welcome you.
                    <br />
                    Get ready for an unforgettable celestial celebration.
                  </p>
                </>
                <div className='space-y-6 mt-2'>
                  {/* Venue */}
                  <div className='text-center'>
                    <div className='text-sm text-yellow-500 uppercase tracking-wider font-semibold mb-2'>
                      Venue
                    </div>
                    <div className='text-xl text-white-500 text-center mt-5 mb-1 font-semibold tracking-widest uppercase animate-fadeIn'>
                      Grand Xing Imperial Hotel
                    </div>
                    <div className='text-lg text-white uppercase animate-fadeIn'>
                      Pearl One and Two Ballroom
                    </div>
                  </div>
                  {/* Divider */}
                  <div className='flex items-center gap-4'>
                    <div className='flex-1 h-px bg-linear-to-r from-transparent via-yellow-600/50 to-transparent'></div>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    <div className='flex-1 h-px bg-linear-to-r from-transparent via-yellow-600/50 to-transparent'></div>
                  </div>
                  {/* Date */}
                  <div className='text-center'>
                    <div className='text-sm text-yellow-500 uppercase tracking-wider font-semibold mb-2'>
                      Date
                    </div>
                    <div className='text-xl text-white-500 text-center mt-5 font-semibold tracking-widest uppercase mb-8 animate-fadeIn'>
                      December 5, 2025
                    </div>
                  </div>

                  {/* Divider */}
                  <div className='flex items-center gap-4'>
                    <div className='flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent'></div>
                    <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                    <div className='flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent'></div>
                  </div>

                  {/* Time */}
                  <div className='text-center'>
                    <div className='text-sm text-yellow-500 uppercase tracking-wider font-semibold mb-2'>
                      Time
                    </div>
                    <div className='text-xl text-white-500 text-center mt-5 font-semibold tracking-widest uppercase mb-8 animate-fadeIn'>
                      5:00 PM
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className='relative z-30 w-full pt-5'>
                  <div className='flex w-full items-center justify-between animate-fadeIn'>
                    <Image
                      src={PRLogo}
                      alt='PR Silver logo'
                      width={500}
                      height={500}
                      className='h-auto w-24 md:w-32 lg:w-40'
                      priority
                    />
                    <Image
                      src={interstellarLogo}
                      alt='Interstellar Gala 2025 logo'
                      width={350}
                      height={350}
                      className='h-auto w-40 md:w-40 lg:w-40'
                      priority
                    />
                  </div>
                </div>

                {/* guest photos gallery */}
                {showGuestPhotos && data?.files ? (
                  <div className='w-full max-w-xl mt-6 overflow-hidden'>
                    <div className='w-full mb-5 overflow-hidden bg-black/10 pt-4'>
                      <div className='relative w-full h-[55vh]'>
                        <Image
                          src={`https://lh3.googleusercontent.com/d/${data.files[currentIndex].id}`}
                          alt={data.files[currentIndex].name}
                          fill
                          className='object-contain'
                          sizes='(max-width: 768px) 100vw, 600px'
                        />
                      </div>
                    </div>

                    <div className='flex lg:justify-center gap-2 overflow-x-auto py-6 px-1 absolute bottom'>
                      {data.files.map((file, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`shrink-0 border-2 ${
                            currentIndex === idx ? 'border-yellow-400' : 'border-transparent'
                          }`}
                        >
                          <Image
                            src={`https://lh3.googleusercontent.com/d/${file.id}`}
                            alt={file.name}
                            width={80}
                            height={80}
                            className='h-20 w-20 object-cover'
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className='h-[75vh] flex flex-col items-center justify-center text-gray-300 lg:text-xl max-w-2xl animate-fadeIn font-medium'
                    style={{ animationDelay: '0.7s' }}
                  >
                    {/* Video Section */}
                    <p className='text-center pb-5'>
                      We&apos;re thrilled to have you here.
                      <br />
                      Join us for an unforgettable celestial celebration.
                    </p>

                    <div className='rounded-2xl overflow-hidden shadow-2xl'>
                      <video
                        ref={videoRef}
                        controls
                        autoPlay
                        onPlay={handlePlay}
                        className='h-full w-full object-cover'
                      >
                        <source src='/sample-welcome.mp4' type='video/mp4' />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
