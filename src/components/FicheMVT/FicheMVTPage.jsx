import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
// IMPORTS OF COMPONENTS
import BarChart from "./BarChart";
import PrimeTable from "./PrimeTable";
import { InputText } from "primereact/inputtext";
//

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
    Depositaire: "BGL",
    PrimaryKey: "8819",
  });
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
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const selectRow = (rowData) => {
    setSelectedRow(rowData);
  };

  // DEFINING CHART DATA
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

  // DEFINING COLUMNS FOR DATATABLE
  const arrayOfvalues = Object.values(selectedRow);
  console.log(arrayOfvalues);
  const inputList = arrayOfvalues.map((value, key) => (
    <InputText key={key} readOnly value={value} />
  ));
  //

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
              {inputList}
            </div>
          </div>
          <div id="tableContainer" className="bg-white w-full rounded p-1">
            <PrimeTable data={data} selectRow={selectRow} />
          </div>
        </>
      )}
    </div>
  );
};

export default FicheMVTPage;
