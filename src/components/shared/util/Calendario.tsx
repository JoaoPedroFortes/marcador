import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

const Calendario = ({ value, enabledDays, className, onDateChange }) => {

    // Função para verificar se um dia específico está habilitado
    const isDayEnabled = (date: Date) => {
        const dayOfWeek = date.getDay(); // 0 para domingo, 1 para segunda, etc.
        return enabledDays.includes(dayOfWeek);
    };

    const onChange = (date) => {
        console.log(date)
        onDateChange(date)
    }

    return (
        <DatePicker
            filterDate={isDayEnabled}
            placeholderText="Selecione uma data"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            value = {value}
            className={className}
            selected={value}
        />
    );
};

export default Calendario;