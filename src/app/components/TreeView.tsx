"use client"
import React from 'react';
import { useTreeContext } from '../context/TreeContext';

const TreeView: React.FC = () => {
    const { data } = useTreeContext();

    if (!data) {
        return <div>No data processed yet</div>;
    }

    const renderTree = (node: any): JSX.Element => {
        if (Array.isArray(node)) {
            return (
                <ul>
                    {node.map((item, index) => (
                        <li key={index}>{renderTree(item)}</li>
                    ))}
                </ul>
            );
        } else if (typeof node === 'object') {
            return (
                <ul>
                    {Object.entries(node).map(([key, value], index) => (
                        <li key={index}>
                            <strong>{key}:</strong> {renderTree(value)}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <span>{node}</span>;
        }
    };

    return (
        <div>
            <h2>Processed Data Tree</h2>
            {renderTree(data.value)}
        </div>
    );
};

export default TreeView;
