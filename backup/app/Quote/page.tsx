
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verify, verifyManager, verifyAdmin } from '../API/api';
import { addHistory } from '../API/History/api';
import { getQuote, createQuote, updateQuote } from '../API/Quote/api';
import { getRepairs, getRepair } from '../API/Repair/api';
import { getAdmin } from '../API/Admin/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import plus from '@/image/plus.png';
import arrow from '@/image/arrow.png';
import Modal from '.././components/PopUp/PopUp';
import Header from '.././components/Header/Header';
import SideBar from '.././components/SideBar/SideBar';
import TableQuote from '@/app/components/Tables/tableQuote/tableQuote';
import './quote.css';

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
  const [isOpenNewQuote, setOpenNewQuote] = useState(false);
  const [isOpenSeeQuote, setOpenSeeQuote] = useState(false);
  const [isOpenEditQuote, setOpenEditQuote] = useState(false);
  const [isOpenFinallyQuote, setOpenFinallyQuote] = useState(false);
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);
  const [isOpenHistory, setOpenHistory] = useState(false);

  // Contraseña temporal de admin y gerente
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Busqueda por nombre del cliente y tipo de dispositivo
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

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
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [newRepair, setNewRepair] = useState<Repair[]>([]);
  const [idRepair, setIdRepair] = useState<Number>(0);
  const [newMadeBy, setNewMadeBy] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');

  // Datos para metodos de pago
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>('');

  // Datos para editar un usuario
  const [idQuote, setIdQuote] = useState<number>(0);
  const [device, setDevice] = useState<string>('');
  const [deviceBrand, setDeviceBrand] = useState<string>('');
  const [deviceColor, setDeviceColor] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [devicePassword, setDevicePassword] = useState<string>('');
  const [firstPayment, setFirstPayment] = useState<string>('');
  const [firstDiagnostic, setFirstDiagnostic] = useState<string>('');
  const [finalDiagnostic, setFinalDiagnostic] = useState<string>('');
  const [repair, setRepair] = useState<string>('');
  const [repairCost, setRepairCost] = useState<string>('');
  const [pieceCost, setPieceCost] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<string>('');
  const [remainingMoney, setRemainingMoney] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [madeBy, setMadeBy] = useState<string>('');
  
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
    setNewRepair([]);
    setNewMadeBy('');
    setNewPass('');

    setNewPaymentMethod('');

    setIdQuote(0);
    setIdRepair(0);
    setFirstPayment('');
    setRepair('');
    setRepairCost('');
    setPieceCost('');
    setFinalDiagnostic('');

    setMessage('');
  }, [isOpenSeeQuote, isOpenNewQuote, isOpenEditQuote, isOpenFinallyQuote])

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
        router.push("./Repairs");
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

    for(let i=0; i < newRepair.length; i++) {
      console.log(newRepair[i].id_repair)
      if(id == newRepair[i].id_repair) {
        return;
      }
    }

    try {
      const response = await getRepair(id);
      setNewRepair([...newRepair, response.repair[0]])
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

    if (newRepair.length == 0) {
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
      setNewRepair([]);
      setInputValues({});
      setOpenNewQuote(false);
    } catch (err) {
      console.error(err)
    }
  }

  // Funcion para iniciar el proceo para ver una cotizacion
  const onSeeQuote = async (id: number) => {
    setOpenSeeQuote(true);
    try {
      const response = await getQuote(id);
      console.log(response)
      setIdQuote(response.quote[0].id_quote);
      setDevice("Dispositivo: " + response.quote[0].device);
      setDeviceBrand("Marca: " + response.quote[0].device_brand);
      setDeviceColor("Color: " + response.quote[0].device_color);
      setDeviceType("Tipo: " + response.quote[0].device_type);
      setCustomerName("Cliente: " + response.quote[0].customer_name);
      setContactPhone("Numero de contacto: " + response.quote[0].contact_phone);
      setDevicePassword("Contraseña: " + response.quote[0].device_password);
      setFirstPayment("Abono: " + response.quote[0].first_payment);
      setFirstDiagnostic("Primer diagnostico:\n" + response.quote[0].previous_diagnosis);
      setFinalDiagnostic("Final diagnostico:\n" + response.quote[0].technical_diagnosis);

      const repairs : string[] = [];
      for (let i = 0; i < response.repairs.length; i++) {
        const result = await getRepair(Number(response.repairs[i]));
        console.log(result.repair[0].name)
        repairs.push(result.repair[0].name)
      }
      setRepair("Reparaciones: " + repairs.join(', '));

      setRepairCost(response.quote[0].repair_cost);
      setPieceCost(response.quote[0].piece_cost);
      setFinalPrice("Costo final: " + response.quote[0].final_price);
      setRemainingMoney("Monto restante: " + response.quote[0].remaining_money);
      setPaymentMethod(response.quote[0].payment_method);
      setDeliveryDate("Fecha de entrega: " + response.quote[0].delivery_date);
      
      const users = await getAdmin(Number(response.quote[0].made_by));
      console.log(users)
      setMadeBy("Generado por: " + users.admin[0].name + " " +users.admin[0].last_name);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para iniciar el proceso de actualizar una cotizacion
  const onStartEditQuote = async (id : number) => {
    setOpenEditQuote(true);
    try {
      const response = await getQuote(id);
      setIdQuote(response.quote[0].id_quote);
      setFirstPayment(response.quote[0].first_payment);
      setRepairCost(response.quote[0].repair_cost);
      setPieceCost(response.quote[0].piece_cost);
      setFinalDiagnostic(response.quote[0].technical_diagnosis);
    } catch (err) {
      console.error(err);
    }
  }

  // Funcion para finalizar el proceso de actualizar una cotizacion
  const onFinallyEditQuote = async (id : number) => {
    
      if (firstPayment == '') {
        setFirstPayment("0");
      }

      if (pieceCost == '') {
        setMessage("Introduce el costo de las piezas");
        return;
      }
    
      if (finalDiagnostic == '') {
        setMessage("Ingresa el diagnostico tecnico");
        return;
      }

      const editQuote = {
        first_payment: Number(firstPayment),
        technical_diagnosis: finalDiagnostic
      }
  
      try {
        const response = await updateQuote(id, editQuote);
        console.log(response)
        reloadTable();
        setIdQuote(0);
        setFirstPayment('');
        setPieceCost('');
        setFinalDiagnostic('');
        setOpenEditQuote(false);
      } catch (err) {
        console.error(err)
      }
    };

  // Funcion para iniciar el proceso de eliminacion de una cotizacion
  const onStartFinallyQuote = async (id : number) => {
    setOpenFinallyQuote(true);
    try {
      const response = await getQuote(id);
      setIdQuote(response.quote[0].id_quote);
      setDevice(response.quote[0].device);
      setDeviceBrand(response.quote[0].device_brand);
      setDeviceColor(response.quote[0].device_color);
      setDeviceType(response.quote[0].device_type);
      setCustomerName(response.quote[0].customer_name);
      setContactPhone(response.quote[0].contact_phone);
      setFirstPayment(response.quote[0].first_payment);
      setFirstDiagnostic(response.quote[0].previous_diagnosis);
      setFinalDiagnostic(response.quote[0].technical_diagnosis);

      const repairs : string[] = [];
      for (let i = 0; i < response.repairs.length; i++) {
        const result = await getRepair(Number(response.repairs[i]));
        repairs.push(result.repair[0].name)
      }
      setRepair(repairs.join(', '));

      setRepairCost(response.quote[0].repair_cost)
      setPieceCost(response.quote[0].piece_cost);
      setFinalPrice(response.quote[0].final_price);
      setRemainingMoney(response.quote[0].remaining_money);
    } catch (err) {
      console.error(err);
    }
  };

  // Funcion para finalizar el proceso de eliminacion de una cotizacion
  const onFinallyEndQuote = async (id : number) => {

    console.log(paymentMethod)

    if(newPaymentMethod == '') {
      setMessage('Selecciona el metodo de pago');
      return;
    }

    const newHistory = {
      id_quote: idQuote,
      device: device,
      device_brand: deviceBrand,
      device_color: deviceColor,
      device_type: deviceType,
      customer_name: customerName,
      contact_phone: contactPhone,
      first_payment: Number(firstPayment),
      previous_diagnosis: firstDiagnostic,
      technical_diagnosis: finalDiagnostic,
      repairs: repair,
      repair_cost: Number(repairCost),
      piece_cost: Number(pieceCost),
      final_price: Number(finalPrice),
      is_paid: true,
      payment_method: newPaymentMethod,
      status: "completado"
    }

    try {
      const response = await addHistory(newHistory);
      console.log(response)
      reloadTable();
      setIdQuote(0);
      setDevice('');
      setDeviceBrand('');
      setDeviceColor('');
      setDeviceType('');
      setCustomerName('');
      setContactPhone('');
      setFirstPayment('');
      setFirstDiagnostic('');
      setFinalDiagnostic('');
      setRepair('');
      setRepairCost('')
      setPieceCost('');
      setFinalPrice('');
      setNewPaymentMethod('');
      setOpenFinallyQuote(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mainQuotes">
      <Header/>
      <div className="bodyQuotes">
        <div className="bodyMainQuotes" style={{flexDirection: 'column'}}>

          <div className="titleQuotes">
            <h1>Reparaciones agendadas</h1>
          </div>

          <div className='searchDivQuotes'>
            <label>Buscar:</label>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='searchQuotes'
            ></input>

            <select value={filter} onChange={(e) => setFilter(e.target.value)} className='filterQuotes'>
              <option value={'Todos'}>Todos</option>
              <option value={'Celular'}>Celular</option>
              <option value={'Tablet'}>Tablet</option>
              <option value={'Patin'}>Patin</option>
            </select>
          </div>

          <TableQuote key={tableKey} search={search} filter={filter} onSeeQuote={onSeeQuote} onStartEditQuote={onStartEditQuote} onStartFinallyQuote={onStartFinallyQuote}/>

          <div className='buttonsQuotes'>
            <div className='buttonQuotes' onClick={() => setOpenNewQuote(true)}>
              <Image width={26} src={plus} alt=""/>
              <p style={{padding: '1% 3%'}}>Agregar nuevo</p>
            </div>

            <div className='buttonQuotes' onClick={() => router.push('./')}>
              <p style={{padding: '1% 8%'}}>Volver</p>
              <Image width={14} src={arrow} alt=""/>
            </div>
          </div>

        </div>

        <SideBar isUseRepairs={false} isUseContability={false} isUseAdmins={false} isUseHistory={false} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins} isOpenHistory={setOpenHistory}/>
      </div>

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

        {newRepair.map((repair, index) => (
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

      <Modal isOpen={isOpenSeeQuote} onClose={() => setOpenSeeQuote(false)}>
        <div className='titlePopUp'>
          <h2>Ver Cotizacion</h2>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={customerName}
            placeholder='Sin nombre de cliente' 
            className='inputPopUp'
            disabled
          ></input>

          <input 
            value={device}
            placeholder='Sin marca del dispositivo' 
            className='inputPopUp'
            disabled
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={deviceColor}
            placeholder='Sin color del dispositivo' 
            className='inputPopUp'
            disabled
          ></input>

          <input 
            value={deviceType}
            placeholder='Sin tipo de dispositivo' 
            className='inputPopUp'
            disabled
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={contactPhone}
            placeholder='Sin numero de contacto' 
            className='inputPopUp'
            disabled
          ></input>

          <input 
            value={devicePassword}
            placeholder='Sin contraseña del dispositivo' 
            className='inputPopUp'
            disabled
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={firstPayment}
            placeholder='Sin abono' 
            className='inputPopUp'
            disabled
          ></input>

          <input 
            value={finalPrice}
            placeholder='' 
            className='inputPopUp'
            disabled
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={remainingMoney}
            placeholder='' 
            className='inputPopUp'
            disabled
          ></input>

          <input 
            value={madeBy}
            placeholder='' 
            className='inputPopUp'
            disabled
          ></input>
        </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
          <input 
            value={deliveryDate.split('T')[0]}
            placeholder='' 
            className='inputPopUp'
            disabled
          ></input>

          <input 
            value={repair}
            placeholder='' 
            className='inputPopUp'
            disabled
          ></input>
        </div>

        <textarea 
          value={firstDiagnostic}
          placeholder='Sin diagnostico inicial' 
          className='textareaPopUp'
          disabled
        ></textarea><br/>

        <textarea 
          value={finalDiagnostic}
          placeholder='' 
          className='textareaPopUp'
          disabled
        ></textarea><br/>
      </Modal>

      <Modal isOpen={isOpenFinallyQuote} onClose={() => setOpenFinallyQuote(false)}>
        <div className='titlePopUp'>
          <h2>Finalizar cotizacion</h2>
        </div>

        <p>¿Deseas finalizar su cotizacion?</p>

        <p>Cantidad a pagar: {remainingMoney}</p>

        <select value={newPaymentMethod} onChange={(e) => setNewPaymentMethod(e.target.value)} className='inputPopUp'>
          <option value={''}>Metodo de pago:</option>
          <option value={'Tarjeta de credito'}>Tarjeta de credito</option>
          <option value={'Tarjeta de debito'}>Tarjeta de debito</option>
          <option value={'Efectivo'}>Efectivo</option>
        </select><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onFinallyEndQuote(idQuote)} className='buttonPopUp'>Guardar cambios</button>
      </Modal>

      <Modal isOpen={isOpenEditQuote} onClose={() => setOpenEditQuote(false)}>
        <div className='titlePopUp'>
          <h2>Editar cotizacion</h2>
        </div>

        <label>Abono:</label><br/>
        <input 
          value={firstPayment}
          onChange={(e) => setFirstPayment(e.target.value)}
          placeholder='Tiempo aproximado (hrs):' 
          className='inputPopUp'
        ></input><br/>

        <label>Diagnostico:</label><br/>
        <textarea 
          value={finalDiagnostic}
          onChange={(e) => setFinalDiagnostic(e.target.value)}
          placeholder='Materiales:' 
          className='textareaPopUp'
        ></textarea><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onFinallyEditQuote(idQuote)} className='buttonPopUp'>Guardar cambios</button>
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