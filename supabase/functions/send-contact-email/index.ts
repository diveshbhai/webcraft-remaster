import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  goodsType: string;
  temperature?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, goodsType, temperature, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone, service, goodsType, temperature });

    // Prepare email content based on goods type
    let goodsInfo = `<p><strong>Goods Type:</strong> ${goodsType}</p>`;
    if (goodsType === "cold" && temperature) {
      goodsInfo += `<p><strong>Required Temperature:</strong> ${temperature}</p>`;
    }

    // Send email to business owner using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "JN Logistics <onboarding@resend.dev>",
        to: ["jnlogistics48@gmail.com"],
        reply_to: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Type:</strong> ${service}</p>
          ${goodsInfo}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log("Email sent successfully");

    // Send confirmation email to customer
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "JN Logistics <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting JN Logistics",
        html: `
          <h2>Thank you for contacting us, ${name}!</h2>
          <p>We have received your inquiry and will get back to you as soon as possible.</p>
          <p><strong>Your inquiry details:</strong></p>
          <p><strong>Service Type:</strong> ${service}</p>
          ${goodsInfo}
          <p><strong>Your Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>JN Logistics Team</p>
          <p>Phone: +91 9924848030, +91 9924848039<br>Email: jnlogistics48@gmail.com</p>
        `,
      }),
    });

    console.log("Confirmation email sent");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
