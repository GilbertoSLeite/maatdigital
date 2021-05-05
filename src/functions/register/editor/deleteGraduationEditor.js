let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function DeleteGraduationEditor(idEditor){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = '/maatdigital/graduacao_editores/' + idEditor
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        if(result.status === true){
            situacao = Boolean(true)
        }else {
            console.log(result);
            situacao = Boolean(false)
        }
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationEditor: ' + error);
    };
    return situacao
};