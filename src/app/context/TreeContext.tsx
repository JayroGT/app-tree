"use client";
import React, { createContext, useContext, useState } from 'react';

interface ProcessedData {
    value: any;
    countE: number;
}

interface TreeContextType {
    data: ProcessedData | null;
    processArray: (input: any) => ProcessedData;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ProcessedData | null>(null);

    const processArray = (input: any): ProcessedData => {
        const processItem = (item: any, depth = 1): ProcessedData => {
            if (typeof item === 'string') {
                const reversedString = item.split('').reverse().join('');
                const countE = (item.match(/[eE]/g) || []).length;
                return { value: reversedString, countE };
            } else if (typeof item === 'number' || typeof item === 'boolean') {
                return { value: item, countE: 0 };
            } else if (Array.isArray(item)) {
                const resultArray = item.map(subItem => processItem(subItem, depth + 1));
                const totalE = resultArray.reduce((acc, cur) => acc + cur.countE, 0);
                return { value: resultArray, countE: totalE };
            } else if (typeof item === 'object' && item !== null) {
                const result: any = {};
                let totalE = 0;
                for (const [key, value] of Object.entries(item)) {
                    const processed = processItem(value, depth + 1);
                    const invertedKey = key.split('').reverse().join('') + ` ${depth}`;
                    result[invertedKey] = processed.value;
                    totalE += processed.countE;
                }
                result.countE = totalE;
                return { value: result, countE: totalE };
            }
            return { value: item, countE: 0 };
        };

        const result = processItem(input);
        setData(result);
        return result;
    };

    return (
        <TreeContext.Provider value={{ data, processArray }}>
            {children}
        </TreeContext.Provider>
    );
};

