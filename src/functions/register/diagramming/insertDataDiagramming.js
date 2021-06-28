import BooleanValidation from "../../booleanValidation/booleanValidation";
import InsertGraduationDiagramming from "./insertGraudationDiagramming";

const token = localStorage.getItem('@maatdigital/token');

const InsertDiagramming = async (dataCadastro,firstName,middleName,lastName,paisDiagramming,graduacaoDiagramming,numCPF,sexoDiagramming,racaDiagramming) => {
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
            "status": Boolean(true),
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch('/maatdigital/diagramadores', requestOptions);
        const result = (response.ok && await response.json());

        (!BooleanValidation[result.status] && console.error(result))();

        for(const dados of graduacaoDiagramming){            
            (BooleanValidation[result.status] && (async() => (await InsertGraduationDiagramming(result.identificador_diagramador, dados.id)))());
        }

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em InsertDiagramming ' + error);
        return false;
    }
}

export default InsertDiagramming;