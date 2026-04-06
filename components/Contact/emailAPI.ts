import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_gv172m7';
const TEMPLATE_ID = 'template_1nba5fj';
const PUBLIC_KEY = 'aYz5scxr20cYdrfHZ';

type emailProps = {
  to_name: string,
  from_email: string
  user_email: string,
  number: string,
  from_name?: string
  message: string
  to_email?: string
  application_type?: string
  selected_services?: string
}

const sendEmail = ({
  from_email,
  from_name,
  to_name,
  user_email,
  message,
  number,
  to_email,
  application_type,
  selected_services,
}: emailProps) => {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_email,
      from_name,
      to_name,
      user_email,
      message,
      number,
      to_email: to_email || 'marketing@prometheus.ph',
      application_type: application_type || '',
      selected_services: selected_services || '',
    },
    PUBLIC_KEY,
  )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      return response;
    })
    .catch((error) => {
      console.log('FAILED...', error);
      throw error;
    });
};

export default sendEmail;
