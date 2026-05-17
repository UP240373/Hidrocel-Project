
// Importanciones para la pagina
import Image from 'next/image';
import engranaje from '@/image/engranaje.png';
import './Header.css';

const Header = () => {
  return (
    <div className="bodyHeader">
      <Image
        width={40}
        src={engranaje}
        alt=""
        className="imgHeader"/>
      <p>Sistema de cotizaciones - HIDROCEL</p>
    </div>
  );
}

export default Header;