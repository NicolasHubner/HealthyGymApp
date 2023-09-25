import { Button, Modal, Text, View } from 'native-base';
import { ICardsStudents } from '../RenderCardStudent';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { api } from '@/services/api';
import { RouteNames } from '@/routes/routes_names';
import { throwSuccessToast } from '@/helpers/functions/handleToast';

interface IModalSuplement {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    suplement: string;
    modalData: ICardsStudents | null;
    setQntity: React.Dispatch<React.SetStateAction<number>>;
    qntity: number;
    colors: any;
    image: string | null;
    idSuplement: number;
}

interface ISuplementHistory {
    data: {
        User: string;
        Coach: string;
        Suplement: string;
        Quantity: number;
        Status: string;
        datetime: string;
    };
}

export const ModalSuplement = ({
    isOpen,
    setIsOpen,
    suplement,
    modalData,
    setQntity,
    qntity,
    image,
    colors,
    idSuplement,
}: IModalSuplement) => {
    const navigate = useNavigation<INavigation>();

    const { token, id: IdCoach } = useSelector((state: RootState) => state.user);

    const handleSendSuplement = async () => {
        const headers = generateAuthHeaders(token!);

        const dataToPost: ISuplementHistory = {
            data: {
                User: modalData?.id.toString() || '',
                Coach: IdCoach?.toString() || '',
                Suplement: idSuplement.toString(),
                Quantity: qntity,
                Status: 'Enviado',
                datetime: new Date().toISOString(),
            },
        };
        try {
            await api.post('/suplement-histories', dataToPost, {
                headers,
            });

            navigate.navigate(RouteNames.logged.coach.suplementsLog, {
                dataSuplement: {
                    name: suplement,
                    image: image,
                },
                dataStudent: modalData,
                quantity: qntity,
            });

            throwSuccessToast({
                title: 'Suplemento enviado com sucesso!',
                message: `O suplemento ${suplement} foi enviado para ${
                    modalData?.nameStudent
                } com ${qntity} ${qntity > 1 ? 'unidades' : 'unidade'}.`,
            });

            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size={'full'}
                animationPreset={'slide'}>
                <Modal.Content w={'90%'} borderRadius={16} px={2}>
                    <Modal.CloseButton />
                    <Modal.Header>Deseja enviar a sugestão de suplemento?</Modal.Header>

                    <Modal.Body my={8}>
                        <Text fontWeight={400} fontSize={'16px'}>
                            Enviar{' '}
                            <Text fontWeight={600} fontSize={'18px'} color={colors.green[500]}>
                                {suplement.toUpperCase()}
                            </Text>{' '}
                            para aluno:{' '}
                            <Text fontWeight={600} fontSize={'18px'} color={colors.green[500]}>
                                {modalData?.nameStudent.toUpperCase()}
                            </Text>
                        </Text>

                        <View mt={8} flexDir={'row'} alignItems={'center'}>
                            <Text flexGrow={1} fontWeight={400} fontSize={'16px'}>
                                Na quantidade:{' '}
                            </Text>

                            <View>
                                <Button.Group variant="solid" space={2} alignItems={'center'}>
                                    <Button
                                        borderRadius={100}
                                        size={10}
                                        bgColor={colors.green[500]}
                                        onPress={() => setQntity(qntity - 1)}
                                        disabled={qntity === 1}>
                                        <Text color={'white'} fontSize={24}>
                                            -
                                        </Text>
                                    </Button>
                                    <Text
                                        textAlign={'center'}
                                        w={'32px'}
                                        fontWeight={600}
                                        fontSize={'20px'}>
                                        {qntity}
                                    </Text>
                                    <Button
                                        size={10}
                                        borderRadius={100}
                                        bgColor={colors.green[500]}
                                        onPress={() => setQntity(qntity + 1)}>
                                        <Text color={'white'} fontSize={20}>
                                            +
                                        </Text>
                                    </Button>
                                </Button.Group>
                            </View>
                        </View>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant={'ghost'} onPress={() => setIsOpen(false)}>
                                Cancelar
                            </Button>
                            <Button bgColor={colors.green[500]} onPress={handleSendSuplement}>
                                Enviar
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};
