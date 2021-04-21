let token = localStorage.getItem('@maatdigital/token');
let situacao;
export default async function InsertPublisher(
    dataCadastro,
    nomeEditor,
    anoFundacao,
    paisSede,
    webSite
){
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
        const result = await response.json();
        if(result.status === true){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em InsertPublisher: ' + error);
    };
    return situacao
};