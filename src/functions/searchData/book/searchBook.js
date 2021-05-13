let token = localStorage.getItem('@maatdigital/token');
export default async function SearchBook() {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        const response = await fetch('/maatdigital/livros', requestOptions);
        return await (response.ok && await response.json()); 
    } catch (error) {
        console.error('Error em SearchBook: ' + error);
    };
};