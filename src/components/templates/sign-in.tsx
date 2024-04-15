'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { LoginBodyType, LoginBody } from '@/libs/utils'
import NavigationLink from '@/components/atoms/navigation-link'

export default function SignInTemplates() {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  function onSubmit(values: LoginBodyType) {
    console.log(values)
  }

  return (
    <div className={'flex flex-col gap-5 justify-center items-center'}>
      <div className={'w-[400px]'}>
        <h1 className={'text-5xl font-black text-center'}>Log in to Otomata</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 max-w-[600px] flex-shrink-0 w-full'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Enter password' type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className={'w-full !mt-10'}>
            Submit
          </Button>
        </form>
      </Form>
      <div className={'flex justify-center items-center py-8'}>
        <NavigationLink href={'/sign-up'}>{"Don't have an account? Sign Up"}</NavigationLink>
      </div>
    </div>
  )
}
