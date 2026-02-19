import nodemailer from 'nodemailer'

export type OutboundEmail = {
  to: string
  subject: string
  text?: string
  html?: string
}

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env var ${name}`)
  return value
}

// Create a cached transporter (Next.js hot reload safe)
let cachedTransporter: nodemailer.Transporter | null = null

export function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  const host = required('SMTP_HOST')
  const port = Number(process.env.SMTP_PORT || 587)
  const user = required('SMTP_USER')
  const pass = required('SMTP_PASS')

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  })
  return cachedTransporter
}

export async function sendMail({ to, subject, text, html }: OutboundEmail) {
  const from = process.env.MAIL_FROM || required('SMTP_USER')
  const transporter = getTransporter()
  await transporter.sendMail({ from, to, subject, text, html })
}

export function adminEmail(): string {
  return process.env.NEXT_PUBLIC_ADMIN_EMAIL || required('MAIL_TO')
} 