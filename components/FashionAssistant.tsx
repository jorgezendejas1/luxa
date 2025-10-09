import React, { useState, useRef, useEffect } from 'react';

// Define message type for chat history
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// Icons used in the component
const AssistantIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.284 13.488l-1.325 1.324-2.9-2.9-1.325 1.324-2.071-3.488 3.488 2.071 1.325-1.324 2.9 2.9zM12 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
);
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const FashionAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "¡Hola! Soy tu asistente de estilo. Pregúntame sobre tendencias, combinaciones o qué usar para una ocasión especial." }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    // Automatically scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // System instruction to guide the AI for better, on-brand responses
        const systemInstruction = "Eres un asistente de moda experto para Pitaya Glam, una tienda de lujo en México. Tus respuestas deben ser amigables, conversacionales y útiles. Recomienda estilos y combinaciones basados en un catálogo que incluye bolsas, tenis, ropa y accesorios de marcas como Michael Kors, Tory Burch, y Coach. Sé conciso y elegante en tus respuestas.";

        try {
            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: userMessage.text,
                    systemInstruction: systemInstruction,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`La respuesta de la API no fue exitosa: ${errorText}`);
            }

            const data = await response.json();
            const aiMessage: Message = { sender: 'ai', text: data.text || "Lo siento, no pude procesar tu pregunta en este momento." };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error al llamar a la función de Gemini:", error);
            const errorMessage: Message = { sender: 'ai', text: "Lo siento, hubo un problema al conectar con el asistente. Por favor, intenta de nuevo más tarde." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-5 right-5 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 z-50 transform hover:scale-110 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Abrir Asistente de Estilo"
            >
                <AssistantIcon />
            </button>

            {/* Chat Modal */}
            <div className={`fixed bottom-0 right-0 md:bottom-5 md:right-5 h-full w-full md:h-[70vh] md:max-h-[600px] md:w-[400px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full md:translate-y-4 pointer-events-none'}`}>
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-gray-100 border-b rounded-t-lg">
                    <h2 className="text-xl font-bold text-gray-800">Asistente de Estilo</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800" aria-label="Cerrar chat">
                        <CloseIcon />
                    </button>
                </header>

                {/* Chat Body */}
                <main className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-pink-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </main>

                {/* Input Area */}
                <footer className="p-3 border-t bg-white rounded-b-lg">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                            placeholder="Escribe tu pregunta..."
                            disabled={isLoading}
                            className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:bg-gray-100"
                        />
                        <button type="submit" disabled={isLoading} className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 disabled:bg-pink-300">
                            <SendIcon />
                        </button>
                    </form>
                </footer>
            </div>
        </>
    );
};

export default FashionAssistant;