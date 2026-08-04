
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verify, verifyAdmin, verifyManager } from '../API/api';
import { useEffect, useState } from 'react';
import { getHistoryById } from '../API/History/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import arrow from '@/image/arrow.png';
import Modal from '.././components/PopUp/PopUp';
import Header from '.././components/Header/Header';
import SideBar from '.././components/SideBar/SideBar';
import TableHistory from '@/app/components/Tables/tableHistory/tableHistory';
import './history.css';

export default function Page() {

  // Movimiento entre rutas
  const router = useRouter();

  // Datos para recarga la tabla
  const [tableKey, setTableKey] = useState(0);
  const reloadTable = () => {
    setTableKey(prev => prev + 1);
  };

  // Variables para abrir pantallas emergentes
  const [isOpenSeeQuote, setOpenSeeQuote] = useState(false);
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

  useEffect(() => {
    setIdQuote(0);
    setFirstPayment('');
    setRepair('');
    setRepairCost('');
    setPieceCost('');
    setFinalDiagnostic('');
  }, [isOpenSeeQuote]);

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
      try {
        const response = await verifyAdmin(user);
        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }
        router.push("../Contability");
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
  };

  // Funcion para ver una reparacion completa
  const onSeeOneHistory = async (id : number) => {
    setOpenSeeQuote(true);
    try {
      const response = await getHistoryById(id);
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
      setRepair("Reparaciones: " + response.quote[0].repairs);
      setRepairCost(response.quote[0].repair_cost);
      setPieceCost(response.quote[0].piece_cost);
      setFinalPrice("Costo final: " + response.quote[0].final_price);
      setRemainingMoney("Monto restante: " + response.quote[0].remaining_money);
      setPaymentMethod(response.quote[0].payment_method);
      setDeliveryDate("Fecha de entrega: " + response.quote[0].delivery_date);
    } catch (err) {
      console.error(err);
    }
  }

  // Funcion para aplicar garantia
  const onStartApplyWarranty = async (id : number) => {

  }

  return (
    <div className="mainHistory">
      <Header/>
      <div className="bodyHistory">
        <div className="bodyMainHistory" style={{flexDirection: 'column'}}>

          <div className="titleHistory">
            <h1>Historial</h1>
          </div>

          <div className='searchDivHistory'>
            <label>Buscar:</label>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='searchHistory'
            ></input>

            <select value={filter} onChange={(e) => setFilter(e.target.value)} className='filterHistory'>
              <option value={'Todos'}>Todos</option>
              <option value={'Celular'}>Celular</option>
              <option value={'Tablet'}>Tablet</option>
              <option value={'Patin'}>Patin</option>
            </select>
          </div>

          <TableHistory key={tableKey} search={search} filter={filter} onSeeOneHistory={onSeeOneHistory} onStartApplyWarranty={onStartApplyWarranty}/>

          <div className='buttonsHistory'>
            <div className='buttonHistory' onClick={() => router.push('./')}>
              <p style={{padding: '1% 8%'}}>Volver</p>
              <Image width={14} src={arrow} alt=""/>
            </div>
          </div>

        </div>

        <SideBar isUseRepairs={false} isUseContability={false} isUseAdmins={false} isUseHistory={true} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins} isOpenHistory={setOpenHistory}/>
      </div>

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

        <button onClick={() => onChangeAdmin("contability")} className='buttonPopUp'>Continuar</button>
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
  )
}