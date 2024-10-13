import { jwtDecode } from 'jwt-decode';


export const getJwtToken = () => {
    try {
        return localStorage.getItem('authToken') as string;
    } catch (e) {
        return {};
    }
};
export const getJwtUserInfo = (): Record<string, any> => {
    try {
        return jwtDecode(localStorage.getItem('authToken') as string);
    } catch (e) {
        return {};
    }
};
export const getJwtClientId = (): string => {
    try {
        const jwtUser = getJwtUserInfo();
        return jwtUser?.client || '';
    } catch (e) {
        return '';
    }
};
