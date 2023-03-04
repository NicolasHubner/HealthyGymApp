import CheckedIconImg from '@/assets/svg/check.svg';

import { Container, Username } from './styles';

interface StudentUsernameProps {
    name: string;
}
export function StudentUsername({ name }: StudentUsernameProps) {
    if (!name) return <></>;

    return (
        <Container>
            <Username>@{name}</Username>
            <CheckedIconImg />
        </Container>
    );
}
