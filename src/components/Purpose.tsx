import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Heart, Camera, Sparkles } from 'lucide-react';

export default function Purpose() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const highlights = [
    {
      icon: Calendar,
      title: 'Fundada em 2023',
      description: '15 de junho',
    },
    {
      icon: Heart,
      title: 'Amor e Dedicação',
      description: 'Em cada projeto',
    },
    {
      icon: Camera,
      title: 'Profissionalismo',
      description: 'Equipamento de ponta',
    },
    {
      icon: Sparkles,
      title: 'Memórias Eternas',
      description: 'Momentos inesquecíveis',
    },
  ];

  return (
    <section
      id="purpose"
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center blur-sm"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Qual Nossa Intenção?
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-red-500 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <highlight.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-400">{highlight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
              <p className="relative pl-8">
                <span className="absolute left-0 top-0 text-6xl text-red-500 opacity-30 leading-none">&ldquo;</span>
                Criada no dia{' '}
                <span className="text-red-400 font-semibold">15 de junho de 2023</span>, nossa empresa tem como intenção transformar momentos em{' '}
                <span className="text-red-400 font-semibold">memórias eternas</span> com nossos trabalhos.
              </p>

              <p>
                Acreditamos que cada evento, cada sorriso, cada lágrima de emoção merece ser capturado com{' '}
                <span className="text-red-400 font-semibold">excelência e sensibilidade</span>. Nossa missão vai além de apenas fotografar - queremos contar histórias, preservar sentimentos e criar um legado visual que atravesse gerações.
              </p>

              <p>
                Com uma equipe apaixonada e equipamentos de última geração, trabalhamos incansavelmente para que cada cliente tenha uma experiência única e receba resultados que superem todas as expectativas.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50 uppercase tracking-wider"
          >
            Entre em Contato
          </a>
        </motion.div>
      </div>
    </section>
  );
}
