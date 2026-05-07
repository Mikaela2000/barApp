import React from 'react';
import BarForm from '@/components/BarForm';
import Link from 'next/link';
import { fetchBarById } from '@/services/api';


export default async function EditBarPage({ params }) {
  
  const { id } = await params;
  const bar = await fetchBarById(id);

  if (!bar) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">El bar no existe</h1>
        <Link href="/" className="text-orange-500 hover:underline">
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-3xl font-extrabold text-white">Editar Establecimiento</h1>
        <p className="text-zinc-400 mt-2">Modifica la información de {bar.nombre}</p>
      </div>

      <BarForm initialData={bar} isEditing={true} />
    </div>
  );
}