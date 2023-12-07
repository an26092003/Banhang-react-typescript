import { useMeQuery } from '@/services/auth';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const checkEditor = () => {
    const router = useNavigate();
    const path = useLocation();

    const { data, isLoading } = useMeQuery();

    useEffect(() => {
        if (!isLoading) {
            if (data?.role === 'editor' && path.pathname === '/editor/') {
                router('/editor')
            } else if (data?.role !== 'editor'&& path.pathname !== '/editor/' ) {
                router('/account/signin');
            }
        }
    }, [data, isLoading, router]);

    return { data, isLoading };
};

