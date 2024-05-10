import HeaderComponent from '@/components/shared/header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { formatISO } from 'date-fns';

import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import Calendario from '@/components/shared/util/Calendario';


interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

interface AgendamentoProps extends CustomEditorProps {
    isModal?: Boolean
}

const AdicionarAgendamento = (props?: AgendamentoProps) => {

    const scheduler = props?.scheduler;
    const [isModal, setIsModal] = useState(false);

    const startAt = scheduler?.state?.start?.value;

    const [listaServicoCookie, setListaServicoCookie] = useState([]);


    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [selectedServico, setSelectedServico] = useState(null);
    const [tipoAgendamento, setTipoAgendamento] = useState('R');
    const [tipoFrequencia, setTipoFrequencia] = useState('Q');
    const [dateTime, setDateTime] = useState('');
    const [diaSemanaRecorrente, setDiaSemanaRecorrente] = useState('');
    const [horaRecorrente, setHoraRecorrente] = useState('');
    const [dataRecorrenteAPartir, setDataRecorrenteAPartir] = useState<Date|undefined>(undefined);


    /**
     * Limpa os dados de agendamento unico e recorrente
     */
    const resetDadosHorario = () => {
        setTipoFrequencia('');
        setDateTime('');
        setDiaSemanaRecorrente('');
        setHoraRecorrente('');
    }

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
        resetDadosHorario();
    };

    const handleChangeFrequencia = (event) => {
        setTipoFrequencia(event.target.value);
    }

    const handleDiaSemanaRecorrente = (event) => {
        setDiaSemanaRecorrente(event.target.value);
        setHoraRecorrente('');
    }

    const handleHoraRecorrente = (event) => {
        setHoraRecorrente(event.target.value);
        console.log(event.target.value)
    }


    const addObjCookie = (objToCache) => {
        let cookieListaAgenda = localStorage.getItem('listaAgendaCookie');
        let listaAgenda = []
        if (cookieListaAgenda) {
            listaAgenda = JSON.parse(cookieListaAgenda);
        }
        listaAgenda.push(objToCache)
        cookieListaAgenda = JSON.stringify(listaAgenda);
        localStorage.setItem('listaAgendaCookie', cookieListaAgenda);
    }

    const createObjetoRecorrente = () => {
        if (tipoAgendamento != 'R') return;
        if(!dataRecorrenteAPartir) return

        let limite = tipoFrequencia === 'Q' ? 24 : 12;
        let dataInicio: Date | undefined = dataRecorrenteAPartir;
        dataInicio?.setHours(+horaRecorrente.substring(0,2))
        dataInicio?.setMinutes(+horaRecorrente.substring(3,5))
        // dataInicio?.setTime(new Date(horaRecorrente))
        for (let i = 0; i < limite; i++) {
            const dataFim = new Date(JSON.parse(JSON.stringify(dataInicio))) || new Date() 
            dataFim.setMinutes(dataFim.getMinutes() + 40)


            let start = formatISO(dataInicio);
            start = start.slice(0,16)
            let end = formatISO(dataFim)
            end = end.slice(0,16)

            const objToCache = {
                title: nome,
                start: start,
                end: end
            }

            addObjCookie(objToCache);
            const diasProximoAgendamento = limite === 12 ? 29 : 14;
            dataInicio?.setDate(dataInicio.getDate() + diasProximoAgendamento );
        }

    }

    const onDateChange = (date) => {
        console.log('componente pai ', date)
        setDataRecorrenteAPartir(date)
        console.log(dataRecorrenteAPartir)
    }



    const handleCadastro = (event) => {
        event.preventDefault();
        console.log('Dados do formulário:', { nome, celular, email, tipoAgendamento, selectedServico });

        if(tipoAgendamento === 'R'){
            createObjetoRecorrente()
        }else{

            const dataatual = new Date(dateTime)
            dataatual.setMinutes(dataatual.getMinutes() + 40)
           
            const objToCache = {
                title: nome,
                start: dateTime,
                end: dataatual.toISOString()
            };
    
            console.log(objToCache)
            addObjCookie(objToCache)
        }

        scheduler?.close()
    };

    const fecharModal = () => {
        scheduler?.close();
    }
    useEffect(() => {
        console.log(props)
        if (props?.isModal) {
            setIsModal(true)
            setTipoAgendamento("U");
        }
        const listaServicoCookie = localStorage.getItem('listaServicoCookie');
        if (listaServicoCookie) {
            setListaServicoCookie(JSON.parse(listaServicoCookie));
        }

        if (startAt) {
            console.log('aqui =>', startAt)
            let dateTimeToString = formatISO(startAt);
            console.log(dateTimeToString)
            setDateTime(dateTimeToString?.slice(0, 16))

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
                        <div className="lg:ml-1 w-full flex flex-wrap mb-10">

                            <div className="w-full md:w-2/12 mb-10" hidden={isModal}>
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

                                    <>

                                        <div className="w-full lg:w-2/12 mb-10" >
                                            <h2 className='text-1xl font-bold tracking-tight text-gray-900'>Frequência:</h2>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Q"
                                                    checked={tipoFrequencia === 'Q'}
                                                    onChange={handleChangeFrequencia}
                                                />
                                                15 dias
                                            </label>
                                            <br />
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="M"
                                                    checked={tipoFrequencia === 'M'}
                                                    onChange={handleChangeFrequencia}
                                                />
                                                30 dias
                                            </label>
                                        </div>
                                        <div className="xs:w-6/12 md:3/12 mb-10">
                                            <label htmlFor="dayOfWeekInput" className="mb-2 font-bold">
                                                Selecione um dia da semana:
                                            </label>
                                            <select
                                                id="dayOfWeekInput"
                                                value={diaSemanaRecorrente}
                                                onChange={handleDiaSemanaRecorrente}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Selecione um dia</option>
                                                <option value="2">Terça-feira</option>
                                                <option value="3">Quarta-feira</option>
                                                <option value="4">Quinta-feira</option>
                                                <option value="5">Sexta-feira</option>
                                                <option value="6">Sábado</option>
                                            </select>
                                        </div>
                                        <div className="sm:w-3/12 lg:ml-1 lg:w-1/12 mb-10" hidden={!diaSemanaRecorrente}>
                                            {/* <label htmlFor="timeInput" className="mb-2 font-bold">
                                                Selecione um horário:
                                            </label> */}
                                            <input
                                                type="time"
                                                id="timeInput"
                                                value={horaRecorrente}
                                                min="09:00"
                                                max="21:00"
                                                required={!!diaSemanaRecorrente}
                                                onChange={handleHoraRecorrente}
                                                className="w-12/12 shadow appearance-none border rounded w-full my-7 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="w-full md:ml-1 md:w-3/12 mb-10" hidden={!diaSemanaRecorrente}>
                                            <label htmlFor="timeInput" className="mb-2 font-bold">
                                                A partir de:
                                            </label>
                                            <Calendario
                                                value={dataRecorrenteAPartir}
                                                enabledDays={diaSemanaRecorrente}
                                                onDateChange={onDateChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                    </>
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