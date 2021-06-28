import InsertGraduationEditor from "./insertGraudationEditor";
import DeleteGraduationEditor from "./deleteGraduationEditor";
import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const UpdateEditor = async (identificador,dataCadastro,firstName,middleName,lastName,paisEditor,graduacaoEditor,numCPF,sexoEditor,racaEditor,statusEditor) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
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

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = '/maatdigital/editores/'+ identificador
        const response = await fetch(url, requestOptions);      
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        for(const dados of graduacaoEditor){
            const isDelete = (BooleanValidation[result.status] && await DeleteGraduationEditor(identificador));
            (isDelete && (async() => (await InsertGraduationEditor(identificador, dados.id)))());
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em UpdateEditor: ' + error);
        return false;
    }
}

export default UpdateEditor;