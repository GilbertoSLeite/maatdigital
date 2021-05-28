import actionsBookAfterInsert from "./actionsBookAfterInsert";
let token = localStorage.getItem('@maatdigital/token');
export default async function InsertBooks(dataInsert){
    try {
            let dataBooks = { 
                "organizadorLivro": dataInsert.dataOrganizadorLivro,
                "editorLivro": dataInsert.dataEditoresResp, 
                "coordenadorLivro": dataInsert.dataCoordenadoresLivros,
                "diagramadorLivro": dataInsert.dataDiagramadoresLivros,
                "capaLivro": dataInsert.dataCapaLivro,  
                "respCapaLivro": dataInsert.dataRespCapaLivro,                
            };
            let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", token);
            let raw = JSON.stringify({
                "titulo_livro":  dataInsert.dataTituloLivro,
                "subtitulo_livro":  dataInsert.dataSubTituloLivro,
                "classificacao_id":  dataInsert.dataClassLivro,
                "editora_id":  dataInsert.dataEditoraLivro,
                "isbn_livro":  dataInsert.dataIsbnLivro,
                "link_livro":  dataInsert.dataLinkLivro,
                "resumo_livro":  dataInsert.dataResumoLivro,
            });
           let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const response = await fetch('/maatdigital/livros', requestOptions);
            const result = await (response.ok && response.json());
        return (await actionsBookAfterInsert(dataBooks, result.status, result.identificador_livro))
    } catch (error) {
        console.error('Ocorreu um erro em InsertBooks: ', error);
    };
};