import { ScreenContainer } from "@/assets/components";
import { StyleSheet, Text, View } from "react-native";

export default function InfoPage() {
    return (
        <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.maincontainer}>
                <Text style={styles.title}>Sobre o Projeto</Text>
                <View style={styles.textcontainer}>
                    <Text style={{ textAlign: 'justify' }}>A Bloomy é um projeto criado em 2025.
                        O aplicativo tem o foco em auxiliar ensino de tantas crianças que não se adequam ao ensino tradicional,
                        oferecendo ferramentas que promovem o aprendizado de forma lúdica e interativa.
                        Sempre comprometidos a proporcionar experiências positivas para todos os usuários.
                    </Text>
                 </View>
                 <Text style={styles.title}>Sobre a equipe</Text>
                <View style={styles.textcontainer}>
                    <Text>
                        A equipe da Bloomy é composta por três desenvolvedores:
                        {"\n\n"}
                        <Text>
                            <Text style={{ fontWeight: '600' }}>João Pedro Bispo</Text>
                            {" "}– Desenvolvimento do Backend e integração com Firebase.
                            {"\n"}
                            {/* Espaço para link: */}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: '600' }}>Lucas Bonfim Vilela</Text>
                            {" "}– Desenvolvimento do Frontend e controle.
                            {"\n"}
                            {/* Espaço para link: */}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: '600' }}>Neluma Lopes</Text>
                            {" "}– Desenvolvimento dos jogos educacionais e documentação.
                            {"\n"}
                            {/* Espaço para link: */}
                        </Text>
                    </Text>
                 </View>  
            </View>
        </ScreenContainer>
    )
}


const styles = StyleSheet.create({
    maincontainer: {
        flex: 0.8,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
        color: '#623DB3',
        fontFamily: 'LuckiestGuy-Regular',
    },
    textcontainer: {
        width: '100%',
        maxWidth: 400,
        marginBottom: 20,
        alignItems: 'center',
    },
});
