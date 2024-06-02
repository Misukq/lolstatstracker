import React, { useEffect, useState } from 'react';

type AlertProps = {
    children: React.ReactNode;
    variant?: 'success' | 'error' | 'info' | 'warning'; // Prop pour spécifier le type d'alerte
};

const Alert: React.FC<AlertProps> = ({ children, variant }) => {
    const [visible, setVisible] = useState(true);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    
    if (!visible) return null;

    return (
        <div className={`p-2 rounded ${bgColor} flex justify-between items-center`}>
            <span>{children}</span>
            <button onClick={() => setVisible(false)} className="text-gray-500 hover:text-gray-700">
                &times;
            </button>
        </div>
    );
};

export { Alert };
