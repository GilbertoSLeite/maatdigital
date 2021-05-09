import DataStatus from "../../dataStatus/dataStatus";
import InsertGraduationDiagramming from "./insertGraudationDiagramming";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertDiagramming(
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisDiagramming,
    graduacaoDiagramming,
    numCPF,
    sexoDiagramming,
    racaDiagramming,
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
            "pais_diagramador_id": paisDiagramming,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoDiagramming,
            "raca_pessoas": racaDiagramming,
            "status": Boolean(true),
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/diagramadores', requestOptions);
        const result = await response.json();
        if(result.status){
            for(let index = 0; index < graduacaoDiagramming.length;  index++){
                const idGraduacao = graduacaoDiagramming[index].id;
                const graduacao = await InsertGraduationDiagramming(result.identificador_diagramador, idGraduacao) 
                graduacao ? console.log('For Index: ' + index)  : (index = graduacaoDiagramming.length)
            }
            situacao = Boolean(true)
        }else {
            console.log(result);
            const errorPost = DataStatus(result);
            console.error(errorPost.getErrorMessage())
            situacao = errorPost.getStatus()
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertDiagramming ' + error);
    };
    return situacao
};