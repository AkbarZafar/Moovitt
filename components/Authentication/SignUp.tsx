import { Auth, Hub } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, TextInput, StyleSheet, Text } from "react-native";
import { AuthPage, IShowAuthPage } from "./util";

export const SignUp: React.FC<IShowAuthPage> = ({ showPage }) => {
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
                title="Sign up"
                onPress={() => Auth.signUp(email, password).then(() => showPage(AuthPage.ConfirmSignUp))}
            />

            <Button
                title="Confirm Previously sent code"
                onPress={() => showPage(AuthPage.ConfirmSignUp)}
            />

            <Button
                title="Sign in instead"
                onPress={() => showPage(AuthPage.Login)}
            />
        </SafeAreaView>

    )
}

export const ConfirmSignUp: React.FC<IShowAuthPage> = ({ showPage }) => {
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState<string>('')

    useEffect(() => {
        Hub.listen('auth', (data) => {
            const { payload } = data;
        })
    })

    return (
        <SafeAreaView>
            <TextInput style={styles.input} textContentType='emailAddress' onChangeText={setEmail} value={email} placeholder="Email" />
            <TextInput style={styles.input} textContentType='none' onChangeText={setCode} value={code} placeholder="Verification Code" />
            <Button
                title="Confirm Code"
                onPress={() => Auth.confirmSignUp(email, code)}
            />

            <Button
                title="Sign in instead"
                onPress={() => showPage(AuthPage.Login)}
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



