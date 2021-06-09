import DeleteGraduationCoordinator from "./deleteGraduationCoordinator";
import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationCoordinator from "./insertGraudationCoordinator";
let token = localStorage.getItem('@maatdigital/token');
export default async function UpdateCoordinator(identificador,dataCadastro,firstName,middleName,lastName,paisCoordinator,graduacaoCoordinator,numCPF,sexoCoordinator,racaCoordinator,statusCoordinator){
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
        const result = await (response.ok && response.json());        
        (!BooleanValidation[result.status] && console.error(result))
        for(const dados of graduacaoCoordinator){
            const isDelete = (BooleanValidation[result.status] && await DeleteGraduationCoordinator(identificador));
            (isDelete && (async() => (await InsertGraduationCoordinator(identificador, dados.id)))())
        }
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em UpdateCoordinator: ' + error);
        return false
    };
};