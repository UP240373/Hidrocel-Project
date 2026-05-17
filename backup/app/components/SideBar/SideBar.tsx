
// Importanciones para la pagina
import './Sidebar.css';
import Image from 'next/image';
import engranaje from '@/image/engranaje.png';
import iconContability from '@/image/icon-contability.png';
import iconAdmins from '@/image/icon-admins.png';

// Estructura de datos para las props
interface SideBarProps {
  isUseRepairs: boolean;
  isUseContability: boolean;
  isUseAdmins: boolean;
  
  isOpenRepairs: (value: boolean) => void;
  isOpenContability: (value: boolean) => void;
  isOpenAdmins: (value: boolean) => void;
}
const SideBar = ({ isUseRepairs, isUseContability, isUseAdmins, isOpenRepairs, isOpenContability, isOpenAdmins } : SideBarProps) => {
  
  return (
    <div className="bodySideBar">
      <div className="bottonActiveSideBar" onClick={() => isOpenRepairs(true)}>
        <Image  width={30} src={engranaje} alt="" className="imgSideBar"/>
        <p>Reparaciones</p>
      </div>

      <div className="bottonActiveSideBar" onClick={() => isOpenContability(true)}>
        <Image  width={30} src={iconContability} alt="" className="imgSideBar"/>
        <p>Contabilidad</p>
      </div>

      {isUseAdmins ? 
      <div className="bottonInactiveSideBar">
        <Image  width={30} src={iconAdmins} alt="" className="imgSideBar"/>
        <p>Administradores</p>
      </div> : 
      <div className="bottonActiveSideBar" onClick={() => isOpenAdmins(true)}>
        <Image  width={30} src={iconAdmins} alt="" className="imgSideBar"/>
        <p>Administradores</p>
      </div>}
      
    </div>
  );
}

export default SideBar;