import { Modal, Spinner } from 'native-base';
import { ConfirmTextMessage, ConfirmInput, ConfirmButton, ConfirmButtonText } from '../../style';

interface ModalDeleteAccountProps {
    handleRemoveAccount: () => void;
    confirmedExclusion: boolean;
    setConfirmedExclusion: (value: boolean) => void;
    loadingExclusion: boolean;
}

export const ModalDeleteAccount = ({
    handleRemoveAccount,
    confirmedExclusion,
    setConfirmedExclusion,
    loadingExclusion,
}: ModalDeleteAccountProps) => {
    return (
        <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Remover conta</Modal.Header>
            <Modal.Body>
                <ConfirmTextMessage>
                    Digite a palavra "Confirmo" para excluir a conta.
                </ConfirmTextMessage>
                <ConfirmInput
                    onChangeText={e => {
                        if (e.toLowerCase() === 'confirmo' && !confirmedExclusion) {
                            setConfirmedExclusion(true);
                        }

                        if (e.toLowerCase() !== 'confirmo' && confirmedExclusion) {
                            setConfirmedExclusion(false);
                        }
                    }}
                />
                <ConfirmButton disabled={!confirmedExclusion} onPress={handleRemoveAccount}>
                    <ConfirmButtonText>
                        {loadingExclusion ? <Spinner color="#fefefe" /> : 'Confirmar'}
                    </ConfirmButtonText>
                </ConfirmButton>
            </Modal.Body>
        </Modal.Content>
    );
};
