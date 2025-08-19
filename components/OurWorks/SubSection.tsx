'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { workData } from '@/app/contants';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AiFillPlayCircle } from 'react-icons/ai';
import Header from '@/components/Global/HeaderHero';
import PageTitle from '@/components/Global/PageTitle';
import Link from 'next/link';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';
import Footer from '@/components/Global/Footer';
import Navbar from '../Global/Navbar';
import AboutContactSection from '../About/AboutContactSection';

const SubSectionPage = () => {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getIndex = searchParams?.get('index') as string;

  const selectedIndex = Number(getIndex);
  const hasValidIndex = Number.isFinite(selectedIndex) && workData[selectedIndex] !== undefined;

  const selectedWork = hasValidIndex ? workData[selectedIndex] : null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePlayKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenModal();
    }
  };

  if (!hasValidIndex || !selectedWork) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Header />
        <div className='mt-5 relative h-auto'>
          <PageTitle title='Works' />
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <Link
              href={`/works`}
              className='text-white/70 hover:text-white transition-colors duration-300'
            >
              <button className='flex items-center space-x-2 cursor-pointer pt-5'>
                <HiOutlineArrowNarrowLeft className='h-6 w-6' />
                <span className='font-bold font-ox'>BACK TO WORKS</span>
              </button>
            </Link>
            <div className='text-center py-20'>
              <p className='text-white/70 text-lg'>The selected work could not be found.</p>
            </div>
          </div>
        </div>
        <div className='pt-16'>
          <ThreeColumnFooter />
          <Footer />
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Navbar />
        <Header />
        <div className='mt-5 relative h-auto'>
          <PageTitle title='Works' />
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <Link
              href={`/works`}
              className='text-white/70 hover:text-white transition-colors duration-300'
            >
              <button className='flex items-center space-x-2 cursor-pointer pt-5 mb-10'>
                <HiOutlineArrowNarrowLeft className='h-6 w-6' />
                <span className='font-bold font-ox'>BACK TO WORKS</span>
              </button>
            </Link>

            <div className='w-full aspect-video flex justify-center items-center relative group rounded-lg overflow-hidden'>
              <div
                className='absolute z-10 w-20 h-20 md:w-24 md:h-24 text-white cursor-pointer transform group-hover:scale-110 transition-transform duration-300'
                onClick={handleOpenModal}
                onKeyDown={handlePlayKeyDown}
                role='button'
                tabIndex={0}
                aria-label='Play project video'
              >
                <AiFillPlayCircle className='w-full h-full' />
              </div>
              <img
                src={selectedWork.img}
                alt={`${selectedWork.title} cover image`}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/50'></div>
              <div className='absolute bottom-0 left-0 p-8 md:p-12'>
                <h1 className='text-white text-2xl md:text-5xl lg:text-6xl font-ox font-black'>
                  {selectedWork.title.toLocaleUpperCase()}
                </h1>
                <p className='text-white text-base md:text-2xl font-ox mt-2'>
                  {selectedWork.description}
                </p>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 p-4'>
              <div className='relative w-full max-w-4xl'>
                <button
                  className='absolute -top-10 right-0 text-white hover:text-gray-300'
                  onClick={handleCloseModal}
                  aria-label='Close video'
                >
                  <IoMdCloseCircleOutline className='w-8 h-8' />
                </button>
                <div className='player-wrapper'>
                  {selectedWork.videoLink ? (
                    <ReactPlayer
                      className='react-player'
                      controls
                      playing
                      url={selectedWork.videoLink}
                      width='100%'
                      height='100%'
                    />
                  ) : (
                    <Carousel showThumbs={false} showStatus={false}>
                      {selectedWork.images?.map((image: string, idx: number) => (
                        <div key={`${selectedIndex}-${idx}`}>
                          <img src={image} alt={`${selectedWork.title} image ${idx + 1}`} />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16'>
            <section className='max-w-3xl mx-auto text-center'>
              <h2 className='text-white text-3xl md:text-4xl font-ox font-black'>
                Project Overview
              </h2>
              <p className='text-white/80 leading-relaxed mt-4 text-lg'>
                {selectedWork.title} showcases how we align brand objectives with audience insights
                to produce meaningful outcomes. This project highlights the strategy and execution
                behind our creative and media approach, demonstrating a full-funnel solution that
                drove both brand equity and performance metrics.
              </p>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              <div className='space-y-4'>
                <h3 className='text-white text-2xl md:text-3xl font-ox font-bold'>Challenge</h3>
                <p className='text-white/80 leading-relaxed'>
                  The brand needed to drive measurable engagement while preserving its identity in a
                  saturated market. Key challenges included overcoming audience fatigue, unifying a
                  fragmented digital presence, and demonstrating clear ROI on creative investments.
                  The primary goal was to elevate brand perception and connect with a younger
                  demographic without alienating their loyal customer base.
                </p>
              </div>
              <div className='space-y-4'>
                <h3 className='text-white text-2xl md:text-3xl font-ox font-bold'>Approach</h3>
                <p className='text-white/80 leading-relaxed'>
                  We developed a unified creative direction supported by data-informed targeting.
                  Our approach began with an in-depth audience segmentation analysis to identify key
                  motivators. This led to a multi-platform content strategy that ensured consistent
                  storytelling from high-production hero assets down to reactive, everyday
                  micro-content. Every piece was designed to be modular and adaptable for various
                  channels.
                </p>
              </div>
            </section>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              <section className='space-y-4'>
                <h3 className='text-white text-2xl md:text-3xl font-ox font-bold'>Results</h3>
                <ul className='list-disc list-inside space-y-3 text-white/80'>
                  <li>
                    Achieved a significant and clear brand lift, with post-campaign surveys showing
                    a 25% improvement in brand recall and consideration among target demographics.
                  </li>
                  <li>
                    Generated substantially higher view-through rates across all key audience
                    segments, exceeding industry benchmarks by an average of 40% on video platforms.
                  </li>
                  <li>
                    Drove stronger on-site engagement, evidenced by a 15% uplift in time-on-page and
                    a notable decrease in bounce rate for campaign landing pages.
                  </li>
                </ul>
              </section>

              <section className='space-y-4'>
                <h3 className='text-white text-2xl md:text-3xl font-ox font-bold'>What’s Next</h3>
                <p className='text-white/80 leading-relaxed'>
                  Building on these powerful insights, we’re now focused on the next phase of
                  growth. This involves expanding into iterative A/B creative testing to refine
                  messaging further and implementing deeper funnel optimization to convert
                  heightened engagement into direct conversions. We are also exploring new
                  interactive formats to sustain momentum and foster a more dynamic community around
                  the brand.
                </p>
              </section>
            </div>

            <section className='text-center pt-10'>
              <Link href='/contact'>
                <AboutContactSection />
              </Link>
            </section>
          </div>
        </div>

        <div className='pt-16'>
          <ThreeColumnFooter />
          <Footer />
        </div>
      </>
    </Suspense>
  );
};

export default SubSectionPage;
