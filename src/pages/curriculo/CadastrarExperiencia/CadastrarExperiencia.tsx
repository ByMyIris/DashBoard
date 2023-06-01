import React from 'react';

import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Formik, Form } from "formik";

import Textarea from '../../../components/forms/textarea/Textarea';
import Select from '../../../components/forms/select/Select';
import Form from '../../../components/forms/form';
import Button from "../../../components/comoon/button";
import Title from "../../../components/comoon/title";
import Input from '../../../components/forms/input';

import { Experiencia, createOrUpdateExperiencia } from '../../../services/experienciaService';


const CadastrarExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const experiencia = location.state as Experiencia;

    const initialValues: Experiencia = {
        id: 0,
        titulo: '',
        descricao: '',
        tipo: '',
        dataInicio: '',
        dataFim: '',
    }

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string(),
        tipo: Yup.string().required("Campo obrigatório"),
        dataInicio: Yup.number().required("Campo obrigatório").typeError('Um número é obrigatório'),
        dataFim: Yup.number().required("Campo obrigatório").typeError('Um número é obrigatório'),
    });

    const onSubmit = async (values: Experiencia, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateExperiencia(values);
            resetForm();
            navigate("/curriculo/experiencias/listagem");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar o formulário");
        }
        
      };


    return (
            <Form
                    initialValues={experiencia || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                    {
                        !experiencia ?
                            <Title>Cadastro de Experiência</Title>
                            :
                            <Title>Atualização de Experiência</Title>
                    }
                    
                    <Input 
                        label='Título'
                        name='titulo'
                        errors={errors.titulo}
                        touched={touched.titulo}
                    />

                    <Select
                        label='Tipo de Experiência'
                        name='tipo'
                        options={[
                            { value: "profissional", label: "Profissional" },
                            { value: "academico", label: "Acadêmico" },
                        ]}
                        errors={errors.tipo}
                        touched={touched.tipo}
                    />

                    <Textarea 
                        label='Descrição'
                        name='descricao'
                        errors={errors.descricao}
                        touched={touched.descricao}
                    />
                    <Input 
                        label='Ano de Início'
                        name='dataInicio'
                        type='number'
                        errors={errors.dataInicio}
                        touched={touched.dataInicio}
                    />
                    <Input 
                        label='Ano de Fim'
                        name='dataFim'
                        type='number'
                        errors={errors.dataFim}
                        touched={touched.dataFim}
                    />

                <Button type='submit'>Salvar</Button>
                </>
                )}
            </ Form>
    );
};

export default CadastrarExperiencia;