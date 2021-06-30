import actionsBookAfterInsert from "./actionsBookAfterInsert";

const token = localStorage.getItem('@maatdigital/token');

const InsertBooks = async (dataInsert) => {
    try {
            const dataBooks = { 
                "organizadorLivro": dataInsert.dataOrganizadorLivro,
                "editorLivro": dataInsert.dataEditoresResp, 
                "coordenadorLivro": dataInsert.dataCoordenadoresLivros,
                "diagramadorLivro": dataInsert.dataDiagramadoresLivros,
                "capaLivro": dataInsert.dataCapaLivro,  
                "respCapaLivro": dataInsert.dataRespCapaLivro,                
            };

            const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", token);

            const raw = JSON.stringify({
                "titulo_livro":  dataInsert.dataTituloLivro,
                "subtitulo_livro":  dataInsert.dataSubTituloLivro,
                "classificacao_id":  dataInsert.dataClassLivro,
                "editora_id":  dataInsert.dataEditoraLivro,
                "isbn_livro":  dataInsert.dataIsbnLivro,
                "link_livro":  dataInsert.dataLinkLivro,
                "resumo_livro":  dataInsert.dataResumoLivro,
            });

           const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch('/maatdigital/livros', requestOptions);
            const result = await (response.ok && response.json());
            
            const insertData = (await actionsBookAfterInsert(dataBooks, result.status, result.identificadorLivro));
            
        return insertData;
    } catch (error) {
        console.error('Ocorreu um erro em InsertBooks: ', error);
        console.error('Error Detalhe em InsertBooks: ', error.errorDetalhe);
        console.error('Error completo em InsertBooks: ', error.errorFull);
        return false;
    }
}

export default InsertBooks;