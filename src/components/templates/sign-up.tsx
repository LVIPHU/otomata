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
import { useTranslations } from 'next-intl'

export default function SignUpTemplates() {
  const router = useRouter()
  const { auth } = useFirebaseContext()
  const t = useTranslations('SignUp')
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
        <h1 className={'text-5xl font-black text-center'}>{t('title')}</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 max-w-[600px] flex-shrink-0 w-full'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.username.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.username.placeholder')} {...field} />
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
                <FormLabel>{t('form.password.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.password.placeholder')} type={'password'} {...field} />
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
                <FormLabel>{t('form.confirm-password.label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.confirm-password.placeholder')} type={'password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className={'w-full !mt-10'}>
            {t('actions.submit')}
          </Button>
        </form>
      </Form>
      <div className={'flex text-center justify-center items-center py-8'}>
        <p>
          {t('infor')} <NavigationLink href={'/legal/privacy-policy'}>{t('links.privacy-policy')}</NavigationLink>{' '}
          {t('and')} <NavigationLink href={'/legal/terms'}>{t('links.terms')}</NavigationLink>
        </p>
      </div>
    </div>
  )
}
