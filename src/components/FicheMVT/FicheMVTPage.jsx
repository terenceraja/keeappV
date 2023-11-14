import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
// IMPORTS OF COMPONENTS
import BarChart from "../BarChart";
import PrimeTable from "../PrimeTable";
import { InputText } from "primereact/inputtext";
import { useLocation } from "react-router-dom";
//

const FicheMVTPage = () => {
  const { state } = useLocation();
  const [data, setData] = useState([]);
  console.log(data);
  const [selectedRow, setSelectedRow] = useState(state);

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
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
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
  // const labels = ["January", "February", "March", "April"];
  // const dataChart = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: JSON.parse(selectedRow.serie),
  //       backgroundColor: "rgba(239, 128, 38, 0.5)",
  //     },
  //   ],
  // };

  // DEFINING COLUMNS FOR DATATABLE
  const arrayOfvalues = Object.values(selectedRow);
  const inputList = arrayOfvalues.map((value, key) => (
    <InputText key={key} readOnly value={value} />
  ));

  return (
    <div
      id="mainContainer"
      className="grow flex-col flex gap-10  bg-[#1b3a48] p-5"
    >
      <span className="text-4xl font-bold text-[#ef8026]">
        FICHE MOUVEMENTS
      </span>
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
            className="flex sm:flex-wrap lg:flex-nowrap w-full gap-10 min-h-[400px]"
          >
            {/* <div
              id="chartContainer "
              className="bg-white w-[400px] rounded p-1"
            >
              <BarChart data={dataChart} />
            </div> */}
            <div id="infoContainer " className=" bg-white  rounded p-5 ">
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
