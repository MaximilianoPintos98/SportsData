import axios from "axios";
import React, { useEffect, useState } from "react";

import { config } from "../../../../routers/AxiosConfig";
import { CountryTraslation } from "../../../../shared/Traslations";

import "./WorldCup.css";

export const WorldCupStandings = () => {
  const [standingsAll, setStandingsAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      baseURL: "https://v3.football.api-sports.io",
      url: "/standings",
      params: {
        league: 1,
        season: "2022",
      },
      headers: config.headers,
    })
      .then((response) => {
        setStandingsAll(response.data.response[0].league.standings);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading ? (
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  ) : (
    standingsAll.map((standings, idx) => {
      var group = standings[0].group.split(" ");

      return (
        <div className="card mb-5 mt-5" key={idx}>
          <span className="card-header headerCustom">Grupo {group[1]}</span>
          <div className="table-responsive">
            <table className="table table-bordered tableLight mb-0">
              <thead>
                <tr>
                  <th className="col-0">#</th>
                  <th className="col-4">Equipo</th>
                  <th className="col">Pts</th>
                  <th className="col">PJ</th>
                  <th className="col">PG</th>
                  <th className="col">PE</th>
                  <th className="col">PP</th>
                  <th className="col">GF</th>
                  <th className="col">GC</th>
                  <th className="col">DIF</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {standings.map((s) => {
                  for (const [key, value] of Object.entries(
                    CountryTraslation
                  )) {
                    if (s.team.name == key) s.team.name = value;
                  }
                  return (
                    <tr key={s.rank}>
                      <th>{s.rank}</th>
                      <td>
                        <div className="d-flex">
                          <img
                            src={`../assets/icons/${s.team.name}.png`}
                            alt={s.team.name}
                            className="logoIco"
                          />
                          <span className="ps-3">{s.team.name}</span>
                        </div>
                      </td>
                      <td>{s.points}</td>
                      <td>{s.all.played}</td>
                      <td>{s.all.win}</td>
                      <td>{s.all.draw}</td>
                      <td>{s.all.lose}</td>
                      <td>{s.all.goals.for}</td>
                      <td>{s.all.goals.against}</td>
                      <td>{s.goalsDiff}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    })
  );
};
