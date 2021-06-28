import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationCover from "./insertGraudationCover";

const token = localStorage.getItem('@maatdigital/token');

const InsertCover = async (dataCadastro,firstName,middleName,lastName,paisCover,graduacaoCover,numCPF,sexoCover,racaCover) => {
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
            "status": Boolean(true),
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/resp_capas', requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        for(const dados of graduacaoCover){            
            (BooleanValidation[result.status] && (async() => (await InsertGraduationCover(result.identificador_capa, dados.id)))());
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertCover ' + error);
        return false;
    }
}

export default InsertCover;