const token = localStorage.getItem('@maatdigital/token');

const SearchGraduationAuthorFilter = async (idAutor) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);

        const requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   

        const url = '/maatdigital/graduacao_autores/' + idAutor
        const response = await fetch(url, requestOptions);
        const result = await (response.ok && response.json()); 
        
        return result;
    } catch (error) {
        console.error('Error em SearchGraduation: ' + error);
        return false;
    }
}

export default SearchGraduationAuthorFilter;