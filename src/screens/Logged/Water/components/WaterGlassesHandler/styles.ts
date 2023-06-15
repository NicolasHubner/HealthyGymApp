import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
`;

export const PageTitle = styled.Text`
    ${baseRegularText}
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[700]};
`;

export const WaterInfoContainer = styled.View`
    margin: 8px 0 0;
`;

export const WaterInfoText = styled.Text`
    ${baseMediumText}
    font-size: ${24}px;
    align-items: center;
    justify-content: center;
`;

export const WaterInfoCount = styled(WaterInfoText)`
    color: ${({ theme }) => theme.colors.green[500]};
    margin-right: 8px;
`;

export const PageSubtitle = styled.Text`
    ${baseRegularText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};

    margin: 12px 0 100px;
`;

export const WaterMarkContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};

    width: 80px;
    height: 80px;

    align-items: center;
    justify-content: center;

    border-radius: 100%;
    z-index: 2;

    margin-bottom: 12px;

    position: absolute;
    bottom: 100%;
    right: -32px;
`;

export const WaterMarkPointer = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};

    width: 10px;
    height: 10px;

    position: absolute;
    bottom: -4px;
    transform: rotate(45deg);
`;

export const WaterMarkText = styled.Text`
    ${baseRegularText}
    font-size: ${22}px;
    color: ${({ theme }) => theme.colors.white};
`;

export const WaterIndicatorContainer = styled.View`
    width: 100%;
    padding: 0 32px;
`;

export const WaterIndicator = styled.View`
    width: 100%;
    height: 56px;

    background-color: #5dd3e2;

    border-radius: 100%;
    padding: 4px;

    transition: all 400ms ease;
`;

export const WaterIndicatorFill = styled(Animated.View)`
    width: 0;
    height: 100%;

    background-color: #7fe3f0;

    border-radius: 100%;

    transition: all 400ms ease;
    position: relative;
`;

export const RulerWrapper = styled.View`
    width: 100%;
`;

export const RulerContainer = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    margin: 8px 0 0;
`;

export const RulerTextContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    margin-top: 16px;
`;

interface RulerTextProps {
    selected?: boolean;
}

export const RulerText = styled.Text<RulerTextProps>`
    font-weight: ${({ selected }) => (selected ? baseBoldText : baseRegularText)};
    font-size: ${12}px;
`;

interface RulerIndicatorProps {
    bigger?: boolean;
    withoutMargin?: boolean;
}

export const RulerIndicador = styled.View<RulerIndicatorProps>`
    width: 1px;
    height: ${({ bigger }) => (bigger ? '16px' : '8px')};

    background-color: ${({ theme }) => theme.colors.black};
    margin-right: ${({ withoutMargin }) => (withoutMargin ? 0 : '6px')};
`;

export const ControlWaterGlassesContainer = styled.View`
    width: 100%;
    align-items: center;

    margin: auto 0 0;
    padding: 25px 0 56px;

    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
`;

export const WaterGlassesRow = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const WaterGlassImage = styled.Image``;

export const WaterGlassesTitle = styled.Text`
    ${baseMediumText}
    margin: 0 0 38px;
    letter-spacing: 0.2px;
`;

export const ControlButtonsContainer = styled.View``;

interface ButtonContainerProps {
    isDisabled?: boolean;
}

export const ButtonContainer = styled.View<ButtonContainerProps>`
    background-color: ${({ theme, isDisabled }) =>
        isDisabled ? theme.colors.gray[300] : theme.colors.green[700]};

    width: 40px;
    height: 40px;

    align-items: center;
    justify-content: center;

    top: 28px;

    border-radius: 12px;

    transition: all 400ms ease;
`;

export const DecreaseIcon = styled(Entypo).attrs(({ theme }) => ({
    name: 'minus',
    size: 24,
    color: theme.colors.white,
}))``;

export const IncreaseIcon = styled(Entypo).attrs(({ theme }) => ({
    name: 'plus',
    size: 24,
    color: theme.colors.white,
}))``;

export const AddWaterGlassButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 56px;

    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.green[700]};
`;

export const WaterIcon = styled(Ionicons).attrs(({ theme }) => ({
    name: 'water-outline',
    size: 24,
    color: theme.colors.white,
}))`
    margin-right: 16px;
`;

export const WaterGlassButtonText = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
`;
