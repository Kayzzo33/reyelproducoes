import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, X } from 'lucide-react';
import { supabase, GalleryVideo, TABLES } from '../lib/supabase';
import { formatDriveUrl } from '../utils/drive';

export default function ReelsSection() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      if (data) setVideos(data as GalleryVideo[]);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    
    // Instagram
    if (url.includes('instagram.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}embed/`;
    }
    
    // Google Drive
    if (url.includes('drive.google.com')) {
      return formatDriveUrl(url, 'preview');
    }
    
    return url;
  };

  const isDirectVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  return (
    <section id="videos" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            Produções <span className="text-red-600">Audiovisuais</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 font-light">
            Eternizando momentos através de vídeos comerciais e coberturas de eventos com olhar cinematográfico.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-red-500/20 border-t-red-600 rounded-full animate-spin"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center text-gray-500 py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-xl">Novas produções em breve.</p>
            <p className="text-sm mt-2 font-light">Acompanhe nossas redes sociais para atualizações diárias.</p>
          </div>
        ) : (
          <div 
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 place-items-center"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative w-full max-w-[320px] aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <img
                  src={video.thumbnail_url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80'}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 transform group-hover:scale-110 mb-4">
                    <Play className="text-white fill-current ml-1" size={24} />
                  </div>
                  <h3 className="text-white font-bold text-xl drop-shadow-lg group-hover:text-red-500 transition-colors">
                    <span>{video.title}</span>
                  </h3>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-[10003] w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-600 transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              {isDirectVideo(selectedVideo.video_url) ? (
                <video 
                  src={selectedVideo.video_url}
                  className="w-full h-full"
                  controls
                  autoPlay
                />
              ) : (
                <iframe
                  src={getEmbedUrl(selectedVideo.video_url)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
