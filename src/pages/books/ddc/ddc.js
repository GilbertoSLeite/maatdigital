import React from "react";
import MaterialTable from "material-table";
import SearchSubClasse from "../../../functions/searchData/DDC/returnsubclasse";
import SearchAreaConhecimento from "../../../functions/searchData/DDC/returnclasses";

export default function DDC() {
    const [arrayDDC, setArrayDDC] = React.useState([])
    const [arrayAC, setArrayAC] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        const RetornarSC = async () => setArrayDDC(await SearchSubClasse()) || setLoading(false)
        RetornarSC()
    }, []);

    React.useEffect(() => {
        setLoading(true)
        async function RetornarAC() {
            setArrayAC(await SearchAreaConhecimento())
            setLoading(false)
        };
        RetornarAC()
    }, []);
    
    function RetornarCodigoAC(identificado){
        function AC(array) {
            if(array.id === identificado){
                return array
            };
        }
        let codigoA = arrayAC.map(x => x).filter(AC);
        codigoA = codigoA.map(x => x.codigo_classes)
        return codigoA
    };

    function RetornarAC(identificado){
        function ReturnAC(array) {
            if(array.id === identificado){
                return array
            };
        }
        let areaConhecimento = arrayAC.map(x => x).filter(ReturnAC);
        areaConhecimento = areaConhecimento.map(x => x.tipo_classes)
        return areaConhecimento
    };

    return(
        <MaterialTable 
            title='Modelo de Classificação'
            isLoading={loading}
            data={arrayDDC}
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
                        title: 'Código Área de Conhecimento',
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