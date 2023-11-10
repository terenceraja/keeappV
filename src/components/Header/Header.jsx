import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

export default function TemplateDemo() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Login Page",
      command: () => navigate("/"),
    },
    {
      label: "PortFolio List",
      command: () => navigate("/portfolio"),
    },
    {
      label: "Mouvement List",
      command: () => navigate("/mouvements"),
    },
    {
      label: "Events",
      command: () => navigate("/qzdzd"),
    },
    {
      label: "Quit",
      command: () => navigate("/qzdzd"),
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://ucarecdn.com/149afb0a-b8c2-4c32-bc6a-6a80628e4506/"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = <InputText placeholder="Search" type="text" className="w-full" />;

  return <Menubar className="fixed w-full z-10 " model={items} start={start} />;
}
