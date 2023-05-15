import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { EvolutionPhotoHistory } from '@/types/evolution/Evolution';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button, ButtonText, Container, Content, Property, Title, Wrapper } from './styles';

interface CompareInfoSectionProps {
    registersIndexToCompare: {
        antes?: number;
        depois?: number;
    };
    evolutionPhotoHistory?: EvolutionPhotoHistory[];
}

export function CompareInfoSection({
    registersIndexToCompare,
    evolutionPhotoHistory,
}: CompareInfoSectionProps) {
    const beforeDate =
        evolutionPhotoHistory?.[registersIndexToCompare?.antes!]?.attributes?.createdAt;
    const afterDate =
        evolutionPhotoHistory?.[registersIndexToCompare?.depois!]?.attributes?.createdAt;

    const { navigate } = useNavigation<FineShapeScreenNavigation>();
    const formatDate = useCallback((value = '') => {
        if (!value) return format(new Date(), 'dd/MM/yyyy');

        return format(new Date(value), 'dd/MM/yyyy');
    }, []);

    const handleNavigateToCompareScreen = useCallback(() => {
        navigate(RouteNames.logged.evolutionPhotos.compare, {
            evolutionPhotoBefore: evolutionPhotoHistory?.[registersIndexToCompare?.antes!],
            evolutionPhotoAfter: evolutionPhotoHistory?.[registersIndexToCompare?.depois!],
        });
    }, [evolutionPhotoHistory, navigate, registersIndexToCompare]);

    return (
        <Container>
            <Title>Comparação</Title>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <Wrapper>
                    <Content>
                        <Property>Antes:</Property>
                        <Text>
                            {beforeDate !== undefined || !!beforeDate
                                ? formatDate(beforeDate ?? '')
                                : 'Selecione o antes'}
                        </Text>
                    </Content>
                    <Content>
                        <Property>Depois:</Property>
                        <Text>
                            {afterDate !== undefined || !!afterDate
                                ? formatDate(afterDate ?? '')
                                : 'Selecione o depois'}
                        </Text>
                    </Content>
                </Wrapper>
                {registersIndexToCompare?.antes !== undefined &&
                    registersIndexToCompare?.depois !== undefined && (
                        <View style={{ flexGrow: 1 }}>
                            <Pressable onPress={() => handleNavigateToCompareScreen()}>
                                <Button>
                                    <ButtonText>Comparar</ButtonText>
                                </Button>
                            </Pressable>
                        </View>
                    )}
            </View>
        </Container>
    );
}
