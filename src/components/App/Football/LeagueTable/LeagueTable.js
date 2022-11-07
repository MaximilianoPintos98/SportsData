import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../../routers/AxiosConfig";

import "./LeagueTable.css";

export const LeagueTable = () => {
  var { leagueId } = useParams();

  const [dataLeague, setDataLeague] = useState([]);

  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      baseURL: "https://v3.football.api-sports.io",
      url: "/standings",
      params: {
        season: "2022",
        league: leagueId,
      },
      headers: config.headers,
    })
    .then((response) => {
      setDataLeague(response.data.response[0].league);
      setStandings(response.data.response[0].league.standings[0]);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="d-flex border-bottom border-dark pb-2 pt-2">
        <div className="circle">
          <img
            src={
              dataLeague.name === "Primera Nacional" ? "../../../../../assets/img/logos/BNacional.png" : 
              dataLeague.name === "Liga Profesional Argentina" ? "../../../../../assets/img/logos/ArgA.png" : 
              dataLeague.logo
            }
            alt={dataLeague.name}
            className="logoLeague"
          />
        </div>
        <div className="card-body ">
          <h5 className="card-title p-3 ">
            {dataLeague.name} {dataLeague.season} | {dataLeague.country} | Posiciones
          </h5>
        </div>
      </div>
      <div className="pt-4">
        <table className="table table-bordered text-center custom">
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
              <th className="col-2">Últimos 5</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {standings.map((s) => {
              console.log(s)
              let arr  = []
              if (s.form != null) {
                arr = s.form.split('')
              }
              return (
                <tr key={s.rank}>
                  <th scope="row">{s.rank}</th>
                  <td>
                    <div className="d-flex">
                      <img
                        src={s.team.logo}
                        alt={s.team.name}
                        className="logoIco"
                      />
                      <span className="ps-2">{s.team.name}</span>
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
                  <td>
                    {
                      arr.map((a, i) => {
                        return (
                        (a === "W") ? <i className="bi bi-bookmark-check-fill text-success" key={i}></i> : 
                        (a === "L") ? <i className="bi bi-bookmark-x-fill text-danger" key={i}></i> :
                        <i className="bi bi-bookmark-dash-fill text-secondary" key={i}></i>
                      )})
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
