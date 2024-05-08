import React, { useEffect, useState } from 'react';
import { PencilIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import HeaderComponent from '@/components/shared/header';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';


interface CustomEditorProps {
    scheduler: SchedulerHelpers;
  }
  
export default function Agendamento() {


    return (
        <>
            <HeaderComponent title='Agendamentos'></HeaderComponent>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div>

                    </div>
                    <div className="container" suppressHydrationWarning >
                        
                    </div>

                </div>
            
                <div className="fixed bottom-5 w-full">

                    <div className="flex justify-end lg:mr-10">
                        <Link href={"/agendamento/adicionar"}>
                            <button
                                className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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