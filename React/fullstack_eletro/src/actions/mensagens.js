import mensagens from "../reducers/mensagens";

export const inserir = (mensagem) =>{
    return {
        type: "inserir",
        payload: mensagem
    }
}