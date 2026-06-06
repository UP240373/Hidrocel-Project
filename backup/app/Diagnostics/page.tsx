
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verifyManager, verifyAdmin } from '../API/api';
import { getDiagnostic, createDiagnostic, updateDiagnostic, deleteDiagnostic } from '../API/Diagnostic/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import plus from '@/image/plus.png';
import arrow from '@/image/arrow.png';
import Modal from '.././components/PopUp/PopUp';
import Header from '.././components/Header/Header';
import SideBar from '.././components/SideBar/SideBar';
import TableDiagnostic from '@/app/components/Tables/tableDiagnostic/tableDiagnostic';
import './diagnostic.css';

export default function Page() {

  // Movimiento entre rutas
  const router = useRouter();

  // Id del usuario que inicio sesion
  const [userId, setUserId] = useState<string | null>('');

  useEffect(() => {
    setUserId(localStorage.getItem('user_id'));
  }, []);

  // Datos para recarga la tabla
  const [tableKey, setTableKey] = useState(0);
  const reloadTable = () => {
    setTableKey(prev => prev + 1);
  };

  // Variables para abrir pantallas emergentes
  const [isOpenNewDiagnostic, setOpenNewDiagnostic] = useState(false);
  const [isOpenConfirmDiagnostic, setOpenConfirmDiagnostic] = useState(false);
  const [isOpenEditDiagnostic, setOpenEditDiagnostic] = useState(false);
  const [isOpenDeleteDiagnostic, setOpenDeleteDiagnotsic] = useState(false);
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);

  // Contraseña temporal de admin y gerente
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Busqueda por nombre de cliente
  const [search, setSearch] = useState<string>('');

  // Mensajes de errores y soluciones
  const [message, setMessage] = useState<string>('');

  // Datos para nuevo diagnostico
  const [newCustomerName, setNewCustomerName] = useState<string>('');
  const [newDevice, setNewDevice] = useState<string>('');
  const [newDeliveryDate, setNewDeliveryDate] = useState<string>('');
  const [newDeliveryTime, setNewDeliveryTime] = useState<string>('');
  const [newFistPayment, setNewFistPayment] = useState<string>('');
  const [newContactPhone, setNewContactPhone] = useState<string>('');
  const [newDeviceBrand, setNewDeviceBrand] = useState<string>('');
  const [newDeviceColor, setNewDeviceColor] = useState<string>('');
  const [newDeviceType, setNewDeviceType] = useState<string>('');
  const [newFirstDescription, setNewFirstDescription] = useState<string>('');
  const [newDevicePassword, setNewDevicePassword] = useState<string>('');

  // Datos para editar un diagnostico
  const [customerNameQuery, setCustomerNameQuery] = useState<string>('');
  const [deviceQuery, setDeviceQuery] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [device, setDevice] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [fistPayment, setFistPayment] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [deviceBrand, setDeviceBrand] = useState<string>('');
  const [deviceColor, setDeviceColor] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [firstDescription, setFirstDescription] = useState<string>('');
  const [devicePassword, setDevicePassword] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [technicalDiagnosis, setTechnicalDiagnosis] = useState<string>('');

  useEffect(() => {
    setNewCustomerName('');
    setNewDevice('');
    setNewDeliveryDate('');
    setNewDeliveryTime('');
    setNewFistPayment('');
    setNewContactPhone('');
    setNewDeviceBrand('');
    setNewDeviceColor('');
    setNewDeviceType('');
    setNewFirstDescription('');
    setNewDevicePassword('');

    setCustomerName('');
    setDevice('');
    setDeliveryDate('');
    setDeliveryTime('');
    setFistPayment('');
    setContactPhone('');
    setDeviceBrand('');
    setDeviceColor('');
    setDeviceType('');
    setFirstDescription('');
    setDevicePassword('');
    setEstimatedPrice('');
    setTechnicalDiagnosis('');

    setMessage('');
  }, [isOpenNewDiagnostic, isOpenEditDiagnostic, isOpenDeleteDiagnostic]);

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
        router.push("../Admin");
      } catch (err) {
        console.error(err)
      }
    }
  };

  // Funcion para guardar un nuevo administrador
    const onSaveNewAdmin = async () => {
      if (newCustomerName == '') {
        setMessage("Introduce el nombre del cliente");
        return;
      }

      if (newDevice == '') {
        setMessage("Introduce el modelo del dispositivo");
        return;
      }

      if (newDeliveryDate == '') {
        setMessage("Introduce el dia de entrega");
        return;
      }

      if (newDeliveryTime == '') {
        setMessage("Introduce la hora de entrega");
        return;
      }

      if (newFistPayment == '') {
        setNewFistPayment('0');
      }

      if (newDeviceBrand == '') {
        setMessage("Introduce la marca");
        return;
      }

      if (newDeviceColor == '') {
        setMessage("Introduce el color del dispositivo");
        return;
      }

      if (newFirstDescription == '') {
        setMessage("Introduce el problema del dispositivo");
        return;
      }

      const newDiagnostic = {
        device: newDevice,
        device_brand: newDeviceBrand,
        device_color: newDeviceColor,
        device_type: newDeviceType,
        customer_name: newCustomerName,
        contact_phone: newContactPhone,
        device_password: newDevicePassword,
        first_payment: Number(newFistPayment),
        previous_diagnosis: newFirstDescription,
        technical_diagnosis: '',
        estimated_price: 0,
        delivery_date: newDeliveryDate + " " + newDeliveryTime,
        made_by: Number(userId)
      }

      try {
        const response = await createDiagnostic(newDiagnostic);
        reloadTable();
        setNewDevice('');
        setNewDeviceBrand('');
        setNewDeviceColor('');
        setNewDeviceType('');
        setNewCustomerName('');
        setNewContactPhone('');
        setNewDevicePassword('');
        setNewFistPayment('');
        setNewFirstDescription('');
        setNewDeliveryDate('');
        setNewDeliveryTime('');
        setOpenNewDiagnostic(false);
      } catch (err) {
        console.error(err)
      }
    }

  // Funcion para iniciar el proceso de actualizar un diagnostico
  const onStartEditDiagnostic = async (device : string, customer_name : string) => {
    setOpenEditDiagnostic(true);
    

    try {
      const response = await getDiagnostic(device, customer_name);
      setCustomerNameQuery(response.diagnostic[0].customer_name);
      setDeviceQuery(response.diagnostic[0].device);
      setCustomerName(response.diagnostic[0].customer_name);
      setDevice(response.diagnostic[0].device);
      setDeliveryDate(response.diagnostic[0].delivery_date.split('T')[0].split('-')[2] + '-' + response.diagnostic[0].delivery_date.split('T')[0].split('-')[1] + '-' + response.diagnostic[0].delivery_date.split('T')[0].split('-')[0]);
      setDeliveryTime(response.diagnostic[0].delivery_date.split('T')[1].split(':00')[0]);
      setFistPayment(response.diagnostic[0].first_payment);
      setContactPhone(response.diagnostic[0].contact_phone);
      setDeviceBrand(response.diagnostic[0].device_brand);
      setDeviceColor(response.diagnostic[0].device_color);
      setDeviceType(response.diagnostic[0].device_type);
      setFirstDescription(response.diagnostic[0].previous_diagnosis);
      setDevicePassword(response.diagnostic[0].device_password);
      setEstimatedPrice(response.diagnostic[0].estimated_price);
      setTechnicalDiagnosis(response.diagnostic[0].technical_diagnosis);
    } catch (err) {
      console.error(err);
    }
  }

  // Funcion para finalizar el proceso de actualizar un diagnostico
  const onFinallyEditDiagnostic = async () => {
    if (customerName == '') {
      setMessage("Introduce el nombre del cliente");
      return;
    }

    if (device == '') {
      setMessage("Introduce el modelo del dispositivo");
      return;
    }

    if (deliveryDate == '') {
      setMessage("Introduce el dia de entrega");
      return;
    }

    if (deliveryTime == '') {
      setMessage("Introduce la hora de entrega");
      return;
    }

    if (fistPayment == '') {
      setNewFistPayment('0');
    }

    if (deviceBrand == '') {
      setMessage("Introduce la marca");
      return;
    }

    if (deviceColor == '') {
      setMessage("Introduce el color del dispositivo");
      return;
    }

    if (technicalDiagnosis == '') {
      setMessage("Introduce el problema del dispositivo");
      return;
    }
  
    const diagnostic = {
      device: device,
      device_brand: deviceBrand,
      device_color: deviceColor,
      device_type: deviceType,
      customer_name: customerName,
      contact_phone: contactPhone,
      device_password: devicePassword,
      first_payment: Number(fistPayment),
      previous_diagnosis: firstDescription,
      technical_diagnosis: technicalDiagnosis,
      estimated_price: Number(estimatedPrice),
      delivery_date: deliveryDate + " " + deliveryTime,
      made_by: Number(userId)
    }
  
    try {
      const response = await updateDiagnostic(deviceQuery, customerNameQuery, diagnostic);
      console.log(response);
      reloadTable();
      setCustomerName('');
      setDevice('');
      setDeliveryDate('');
      setDeliveryTime('');
      setFistPayment('');
      setContactPhone('');
      setDeviceBrand('');
      setDeviceColor('');
      setDeviceType('');
      setFirstDescription('');
      setDevicePassword('');
      setEstimatedPrice('');
      setTechnicalDiagnosis('');
      setOpenEditDiagnostic(false);
    } catch (err) {
      console.error(err)
    }
  };

  // Funcion para iniciar el proceso de eliminacion de un diagnostico
  const onStartDeleteDiagnostic = async (device : string, customer_name : string) => {
    setOpenDeleteDiagnotsic(true);
    try {
      const response = await getDiagnostic(device, customer_name);
      setDevice(response.diagnostics[0].device);
      setCustomerName(response.diagnostics[0].customer_name);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para terminar el proceso de eliminacion de un administrador o gerente
  const onFinallyDeleteDiagnostic = async (device : string, customer_name : string) => {
    try {
      const response = await deleteDiagnostic(device, customer_name);
      console.log(response)
      reloadTable();
      setDevice('');
      setCustomerName('');
      setOpenDeleteDiagnotsic(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para iniciar el proceso de confirmacion de un diagnostico
  const onStartConfirmDiagnostic = async (device : string, customer_name : string) => {
    setOpenConfirmDiagnostic(true);
    try {
      const response = await getDiagnostic(device, customer_name);
      setDevice(response.diagnostics[0].device);
      setCustomerName(response.diagnostics[0].customer_name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mainDiagnostic">
      <Header/>

      <div className="bodyDiagnostic">
        <div className="bodyMainDiagnostic" style={{flexDirection: 'column'}}>

          <div className="titleDiagnostic">
            <h1>Diagnosticos</h1>
          </div>

          <div className='searchDivDiagnostic'>
            <label>Buscar:</label>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='searchDiagnostic'
            ></input>
          </div>

          <TableDiagnostic key={tableKey} search={search} onStartConfirmDiagnostic={onStartConfirmDiagnostic} onStartEditDiagnostic={onStartEditDiagnostic} onStartDeleteDiagnostic={onStartDeleteDiagnostic}/>

          <div className='buttonsDiagnostic'>
            <div className='buttonDiagnostic' onClick={() => setOpenNewDiagnostic(true)}>
              <Image width={26} src={plus} alt=""/>
              <p style={{padding: '1% 3%'}}>Agregar nuevo</p>
            </div>
            
            <div className='buttonDiagnostic' onClick={() => router.push('./')}>
              <p style={{padding: '1% 8%'}}>Volver</p>
              <Image width={14} src={arrow} alt=""/>
            </div>
          </div>
        </div>

        <SideBar isUseRepairs={false} isUseContability={false} isUseAdmins={false} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins}/>
      </div>

      <Modal isOpen={isOpenNewDiagnostic} onClose={() => setOpenNewDiagnostic(false)}>
        <div className='titlePopUp'>
          <h2>Nuevo diagnostico</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)}
            placeholder='Nombre del cliente:' 
            className='inputPopUp'
          ></input>

          <input 
            value={newDevice}
            onChange={(e) => setNewDevice(e.target.value)}
            placeholder='Dispositivo:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            type='date'
            value={newDeliveryDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setNewDeliveryDate(e.target.value)}
            placeholder='Dia de entrega (dd-mm-aaaa):' 
            className='inputPopUp'
          ></input>

          <input 
            type='time'
            value={newDeliveryTime}
            onChange={(e) => setNewDeliveryTime(e.target.value)}
            placeholder='Hora de entrega:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newFistPayment}
            onChange={(e) => setNewFistPayment(e.target.value)}
            placeholder='Abono:' 
            className='inputPopUp'
          ></input>

          <input 
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            placeholder='Numero de contacto:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newDeviceBrand}
            onChange={(e) => setNewDeviceBrand(e.target.value)}
            placeholder='Marca del telefono:' 
            className='inputPopUp'
          ></input>

          <input 
            value={newDeviceColor}
            onChange={(e) => setNewDeviceColor(e.target.value)}
            placeholder='Color del telefono:' 
            className='inputPopUp'
          ></input>
        </div>

        <input 
          value={newDevicePassword}
          onChange={(e) => setNewDevicePassword(e.target.value)}
          placeholder='Contraseña del dispositivo:' 
          className='inputPopUp'
        ></input><br/>

        <textarea
          value={newFirstDescription}
          onChange={(e) => setNewFirstDescription(e.target.value)}
          placeholder='Descripcion del cliente:' 
          className='inputPopUp'
        ></textarea>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}
        

        <button onClick={() => onSaveNewAdmin()} className='buttonPopUp'>Generar diagnostico</button>
      </Modal>

      <Modal isOpen={isOpenConfirmDiagnostic} onClose={() => setOpenConfirmDiagnostic(false)}>
        <div className='titlePopUp'>
          <h2>ACEPTAR</h2>
        </div>

        <p>Desea iniciar el proceso para realizar una cotizacion</p>

        <button onClick={() => console.log("Iniciar cotizacion")} className='buttonPopUp' style={{background: '#DAFFAB'}}>Confirmar</button>
      </Modal>

      <Modal isOpen={isOpenEditDiagnostic} onClose={() => setOpenEditDiagnostic(false)}>
        <div className='titlePopUp'>
          <h2>Editar diagnostico</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder='Nombre del cliente:' 
            className='inputPopUp'
          ></input>

          <input 
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            placeholder='Dispositivo:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={deliveryDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDeliveryDate(e.target.value)}
            placeholder='Dia de entrega (dd-mm-aaaa):' 
            className='inputPopUp'
          ></input>

          <input 
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            placeholder='Hora de entrega:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={fistPayment}
            onChange={(e) => setFistPayment(e.target.value)}
            placeholder='Abono:' 
            className='inputPopUp'
          ></input>

          <input 
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder='Numero de contacto:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={deviceBrand}
            onChange={(e) => setDeviceBrand(e.target.value)}
            placeholder='Marca del telefono:' 
            className='inputPopUp'
          ></input>

          <input 
            value={deviceColor}
            onChange={(e) => setDeviceColor(e.target.value)}
            placeholder='Color del telefono:' 
            className='inputPopUp'
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={estimatedPrice}
            onChange={(e) => setEstimatedPrice(e.target.value)}
            placeholder='Precio estimado:' 
            className='inputPopUp'
          ></input>

          <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} className='inputPopUp'>
            <option value={''}>Tipo de dispositivo:</option>
            <option value={'Celular'}>Celular</option>
            <option value={'Laptop'}>Laptop</option>
            <option value={'Patin'}>Patin</option>
            <option value={'Bicicleta'}>BIcicleta</option>
          </select><br/>
        </div>

        <textarea
          value={technicalDiagnosis}
          onChange={(e) => setTechnicalDiagnosis(e.target.value)}
          placeholder='Descripcion tecnica:' 
          className='inputPopUp'
        ></textarea>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}
        

        <button onClick={() => onFinallyEditDiagnostic()} className='buttonPopUp'>Generar diagnostico</button>
      </Modal>

      <Modal isOpen={isOpenDeleteDiagnostic} onClose={() => setOpenDeleteDiagnotsic(false)}>
        <div className='titlePopUp'>
          <h2>ADVERTENCIA</h2>
        </div>

        <p>¿Esta seguro que desea eliminar este diagnostico?</p>

        <button onClick={() => onFinallyDeleteDiagnostic(device, customerName)} className='buttonPopUp' style={{background: '#FF5757'}}>Confirmar</button>
      </Modal>

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

    </div>
  );
}