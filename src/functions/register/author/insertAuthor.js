import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationAuthor from "./insertGraudationAuthor";

const token = localStorage.getItem('@maatdigital/token');

const InsertAuthor = async (dataCadastro,firstName,middleName,lastName,paisAutor,graduacaoAutor,numCPF,sexoAutor,racaAutor) =>{
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
            "status": Boolean(true),
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/autores', requestOptions);
        const result = await (response.ok && response.json());  

        (!BooleanValidation[result.status] && console.error(result));

        for(const dados of graduacaoAutor){            
            (BooleanValidation[result.status] && (async() => (await InsertGraduationAuthor(result.identificador_autor, dados.id)))())
        }

        return BooleanValidation[result.status];        
    } catch (error) {
        console.error('Ocorreu um erro em InsertAuthor: ' + error);
        return false;
    }
}

export default InsertAuthor;