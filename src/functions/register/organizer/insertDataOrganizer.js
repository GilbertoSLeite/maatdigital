import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationOrganizer from "./insertGraudationOrganizer";

const token = localStorage.getItem('@maatdigital/token');

const InsertOrganizer = async (dataCadastro,firstName,middleName,lastName,paisOrganizer,graduacaoOrganizer,numCPF,sexoOrganizer,racaOrganizer) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
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

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/organizadores', requestOptions);
        const result = await (response.ok && response.json());    

        (!BooleanValidation[result.status] && console.error(result));

        for (const dados of graduacaoOrganizer) {
            (BooleanValidation[result.status] && (async() => (await InsertGraduationOrganizer(result.identificador_organizador, dados.id)))())
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertOrganizer: ' + error);
        return false
    }
}

export default InsertOrganizer;