import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../../../../routers/AxiosConfig";

import "./WorldCup";

export const WorldCupKnockout = () => {
  
  const [Matchs, setMatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  var Leagues = [];
  var dateNow = new Date().toLocaleDateString();

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      baseURL: "https://v3.football.api-sports.io",
      url: "/fixtures",
      params: {
        league: 1,
        season: "2022",
        round: "Round of 16"
      },
      headers: config.headers,
    })
      .then((response) => {
        setMatch(response.data.response);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  
  Matchs.forEach((e) => {
    Leagues.push(e.league);
  });

  let leaguesMap = Leagues.map((item) => {
    return [item.id, item];
  });

  var leaguesMapArr = new Map(leaguesMap);

  Leagues = [...leaguesMapArr.values()];

  Leagues.sort((a, b) => {
    return a.id - b.id;
  });

  return isLoading ? (
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="container">
      {Leagues.map((l) => {
        return (
          <div className="card-custom-league pt-2 pb-2" key={l.id}>
            <div className="row d-flex justify-content-between">
              {
                Matchs.map((m) => {
                  console.log(m)
                  var dateMatch = new Date(m.fixture.timestamp * 1000).toLocaleDateString();
                  var timeMatchComplete = new Date(m.fixture.timestamp * 1000).toLocaleTimeString();
                  var timeMatchSplited = timeMatchComplete.split(":");
                  var timeMatch = timeMatchSplited[0] + ":" + timeMatchSplited[1];

                  if (m.league.id === l.id) {
                    return (
                      <div
                        className="card border-dark mb-3 size-card mt-4 p-0 card-custom-match"
                        key={m.fixture.id}
                      >
                        <div className="card-header">
                          <img
                            src= { m.league.logo }
                            alt="LogoLiga"
                            className="logoLeague"
                          />
                          <span>
                            { (m.league.name === 'World Cup') ? 'Mundial Qatar 2022' : m.league.name}{" "}-{" "}
                            { (m.league.round === 'Round of 16') ? 'Octavos de Final' : (m.league.round === 'Quarter finals') ? 'Cuartos de Final' : m.league.round}
                          </span>
                        </div>
                        <div className="card-body d-flex">
                          <div className="border-end border-dark col-7 pt-4">
                            <div className="d-flex">
                              <div className="card-text col-11 p-2">
                                <img
                                  src={m.teams.home.logo}
                                  alt="Local"
                                  className="logoIco"
                                />
                                <span className="ms-2">{m.teams.home.name}</span>
                              </div>
                              <div className="card-text p-2">
                                <span>
                                  {(m.goals.home != null) ? m.goals.home : '-'}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex">
                              <div className="card-text col-11 p-2">
                                <img
                                  src={m.teams.away.logo}
                                  alt="Visitante"
                                  className="logoIco"
                                />
                                <span className="ms-2">
                                  {m.teams.away.name}
                                </span>
                              </div>
                              <div className="card-text p-2">
                                <span>
                                  {(m.goals.away != null) ? m.goals.away : '-'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-5"> 
                            <div className="text-center fw-bold">
                              {dateMatch === dateNow ? "Hoy" : dateMatch}
                            </div>
                            <div className="text-center p-2 d-flex  justify-content-center">
                              <div>
                                {
                                  m.fixture.status.short === "NS" ? `Hora: ${timeMatch} hs` :
                                  m.fixture.status.short === "FT" ? `Partido Finalizado.` :
                                  m.fixture.status.short === "SUSP" ? `Partido Suspendido.` :
                                  m.fixture.status.short === "1H" ? `PT - ${m.fixture.status.elapsed}'` :
                                  m.fixture.status.short === "2H" ? `ST - ${m.fixture.status.elapsed}'` : 
                                  m.fixture.status.short === "HT" ? `Entretiempo.` : 
                                  m.fixture.status.short === "ET" ? `Tiempo Extra - ${m.fixture.status.elapsed}'` : 
                                  m.fixture.status.short === "BT" ? `Tiempo Extra - Descanso.` : 
                                  m.fixture.status.short === "P" ? `Penales: ${m.score.penalty.home} - ${m.score.penalty.away} ` : 
                                  "Dato No Disponible"
                                }
                              </div>
                              {
                                m.fixture.status.short === "1H" ||
                                m.fixture.status.short === "2H" ||
                                m.fixture.status.short === "ET" ? 
                                (
                                  <div
                                    className="spinner-grow text-success spinnerCustom"
                                    role="status"
                                  ></div>
                                ) :
                                (
                                  <div className="d-none"></div>
                                )
                              }
                            </div>
                            <div className="text-center pt-2 fw-bold text-decoration-underline">
                              Estadio
                            </div>
                            <div className="text-center pt-2">
                              {m.fixture.venue.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {return null}
                })}
              </div>
            </div>
          );
        })}
    </div>
  )
};
