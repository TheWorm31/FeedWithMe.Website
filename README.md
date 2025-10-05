# FeedWithMe Landing Page

A beautiful, responsive landing page for FeedWithMe MVP with form handling, email notifications, and database integration.

## Features

- 🌍 **Bilingual Support**: English and Italian
- 📱 **Responsive Design**: Works on all devices
- 📧 **Email Notifications**: Automatic emails to info@feedwithme.com and users
- 🗄️ **Database Integration**: Supabase for storing form submissions
- 🍪 **GDPR Compliant**: Cookie consent and privacy policy
- 📞 **International Phone**: Phone number formatting with country detection
- ✨ **Modern UI**: Tailwind CSS with smooth animations

## Setup Instructions

### 1. Supabase Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the SQL from `supabase-schema.sql`
3. Get your project URL and anon key from Settings > API

### 2. Email Configuration

#### Option A: Resend (Recommended)
1. Create a Resend account at [resend.com](https://resend.com)
2. Verify your domain `feedwithme.com` in Resend dashboard
3. Get your API key from API Keys section
4. Set `RESEND_API_KEY` in environment variables

#### Option B: Gmail
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account > Security > App passwords
3. Use `info@feedwithme.com` as the email user
4. Use the generated app password

#### Option C: SendGrid
1. Create a SendGrid account
2. Get your API key from Settings > API Keys
3. Update the email configuration in the function

### 3. Environment Variables

1. Copy `env-template.txt` to `.env`
2. Fill in your actual values:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   ```

### 4. Deployment Options

#### Option A: Netlify (Recommended)
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Install dependencies: `npm install`
3. Deploy: `netlify deploy --prod`
4. Set environment variables in Netlify dashboard

#### Option B: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel --prod`
3. Set environment variables in Vercel dashboard

#### Option C: Manual Hosting
1. Upload files to your web server
2. Set up serverless functions (AWS Lambda, etc.)
3. Configure environment variables

## File Structure

```
├── index.html              # Main landing page
├── css/
│   └── styles.css         # Custom styles
├── js/
│   └── script.js          # JavaScript functionality
├── netlify/
│   └── functions/
│       └── submit-form.js  # Form submission handler
├── package.json           # Dependencies
├── supabase-schema.sql    # Database schema
└── env-template.txt       # Environment variables template
```

## Form Fields

- **Name** (required): User's first name
- **Surname** (required): User's last name  
- **Email** (required): User's email address
- **Phone** (optional): International phone number
- **Role** (required): How they want to help
- **Message** (optional): Personal introduction
- **Privacy** (required): GDPR consent checkbox

## Database Schema

The `form_submissions` table stores:
- Personal information (name, surname, email, phone)
- Role and message
- Privacy consent status
- Timestamps and IP address
- Automatic indexing for performance

## Email Notifications

1. **Admin Notification**: Sent to info@feedwithme.com with all form data
2. **Welcome Email**: Sent to the user confirming their submission
3. **Error Handling**: Graceful fallback if email fails

## Security Features

- Input validation and sanitization
- CORS protection
- Rate limiting (via Netlify/Vercel)
- SQL injection prevention (Supabase)
- GDPR compliance with privacy consent

## Customization

- **Colors**: Update CSS variables in `styles.css`
- **Content**: Modify text in `index.html` and `script.js`
- **Form Fields**: Add/remove fields in both HTML and JavaScript
- **Email Templates**: Customize email content in `submit-form.js`

## Support

For issues or questions, contact the FeedWithMe team at info@feedwithme.com

## License

MIT License - Feel free to use for your own projects!
