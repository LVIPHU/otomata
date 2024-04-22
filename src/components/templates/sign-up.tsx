'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Input } from '@/components/atoms/input'
import { RegisterBodyType, RegisterBody } from '@/libs/utils'
import NavigationLink from '@/components/atoms/navigation-link'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { useRouter } from '@/libs/next-intl/navigation'
import { useFirebaseContext } from '@/provider/firebase-auth'

export default function SignUpTemplates() {
  const router = useRouter()
  const { auth } = useFirebaseContext()
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: RegisterBodyType) {
    try {
      const { username, password } = values
      const credential = await createUserWithEmailAndPassword(auth, username, password)
      if (credential.user) {
        router.back()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={'flex flex-col gap-5 justify-center items-center'}>
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
      <div className={'flex justify-center items-center py-8'}>
        <p>
          By joining, you agree to our <NavigationLink href={'/legal/privacy-policy'}>Terms of Service</NavigationLink>{' '}
          and <NavigationLink href={'/legal/terms'}>Privacy Policy</NavigationLink>
        </p>
      </div>
    </div>
  )
}
