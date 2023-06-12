import api from './api';

export interface Portfolio {
    id: number,
    link: string;
    image: string;
    title: string;
}

export const createPortfolio = async (portfolio: Portfolio): Promise<Portfolio> => {
    const response = await api.post<Portfolio>('/portfolio', portfolio);
    return response.data;
}

export const getPortfolio = async (): Promise<Portfolio[]> => {
    const response = await api.get<Portfolio[]>('/portfolio');
    return response.data;
}

export const deletePortfolio = async (id: number | undefined): Promise<Portfolio> => {
    const response = await api.delete<Portfolio>(`/portfolio/${id}`);
    return response.data;
}

export const updatePortfolio = async (portfolio: Portfolio): Promise<Portfolio> => {
    const response = await api.put(`/portfolio/${portfolio.id}`, portfolio);
    return response.data;
}

export const getProjeto = async (id: number): Promise<Portfolio> => {
    const response = await api.get<Portfolio>(`/portfolio/${id}`);
    return response.data;
}

export const createOrUpdatePortfolio = async (portfolio: Portfolio): Promise<Portfolio> => {
    if (!portfolio.id) {
        return await createPortfolio(portfolio);
    } else {
        return await updatePortfolio(portfolio);
    }
}
