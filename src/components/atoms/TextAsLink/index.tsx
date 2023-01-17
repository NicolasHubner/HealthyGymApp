interface TextAsLink {
  label: string;
  onPress?: () => void | undefined;
  color?: string;
}

import { Container, Text } from "./styles";

export function TextAsLink({ label, onPress, color }: TextAsLink) {
  return (
    <Container>
      <Text>{label}</Text>
    </Container>
  );
}
