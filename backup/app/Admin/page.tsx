
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { getAdmin, createAdmin, updateAdmin, deleteAdmin } from '../API/Admin/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import plus from '@/image/plus.png';
import arrow from '@/image/arrow.png';
import Modal from '.././components/PopUp/PopUp';
import Header from '.././components/Header/Header';
import SideBar from '.././components/SideBar/SideBar';
import TableAdmin from '@/app/components/Tables/tableAdmin/tableAdmin';
import './admin.css';

export default function Page() {

  // Movimiento entre rutas
  const router = useRouter();

  // Datos para recarga la tabla
  const [tableKey, setTableKey] = useState(0);
  const reloadTable = () => {
    setTableKey(prev => prev + 1);
  };

  // Variables para abrir pantallas emergentes
  const [isOpenNewAdmin, setOpenNewAdmin] = useState(false);
  const [isOpenEditAdmin, setOpenEditAdmin] = useState(false);
  const [isOpenDeleteAdmin, setOpenDeleteAdmin] = useState(false);
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);

  // Contraseña temporal de admin y gerente
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Busqueda por nombre de cliente
  const [search, setSearch] = useState<string>('');

  // Mensajes de errores y soluciones
  const [message, setMessage] = useState<string>('');

  // Datos para nuevo usuario
  const [newName, setNewName] = useState<string>('');
  const [newLastName, setNewLastName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newType, setNewType] = useState<string>('');

  // Datos para editar un usuario
  const [idAdmin, setIdAdmin] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [type, setType] = useState<string>('');

  useEffect(() => {
    setNewName('');
    setNewLastName('');
    setNewPhone('');
    setNewPassword('');
    setNewType('');

    setIdAdmin(0);
    setName('');
    setLastName('');
    setPhone('');
    setPassword('');
    setType('');

    setMessage('');
  }, [isOpenNewAdmin, isOpenEditAdmin, isOpenDeleteAdmin]);

  // Funcion para filtrar por nombre los Administradores
  const onFilter = (admin : String[], newText : string) => {
    
  }

  // Funcion para cambiar a interfaces de Gerentes y Admins
  const onChangeAdmin = (option : string) => {
    
    if (passwordAdmin == "") {
      console.log("Introduce una contraseña");
      return
    };

    if (option === "repairs") {
      console.log("seleccionaste reparaciones");
    }

    if (option === "contability") {
      console.log("seleccionaste contabilidad");
    }
  };

  // Funcion para guardar un nuevo administrador
  const onSaveNewAdmin = async () => {
    if (newName == '') {
      setMessage("Introduce un nombre");
      return;
    }

    if (newLastName == '') {
      setMessage("Introduce apellidos");
      return;
    }

    if (newPhone == '') {
      setMessage("Introduce un numero de telefono");
      return;
    }

    if (newPassword == '') {
      setMessage("Introduce una contraseña");
      return;
    }

    if (newType == '') {
      setMessage("Introduce un tipo de administrador");
      return;
    }

    const newAdmin = {
      name: newName,
      last_name: newLastName,
      phone: newPhone,
      password: newPassword,
      administrator_type: newType
    }

    try {
      const response = await createAdmin(newAdmin);
      reloadTable();
      setNewName('');
      setNewLastName('');
      setNewPhone('');
      setNewPassword('');
      setNewType('');
      setOpenNewAdmin(false);
    } catch (err) {
      console.error(err)
    }
  }

  // Funcion para iniciar el proceso de actualizar un administrador
  const onStartEditAdmin = async (id : number) => {
    setOpenEditAdmin(true);
    try {
      const response = await getAdmin(id);
      setIdAdmin(response.admin[0].id_admin);
      setName(response.admin[0].name);
      setLastName(response.admin[0].last_name);
      setPhone(response.admin[0].phone);
      setPassword(response.admin[0].password);
      setType(response.admin[0].administrator_type);
    } catch (err) {
      console.error(err);
    }
  }

  // Funcion para finalizar el proceso de actualizar un administrador
  const onFinallyEditAdmin = async (id : number) => {

    if (name == '') {
      setMessage("Introduce un nombre");
      return;
    }

    if (lastName == '') {
      setMessage("Introduce apellidos");
      return;
    }

    if (phone == '') {
      setMessage("Introduce un numero de telefono");
      return;
    }

    if (password == '') {
      setMessage("Introduce una contraseña");
      return;
    }

    if (type == '') {
      setMessage("Introduce un tipo de administrador");
      return;
    }

    const editAdmin = {
      name: name,
      last_name: lastName,
      phone: phone,
      password: password,
      administrator_type: type
    }

    try {
      console.log(id, editAdmin)
      const response = await updateAdmin(id, editAdmin);
      reloadTable();
      setIdAdmin(0);
      setName('');
      setLastName('');
      setPhone('');
      setPassword('');
      setType('');
      setOpenEditAdmin(false);
    } catch (err) {
      console.error(err)
    }
  };

  // Funcion para iniciar el proceso de eliminacion de un administrador o gerente
  const onStartDeleteAdmin = async (id : number) => {
    setOpenDeleteAdmin(true);
    try {
      const response = await getAdmin(id);
      setIdAdmin(response.admin[0].id_admin);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para terminar el proceso de eliminacion de un administrador o gerente
  const onFinallyDeleteAdmin = async (id : number) => {
    try {
      const response = await deleteAdmin(id);
      reloadTable();
      setIdAdmin(0);
      setOpenDeleteAdmin(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mainAdmin">
      <Header/>

      <div className="bodyAdmin">
        <div className="bodyMainAdmin" style={{flexDirection: 'column'}}>

          <div className="titleAdmin">
            <h1>Administradores</h1>
          </div>

          <div className='searchDivAdmin'>
            <label>Buscar:</label>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='searchAdmin'
            ></input>
          </div>

          <TableAdmin key={tableKey} search={search} onStartEditAdmin={onStartEditAdmin} onStartDeleteAdmin={onStartDeleteAdmin}/>

          <div className='buttonsAdmin'>
            <div className='buttonAdmin' onClick={() => setOpenNewAdmin(true)}>
              <Image width={26} src={plus} alt=""/>
              <p style={{padding: '1% 3%'}}>Agregar nuevo</p>
            </div>

            <div className='buttonAdmin' onClick={() => router.push('./')}>
              <p style={{padding: '1% 8%'}}>Volver</p>
              <Image width={14} src={arrow} alt=""/>
            </div>
          </div>

        </div>

        <SideBar isUseRepairs={false} isUseContability={false} isUseAdmins={true} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins}/>
      </div>

      <Modal isOpen={isOpenNewAdmin} onClose={() => setOpenNewAdmin(false)}>
        <div className='titlePopUp'>
          <h2>Nuevo usuario</h2>
        </div>

        <label className='textPopUp'>Nombre:</label><br/>
        <input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='Introduce tu nombre(s)' 
          className='inputPopUp'
        ></input><br/>

        <label>Apellidos:</label><br/>
        <input 
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          placeholder='Introduce tus apellidos' 
          className='inputPopUp'
        ></input><br/>

        <label>Num de telefono:</label><br/>
        <input 
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder='Introduce tu numero de telefono' 
          className='inputPopUp'
        ></input><br/>

        <label>Contraseña:</label><br/>
        <input 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        <label>Tipo:</label><br/>
        <select value={newType} onChange={(e) => setNewType(e.target.value)} className='inputPopUp'>
          <option value={''}>Introduce un tipo</option>
          <option value={'Admin'}>Administrador</option>
          <option value={'Gerente'}>Gerente</option>
        </select><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}
        

        <button onClick={() => onSaveNewAdmin()} className='buttonPopUp'>Crear usuario</button>
      </Modal>

      <Modal isOpen={isOpenEditAdmin} onClose={() => setOpenEditAdmin(false)}>
        <div className='titlePopUp'>
          <h2>Editar usuario</h2>
        </div>

        <label className='textPopUp'>Nombre:</label><br/>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Introduce tu nombre(s)' 
          className='inputPopUp'
        ></input><br/>

        <label>Apellidos:</label><br/>
        <input 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Introduce tus apellidos' 
          className='inputPopUp'
        ></input><br/>

        <label>Num de telefono:</label><br/>
        <input 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Introduce tu numero de telefono' 
          className='inputPopUp'
        ></input><br/>

        <label>Contraseña:</label><br/>
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        <label>Tipo:</label><br/>
        <select value={type} onChange={(e) => setType(e.target.value)} className='inputPopUp'>
          <option value={''}>Introduce un tipo</option>
          <option value={'Admin'}>Administrador</option>
          <option value={'Gerente'}>Gerente</option>
        </select><br/>

        <button onClick={() => onFinallyEditAdmin(idAdmin)} className='buttonPopUp'>Guardar cambios</button>
      </Modal>

      <Modal isOpen={isOpenDeleteAdmin} onClose={() => setOpenDeleteAdmin(false)}>
        <div className='titlePopUp'>
          <h2>ADVERTENCIA</h2>
        </div>

        <p>¿Esta seguro que desea eliminar a este usuario?</p>

        <button onClick={() => onFinallyDeleteAdmin(idAdmin)} className='buttonPopUp' style={{background: '#FF5757'}}>Confirmar</button>
      </Modal>

      <Modal isOpen={isOpenRepairs} onClose={() => setOpenRepairs(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input placeholder='Introduce tu contraseña' className='inputPopUp'></input><br/>

        <button onClick={() => console.log("aceptar reparacion")} className='buttonPopUp'>Continuar</button>
      </Modal>

      <Modal isOpen={isOpenContability} onClose={() => setOpenContability(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input placeholder='Introduce tu contraseña' className='inputPopUp'></input><br/>

        <button onClick={() => console.log("aceptar contabilidad")} className='buttonPopUp'>Continuar</button>
      </Modal>
    </div>
  );
}