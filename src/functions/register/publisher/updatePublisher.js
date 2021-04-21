let token = localStorage.getItem('@maatdigital/token');
let situacao;
export default async function UpdatePublisher(
    identificador, 
    dataCadastro,
    nomeEditor,
    anoFundacao,
    paisSede,
    webSite,
    statusEditora ){
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
            "status": statusEditora
        });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let url = '/maatdigital/editoras/' + identificador;
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em UpdateBasePublisher: ' + error);
    };
    return situacao
};