import axios from "axios";
import React, { useEffect, useState } from "react";

import { config } from "../../../../routers/AxiosConfig";

import "./WorldCup.css"

export const WorldCupStandings = () => {
  const [dataLeague, setDataLeague] = useState([]);
  const [standingsAll, setStandingsAll] = useState([]);

  useEffect(() => {
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
        setDataLeague(response.data.response[0].league);
        setStandingsAll(response.data.response[0].league.standings);
      })
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <div>
      {standingsAll.map((standings, idx) => {
        return (
          <table className="table table-bordered text-center tableLight" key={idx}>
            <thead >
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
            <tbody className="table-group-divider ">
              {standings.map((s) => {
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
        )
      })}
    </div>
  );
};
