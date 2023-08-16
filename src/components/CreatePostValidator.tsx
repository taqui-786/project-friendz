




import {z} from 'zod'


export const postValidator = z.object({
    title: z
    .string()
    .min(3,{message:'Title must be longer than 3 characters'})
    .max(60,{message:'Title not more  than 60 characters'}),
    userId: z.string(),
    content: z.any(),
})
export type PostCreationRequest = z.infer<typeof postValidator>