import DataStatus from "../../dataStatus/dataStatus";
import InsertGraduationCover from "./insertGraudationCover";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertCover(
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisCover,
    graduacaoCover,
    numCPF,
    sexoCover,
    racaCover,
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
            "status": Boolean(true),
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/resp_capas', requestOptions);
        const result = (response.ok && await response.json());
        if(result.status){
            for(let index = 0; index < graduacaoCover.length;  index++){
                const idGraduacao = graduacaoCover[index].id;
                const graduacao = await InsertGraduationCover(result.identificador_capa, idGraduacao) 
                !graduacao && (index = graduacaoCover.length)
            }
            situacao = Boolean(true)
        }else {
            console.log(result);
            const errorData = DataStatus(result);
            console.error(errorData.getErrorMessage())
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertCover ' + error);
    };
    return situacao
};