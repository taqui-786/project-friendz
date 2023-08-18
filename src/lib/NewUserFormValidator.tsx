import { z } from "zod"

export const UsernameValidator = z.object({
    username: z.string()
    .min(3,{message: "Username must be at least 4 characters."})
    .max(20,{message: "Username not more than 20 characters.",})
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9_]+$/,{message: "Username must include any number and character ",}),
  })
  
export const LocationAndBioValidator = z.object({
  location: z.string().min(5,{message:"Location must at least 5 characters"})
  .max(45,{message:"Location not more than 15 characters."}),
  Bio: z.string().min(5,{message:"Bio must at least 5 characters"})
  .max(65,{message:"Bio not more than 25 characters."})
})
export const NewUserImageValidator = z.object({
  image: z.string()
})