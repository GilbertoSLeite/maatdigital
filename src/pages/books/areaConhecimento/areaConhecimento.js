import React from "react";
import MaterialTable from "material-table";
import SearchSubClasse from "../../../functions/searchData/areaConhecimento/returnsubclasse";
import SearchAreaConhecimento from "../../../functions/searchData/areaConhecimento/returnclasses";

export default function AreaConhecimento() {
    const [arraySubClasse, setArraySubClasse] = React.useState([])
    const [arrayAreaConhecimento, setArrayAreaConhecimento] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        (async () => setLoading(true) || setArraySubClasse(await SearchSubClasse()) || setLoading(false))();
    },[]);

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayAreaConhecimento(await SearchAreaConhecimento()) || setLoading(false))();
    },[]);
    
    function RetornarCodigoAC(identificado){
        const codAreaConhecimento = arrayAreaConhecimento.find(dataAreaConhecimento => (dataAreaConhecimento.id === identificado))
        return ((codAreaConhecimento !== undefined) && codAreaConhecimento.codigo_classes)
    };

    function RetornarAC(identificado){        
        const codAreaConhecimento = arrayAreaConhecimento.find(dataAreaConhecimento => (dataAreaConhecimento.id === identificado))
        return ((codAreaConhecimento !== undefined) && codAreaConhecimento.tipo_classes) 
    };

    return(
        <MaterialTable 
            title='Modelo de Classificação'
            isLoading={loading}
            data={arraySubClasse}
            localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        exportAriaLabel: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite Nome da Classificação',
                        searchPlaceholder: 'Digite Nome do Classificação',
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
                        emptyDataSourceMessage: 'Nenhuma informação encontrada.',
                    },
                    
                }}
            columns={[
                {
                    title: 'Identificador',
                        field: 'id',
                        tooltip: 'Identificador do registro',
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
                        title: 'Cód. Área de Conhecimento',
                        render: rowData => <div>{RetornarCodigoAC(rowData.area_conhecimento_id)}</div>,
                        field: 'area_conhecimento_id',
                        tooltip: 'Código Área de Conhecimento',
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
                        title: 'Área de Conhecimento',
                        render: rowData => <div>{RetornarAC(rowData.area_conhecimento_id)}</div>,
                        field: 'area_conhecimento_id',
                        tooltip: 'Área de Conhecimento',
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
                    title: 'Código de Classificação',
                        field: 'codigo_subclasses',
                        tooltip: 'Código de Classificação',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: true,
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                },
                {
                    title: 'Classificação',
                        field: 'tipo_subclasses',
                        tooltip: 'Classificação do Livro',
                        align: 'center',
                        editable: 'never',
                        filtering: true,
                        grouping: true,
                        searchable: true,
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
        />
    )
    
}