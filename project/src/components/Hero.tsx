import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { isMobileDevice } from '../utils/deviceDetection';

const services = [
  'Esportes',
  'Ensaios Fotográficos',
  'Festas de Grande Porte',
  'Aniversários',
  'Eventos Corporativos',
];

export default function Hero() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile] = useState(() => isMobileDevice());

  useEffect(() => {
    if (isMobile) {
      setDisplayText(services[currentServiceIndex]);
      const interval = setInterval(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % services.length);
      }, 3000);
      return () => clearInterval(interval);
    }

    const currentService = services[currentServiceIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentService) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentService.substring(0, prev.length - 1)
          : currentService.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentServiceIndex, isMobile]);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#experiences');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-black to-red-950"
    >
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20 blur-sm"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
            Reyel Produções
          </h1>

          <div className="h-20 sm:h-24 flex items-center justify-center mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-light">
              Trabalhamos com{' '}
              <span className="text-red-500 font-semibold">
                {displayText}
                {!isMobile && <span className="animate-pulse">|</span>}
              </span>
            </p>
          </div>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Eternizando momentos especiais através da fotografia profissional há mais de 4 anos
          </p>

          <motion.button
            onClick={scrollToNext}
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? {} : { scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50 uppercase tracking-wider"
          >
            Conheça Nosso Trabalho
          </motion.button>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={isMobile ? {} : { y: [0, 10, 0] }}
        transition={isMobile ? {} : { repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
