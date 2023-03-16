import { PickImageProps } from '..';
import { pickImage, TumbleType } from '../helpers/pickImage';
import { ImageTumble, TextTumble, Tumble, ViewTumble, ViewTumbleText } from './style';
import { AntDesign } from '@expo/vector-icons';
interface ShowPhotosProps {
    setPickedImagePath: React.Dispatch<React.SetStateAction<PickImageProps>>;
    pickedImagePath: PickImageProps;
}
export default function ShowPhotos({ setPickedImagePath, pickedImagePath }: ShowPhotosProps) {
    interface handleTumbleProps {
        type: TumbleType;
    }

    const handleTumble = async ({ type }: handleTumbleProps) => {
        const photo = await pickImage();
        switch (type) {
            case TumbleType.perfil: {
                setPickedImagePath(prev => ({ ...prev, perfil: photo as string }));
                break;
            }
            case TumbleType.background: {
                setPickedImagePath(prev => ({ ...prev, costas: photo as string }));
                break;
            }
            case TumbleType.frent: {
                setPickedImagePath(prev => ({ ...prev, frente: photo as string }));
                break;
            }
        }
    };
    return (
        <ViewTumble>
            <ViewTumbleText>
                {/* <Tumble onPress={() => handleTumble({ type: TumbleType.perfil })}> */}
                <Tumble>
                    {pickedImagePath.perfil ? (
                        <ImageTumble source={{ uri: pickedImagePath.perfil }} />
                    ) : (
                        <AntDesign name="camera" size={40} color="#E0E0E0" />
                    )}
                </Tumble>
                <TextTumble>de Lado</TextTumble>
            </ViewTumbleText>

            <ViewTumbleText>
                {/* <Tumble onPress={() => handleTumble({ type: TumbleType.frent })}> */}
                <Tumble>
                    {pickedImagePath.frente ? (
                        <ImageTumble source={{ uri: pickedImagePath.frente }} />
                    ) : (
                        <AntDesign name="camera" size={40} color="#E0E0E0" />
                    )}
                </Tumble>
                <TextTumble>de Frente</TextTumble>
            </ViewTumbleText>

            <ViewTumbleText>
                {/* <Tumble onPress={() => handleTumble({ type: TumbleType.background })}> */}
                <Tumble>
                    {pickedImagePath.costas ? (
                        <ImageTumble source={{ uri: pickedImagePath.costas }} />
                    ) : (
                        <AntDesign name="camera" size={40} color="#E0E0E0" />
                    )}
                </Tumble>
                <TextTumble>de Costas</TextTumble>
                {/* )} */}
            </ViewTumbleText>
        </ViewTumble>
    );
}
