import HeaderComponent from '@/components/shared/header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { formatISO } from 'date-fns';

import { SchedulerHelpers } from '@aldabil/react-scheduler/types';


interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

interface AgendamentoProps extends CustomEditorProps{
    isModal?: Boolean
}

const AdicionarAgendamento  = (props?: AgendamentoProps) => {

    const scheduler = props?.scheduler;
    const [isModal, setIsModal] = useState(false);

    const startAt = scheduler?.state?.start?.value;

    const [listaServicoCookie, setListaServicoCookie] = useState([]);


    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [tipoAgendamento, setTipoAgendamento] = useState('');
    const [selectedServico, setSelectedServico] = useState(null);
    const [dateTime, setDateTime] = useState('');

    const handleChangeDateTime = (event) => {
        setDateTime(event.target.value);
        console.log(dateTime)
    };
    const handleChangeServico = (event) => {
        const selectedIndex = event.target.value;
        setSelectedServico(listaServicoCookie[selectedIndex]);
    };

    const handleChange = (event) => {
        setTipoAgendamento(event.target.value);
    };

    const handleCadastro = (event) => {
        event.preventDefault();
        console.log('Dados do formulário:', { nome, celular, email, tipoAgendamento, selectedServico });

        const dataatual = new Date(dateTime)
        dataatual.setMinutes(dataatual.getMinutes() + 40)
        const objToCache = {
            title: nome,
            start: dateTime,
            end: dataatual.toISOString()
        };

        console.log(objToCache)

        let cookieListaAgenda = localStorage.getItem('listaAgendaCookie');
        let listaAgenda = []
        if (cookieListaAgenda) {
            listaAgenda = JSON.parse(cookieListaAgenda);
        }
        listaAgenda.push(objToCache)
        cookieListaAgenda = JSON.stringify(listaAgenda);
        localStorage.setItem('listaAgendaCookie', cookieListaAgenda);

        scheduler?.close()
    };

    const fecharModal= ()=>{
        scheduler?.close();
    }
    useEffect(() => {
        console.log(props)
        if(props?.isModal ){
            setIsModal(true)
            setTipoAgendamento("U");
        }
        const listaServicoCookie = localStorage.getItem('listaServicoCookie');
        if (listaServicoCookie) {
            setListaServicoCookie(JSON.parse(listaServicoCookie));
        }

        if(startAt){
            console.log('aqui =>', startAt)
            let dateTimeToString = formatISO(startAt);
            console.log(dateTimeToString)
            setDateTime(dateTimeToString.slice(0,16))

        }
    }, [])

    return (

        <div>

            <HeaderComponent title='Adicionar Agendamento'></HeaderComponent>
            <main className='w-full flex item-start justify-start'>
                <div className="lg:pl-8 w-full py-6 px-2">
                    <form onSubmit={handleCadastro} >
                        <div className='container  lg:flex '>
                            <div className="mb-4 w-full lg:w-3/12">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">Celular:</label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    placeholder="Digite o celular do cliente"
                                    id="telefone"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={celular}
                                    aria-autocomplete='none'
                                    required
                                    onChange={(e) => setCelular(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 lg:ml-1 w-full lg:w-3/12">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome" >
                                    Nome do cliente:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nome"
                                    type="text"
                                    placeholder="Digite o nome do cliente"
                                    value={nome}
                                    aria-autocomplete='none'
                                    required
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 lg:ml-1 w-full lg:w-3/12">

                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail:</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Digite o e-mail do cliente"
                                    value={email}
                                    aria-autocomplete='none'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className=" w-full lg:w-5/12 mb-10">
                            <label htmlFor="servicoSelect" className="mb-2 font-bold">
                                Selecione um serviço:
                            </label>
                            <select
                                id="servicoSelect"
                                onChange={handleChangeServico}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">-Selecione-</option>
                                {listaServicoCookie.map((servico, index) => (
                                    <option key={index} value={index}>
                                        {servico.nome} {servico.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="lg:ml-1 w-full flex mb-10">

                            <div className="w-full lg:w-3/12 mb-10" hidden={isModal}>
                                <h2 className='text-1xl font-bold tracking-tight text-gray-900'>Tipo de Agendamento:</h2>
                                <label>
                                    <input
                                        type="radio"
                                        value="U"
                                        disabled={isModal}
                                        checked={tipoAgendamento === 'U'} // Verifica se o tipo de agendamento é 'Único'
                                        onChange={handleChange} // Manipulador de evento para atualizar o estado quando uma opção é selecionada
                                    />
                                    Único
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        value="R"
                                        disabled={isModal}
                                        checked={tipoAgendamento === 'R'} // Verifica se o tipo de agendamento é 'Recorrente'
                                        onChange={handleChange} // Manipulador de evento para atualizar o estado quando uma opção é selecionada
                                    />
                                    Recorrente
                                </label>
                            </div>
                            {

                                tipoAgendamento === 'U' ?
                                    <div className="w-full lg:w-4/12 mb-10">
                                        <label htmlFor="dateTimeInput" className="mb-2 font-bold">
                                            Selecione uma data e hora:
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="dateTimeInput"
                                            value={dateTime}
                                            required
                                            onChange={handleChangeDateTime}
                                            className="appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    :
                                    ''
                            }




                        </div>

                        <div className="w-full">

                            <div className="flex justify-end lg:mr-10">

                                {isModal ? (
                                    <button
                                    onClick={fecharModal}
                                        className="mr-4 bg-gray-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Voltar
                                    </button>
                                
                                
                                )
                                : 
                                (<Link href={"/agendamento"}>
                                <button
                                   
                                        className="mr-4 bg-gray-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Voltar
                                    </button>

                                </Link>
                                )}
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
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

export default AdicionarAgendamento;