'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { RegisterBodyType, RegisterBody } from '@/libs/utils'

export default function SignUpTemplates() {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  function onSubmit(values: RegisterBodyType) {
    console.log(values)
  }

  return (
    <div className={'flex flex-col gap-5 justify-center items-center pt-32'}>
      <div className={'w-[400px]'}>
        <h1 className={'text-5xl font-black text-center'}>Create Your Otomata Account</h1>
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder='Enter confirm password' type={'password'} {...field} />
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
    </div>
  )
}
