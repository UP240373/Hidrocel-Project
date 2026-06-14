
// Importanciones para la pagina
import { getDiagnostics } from '@/app/API/Diagnostic/api';
import { useState, useEffect } from 'react';
import './tableDiagnostic.css';

// Estructura de los datos de un diagnostico
interface Diagnostic {
  device: string,
  device_brand: string,
  device_color: string,
  device_type: string,
  customer_name: string,
  contact_phone: Number,
  device_password: string,
  fist_payment: Number,
  previous_diagnosis: string,
  technical_diagnosis: string,
  estimated_price: Number,
  delivery_date: string,
  made_by: string
}

interface TableAdminProps {
  search: string,

  onConfirmDiagnostic: (device : string, customer_name : string) => void,
  onStartEditDiagnostic: (device : string, customer_name : string) => void;
  onStartDeleteDiagnostic: (device : string, customer_name : string) => void;
}

export default function Page({ search, onConfirmDiagnostic, onStartEditDiagnostic, onStartDeleteDiagnostic } : TableAdminProps) {

  // Lista con todos los diagnosticos del sistema
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  useEffect(() => {
    onGetDiagnostics();
  }, []);

  const diagnosticsFilter = diagnostics.filter(diagnostic => diagnostic.customer_name.toLowerCase().includes(search.toLowerCase()));

  // Funcion para obtener todos los admins
  const onGetDiagnostics = async () => {
    try {
      const response = await getDiagnostics();
      setDiagnostics(response.diagnostics);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='tableMain'>

      {diagnosticsFilter.length > 0 ? (
        diagnosticsFilter.map((diagnostic, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '100vh'}}>
              <h3>{diagnostic.customer_name} - {diagnostic.device}</h3>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Dia de entrega:</b> {diagnostic.delivery_date.split('T')[0]}</p>
                <p style={{padding: '0 4%'}}><b>Dispositivo:</b> {diagnostic.device}</p>
              </div>
            </div>

            <div className='buttonDiv'>
              <div className='buttonInfoConfirm' onClick={() => onConfirmDiagnostic(diagnostic.device, diagnostic.customer_name)}>
                <p>Aceptar</p>
              </div>

              <div className='buttonInfoDelete' onClick={() => onStartDeleteDiagnostic(diagnostic.device, diagnostic.customer_name)}>
                <p>Cancelado</p>
              </div>

              <div className='buttonInfoEdit' onClick={() => onStartEditDiagnostic(diagnostic.device, diagnostic.customer_name)}>
                <p>Editar</p>
              </div>
            </div>
          </div>
        ))
      ) : <p className='messageInfo'>No se encontraron resultados</p>}
    </div>
  );
}