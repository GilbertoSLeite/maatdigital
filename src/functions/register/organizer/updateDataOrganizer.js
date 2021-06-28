import DeleteGraduationOrganizer from "./deleteGraduationOrganizer";
import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationOrganizer from "./insertGraudationOrganizer";

const token = localStorage.getItem('@maatdigital/token');

const UpdateOrganizer = async (identificador,dataCadastro,firstName,middleName,lastName,paisOrganizer,graduacaoOrganizer,numCPF,sexoOrganizer,racaOrganizer,statusOrganizer) => {
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
            "status":statusOrganizer,
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = '/maatdigital/organizadores/'+ identificador;
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json());   

        (!BooleanValidation[result.status] && console.log(result));

        for (const dados of graduacaoOrganizer) {
            const isDelete = (BooleanValidation[result.status] && await DeleteGraduationOrganizer(identificador));
            (isDelete && (async() => (await InsertGraduationOrganizer(identificador, dados.id)))());
        }

        return BooleanValidation[result.status]; 
    } catch (error) {
        console.error('Ocorreu um erro em UpdateOrganizer: ' + error);
        return false;
    }
}

export default UpdateOrganizer;