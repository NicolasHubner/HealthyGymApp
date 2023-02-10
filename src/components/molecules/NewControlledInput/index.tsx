import { Controller, ControllerProps } from 'react-hook-form';

import { Container } from './styles';
import { TextRequired } from '@/components/atoms/TextRequired';

export interface NewControlledInputProps extends ControllerProps {
    errors: any;
}

export function NewControlledInput(props: NewControlledInputProps) {
    const { errors, ...rest } = props;

    return (
        <Container>
            <Controller {...rest} />
            {!!errors[rest.name] && (
                <TextRequired>{errors[rest.name]?.message ?? 'Informação inválida'}</TextRequired>
            )}
        </Container>
    );
}
