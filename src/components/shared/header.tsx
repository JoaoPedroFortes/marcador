

import { useState, useRef } from 'react';

type Props = {
    title: string;
}

export default function HeaderComponent(props: Props) {
    const { title } = props;
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl sm:px-6">
                    <h1 className="text-1xl font-bold tracking-tight text-gray-900">{title}</h1>
                </div>
            </header>
        </>
    )

}