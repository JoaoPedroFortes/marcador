import HeaderComponent from '@/components/shared/header';
import Link from 'next/link';
import React, { useState } from 'react';



const AdicionarServico = () => {

    const [nome, setNome] = useState('');
    const [horaInicioExpediente, setHoraInicioExpediente] = useState('');
    const [horaFimExpediente, setHoraFimExpediente] = useState('');
    const [valor, setValor] = useState('');


    const handleHoraInicioExpediente = (event) => {
        event.preventDefault();
        setHoraInicioExpediente(event.target.value)
    }
    const handleHoraFimExpediente = (event) => {
        event.preventDefault();
        setHoraFimExpediente(event.target.value)
    }

    const handleCadastro = (event) => {
        event.preventDefault();
        console.log('Dados do formulário:', { nome, horaInicioExpediente, valor });
    };

    return (

        <div>

            <HeaderComponent title='Configurações'></HeaderComponent>
            <main className='w-full flex item-start justify-start'>
                <div className="lg:pl-8 w-full py-6 ">
                    <form className="w-full flex flex-wrap" onSubmit={handleCadastro}>
                        <div className='w-full flex'>
                            <div className="mb-4 w-full lg:w-3/12">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome" >
                                    Nome de apresentação:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nome"
                                    type="text"
                                    placeholder="Digite seu nome de apresentação"
                                    value={nome}
                                    required
                                    aria-autocomplete='none'
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full flex ">
                            <div className="w-3/12">
                                <label htmlFor="horaInicioExpediente" className="block text-gray-700 text-sm font-bold mb-2">
                                    Início do expediente
                                </label>
                                <input
                                    type="time"
                                    id="horaInicioExpediente"
                                    value={horaInicioExpediente}
                                    required
                                    onChange={handleHoraInicioExpediente}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="w-3/12 ml-1">
                                <label htmlFor="horaInicioExpediente" className="block text-gray-700 text-sm font-bold mb-2">
                                    Final do expediente
                                </label>
                                <input
                                    type="time"
                                    id="horaFimExpediente"
                                    value={horaFimExpediente}
                                    required
                                    onChange={handleHoraFimExpediente}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>


                        <div className="w-full">

                            <div className="flex justify-end lg:mr-10">

                                <button type='submit'
                                    className="btn-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Salvar
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