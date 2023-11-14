import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jsonData from "./oceanData.json";
import PrimeTable from "../PrimeTable";
import { Column } from "primereact/column";

const ListePF = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([{}]);

  //  GET TEMP IDPTF LIST
  const uniqueIdPtfValues = [...new Set(data.map((obj) => obj.IdPtf))];
  const resultArray = uniqueIdPtfValues.map((idPtf) => ({ IdPtf: idPtf }));
  console.log(resultArray.length);
  //

  useEffect(() => {
    // Extract fieldData from each element in jsonData.response.data
    let dataTrim = jsonData.response.data.map((i) => i.fieldData);
    console.log(dataTrim.length);
    setData(dataTrim);
  }, []);

  // DEFINING COLUMNS FOR DATATABLE

  const columnsForTable = (
    <Column field="IdPtf" header="IdPtf" sortable style={{ width: "10%" }} />
  );

  // ON TABLE ROWCLICK
  const selectRow = (rowData) => {
    navigate(`/portfolio/${rowData.IdPtf}`);
  };

  return (
    <div id="mainContainer" className="grow flex-col flex   bg-[#1b3a48] p-5">
      <h1 className=" text-[#ef8026]">LIST PORTFOLIO</h1>
      <div id="tableContainer" className="bg-white w-full rounded p-1">
        <PrimeTable
          data={resultArray}
          selectRow={selectRow}
          columns={columnsForTable}
        />
      </div>
    </div>
  );
};

export default ListePF;
