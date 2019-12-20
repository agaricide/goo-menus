import React from "react";
import "./App.css";
import BlobMenu from "./blob-menu";
import { Point } from "./metaball/types/Point";

const viewbox = {
  minX: 0,
  minY: 0,
  width: 1200,
  height: 1200
};

const CENTER_POINT: Point = [600, 350];

const BALLS: Point[] = [
  [300, 100],
  [300, 300],
  [300, 500],
  [300, 700],
];

const App: React.FC = () => {
  return <BlobMenu viewbox={viewbox} center={CENTER_POINT} balls={BALLS} />;
};

export default App;
