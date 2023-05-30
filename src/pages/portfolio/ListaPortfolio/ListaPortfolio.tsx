import React, { useEffect, useState } from 'react';

import styles from './ListaPortfolio.module.css';
import { useNavigate } from 'react-router-dom';
import { Portfolio, deletePortfolio, getPortfolio } from '../../../services/portfolioService';

const ListaPortfolio: React.FC = () => {

    const navigate = useNavigate();
    
    const [portfolios, setPortfolio] = React.useState<Portfolio[]>([]);

    const fetchPortfolios = async () => {
        try {
            const portfolios = await getPortfolio();
            setPortfolio(portfolios);
        } catch (error) {
            console.log("Erro ao buscar portfólio", error);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);


    const handleEdit = (portfolio: Portfolio) => {
        navigate('/portfolio/cadastro', { state: portfolio });
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePortfolio(id);
            fetchPortfolios();
            alert('Portfólio excluído com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir o portfólio', error);
            alert('Ocorreu um erro ao excluir o portfólio');
        }
    };

    return (

        <>
        <h2 className={styles.title}>Lista de Portfólio</h2>

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Link</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {portfolios.map((portfolio, index) => (
                    <tr key={index}>
                        <td>{portfolio.title}</td>
                        <td><img src={portfolio.image} alt={portfolio.title} className={styles.image} /></td>
                        <td><a href={portfolio.link} target="_blank" rel="noreferrer">{portfolio.link}</a></td>
                        <td>
                            <button onClick={() => handleEdit(portfolio)}>Editar</button>
                            <button onClick={() => handleDelete(portfolio.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};


export default ListaPortfolio;