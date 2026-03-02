'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

const PER_PAGE = 100;

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  author?: string;
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();

// ========== FEATURED POST ==========
const FeaturedPost = ({ post }: { post: WPPost }) => {
  const title = post.title.rendered.replace(/&nbsp;/g, ' ');
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 200);

  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          minHeight: '320px',
          border: '1.5px solid rgba(150, 137, 95, 0.2)',
          boxShadow: '0 25px 70px -15px rgba(0,0,0,0.8)',
        }}
      >
        {/* Background image */}
        {post.jetpack_featured_media_url ? (
          <img
            src={post.jetpack_featured_media_url}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1a14] to-black" />
        )}

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Gold hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 90% at 10% 60%, rgba(150, 137, 95, 0.12) 0%, transparent 70%)',
          }}
        />

        {/* Hover border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1.5px rgba(212, 175, 55, 0.4)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8 md:p-12 lg:p-14" style={{ minHeight: '320px' }}>
          {/* Badge */}
          <motion.div
            className={`${OxaniumFont.className} inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-bold mb-4 w-fit`}
            style={{ color: '#D4AF37' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"
              style={{ boxShadow: '0 0 8px rgba(212,175,55,0.9)' }}
            />
            Featured Article
          </motion.div>

          {/* Title */}
          <h2
            className={`${MoonlanderFont.className} text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-4 max-w-3xl transition-colors duration-300 group-hover:text-[#f5e9c0]`}
          >
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p
              className={`${RajdhaniFont.className} text-white/55 text-sm sm:text-base md:text-lg max-w-2xl mb-6 leading-relaxed hidden sm:block`}
              style={{ letterSpacing: '0.03em' }}
            >
              {excerpt}
              {excerpt.length >= 200 ? '…' : ''}
            </p>
          )}

          {/* CTA */}
          <div
            className={`${OxaniumFont.className} text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-colors duration-300`}
            style={{ color: '#96895F' }}
          >
            <span className="group-hover:text-[#D4AF37] transition-colors duration-300">Read Article</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300 group-hover:text-[#D4AF37]">→</span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none">
          <div className="w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/35 rounded-tr-lg" />
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-none">
          <div className="w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/25 rounded-bl-lg" />
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ boxShadow: '0 0 15px rgba(212,175,55,0.5)' }}
        />
      </motion.div>
    </Link>
  );
};

// ========== MAIN SECTION ==========
const MainSectionBlogsWP = (props: { data: WPPost[] }) => {
  const { data } = props;
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
    }
  };

  if (!data && allPosts.length === 0) {
    return <LoadingState message="Loading blog posts..." />;
  }

  const displayPosts = (allPosts.length > 0 ? allPosts : data || []).slice().reverse();
  const featuredPost = displayPosts[0];
  const remainingPosts = displayPosts.slice(1);

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

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            {/* Facebook */}
            <motion.a
              href="https://www.facebook.com/PrometheusPr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full transition-colors duration-300"
              style={{
                background: 'rgba(24,119,242,0.1)',
                border: '1px solid rgba(24,119,242,0.3)',
              }}
              animate={{ boxShadow: ['0 0 0px rgba(24,119,242,0)', '0 0 12px rgba(24,119,242,0.35)', '0 0 0px rgba(24,119,242,0)'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(24,119,242,0.18)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" style={{ color: '#1877F2' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className={`${OxaniumFont.className} text-[10px] uppercase tracking-[0.18em] font-bold`} style={{ color: '#1877F2' }}>
                Facebook
              </span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/company/prometheusph/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full transition-colors duration-300"
              style={{
                background: 'rgba(10,102,194,0.1)',
                border: '1px solid rgba(10,102,194,0.3)',
              }}
              animate={{ boxShadow: ['0 0 0px rgba(10,102,194,0)', '0 0 12px rgba(10,102,194,0.35)', '0 0 0px rgba(10,102,194,0)'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(10,102,194,0.18)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" style={{ color: '#0A66C2' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className={`${OxaniumFont.className} text-[10px] uppercase tracking-[0.18em] font-bold`} style={{ color: '#0A66C2' }}>
                LinkedIn
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURED POST ========== */}
      {featuredPost && (
        <section className="relative pb-6 sm:pb-8 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <CSSStars />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* ========== BLOG GRID ========== */}
      <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Section label */}
          {remainingPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold flex items-center gap-3 mb-8`}
            >
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#96895f]" />
              <span>More Articles</span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#96895f]/40 to-transparent" />
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {remainingPosts.map((post, i) => (
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
