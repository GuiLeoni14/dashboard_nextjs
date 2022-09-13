import { AuthContext } from './../../contexts/AuthContext';
import { useContext } from 'react';
import { validadeUserPermissions } from '../../utils/validadeUserPermissions';
type UseCanParams = {
    permissions?: string[];
    roles?: string[];
};
export function useCan({ roles, permissions }: UseCanParams) {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return false;
    }
    const userHasValidPermissions = validadeUserPermissions({
        user,
        roles,
        permissions,
    });

    return userHasValidPermissions;
}
