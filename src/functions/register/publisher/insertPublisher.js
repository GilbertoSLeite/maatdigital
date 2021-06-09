import BooleanValidation from "../../booleanValidation/booleanValidation";
let token = localStorage.getItem('@maatdigital/token');
export default async function InsertPublisher(dataCadastro,nomeEditor,anoFundacao,paisSede,webSite){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "data_cadastro": dataCadastro,
            "nome_editora": nomeEditor,
            "ano_fundacao": anoFundacao,
            "pais_sede_id": paisSede,
            "website_editora": webSite,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/editoras', requestOptions);
        const result = await (response.ok && response.json());        
        (!BooleanValidation[result.status] && console.log(result))
        return BooleanValidation[result.status]
    } catch (error) {
        console.error('Ocorreu um erro em InsertPublisher: ' + error);
        return false
    };
};