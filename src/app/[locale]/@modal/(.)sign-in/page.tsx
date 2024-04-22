'use client'
import { Dialog, DialogContent } from '@/components/atoms/dialog'
import { useRouter } from 'next/navigation'
import SignInTemplates from '@/components/templates/sign-in'

export default function SignIn() {
  const router = useRouter()
  function onDismiss(open: boolean) {
    if (!open) {
      router.back()
    }
  }
  return (
    <Dialog defaultOpen={true} onOpenChange={onDismiss}>
      <DialogContent>
        <SignInTemplates />
      </DialogContent>
    </Dialog>
  )
}
