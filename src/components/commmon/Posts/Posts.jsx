import React from 'react'
import Loading from '../../Loading/Loading';
import PostCard from './PostCard';
import { Blog } from '../../../Context/Context';

const Posts = () => {
  const {postData, postLoading} = Blog();
  return (
    <section className='w-[32rem] p-3 sm:p-0 md:w-[70rem] lg:w-[90%] sm:mx-auto flex flex-col gap-[3rem] sm:mt-[3rem] '>
      <h1 className='text-5xl font-semibold border-b-2 py-[1rem]'>Blogs</h1>
      {
        postLoading ? <Loading/> : postData && postData.map((post, i) => <PostCard key={i} post={post} />)
      }
    </section>
  )
}

export default Posts