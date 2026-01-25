import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;

        // Check availability of API Key
        if (!apiKey || apiKey.includes('your_api_key_here')) {
            console.warn('⚠️ RESEND_API_KEY is missing or invalid.');
            return NextResponse.json(
                {
                    message: 'Configuration Error: RESEND_API_KEY is missing. Please check .env.local file.'
                },
                { status: 500 }
            );
        }

        try {
            const data = await resend.emails.send({
                from: 'Portfolio Contact <onboarding@resend.dev>', // Use default until user configures custom domain
                to: 'sasankarw@gmail.com', // Explicitly set to user's email
                replyTo: email,
                subject: `[Portfolio] New Message from ${name}`,
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

            if (data.error) {
                console.error('Resend API Error:', data.error);
                return NextResponse.json({ error: data.error.message }, { status: 500 });
            }

            return NextResponse.json({ message: 'Email sent successfully', id: data.data?.id }, { status: 200 });

        } catch (emailError: any) {
            console.error('Resend Send Error:', emailError);
            return NextResponse.json({ error: emailError.message }, { status: 500 });
        }

    } catch (error) {
        console.error('Request processing error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
