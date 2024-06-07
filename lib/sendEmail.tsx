
import ResetPassword from '@/components/emails/ResetPassword';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (resetLink:string,username:string, email:string) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Hello world',
    react: <ResetPassword resetPasswordLink={resetLink} userFirstname={username}/>
  });

  if (error) {
    console.log(error)
  }
};


export const sendProductReceiptEmail = async (formData:FormData) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello world',
    react: <ResetPassword resetPasswordLink='' userFirstname=''/>
  });

  if (error) {
    console.log(error)
  }
};
