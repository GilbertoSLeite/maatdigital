import DeleteGraduationCover from "./deleteGraduationCover";
import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationCover from "./insertGraudationCover";

const token = localStorage.getItem('@maatdigital/token');

const UpdateCover = async (identificador,dataCadastro,firstName,middleName,lastName,paisCover,graduacaoCover,numCPF,sexoCover,racaCover,statusCover) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
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

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = '/maatdigital/resp_capas/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        for(const dados of graduacaoCover){
            const isDelete = (BooleanValidation[result.status] && await DeleteGraduationCover(identificador));
            (isDelete && (async() => (await InsertGraduationCover(identificador, dados.id)))());
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em UpdateCover: ' + error);
    }
}

export default UpdateCover;