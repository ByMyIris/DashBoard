import React, { useEffect } from "react";

import styles from './ListaExperiencia.module.css';
import { Experiencia, deleteExperiencia, getExperiencia } from "../../../services/experienciaService";
import { useNavigate } from "react-router-dom";

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
        navigate('/curriculo/experiencia/cadastro', { state: experiencia });
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteExperiencia(id);
            fetchExperiencias();
            alert('Experiência excluída com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir experiência', error);
            alert('Ocorreu um erro ao excluir a experiência');
        }
    };

    return (
    <>
    <h2 className={styles.title}>Lista de Experiências</h2>

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Ano Início</th>
                    <th>Ano Fim</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {experiencias.map((experiencia, index) => (
                    <tr key={index}>
                        <td>{experiencia.titulo}</td>
                        <td>{experiencia.descricao}</td>
                        <td>{experiencia.tipo}</td>
                        <td>{experiencia.dataInicio}</td>
                        <td>{experiencia.dataFim}</td>
                        <td>
                            <button onClick={() => handleEdit(experiencia)}>Editar</button>
                            <button onClick={() => handleDelete(experiencia.id)}>Excluir</button>
                        </td>
                    </tr>
                
                
                
                ))}
            </tbody>


        </table>

        </>
    )
}

export default ListaExperiencia;