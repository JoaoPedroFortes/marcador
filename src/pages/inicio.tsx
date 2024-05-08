import React, { useEffect, useState } from 'react';
import { PencilIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import HeaderComponent from '@/components/shared/header';
import { Scheduler } from '@aldabil/react-scheduler';
import { ProcessedEvent, SchedulerHelpers, Translations } from '@aldabil/react-scheduler/types';
import PADRAO_BRASILEIRO from '@/utils/traducao-agenda';
import { DayProps } from '@aldabil/react-scheduler/views/Day';
import AdicionarAgendamento from './agendamento/adicionar';

type User = {
    name?: string
    email?: string,
    imageUrl?: string,
}

const dayProps: DayProps = {
    startHour: 9,
    endHour: 22,
    step: 40,
    navigation: true 
}
const eventDisabled: ProcessedEvent = {
    event_id: 0,
    title: 'ALMOÇO',
    start: new Date('2024-05-08T12:00'),
    end: new Date('2024-05-08T13:00'),
    disabled: true
}

const getSaudacao = ()=>{
    const now = new Date();
    const hours = now.getHours();

    if(hours >= 12 && hours <18) {
        return 'Boa tarde';
    }else if(hours >= 18 || hours <5){
        return 'Boa noite'
    }
    return 'Bom dia'
}

export default function Inicio() {

    const [usuarioLogado, setUsuarioLogado] = useState<User>({
        name: ''
    });
    const [saudacao, setSaudacao] = useState<String>("Bom dia");
    const [events, setEvents] = useState([eventDisabled]);

    useEffect(() => {

        setSaudacao(getSaudacao());

        const cookieUser = localStorage.getItem('cookieUser')
        if (cookieUser) setUsuarioLogado(JSON.parse(cookieUser));
       
       
        const listaServicoCookie = localStorage.getItem('listaServicoCookie')
        if (!listaServicoCookie) {
            const listaServico = [
                { nome: 'Cabelo', valor: 30.00 },
                { nome: 'Barba', valor: 40.00 },
                { nome: 'Combo 1', descricao: 'Cabelo + Barba', valor: 60.00 },
                { nome: 'Sobrancelha', valor: 10 },
              ];
            localStorage.setItem('listaServicoCookie', JSON.stringify(listaServico)
        )}


        const listaAgendaCookie = localStorage.getItem('listaAgendaCookie');
        let listaAgenda = []
        if(listaAgendaCookie) {listaAgenda = JSON.parse(listaAgendaCookie)}

        const listaEvent:any = []
        listaAgenda.forEach((agenda:any) => {
            const event = {...agenda}
            event.start = new Date(event.start)
            event.end = new Date(event.end)
            listaEvent.push(event);
        });

        setEvents(listaEvent);

      


    }, [])
    return (
        <>
            <HeaderComponent title='Inicio'></HeaderComponent>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="container mb-1" >
                        <h1>{saudacao}, {usuarioLogado.name}</h1>
                    </div>
                    <div className="w-full lg:w-6/12">
                        <Scheduler customEditor={(scheduler) => <AdicionarAgendamento scheduler={scheduler} isModal={true} />}translations={PADRAO_BRASILEIRO} day={dayProps} selectedDate={new Date()}  stickyNavigation={true} events={events} hourFormat={"24"} timeZone="America/Sao_Paulo" view="day" ></Scheduler>
                    </div>

                </div>


            </main>
        </>

    )
}