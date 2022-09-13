type User = {
    permissions: string[];
    roles: string[];
};
type ValidadeUserPermissionsParams = {
    user: User;
    permissions?: string[];
    roles?: string[];
};
export function validadeUserPermissions({ user, permissions, roles }: ValidadeUserPermissionsParams) {
    if (permissions?.length > 0) {
        const hasAllPermissions = permissions.every((permissions) => {
            return user.permissions.includes(permissions);
        });
        if (!hasAllPermissions) {
            return false;
        }
    }

    if (roles?.length > 0) {
        const hasAllRoles = roles.some((roles) => {
            return user.roles.includes(roles);
        });
        if (!hasAllRoles) {
            return false;
        }
    }

    return true;
}
