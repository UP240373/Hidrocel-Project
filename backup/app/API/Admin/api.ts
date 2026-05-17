
const API = "http://localhost:3000";

// Estructura para administradores
interface admin {
  name: string,
  last_name: string,
  phone: string,
  administrator_type: string,
  password: string
}

// Obtener todos los administradores y gerentes
export const getAdmins = async () => {
  try {
    const response = await fetch(`${API}/admin`, {
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

// Obtener un administrador o gerente
export const getAdmin = async (id : number) => {
  try {
    const response = await fetch(`${API}/admin/${id}`, {
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

// Crear un nuevo administrador o gerente
export const createAdmin = async (cuerpo : admin) => {
  try {
    const response = await fetch(`${API}/admin`, {
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

// Modificar un administrador o gerente
export const updateAdmin = async (id: number, cuerpo : admin) => {
  try {
    const response = await fetch(`${API}/admin/${id}`, {
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

// Eliminar un administrador o gerente
export const deleteAdmin = async (id: number) => {
  try {
    const response = await fetch(`${API}/admin/${id}`, {
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