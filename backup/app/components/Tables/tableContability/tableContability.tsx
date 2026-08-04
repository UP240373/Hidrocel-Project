
// Importanciones para la pagina
import { getBestEmployees, getServices, getClients, getBrands } from '@/app/API/KPI/api';
import { useState, useEffect } from 'react';
import './tableContability.css';

// Estructura de los datos de la kpi de empleados
interface BestEmployee {
  name: string,
  last_name: string,
  Dinero_generado: number
}

// Estructura de los datos de la kpi de servicios
interface Service {
  type_of_service: string,
  Realizado: string
}

// Estructura de los datos de la kpi de clientes
interface Client {
  customer_name: string,
  final_price: number,
  first_payment: number,
  remaining_money: number
}

// Estructura de los datos de la kpi de marcas
interface Brand {
  device_brand: string,
  total_repairs: number
}

interface TableKPIPromps {
  filter: string
}

export default function Page({ filter } : TableKPIPromps) {

  // Listas con todas las KPI del sistema
  const [employees, setEmployees] = useState<BestEmployee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  // Variable si todas las listas estan vacias
  const [empty, setEmpty] = useState<boolean>(false);

  useEffect(() => {
    onSelectKPI();
  }, [filter]);

  const onSelectKPI = async () => {
    setEmployees([])
    setServices([]);
    setClients([]);
    setBrands([]);

    if (filter === "Empleados") {
      onGetEmployees();
    }

    if (filter === "Servicios") {
      onGetServices();
    }

    if (filter === "Clientes") {
      onGetClients();
    }

    if (filter === "Marcas") {
      onGetBrands();
    }
  }

  // Funcion para obtener todos los mejores empleados
  const onGetEmployees = async () => {
    try {
      const response = await getBestEmployees();
      setEmployees(response.employees);
    } catch(err) {
      console.error(err);
    }
  };

  // Funcion para obtener todos los servicios
  const onGetServices = async () => {
    try {
      const response = await getServices();
      setServices(response.services);
    } catch(err) {
      console.error(err);
    }
  };

  // Funcion para obtener todos los clientes
  const onGetClients = async () => {
    try {
      const response = await getClients();
      setClients(response.clients);
    } catch(err) {
      console.error(err);
    }
  };

  // Funcion para obtener todos las marcas de dispositivos
  const onGetBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.brands);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='tableMain'>

      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '100vh'}}>
              <h3> {index + 1}.- {employee.name} {employee.last_name}</h3>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Dinero generado:</b> {employee.Dinero_generado}</p>
              </div>
            </div>
          </div>
        ))
      ) : <p/>}

      {services.length > 0 ? (
        services.map((service, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '100vh'}}>
              <h3> {index + 1}.- {service.type_of_service}</h3>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Veces realizadas:</b> {service.Realizado}</p>
              </div>
            </div>
          </div>
        ))
      ) : <p/>}

      {clients.length > 0 ? (
        clients.map((client, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '100vh'}}>
              <h3> {index + 1}.- {client.customer_name}</h3>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Dinero total:</b> {client.final_price}</p>
                <p style={{padding: '0 4%'}}><b>Dinero abonado:</b> {client.first_payment}</p>
                <p style={{padding: '0 4%'}}><b>Adeudo total:</b> {client.remaining_money}</p>
              </div>
            </div>
          </div>
        ))
      ) : <p/>}

      {brands.length > 0 ? (
        brands.map((brand, index) => (
          <div key={index} className='cellDiv'>
            <div style={{width: '100vh'}}>
              <h3> {index + 1}.- {brand.device_brand}</h3>

              <div className='cellInfo'>
                <p style={{padding: '0 4%'}}><b>Total de veces reparada:</b> {brand.total_repairs}</p>
              </div>
            </div>
          </div>
        ))
      ) : <p/>}

      {employees.length == 0 && services.length == 0 && clients.length == 0 && brands.length == 0 ? <p className='messageInfo'>No se encontraron resultados</p> : <p/>}

    </div>
  );
}