"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  const linkStyles = (path) => 
    `text-sm font-medium transition-colors hover:text-orange-500 ${
      pathname === path ? 'text-orange-500' : 'text-zinc-400'
    }`;

  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-bold text-xl tracking-tight">
                BarTuc<span className="text-orange-500">360</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className={linkStyles('/')}>
                Inicio
              </Link>
              
              <Link href="/bars/create" className={linkStyles('/bars/create')}>
                Nuevo Bar
              </Link>
              
              <Link href="/bars/detalle" className={linkStyles('/bars/detalle')}>
                Sobre el Proyecto
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;