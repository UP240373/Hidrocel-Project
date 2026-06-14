
// Importanciones para la pagina
import { getRepairs } from '@/app/API/Repair/api';
import { useState, useEffect } from 'react';
import './tableRepair.css';

// Estructura de los datos de un tipo de reparacion
interface Repair {
  id_repair: string,
  name: string,
  device: string, 
  material: string,
  tools: string,
  description: string,
  type_of_service: string,
  labor_costs: number,
  approximate_time: number
}

interface TableRepairProps {
  search: string,
  filter: string,

  onStartEditRepair: (id :number) => void;
  onStartDeleteRepair: (id : number) => void;
}

export default function Page({ search, filter, onStartEditRepair, onStartDeleteRepair } : TableRepairProps) {

  // Lista con todos los tipos de reparaciones en el sistema
  const [repairs, setRepairs] = useState<Repair[]>([]);

  useEffect(() => {
    onGetRepairs();
  }, []);

  let repairsFilter = [];
  repairsFilter = repairs.filter(repair => repair.name.toLowerCase().includes(search.toLowerCase()));
  repairsFilter = filter != 'Todos' ? repairsFilter.filter(repair => repair.device.toLowerCase().includes(filter.toLowerCase())) : repairsFilter;

  // Funcion para obtener todas las reparaciones
  const onGetRepairs = async () => {
    try {
      const response = await getRepairs();
      setRepairs(response.repairs);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='tableMain'>

      {repairsFilter.length > 0 ? (
        repairsFilter.map((repair, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '110vh'}}>

              <div className='cellInfo' style={{fontSize: '20px'}}>
                <p style={{padding: '0 4%'}}><b>Nombre:</b> {repair.name}</p>
                <p style={{padding: '0 4%'}}><b>Dispositivo:</b> {repair.device}</p>
              </div>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Costo de mano de obra:</b> ${repair.labor_costs}</p>
                <p style={{padding: '0 4%'}}><b>Tiempo:</b> {repair.approximate_time} horas</p>
              </div>
            </div>

            <div className='buttonDiv'>
              <div className='buttonInfoEdit' onClick={() => onStartEditRepair(Number(repair.id_repair))}>
                <p>Editar</p>
              </div>

              <div className='buttonInfoDelete' onClick={() => onStartDeleteRepair(Number(repair.id_repair))}>
                <p>Eliminar</p>
              </div>
            </div>
          </div>
        ))
      ) : <p className='messageInfo'>No se encontraron resultados</p>}
    </div>
  );
};