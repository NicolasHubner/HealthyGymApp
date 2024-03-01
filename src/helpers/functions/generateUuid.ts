const generateFourRandomCharacters = () => {
    // eslint-disable-next-line no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export function generateRandomUuid() {
    let head = `${generateFourRandomCharacters()}${generateFourRandomCharacters()}`;
    let middle1 = `${generateFourRandomCharacters()}`;
    let middle2 = `${generateFourRandomCharacters()}`;
    let middle3 = `${generateFourRandomCharacters()}`;
    let tail = `${generateFourRandomCharacters()}${generateFourRandomCharacters()}${generateFourRandomCharacters()}`;

    return head + '-' + middle1 + '-' + middle2 + '-' + middle3 + '-' + tail;
}
