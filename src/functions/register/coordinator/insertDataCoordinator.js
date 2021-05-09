import DataStatus from "../../dataStatus/dataStatus";
import InsertGraduationCoordinator from "./insertGraudationCoordinator";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertCoordinator(
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisCoordinator,
    graduacaoCoordinator,
    numCPF,
    sexoCoordinator,
    racaCoordinator,
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
            "pais_coordenador_id": paisCoordinator,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoCoordinator,
            "raca_pessoas": racaCoordinator,
            "status": Boolean(true),
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/coordenadores', requestOptions);
        const result = await response.json();
        if(result.status){
            for(let index = 0; index < graduacaoCoordinator.length;  index++){
                const idGraduacao = graduacaoCoordinator[index].id;
                const graduacao = await InsertGraduationCoordinator(result.identificador_coordenador, idGraduacao) 
                !graduacao && (index = graduacaoCoordinator.length)
            }
            situacao = Boolean(true)
        }else {
            console.log(result);
            const errorPost = DataStatus(result);
            console.error(errorPost.getErrorMessage())
            situacao = errorPost.getStatus()
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertCoordinator ' + error);
    };
    return situacao
};