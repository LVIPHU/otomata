'use client'
import { Dialog, DialogContent } from '@/components/atoms/dialog'
import { useRouter } from 'next/navigation'
import SignInTemplates from '@/components/templates/sign-in'
import useMediaQuery from '@/hooks/use-media-query'
import { Drawer, DrawerContent } from '@/components/atoms/drawer'

export default function SignIn() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const router = useRouter()
  function onDismiss(open: boolean) {
    if (!open) {
      router.back()
    }
  }
  if (isDesktop) {
    return (
      <Dialog defaultOpen={true} onOpenChange={onDismiss}>
        <DialogContent>
          <SignInTemplates />
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Drawer open={true} onOpenChange={onDismiss}>
        <DrawerContent className={'p-8'}>
          <SignInTemplates />
        </DrawerContent>
      </Drawer>
    )
  }
}
