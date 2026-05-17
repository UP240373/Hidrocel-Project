
const API = "http://localhost:3000";

interface user {
  password: string
}

// Realizar un test de conexion a la API
export const test = async () => {
  try {
    const response = await fetch(`${API}/api/test`, {
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

// Verificar si es administrador o gerente
export const verify = async (cuerpo : user ) => {
  try {
    const response = await fetch(`${API}/auth`, {
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

// Verificar si es administrador
export const verifyAdmin = async (cuerpo : user ) => {
  try {
    const response = await fetch(`${API}/auth/admin`, {
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