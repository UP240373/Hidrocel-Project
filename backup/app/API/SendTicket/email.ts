
const API = "http://localhost:3000";

interface Email {
  to: string,
  subject: string,
  message: string,
  attachments?: {
    filename: string,
    content: string,
    contentType: string
  }
}

// Enviar informacion para enviar ticket
export const sendEmail = async (cuerpo : Email) => {
  try {
    const response = await fetch(`${API}/send/email`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = response.json();
    return data;
  }
  catch (err) {
    console.error("Algo salio mal", err)
  }
};