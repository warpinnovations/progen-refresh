import Link from 'next/link';
import localFont from 'next/font/local';
import { Rajdhani, Oxanium } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  author?: string;
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}

export default function BlogCardWP({ post }: { post: WPPost }) {
  const title = post.title.rendered.replace(/&nbsp;/g, ' ');

  return (
    <Link href={`/blogs/${post.slug}`} className="group block h-full">
      <div
        className="relative h-full rounded-xl overflow-hidden border transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,15,0.9), rgba(20,18,14,0.85))',
          borderColor: 'rgba(150, 137, 95, 0.12)',
          boxShadow: '0 8px 30px -5px rgba(0,0,0,0.5)',
        }}
      >
        {/* Hover border glow via pseudo overlay */}
        <div
          className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1.5px rgba(150, 137, 95, 0.45), 0 20px 50px -10px rgba(150, 137, 95, 0.2)',
          }}
        />

        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          {post.jetpack_featured_media_url ? (
            <img
              src={post.jetpack_featured_media_url}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'rgba(150, 137, 95, 0.05)' }}
            >
              <span className="text-[#96895F]/30 text-4xl">◈</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div
            className={`${OxaniumFont.className} text-[#96895F] text-[10px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-2`}
          >
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            Prometheus
          </div>

          <h2
            className={`${MoonlanderFont.className} text-white text-sm sm:text-base md:text-lg font-black uppercase leading-tight mb-4 transition-colors duration-300 group-hover:text-[#96895F]`}
          >
            {title}
          </h2>

          <div
            className={`${OxaniumFont.className} text-[10px] sm:text-xs uppercase tracking-[0.15em] font-bold flex items-center gap-2 text-[#96895F]/40 group-hover:text-[#D4AF37] transition-colors duration-300`}
          >
            <span>Read Article</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      </div>
    </Link>
  );
}
