export interface ClienteDTO{
    id: string;
    nome : string;
    email : string;
    imageUrl? : string;

    //imageUrl? : string; É opcicional quando coloca "?" no atributo.
}