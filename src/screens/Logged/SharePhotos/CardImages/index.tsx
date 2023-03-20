import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IImage } from '..';
import { Card, CardImage, ContainerImages } from './style';

const CardImages = ({ images }: { images: IImage[] }) => {
    return (
        <ContainerImages>
            <Card />
            {images.map((image, index) => (
                <Fragment key={index}>
                    <TouchableOpacity>
                        <Card>
                            <CardImage source={image} />
                        </Card>
                    </TouchableOpacity>
                </Fragment>
            ))}
        </ContainerImages>
    );
};

export default CardImages;
