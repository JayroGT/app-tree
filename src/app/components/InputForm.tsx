"use client"
import React, { useState } from 'react';
import { useTreeContext } from '../context/TreeContext';

const InputForm: React.FC = () => {
    const [input, setInput] = useState('');
    const { processArray } = useTreeContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(input);
            processArray(parsedInput);
        } catch (error) {
            alert('Invalid JSON input');
        }
    };

    return (
        <form className='w-full bg-blue-200 flex flex-col justify-center items-center ' onSubmit={handleSubmit}>
            <textarea
            className='w-[50rem] '
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={10}
                placeholder="Enter JSON here"
            />
            <button type="submit">Process</button>
        </form>
    );
};

export default InputForm;
