import { useCallback, useState } from 'react';
import {
    CardIngredientCheckbox,
    CardIngredientContainer,
    CardIngredientInfoWrapper,
    CardIngredientQuantity,
    CardIngredientText,
} from './styles';

interface CardIngredientItemProps {
    quantity: number;
    ingredient: string;
}

export function CardIngredientItem({
    ingredient = 'Ingrediente',
    quantity = 0,
}: CardIngredientItemProps) {
    const [checkboxMarked, setCheckboxMarked] = useState(false);

    const handleCheckboxPress = useCallback((checked: boolean) => {
        setCheckboxMarked(checked);
    }, []);

    return (
        <CardIngredientContainer>
            <CardIngredientInfoWrapper>
                <CardIngredientQuantity>{quantity}</CardIngredientQuantity>
                <CardIngredientText>{ingredient}</CardIngredientText>
            </CardIngredientInfoWrapper>
            <CardIngredientCheckbox isChecked={checkboxMarked} onPress={handleCheckboxPress} />
        </CardIngredientContainer>
    );
}
