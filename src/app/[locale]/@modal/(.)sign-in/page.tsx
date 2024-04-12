'use client'
import {
  Dialog,
  DialogContent,
} from '@/components/atoms/dialog'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  function onDismiss(open: boolean) {
    if (!open) {
      router.back()
    }
  }
  return (
    <Dialog defaultOpen={true} onOpenChange={onDismiss}>
      <DialogContent>Sign In</DialogContent>
    </Dialog>
  )
}
