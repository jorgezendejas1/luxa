import React, { useState } from 'react';
import { Page } from '../types';

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.88-1.59-1.93-2.2-4.42-1.8-6.83.12-.71.29-1.4.49-2.08 1.09-3.37 3.67-5.62 6.98-6.16.33-.05.66-.06 1-.07v2.68c-.32.01-.64.02-.96.04-1.47.11-2.85.73-3.8 1.83-1.06 1.22-1.56 2.85-1.4 4.51.03.28.07.56.11.83.08.57.19 1.13.34 1.67.11.4.24.79.41 1.17.29.61.68 1.18 1.14 1.67.88.93 2.12 1.48 3.48 1.48.97 0 1.9-.34 2.68-.9.69-.51 1.19-1.21 1.48-2.02.03-.09.05-.18.08-.28.02-.08.03-.16.05-.24v-10.3c-.56-.25-1.1-.48-1.62-.67-1.2-.46-2.5-.6-3.78-.42-3.33.46-5.96 3.16-6.41 6.51-.07.53-.09 1.07-.09 1.6-.02 3.1.94 6.04 3.2 8.03 2.15 1.9 5.04 2.75 7.82 2.41 2.7-.33 5.1-1.91 6.4-4.38.54-1.03.86-2.17.94-3.34.01-.24.01-.48.01-.72v-4.5c-.83.02-1.66.01-2.49-.02-1.12-.04-2.24-.2-3.32-.51-1.04-.3-2.02-.75-2.9-1.33a3.13 3.13 0 0 1-.58-.42.02-.02.02-.02z"></path></svg>
);

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email)) {
            alert(`¡Gracias por suscribirte, ${email}! Recibirás nuestras mejores ofertas.`);
            setEmail('');
        } else {
            alert('Por favor, introduce un correo electrónico válido.');
        }
    };

    return (
        <footer className="bg-gray-100 text-gray-600">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Atención al Cliente</h3>
                         <ul className="space-y-2">
                            <li><button onClick={() => onNavigate('help')} className="hover:text-pink-500">Centro de Ayuda</button></li>
                            <li><button onClick={() => onNavigate('how-to-buy')} className="hover:text-pink-500">Cómo Comprar</button></li>
                            <li><button onClick={() => onNavigate('shipping')} className="hover:text-pink-500">Envíos</button></li>
                            <li><button onClick={() => onNavigate('returns')} className="hover:text-pink-500">Devoluciones</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Sobre Nosotros</h3>
                         <ul className="space-y-2">
                            <li><button onClick={() => onNavigate('about')} className="hover:text-pink-500">Nuestra Historia</button></li>
                            <li><button onClick={() => onNavigate('careers')} className="hover:text-pink-500">Carreras</button></li>
                             <li><button onClick={() => onNavigate('press')} className="hover:text-pink-500">Prensa</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-pink-500"><InstagramIcon /></a>
                            <a href="#" className="hover:text-pink-500"><FacebookIcon /></a>
                            <a href="#" className="hover:text-pink-500"><TikTokIcon /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Suscríbete a nuestro boletín</h3>
                        <p className="mb-4">Recibe ofertas exclusivas y las últimas tendencias.</p>
                        <form onSubmit={handleSubscribe} className="flex">
                            <input 
                                type="email" 
                                placeholder="Tu correo electrónico" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-300" 
                            />
                            <button type="submit" className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors">Enviar</button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} LUXA. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
