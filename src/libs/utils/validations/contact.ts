import z from 'zod'

export const ContactBody = z.object({
  fullName: z.string().min(2).max(256),
  company: z.string().min(2).max(256),
  email: z.string().trim().email(),
  subject: z.string().min(2),
  message: z.string().min(2)
})

export type ContactBodyType = z.TypeOf<typeof ContactBody>
