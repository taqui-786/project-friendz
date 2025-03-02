"use client";
import React, { useState } from "react";
import { NewUserNextStepBtn } from "../button/NewUserButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { LocationAndBioValidator } from "@/lib/NewUserFormValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

type FormData = z.infer<typeof LocationAndBioValidator>;

function Signup3() {
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(LocationAndBioValidator),
    defaultValues: {
      location: "",
      Bio: "",
    },
 
  });

  // 2. Define a submit handler.
  const { mutate: AddLocationAndBio, isLoading } = useMutation({
    mutationFn: async ({ location, Bio }: FormData) => {
      const payload: FormData = { location, Bio };

      const { data } = await axios.patch(`/api/user/aboutme/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
        return toast.error(' Please enter properly')
      }
      }

      return toast.error('Something went wrong.')
      
    },
    onSuccess: () => {
      setIsDisabled(false);
      router.refresh();
      toast.success('Location and Bio Added.')
    },
  });

  return (
    <>
      <div className="w-full  bg-white common_border_e8 rounded-lg p-[30px] font-sans ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => AddLocationAndBio(e))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city,state..." {...field} />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> About me</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your short biography"
                      className="max-h-[27px] resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="custom"
              isLoading={isLoading}
              className="mt-1"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <NewUserNextStepBtn next={3} prev={1} disable={isDisabled} />
    </>
  );
}

export default Signup3;
