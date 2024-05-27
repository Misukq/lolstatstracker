import React from 'react';

type AlertProps = {
    children: React.ReactNode;
    variant?: 'success' | 'error' | 'info' | 'warning'; // Ajoutez une prop pour spécifier le type d'alerte
};

const Alert = ({ children, variant }: AlertProps) => {
    let bgColor = '';

    // Définissez la couleur de fond en fonction du type d'alerte
    switch (variant) {
        case 'success':
            bgColor = 'bg-green-200';
            break;
        case 'error':
            bgColor = 'bg-red-200';
            break;
        case 'info':
            bgColor = 'bg-blue-200';
            break;
        case 'warning':
            bgColor = 'bg-yellow-200';
            break;
        default:
            bgColor = 'bg-gray-200';
            break;
    }

    return (
        <div className={`p-2 rounded ${bgColor}`}>
            {children}
        </div>
    );
};

export { Alert };
