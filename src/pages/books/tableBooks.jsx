import React from "react";
import MaterialTable from "material-table";
import SearchBook from "../../functions/searchData/book/searchBook";
import SearchSubClasse from "../../functions/searchData/areaConhecimento/returnsubclasse";
import DialogCadastro from "../../components/dialog/dialogCadastro/dialogCadastro";
import ScreenUpdateCoordinator from "../register/coordinator/screenUpdateCoordinator";

const TableBooks = () => {
    const [arrayLivros, setArrayLivros] = React.useState([])
    const [arrayClassificacao, setArrayClassificacao] = React.useState([])
    const [upIdentificador, setUpIdentificador] = React.useState(null)
    const [upTituloLivro, setUpTituloLivro] = React.useState(null)
    const [upSubTituloLivro, setUpSubTituloLivro] = React.useState(null)
    const [upClassificacao, setUpClassificacao] = React.useState(null)
    const [upIsbnLivro, setUpIsbnLivro] = React.useState(null)
    const [upLinkLivro, setUpLinkLivro] = React.useState(null)
    const [upResumoLivro, setUpResumoLivro] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [abrirDialog, setAbrirDialog] = React.useState(false)

    React.useEffect(() => {
        (async () => (setLoading(true) || setArrayLivros(await SearchBook()) || setLoading(false)))();
    }, [])

    React.useEffect(() => {
        (async () => (setLoading(true) || setArrayClassificacao(await SearchSubClasse()) || setLoading(false)))();
    }, [])

    const RetornarClassificacao = (idClassificacao) => {
        const FilterClassificacao = (array) => array.id === idClassificacao ? array : null
        let nomeClassificacao = arrayClassificacao.map(x => x).filter(FilterClassificacao)
        nomeClassificacao = nomeClassificacao.map(x => x.tipo_subclasses)
        return nomeClassificacao
    }

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    const AtualizarLivro = (dadosLivros) => {
        setAbrirDialog(true)
        setUpIdentificador(dadosLivros.id)
        setUpTituloLivro(dadosLivros.titulo_livro)
        setUpSubTituloLivro(dadosLivros.subtitulo_livro)
        setUpClassificacao(dadosLivros.classificacao_id)
        setUpIsbnLivro(dadosLivros.isbn_livro)
        setUpLinkLivro(dadosLivros.link_livro)
        setUpResumoLivro(dadosLivros.resumo_livro)
    }

    return (
        <React.Fragment>
            <MaterialTable
                title='Livros Cadastrados'
                isLoading={loading}
                data={arrayLivros}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite o Nome do Livro',
                        searchPlaceholder: 'Digite o Nome do Livro',
                    },
                    pagination: {
                        labelRowsSelect: 'Dados',
                        labelDisplayedRows: '{from}-{to} de {count}',
                        firstAriaLabel: 'Início',
                        firstTooltip: 'Início',
                        previousAriaLabel: 'Página Anterior',
                        previousTooltip: 'Página Anterior',
                        nextAriaLabel: 'Próxima Página',
                        nextTooltip: 'Próxima Página',
                        lastAriaLabel: 'Fim',
                        lastTooltip: 'Fim',
                    },
                    body: {
                        emptyDataSourceMessage: 'Nenhum Livro Encontrado.',
                    },
                    header: {
                        actions: 'Editar'
                    },
                }}
                columns={[
                    {
                        field: 'id',
                        type: 'numeric',
                        title: 'Identificador',
                        tooltip: 'Código de Identificação do Livro',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        field: 'titulo_livro',
                        type: 'string',
                        title: 'Título',
                        tooltip: 'Informação do Título do Livro',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        field: 'subtitulo_livro',
                        type: 'string',
                        title: 'Subtítulo',
                        tooltip: 'Informação do Subtítulo do Livro',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        field: 'classificacao_id',
                        type: 'numeric',
                        render: rowData => function () {
                            <div>{RetornarClassificacao(rowData.classificacao_id)}</div>
                        },
                        title: 'Classificação',
                        tooltip: 'Informação do Tipo de Classificação Bibliográfica do Livro',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                ]}
                options={{
                    paging: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 25, 50, 100],
                    searchAutoFocus: true,
                    showFirstLastPageButtons: true,
                    draggable: true,
                    exportButton: true,
                    columnsButton: true,
                }}
                actions={[
                    {
                        iconProps: {
                            color: 'action'
                        },
                        icon: 'edit',
                        tooltip: 'Editar o Livro',
                        onClick: (event, rowData) => AtualizarLivro(rowData)
                    }
                ]}
            />
            {abrirDialog &&
                <DialogCadastro
                    openDialog={abrirDialog}
                    closeDialog={handleFecharDialog}
                    titleDialog='Atualizar Livro'
                    telaDialog={
                        <ScreenUpdateCoordinator
                            identificadorIn={upIdentificador}
                            tituloLivroIn={upTituloLivro}
                            subTituloLivroIn={upSubTituloLivro}
                            classificacaoIn={upClassificacao}
                            isbnLivroIn={upIsbnLivro}
                            linkLivroIn={upLinkLivro}
                            resumoLivroIn={upResumoLivro}
                        />
                    }
                />}
        </React.Fragment>
    )
}

export default TableBooks;