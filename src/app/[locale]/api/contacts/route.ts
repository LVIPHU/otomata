import sendgrid from '@sendgrid/mail'
import { NextResponse } from 'next/server'
import envConfig from '@/config'

sendgrid.setApiKey(envConfig.NEXT_PUBLIC_SENDGRID_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const email = body.email as string
  try {
    await sendgrid.send({
      from: 'quanvihong@gmail.com',
      subject: `contact`,
      to: [email, 'quanvihong@gmail.com'],
      html: `
                <div>
                    <h1>Report for last tool run on ${new Date().toLocaleString('vi')}</h1>
                </div>
            `
    })
    return new NextResponse('Email sent', { status: 200 })
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.statusCode || 500 })
  }
}
