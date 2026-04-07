import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, FolderOpen, Heart, Trophy, GraduationCap, Briefcase, Camera, Cake } from 'lucide-react';

export default function Experiences() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const experienceCategories = [
    {
      id: 1,
      icon: Heart,
      title: 'Shows',
      description: 'Trabalhamos com Fotos de Shows e Festas.',
      driveLink: '#',
    },
    {
      id: 2,
      icon: Trophy,
      title: 'Eventos Esportivos',
      description: 'Trabalhamos em Eventos Esportivos de sua escolha.',
      driveLink: '#',
    },
    {
      id: 3,
      icon: GraduationCap,
      title: 'Eventos Escolares',
      description: 'Trabalhamos com Eventos Escolares de todos os Gêneros.',
      driveLink: '#',
    },
    {
      id: 4,
      icon: Briefcase,
      title: 'Eventos Corporativos',
      description: 'Trabalhamos em Eventos Corporativos.',
      driveLink: '#',
    },
    {
      id: 5,
      icon: Camera,
      title: 'Ensaios Fotográficos',
      description: 'Fazemos Ensaios Fotográficos (Externo ou Estúdio).',
      driveLink: '#',
    },
    {
      id: 6,
      icon: Cake,
      title: 'E muito +',
      description: '1- Casamentos.\n2- Newborn (Fotos de Bebês).\n3- Aniversários.\n4- Batizados.\n5- Fotos de Paisagens.',
      driveLink: '#',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="experiences" className="py-20 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Veja Nossas Experiências
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experienceCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 border border-slate-700 hover:border-red-500"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="text-white" size={32} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed whitespace-pre-line min-h-[4.5rem]">
                  {category.description}
                </p>

                <a
                  href={category.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50 group/button"
                >
                  <FolderOpen size={20} className="group-hover/button:rotate-12 transition-transform" />
                  <span>Ver no Drive</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
