'use client';

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Global/Footer';
import ThreeColumnFooter from '@/components/Global/LargeBreakpointFooter';
import BlogCardWP from '@/components/Blogs/BlogPostsWP';
import LoadingState from '@/components/Global/LoadingState';
import CSSStars from '@/components/Global/CSSStars';
import FuturisticDivider from '@/components/Global/FuturisticLine';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { Oxanium, Rajdhani } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });
const RajdhaniFont = Rajdhani({ weight: '700', subsets: ['latin'] });

const BASE_API_URL =
  'https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts';
const PER_PAGE = 100;

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MainSectionBlogsWP = (props: { data: WPPost[] }) => {
  const { data } = props;
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<WPPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (data) {
      setAllPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((p) => p.id));
        const newUniquePosts = data.filter((post) => !existingIds.has(post.id));

        if (newUniquePosts.length === 0 && data.length > 0) {
          if (data.length < PER_PAGE) setHasMore(false);
          setIsLoadingMore(false);
          return prevPosts;
        }

        const updatedPosts = [...prevPosts, ...newUniquePosts];
        if (data.length === 0 || data.length < PER_PAGE) setHasMore(false);
        setIsLoadingMore(false);
        return updatedPosts;
      });
    }
  }, [data]);

  const loadMore = () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  if (!data && allPosts.length === 0) {
    return <LoadingState message="Loading blog posts..." />;
  }

  const displayPosts = allPosts.length > 0 ? allPosts : data || [];

  return (
    <div className="bg-black">
      {/* ========== HERO ========== */}
      <section className="relative flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(150, 137, 95, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div
              className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-3`}
            >
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span>Stories & Insights</span>
              <motion.div
                className="h-[1px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${MoonlanderFont.className} font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl`}
          >
            <span className="text-[#f5f5f5]">Our </span>
            <span className="text-prOrange relative">
              Blogs
              <motion.span
                className="absolute inset-0 text-prOrange blur-lg opacity-40"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Blogs
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FuturisticDivider color="#96895F" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-2 max-w-3xl mx-auto`}
            style={{ letterSpacing: '0.06em', lineHeight: '1.5', fontWeight: '500' }}
          >
            Thoughts, strategies, and stories from the Prometheus crew
          </motion.p>
        </div>
      </section>

      {/* ========== BLOG GRID ========== */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {displayPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <BlogCardWP post={post} />
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <motion.button
                onClick={loadMore}
                disabled={isLoadingMore}
                className={`${OxaniumFont.className} px-8 py-3 rounded-xl text-sm uppercase tracking-[0.15em] font-bold transition-all duration-300 disabled:opacity-50`}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(150, 137, 95, 0.15), rgba(212, 175, 55, 0.1))',
                  border: '1.5px solid rgba(212, 175, 55, 0.4)',
                  color: '#D4AF37',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.08)',
                }}
                whileHover={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoadingMore ? 'Loading...' : 'Load More'}
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10">
        <div className="md:hidden">
          <Footer />
        </div>
        <div className="hidden md:block">
          <ThreeColumnFooter />
        </div>
      </footer>
    </div>
  );
};

export default MainSectionBlogsWP;
