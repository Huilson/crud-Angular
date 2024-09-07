import { Conteudo } from "./conteudo";

export interface ConteudoPage {
    conteudo: Conteudo[];    
    totalElements: number;
    totalPages: number;
}
