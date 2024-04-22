'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { LoginBodyType, LoginBody } from '@/libs/utils'
import NavigationLink from '@/components/atoms/navigation-link'
import { useFirebaseContext } from '@/provider/firebase-auth'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useRouter } from '@/libs/next-intl/navigation'

export default function SignInTemplates() {
  const router = useRouter()
  const { auth } = useFirebaseContext()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginBodyType) {
    try {
      const { username, password } = values
      const credential = await signInWithEmailAndPassword(auth, username, password)
      if (credential.user) {
        router.back()
      }
    } catch (error) {
      // @ts-ignore
      switch (error.code) {
        case 'auth/invalid-email':
          console.error('Invalid email')
          break
        case 'auth/user-not-found':
          console.error('No account with that email was found.')
          break
        case 'auth/wrong-password':
          console.error('Incorrect password')
          break
        default:
          console.error('Email or password was incorrect.')
          break
      }
    }
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
