import DataStatus from "../../dataStatus/dataStatus";
import InsertGraduationAuthor from "./insertGraudationAuthor";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
let index = 0;
export default async function InsertAuthor(
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisAutor,
    graduacaoAutor,
    numCPF,
    sexoAutor,
    racaAutor,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "data_cadastro": dataCadastro,
            "primeiro_nome_pessoa": firstName,
            "segundo_nome_pessoa": middleName,
            "ultimo_nome_pessoa": lastName,
            "pais_autor_id": paisAutor,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoAutor,
            "raca_pessoas": racaAutor,
            "status": Boolean(true),
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/autores', requestOptions);
        const result = await response.json();
        if(result.status){
            do {
                const idGraduacao = graduacaoAutor[index].id;
                const graduacao = await InsertGraduationAuthor(result.identificador_autor, idGraduacao) 
                graduacao ? (index = index + 1) : (index = graduacaoAutor.length)
                console.log('Index: ' + index)            
            } while (index < graduacaoAutor.length);
            situacao = Boolean(true)
        }else {
            console.log(result);
            const errorData = DataStatus(result);
            console.error(errorData.getErrorMessage())
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertAuthor: ' + error);
    };
    return situacao
};