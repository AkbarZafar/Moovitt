import { Auth, Hub } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { IShowAuthPage, AuthPage } from './util'


export const Login: React.FC<IShowAuthPage> = ({ showPage }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        Hub.listen('auth', (data) => {
            const { payload } = data;
        })
    })

    return (
        <SafeAreaView>
            <TextInput style={styles.input} textContentType='emailAddress' onChangeText={setEmail} value={email} placeholder="Email" />
            <TextInput style={styles.input} textContentType='password' passwordRules='minlength:8' secureTextEntry onChangeText={setPassword} value={password} placeholder="Password" />
            <Button
                title="Sign in"
                onPress={() => Auth.signIn(email, password)}
            />
            <Button
                title="Sign in with Google"
                onPress={() => Auth.federatedSignIn({ provider: 'Google' as any })}
            />
            <Button
                title="Sign up"
                onPress={() => showPage(AuthPage.SignUp)}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});



