import React from 'react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-4 animate-fade-in">
                <h2 id="dialog-title" className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
                <div className="text-gray-600 mb-6">{children}</div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 rounded-md bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 transition-colors"
                        aria-label="Cancel action"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 font-semibold transition-colors"
                        aria-label="Confirm action"
                    >
                        Sí
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
