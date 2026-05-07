import React from 'react';
import Link from 'next/link';
import BarCard from '@/components/BarCard';
import { fetchBars } from '@/services/api';


export default async function BarsPage() {
  const bars = await fetchBars();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        

        {/* Listado de Bares */}
        {bars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-400 text-base mb-4">No se encontraron bares registrados.</p>
            <Link href="/bars/new" className="text-orange-500 hover:underline text-sm font-semibold">
              Crea el primer establecimiento
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {bars.map((bar) => (
              <BarCard
                key={bar.id}
                id={bar.id}
                nombre={bar.nombre}
                categoria={bar.categoria}
                ubicacion={bar.ubicacion}
                descripcion={bar.descripcion}
                image={bar.image}
                fuente={bar.fuente}
                scraped_at={bar.scraped_at}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}