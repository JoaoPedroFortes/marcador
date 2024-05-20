import React, { useEffect, useState } from 'react';
import { PencilIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import HeaderComponent from '@/components/shared/header';
import { getLoggedUser } from '@/utils/cookie/cookie';
import { httpGET } from '@/utils/service/api-service';
import { toast } from 'react-toastify';

type IServico = {
    nome: string;
    descricao?: string;
    valor: number
}



export default function Servico() {

    const [accessToken, setAccessToken] = useState('');
    const [url, setUrl] = useState('');

    const [listaServico, setListaServico] = useState([{
        nome: '',
        descricao: '',
        valor: 0
    }])


    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_API;
        setUrl(url + "/servico")

        const loggedUser = getLoggedUser();
        setAccessToken(loggedUser?.accessToken);

    }, [])

    useEffect(() => {

        const callback = (response: any) => {
            setListaServico(response)
        }

        const callbackError = (error: any) => {
            toast.error(`Ocorreu um erro ao recuperar a lista: , ${error}`);
        }
        httpGET({ url, token: accessToken, callback, callbackError });
    }, [!!url, !!accessToken])

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
                                {listaServico?.map((servico, index) => (
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


                <div className="w-full">

                    <div className="flex justify-end lg:mr-10">

                        <a href={"/servico/adicionar"}
                            className="mr-4 btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Adicionar
                        </a>
                    </div>
                </div>
            </main>
        </>

    )
}