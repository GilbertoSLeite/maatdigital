let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function DeleteGraduationDiagramming(idEditor){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        const url = '/maatdigital/diagramadores/' + idEditor
        const response = await fetch(url, requestOptions);
        const result = (response.ok && await response.json());
        result.status ? situacao = Boolean(true) : situacao = Boolean(false) || console.error(result)        
    } catch (error) {
        console.error('Ocorreu um erro em DeleteGraduationDiagramming: ' + error);
    };
    return situacao
};