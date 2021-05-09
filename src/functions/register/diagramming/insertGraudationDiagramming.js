let token = localStorage.getItem('@maatdigital/token');
let situacao = Boolean(false);
export default async function InsertGraduationDiagramming(    
    idDiagramming,
    idGraduacaoDiagramming,
){
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let raw = JSON.stringify({
            "diagramador_id": idDiagramming,
            "graduacoes_id": idGraduacaoDiagramming,
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch('/maatdigital/graduacao_diagramadores', requestOptions);
        const result = await response.json();
        result.status ? situacao = Boolean(true) : situacao = Boolean(false) || console.error(result)        
    } catch (error) {
        console.error('Ocorreu um erro em InsertGraduationDiagramming: ' + error);
    };
    return situacao
};