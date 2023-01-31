interface HidePartOfStringOptions {
  text: string;
}

export function hidePartOfString({ text }: HidePartOfStringOptions) {
  const firstCharacter = text.split('')[0];
  const indexOfAt = text.indexOf('@');
  const hiddenText = '*'.repeat(indexOfAt - 1) + text.substring(indexOfAt);

  return `${firstCharacter}${hiddenText}`;
}
