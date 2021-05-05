import UpdateGraduationOrganizer from "./updateGraudationOrganizer";
import DeleteGraduationOrganizer from "./deleteGraduationOrganizer";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);

export default async function UpdateOrganizer(
    identificador,
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisOrganizer,
    graduacaoOrganizer,
    numCPF,
    sexoOrganizer,
    racaOrganizer,
    statusOrganizer,
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
            "status":statusOrganizer,
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/organizadores/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            if(graduacaoOrganizer.length > 0){
            const isDelete = await DeleteGraduationOrganizer(identificador);
            if(isDelete){
                for(let index = 0; index < graduacaoOrganizer.length; index++){
                    const idGraduacao = graduacaoOrganizer[index].id;
                    const graduacao = await UpdateGraduationOrganizer(identificador, idGraduacao) 
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
        console.error('Ocorreu um erro em UpdateOrganizer: ' + error);
    };
    return situacao
};