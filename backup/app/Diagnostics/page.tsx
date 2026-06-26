
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verify, verifyManager, verifyAdmin } from '../API/api';
import { getDiagnostic, createDiagnostic, updateDiagnostic, deleteDiagnostic } from '../API/Diagnostic/api';
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
import './diagnostic.css';

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
  const [isOpenNewDiagnostic, setOpenNewDiagnostic] = useState(false);
  const [isOpenNewQuote, setOpenNewQuote] = useState(false);
  const [isOpenConfirmDiagnostic, setOpenConfirmDiagnostic] = useState(false);
  const [isOpenEditDiagnostic, setOpenEditDiagnostic] = useState(false);
  const [isOpenDeleteDiagnostic, setOpenDeleteDiagnotsic] = useState(false);
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);
  const [isOpenHistory, setOpenHistory] = useState(false);

  // Contraseña temporal de admin y gerente
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Busqueda por nombre de cliente
  const [search, setSearch] = useState<string>('');

  // Mensajes de errores y soluciones
  const [message, setMessage] = useState<string>('');

  // Datos para nuevo diagnostico y cotizacion
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
  const [newPieceCost, setNewPieceCost] = useState<string>('');
  const [newFinalDiagnostic, setNewFinalDiagnostic] = useState<string>('');
  const [newRepair, setNewRepair] = useState<string>('');
  const [newMadeBy, setNewMadeBy] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [newRepairQuote, setNewRepairQuote] = useState<Repair[]>([]);
  const [idRepair, setIdRepair] = useState<Number>(0);
  const [pieceCost, setPieceCost] = useState<string>('');

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
  const [finalDiagnostic, setFinalDiagnostic] = useState<string>('');
  const [devicePassword, setDevicePassword] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');
  const [technicalDiagnosis, setTechnicalDiagnosis] = useState<string>('');
  const [idQuote, setIdQuote] = useState<number>(0);

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
    setNewPieceCost('');
    setNewFinalDiagnostic('');
    setNewRepair('');
    setNewMadeBy('');
    setNewPass('');

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

    setIdQuote(0);
    setIdRepair(0);
    setPieceCost('');
    setFinalDiagnostic('');

    setMessage('');
  }, [isOpenNewDiagnostic, isOpenEditDiagnostic, isOpenDeleteDiagnostic, isOpenNewQuote]);

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

  // Funcion para añadir precio a las reparaciones
  const handleInputChange = (index : string, value: Number) => {
    setInputValues({
      ...inputValues,
      [index]: value
    });
  };

  // Funcion para añadir una nueva reparacion a la cotizacion
  const onAddRepair = async (id : Number) => {
  
    if(id == 0) {
      setMessage('Ingresa por lo menos alguna reparacion');
      return;
    }
    setMessage('');
  
    for(let i=0; i < newRepairQuote.length; i++) {
      if(id == newRepairQuote[i].id_repair) {
        return;
      }
    }
  
    try {
      const response = await getRepair(id);
      setNewRepairQuote([...newRepairQuote, response.repair[0]])
    } catch(err) {
      console.error(err)
    }
  }

  // Funcion para guardar una nueva cotizacion
  const onSaveNewQuote = async () => {
    if (newCustomerName == '') {
      setMessage("Introduce el nombre del cliente");
      return;
    }
  
    if (newDevice == '') {
      setMessage("Introduce el modelo del dispositivo");
      return;
    }

    if (newContactPhone == '') {
      setMessage("Introduce el numero de contacto del cliente");
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

    if (newDeviceType == '') {
      setMessage("Introduce el tipo de dispositivo");
      return;
    }
  
    if (newFinalDiagnostic == '') {
      setMessage('Porfavor realiza el diagnostico tecnico');
      return;
    }

    if (newRepairQuote.length == 0) {
      setMessage('Selecciona el tipo de reparacion a realizar');
      return;
    }

    const repairsList = Object.entries(inputValues).map(([index, repair]) => ({
      id_repair: Number(index),
      piece_cost: Number(repair)
    }));

    let newRepairCost = 0
    for(let i=0; i < repairsList.length; i++) {
      for(let j=0; j < repairs.length; j++) {
        if (repairsList[i].id_repair == repairs[j].id_repair) {
          newRepairCost += repairs[j].labor_costs;
        }
      }
    }

    let pieceCost = 0;
    for(let i=0; i < repairsList.length; i++) {
      pieceCost += Number(repairsList[i].piece_cost);
    }

    let days = 0
    for(let i=0; i < repairsList.length; i++) {
      for(let j=0; j < repairs.length; j++) {
        if (repairsList[i].id_repair == repairs[j].id_repair) {
          days += repairs[j].approximate_time;
        }
      }
    }
    days = Math.ceil(days / 24)
  
    const newQuote = {
      device: newDevice,
      device_brand: newDeviceBrand,
      device_color: newDeviceColor,
      device_type: newDeviceType,
      customer_name: newCustomerName,
      contact_phone: newContactPhone,
      device_password: newDevicePassword,
      first_payment: Number(newFistPayment),
      previous_diagnosis: newFirstDescription,
      technical_diagnosis: newFinalDiagnostic,
      repair_cost: newRepairCost,
      piece_cost: pieceCost,
      final_price: newRepairCost + pieceCost,
      remaining_money: (newRepairCost + pieceCost) - Number(newPass),
      payment_method: "",
      status: "pendiente",
      past_days: days,
      made_by: Number(userId),

      repairs: repairsList
    }

    try {
      const response = await createQuote(newQuote);
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
      setIdRepair(0);
      setNewRepairQuote([]);
      setInputValues({});
      setOpenNewQuote(false);
      router.push('../Quote');
    } catch (err) {
      console.error(err)
    }
  }

  // Funcion para guardar un nuevo diagnostico
  const onSaveNewDiagnostic = async () => {
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
      setDeliveryDate(response.diagnostic[0].delivery_date.split('T')[0].split('-')[0] + '-' + response.diagnostic[0].delivery_date.split('T')[0].split('-')[1] + '-' + response.diagnostic[0].delivery_date.split('T')[0].split('-')[2]);
      setDeliveryTime(response.diagnostic[0].delivery_date.slice(11, 16));
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
      setDevice(response.diagnostic[0].device);
      setCustomerName(response.diagnostic[0].customer_name);
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
  const onConfirmDiagnostic = async (device : string, customer_name : string) => {
    setOpenConfirmDiagnostic(true);
    try {
      const response = await getDiagnostic(device, customer_name);
      setDevice(response.diagnostic[0].device);
      setCustomerName(response.diagnostic[0].customer_name);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para iniciar el proceso de crear una cotizacion
  const onStartNewQuote = async () => {
    setOpenConfirmDiagnostic(false);
    setOpenNewQuote(true);

    try {
      const response = await getDiagnostic(device, customerName);
      setNewCustomerName(response.diagnostic[0].customer_name);
      setNewDevice(response.diagnostic[0].device);
      setNewDeviceType(response.diagnostic[0].device_type);
      setNewFistPayment(response.diagnostic[0].first_payment);
      setNewDeviceBrand(response.diagnostic[0].device_brand);
      setNewContactPhone(response.diagnostic[0].contact_phone);
      setNewDevicePassword(response.diagnostic[0].device_password);
      setNewPass(response.diagnostic[0].first_payment);
      setNewFirstDescription(response.diagnostic[0].previous_diagnosis);
      setNewDeviceColor(response.diagnostic[0].device_color);
      setNewFinalDiagnostic(response.diagnostic[0].technical_diagnosis);
      setNewMadeBy(response.diagnostic[0].made_by);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para finalizar el proceso de crear una cotizacion
  const onFinallyNewQuote = async () => {

    if (newDevice == '') {
      setMessage('Introduce el nombre del dispositivo');
      return;
    }

    if (newDeviceBrand == '') {
      setMessage('Introduce la marca del dispositivo');
      return;
    }

    if (newDeviceColor == '') {
      setMessage('Introduce el color del dispositivo');
      return;
    }

    if (newDeviceType == '') {
      setMessage('Introduce el tipo del dispositivo');
      return;
    }

    if (newCustomerName == '') {
      setMessage('Introduce el nombre del cliente');
      return;
    }

    if (newContactPhone == '') {
      setMessage('Introduce el numero de contacto');
      return;
    }

    if (newFinalDiagnostic == '') {
      setMessage('Porfavor realiza el diagnostico tecnico');
      return;
    }

    if (Number(newRepair) == 0) {
      setMessage('Selecciona el tipo de reparacion a realizar');
      return;
    }

    let newRepairCost = 0
    for(let i=0; i < repairs.length; i++) {
      if (Number(newRepair) == repairs[i].id_repair) {
        newRepairCost = repairs[i].labor_costs;
      }
    }

    if (newPieceCost == '') {
      setMessage('Introduce el costo de las piezas necesarias');
      return;
    }

    let days = 0
    for(let i=0; i < repairs.length; i++) {
      if (Number(newRepair) == repairs[i].id_repair) {
        days = Math.ceil(repairs[i].approximate_time / 24);
      }
    }

    const newQuote = {
      device: newDevice,
      device_brand: newDeviceBrand,
      device_color: newDeviceColor,
      device_type: newDeviceType,
      customer_name: newCustomerName,
      contact_phone: newContactPhone,
      device_password: newDevicePassword,
      first_payment: Number(newPass),
      previous_diagnosis: newFirstDescription,
      technical_diagnosis: newFinalDiagnostic,
      repair: Number(newRepair),
      repair_cost: newRepairCost,
      piece_cost: Number(newPieceCost),
      final_price: newRepairCost + Number(newPieceCost),
      remaining_money: (newRepairCost + Number(newPieceCost)) - Number(newPass),
      payment_method: "",
      status: "pendiente",
      past_days: days,
      made_by: Number(newMadeBy)
    }

    try {
      const response = await createQuote(newQuote);
      router.push('../Quote')
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
            <h1>Cotizaciones</h1>
          </div>

          <div className='searchDivDiagnostic'>
            <label>Buscar:</label>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='searchDiagnostic'
            ></input>
          </div>

          <TableDiagnostic key={tableKey} search={search} onConfirmDiagnostic={onConfirmDiagnostic} onStartEditDiagnostic={onStartEditDiagnostic} onStartDeleteDiagnostic={onStartDeleteDiagnostic}/>

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

        <SideBar isUseRepairs={false} isUseContability={false} isUseAdmins={false} isUseHistory={false} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins} isOpenHistory={setOpenHistory}/>
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
        

        <button onClick={() => onSaveNewDiagnostic()} className='buttonPopUp'>Generar diagnostico</button>
      </Modal>

      <Modal isOpen={isOpenNewQuote} onClose={() => setOpenNewQuote(false)}>
        <div className='titlePopUp' style={{background: '#8C52FF'}}>
          <h2>Nueva Cotizacion</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)}
            placeholder='Nombre:' 
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
            value={newDeviceBrand}
            onChange={(e) => setNewDeviceBrand(e.target.value)}
            placeholder='Marca del dispositivo:' 
            className='inputPopUp'
          ></input>

          <input 
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            placeholder='Telefono de contacto:' 
            className='inputPopUp'
          ></input>
        </div>

        <input 
          value={newDeviceColor}
          onChange={(e) => setNewDeviceColor(e.target.value)}
          placeholder='Color del dispositivo:' 
          className='inputPopUp'
        ></input>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder='Abono:' 
            className='inputPopUp'
          ></input>

          <select value={newDeviceType} onChange={(e) => setNewDeviceType(e.target.value)} className='inputPopUp'>
            <option value={''}>Tipo de dispositivo:</option>
            <option value={'Celular'}>Celular</option>
            <option value={'Laptop'}>Laptop</option>
            <option value={'Patin'}>Patin</option>
            <option value={'Bicicleta'}>BIcicleta</option>
          </select><br/>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <select onChange={(e) => setIdRepair(Number(e.target.value))} className='inputPopUp'>
            <option value={0}>Tipo de reparacion:</option>
            {repairs.map((repair, index) => (
              <option value={repair.id_repair} key={index}>{repair.name}</option>
            ))}
          </select><br/>

          <button onClick={() => onAddRepair(idRepair)} className='buttonAddPopUp'>Añadir</button>
        </div>

        {newRepairQuote.map((repair, index) => (
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <p>{repair.name}</p>
            <input
              value={inputValues[repair.id_repair] || ''}
              onChange={(e) => handleInputChange(String(repair.id_repair), Number(e.target.value))}
              className='inputPopUp'
              placeholder='Costo de la reparacion'
            ></input>
          </div>
        ))}

        <textarea
          value={newFinalDiagnostic}
          onChange={(e) => setNewFinalDiagnostic(e.target.value)}
          placeholder='Diagnostico final:' 
          className='inputPopUp'
        ></textarea>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onSaveNewQuote()} className='buttonPopUp'>Confirmar</button>
      </Modal>

      <Modal isOpen={isOpenConfirmDiagnostic} onClose={() => setOpenConfirmDiagnostic(false)}>
        <div className='titlePopUp'>
          <h2>ACEPTAR</h2>
        </div>

        <p>Desea iniciar el proceso para realizar una cotizacion</p>

        <button onClick={() => onStartNewQuote()} className='buttonPopUp' style={{background: '#DAFFAB'}}>Confirmar</button>
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
            type='date'
            value={deliveryDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDeliveryDate(e.target.value)}
            placeholder='Dia de entrega (dd-mm-aaaa):' 
            className='inputPopUp'
          ></input>

          <input 
            type='time'
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
          value={firstDescription}
          onChange={(e) => setFirstDescription(e.target.value)}
          placeholder='Descripcion inicial:' 
          className='inputPopUp'
        ></textarea>

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
        

        <button onClick={() => onFinallyEditDiagnostic()} className='buttonPopUp'>Guardar Cambios</button>
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