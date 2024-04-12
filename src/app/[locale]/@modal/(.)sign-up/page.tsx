'use client'
import {
  Dialog,
  DialogContent,
} from '@/components/atoms/dialog'
import { useRouter } from 'next/navigation'
import SignUpTemplates from '@/components/templates/sign-up'

export default function SignUpModal() {
  const router = useRouter()
  function onDismiss(open: boolean) {
    if (!open) {
      router.back()
    }
  }
  return (
    <Dialog defaultOpen={true} onOpenChange={onDismiss}>
      <DialogContent>
        <SignUpTemplates />
      </DialogContent>
    </Dialog>
  )
}
