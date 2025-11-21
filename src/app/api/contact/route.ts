import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get Web3Forms access key from environment
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not configured');
      return NextResponse.json(
        { success: false, message: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Prepare data for Web3Forms
    const web3formsData = {
      access_key: accessKey,
      name,
      email,
      message,
      subject: `New Contact Form Message from ${name}`,
      from_name: 'Portfolio Contact Form',
    };

    // Send to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(web3formsData),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Web3Forms returned non-JSON response:', await response.text());
      return NextResponse.json(
        {
          success: false,
          message: 'Email service configuration error. Please contact support.',
        },
        { status: 500 }
      );
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Web3Forms error:', result);
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Failed to send message',
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
