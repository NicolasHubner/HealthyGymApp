import { TextTitle } from './style';

interface TitlePatternProps {
    size?: number;
    children: string;
}

export default function TitlePattern({ size = 18, children }: TitlePatternProps) {
    return <TextTitle size={size}>{children}</TextTitle>;
}
