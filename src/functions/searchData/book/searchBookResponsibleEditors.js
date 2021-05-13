let token = localStorage.getItem('@maatdigital/token');
export default async function SearchBookResponsibleEditors() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/editores_responsaveis_livros', requestOptions);
        return await (response.ok && await response.json()); 
    } catch (error) {
        console.error('Error em SearchBookResponsibleEditors: ' + error);
    };
};