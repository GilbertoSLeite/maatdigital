import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const UpdatePublisher = async (identificador,dataCadastro,nomeEditor,anoFundacao,paisSede,webSite,statusEditora ) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);

        const raw = JSON.stringify({
            "data_cadastro": dataCadastro,
            "nome_editora": nomeEditor,
            "ano_fundacao": anoFundacao,
            "pais_sede_id": paisSede,
            "website_editora": webSite,
            "status": statusEditora
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = '/maatdigital/editoras/' + identificador;
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json());    

        (!BooleanValidation[result.status] && console.log(result));

        return BooleanValidation[result.status];
    } catch (error) {
        console.error('Ocorreu um erro em UpdateBasePublisher: ' + error);
        return false
    }
}

export default UpdatePublisher;