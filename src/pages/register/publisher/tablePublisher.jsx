import { Link } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import SearchPublisher from "../../../functions/searchData/publisher/returnPublisher";
import UpdateScreenPublisher from "./updateScreenPublisher";

const TablePuslisher = () => {
    const [arrayEditora, setArrayEditora] = React.useState([]);
    const [arrayPais, setArrayPais] = React.useState([]);
    const [abrirDialog, setAbrirDialog] = React.useState(false);
    const [identificadorEditora, setIdentificadorEditora] = React.useState('');
    const [dataCadastro, setDataCadastro] = React.useState('');
    const [nomeEditora, setNomeEditora] = React.useState('');
    const [anoFundacao, setAnoFundacao] = React.useState('');
    const [pais, setPais] = React.useState('');
    const [webSite, setWebSite] = React.useState('');
    const [statusEditora, setStatusEditora] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => setArrayEditora(await SearchPublisher()))();
    }, []);

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayPais(await SearchPaises()) || setLoading(false))();
    }, []);

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    const AtualizandoEditora = (dadosEditora) => {
        setIdentificadorEditora(dadosEditora.id)
        setDataCadastro(dadosEditora.data_cadastro)
        setNomeEditora(dadosEditora.nome_editora)
        setAnoFundacao(dadosEditora.ano_fundacao)
        setPais(dadosEditora.pais_sede_id)
        setWebSite(dadosEditora.website_editora)
        setStatusEditora(dadosEditora.status)
        setAbrirDialog(true)
    };

    function RetornarNomePais(identificado) {
        const paisesMundo = arrayPais.find(paises => (paises.id === identificado))
        return ((paisesMundo !== undefined) && paisesMundo.nome)
    }

    return (
        <React.Fragment>
            <MaterialTable
                title='Tabela das Editoras'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite a Editora que Deseja',
                        searchPlaceholder: 'Digite a Editora',
                    },
                    pagination: {
                        labelRowsSelect: 'Dados',
                        labelDisplayedRows: '{from}-{to} de {count}',
                        firstAriaLabel: 'In??cio',
                        firstTooltip: 'In??cio',
                        previousAriaLabel: 'P??gina Anterior',
                        previousTooltip: 'P??gina Anterior',
                        nextAriaLabel: 'Pr??xima P??gina',
                        nextTooltip: 'Pr??xima P??gina',
                        lastAriaLabel: 'Fim',
                        lastTooltip: 'Fim',
                    },
                    body: {
                        emptyDataSourceMessage: 'Nenhuma informa????o encontrada.',
                    },
                    header: {
                        actions: 'Editar'
                    }
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
                        title: 'Data do Cadastro',
                        field: 'data_cadastro',
                        tooltip: 'Informa????o referente a Data de Cadastro da Editora',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        editable: 'onUpdate',
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        title: 'Nome da Editora',
                        field: 'nome_editora',
                        tooltip: 'Informa????o referente a Nome da Editora',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        editable: 'onUpdate',
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        title: 'Ano da Funda????o',
                        field: 'ano_fundacao',
                        tooltip: 'Informa????o referente ao Ano da Funda????o da Editora',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: false,
                        editable: 'onUpdate',
                        headerStyle: {
                            fontWeight: 'bold'
                        },
                        cellStyle: {
                            fontWeight: 'bold',
                            color: '#2e5493',
                        }
                    },
                    {
                        title: 'Nome do Pa??s',
                        // eslint-disable-next-line react/display-name
                        render: rowData => <div>{RetornarNomePais(rowData.pais_sede_id)}</div>,
                        field: 'pais_sede_id',
                        tooltip: 'Informa????o referente ao Pa??s da Funda????o da Editora',
                        align: 'center',
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
                        title: 'Website da Funda????o',
                        // eslint-disable-next-line react/display-name
                        render: rowData => <div>
                            <Link to={rowData.website_editora} onClick={() => window.open(rowData.website_editora, 'blank_')}>
                                {rowData.website_editora}
                            </Link>
                        </div>,
                        field: 'website_editora',
                        tooltip: 'Informa????o referente ao Website da Funda????o da Editora',
                        align: 'center',
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
                data={arrayEditora}
                actions={[
                    {
                        iconProps: {
                            color: 'action'
                        },
                        icon: 'edit',
                        tooltip: 'Editar Editora',
                        onClick: (event, rowData) => AtualizandoEditora(rowData)
                    }
                ]}
            />
            {abrirDialog ?
                <DialogCadastro
                    openDialog={abrirDialog}
                    closeDialog={handleFecharDialog}
                    titleDialog='Atualizar Editora'
                    telaDialog={
                        <UpdateScreenPublisher
                            identificadorIn={identificadorEditora}
                            dataCadastroIn={dataCadastro}
                            nomeEditoraIn={nomeEditora}
                            anoFundacaoIn={anoFundacao}
                            paisSedeIn={pais}
                            webSiteIn={webSite}
                            statusEditoraIn={statusEditora}
                        />
                    }
                /> :
                null}
        </React.Fragment>
    );
}

export default TablePuslisher;