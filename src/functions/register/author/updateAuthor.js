import BooleanValidation from "../../booleanValidation/booleanValidation";
import DeleteGraduationAuthor from "./deleteGraduationAuthor";
import InsertGraduationAuthor from "./insertGraudationAuthor";

const token = localStorage.getItem('@maatdigital/token');

const UpdateAuthor = async (identificador,dataCadastro,firstName,middleName,lastName,paisAutor,graduacaoAutor,numCPF,sexoAutor,racaAutor,statusAutor) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        const raw = JSON.stringify({
            "data_cadastro": dataCadastro,
            "primeiro_nome_pessoa": firstName,
            "segundo_nome_pessoa": middleName,
            "ultimo_nome_pessoa": lastName,
            "pais_autor_id": paisAutor,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoAutor,
            "raca_pessoas": racaAutor,
            "status":statusAutor,
        });
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const url = '/maatdigital/autores/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json());        
        (!BooleanValidation[result.status] && console.error(result));
        for(const dados of graduacaoAutor){
            const isDelete = (BooleanValidation[result.status] && await DeleteGraduationAuthor(identificador));
            (isDelete && (async() => (await InsertGraduationAuthor(identificador, dados.id)))());
        }
        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em UpdateAuthor: ' + error);
        return false;
    }
}

export default UpdateAuthor;