import { Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';

import { FineShapeScreens } from '@/screens';

import { Container, Input, Title } from './styles';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { useCallback, useEffect, useState } from 'react';
import { Progress } from './components/ProgressBar';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFineshapInfo } from '@/store/fineshape';
import { RootState } from '@/store';

export interface FineShapePageProps {
    title: string;
    placeholder: string;
    step: number;
}

export function FineShapeBaseQuestionary() {
    const [currentStep, setCurrentStep] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [finished, setFinished] = useState(false);

    const dispatch = useDispatch();
    const { id } = useSelector((state: RootState) => state.user);
    const fineShapeStore = useSelector((state: RootState) => state.fineshape);

    const maxSteps = FineShapeScreens?.length - 1 ?? 1;

    const handleNavigateToNextStep = useCallback(() => {
        if (inputValue === '' || inputValue.length <= 0 || finished) return;

        dispatch(setFineshapInfo({ [FineShapeScreens[currentStep].id]: inputValue }));

        if (currentStep >= maxSteps) {
            setFinished(true);
        } else {
            setCurrentStep(current => (current === maxSteps ? current : current + 1));
            setInputValue('');
        }
    }, [maxSteps, dispatch, currentStep, inputValue, finished]);

    const handleNavigateToPrevStep = useCallback(() => {
        setCurrentStep(current => (current <= 1 ? 1 : current - 1));
    }, []);

    useEffect(() => {
        if (typeof fineShapeStore[`${FineShapeScreens[currentStep].id}`] !== 'undefined') {
            setInputValue(String(fineShapeStore[`${FineShapeScreens[currentStep].id}`]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    useEffect(() => {
        dispatch(setFineshapInfo({ userId: id! }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageWrapper>
            <Container>
                {currentStep > 1 && !finished && (
                    <View style={{ position: 'absolute', top: 24, left: 4 }}>
                        <HeaderGoBackButton
                            canGoBack={currentStep > 1}
                            onPress={handleNavigateToPrevStep}
                        />
                    </View>
                )}

                {finished ? (
                    <View>
                        <Text>Parabéns!</Text>
                    </View>
                ) : (
                    <>
                        <Progress currentStep={currentStep} maxSteps={maxSteps} />

                        <View style={{ marginTop: 'auto' }}>
                            <Title>{FineShapeScreens[currentStep].title}</Title>
                        </View>

                        <View style={{ marginTop: 'auto' }}>
                            <Input
                                placeholder={FineShapeScreens[currentStep].placeholder}
                                keyboardType={FineShapeScreens[currentStep].keyboardType}
                                onChangeText={text => setInputValue(text)}
                                value={inputValue}
                            />
                        </View>

                        <View style={{ marginTop: 'auto' }}>
                            <Button
                                label={FineShapeScreens[currentStep].buttonText}
                                fullWidth
                                onPress={handleNavigateToNextStep}
                                isDisabled={inputValue === '' || inputValue.length < 0}
                            />
                        </View>
                    </>
                )}
            </Container>
        </PageWrapper>
    );
}
