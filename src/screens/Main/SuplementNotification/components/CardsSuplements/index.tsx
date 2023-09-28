import { View, Image, Text, Pressable, Modal } from 'native-base';
import { useState } from 'react';
import { ModalAccepted } from '../ModalAccepted';

export const CardsSuplements = ({
    name,
    durations_days,
    quantity,
    image,
    status,
    id,
}: {
    name: string;
    durations_days: number;
    quantity: number;
    image: string;
    id: number;
    status: string;
}) => {
    const [modal, setModal] = useState(false);

    const handleColor = () => {
        switch (status) {
            case 'Enviado':
                return '#FFB703';
            case 'Comprado':
                return '#51B655';
            case 'Recusado':
                return '#FF0000';
            default:
                return '#000000';
        }
    };

    return (
        <>
            <Pressable
                flexDir={'row'}
                onPress={() => status === 'Enviado' && setModal(true)}
                my={2}
                alignItems={'center'}
                bgColor={'#FFFFFF'}
                shadow={2}
                borderRadius={12}
                minH={128}
                mx={1}>
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
                        fontSize={20}
                        color={'#000000'}
                        textAlign={'left'}
                        w={'90%'}
                        lineHeight={20}
                        mt={2}
                        flexGrow={0.3}
                        flexWrap={'wrap'}
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
                        Duração p/ unidade: {durations_days} {durations_days > 1 ? 'dias' : 'dia'}
                    </Text>

                    <Text
                        fontSize={12}
                        color={'#000000'}
                        textAlign={'left'}
                        w={'100%'}
                        mt={0}
                        pl={4}>
                        Quantidade: {quantity}
                    </Text>
                    <Text
                        fontSize={14}
                        color={handleColor()}
                        textAlign={'left'}
                        w={'100%'}
                        fontFamily={'Rubik_500Medium'}
                        mt={2}
                        pl={4}>
                        Status: {'  '} {status}
                    </Text>
                </View>
            </Pressable>

            <Modal isOpen={modal} onClose={() => setModal(false)}>
                <ModalAccepted
                    image={image}
                    name={name}
                    durations_days={durations_days}
                    qntity={quantity}
                    id={id}
                />
            </Modal>
        </>
    );
};
