"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  identifier: z.string().email("Username must be at least 2 characters."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function Page() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const res = await signIn("login", {
        identifier: values.identifier,
        password: values.password,
        redirect: false
      });
      switch (res?.status) {
        case 401: toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your email or password",
        })
          break;
        case 200: toast({
          variant: 'default',
          description: "Your are logged in",
        });
          router.push('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem className=" space-y-1" >
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Inter Your Real Email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className=" space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This Password should be contain characters and numbers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>Submit</Button>
        </form>
      </Form>
      {/* <Button onClick={() => signIn('google', {
        redirect: true,
        callbackUrl: '/'
      })}>
        Sign in with Google
      </Button> */}
      <p className=" capitalize mt-1">not have an account? <Link className=" text-blue-500" href={'/register'}>create once</Link></p>
    </div>
  )
}

export default Page