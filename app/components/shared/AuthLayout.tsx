import React from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import {UserRole} from "../../library/enums";
import {getJwtUserInfo} from "../../library/functions";
import { useIsomorphicLayoutEffect } from 'ahooks';

type Props = {
    authRequire: boolean;
    children: ReactNode;
};

const AuthLayout: React.FC<Props> = ({ authRequire, children }) => {
    const [user, setUser] = React.useState<boolean>(false);
    const { replace } = useRouter();
    useIsomorphicLayoutEffect(() => {
        const jwtUser = getJwtUserInfo() as Record<string, any>;
        const isAuthenticated = jwtUser && Object.keys(jwtUser).length > 0 && jwtUser?.userType;
     if (authRequire && !isAuthenticated) {
           alert('Please login to continue');
            replace('/login');
        }
     else if (!authRequire && isAuthenticated) {
             replace('/app/chats');
         }else {
            setUser(true);
        }
    }, [authRequire]);
    if (typeof window === 'undefined' || !user) return null;
    return children;
};
export default AuthLayout;
