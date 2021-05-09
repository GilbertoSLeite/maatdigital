import DataStatus from "../../dataStatus/dataStatus";
import InsertGraduationOrganizer from "./insertGraudationOrganizer";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertOrganizer(
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisOrganizer,
    graduacaoOrganizer,
    numCPF,
    sexoOrganizer,
    racaOrganizer,
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
            "pais_organizador_id": paisOrganizer,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoOrganizer,
            "raca_pessoas": racaOrganizer,
            "status": Boolean(true),
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/organizadores', requestOptions);
        const result = await response.json();
        if(result.status){
            for(let index = 0; index < graduacaoOrganizer.length;  index++){
                const idGraduacao = graduacaoOrganizer[index].id;
                const graduacao = await InsertGraduationOrganizer(result.identificador_organizador, idGraduacao) 
                graduacao ? console.log('Index: ' + index)  : (index = graduacaoOrganizer.length)
            }
            situacao = Boolean(true)
        }else {
            console.log(result);
            const errorData = DataStatus(result);
            console.error(errorData.getErrorMessage())
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertOrganizer: ' + error);
    };
    return situacao
};