import UpdateGraduationEditor from "./updateGraudationEditor";
import DeleteGraduationEditor from "./deleteGraduationEditor";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);

export default async function UpdateEditor(
    identificador,
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisEditor,
    graduacaoEditor,
    numCPF,
    sexoEditor,
    racaEditor,
    statusEditor,
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
            "pais_editor_id": paisEditor,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoEditor,
            "raca_pessoas": racaEditor,
            "status":statusEditor,
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/editores/'+ identificador
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            if(graduacaoEditor.length > 0){
            const isDelete = await DeleteGraduationEditor(identificador);
            if(isDelete){
                for(let index = 0; index < graduacaoEditor.length; index++){
                    const idGraduacao = graduacaoEditor[index].id;
                    const graduacao = await UpdateGraduationEditor(identificador, idGraduacao) 
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
        console.error('Ocorreu um erro em UpdateEditor: ' + error);
    };
    return situacao
};