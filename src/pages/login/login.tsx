import React from "react";

import styles from './login.module.css';

import Input from '../../components/forms/input';

import * as Yup from 'yup';
// import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import { useAuth } from '../../contexts/AuthContext';

import Form from '../../components/forms/form';
import Button from "../../components/comoon/button";
import Title from "../../components/comoon/title";

interface LoginValues {
    email: string,
    password: string,
}

const initialValues: LoginValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required("Email é obrigatório"),
    password: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required("Senha é obrigatória"),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (values: LoginValues) => {
        try {
            const user = await loginService(values.email, values.password);
            login(user);
            navigate('/');
            console.log(values);
        } catch (error) {
            console.log(error);
            alert('Erro ao realizar o login');
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <Form
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title>MEU SITE PESSOAL</Title>

                        <Input 
                            label="Email"
                            name="email"
                            type="email"
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Input 
                            label="Password"
                            name="password"
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />

                        <Button type='submit'>Entrar</Button>
                    </>
                )}
            </Form>
        </div>
    )
};

export default Login;
