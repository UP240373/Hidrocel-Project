
// Importanciones para la pagina
import { getHistory } from '@/app/API/History/api';
import { useState, useEffect } from 'react';
import './tableHistory.css';

interface TableQuoteProps {
  search: string,
  filter: string,

  onSeeOneHistory: (id :number) => void;
  onStartApplyWarranty: (id :number) => void;
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

export default function Page({ search, filter, onSeeOneHistory, onStartApplyWarranty } : TableQuoteProps) {

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
        const response = await getHistory();
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
              <div className='buttonInfoSee' onClick={() => onSeeOneHistory(Number(quote.id_quote))}>
                <p>Ver</p>
              </div>

              <div className='buttonInfoFinally' onClick={() => onStartApplyWarranty(Number(quote.id_quote))}>
                <p>Aplicar Garantia</p>
              </div>
            </div>
          </div>
        ))
      ) : <p className='messageInfo'>No se encontraron resultados</p>}
    </div>
  )
}