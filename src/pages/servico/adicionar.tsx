import HeaderComponent from '@/components/shared/header';
import Link from 'next/link';
import React, { useState } from 'react';



const AdicionarServico = () => {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');


    const handleCadastro = (event) => {
        event.preventDefault();
        console.log('Dados do formulário:', { nome, descricao, valor });
    };
    return (

        <div>
            
            <HeaderComponent title='Adicionar Serviço'></HeaderComponent>
            <main className='w-full flex item-start justify-start'>
                <div className="lg:pl-8 w-full py-6 ">
                    <form className="w-full flex flex-wrap">
                        <div className='w-full flex'>
                            <div className="mb-4 w-full lg:w-3/12">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome" >
                                    Serviço:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nome"
                                    type="text"
                                    placeholder="Digite o nome do serviço"
                                    value={nome}
                                    aria-autocomplete='none'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="ml-1 w-full lg:w-3/12">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
                                    Valor:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="valor"
                                    type="number"
                                    placeholder="Digite o valor do serviço"
                                    step="0.01"
                                    value={valor}
                                    aria-autocomplete='none'
                                    onChange={(e) => setValor(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="mb-4  w-full lg:w-6/12 ">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao" >
                                    Descrição:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="descricao"
                                    type="text"
                                    placeholder="Descrição do serviço"
                                    value={descricao}
                                    aria-autocomplete='none'
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className="w-full">

                            <div className="flex justify-end lg:mr-10">
                                <Link href={"/servico"}>
                                    <button
                                        className="mr-4 bg-gray-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Voltar
                                    </button>

                                </Link>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleCadastro}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdicionarServico;