import actionsBookAfterInsert from "./actionsBookAfterInsert";
let token = localStorage.getItem('@maatdigital/token');
export default async function InsertBooks(
    imagemCapaLivro,
    tituloLivro,
    subTituloLivro,
    classLivro,
    isbnLivro,
    linkLivro,
    publisherBooks, 
    organizerBooks,
    editorBooks,
    coordinatorBooks, 
    coverBooks,
    diagrammingBooks,
    resumoLivro,
){
    try {
            let dataBooks = { 
                "imagemCapaLivro": imagemCapaLivro,
                "organizadorLivro": organizerBooks,
                "editorLivro": editorBooks, 
                "coordenadorLivro": coordinatorBooks,
                "capaLivro": coverBooks,
                "diagramadorLivro": diagrammingBooks,
            };
            let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", token);
            let raw = JSON.stringify({
                "titulo_livro": tituloLivro,
                "subtitulo_livro": subTituloLivro,
                "classificacao_id": classLivro,
                "editora_id": publisherBooks,
                "isbn_livro": isbnLivro,
                "link_livro": linkLivro,
                "resumo_livro": resumoLivro,
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
        console.error('Ocorreu um erro em InsertBooks: ' + error);
    };
};