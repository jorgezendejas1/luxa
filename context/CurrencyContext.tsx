
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Currency = 'MXN' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    convertPrice: (priceInMxn: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATE_USD_TO_MXN = 18.50;

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<Currency>('MXN');

    const convertPrice = (priceInMxn: number): string => {
        if (currency === 'USD') {
            const priceInUsd = priceInMxn / EXCHANGE_RATE_USD_TO_MXN;
            return priceInUsd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        }
        // Default to MXN
        return priceInMxn.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
