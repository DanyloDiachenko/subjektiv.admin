export const ReservedUsers = {
    system: {
        id: '00000000-0000-0000-0000-000000000000',
        username: 'system',
        email: 'system@email.com',
        isAdmin: true,
    },
    anonymous: {
        id: '11111111-1111-1111-1111-111111111111',
        username: 'anonymous',
        email: 'anonymous@email.com',
        isAdmin: false,
    },
    system_tester: {
        id: '22222222-2222-2222-2222-222222222222',
        username: 'system_tester',
        email: 'system_tester@email.com',
        isAdmin: true,
    },
} as const;

export const isReservedUser = (user_id: string): boolean =>
    Object.values(ReservedUsers).some((reservedUser) => reservedUser.id === user_id);

export const isAnonymousUser = (user_id: string): boolean => ReservedUsers.anonymous.id === user_id;

export const isSystemUser = (user_id: string): boolean => ReservedUsers.system.id === user_id;
