import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLoggedUser } from '../cookie/cookie';

const useAuth = (noProtectedRoutes: string[]) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (!loggedUser && !noProtectedRoutes.includes(router.pathname)) {
      router.push('/login');
    }else{
        setIsLoading(false);
    }
  }, [router, noProtectedRoutes]);
  return {isLoading}
};

export default useAuth;