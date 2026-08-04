
const API = "http://localhost:3000";

// Obtener los mejores empleados
export const getBestEmployees = async () => {
  try {
    const response = await fetch(`${API}/kpi/employee`, {
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

// Obtener los servicios mas realizados
export const getServices = async () => {
  try {
    const response = await fetch(`${API}/kpi/service`, {
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

// Obtener los clientes con mayor adeudo
export const getClients = async () => {
  try {
    const response = await fetch(`${API}/kpi/client`, {
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

// Obtener las marcas mas reparadas
export const getBrands = async () => {
  try {
    const response = await fetch(`${API}/kpi/brand`, {
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