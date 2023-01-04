import "./styles.css";
import Icons from "./components/Icons";
import Card from "./components/Card";
import React from "react";

export default function App() {
  return (
    <div className="App">
      {/* <Icons iconType="solid" icon="faZap" size="xl" /> */}
      <div style={{ border: "2px solid red", height: "100vh", zIndex: -1 }}>
        <Card />
      </div>
    </div>
  );
}
