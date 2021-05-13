import React from "react";
import MaterialTable from "material-table";
import SearchBook from "../../../functions/searchData/book/searchBook";

export default function TableBooks(){
    const [arrayLivros, setArrayLivros] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    //const [abrirDialog, setAbrirDialog] = React.useState(false)

     React.useEffect(() => {
        setLoading(true)
        const RetornarLivros = async () => setArrayLivros(await SearchBook())
        RetornarLivros()
        setLoading(false)
    },[])

    //const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()
    
    return(
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
                        emptyDataSourceMessage: 'Nenhuma Livro Encontrado.',
                    },
                    header:{
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
                      //onClick: (event, rowData) => AtualizarAutor(rowData)
                    }
                ]}  
        />
    )

}