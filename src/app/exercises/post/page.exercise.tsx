import {Post} from '@/lib/type'
import Posts from './posts'

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('http://localhost:3000/exercises/api/posts')
  return await response.json()
}

const Page = () => {
  return <Posts fetchPosts={fetchPosts()} />
}

export default Page
