import "./styles.css";
import Icons from "./components/Icons";
import Card from "./components/Card";
import React from "react";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <div className="App">
      {/* <Icons iconType="solid" icon="faZap" size="xl" /> */}
      <div
        style={{
          border: "2px solid red",
          display: "flex",
          height: "100vh",
          width: "100vw",
          zIndex: -1,
        }}
      >
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
