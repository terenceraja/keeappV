import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

import BarChart from "./BarChart";

const FicheMVTPage = () => {
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
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    // const columnsKEE = [
    //   { field: "IdPtf", title: "Code" },
    //   { field: "CapitalDevLIGN_lsn", title: "Capital" },
    //   { field: "IsinDevLIGNDevDEP", title: "Devise" },
    //   { field: "NumPtfDep_lst", title: "Numero PTFDep" },
    //   { field: "CptaDateOPE_lsd", title: "Data Opération" },
    //   { field: "CptaDateValeur_lsd", title: "Data Valeur" },
    // ];

    // const columnsYAN = [
    //   { field: "Portefeuille", title: "Portefeuille" },
    //   { field: "Montant", title: "Montant" },
    //   { field: "Libelle", title: "Libelle" },
    //   { field: "Devise", title: "Devise" },
    //   { field: "Depositaire", title: "Depositaire" },
    //   { field: "Operation", title: "Data Opération" },
    //   { field: "Valeur", title: "Data Valeur" },
    //   { field: "serie", title: "Serie" },
    // ];

    // Fetch data from your server
    console.time("time fetch");
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        console.timeEnd("time fetch");
        console.log("data", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleOnSelection = (e) => {
    setSelectedRow(e.value);
  };

  const labels = ["January", "February", "March", "April"];
  const dataChart = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: JSON.parse(selectedRow.serie),
        backgroundColor: "rgba(239, 128, 38, 0.5)",
      },
    ],
  };

  return (
    <div
      id="mainContainer"
      className="grow flex-col flex gap-10  bg-[#1b3a48] p-5"
    >
      <span className="text-4xl font-bold text-[#ef8026]">LIST MOUVEMENTS</span>

      {data.length === 0 ? (
        <span className="text-white text-3xl font-bold justify-self-center self-center">
          LOADING DATA
          <span>
            <FontAwesomeIcon
              icon={faRightLeft}
              flip
              size="2xl"
              style={{ color: "#ffffff" }}
            />
          </span>
        </span>
      ) : (
        <>
          <div
            id="Chart & Info Container"
            className="flex w-full gap-10 min-h-[300px]"
          >
            <div
              id="chartContainer "
              className="bg-white w-[800px] rounded p-1"
            >
              <BarChart data={dataChart} />
            </div>

            <div id="infoContainer " className="bg-white w-full rounded p-5">
              <InputText readOnly value={`${selectedRow.Portefeuille}`} />
              <InputText readOnly value={`${selectedRow.Montant}`} />
              <InputText readOnly value={`${selectedRow.Libelle}`} />
              <InputText readOnly value={`${selectedRow.Devise}`} />
              <InputText readOnly value={`${selectedRow.Depositaire}`} />
              <InputText readOnly value={`${selectedRow.Operation}`} />
              <InputText readOnly value={`${selectedRow.Valeur}`} />
              <InputText readOnly value={`${selectedRow.serie}`} />
            </div>
          </div>
          <div id="tableContainer" className="bg-white w-full rounded p-1">
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
          </div>
        </>
      )}
    </div>
  );
};

export default FicheMVTPage;
