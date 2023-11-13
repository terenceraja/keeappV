import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PrimeTable = ({ selectRow, data }) => {
  // TRIMMING EMPTY KEYS OF DATA
  for (const obj of data) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] == "") {
        delete obj[key];
      }
    });
  }
  //

  // DEFING INITIAL STATE OF SELECTED ROW
  const [selectedRow, setSelectedRow] = useState({
    Devise: "EUR",
    Libelle:
      "MANAGEMENT FEE - Quantité titres (transfert de) - ABN AMRO BANK NV",
    Montant: 20000,
    Operation: "12/30/2011",
    Portefeuille: "000315517",
    Valeur: "12/30/2011",
    serie: "[45,84,78,60]",
  });
  //

  // HANDLING CLICK ON ROW (SWITCHES SELECTED ROW & SENDS ROW VALUE TO PARENT PAGE TO DISPLAY VALUES IN INPUTS)
  const handleOnSelection = (e) => {
    setSelectedRow(e.value);
    selectRow(e.value);
  };
  //

  // DEFINING COLUMNS FOR DATATABLE
  const headerAndField = Object.keys(data[0]);
  const columnsForTable = headerAndField.map((headerAndField, key) => (
    <Column
      key={key}
      field={headerAndField}
      header={headerAndField}
      sortable
      style={{ width: "10%" }}
    />
  ));

  //

  return (
    <DataTable
      value={data}
      paginator
      reorderableColumns
      rows={5}
      selectionMode="single"
      selection={selectedRow}
      onSelectionChange={(e) => handleOnSelection(e)}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: "50rem" }}
    >
      {columnsForTable}
      <Column
        field="Valeur"
        header="Valeur"
        sortable
        dataType="date"
        style={{ width: "10%" }}
      />
    </DataTable>
  );
};

export default PrimeTable;
