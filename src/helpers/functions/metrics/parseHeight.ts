export const parseHeight = (height?: number | null) => {
    if (!height) {
        return '1,50m';
    }

    const parsed = height?.toString().replace('.', '').replace(',', '');

    const first = parsed.slice(0, 1);
    const second = parsed.slice(1, 3).padEnd(2, '0');

    return `${first},${second}m`;
};
