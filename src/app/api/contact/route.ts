import { NextResponse } from 'next/server';
import { getStore, saveStore, ContactMessage } from '@/lib/store';
import { sendEmailToGmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos.' },
        { status: 400 }
      );
    }

    const store = getStore();

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'unread',
      emailSentToGmail: false
    };

    // Attempt to send email to Gmail
    const emailResult = await sendEmailToGmail(newMessage);
    newMessage.emailSentToGmail = emailResult.success;

    // Save message to store
    store.messages.unshift(newMessage);
    saveStore(store);

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido correctamente.',
      data: newMessage
    });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu solicitud.' },
      { status: 500 }
    );
  }
}
