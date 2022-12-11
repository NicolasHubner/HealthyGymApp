import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Onboard = () => {
    return <>
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo_footer_1.png')}></Image>
            <Text>Nós somos a</Text>
            <Text>Cross Life workout</Text>
            <Text>Aqui sua o seu desenvolvimento</Text>
            <Text>está em primeiro lugar</Text>
            <Image style={styles.img1} source={require('../../assets/onboard_img_1.png')}></Image>
            <TouchableOpacity>
                <Text>Vamos Começar</Text>
            </TouchableOpacity>
            <Text>Já tem uma conta? Login</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        color: '#2D2D2D',
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        marginTop: 24,
        width: 110,
        height: 67
    },
    img1: {
        width: 244,
        height:240
    }
});