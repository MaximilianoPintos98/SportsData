import React, { useState } from "react";

import { WorldCupStandings } from "./WorldCupStandings";
import { WorldCupFixture } from "./WorldCupFixture";
import { WorldCupKnockout } from "./WorldCupKnockout";

import "./WorldCup.css";

export const WorldCup = () => {
  const [active, setActive] = useState(false);
  
  
  return (
    <div>
      <img
        src="../assets/img/banner/banner.jpg"
        className="w-100"
        alt="banner"
      />
      <div className="d-flex justify-content-center p-3">
        <button type="button" className={`${active ? 'btn btn-dark btn-lg m-2' : 'btn btn-outline-dark btn-lg m-2'}`} onClick={() => setActive(true)}>
          Primera Fase
        </button>
        <button type="button" className={`${active ? 'btn btn-outline-dark btn-lg m-2' : 'btn btn-dark btn-lg m-2'}`} onClick={() => setActive(false)}>
          Fase Eliminatoria
        </button>
      </div>

      {
        active ? (
          <section className="d-flex">
            <div className="containerCustom text-center p-3">
              <WorldCupStandings />
            </div>
            <div className="containerCustom2 text-center p-3">
              <WorldCupFixture />
            </div>
          </section>
        ) : (
          <WorldCupKnockout/>
        )
      }
    </div>
  );
};
