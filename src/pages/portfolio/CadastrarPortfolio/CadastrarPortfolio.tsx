import React from "react";

import * as Yup from 'yup';
// import { Field, ErrorMessage } from 'formik';
import Input from '../../../components/forms/input';

//import styles from './CadastrarPortfolio.module.css';
import { Portfolio, createOrUpdatePortfolio } from "../../../services/portfolioService";
import { useLocation, useNavigate } from "react-router-dom";

import Form from '../../../components/forms/form';
import Button from "../../../components/comoon/button";
import Title from "../../../components/comoon/title";

const CadastrarPortfolio = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const portfolio = location.state as Portfolio;

    const initialValues: Portfolio = {
        id: 0,
        link: '',
        image: '',
        title: ''
    };
    
    const validationSchema = Yup.object().shape({
        link: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        title: Yup.string().required("Campo obrigatório"),
    });

    const onSubmit = async (values: Portfolio, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdatePortfolio(values);
            console.log(values);
            resetForm();
            navigate("/portfolio/lista");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar o formulário");
        }
        
    };

    return (            
            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                <>
                    {
                        !portfolio ?
                            <Title>Cadastro de Portfólio</Title>
                            :
                            <Title>Atualização de Portfólio</Title>
                    }

                    <Input
                        label='Link'
                        name='link'
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Input
                        label='Imagem'
                        name='image'
                        errors={errors.image}
                        touched={touched.image}
                    />

                    <Input
                        label='Title'
                        name='title'
                        errors={errors.title}
                        touched={touched.title}
                    />

                    <Button type='submit'>Salvar</Button>
            </>
            )}
            </Form>
    );
};


export default CadastrarPortfolio;