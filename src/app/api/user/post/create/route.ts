





import { postValidator } from '@/components/CreatePostValidator'
import { db } from '@/lib/Prisma.db'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, content } = postValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

 

    await db.post.create({
      data: {
        title,
        content,
        //@ts-ignore
        authorId: session.user.id,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post Error :'+error,
      { status: 500 }
    )
  }
}