"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UsernameValidator } from "@/lib/NewUserFormValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUserNextStepBtn } from "../button/NewUserButton";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {toast} from "sonner";
type FormData = z.infer<typeof UsernameValidator>;
function Signup2({existingUsername}:{existingUsername:string}) {
const router = useRouter()
const [btnDisable , setBtnDisable] = useState(!existingUsername ? true : false)
  const form = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      username: existingUsername,
    },
    
  });
  
  
  // 2. Defining a submit handler here --.
const {mutate:updateUsername , isLoading} = useMutation({
  mutationKey:['updateUsername'],
  mutationFn: async ({ username }: FormData) => {
    const payload: FormData = { username }

    const { data } = await axios.patch(`/api/user/username/`, payload)
    return data
  },

  onError: (err) => {
    if (err instanceof AxiosError) {
      if (err.response?.status === 409) {
        form.setError('username', {
          type: 'manual',
          message: 'Username already taken.'
        })
        return
      }
    }
    form.setError('username', {
      type: 'manual',
      message: 'Something went wrong.'
    })
  },
  onSuccess: () => {
    setBtnDisable(false)
    router.refresh()
    toast.success('Username Changed successfully.')
  },
})
  return (
    <>
      <div className="w-full bg-white common_border_e8 rounded-lg p-[30px] font-sans ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((e) => updateUsername(e))} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create your Username</FormLabel>
                  <FormControl>
                    <Input placeholder="example_123" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display username.
                    
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" variant="custom" isLoading={isLoading} >Submit</Button>
          </form>
        </Form>
      </div>
      <NewUserNextStepBtn next={2} prev={0} disable={btnDisable} />    
    </>
  );
}

export default Signup2;
