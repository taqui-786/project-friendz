import { LocationAndBioValidator } from '@/lib/NewUserFormValidator'
import { db } from '@/lib/Prisma.db'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    // const { location , Bio } = LocationAndBioValidator.parse(body)

    // check if username is taken
    const usernameExist = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    if (!usernameExist) {
      return new Response('User does not exist', { status: 401 })
    }

    // update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: body.uploading.file.url
      },
    })

    return new Response('OK')
  } catch (error) {
    (error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not update username at this time. Please try later',
      { status: 500 }
    )
  }
}