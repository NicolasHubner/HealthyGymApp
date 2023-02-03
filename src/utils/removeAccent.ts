export function removeAccentFromString(str: string) {
  if (!str || str.length <= 0) return null;

  const withAccents = 'ÀÁÂÃÄÅÆÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæèéêëìíîïðñòóôõöøùúûüýÿ';
  const withoutAccent = 'AAAAAAAEEEEIIIIDNOOOOOOUUUUYsaaaaaaaeeeeiiiionoooooouuuuyy';
  let novaString = '';

  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    let index = withAccents.indexOf(char);
    if (index >= 0) {
      novaString += withoutAccent.charAt(index);
    } else {
      novaString += char;
    }
  }

  return novaString;
}
