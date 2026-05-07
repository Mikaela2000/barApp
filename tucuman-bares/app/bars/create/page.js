"use client";
import React from 'react';
import NewBarForm from '@/components/NewBarForm';
import Link from 'next/link';

export default function CreateBarPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        
        {/* Breadcrumbs / Navegación interna */}
        <nav className="mb-8 flex items-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Inicio
          </Link>
          <span className="mx-2 text-zinc-700">/</span>
          <span className="text-zinc-300 font-medium">Nuevo Establecimiento</span>
        </nav>

        {/* Encabezado de la página */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Sumar un <span className="text-orange-500">Nuevo Bar</span>
          </h1>
          <p className="text-zinc-400">
            Completa la información técnica y utiliza nuestra IA para generar una descripción atractiva para los usuarios de Tucumán.
          </p>
        </div>

        {/* El Componente del Formulario */}
        <div className="relative">
          {/* Decoración sutil de fondo (opcional) */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
          
          <NewBarForm />
        </div>

        {/* Footer de ayuda */}
        <footer className="mt-12 text-center text-zinc-500 text-xs">
          <p>
            Al crear un nuevo establecimiento, este aparecerá automáticamente en la lista principal.
            <br />
            Recuerda validar que la ubicación sea precisa para facilitar la llegada de los clientes.
          </p>
        </footer>
        
      </div>
    </div>
  );
}