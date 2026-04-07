import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram } from 'lucide-react';
import { supabase, TeamMember, TABLES } from '../lib/supabase';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const { data, error } = await supabase
        .from(TABLES.TEAM_MEMBERS)
        .select('*')
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error fetching team members:', error);
        setHasError(true);
        setIsLoading(false);
        return;
      }

      if (data) {
        setTeamMembers(data as TeamMember[]);
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nossa Equipe
          </h2>
          <p className="text-xl text-gray-400 mb-2">
            Atualmente, nossa equipe é composta por 10 integrantes
          </p>
          <p className="text-lg text-gray-500 mb-6">
            Com muita dedicação e trabalho, visamos todos os nichos
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto"></div>
        </motion.div>

{isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        ) : hasError ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Nao foi possivel carregar a equipe.</p>
            <button
              onClick={fetchTeamMembers}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>A equipe sera exibida aqui em breve.</p>
            <p className="text-sm mt-2">Use o painel administrativo para adicionar membros.</p>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.a
                key={member.id}
                href={member.instagram_url || '#'}
                target={member.instagram_url ? '_blank' : '_self'}
                rel={member.instagram_url ? 'noopener noreferrer' : ''}
                variants={item}
                className="group relative flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>

                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-700 group-hover:border-red-500 transition-colors duration-300 shadow-xl">
                    <img
                      src={member.photo_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {member.instagram_url && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram size={18} className="text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-white font-semibold text-center group-hover:text-red-400 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm text-center">{member.role}</p>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
