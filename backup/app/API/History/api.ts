
const API = "http://localhost:3000";

// Estructura para cotizacion
interface quote {
  device?: string,
  device_brand?: string,
  device_color?: string,
  device_type?: string,
  customer_name?: string,
  contact_phone?: string,
  device_password?: string,
  first_payment: Number,
  previous_diagnosis?: string,
  technical_diagnosis: string,
  repairs?: string,
  repair_cost?: Number,
  piece_cost?: Number,
  final_price?: Number,
  remaining_money?: Number,
  payment_method?: string,
  status?: string,
  delivery_date?: string,
  past_days?: Number,
  made_by?: Number
}

// Obtener todas las cotizaciones
export const getHistory = async () => {
  try {
    const response = await fetch(`${API}/history`, {
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

// Obtener una cotizacion
export const getHistoryById = async (id : Number) => {
  try {
    const response = await fetch(`${API}/history/${id}`, {
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

// Añádir cotizacion al historial
export const addHistory = async (cuerpo : quote) => {
  try {
    const response = await fetch(`${API}/history`, {
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