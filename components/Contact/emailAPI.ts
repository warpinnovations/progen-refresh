import emailjs from '@emailjs/browser';

type emailProps = {
  to_name: string,
  from_email: string
  user_email: string,
  number: string,
  from_name?: string
  message: string
}

const sendEmail = ({
  from_email,
  from_name,
  to_name,
  user_email,
  message,
  number
}: emailProps) => {
  return emailjs.send(
    'service_gv172m7',
    'template_1nba5fj',
    {
      from_email,
      from_name,
      to_name,
      user_email,
      message,
      number
    },
    'aYz5scxr20cYdrfHZ',
  )
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      return response;
    })
    .catch(function (error) {
      console.log('FAILED...', error);
      throw error;
    });
}

export default sendEmail;