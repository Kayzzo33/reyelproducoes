import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Users, Award, Heart } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { icon: Camera, label: 'Anos de Experiência', value: 4, suffix: '+' },
    { icon: Award, label: 'Eventos Fotografados', value: 500, suffix: '+' },
    { icon: Heart, label: 'Clientes Satisfeitos', value: 100, suffix: '%' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-[10000] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img
                src="/93D7D00E-239F-422B-B624-6953CF9281A9.JPG.jpeg"
                alt="Fotógrafo da Reyel Produções em ação"
                className="w-full h-[650px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl -z-10 blur-3xl opacity-20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Nossa História
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mb-8"></div>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              <span>Trabalho há </span><span className="text-red-500 font-semibold">4 anos</span><span> nessa área e quando descobri a fotografia compreendi que, além do esforço, é fundamental exercer essa profissão com </span>{' '}
              <span className="text-red-500 font-semibold">amor</span><span>, para assim eternizar os melhores momentos na vida das pessoas.</span>
            </p>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Por isso, estou sempre me aprimorando para entregar o nosso melhor aos nossos clientes. Cada projeto é único e merece toda minha dedicação e criatividade.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-red-500 transition-colors duration-300"
                >
                  <stat.icon className="text-red-500 mb-3" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
