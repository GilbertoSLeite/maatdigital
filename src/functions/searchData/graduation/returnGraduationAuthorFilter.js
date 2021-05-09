let token = localStorage.getItem('@maatdigital/token');
export default async function SearchGraduationAuthorFilter(idAutor) {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const url = '/maatdigital/graduacao_autores/' + idAutor
        const response = await fetch(url, requestOptions);
        return await (response.ok && await response.json()); 
    } catch (error) {
        console.error('Error em SearchGraduation: ' + error);
    };
};