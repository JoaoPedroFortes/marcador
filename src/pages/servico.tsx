import React, { useEffect, useState } from 'react';
import { PencilIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import HeaderComponent from '@/components/shared/header';

type IServico = {
    nome: string;
    descricao?: string;
    valor: number
}



export default function Servico() {

    const [listaServico, setListaServico] = useState([{
        nome: '',
        descricao: '',
        valor: 0
    }])

    useEffect(() => {
        async function fetchAPI() {
            let data = undefined;
            const listaServicoCookie = localStorage.getItem('listaServicoCookie');
            if(listaServicoCookie){
                data = JSON.parse(listaServicoCookie);
            }
            setListaServico(data);
        }
        fetchAPI();
    }, []);

    return (
        <>
            <HeaderComponent title='Serviços'></HeaderComponent>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div>

                    </div>
                    <div className="container" suppressHydrationWarning >
                        <table className="w-full" suppressHydrationWarning >
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        Nome
                                    </th>
                                    <th className="text-left">
                                        Descrição
                                    </th>
                                    <th className="text-left">
                                        Valor
                                    </th>
                                    <th >
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaServico.map((servico, index) => (
                                    <tr key={index}>
                                        <td>{servico.nome}</td>
                                        <td>{servico.descricao ? servico.descricao : '-'}</td>
                                        <td>{servico.valor}</td>
                                        <td className="text-right"> <PencilIcon className="block h-4 w-4" aria-hidden="true" /></td>
                                        <td className="text-center"> <XMarkIcon className="text-red-700 block h-4 w-4" aria-hidden="true" /></td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                    </div>

                </div>
                {/* <button className='fixed right-11 bottom-5' title='Novo Serviço'>
                    <Link href="/servico/adicionar">
                    <PlusCircleIcon className="block h-10 w-10"></PlusCircleIcon>
                    </Link>
                </button> */}


                <div className="fixed bottom-5 w-full">

                    <div className="flex justify-end lg:mr-10">
                        <Link href={"/servico/adicionar"}>
                            <button
                                className="mr-4 btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Adicionar
                            </button>

                        </Link>

                    </div>
                </div>
            </main>
        </>

    )
}