
const API = "http://localhost:3000";

// Estructura para diagnostico
interface diagnostic {
  device: string,
  device_brand: string,
  device_color: string,
  device_type: string,
  customer_name: string,
  contact_phone: string,
  device_password: string,
  first_payment: Number,
  previous_diagnosis: string,
  technical_diagnosis: string,
  estimated_price: Number,
  delivery_date: string,
  made_by: Number
}

// Estructura para un correo
interface email {
  to: string,
  subject: string,
  message: string,
  attachments: string[]
}

// Obtener todos los diagnosticos
export const getDiagnostics = async () => {
  try {
    const response = await fetch(`${API}/diagnostic`, {
      method: 'GET', 
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

// Obtener un diagnostico
export const getDiagnostic = async (device : string, customer_name : string) => {
  try {
    const response = await fetch(`${API}/diagnostic/query?device=${device}&customer_name=${customer_name}`, {
      method: 'GET', 
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

// Crear un nuevo diagnostico
export const createDiagnostic = async (cuerpo : diagnostic) => {
  try {
    const response = await fetch(`${API}/diagnostic`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo)
    })
    const data = response.json();
    return data;
  }
  catch (err) {
    console.error("Algo salio mal", err)
  }
};

// Modificar un diagnostico
export const updateDiagnostic = async (device : string, customer_name : string, cuerpo : diagnostic) => {
  try {
    const response = await fetch(`${API}/diagnostic?device=${device}&customer_name=${customer_name}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo)
    })
    const data = response.json();
  
    return data;
  }
  catch (err) {
    console.error("Algo salio mal", err)
  }
};

// Eliminar un diagnostico
export const deleteDiagnostic = async (device: string, customer_name : string) => {
  try {
    const response = await fetch(`${API}/diagnostic?device=${device}&customer_name=${customer_name}`, {
      method: 'DELETE', 
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

// Crear nota de remision
export const createNote = async (id : number) => {
  try {
    const response = await fetch(`${API}/send/notes/${id}`, {
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
}

// Enviar nota de remision
export const sendEmail = async (cuerpo : email) => {
  try {
    const response = await fetch(`${API}/send/email`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuerpo)
    })
    const data = response.json();
    return data;
  }
  catch (err) {
    console.error("Algo salio mal", err)
  }
}
