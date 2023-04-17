import CheckedIconImg from '@/assets/svg/check.svg';

import { Container, Username } from './styles';

interface StudentUsernameProps {
    name: string;
    verified?: boolean;
}
export function StudentUsername({ name, verified = true }: StudentUsernameProps) {
    if (!name) return <></>;

    return (
        <Container>
            <Username>{name}</Username>
            {verified && <CheckedIconImg />}
        </Container>
    );
}
