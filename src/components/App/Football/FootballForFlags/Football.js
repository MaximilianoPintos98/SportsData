import React, { useState } from "react";

import axios from "axios";
import { config } from "../../../../routers/AxiosConfig";

import "./Football.css";

export const Football = () => {
  const [show, setShow] = useState(false);
  const [leagues, setLeagues] = useState([]);

  const handleOnClick = (country) => {
    axios
      .get(
        `https://v3.football.api-sports.io/leagues?country=${country}`,
        config
      )
      .then((response) => {
        setLeagues(response.data.response);
        console.log(response.data.response);
      })
      .catch((err) => console.log(err));
  };

  const flagsComponent = (id, name, logo) => {
    return (
      <div className="card" key={id}>
        <img src={logo} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {show ? (
            <button
              type="button"
              onClick={() => {
                setShow(!show);
              }}
              className="btn"
            >
              Ver Competencias
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleOnClick(name);
                setShow(!show);
              }}
              className="btn"
            >
              Ver Competencias
            </button>
          )}
        </div>
      </div>
    );
  };

  const leaguesComponent = () => {
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="col">
            <th scope="col col-5" className="col text-center">
              Campeonato / Liga / Copa
            </th>
            <th scope="col col-7" className="col text-center">
              Explorar
            </th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((l) => (
            <tr className="col" key={l.league.id}>
              <td className="col d-flex ">
                <div className=" col col-3 img-container">
                  <img src={l.league.logo} className="img-responsive" alt={l.league.name} />
                </div>
                <div className="col ">
                  <p>{l.league.name}</p>
                </div>
              </td>
              <td className="col text-center align-middle">
                <button className="btn btn-outline-primary">tabla</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 g-4 pt-3">
        {flagsComponent(0, "Argentina", "./../../../assets/img/flags/ARG.png")}
      </div>
      {show ? (
        <div className="row row-cols-1 row-cols-md-2 g-4 pt-3">
          {leaguesComponent()}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4 pt-3"></div>
      )}
    </div>
  );
};
