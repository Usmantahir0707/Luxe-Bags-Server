import twilio from 'twilio';

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ---------------------------------------------------------
// PUBLIC: Receive WhatsApp Message (Webhook)
// ---------------------------------------------------------
// This endpoint handles incoming messages from customers
export const receiveMessage = async (req, res) => {
  try {
    // Twilio sends data in req.body
    const { From, To, Body, MessageSid } = req.body;

    // For production, you should validate the Twilio signature
    // const twilioSignature = req.headers['x-twilio-signature'];
    // const isValid = twilio.validateRequest(
    //   process.env.TWILIO_AUTH_TOKEN,
    //   twilioSignature,
    //   process.env.BACKEND_URL + '/api/whatsapp/receive',
    //   req.body
    // );
    // if (!isValid) {
    //   return res.status(403).json({ error: 'Invalid signature' });
    // }

    console.log(`Received WhatsApp message from ${From}: ${Body}`);

    // Here you can:
    // - Store the message in database
    // - Process the message (e.g., auto-respond)
    // - Forward to customer service system
    // - Trigger notifications

    // For now, just log and acknowledge
    // You could send an auto-reply here if needed
    // await client.messages.create({
    //   from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    //   to: `whatsapp:${From}`,
    //   body: 'Thank you for your message. We will respond shortly.'
    // });

    // Always respond with 200 OK to acknowledge receipt
    res.status(200).send('<Response></Response>'); // TwiML response
  } catch (error) {
    console.error('Error processing WhatsApp message:', error);
    res.status(500).send('<Response></Response>'); // Still acknowledge to prevent retries
  }
};

// ---------------------------------------------------------
// ADMIN: Send WhatsApp Message
// ---------------------------------------------------------
// This endpoint allows admins to send messages to customers
export const sendMessage = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        message: 'Phone number (to) and message are required'
      });
    }

    // Validate phone number format (should start with +)
    if (!to.startsWith('+')) {
      return res.status(400).json({
        message: 'Phone number must be in international format (start with +)'
      });
    }

    // Send message via Twilio WhatsApp
    const twilioMessage = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message
    });

    res.status(200).json({
      messageId: twilioMessage.sid,
      status: twilioMessage.status,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({
      message: 'Failed to send message',
      error: error.message
    });
  }
};
