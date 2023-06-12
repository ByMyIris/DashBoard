import React, { useEffect, useState } from "react";

import styles from './Home.module.css';

import Title from '../../components/comoon/title';
import InfoBox from '../../components/comoon/infoBox';

import { Portfolio, getPortfolio } from '../../services/portfolioService';
import { Experiencia, getExperienciaByTipo } from '../../services/experienciaService';

const Home = () => {
    const [experienciasAcademicas, setExperienciasAcademicas] = useState<Experiencia[]>([]);
    const [experienciasProfissional, setExperienciasProfissional] = useState<Experiencia[]>([]);
    const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

    const fetchExperienciasAcademicas = async () => {
        try {
            const response = await getExperienciaByTipo('academico');
            setExperienciasAcademicas(response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExperienciasProfissional = async () => {
        try {
            const response = await getExperienciaByTipo('profissional');
            setExperienciasProfissional(response);
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
        fetchExperienciasProfissional();
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
                />

                <InfoBox 
                    title='Experiencias Profissional'
                    value={experienciasProfissional.length}
                />

                <InfoBox 
                    title='Projetos no Portfólio'
                    value={portfolio.length}
                />
            </div>
        </main>
   );
};

export default Home;
