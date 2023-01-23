import { TextSubTitle } from './style';

interface TextSubTitleGreenProps {
  children: React.ReactNode;
}

export function TextSubTitleGreen({ children }: TextSubTitleGreenProps) {
  return <TextSubTitle>{children}</TextSubTitle>;
}
