import DataStatus from "../../dataStatus/dataStatus";
import InsertGraduationEditor from "./insertGraudationEditor";

let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertEditor(
    dataCadastro,
    firstName,
    middleName,
    lastName,
    paisEditor,
    graduacaoEditor,
    numCPF,
    sexoEditor,
    racaEditor,
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
            "status": Boolean(true),
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/editores', requestOptions);
        const result = await response.json();
        if(result.status){
            for(let index = 0; index < graduacaoEditor.length;  index++){
                const idGraduacao = graduacaoEditor[index].id;
                const graduacao = await InsertGraduationEditor(result.identificador_editor, idGraduacao) 
                graduacao ? console.log('For Index: ' + index)  : (index = graduacaoEditor.length)
            }
            situacao = Boolean(true)
        }else {
            console.log(result);
            const errorData = DataStatus(result);
            console.error(errorData.getErrorMessage())
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertEditor: ' + error);
    };
    return situacao
};