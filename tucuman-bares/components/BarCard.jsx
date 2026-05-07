"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteBar } from '@/services/api';

const BarCard = ({ id, nombre, categoria, ubicacion, descripcion, image, fuente, scraped_at }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro de que deseas eliminar el establecimiento "${nombre}"?`)) {
      setIsDeleting(true);
      setShowMenu(false);

      try {
        const success = await deleteBar(id);

        if (success) {
          alert('Establecimiento marcado como eliminado correctamente.');
          router.refresh();
        } else {
          alert('Error al marcar el establecimiento como eliminado.');
        }
      } catch (error) {
        console.error("Error:", error);
        alert('Ocurrió un error de conexión en la red.');
      } finally {
        setIsDeleting(false);
      }
    }
  };


  const handleCardClick = (e) => {
    if (menuRef.current && menuRef.current.contains(e.target)) {
      return;
    }
    router.push(`/bars/${id}`);
  };
  

  return (
    <div 
      onClick={handleCardClick}
      className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg border border-zinc-700 hover:border-orange-500 transition-all duration-300 flex flex-col h-full relative cursor-pointer"
    >
      
    
      <div className="absolute top-1 right-1 z-30" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            setShowMenu(!showMenu);
          }}
          className="text-white p-2.5 focus:outline-none transition-all duration-200 pointer-events-auto bg-zinc-700/50 rounded-full hover:bg-zinc-700/50"
          aria-label="Opciones"
        >

          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="4" cy="12" r="2.4" />
            <circle cx="12" cy="12" r="2.4" />
            <circle cx="20" cy="12" r="2.4" />
          </svg>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl py-2 flex flex-col text-sm z-50 animate-fadeIn">
            <Link
              href={`/bars/${id}/edit`}
              className="px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2 border-b border-zinc-800/50"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
            >
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.242 7.758a3 3 0 114.242 4.242L10 21H6v-4L16.242 7.758z" />
              </svg>
              Editar
            </Link>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={isDeleting}
              className="px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-red-400 transition-colors text-left flex items-center gap-2 w-full"
            >
              {isDeleting ? (
                <span className="w-4 h-4 animate-spin border-2 border-red-500 border-t-transparent rounded-full" />
              ) : (
                <>
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </>
              )}
            </button>
          </div>
        )}
      </div>


      {/* Imagen del bar */}
      <div className="relative h-48 w-full bg-zinc-900">
        <img
          src={image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b'}
          alt={nombre || 'Bar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b';
          }}
        />
        <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {categoria || 'Sin categoría'}
        </span>
      </div>



      {/* Contenido de la card */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {nombre}
        </h3>
        
        <p className="text-sm text-zinc-400 mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {ubicacion || 'Ubicación no especificada'}
        </p>

        <p className="text-zinc-300 text-sm line-clamp-3 mb-6">
          {descripcion || 'Sin descripción disponible.'}
        </p>

        {/* Footer de la card */}

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-zinc-700/50">
          <span className="text-xs text-zinc-500">
            Fuente: {fuente || 'Desconocida'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarCard;