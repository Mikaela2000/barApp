"use client";
import React from 'react';

const AboutPage = () => {
  const techStack = [
    { name: 'Next.js', desc: 'Framework de Frontend' },
    { name: 'Node.js & Express', desc: 'Arquitectura de Backend' },
    { name: 'PostgreSQL', desc: 'Base de datos Relacional' },
    { name: 'Sequelize', desc: 'ORM para gestión de datos' },
    { name: 'Gemma (IA)', desc: 'Mejora de descripciones con Ollama' },
    { name: 'Cheerio / Puppeteer', desc: 'Web Scraping de datos' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Sobre <span className="text-orange-500">BarTuc360</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Una plataforma inteligente diseñada para centralizar y potenciar la oferta gastronómica y de entretenimiento en San Miguel de Tucumán.
          </p>
        </header>

        {/* Sección 1: Propósito */}
        <section className="mb-16 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-500">01.</span> El Propósito
          </h2>
          <p className="leading-relaxed">
            Este proyecto nace como una solución a la dispersión de información sobre los establecimientos locales. 
            A través de la integración de Inteligencia Artificial y técnicas de automatización, 
            buscamos que tanto ciudadanos como turistas encuentren información clara, actualizada y enriquecida 
            sobre los bares de la provincia.
          </p>
        </section>

        {/* Sección 2: Innovación con IA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <section className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-500">✨</span> IA Generativa
            </h2>
            <p>
              Implementamos modelos de lenguaje (Gemma) para que las descripciones de los locales no sean simples textos planos, 
              sino reseñas atractivas que mantengan el contexto y la esencia del establecimiento, al igual que evitamos la creación de contenido duplicado.
            </p>
          </section>

          <section className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Datos Precisos
            </h2>
            <p>
              Nuestro motor de scraping recolecta datos reales, y gracias a algoritmos de detección de similitud, 
              evitamos la duplicidad de información, asegurando una base de datos limpia y eficiente.
            </p>
          </section>
        </div>

        {/* Sección 3: Stack Tecnológico */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Arquitectura Tecnológica</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-orange-500/50 transition-colors">
                <h3 className="text-orange-500 font-bold mb-1">{tech.name}</h3>
                <p className="text-xs text-zinc-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        

      </div>
    </div>
  );
};

export default AboutPage;