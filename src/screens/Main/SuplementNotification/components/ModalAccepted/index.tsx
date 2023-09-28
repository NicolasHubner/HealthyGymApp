import { throwSuccessToast, throwWarningToast } from '@/helpers/functions/handleToast';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { Button, Modal, Text, View, Image } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

interface IModalAccepted {
    image: string;
    name: string;
    durations_days: number;
    qntity: number;
    id: number;
}

const ModalAccepted = ({ image, name, durations_days, qntity, id }: IModalAccepted) => {
    const { colors } = useTheme();

    const { token } = useSelector((state: RootState) => state.user);

    const handleAccept = async () => {
        try {
            const headers = generateAuthHeaders(token!);
            await api.put(
                `/suplement-histories/${id}`,
                {
                    data: {
                        Status: 'Comprado',
                    },
                },
                { headers } // pass header as a separate argument
            );
            throwSuccessToast({
                title: 'Suplemento aceito com sucesso!',
                message: 'O suplemento foi adicionado ao seu histórico.',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefuse = () => {
        try {
            const headers = generateAuthHeaders(token!);

            api.put(
                `/suplement-histories/${id}`,
                {
                    data: {
                        Status: 'Recusado',
                    },
                },
                { headers } // pass header as a separate argument
            );
            throwWarningToast({
                title: 'Suplemento recusado!',
                message: 'O suplemento foi recusado e não será adicionado ao seu histórico.',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal.Content maxWidth="450px" mt={12} w={'90%'}>
            <Modal.CloseButton />
            <Modal.Header>
                <Text fontSize={16} fontFamily={'Rubik_500Medium'} color={'#000000'}>
                    Aceita essa sugestão?
                </Text>
            </Modal.Header>
            <Modal.Body>
                <View flexDir={'row'} alignItems={'center'}>
                    <Image
                        source={{
                            uri: image,
                        }}
                        alt="Alternate Text"
                        size={100}
                        resizeMode={'contain'}
                        borderRadius={10}
                    />

                    <View>
                        <Text
                            fontFamily={'Rubik_500Medium'}
                            fontSize={16}
                            color={'#000000'}
                            textAlign={'left'}
                            w={'90%'}
                            lineHeight={20}
                            mt={0}
                            flexGrow={0.6}
                            pl={4}>
                            {name}
                        </Text>

                        <Text
                            fontSize={12}
                            color={'#000000'}
                            textAlign={'left'}
                            w={'100%'}
                            mt={0}
                            pl={4}>
                            Duração p/ unidade: {durations_days}{' '}
                            {durations_days > 1 ? 'dias' : 'dia'}
                        </Text>

                        <Text
                            fontSize={12}
                            color={'#000000'}
                            textAlign={'left'}
                            w={'100%'}
                            mt={0}
                            pl={4}>
                            Quantidade: {qntity}
                        </Text>
                    </View>
                </View>
                <View flexDir={'row'} style={{ gap: 24 }} justifyContent={'center'} mt={8}>
                    <Button
                        rounded={12}
                        bgColor={colors.green[700]}
                        w={'40%'}
                        onPress={handleRefuse}>
                        <Text fontFamily={'Rubik_500Medium'} fontSize={'12px'} color={'#fff'}>
                            Recusar
                        </Text>
                    </Button>

                    <Button
                        rounded={12}
                        w={'40%'}
                        bgColor={colors.green[700]}
                        onPress={handleAccept}>
                        <Text fontFamily={'Rubik_500Medium'} fontSize={'12px'} color={'#fff'}>
                            Aceitar
                        </Text>
                    </Button>
                </View>
            </Modal.Body>
        </Modal.Content>
    );
};

const memoModalAccepted = React.memo(ModalAccepted);

export { memoModalAccepted as ModalAccepted };
