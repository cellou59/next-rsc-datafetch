'use client'
import {Post} from '@/lib/type'
import {use} from 'react'

const Posts = ({fetchPosts}: {fetchPosts: Promise<Post[]>}) => {
  const posts = use<Post[]>(fetchPosts)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
    </div>
  )
}

export default Posts
