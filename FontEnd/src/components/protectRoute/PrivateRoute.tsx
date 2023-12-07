import { ReactNode } from 'react';
import Loading from '../ui/Loading';
import { checkAdmin } from '@/utils/checkAdmin';

type Props = {
    children: ReactNode;
};

const ProtectRoute = ({ children }: Props) => {
    const { data: authData, isLoading } = checkAdmin();

    return <>{!authData && isLoading ? <Loading /> : children}</>;
};

export default ProtectRoute;
