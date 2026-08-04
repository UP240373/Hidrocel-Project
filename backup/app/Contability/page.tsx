
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verify, verifyManager, verifyAdmin } from '../API/api';
import { getDiagnostic, createDiagnostic, updateDiagnostic, deleteDiagnostic, createNote, sendEmail } from '../API/Diagnostic/api';
import { createQuote } from '../API/Quote/api';
import { getRepairs, getRepair } from '../API/Repair/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import plus from '@/image/plus.png';
import arrow from '@/image/arrow.png';
import Modal from '.././components/PopUp/PopUp';
import Header from '.././components/Header/Header';
import SideBar from '.././components/SideBar/SideBar';
import TableDiagnostic from '@/app/components/Tables/tableDiagnostic/tableDiagnostic';
import TableContability from '@/app/components/Tables/tableContability/tableContability'
import './contability.css';

interface Repair {
  id_repair: number,
  name: string,
  labor_costs: number,
  approximate_time: number,
  piece_cost: number
}

export default function Page() {

  // Movimiento entre rutas
  const router = useRouter();

  // Id del usuario que inicio sesion
  const [userId, setUserId] = useState<string | null>('');

  useEffect(() => {
    setUserId(localStorage.getItem('user_id'));
    onGetRepairs();
  }, []);

  // Datos para recarga la tabla
  const [tableKey, setTableKey] = useState(0);
  const reloadTable = () => {
    setTableKey(prev => prev + 1);
  };

  // Todas las reparaciones
  const [repairs, setRepairs] = useState<Repair[]>([]);

  // Funcion para obtener reparaciones
  const onGetRepairs = async () => {
    try {
      const response = await getRepairs();
      setRepairs(response.repairs)
    } catch (err) {
      console.error(err)
    }
  };

  // Variables para abrir pantallas emergentes
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);
  const [isOpenHistory, setOpenHistory] = useState(false);

  // Contraseña temporal de admin y gerente
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Busqueda por nombre del cliente y tipo de dispositivo
  const [filter, setFilter] = useState<string>('Empleados');

  // Mensajes de errores y soluciones
  const [message, setMessage] = useState<string>('');

  // Funcion para cambiar a interfaces de Gerentes y Admins
  const onChangeAdmin = async (option : string) => {
    if (passwordAdmin == "") {
      setMessage("Introduce una contraseña");
      return
    };

    const user = {
      password: passwordAdmin
    }

    if (option === "repairs") {
      try {
        const response = await verifyManager(user);
        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }
        router.push("../Repairs");
      } catch (err) {
        console.error(err)
      }
    }

    if (option === "administrators") {
      try {
        const response = await verifyAdmin(user);
        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }
        router.push("../Admin");
      } catch (err) {
        console.error(err)
      }
    }

    if (option === "history") {
      try {
        const response = await verify(user);
        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }
        router.push("../History");
      } catch (err) {
        console.error(err)
      }
    }
  };

  return (
    <div className="mainContability">
      <Header/>

      <div className="bodyContability">
        <div className="bodyMainContability" style={{flexDirection: 'column'}}>

          <div className="titleContability">
            <h1>Contabilidad</h1>
          </div>

          <div className='searchDivContability'>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className='filterContability'>
              <option value={'Empleados'}>Mejor empleado</option>
              <option value={'Servicios'}>Servicios mas realizados</option>
              <option value={'Clientes'}>Clientes con mayor adeudo</option>
              <option value={'Marcas'}>Marcas mas trabajadas</option>
            </select>
          </div>

          <TableContability filter={filter}/>

          <div className='buttonsContability'>
            <div className='buttonContability' onClick={() => router.push('./')}>
              <p style={{padding: '1% 8%'}}>Volver</p>
              <Image width={14} src={arrow} alt=""/>
            </div>
          </div>
        </div>

        <SideBar isUseRepairs={false} isUseContability={true} isUseAdmins={false} isUseHistory={false} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins} isOpenHistory={setOpenHistory}/>
      </div>

      <Modal isOpen={isOpenRepairs} onClose={() => setOpenRepairs(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input 
          value={passwordAdmin}
          onChange={(e) => setPasswordAdmin(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onChangeAdmin("repairs")} className='buttonPopUp'>Continuar</button>
      </Modal>

      <Modal isOpen={isOpenAdmins} onClose={() => setOpenAdmins(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input 
          value={passwordAdmin}
          onChange={(e) => setPasswordAdmin(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onChangeAdmin("administrators")} className='buttonPopUp'>Continuar</button>
      </Modal>

      <Modal isOpen={isOpenHistory} onClose={() => setOpenHistory(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input 
          value={passwordAdmin}
          onChange={(e) => setPasswordAdmin(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onChangeAdmin("history")} className='buttonPopUp'>Continuar</button>
      </Modal>

    </div>
  );
}