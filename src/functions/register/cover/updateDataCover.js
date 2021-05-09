import UpdateGraduationCover from "./updateGraudationCover";
import DeleteGraduationCover from "./deleteGraduationCover";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);

export default async function UpdateCover(
    identificador,
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisCover,
    graduacaoCover,
    numCPF,
    sexoCover,
    racaCover,
    statusCover,
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
            "pais_capa_id": paisCover,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoCover,
            "raca_pessoas": racaCover,
            "status":statusCover,
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/resp_capas/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            if(graduacaoCover.length > 0){
            const isDelete = await DeleteGraduationCover(identificador);
            if(isDelete){
                for(let index = 0; index < graduacaoCover.length; index++){
                    const idGraduacao = graduacaoCover[index].id;
                    const graduacao = await UpdateGraduationCover(identificador, idGraduacao) 
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
        console.error('Ocorreu um erro em UpdateCover: ' + error);
    };
    return situacao
};