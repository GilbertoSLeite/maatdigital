let primeiroUrl = '/maatdigital/'
export default async function SearchDataOrigin(table) {
    try {
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        let requestOptions = {    
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
        };   
        let url = primeiroUrl + table
        const response = await fetch(url, requestOptions);
        const result = (response.ok && await response.json());
        const resultTratado = (result.map(x => x.primeiro_nome_pessoa.toLowerCase().trim()) + result.map(x => x.segundo_nome_pessoa.toLowerCase().trim()) + result.map(x => x.ultimo_nome_pessoa.toLowerCase().trim()));
        return resultTratado
    } catch (error) {
        console.error('Error em SearchDataOrigin: ' + error);
    };
};