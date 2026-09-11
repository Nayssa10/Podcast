import { ContactMessage, getStore } from './store';

export async function sendEmailToGmail(message: ContactMessage): Promise<{ success: boolean; provider: string; details?: string }> {
  const store = await getStore();
  const targetEmail = store.settings.contactNotificationEmail || process.env.GMAIL_RECIPIENT || 'nayssakris@gmail.com';
  const resendKey = store.settings.resendApiKey || process.env.RESEND_API_KEY;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f4ee; color: #2B231D; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #D4B2A7; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background: #2B231D; color: #f7f4ee; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; }
    .header p { margin: 6px 0 0; font-size: 12px; color: #D4B2A7; letter-spacing: 1px; }
    .body { padding: 28px; }
    .badge { display: inline-block; background: #F1E9DB; color: #8C6B52; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 16px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #8C6B52; letter-spacing: 1px; margin-bottom: 4px; }
    .value { font-size: 15px; color: #2B231D; }
    .message-box { background: #FAF7F2; border-left: 3px solid #8C6B52; padding: 16px; border-radius: 0 6px 6px 0; font-size: 14px; line-height: 1.6; margin-top: 12px; }
    .footer { border-top: 1px solid #EFEAE1; padding: 16px 28px; font-size: 12px; color: #8E7F6E; text-align: center; background: #FAF7F2; }
    .btn { display: inline-block; background: #8C6B52; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>team SUPERNOVA</h1>
      <p>Nuevo mensaje recibido desde la web</p>
    </div>
    <div class="body">
      <span class="badge">✦ Mensaje de Oyente ✦</span>
      
      <div class="field">
        <div class="label">Remitente</div>
        <div class="value"><strong>${message.name}</strong> (${message.email})</div>
      </div>

      <div class="field">
        <div class="label">Fecha y Hora</div>
        <div class="value">${new Date(message.createdAt).toLocaleString('es-PE', { dateStyle: 'full', timeStyle: 'short' })}</div>
      </div>

      <div class="field">
        <div class="label">Mensaje / Consulta</div>
        <div class="message-box">${message.message.replace(/\n/g, '<br>')}</div>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${message.email}?subject=Re:%20Contacto%20Team%20Supernova" class="btn">Responder por Correo ➔</a>
      </div>
    </div>
    <div class="footer">
      Este correo fue generado automáticamente por el sitio web de team SUPERNOVA.
    </div>
  </div>
</body>
</html>
  `;

  // Option 1: Resend API (HTTP REST Native)
  if (resendKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Team Supernova <onboarding@resend.dev>',
          to: [targetEmail],
          reply_to: message.email,
          subject: `✦ Nuevo mensaje en Team Supernova: ${message.name}`,
          html: htmlContent
        })
      });

      if (response.ok) {
        return { success: true, provider: 'resend' };
      } else {
        const errText = await response.text();
        console.warn('Resend API response not ok:', errText);
      }
    } catch (e: any) {
      console.warn('Resend dispatch error:', e?.message || e);
    }
  }

  // Fallback: Recorded in store/logs
  console.log(`[Notification to ${targetEmail}]: New message from ${message.name} (${message.email})`);
  return { success: true, provider: 'store-logged', details: `Notificación registrada para ${targetEmail}` };
}
