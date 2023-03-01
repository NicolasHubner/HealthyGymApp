import { PickImageProps } from '..';
import { pickImage, TumbleType } from '../helpers/pickImage';
import { ImageTumble, Tumble, ViewTumble } from './style';

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
            {pickedImagePath.perfil && (
                <Tumble onPress={() => handleTumble({ type: TumbleType.perfil })}>
                    <ImageTumble source={{ uri: pickedImagePath.perfil }} />
                </Tumble>
            )}
            {pickedImagePath.frente && (
                <Tumble onPress={() => handleTumble({ type: TumbleType.frent })}>
                    <ImageTumble source={{ uri: pickedImagePath.frente }} />
                </Tumble>
            )}
            {pickedImagePath.costas && (
                <Tumble onPress={() => handleTumble({ type: TumbleType.background })}>
                    <ImageTumble source={{ uri: pickedImagePath.costas }} />
                </Tumble>
            )}
        </ViewTumble>
    );
}
