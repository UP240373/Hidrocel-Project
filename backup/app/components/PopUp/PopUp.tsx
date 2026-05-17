
// Importanciones para la pagina
import { FC, ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import cancel from '@/image/cancel.png';
import './PopUp.css';

// Parametros para la funcion Pop-up
type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const PopUp: FC<PopUpProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Hook para ejecutar cada que cambia la variable isOpen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';  // Evita scroll del fondo
      dialogRef.current?.showModal();
    } else {
      document.body.style.overflow = '';
      dialogRef.current?.close();
    }
    // Desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Funcion para cerrar el Pop-up
  const handleClose = () => {
    onClose();
    // Elimina el foco del botón que abrió el modal
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
  };

  // createPortal mueve el contenido del modal al final del <body>
  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="bodyPopUp"
    >
      <div className="p-6">
        <div
          onClick={handleClose}
          className="bottonExitPopUp"
        >
          <Image 
            width={25}
            src={cancel} 
            alt=' exit'/>
        </div>
        {children}
      </div>
    </dialog>,
    document.body
  );
};

export default PopUp;