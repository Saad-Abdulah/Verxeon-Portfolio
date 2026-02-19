import { NextResponse } from 'next/server'
import { createContactSubmission } from '@/lib/appwrite'
import { sendMail, adminEmail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const { name, email, company, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const created = await createContactSubmission({ name, email, company, subject, message })

    const adminHtml = `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || '—'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace">${message}</pre>
    `

    await Promise.all([
      sendMail({ to: adminEmail(), subject: `New contact: ${subject}`, html: adminHtml }),
      sendMail({
        to: email,
        subject: `Your email has been received: ${subject}`,
        html: `<p>Hi ${name},</p><p>We’ve received your message and will respond soon.</p><p>Best regards,<br/>Verxeon Team</p>`
      })
    ])

    return NextResponse.json({ ok: true, id: created.$id })
  } catch (err: any) {
    console.error('Contact submit error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 