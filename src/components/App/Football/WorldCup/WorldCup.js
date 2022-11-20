import React from "react";

import { WorldCupStandings } from "./WorldCupStandings";
import { WorldCupFixture } from "./WorldCupFixture";

import "./WorldCup.css";

export const WorldCup = () => {
  return (
    <div>
      <img
        src="../assets/img/banner/banner.jpg"
        className="w-100"
        alt="banner"
      />
      <section className="d-flex">
        <div className="containerCustom text-center p-3">
          <WorldCupStandings />
        </div>
        <div className="containerCustom2 text-center p-3">
          <WorldCupFixture />
        </div>
      </section>
    </div>
  );
};
