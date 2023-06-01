import React, { useEffect } from "react";


import { Experiencia, deleteExperiencia, getExperiencia } from "../../../services/experienciaService";
import { useNavigate } from "react-router-dom";

import { Table, Column } from '../../../components/comoon/table';

const ListaExperiencia: React.FC = () => {

    const navigate = useNavigate();

    const [experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencia();
            setExperiencias(experiencias);
        } catch (error) {
            console.log("Erro ao buscar experiencias", error);
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);

    const handleEdit = (experiencia: Experiencia) => {
        navigate('/curriculo/experiencias/cadastro', { state: experiencia });
    };

    const handleDelete = async (experiencia: Experiencia) => {
        try {
            await deleteExperiencia(experiencia.id);
            fetchExperiencias();
            alert('Experiência excluída com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir experiência', error);
            alert('Ocorreu um erro ao excluir a experiência');
        }
    };

    const columns: Column<Experiencia>[] = [
        { header: 'Título', accessor: 'titulo' },
        { header: 'Descrição', accessor: 'descricao' },
        { header: 'Tipo', accessor: 'tipo' },
        { header: 'Data de Início', accessor: 'dataInicio' },
        { header: 'Data de Fim', accessor: 'dataFim' },
    ]

    return (
    <Table 
    columns={columns}
    data={experiencias}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
    );
};

export default ListaExperiencia;