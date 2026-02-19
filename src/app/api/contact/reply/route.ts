import { NextResponse } from 'next/server'
import { updateContactSubmission } from '@/lib/appwrite'
import { sendMail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const { submissionId, to, subject, message } = await request.json()
    if (!submissionId || !to || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate SMTP envs to provide clearer errors
    const missing: string[] = []
    for (const key of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']) {
      if (!process.env[key]) missing.push(key)
    }
    if (missing.length) {
      return NextResponse.json({ error: `Email service not configured. Missing: ${missing.join(', ')}` }, { status: 500 })
    }

    try {
      await sendMail({ to, subject, html: message.replace(/\n/g, '<br/>') })
    } catch (mailErr: any) {
      console.error('SMTP send error:', mailErr)
      const msg = typeof mailErr?.message === 'string' ? mailErr.message : 'Failed to send email'
      return NextResponse.json({ error: msg }, { status: 502 })
    }

    await updateContactSubmission(submissionId, { status: 'responded' })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Reply send error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 