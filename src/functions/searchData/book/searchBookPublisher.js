let token = localStorage.getItem('@maatdigital/token');
export default async function SearchBookPublisher() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/editoras_livros', requestOptions);
        return await (response.ok && await response.json()); 
    } catch (error) {
        console.error('Error em SearchBookPublisher: ' + error);
    };
};