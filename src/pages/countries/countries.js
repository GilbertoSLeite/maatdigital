import React from "react";
import MaterialTable from "material-table";
import SearchPaises from "../../functions/searchData/countries/returnCountries";

export default function Paises(){
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayPaises(await SearchPaises()) || setLoading(false))();
    },[]);
    
    return(
        <MaterialTable
            title='Paises'
            isLoading={loading}
            data={arrayPaises}
            localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        exportAriaLabel: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite Nome do País',
                        searchPlaceholder: 'Digite Nome do País',
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
                        tooltip: 'Identificador do Registro',
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
                        title: 'País',
                        field: 'nome',
                        tooltip: 'Nome do País',
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
                        title: 'Nome do País em Inglês',
                        field: 'nome_ingles',
                        tooltip: 'Nome do País em Inglês',
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
                }} />
    );
};