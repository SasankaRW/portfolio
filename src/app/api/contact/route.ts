import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // 1. Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 2. Check for SMTP configuration
        // In a real scenario, you'd use these env vars.
        // For this demo, if they aren't set, we'll simulate success.
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('------------------------------------------------');
            console.log('⚠️  SMTP credentials not found in env variables.');
            console.log('📧 SIMULATING EMAIL SENDING:');
            console.log('FROM:', email);
            console.log('NAME:', name);
            console.log('MESSAGE:', message);
            console.log('------------------------------------------------');

            // Artificial delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json(
                { message: 'Message received (Simulation Mode). Configure SMTP to send real emails.' },
                { status: 200 }
            );
        }

        // 3. Configure Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // correctly parse "false" string
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 4. Send Email
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.SMTP_TO || process.env.SMTP_USER, // Default to sending to yourself
            replyTo: email,
            subject: `[Portfolio] New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: monospace; color: #333; padding: 20px;">
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr/>
                    <p><strong>Message:</strong></p>
                    <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</pre>
                </div>
            `
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        // Cast error to any to access properties safely
        const errorMessage = (error as any)?.message || 'Unknown error';
        return NextResponse.json(
            { error: `Failed to send email: ${errorMessage}` },
            { status: 500 }
        );
    }
}
