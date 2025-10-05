const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Resend email configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'info@feedwithme.com';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      success: false 
    });
  }

  try {
    // Parse form data
    const formData = req.body;
    const { name, surname, email, phone, role, message, privacy } = formData;

    // Validate required fields
    if (!name || !surname || !email || !role || !privacy) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        success: false 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        success: false 
      });
    }

    // Prepare data for database
    const submissionData = {
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      role: role,
      message: message ? message.trim() : null,
      privacy_accepted: true,
      created_at: new Date().toISOString(),
      ip_address: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
    };

    // Insert into Supabase database
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        success: false 
      });
    }

    // Detect language from form data or default to English
    const userLanguage = formData.language || 'en';
    const isItalian = userLanguage === 'it';

    // Role translations
    const roleTranslations = {
      'beta-tester': isItalian ? 'Beta Tester' : 'Beta Tester',
      'feedback-provider': isItalian ? 'Fornire Feedback' : 'Provide Feedback',
      'early-adopter': isItalian ? 'Early Adopter' : 'Early Adopter',
      'community-member': isItalian ? 'Membro della Comunità' : 'Community Member',
      'other': isItalian ? 'Altro' : 'Other'
    };

    // Send admin notification email
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7d0097;">New Form Submission - FeedWithMe</h2>
        <p>A new user has joined the FeedWithMe community!</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #7d0097; margin: 0 0 15px 0;">User Details:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Name:</strong> ${name} ${surname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
            <li><strong>Role:</strong> ${roleTranslations[role] || role}</li>
            <li><strong>Message:</strong> ${message || 'No message provided'}</li>
            <li><strong>Language:</strong> ${isItalian ? 'Italian' : 'English'}</li>
            <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
          </ul>
        </div>
        <p>This submission has been automatically stored in the database.</p>
        <p>Best regards,<br><strong>FeedWithMe System</strong></p>
      </div>
    `;

    try {
      const adminResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ['info@feedwithme.com'],
          subject: `🍲 New FeedWithMe Submission - ${name} ${surname}`,
          html: adminEmailContent,
        }),
      });

      if (!adminResponse.ok) {
        console.error('Admin email failed:', await adminResponse.text());
      }
    } catch (emailError) {
      console.error('Admin email error:', emailError);
    }

    // Send confirmation email to user
    const confirmationEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7d0097 0%, #6a0080 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🍲 FeedWithMe</h1>
          <p style="color: #f8b227; margin: 10px 0 0 0; font-size: 16px;">${isItalian ? 'Messaggio Ricevuto con Successo!' : 'Message Received Successfully!'}</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #7d0097; margin: 0 0 20px 0;">${isItalian ? `Grazie, ${name}!` : `Thank you, ${name}!`}</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            ${isItalian 
              ? `Abbiamo ricevuto con successo il tuo messaggio e ora fai parte della nostra comunità FeedWithMe!`
              : `We've successfully received your message and you're now part of our FeedWithMe community!`
            }
          </p>
          
          <!-- Confirmation Details -->
          <div style="background: #f8fafc; border-left: 4px solid #f8b227; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <h3 style="color: #7d0097; margin: 0 0 15px 0; font-size: 18px;">📋 ${isItalian ? 'Dettagli della Tua Richiesta:' : 'Your Submission Details:'}</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              <li><strong>${isItalian ? 'Nome:' : 'Name:'}</strong> ${name} ${surname}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>${isItalian ? 'Ruolo:' : 'Role:'}</strong> ${roleTranslations[role] || role}</li>
              ${phone ? `<li><strong>${isItalian ? 'Telefono:' : 'Phone:'}</strong> ${phone}</li>` : ''}
              <li><strong>${isItalian ? 'Inviato:' : 'Submitted:'}</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          
          <!-- Next Steps -->
          <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px;">🚀 ${isItalian ? 'Cosa Succede Ora?' : 'What\'s Next?'}</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              ${isItalian ? `
                <li>Ti terremo aggiornato sui nostri progressi di sviluppo</li>
                <li>Sarai tra i primi a sapere quando lanceremo</li>
                <li>Potremmo contattarti per opportunità di feedback e test</li>
                <li>Seguici sui social media per contenuti dietro le quinte</li>
              ` : `
                <li>We'll keep you updated on our development progress</li>
                <li>You'll be among the first to know when we launch</li>
                <li>We may reach out for feedback and testing opportunities</li>
                <li>Follow us on social media for behind-the-scenes content</li>
              `}
            </ul>
          </div>
          
          <!-- Call to Action -->
          <div style="background: #f8b227; color: white; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <h3 style="margin: 0 0 10px 0; font-size: 20px;">${isItalian ? 'Pronto a trasformare la tua dieta?' : 'Ready to transform your diet?'}</h3>
            <p style="margin: 0 0 15px 0; font-size: 16px;">${isItalian ? 'Unisciti alla nostra comunità e fai parte della rivoluzione alimentare!' : 'Join our community and be part of the food revolution!'}</p>
            <a href="https://www.feedwithme.com" style="background: white; color: #7d0097; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">${isItalian ? 'Visita il Nostro Sito' : 'Visit Our Website'}</a>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
            ${isItalian 
              ? 'Se hai domande, sentiti libero di rispondere a questa email. Siamo qui per aiutarti!'
              : 'If you have any questions, feel free to reply to this email. We\'re here to help!'
            }
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
            ${isItalian ? 'Cordiali saluti,' : 'Best regards,'}<br>
            <strong style="color: #7d0097;">${isItalian ? 'Il Team FeedWithMe' : 'The FeedWithMe Team'}</strong><br>
            <span style="color: #6b7280; font-size: 14px;">${isItalian ? 'Costruendo il futuro del cibo, una ricetta alla volta' : 'Building the future of food, one recipe at a time'}</span>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
            ${isItalian 
              ? `Questa email è stata inviata a ${email} perché ti sei unito alla nostra comunità su www.feedwithme.com`
              : `This email was sent to ${email} because you joined our community at www.feedwithme.com`
            }
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            © 2025 FeedWithMe. ${isItalian ? 'Tutti i diritti riservati.' : 'All rights reserved.'} | 
            <a href="https://www.feedwithme.com/privacy" style="color: #7d0097;">${isItalian ? 'Informativa sulla Privacy' : 'Privacy Policy'}</a> | 
            <a href="https://www.feedwithme.com/terms" style="color: #7d0097;">${isItalian ? 'Termini di Servizio' : 'Terms of Service'}</a>
          </p>
        </div>
      </div>
    `;

    try {
      const confirmationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [email],
          subject: isItalian ? '🍲 FeedWithMe - Messaggio Ricevuto con Successo!' : '🍲 FeedWithMe - Message Received Successfully!',
          html: confirmationEmailContent,
        }),
      });

      if (!confirmationResponse.ok) {
        console.error('Confirmation email failed:', await confirmationResponse.text());
      }
    } catch (emailError) {
      console.error('Confirmation email error:', emailError);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for joining our community!',
      data: data[0]
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false 
    });
  }
}