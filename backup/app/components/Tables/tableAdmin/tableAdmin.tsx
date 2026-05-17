
// Importanciones para la pagina
import { getAdmins } from '@/app/API/Admin/api';
import { useState, useEffect } from 'react';
import './tableAdmin.css';

// Estructura de los datos de un administrador
interface Admin {
  id_admin: string,
  name: string,
  last_name: string,
  phone: string,
  administrator_type: string
  password: string,
  created_at: string
}

interface TableAdminProps {
  search: string,

  onStartEditAdmin: (id :number) => void;
  onStartDeleteAdmin: (id : number) => void;
}

export default function Page({ search, onStartEditAdmin, onStartDeleteAdmin } : TableAdminProps) {

  // Lista con todos los admins y gerentes del sistema
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    onGetAdmins();
  }, []);

  const adminsFilter = admins.filter(admin => `${admin.name} ${admin.last_name}`.toLowerCase().includes(search.toLowerCase()));

  // Funcion para obtener todos los admins
  const onGetAdmins = async () => {
    try {
      const response = await getAdmins();
      setAdmins(response.admins);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='tableMain'>

      {adminsFilter.length > 0 ? (
        adminsFilter.map((admin, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '110vh'}}>
              <h3>{admin.id_admin} - {admin.name} {admin.last_name}</h3>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Num tel:</b> {admin.phone}</p>
                <p style={{padding: '0 4%'}}><b>Contraseña:</b> {admin.password}</p>
                <p style={{padding: '0 4%'}}><b>Tipo:</b> {admin.administrator_type}</p>
                <p style={{padding: '0 4%'}}><b>Creado desde:</b> {admin.created_at.split('T')[0]}</p>
              </div>
            </div>

            <div className='buttonDiv'>
              <div className='buttonInfoEdit' onClick={() => onStartEditAdmin(Number(admin.id_admin))}>
                <p>Editar</p>
              </div>

              <div className='buttonInfoDelete' onClick={() => onStartDeleteAdmin(Number(admin.id_admin))}>
                <p>Eliminar</p>
              </div>
            </div>
          </div>
        ))
      ) : <p className='messageInfo'>No se encontraron resultados</p>}
    </div>
  );
};