import UpdateGraduationCoordinator from "./updateGraudationCoordinator";
import DeleteGraduationCoordinator from "./deleteGraduationCoordinator";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);

export default async function UpdateCoordinator(
    identificador,
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisCoordinator,
    graduacaoCoordinator,
    numCPF,
    sexoCoordinator,
    racaCoordinator,
    statusCoordinator,
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
            "status":statusCoordinator,
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/coordenadores/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            if(graduacaoCoordinator.length > 0){
            const isDelete = await DeleteGraduationCoordinator(identificador);
            if(isDelete){
                for(let index = 0; index < graduacaoCoordinator.length; index++){
                    const idGraduacao = graduacaoCoordinator[index].id;
                    const graduacao = await UpdateGraduationCoordinator(identificador, idGraduacao) 
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
        console.error('Ocorreu um erro em UpdateCoordinator: ' + error);
    };
    return situacao
};