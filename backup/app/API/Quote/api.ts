
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
  repairs?: {
    id_repair: number,
    piece_cost: number
  }[],
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
export const getQuotes = async () => {
  try {
    const response = await fetch(`${API}/quote`, {
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
export const getQuote = async (id : Number) => {
  try {
    const response = await fetch(`${API}/quote/${id}`, {
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
export const createQuote = async (cuerpo : quote) => {
  try {
    const response = await fetch(`${API}/quote`, {
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

// Modificar una cotizacion
export const updateQuote = async (id : number, cuerpo : quote) => {
  try {
    const response = await fetch(`${API}/quote/${id}`, {
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