import UpdateGraduationAuthor from "./updateGraduationAuthor";
import DeleteGraduationAuthor from "./deleteGraduationAuthor";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);

export default async function UpdateAuthor(
    identificador,
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisAutor,
    graduacaoAutor,
    numCPF,
    sexoAutor,
    racaAutor,
    statusAutor,
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
            "pais_autor_id": paisAutor,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoAutor,
            "raca_pessoas": racaAutor,
            "status":statusAutor,
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/autores/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            console.log(graduacaoAutor.length)
            if(graduacaoAutor.length > 0){
            const isDelete = await DeleteGraduationAuthor(identificador);
            if(isDelete){
                for(let index = 0; index < graduacaoAutor.length; index++){
                    const idGraduacao = graduacaoAutor[index].id;
                    const graduacao = await UpdateGraduationAuthor(identificador, idGraduacao) 
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
        console.error('Ocorreu um erro em UpdateAuthor: ' + error);
    };
    return situacao
};