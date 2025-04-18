import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  author?: string;
  link: string;
  slug: string;
  jetpack_featured_media_url?: string;
}

export default function BlogCardWP(props: { post: WPPost }) {
  const { post } = props;
  return (
    <div className='postCard text-white mx-10 flex flex-row gap-10 pb-10   '>
      <div className='flex flex-col md:flex-row mt-12 justify-between w-full'>
        {/*Left Div*/}
        <div className='w-full md:w-[60%]  flex'>
          {post.jetpack_featured_media_url ? (
            <img
              src={post.jetpack_featured_media_url}
              alt={post.title.rendered}
              className='rounded-2xl'
            />
          ) : (
            <div className='rounded-2xl bg-gray-800 w-full aspect-[16/9] flex items-center justify-center'>
              No Image
            </div>
          )}
        </div>
        {/*Right Div*/}
        <div className='w-full md:w-[40%] flex flex-col md:ml-14 my-4 mr-4 space-y-4'>
          <Link href={`/blogs/${post.slug}`}>
            <h2 className='text-xl md:text-3xl  text-white font-bold  cursor-pointer'>
              {post.title.rendered.replace(/&nbsp;/g, ' ')}
            </h2><br/>
            <p
            className='text-justify text-gray-400 leading-relaxed w-[95%]'
          ></p>
          </Link>
          <div className='flex flex-row w-full space-x-2'>
            <div className='flex items-center text-2xl'>
              <CgProfile />
            </div>
            <h3 className='flex'>Prometheus</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
