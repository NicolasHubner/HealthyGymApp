export function errorHandler(
  error: any,
  setState: ({ error, message }: { error: boolean; message: string }) => void,
  message: string
) {
  console.error(message, error);

  setState({
    error: true,
    message,
  });

  return;
}
