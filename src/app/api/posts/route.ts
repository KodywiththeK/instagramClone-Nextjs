import { createPost, getFollowingPosts } from '@/service/posts'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)
  const user = session?.user
  // 401 코드는 unAuthorized 를 명시함
  if (!user) return new Response('Authentication Error', { status: 401 })

  return getFollowingPosts(user.username).then((data) => NextResponse.json(data))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  // 401 코드는 unAuthorized 를 명시함
  if (!user) return new Response('Authentication Error', { status: 401 })

  const form = await req.formData()
  const text = form.get('text')?.toString()
  const file = form.get('file') as Blob

  if (!text || !file) return new Response('Bad Request', { status: 400 })

  return createPost(user.id, text, file).then((data) => NextResponse.json(data))
}
