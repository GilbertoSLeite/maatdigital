import MaterialTable from "material-table";
import React from "react";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import UpdateGraduation from "./updateGraduation";

const TableGraduation = () => {
    const [arrayGraduacao, setArrayGraduacao] = React.useState([]);
    const [abrirDialog, setAbrirDialog] = React.useState(false);
    const [identificadorGraduacao, setIdentificadorGraduacao] = React.useState('');
    const [nomeGraduacao, setNomeGraduacao] = React.useState('');
    const [siglaGraduacao, setSiglaGraduacao] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => setLoading(true) || setArrayGraduacao(await SearchGraduation()) || setLoading(false))();
    }, []);

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload();

    const AtualizandoGraduacao = (dadosGraduacao) => {
        setIdentificadorGraduacao(dadosGraduacao.id)
        setNomeGraduacao(dadosGraduacao.nome_graduacao)
        setSiglaGraduacao(dadosGraduacao.sigla_graduacao)
        setAbrirDialog(true)
    };

    return (
        <React.Fragment>
            <MaterialTable
                title='Tabela de Graduação'
                isLoading={loading}
                localization={{
                    toolbar: {
                        exportTitle: 'Exportar Dados',
                        showColumnsTitle: 'Mostrar as Colunas',
                        addRemoveColumns: 'Adicionar ou Remover Colunas',
                        searchTooltip: 'Digite a Graduação',
                        searchPlaceholder: 'Digite a Graduação que Deseja',
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
                        title: 'Nome da Graduação',
                        field: 'nome_graduacao',
                        tooltip: 'Informação referente a Graduação do Autor.',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: true,
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
                        title: 'Sigla da Graduação',
                        field: 'sigla_graduacao',
                        tooltip: 'Informação referente a Sigla da Graduação do Autor.',
                        align: 'center',
                        filtering: true,
                        grouping: true,
                        searchable: true,
                        editable: 'onUpdate',
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
                data={arrayGraduacao}
                actions={[
                    {
                        iconProps: {
                            color: 'action'
                        },
                        icon: 'edit',
                        tooltip: 'Editar Graduação',
                        onClick: (event, rowData) => AtualizandoGraduacao(rowData)
                    }
                ]}
            />
            {abrirDialog ?
                <DialogCadastro
                    openDialog={abrirDialog}
                    closeDialog={handleFecharDialog}
                    titleDialog='Atualizar Graduação'
                    telaDialog={
                        <UpdateGraduation
                            identificadorIn={identificadorGraduacao}
                            nomeGraduacaoIn={nomeGraduacao}
                            siglaGraduacaoIn={siglaGraduacao}
                        />
                    }
                /> :
                null}
        </React.Fragment>
    );
}

export default TableGraduation;