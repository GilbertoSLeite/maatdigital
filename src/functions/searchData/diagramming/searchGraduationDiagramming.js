let token = localStorage.getItem('@maatdigital/token');

export default async function SearchGraduationDiagramming() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/graduacao_diagramadores', requestOptions);                
        return (response.ok && await response.json());
    } catch (error) {
        console.error('Error em SearchGraduationDiagramming: ' + error);
    };
};