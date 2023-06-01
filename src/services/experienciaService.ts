import api from './api';

export interface Experiencia {
    id?: number,
    titulo: string;
    descricao: string;
    tipo: string;
    dataInicio: number | "";
    dataFim: number | "";
}

export const createExperiencia = async (experiencia: Experiencia): Promise<Experiencia> => {
    const response = await api.post<Experiencia>('/experiencia', experiencia);
    return response.data;
}

export const getExperiencia = async (): Promise<Experiencia[]> => {
    const response = await api.get<Experiencia[]>('/experiencia');
    return response.data;
}

export const getExperienciaById = async (id: number): Promise<Experiencia> => {
    const response = await api.get<Experiencia>(`/experiencia/${id}`);
    return response.data;
}

export const getExperienciaByTipo = async (tipo: string): Promise<Experiencia[]> => {
    const response = await api.get<Experiencia[]>(`/experiencia?tipo=${tipo}`);
    return response.data;
}

export const updateExperiencia = async (experiencia: Experiencia): Promise<Experiencia> => {
    const response = await api.put(`/experiencia/${experiencia.id}`, experiencia);
    return response.data;
}

export const deleteExperiencia = async (id: number | undefined): Promise<Experiencia> => {
    const response = await api.delete<Experiencia>(`/experiencia/${id}`);
    return response.data;
}

export const createOrUpdateExperiencia = async (experiencia: Experiencia): Promise<Experiencia> => {
    if (!experiencia.id) {
        return await createExperiencia(experiencia);
    } else {
        return await updateExperiencia(experiencia);
    }
}
