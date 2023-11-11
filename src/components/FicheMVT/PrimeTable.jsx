import React from "react";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PrimeTable = () => {
  const [data, setData] = useState([]);
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
  useEffect(() => {
    const handleOnSelection = (e) => {
      setSelectedRow(e.value);
    };
  });

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
      <Column
        field="Portefeuille"
        header="Portefeuille"
        sortable
        style={{ width: "10%" }}
      ></Column>
      <Column
        field="Montant"
        header="Montant"
        sortable
        style={{ width: "10%" }}
      ></Column>
      <Column
        field="Libelle"
        header="Libelle"
        sortable
        style={{ width: "25%" }}
      ></Column>
      <Column
        field="Devise"
        header="Devise"
        sortable
        style={{ width: "5%" }}
      ></Column>
      <Column
        field="Depositaire"
        header="Depositaire"
        sortable
        style={{ width: "5%" }}
      ></Column>
      <Column
        field="Operation"
        header="Date Opération"
        sortable
        style={{ width: "10%" }}
      ></Column>
      <Column
        field="Valeur"
        header="Date Valeur"
        sortable
        style={{ width: "10%" }}
      ></Column>
      <Column
        field="serie"
        header="Serie"
        sortable
        style={{ width: "10%" }}
      ></Column>
    </DataTable>
  );
};

export default PrimeTable;
