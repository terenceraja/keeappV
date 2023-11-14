import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PrimeTable from "../PrimeTable";

const ListMVTPage = () => {
  let navigate = useNavigate();
  let { portfolioID } = useParams();
  const [data, setData] = useState([{}]);
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    // Fetch data from your server
    axios
      .get(`http://localhost:3000/data/${portfolioID}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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

  // ON TABLE ROWCLICK
  const selectRow = (rowData) => {
    navigate("/mouvements", { state: rowData });
  };

  return (
    <div
      id="mainContainer"
      className="grow flex-col flex gap-10  bg-[#1b3a48] p-5"
    >
      {" "}
      <h1 className=" text-[#ef8026]">Portfolio number : {portfolioID}</h1>
      {Object.keys(data[0]).length === 0 ? (
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
        <div id="tableContainer" className="bg-white w-full rounded p-1">
          <PrimeTable
            data={data}
            selectRow={selectRow}
            columns={columnsForTable}
          />
        </div>
      )}
    </div>
  );
};

export default ListMVTPage;
