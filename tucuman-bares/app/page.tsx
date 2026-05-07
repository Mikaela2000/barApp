import Link from 'next/link';
import BarCard from '@/components/BarCard';
import { fetchBars } from '@/services/api';


export default async function Home() {
  const bars = await fetchBars();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">

      <main className="flex flex-1 w-full max-w-7xl flex-col py-10 px-6 bg-white dark:bg-black sm:items-start">

        <div className="flex justify-between items-center mb-10 w-full">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Bares de Tucumán
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Explora los mejores bares de Tucumán.
            </p>
          </div>
        </div>

        {bars && bars.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-400 dark:text-zinc-600 w-full">
            <svg className="w-10 h-10 mb-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H4" />
            </svg>
            <p className="text-base font-medium">No se encontraron bares</p>
          </div>
        )}

      </main>
    </div>
  );
}