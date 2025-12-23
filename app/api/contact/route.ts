import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure nodemailer with your email service
const emailUser = process.env.EMAIL_USER || process.env.EMAIL_USERNAME;
const emailPass = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

async function sendEmail(data: any) {
  const mailOptions = {
    from: data.email,
    to: emailUser,
    subject: data.subject,
    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        error: 'Name, email, and message are required'
      }, { status: 400 })
    }

    // Send email (real implementation)
    const emailSent = await sendEmail({
      name,
      email,
      subject: subject || 'New contact from portfolio',
      message
    })

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!'
      })
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error in contact API route:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    }, { status: 500 })
  }
}