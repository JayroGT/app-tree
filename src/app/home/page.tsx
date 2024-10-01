"use client"
import React from 'react';
import { TreeProvider } from '../context/TreeContext';
import InputForm from '../components/InputForm';
import TreeView from '../components/TreeView';

const Home: React.FC = () => {
    return (
            <div className='bg-green-200 flex flex-col justify-center items-center w-full h-full bg-red-200'>
                <h1>JSON Processor</h1>
                <InputForm />
                <TreeView />
            </div>
    );
};

export default Home;
