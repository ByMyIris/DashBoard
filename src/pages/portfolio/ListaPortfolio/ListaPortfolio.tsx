import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, Column } from '../../../components/comoon/table/table';

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

    const handleDelete = async (portfolio: Portfolio) => {
        try {
            await deletePortfolio(portfolio.id);
            fetchPortfolios();
            alert('Portfólio excluído com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir o portfólio', error);
            alert('Ocorreu um erro ao excluir o portfólio');
        }
    };

    const columns: Column<Portfolio>[] = [
        { header: 'Titulo', accessor: 'title' },
        { header: 'Imagem', accessor: 'image' },
        { header: 'Link', accessor: 'link' },
    ];

    return (
        <Table 
        columns={columns}
        data={portfolios}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    );
};


export default ListaPortfolio;