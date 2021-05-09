import UpdateGraduationDiagramming from "./updateGraudationDiagramming";
import DeleteGraduationDiagramming from "./deleteGraduationDiagramming";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);

export default async function UpdateDiagramming(
    identificador,
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisDiagramming,
    graduacaoDiagramming,
    numCPF,
    sexoDiagramming,
    racaDiagramming,
    statusDiagramming,
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
            "status":statusDiagramming,
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/diagramadores/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            if(graduacaoDiagramming.length > 0){
            const isDelete = await DeleteGraduationDiagramming(identificador);
                if(isDelete){
                    for(let index = 0; index < graduacaoDiagramming.length; index++){
                        const idGraduacao = graduacaoDiagramming[index].id;
                        const graduacao = await UpdateGraduationDiagramming(identificador, idGraduacao) 
                        graduacao ? situacao =  Boolean(true) : situacao = Boolean(false)
                    }
                }
            } else {
                situacao = Boolean(true)
            }                  
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em UpdateDiagramming: ' + error);
    };
    return situacao
};