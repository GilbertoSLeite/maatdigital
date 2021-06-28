import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationEditor from "./insertGraudationEditor";

const token = localStorage.getItem('@maatdigital/token');

const InsertEditor = async (dataCadastro,firstName,middleName,lastName,paisEditor,graduacaoEditor,numCPF,sexoEditor,racaEditor) => {
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
            "status": Boolean(true),
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/editores', requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        for(const dados of graduacaoEditor){            
            (BooleanValidation[result.status] && (async() => (await InsertGraduationEditor(result.identificador_editor, dados.id)))());
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertEditor: ' + error);
    }
}

export default InsertEditor;