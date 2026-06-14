
// Importanciones para la pagina
import { getQuotes } from '@/app/API/Quote/api';
import { useState, useEffect } from 'react';
import './tableQuote.css';

interface TableQuoteProps {
  search: string,
  filter: string,

  onSeeQuote: (id :number) => void;
  onStartEditQuote: (id :number) => void;
  onStartFinallyQuote: (id : number) => void;
}

// Estructura para cotizacion
interface Quote {
  id_quote: Number,
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
  repair: Number,
  repair_cost: Number,
  piece_cost: Number,
  final_price: Number,
  remaining_money: Number,
  payment_method: string,
  status: string,
  delivery_date: string,
  pastDays: Number,
  madeBy: Number
}

export default function Page({ search, filter, onSeeQuote, onStartEditQuote, onStartFinallyQuote } : TableQuoteProps) {

  // Lista con todas las cotizaciones hechas en el sistema
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    onGetQuotes();
  }, []);

  let quotesFilter = [];
  quotesFilter = quotes.filter(quote => quote.customer_name.toLowerCase().includes(search.toLowerCase()));
  quotesFilter = filter != 'Todos' ? quotesFilter.filter(quote => quote.device_type.toLowerCase().includes(filter.toLowerCase())) : quotesFilter;

  // Funcion para obtener todas las cotizaciones
  const onGetQuotes = async () => {
    try {
      const response = await getQuotes();
      console.log(response)
      setQuotes(response.quotes);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='tableMain'>

      {quotesFilter.length > 0 ? (
        quotesFilter.map((quote, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '110vh'}}>

              <div className='cellInfo' style={{fontSize: '20px'}}>
                <p style={{padding: '0 4%'}}><b>{quote.customer_name} - {quote.device}</b></p>
              </div>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Dia de entrega:</b> {quote.delivery_date.split('T')[0]}</p>
                <p style={{padding: '0 4%'}}><b>Dispositivo:</b> {quote.device_type}</p>
              </div>
            </div>

            <div className='buttonDiv'>
              <div className='buttonInfoSee' onClick={() => onSeeQuote(Number(quote.id_quote))}>
                <p>Ver</p>
              </div>

              <div className='buttonInfoFinally' onClick={() => onStartFinallyQuote(Number(quote.id_quote))}>
                <p>Finalizar</p>
              </div>

              <div className='buttonInfoEdit' onClick={() => onStartEditQuote(Number(quote.id_quote))}>
                <p>Editar</p>
              </div>
            </div>
          </div>
        ))
      ) : <p className='messageInfo'>No se encontraron resultados</p>}
    </div>
  )
}