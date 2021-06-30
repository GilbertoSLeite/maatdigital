import BooleanValidation from "../../booleanValidation/booleanValidation";

const token = localStorage.getItem('@maatdigital/token');

const SearchGraduationOrganizer = async () => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            
        const requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };  

        const response = await fetch('/maatdigital/graduacao_organizadores', requestOptions);
        const result = await response.json(); 

        (!BooleanValidation[result.status] && console.error(JSON.stringify(result)));
        
        return result.fullData;
    } catch (error) {
        console.error('Error em SearchGraduationOrganizer: ' + error);
        return false;
    }
}

export default SearchGraduationOrganizer;