
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verify, verifyAdmin } from '../API/api';
import { getRepair, createRepair, updateRepair, deleteRepair } from '../API/Repair/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import plus from '@/image/plus.png';
import arrow from '@/image/arrow.png';
import Modal from '.././components/PopUp/PopUp';
import Header from '.././components/Header/Header';
import SideBar from '.././components/SideBar/SideBar';
import TableRepair from '@/app/components/Tables/tableRepair/tableRepair';
import './repairs.css';

export default function Page() {

  // Movimiento entre rutas
  const router = useRouter();

  // Datos para recarga la tabla
  const [tableKey, setTableKey] = useState(0);
  const reloadTable = () => {
    setTableKey(prev => prev + 1);
  };

  // Variables para abrir pantallas emergentes
  const [isOpenNewRepair, setOpenNewRepair] = useState(false);
  const [isOpenEditRepair, setOpenEditRepair] = useState(false);
  const [isOpenDeleteRepair, setOpenDeleteRepair] = useState(false);
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);
  const [isOpenHistory, setOpenHistory] = useState(false);

  // Contraseña temporal de admin y gerente
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Busqueda por nombre de reparacion y tipo de dispositivo
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  // Mensajes de errores y soluciones
  const [message, setMessage] = useState<string>('');

  // Datos para nueva reparacion
  const [newName, setNewName] = useState<string>('');
  const [newDevice, setNewDevice] = useState<string>('');
  const [newApproximateTime, setNewApproximateTime] = useState<string>('');
  const [newLaborCosts, setNewLaborCosts] = useState<string>('');
  const [newMaterial, setNewMaterial] = useState<string>('');
  const [newTools, setNewTools] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newTypeOfService, setNewTypeOfService] = useState<string>('');

  // Datos para editar un usuario
  const [idRepair, setIdRepair] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [device, setDevice] = useState<string>('');
  const [approximateTime, setApproximateTime] = useState<string>('');
  const [laborCosts, setLaborCosts] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [tools, setTools] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [typeOfService, setTypeOfService] = useState<string>('');

  useEffect(() => {
    setNewName('');
    setNewDevice('');
    setNewApproximateTime('');
    setNewLaborCosts('');
    setNewMaterial('');
    setNewTools('');
    setNewDescription('');
    setNewTypeOfService('');

    setIdRepair(0);
    setName('');
    setDevice('');
    setApproximateTime('');
    setLaborCosts('');
    setMaterial('');
    setTools('');
    setDescription('');
    setTypeOfService('');

    setMessage('');
  }, [isOpenNewRepair, isOpenEditRepair, isOpenDeleteRepair]);

  // Funcion para cambiar a interfaces de Gerentes y Admins
  const onChangeAdmin = async (option : string) => {
    if (passwordAdmin == "") {
      setMessage("Introduce una contraseña");
      return
    };
  
    const user = {
      password: passwordAdmin
    }

    if (option === "contability") {
      console.log("seleccionaste contabilidad");
    }
  
    if (option === "administrators") {
      try {
        const response = await verifyAdmin(user);
        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }
        router.push("./Admin");
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
        router.push("./History");
      } catch (err) {
        console.error(err)
      }
    }
  }

  // Funcion para guardar un nueva nueva reparacion
    const onSaveNewRepair = async () => {
      if (newName == '') {
        setMessage("Introduce un nombre");
        return;
      }

      if (newDevice == '') {
        setMessage("Introduce un dispositivo");
        return;
      }

      if (newApproximateTime == '') {
        setMessage("Introduce el tiempo aproximado");
        return;
      }

      if (newLaborCosts == '') {
        setMessage("Introduce el costo por mano de obra");
        return;
      }

      if (newMaterial == '') {
        setMessage("Introduce los materiales necesarios");
        return;
      }

      if (newTools == '') {
        setMessage("Introduce las herramientas necesarias");
        return;
      }

      if (newTypeOfService == '') {
        setMessage("Introduce que tipo de servicio se realiza");
        return;
      }

      const newRepair = {
        name: newName,
        device: newDevice,
        approximate_time: Number(newApproximateTime),
        labor_costs: Number(newLaborCosts),
        material: newMaterial,
        tools: newTools,
        description: newDescription,
        type_of_service: newTypeOfService
      }
  
      try {
        const response = await createRepair(newRepair);
        console.log(response)
        reloadTable();
        setNewName('');
        setNewDevice('');
        setNewApproximateTime('');
        setNewLaborCosts('');
        setNewMaterial('');
        setNewTools('');
        setNewDescription('');
        setNewTypeOfService('');
        setOpenNewRepair(false);
      } catch (err) {
        console.error(err)
      }
    }

  // Funcion para iniciar el proceso de actualizar una reparacion
  const onStartEditRepair = async (id : number) => {
    setOpenEditRepair(true);
    try {
      const response = await getRepair(id);
      setIdRepair(response.repair[0].id_repair);
      setName(response.repair[0].name);
      setDevice(response.repair[0].device);
      setMaterial(response.repair[0].material);
      setTools(response.repair[0].tools);
      setDescription(response.repair[0].description);
      setTypeOfService(response.repair[0].type_of_service);
      setLaborCosts(response.repair[0].labor_costs);
      setApproximateTime(response.repair[0].approximate_time);
    } catch (err) {
      console.error(err);
    }
  }

  // Funcion para finalizar el proceso de actualizar una reparacion
  const onFinallyEditRepair = async (id : number) => {
  
    if (name == '') {
      setMessage("Introduce un nombre");
      return;
    }
  
    if (device == '') {
      setMessage("Introduce el dispositivo");
      return;
    }
  
    if (material == '') {
      setMessage("Introduce los materiales necesarios");
      return;
    }
  
    if (tools == '') {
      setMessage("Introduce las herramientas necesarias");
      return;
    }
  
    if (typeOfService == '') {
      setMessage("Introduce el tipo de servicio");
      return;
    }

    if (laborCosts == '') {
      setMessage("Introduce el costo de mano de obra");
      return;
    }

    if (approximateTime == '') {
      setMessage("Introduce el tiempo de trabajo");
      return;
    }
  
    const editRepair = {
      name: name,
      device: device,
      material: material,
      tools: tools,
      description: description,
      type_of_service: typeOfService,
      labor_costs: Number(laborCosts),
      approximate_time: Number(approximateTime)
    }

    try {
      const response = await updateRepair(id, editRepair);
      reloadTable();
      setIdRepair(0);
      setName('');
      setDevice('');
      setApproximateTime('');
      setLaborCosts('');
      setMaterial('');
      setTools('');
      setDescription('');
      setTypeOfService('');
      setOpenEditRepair(false);
    } catch (err) {
      console.error(err)
    }
  };

  // Funcion para iniciar el proceso de eliminacion de una reparacion
  const onStartDeleteRepair = async (id : number) => {
    setOpenDeleteRepair(true);
    try {
      const response = await getRepair(id);
      setIdRepair(response.repair[0].id_repair);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para terminar el proceso de eliminacion de una reparacion
  const onFinallyDeleteRepair = async (id : number) => {
    try {
      const response = await deleteRepair(id);
      reloadTable();
      setIdRepair(0);
      setOpenDeleteRepair(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mainRepairs">
      <Header/>
      <div className="bodyRepairs">
        <div className="bodyMainRepairs" style={{flexDirection: 'column'}}>

          <div className="titleRepairs">
            <h1>Reparaciones</h1>
          </div>

          <div className='searchDivRepairs'>
            <label>Buscar:</label>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='searchRepairs'
            ></input>

            <select value={filter} onChange={(e) => setFilter(e.target.value)} className='filterRepairs'>
              <option value={'Todos'}>Todos</option>
              <option value={'Celular'}>Celular</option>
              <option value={'Tablet'}>Tablet</option>
              <option value={'Patin'}>Patin</option>
            </select>
          </div>

          <TableRepair key={tableKey} search={search} filter={filter} onStartEditRepair={onStartEditRepair} onStartDeleteRepair={onStartDeleteRepair}/>

          <div className='buttonsRepairs'>
            <div className='buttonRepairs' onClick={() => setOpenNewRepair(true)}>
              <Image width={26} src={plus} alt=""/>
              <p style={{padding: '1% 3%'}}>Agregar nuevo</p>
            </div>

            <div className='buttonRepairs' onClick={() => router.push('./')}>
              <p style={{padding: '1% 8%'}}>Volver</p>
              <Image width={14} src={arrow} alt=""/>
            </div>
          </div>

        </div>

        <SideBar isUseRepairs={true} isUseContability={false} isUseAdmins={false} isUseHistory={false} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins} isOpenHistory={setOpenHistory}/>
      </div>

      <Modal isOpen={isOpenNewRepair} onClose={() => setOpenNewRepair(false)}>
        <div className='titlePopUp'>
          <h2>Nueva reparacion</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='Nombre:' 
            className='inputPopUp'
          ></input><br/>

          <select value={newDevice} onChange={(e) => setNewDevice(e.target.value)} className='inputPopUp'>
            <option value={''}>Dispositivo:</option>
            <option value={'Celular'}>Celular</option>
            <option value={'Tablet'}>Tablet</option>
            <option value={'{atin'}>Patin</option>
          </select><br/>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newApproximateTime}
            onChange={(e) => setNewApproximateTime(e.target.value)}
            placeholder='Tiempo aproximado (hrs):' 
            className='inputPopUp'
          ></input><br/>

          <input 
            value={newLaborCosts}
            onChange={(e) => setNewLaborCosts(e.target.value)}
            placeholder='Costo de mano de obra:' 
            className='inputPopUp'
          ></input><br/>
        </div>

        <textarea 
          value={newMaterial}
          onChange={(e) => setNewMaterial(e.target.value)}
          placeholder='Materiales:' 
          className='textareaPopUp'
        ></textarea><br/>

        <textarea 
          value={newTools}
          onChange={(e) => setNewTools(e.target.value)}
          placeholder='Herramientas:' 
          className='textareaPopUp'
        ></textarea><br/>

        <textarea 
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder='Descripcion:' 
          className='textareaPopUp'
        ></textarea><br/>
        
        <select value={newTypeOfService} onChange={(e) => setNewTypeOfService(e.target.value)} className='inputPopUp'>
          <option value={''}>Tipo de servicio:</option>
          <option value={'Reparacion'}>Reparacion</option>
          <option value={'Mantenimiento'}>Mantenimiento</option>
        </select><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}
        

        <button onClick={() => onSaveNewRepair()} className='buttonPopUp'>Crear reparacion</button>
      </Modal>

      <Modal isOpen={isOpenEditRepair} onClose={() => setOpenEditRepair(false)}>
        <div className='titlePopUp'>
          <h2>Editar reparacion</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nombre:' 
            className='inputPopUp'
          ></input><br/>

          <select value={device} onChange={(e) => setDevice(e.target.value)} className='inputPopUp'>
            <option value={''}>Dispositivo:</option>
            <option value={'Celular'}>Celular</option>
            <option value={'Tablet'}>Tablet</option>
            <option value={'{atin'}>Patin</option>
          </select><br/>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={approximateTime}
            onChange={(e) => setApproximateTime(e.target.value)}
            placeholder='Tiempo aproximado (hrs):' 
            className='inputPopUp'
          ></input><br/>

          <input 
            value={laborCosts}
            onChange={(e) => setLaborCosts(e.target.value)}
            placeholder='Costo de mano de obra:' 
            className='inputPopUp'
          ></input><br/>
        </div>

        <textarea 
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder='Materiales:' 
          className='textareaPopUp'
        ></textarea><br/>

        <textarea 
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          placeholder='Herramientas:' 
          className='textareaPopUp'
        ></textarea><br/>

        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Descripcion:' 
          className='textareaPopUp'
        ></textarea><br/>
        
        <select value={typeOfService} onChange={(e) => setTypeOfService(e.target.value)} className='inputPopUp'>
          <option value={''}>Tipo de servicio:</option>
          <option value={'Reparacion'}>Reparacion</option>
          <option value={'Mantenimiento'}>Mantenimiento</option>
        </select><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}
        

        <button onClick={() => onFinallyEditRepair(idRepair)} className='buttonPopUp'>Guardar cambios</button>
      </Modal>

      <Modal isOpen={isOpenDeleteRepair} onClose={() => setOpenDeleteRepair(false)}>
        <div className='titlePopUp'>
          <h2>ADVERTENCIA</h2>
        </div>

        <p>¿Esta seguro que desea eliminar a este tipo de reparacion?</p>

        <button onClick={() => onFinallyDeleteRepair(idRepair)} className='buttonPopUp' style={{background: '#FF5757'}}>Confirmar</button>
      </Modal>

      <Modal isOpen={isOpenContability} onClose={() => setOpenContability(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input placeholder='Introduce tu contraseña' className='inputPopUp'></input><br/>

        <button onClick={() => console.log("aceptar contabilidad")} className='buttonPopUp'>Continuar</button>
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