import { Container, Icon, InputText } from './styles';

interface FakeInputProps {
  label: string;
  widthInPercent?: number;
}

export function FakeInput({ label = 'exemplo@email.com', widthInPercent = 100 }: FakeInputProps) {
  return (
    <Container style={{ width: `${widthInPercent}%` }}>
      <Icon name="email" size={20} />
      <InputText>{label}</InputText>
    </Container>
  );
}
