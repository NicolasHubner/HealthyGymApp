interface Headers {
    [key: string]: any;
}

export function generateAuthHeaders(token: string, headers?: Headers) {
    const baseHeaders = {};

    return {
        ...baseHeaders,
        ...(headers ? { ...headers } : null),
        Authorization: `Bearer ${token}`,
    };
}
