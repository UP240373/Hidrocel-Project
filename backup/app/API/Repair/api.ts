
const API = "http://localhost:3000";

// Estructura para reparaciones
interface repair {
  name: string,
  device: string, 
  material: string,
  tools: string,
  description: string,
  type_of_service: string,
  labor_costs: number,
  approximate_time: number
}

// Obtener todos los tipos de reparaciones
export const getRepairs = async () => {
  try {
    const response = await fetch(`${API}/repair`, {
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

// Obtener un tipo de reparacion
export const getRepair = async (id : number) => {
  try {
    const response = await fetch(`${API}/repair/${id}`, {
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

// Crear un nuevo tipo de reparacion
export const createRepair = async (cuerpo : repair) => {
  try {
    const response = await fetch(`${API}/repair`, {
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

// Modificar un tipo de reparacion
export const updateRepair = async (id: number, cuerpo : repair) => {
  try {
    const response = await fetch(`${API}/repair/${id}`, {
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

// Eliminar un tipo de reparacion
export const deleteRepair = async (id: number) => {
  try {
    const response = await fetch(`${API}/repair/${id}`, {
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