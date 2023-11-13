import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import PrimeTable from "../PrimeTable";

import BarChart from "../BarChart";

const ListMVTPage = () => {
  const [data, setData] = useState(null);
  let { portfolioID } = useParams();

  // DEFINING COLUMNS FOR DATATABLE
  // const headerAndField = Object.keys(data[0]);
  // const columnsForTable = headerAndField.map((headerAndField, key) => (
  //   <Column
  //     key={key}
  //     field={headerAndField}
  //     header={headerAndField}
  //     sortable
  //     style={{ width: "10%" }}
  //   />
  // ));

  return (
    <div
      id="mainContainer"
      className="grow flex-col flex gap-10  bg-[#1b3a48] p-5"
    >
      {" "}
      <h1 className=" text-[#ef8026]">Portfolio number : {portfolioID}</h1>
      <div id="tableContainer" className="bg-white w-full rounded p-1"></div>
    </div>
  );
};

export default ListMVTPage;
