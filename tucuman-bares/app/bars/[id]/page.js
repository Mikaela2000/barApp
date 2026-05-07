import React from 'react';
import Link from 'next/link';
import { fetchBarById } from '@/services/api';
import { notFound } from 'next/navigation'; 

export default async function BarDetailPage({ params }) {
  const { id } = await params;
  const bar = await fetchBarById(id);

  
  if (!bar) {
    return notFound(); 
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 md:p-16 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">

        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-orange-500 mb-8 transition-colors text-sm font-medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>


        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800/60 shadow-2xl flex flex-col md:flex-row">
          
  
          <div className="md:w-1/2 relative h-72 md:h-auto bg-zinc-950 min-h-[350px]">
            <img
              src={bar.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b'}
              alt={bar.nombre || 'Bar'}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-6 left-6 bg-orange-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
              {bar.categoria || 'Sin categoría'}
            </span>
          </div>

    
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                {bar.nombre}
              </h1>

              <p className="text-sm text-zinc-400 mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {bar.ubicacion || 'Ubicación no especificada'}
              </p>

              <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Descripción</h2>
                <p className="text-zinc-300 text-base leading-relaxed">
                  {bar.descripcion || 'Sin descripción disponible.'}
                </p>
              </div>
            </div>

       
            <div className="border-t border-zinc-800/50 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="text-xs text-zinc-500 space-y-1">
                <p>
                  <span className="text-zinc-400">Fuente:</span> {bar.fuente || 'Desconocida'}
                </p>
                {bar.scraped_at && (
                  <p>
                    <span className="text-zinc-400">Cargado:</span> {new Date(bar.scraped_at).toLocaleDateString('es-ES')}
                  </p>
                )}
              </div>

      
              <Link href={`/bars/${id}/edit`}>
                <button className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-all shadow-md">
                  Editar Bar
                </button>
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}