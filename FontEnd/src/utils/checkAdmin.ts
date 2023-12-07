import { useMeQuery } from '@/services/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const checkAdmin = () => {
    const router = useNavigate();
    const path = useLocation();

    const { data, isLoading } = useMeQuery();

    useEffect(() => {
        if (!isLoading) {
            if (data?.role === 'admin' && path.pathname === '/admin/') {
                router('/admin')
            } else if (data?.role !== 'admin' ) {
                router('/account/signin');
            }
        }
    }, [data, isLoading, router]);

    return { data, isLoading };
};
