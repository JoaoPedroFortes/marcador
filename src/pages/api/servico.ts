
import type { NextApiRequest, NextApiResponse } from 'next'
import { useState } from 'react'

type IServico = {
    nome: string;
    descricao?: string;
    valor: number
}

// TESTE DE LISTA DE SERVICO
const listaServico = [
  { nome: 'Cabelo', valor: 30.00 },
  { nome: 'Barba', valor: 40.00 },
  { nome: 'Combo 1', descricao: 'Cabelo + Barba', valor: 60.00 },
  { nome: 'Sobrancelha', valor: 10 },
];

export default function Servico(
  req: NextApiRequest,
  res: NextApiResponse<IServico[]>
) {

  res.status(200).json(listaServico)
  
}