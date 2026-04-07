import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <img
              src="https://res.cloudinary.com/dxhlvrach/image/upload/v1762538780/ReyelLogo_joyiw3.png"
              alt="Reyel Produções"
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 mb-4">
              Eternizando momentos especiais através da fotografia profissional desde 2023.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/reyelproducoes_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Experiências
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Equipe
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-red-500 mt-1" />
                <div>
                  <a
                    href="mailto:reyelproducoes@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    reyelproducoes@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-red-500 mt-1" />
                <div>
                  <a
                    href="https://wa.me/5573916386543"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    +55 73 9163-8654
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-red-500 mt-1" />
                <div>
                  <p className="text-gray-400">Brasil</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://www.instagram.com/onzy.company"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              Onzy Company
            </a>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
