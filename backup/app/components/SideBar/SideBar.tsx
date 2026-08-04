
// Importanciones para la pagina
import './Sidebar.css';
import Image from 'next/image';
import engranaje from '@/image/engranaje.png';
import iconContability from '@/image/icon-contability.png';
import iconAdmins from '@/image/icon-admins.png';
import iconHistory from '@/image/icon-history.png';

// Estructura de datos para las props
interface SideBarProps {
  isUseRepairs: boolean;
  isUseContability: boolean;
  isUseAdmins: boolean;
  isUseHistory: boolean;
  
  isOpenRepairs: (value: boolean) => void;
  isOpenContability: (value: boolean) => void;
  isOpenAdmins: (value: boolean) => void;
  isOpenHistory: (value: boolean) => void;
}
const SideBar = ({ isUseRepairs, isUseContability, isUseAdmins, isUseHistory, isOpenRepairs, isOpenContability, isOpenAdmins, isOpenHistory } : SideBarProps) => {
  
  return (
    <div className="bodySideBar">
      {isUseRepairs ? 
      <div className="bottonInactiveSideBar">
        <Image  width={30} src={engranaje} alt="" className="imgSideBar"/>
        <p>Reparaciones</p>
      </div> : 
      <div className="bottonActiveSideBar" onClick={() => isOpenRepairs(true)}>
        <Image  width={30} src={engranaje} alt="" className="imgSideBar"/>
        <p>Reparaciones</p>
      </div>}

      {isUseContability ? 
      <div className="bottonInactiveSideBar">
        <Image  width={30} src={iconContability} alt="" className="imgSideBar"/>
        <p>Contabilidad</p>
      </div> : 
      <div className="bottonActiveSideBar" onClick={() => isOpenContability(true)}>
        <Image  width={30} src={iconContability} alt="" className="imgSideBar"/>
        <p>Contabilidad</p>
      </div>}

      {isUseAdmins ? 
      <div className="bottonInactiveSideBar">
        <Image  width={30} src={iconAdmins} alt="" className="imgSideBar"/>
        <p>Administradores</p>
      </div> : 
      <div className="bottonActiveSideBar" onClick={() => isOpenAdmins(true)}>
        <Image  width={30} src={iconAdmins} alt="" className="imgSideBar"/>
        <p>Administradores</p>
      </div>}

      {isUseHistory ? 
      <div className="bottonInactiveSideBar">
        <Image  width={30} src={iconHistory} alt="" className="imgSideBar"/>
        <p>Historial</p>
      </div> : 
      <div className="bottonActiveSideBar" onClick={() => isOpenHistory(true)}>
        <Image  width={30} src={iconHistory} alt="" className="imgSideBar"/>
        <p>Historial</p>
      </div>}
      
    </div>
  );
}

export default SideBar;