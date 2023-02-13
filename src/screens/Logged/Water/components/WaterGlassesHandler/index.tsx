import { TouchableOpacity } from 'react-native-gesture-handler';

import waterGlassImg from '@/assets/water_glass_image.png';

import {
    AddWaterGlassButton,
    ButtonContainer,
    ControlWaterGlassesContainer,
    DecreaseIcon,
    IncreaseIcon,
    WaterGlassButtonText,
    WaterGlassesRow,
    WaterGlassesTitle,
    WaterGlassImage,
    WaterIcon,
} from './styles';

interface WaterGlassesHandlerProps {
    handleDecreaseWaterGlasses: () => void;
    handleIncreaseWaterGlasses: () => void;
    handleAddWaterGlasses: () => void;
    waterGlassesToAdd: number;
}

export function WaterGlassesHandler({
    handleDecreaseWaterGlasses,
    handleIncreaseWaterGlasses,
    handleAddWaterGlasses,
    waterGlassesToAdd,
}: WaterGlassesHandlerProps) {
    return (
        <ControlWaterGlassesContainer>
            <WaterGlassesRow>
                <TouchableOpacity
                    onPress={handleDecreaseWaterGlasses}
                    disabled={waterGlassesToAdd === 1}>
                    <ButtonContainer isDisabled={waterGlassesToAdd === 1}>
                        <DecreaseIcon />
                    </ButtonContainer>
                </TouchableOpacity>

                <WaterGlassImage source={waterGlassImg} />

                <TouchableOpacity
                    onPress={handleIncreaseWaterGlasses}
                    disabled={waterGlassesToAdd >= 20}>
                    <ButtonContainer isDisabled={waterGlassesToAdd >= 20}>
                        <IncreaseIcon />
                    </ButtonContainer>
                </TouchableOpacity>
            </WaterGlassesRow>

            <WaterGlassesTitle>
                {waterGlassesToAdd} {waterGlassesToAdd > 1 ? 'copos' : 'copo'} 200ml
            </WaterGlassesTitle>

            <TouchableOpacity onPress={handleAddWaterGlasses}>
                <AddWaterGlassButton>
                    <WaterIcon />
                    <WaterGlassButtonText>
                        Adicionar {waterGlassesToAdd > 1 ? 'copos' : 'copo'}
                    </WaterGlassButtonText>
                </AddWaterGlassButton>
            </TouchableOpacity>
        </ControlWaterGlassesContainer>
    );
}
