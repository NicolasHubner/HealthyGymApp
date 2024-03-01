import { Pressable, Image, View, Text } from 'native-base';

export interface ICardsStudents {
    nameStudent: string;
    imageStudent: string | null;
    emailStudent: string;
    goalStudent: string;
    id: number;
}

export interface RenderCardStudentsProps extends ICardsStudents {
    handlePressModal: (data: ICardsStudents) => void;
}

export const RenderCardStudents = ({
    nameStudent,
    imageStudent,
    emailStudent,
    goalStudent,
    id,
    handlePressModal,
}: RenderCardStudentsProps) => {
    return (
        <>
            <Pressable
                w={'100%'}
                backgroundColor={'white'}
                borderRadius={16}
                key={id + nameStudent}
                mt={2}
                mb={2}
                p={2}
                onPress={() =>
                    handlePressModal({
                        nameStudent,
                        imageStudent,
                        emailStudent,
                        goalStudent,
                        id,
                    })
                }
                flexDirection={'row'}>
                <Image
                    source={imageStudent ? { uri: imageStudent } : require('@/assets/no-user.jpg')}
                    alt="Alternate Text"
                    size={'72px'}
                    resizeMode="cover"
                    borderRadius={16}
                />

                <View ml={2} flexDir={'column'} justifyContent={'space-evenly'} h={'72px'}>
                    <Text
                        fontFamily={'Rubik_500Medium'}
                        mt={2}
                        fontSize={16}
                        lineHeight={16}
                        letterSpacing={1}>
                        {nameStudent}
                    </Text>
                    <Text
                        fontSize={12}
                        mt={2}
                        lineHeight={14}
                        letterSpacing={1}
                        alignItems={'center'}>
                        <Text
                            fontFamily={'Rubik_500Medium'}
                            mt={2}
                            fontSize={14}
                            lineHeight={14}
                            letterSpacing={1}>
                            Objetivo:{' '}
                        </Text>
                        {goalStudent.toLocaleUpperCase()}
                    </Text>
                    <Text fontSize={12} fontWeight={400} mt={2} lineHeight={12} letterSpacing={1}>
                        {emailStudent}
                    </Text>
                </View>
            </Pressable>
        </>
    );
};
