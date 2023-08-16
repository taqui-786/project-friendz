import { z } from 'zod'

export const CommentValidator = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional()
})

export type CommentRequest = z.infer<typeof CommentValidator>



export const CommentVoteValidator = z.object({
  commentId: z.string(),
})

export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>