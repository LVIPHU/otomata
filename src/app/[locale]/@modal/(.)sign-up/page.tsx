'use client'
import { Dialog, DialogContent } from '@/components/atoms/dialog'
import { useRouter } from 'next/navigation'
import SignUpTemplates from '@/components/templates/sign-up'
import useMediaQuery from '@/hooks/use-media-query'
import { Drawer, DrawerContent } from '@/components/atoms/drawer'

export default function SignUpModal() {
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
          <SignUpTemplates />
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Drawer open={true} onOpenChange={onDismiss}>
        <DrawerContent className={'p-8'}>
          <SignUpTemplates />
        </DrawerContent>
      </Drawer>
    )
  }
}
