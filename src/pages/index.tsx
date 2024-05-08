
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/inicio');
  }, []);

  return null; // ou qualquer conteúdo que você queira mostrar durante o redirecionamento
}