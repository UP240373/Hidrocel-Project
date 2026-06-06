
// Correr pagina del lado del cliente
'use client'

// Importanciones para la pagina
import { verify, verifyManager, verifyAdmin } from './API/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import arrow from '@/image/arrow.png';
import iconDiagnostic from '@/image/icon-diagnostic.png';
import iconCalculate from '@/image/icon-calculate.png'
import Modal from './components/PopUp/PopUp';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

export default function Home() {

  // Movimiento entre rutas
  const router = useRouter();

  // Variables para abrir pantallas emergentes
  const [isOpenDiagnostic, setOpenDiagnostic] = useState(false);
  const [isOpenPrice, setOpenPrice] = useState(false);
  const [isOpenRepairs, setOpenRepairs] = useState(false);
  const [isOpenContability, setOpenContability] = useState(false);
  const [isOpenAdmins, setOpenAdmins] = useState(false);

  // Mensajes de errores y soluciones
  const [message, setMessage] = useState<string>('');

  // Contraseña temporal de admin y gerente
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    setPassword('');

    setMessage('');
    }, [isOpenDiagnostic, isOpenPrice, isOpenAdmins, isOpenContability, isOpenRepairs]);

  // Funcion para cambiar a diagnostico y cotizacion
  const onChangeAction = async (option : string) => {
    if (password == "") {
      setMessage("Introduce una contraseña");
      return
    };

    const user = {
      password: password
    }

    if (option === "diagnostics") {
      try {
        const response = await verify(user);
        console.log(response.admin[0].id_admin);

        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }

        // Guardar id de un usuario
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
          localStorage.setItem('user_id', response.admin[0].id_admin);
        });
        } else {
          // DOM ya está cargado, ejecutar inmediatamente
          localStorage.setItem('user_id', response.admin[0].id_admin);
        }

        router.push("./Diagnostics");
      } catch (err) {
        console.error(err)
      }
    }

    if (option === "price") {
      try {
        const response = await verify(user);

        if(response.error) {
          setMessage("Contraseña incorrecta");
          return;
        }

        // Guardar id de un usuario
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
          localStorage.setItem('user_id', response.admin[0].id_admin);
        });
        } else {
          // DOM ya está cargado, ejecutar inmediatamente
          localStorage.setItem('user_id', response.admin[0].id_admin);
        }
        
        router.push("./");
      } catch (err) {
        console.error(err)
      }
    }
  };

  // Funcion para cambiar a interfaces de Gerentes y Admins
  const onChangeAdmin = async (option : string) => {
    if (password == "") {
      setMessage("Introduce una contraseña");
      return
    };

    const user = {
      password: password
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

  }

  return (
    <main className="main">
      <Header/>

      <div className="body">
        <div style={{display: 'flex'}}>
          <div style={{background: '#3961B8', height: '90vh', width: '12vh'}}/>

          <div className="bodyMain" style={{flexDirection: 'column'}}>
            <div className="title">
              <h1>HIDROCEL</h1>
            </div>

            <div>
              <div className="divButton" onClick={() => setOpenDiagnostic(true)}>
                <Image
                  width={60}
                  src={iconDiagnostic}
                  alt=""
                />

                <div className='itemButton'>
                  <p className='titleButton'>Diagnóstico</p>
                  <p>Realizar diagnostico del producto</p>
                </div>

                <Image
                  width={35}
                  src={arrow}
                  alt=""
                />
              </div>

              <div className="divButton" onClick={() => console.log("boton cotizacion")}>
                <Image
                  width={60}
                  src={iconCalculate}
                  alt=""
                />

                
                <div className='itemButton'>
                  <p className='titleButton'>Cotización</p>
                  <p>Generar cotización de reparación</p>
                </div>
                
                <Image
                  width={35}
                  src={arrow}
                  alt=""
                />
              </div>
            </div>

            <div>
              <p>Seleccione una opción para continuar</p>
            </div>
          </div>
        </div>
        
        <SideBar isUseRepairs={false} isUseContability={false} isUseAdmins={false} isOpenRepairs={setOpenRepairs} isOpenContability={setOpenContability} isOpenAdmins={setOpenAdmins}/>
      </div>

      <Modal isOpen={isOpenDiagnostic} onClose={() => setOpenDiagnostic(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onChangeAction("diagnostics")} className='buttonPopUp'>Continuar</button>
      </Modal>

      <Modal isOpen={isOpenPrice} onClose={() => setOpenPrice(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onChangeAction("price")} className='buttonPopUp'>Continuar</button>
      </Modal>
      
      <Modal isOpen={isOpenRepairs} onClose={() => setOpenRepairs(false)}>
        <div className='titlePopUp'>
          <h2>Contraseña</h2>
        </div>

        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Introduce tu contraseña' 
          className='inputPopUp'
        ></input><br/>

        {message != '' ? 
          <div className='messageDivPopUp'>
            <p>{message}</p>
          </div> : undefined}

        <button onClick={() => onChangeAdmin("administrators")} className='buttonPopUp'>Continuar</button>
      </Modal>

    </main>
  );
}
