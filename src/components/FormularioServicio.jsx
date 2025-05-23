import React, { useState, useEffect } from 'react';

const ServicioForm = ({ultimoFolio, initialData = {}, onSubmit }) => {
    const siguienteFolio = ultimoFolio !== null ? ultimoFolio + 1 : 1;

  const [formData, setFormData] = useState({
    folio: siguienteFolio || 0,
    nombre: initialData.nombre || '',
    apellido: initialData.apellido || '',
    numero_contacto: initialData.numero_contacto || '',
    servicio: initialData.servicio || '',
    modelo: initialData.modelo || '',
    marca: initialData.marca || '',
    imei: initialData.imei || '',
    numero_serie: initialData.numero_serie || '',
    precio_servicio: initialData.precio_servicio || '',
    abono_servicio: initialData.abono_servicio || '',
    saldo_pendiente: initialData.saldo_pendiente || '',
    gaveta: initialData.gaveta || '',
    observaciones: initialData.observaciones || '',
    fecha_registro: initialData.fecha_registro || '',
    fecha_entrega: initialData.fecha_entrega || '',
    estado: initialData.estado || 'recibido',
  });

  // Calcula el saldo pendiente cuando cambian precio o abono
  useEffect(() => {
    const precio = parseFloat(formData.precio_servicio) || 0;
    const abono = parseFloat(formData.abono_servicio) || 0;
    const saldo = precio - abono;
    
    setFormData(prev => ({
      ...prev,
      saldo_pendiente: saldo > 0 ? saldo.toFixed(2) : '0.00'
    }));
  }, [formData.precio_servicio, formData.abono_servicio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    // Efecto para actualizar el folio cuando cambia ultimoFolio
  useEffect(() => {
    if (ultimoFolio !== null) {
      setFormData(prev => ({
        ...prev,
        folio: ultimoFolio + 1
      }));
    }
  }, [ultimoFolio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Preparar datos para enviar
    // Preparar datos para enviar
    const dataToSend = {
      ...formData,
      precio_servicio: parseFloat(formData.precio_servicio) || 0,
      abono_servicio: parseFloat(formData.abono_servicio) || 0,
      saldo_pendiente: parseFloat(formData.saldo_pendiente) || 0,
      folio: siguienteFolio, // Asegurar que se envíe el folio correcto
      fecha_entrega: formData.fecha_entrega || null
    };
    onSubmit(dataToSend);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Servicio</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sección Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Datos del Cliente</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Folio</label>
              <input
                type="number"
                name="folio"
                value={ultimoFolio + 1}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre*</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido*</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Contacto*</label>
              <input
                type="tel"
                name="numero_contacto"
                value={formData.numero_contacto}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Sección Dispositivo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Datos del Dispositivo</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Servicio*</label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Seleccione un servicio</option>
                <option value="display">Display</option>
                <option value="bateria">Batería</option>
                <option value="software">Software</option>
                <option value="microfono">Micrófono</option>
                <option value="microfono">Liberacion de compania</option>
                <option value="microfono">Diagnostico</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            
            <div>
  <label className="block text-sm font-medium text-gray-700">Marca*</label>
  <input
    type="text"
    name="marca"
    value={formData.marca}
    onChange={handleChange}
    list="marcasCelulares"
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    required
  />
  <datalist id="marcasCelulares">
    <option value="Apple">Apple (iPhone)</option>
    <option value="Samsung">Samsung</option>
    <option value="Xiaomi">Xiaomi</option>
    <option value="OPPO">OPPO</option>
    <option value="vivo">vivo</option>
    <option value="realme">realme</option>
    <option value="Motorola">Motorola</option>
    <option value="Huawei">Huawei</option>
    <option value="OnePlus">OnePlus</option>
    <option value="Google">Google Pixel</option>
    <option value="TECNO">TECNO</option>
    <option value="Infinix">Infinix</option>
  </datalist>
</div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Modelo*</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">IMEI (Opcional)</label>
              <input
                type="text"
                name="imei"
                value={formData.imei}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Opcional"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Serie (Opcional)</label>
              <input
                type="text"
                name="numero_serie"
                value={formData.numero_serie}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Opcional"
              />
            </div>
          </div>
        </div>
        
        {/* Sección Servicio */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Detalles del Servicio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio del Servicio ($)*</label>
              <input
                type="number"
                name="precio_servicio"
                value={formData.precio_servicio}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Abono ($)</label>
              <input
                type="number"
                name="abono_servicio"
                value={formData.abono_servicio}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Saldo Pendiente ($)</label>
              <input
                type="number"
                name="saldo_pendiente"
                value={formData.saldo_pendiente}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gaveta</label>
              <input
                type="text"
                name="gaveta"
                value={formData.gaveta}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recibido">Recibido</option>
                <option value="en_proceso">En proceso</option>
                <option value="terminado">Terminado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Registro*</label>
              <input
                type="date"
                name="fecha_registro"
                value={formData.fecha_registro}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Entrega</label>
              <input
                type="date"
                name="fecha_entrega"
                value={formData.fecha_entrega || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detalles adicionales sobre el servicio"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={()=>{
              
            }}
          >
            Guardar Servicio
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicioForm;