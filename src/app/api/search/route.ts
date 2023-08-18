import { db } from '@/lib/Prisma.db';
import {NextResponse} from 'next/server'


export const GET = async (req: Request) =>{
const {searchParams} = new URL(req.url);
var data = searchParams.get('value');
if(data === '') return NextResponse.json({message:"error",status:201})
try {
    const users = await db.user.findMany({
        where: {
            OR: [
              {
                username: {
                  contains: data as string, // Search for users with names containing the searchTerm
                  mode: 'insensitive'
                },
              },
            ],
          },
          take: 5
    })
    return NextResponse.json(users,{status:201})
} catch (error) {
    return NextResponse.json({ message: 'Internal server error',error });
}
}
