import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jsonData from "./oceanData.json";
import PrimeTable from "../PrimeTable";
import { Column } from "primereact/column";

const ListePF = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([{}]);
  // DEFINING COLUMNS FOR DATATABLE

  useEffect(() => {
    // Extract fieldData from each element in jsonData.response.data
    let dataTrim = jsonData.response.data.map((i) => i.fieldData);
    setData(dataTrim);
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
  const selectRow = (e) => {
    navigate(`/portfolio/${e.IdPtf}`);
  };

  return (
    <div id="mainContainer" className="grow flex-col flex   bg-[#1b3a48] p-5">
      <h1 className=" text-[#ef8026]">LIST PORTFOLIO</h1>
      <div id="tableContainer" className="bg-white w-full rounded p-1">
        <PrimeTable
          data={data}
          selectRow={selectRow}
          columns={columnsForTable}
        />
      </div>
    </div>
  );
};

export default ListePF;
