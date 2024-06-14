import sendgrid from '@sendgrid/mail'
import { NextResponse } from 'next/server'
import envConfig from '@/config'
import { ContactBodyType } from '@/libs/utils'

sendgrid.setApiKey(envConfig.NEXT_PUBLIC_SENDGRID_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { email, message, subject, fullName, company } = body as ContactBodyType
  try {
    await sendgrid.send({
      from: 'quanvihong@gmail.com',
      subject: `contact`,
      to: [email, 'quanvihong@gmail.com'],
      html: `
                <div>
                    <h1>Contact With Me</h1>
                    <section>${fullName}</section><br/>
                    <section>${company}</section><br/>
                    <section>${email}</section><br/>
                    <section>${subject}</section><br/>
                    <section>${message}</section>
                </div>
            `
    })
    return new NextResponse('Email sent', { status: 200 })
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.statusCode || 500 })
  }
}
