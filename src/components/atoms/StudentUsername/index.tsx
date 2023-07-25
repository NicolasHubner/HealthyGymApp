import CheckedIconImg from '@/assets/svg/check.svg';

import { Foundation } from '@expo/vector-icons';

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
            {!verified && <Foundation name="alert" size={16} color="red" />}
        </Container>
    );
}
