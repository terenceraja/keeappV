import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
// IMPORTS OF COMPONENTS
import BarChart from "../BarChart";
import PrimeTable from "../PrimeTable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useLocation } from "react-router-dom";
import { Calendar } from "primereact/calendar";
//

const FicheMVTPage = () => {
  const { state } = useLocation();
  const [data, setData] = useState([{}]);
  const [date, setDate] = useState(null);

  const [selectedRow, setSelectedRow] = useState(state);

  useEffect(() => {
    // Fetch data from your server
    axios
      .get(`http://localhost:3000/data/${state.IdPtf}`)
      .then((response) => {
        let dataResponse = response.data;

        const updatedData = dataResponse.map((item) => {
          // Check if the value of CptaDateOPE_lsd can be converted to a valid Date
          const dateValueOPE = new Date(item.CptaDateOPE_lsd);
          const isValidDateOPE = !isNaN(dateValueOPE.getTime());

          // If it's a valid date, update the property, otherwise leave it unchanged
          if (isValidDateOPE) {
            item.CptaDateOPE_lsd = dateValueOPE;
          }

          // Check if the value of CptaDateValeur_lsd can be converted to a valid Date
          const dateValueValeur = new Date(item.CptaDateValeur_lsd);
          const isValidDateValeur = !isNaN(dateValueValeur.getTime());

          // If it's a valid date, update the property, otherwise leave it unchanged
          if (isValidDateValeur) {
            item.CptaDateValeur_lsd = dateValueValeur;
          }

          return item;
        });

        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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

  // DEFINING INPUTS
  let inputList = [];
  Object.keys(selectedRow).forEach(function (key, index) {
    inputList.push(
      <div id="input&label container" className="flex flex-col" key={index}>
        <label className="text-[#ef8026] font-bold">{key}</label>
        <InputText
          className="text-lg font-bold"
          readOnly
          value={selectedRow[key]}
        />
      </div>
    );
  });
  //

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateBodyTemplateOPE = (rowData) => {
    return formatDate(rowData.CptaDateOPE_lsd);
  };

  const dateBodyTemplateVALEUR = (rowData) => {
    return formatDate(rowData.CptaDateValeur_lsd);
  };

  // DEFINING COLUMNS FOR DATATABLE
  const headerAndField = Object.keys(data[0]);
  const columnsForTable = headerAndField.map((headerAndField, key) => {
    if (headerAndField === "CptaDateOPE_lsd") {
      return (
        <Column
          key={key}
          field={headerAndField}
          header={headerAndField}
          sortable
          body={dateBodyTemplateOPE}
          dataType="date"
        />
      );
    } else if (headerAndField === "CptaDateValeur_lsd") {
      return (
        <Column
          key={key}
          field={headerAndField}
          header={headerAndField}
          sortable
          body={dateBodyTemplateVALEUR}
          dataType="date"
        />
      );
    } else {
      return (
        <Column
          key={key}
          field={headerAndField}
          header={headerAndField}
          sortable
        />
      );
    }
  });

  // ON TABLE ROWCLICK
  const selectRow = (rowData) => {
    setSelectedRow(rowData);
  };

  return (
    <div
      id="mainContainer"
      className="grow flex-col flex gap-10  bg-[#1b3a48] p-5"
    >
      {/* <span className="text-4xl font-bold text-[#ef8026]">
      FICHE MOUVEMENTS
    </span> */}
      {/* <div
      id="Chart & Info Container"
      className="flex sm:flex-wrap lg:flex-nowrap w-full gap-10 min-h-[400px]"
    > */}
      {/* <div
          id="chartContainer "
          className="bg-white w-[400px] rounded p-1"
        >
          <BarChart data={dataChart} />
        </div> */}
      <div
        id="infoContainer "
        className="flex flex-col bg-white w-[40%] rounded p-5 gap-5 "
      >
        {inputList}
      </div>

      <div id="tableContainer" className="bg-white w-full rounded p-1">
        {Object.keys(data[0]).length === 0 ? (
          <span className="text-black text-3xl font-bold justify-self-center self-center">
            LOADING DATA
            <span>
              <FontAwesomeIcon
                icon={faRightLeft}
                flip
                size="2xl"
                style={{ color: "black" }}
              />
            </span>
          </span>
        ) : (
          <>
            <div className="card flex justify-content-center">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
              />
            </div>
            <PrimeTable
              data={data}
              selectRow={selectRow}
              columns={columnsForTable}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FicheMVTPage;
