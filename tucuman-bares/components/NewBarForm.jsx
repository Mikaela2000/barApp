"use client"; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBar, generateDescription, fetchBars } from '@/services/api';
import { validarNombreDuplicado } from '@/utils/validaciones'; 

const NewBarForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    ubicacion: '',
    descripcion: '',
    image: '',
    fuente: 'Manual',
  });

  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false); 
  const [duplicateError, setDuplicateError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    if (e.target.name === 'nombre') {
      setDuplicateError(null);
    }
  };

  const handleGenerateDescription = async (e) => {
    if (e) e.preventDefault(); 
    if (!formData.descripcion) return alert("Escribe una descripción base primero.");

    try {
      setLoadingAi(true);
      const data = await generateDescription(formData.descripcion);
      setFormData({ ...formData, descripcion: data.descripcion });
    } catch (error) {
      console.error('Error al generar descripción:', error);
      alert('Ocurrió un error al conectar con la IA.');
    } finally {
      setLoadingAi(false); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDuplicateError(null);

    try {
     
      const responseList = await fetch('http://localhost:3001/bars');
      const bares = await responseList.json();

      const validacion = await validarNombreDuplicado(
        formData.nombre,
        bares,
        false 
      );

      if (validacion.esDuplicado) {
        setDuplicateError(validacion.mensaje);
        setLoading(false);
        return;
      }

      // 3. Crear el nuevo registro
      await createBar(formData);
      alert('¡Establecimiento creado con éxito!');

      // 4. Redirección y refresco
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert(error.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2">Registrar Establecimiento</h2>
      <p className="text-zinc-400 text-sm mb-6">Completa los datos para añadir un nuevo bar a la plataforma.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-zinc-400 text-sm mb-2 font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: El Almacén de Birras"
            value={formData.nombre}
            onChange={handleChange}
            required
            className={`bg-zinc-800 border ${
              duplicateError ? 'border-orange-500' : 'border-zinc-700'
            } rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
          />
          {duplicateError && (
            <span className="text-orange-500 text-xs mt-1.5 font-medium">
              {duplicateError}
            </span>
          )}
        </div>

        {/* Categoría */}
        <div className="flex flex-col">
          <label className="text-zinc-400 text-sm mb-2 font-medium">Categoría</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Ej: Cervecería, Restobar"
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Ubicación */}
      <div className="flex flex-col">
        <label className="text-zinc-400 text-sm mb-2 font-medium">Ubicación / Dirección</label>
        <input
          type="text"
          name="ubicacion"
          placeholder="Ej: Santa Fe 450, San Miguel de Tucumán"
          value={formData.ubicacion}
          onChange={handleChange}
          required
          className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-zinc-400 text-sm font-medium">Descripción</label>
          <button
            type="button"
            onClick={handleGenerateDescription}
            disabled={loadingAi || !formData.descripcion}
            className="bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAi ? 'Procesando...' : '✨ Mejorar con IA'}
          </button>
        </div>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          placeholder="Describe el ambiente, la especialidad..."
          className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none"
        />
      </div>

      {/* Imagen URL */}
      <div className="flex flex-col">
        <label className="text-zinc-400 text-sm mb-2 font-medium">URL de la Imagen (opcional)</label>
        <input
          type="text"
          name="image"
          placeholder="https://ejemplo.com/foto.jpg"
          value={formData.image}
          onChange={handleChange}
          className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-zinc-400 hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || loadingAi}
          className="bg-orange-600 hover:bg-orange-500 px-8 py-2 rounded-lg font-bold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? 'Creando...' : 'Crear Establecimiento'}
        </button>
      </div>
    </form>
  );
};

export default NewBarForm;