import { z } from 'zod'

export const PostVoteValidator = z.object({
  postId: z.string(),
})

export type PostVoteRequest = z.infer<typeof PostVoteValidator>


export const FollowUserValidator = z.object({
  toFollowId: z.string(),
})

export type FollowUserRequest = z.infer<typeof FollowUserValidator>