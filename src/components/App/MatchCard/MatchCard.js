import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../../../routers/AxiosConfig";

import "./MatchCard.css"

export const MatchCard = () => {

  const [Matchs, setMatch] = useState([]);

  var dateNow = new Date().toLocaleDateString();

  // useEffect(() => {
  //   axios
  //     .get(`https://v3.football.api-sports.io/fixtures?live=all`, config)
  //     .then((response) => {
  //       console.log(response)
  //       setMatch(response.data.response);
  //       console.log(response.data.response)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    axios({
        method: 'get',
        baseURL: 'https://v3.football.api-sports.io',
        url: '/fixtures',
        params: {
          ids: '863377-830742'
        },
        headers: config.headers,
      })
      .then((response) => {
        console.log(response)
        setMatch(response.data.response);
        console.log(response.data.response)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        {Matchs.map((m) => {
          var dateMatch = new Date(m.fixture.timestamp * 1000).toLocaleDateString();
          var timeMatchComplete = new Date(m.fixture.timestamp * 1000).toLocaleTimeString();
          var timeMatchSplited = timeMatchComplete.split(":")
          var timeMatch = timeMatchSplited[0] + ":" + timeMatchSplited[1]
          
          return (
              <div className="card border-dark mb-3 size-card mt-4 p-0" key={m.fixture.id}>
                <div className="card-header">
                  <img 
                    src={
                      (m.league.name.includes("Primera Nacional")) ? '../assets/img/logos/BNacional.png' : 
                      (m.league.name.includes("Liga Profesional Argentina")) ? '../assets/img/logos/ArgA.png' : 
                      (m.league.logo)
                    } 
                    className="logoLeague" alt="LogoLiga"
                  />
                  <span>
                    {
                      m.league.name
                    } {
                      (m.league.name.includes(m.league.country)) ? '' : (m.league.country)
                    } - {
                      (m.league.round.includes('Regular Season')) ? m.league.round.replace("Regular Season -", "Temporada Regular / Fecha") : 
                      (m.league.round.includes('2nd Phase')) ? m.league.round.replace("2nd Phase", "2da Fase /").replace("-", "Fecha ") : 'Nada'
                    }
                  </span>
                </div>
                <div className="card-body text-dark d-flex">
                  <div className="border-end col-8">
                    <div className="d-flex">
                      <div className="card-text col-11 p-2">
                        <img src={m.teams.home.logo} className="logoIco" alt="Local" />
                        <span className="ms-2">{m.teams.home.name}</span>
                      </div>
                      <div className="card-text p-2">
                        <span>{m.goals.home}</span>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="card-text col-11 p-2">
                        <img src={m.teams.away.logo} className="logoIco" alt="Visitante" />
                        <span className="ms-2 ">{m.teams.away.name}</span>
                      </div>
                      <div className="card-text p-2">
                        <span>{m.goals.away}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="text-center p-2">{ (dateMatch === dateNow) ? "Hoy" : dateMatch }</div>
                    <div className="text-center p-2 d-flex  justify-content-center">
                      <div>
                        { 
                          (m.fixture.status.short === "NS") ? `Hora: ${ timeMatch } hs` :
                          (m.fixture.status.short === "FT") ? `Partido Finalizado.` : 
                          (m.fixture.status.short === "SUSP") ? `Partido Suspendido.` :
                          (m.fixture.status.short === "1H") ? `PT - ${m.fixture.status.elapsed}'` :
                          (m.fixture.status.short === "2H") ? `ST - ${m.fixture.status.elapsed}'` :
                          (m.fixture.status.short === "HT") ? `Entretiempo.` :
                          (m.fixture.status.short === "ET") ? `Tiempo Extra - ${m.fixture.status.elapsed}'` :
                          (m.fixture.status.short === "BT") ? `Tiempo Extra - Descanso.` :
                          (m.fixture.status.short === "P") ? `Penales: ${m.score.penalty.home} - ${m.score.penalty.away} ` :
                          'Dato No Disponible'
                        }
                      </div>
                      {
                        (m.fixture.status.short === "1H" || m.fixture.status.short === "2H" || m.fixture.status.short === "ET") 
                        ? <div className="spinner-grow text-success spinnerCustom" role="status"></div> : <div className="d-none"></div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};
