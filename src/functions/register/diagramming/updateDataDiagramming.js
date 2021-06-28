import InsertGraduationDiagramming from "./insertGraudationDiagramming";
import DeleteGraduationDiagramming from "./deleteGraduationDiagramming";
import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const UpdateDiagramming = async (identificador,dataCadastro,firstName,middleName,lastName,paisDiagramming,graduacaoDiagramming,numCPF,sexoDiagramming,racaDiagramming,statusDiagramming) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "data_cadastro": dataCadastro,
            "primeiro_nome_pessoa": firstName,
            "segundo_nome_pessoa": middleName,
            "ultimo_nome_pessoa": lastName,
            "pais_diagramador_id": paisDiagramming,
            "numero_cpf": numCPF,
            "sexo_pessoas": sexoDiagramming,
            "raca_pessoas": racaDiagramming,
            "status":statusDiagramming,
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = '/maatdigital/diagramadores/'+ identificador
        const response = await fetch(url, requestOptions);        
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        for(const dados of graduacaoDiagramming){
            const isDelete = (BooleanValidation[result.status] && await DeleteGraduationDiagramming(identificador));
            (isDelete && (async() => (await InsertGraduationDiagramming(identificador, dados.id)))());
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em UpdateDiagramming: ' + error);
        return false;
    }
}

export default UpdateDiagramming;