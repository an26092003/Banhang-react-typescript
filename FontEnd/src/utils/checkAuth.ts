import { useMeQuery } from '@/services/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const checkAuth = () => {
    const router = useNavigate();
    const path = useLocation();
    const { data, isLoading } = useMeQuery();
    useEffect(() => {
        if (!isLoading) {
            if (data && (path.pathname === '/account/signin' || path.pathname === '/account/signup')) {
                router('/')
            } else if (!data && path.pathname !== '/account/signin' && path.pathname !== '/account/signup') {
                router('/account/signin');
            }
        }
    }, [data, isLoading, router]);
    return { data, isLoading };
};
