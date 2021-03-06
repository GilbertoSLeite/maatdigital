import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationCoordinator from "./insertGraudationCoordinator";

const token = localStorage.getItem('@maatdigital/token');

const InsertCoordinator = async (dataCadastro,firstName,middleName,lastName,paisCoordinator,graduacaoCoordinator,numCPF,sexoCoordinator,racaCoordinator) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
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

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/coordenadores', requestOptions);
        const result = await (response.ok && response.json());        

        (!BooleanValidation[result.status] && console.error(result));

        for(const dados of graduacaoCoordinator){            
            (BooleanValidation[result.status] && (async() => (await InsertGraduationCoordinator(result.identificador_coordenador, dados.id)))())
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertCoordinator ' + error);
        return false
    }
}

export default InsertCoordinator;