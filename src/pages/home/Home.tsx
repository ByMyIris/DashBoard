import React, { useEffect, useState } from "react";

import styles from './Home.module.css';

import { FaGraduationCap, FaBriefCase, FaFolder } from 'react-icons/fa';

import Title from '../../components/comoon/title';
import InfoBox from '../../components/comoon/infoBox';

import { Projeto, getPortfolio } from '../../services/portfolioService';
import { Experiencia, getExperienciasByTipo } from '../../services/experienciaService';

const Home = () => {
    const [experienciasAcademicas, setExperienciasAcademicas] = useState<Experiencia[]>([]);
    const [experienciasProfissionais, setExperienciasProfissionais] = useState<Experiencia[]>([]);
    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchExperienciasAcademicas = async () => {
        try {
            const response = await getExperienciasByTipo('academico');
            setExperienciasAcademicas(response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExperienciasProfissionais = async () => {
        try {
            const response = await getExperienciasByTipo('profissional');
            setExperienciasAcademicas(response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const response = await getPortfolio();
            setPortfolio(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchExperienciasAcademicas();
        fetchExperienciasProfissionais();
        fetchPortfolio();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao Sistema Admin do Meu Site Pessoal!</Title>
            <p>Esta é a página inicial. Navegue pelo menu na barra lateral para explorar outras ferramentas.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox 
                    title='Experiencias Acadêmicas'
                    value={experienciasAcademicas.length}
                    icon={<FaGraduationCap size={65}/>}
                />

                <InfoBox 
                    title='Experiencias Profissionais'
                    value={experienciasProfissionais.length}
                    icon={<FaBriefCase/>}
                />

                <InfoBox 
                    title='Projetos no Portfólio'
                    value={portfolio.length}
                    icon={<FaFolder/>}
                />
            </div>
        </main>
   );
};

export default Home;
