interface MailgunConfig {
  apiKey: string;
  domain: string;
  from: string;
  to: string;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export class MailgunService {
  private config: MailgunConfig;

  constructor(config: MailgunConfig) {
    this.config = config;
  }

  async sendEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const url = `https://api.mailgun.net/v3/${this.config.domain}/messages`;
      
      const formDataToSend = new FormData();
      formDataToSend.append('from', this.config.from);
      formDataToSend.append('to', this.config.to);
      formDataToSend.append('subject', `Contact Form: ${formData.subject}`);
      formDataToSend.append('text', this.generateEmailText(formData));
      formDataToSend.append('html', this.generateEmailHtml(formData));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${this.config.apiKey}`)}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Mailgun API error:', errorText);
        throw new Error(`Mailgun API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);

      return {
        success: true,
        message: 'Message sent successfully!'
      };
    } catch (error) {
      console.error('Failed to send email:', error);
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      };
    }
  }

  private generateEmailText(formData: ContactFormData): string {
    return `
New contact form submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from lwh.dev contact form
    `.trim();
  }

  private generateEmailHtml(formData: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contact Form Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: 600; color: #555; }
    .value { margin-top: 5px; }
    .message { background: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-wrap; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Contact Form Submission</h2>
    <p>You received a new message from your website contact form.</p>
  </div>
  
  <div class="field">
    <div class="label">Name:</div>
    <div class="value">${formData.firstName} ${formData.lastName}</div>
  </div>
  
  <div class="field">
    <div class="label">Email:</div>
    <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
  </div>
  
  <div class="field">
    <div class="label">Subject:</div>
    <div class="value">${formData.subject}</div>
  </div>
  
  <div class="field">
    <div class="label">Message:</div>
    <div class="message">${formData.message}</div>
  </div>
  
  <div class="footer">
    <p>Sent from lwh.dev contact form</p>
  </div>
</body>
</html>
    `.trim();
  }
}

// Factory function to create Mailgun service with environment variables
export function createMailgunService(): MailgunService {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN || "sandbox627a8d801f144dd688b1819508de3c8f.mailgun.org";
  const from = process.env.MAILGUN_FROM ;
  const to = process.env.MAILGUN_TO;
    console.log(apiKey)
  if (!apiKey) {
    throw new Error('MAILGUN_API_KEY environment variable is required');
  }
  
  if (!domain) {
    throw new Error('MAILGUN_DOMAIN environment variable is required');
  }
  
  if (!to) {
    throw new Error('MAILGUN_TO environment variable is required');
  }

  return new MailgunService({ apiKey, domain, from, to });
}