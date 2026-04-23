import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, ExternalLink } from 'lucide-react';
import { supabase, GalleryProject, TABLES } from '../lib/supabase';

export default function Gallery() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .select('*')
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
        setHasError(true);
        setIsLoading(false);
        return;
      }

      if (data) {
        const mappedData: GalleryProject[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          cover_image: item.cover_image,
          drive_link: item.drive_link,
          order_position: item.order_position,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        setProjects(mappedData);
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Unexpected error:', err);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Trabalhos Recentes
          </h2>
          <p className="text-xl text-gray-400 mb-4">Galeria</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto"></div>
        </motion.div>

{isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        ) : hasError ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Nao foi possivel carregar os projetos.</p>
            <button
              onClick={fetchProjects}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Nenhum projeto disponivel no momento.</p>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {projects.map((project) => (
              <motion.a
                key={project.id}
                href={project.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-800 shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={project.cover_image || 'https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span>{project.title}</span>
                  </h3>

                  <div className="flex items-center gap-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-semibold">Ver Projeto</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://www.instagram.com/reyelproducoes_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 group"
          >
            <Instagram size={24} className="group-hover:rotate-12 transition-transform" />
            <span>Siga no Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
