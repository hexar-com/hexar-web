import React from "react";

interface ModalSuccessProps {
    visible: boolean;
    onClose: () => void;
}

function ModalSuccess({ visible, onClose }: ModalSuccessProps) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">¡Mensaje enviado con éxito!</h2>
                <p className="mb-6 text-center">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                <div className="flex justify-center">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalSuccess;