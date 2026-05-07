"use client"; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBar, generateDescription, createBar } from '@/services/api';
import { validarNombreDuplicado } from '@/utils/validaciones'; 

const BarForm = ({ initialData, isEditing = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    categoria: initialData?.categoria || '',
    ubicacion: initialData?.ubicacion || '',
    descripcion: initialData?.descripcion || '',
    image: initialData?.image || '',
    fuente: initialData?.fuente || 'Manual',
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
    try {
      setLoadingAi(true);
      const data = await generateDescription(formData.descripcion);
      setFormData({ ...formData, descripcion: data.descripcion });
    } catch (error) {
      console.error('Error al generar descripción:', error);
      alert('Ocurrió un error al usar la IA.');
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
      console.log('Datos guardados:', formData);

  
      const validacion = await validarNombreDuplicado(
        formData.nombre,
        bares,
        isEditing,
        initialData?.nombre
      );

      if (validacion.esDuplicado) {
        setDuplicateError(validacion.mensaje);
        setLoading(false);
        return;
      }

      if (isEditing) {
        await updateBar(initialData.id, formData);
        alert('Establecimiento actualizado con éxito');
      } else {
        await createBar(formData);
        alert('Establecimiento creado con éxito');
      }

      

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert(error.message || 'Ocurrió un error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-zinc-400 text-sm mb-2">Nombre del Establecimiento</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className={`bg-zinc-800 border ${
              duplicateError ? 'border-orange-500' : 'border-zinc-700'
            } rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none`}
          />
          {duplicateError && (
            <span className="text-orange-500 text-xs mt-1.5 font-medium">
              {duplicateError}
            </span>
          )}
        </div>

        {/* Categoría */}
        <div className="flex flex-col">
          <label className="text-zinc-400 text-sm mb-2">Categoría</label>
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
        <label className="text-zinc-400 text-sm mb-2">Ubicación / Dirección</label>
        <input
          type="text"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-zinc-400 text-sm">Descripción</label>
          <button
            type="button"
            onClick={handleGenerateDescription}
            disabled={loading || loadingAi}
            className="bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-50"
          >
            {loadingAi ? 'Generando...' : '✨ Mejorar con IA'}
          </button>
        </div>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none"
        />
      </div>

      {/* Imagen URL */}
      <div className="flex flex-col">
        <label className="text-zinc-400 text-sm mb-2">URL de la Imagen</label>
        <input
          type="text"
          name="image"
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
          className="bg-orange-600 hover:bg-orange-500 px-8 py-2 rounded-lg font-bold text-white transition-all shadow-lg disabled:opacity-50"
        >
          {'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default BarForm;