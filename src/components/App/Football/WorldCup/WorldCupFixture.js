import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../../../../routers/AxiosConfig";
import { CountryTraslation } from "../../../../shared/Traslations";

export const WorldCupFixture = () => {
  const [match, setMatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var dateNow = new Date().toLocaleDateString();
  var removeMatch = match.splice(2, 1);
  var matchForDate = {};
  var jsonData2 = [];

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      baseURL: "https://v3.football.api-sports.io",
      url: "/fixtures",
      params: {
        league: 1,
        season: "2022",
      },
      headers: config.headers,
    })
      .then((response) => {
        setMatch(response.data.response);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  match.unshift(removeMatch[0]);

  match.sort((a, b) => {
    if (a.fixture.date.split("T")[0] < b.fixture.date.split("T")[0]) {
      return -1;
    } else if (a.fixture.date.split("T")[0] > b.fixture.date.split("T")[0]) {
      return 1;
    } else {
      return 0;
    }
  });

  match.forEach((f) => {
    if (f) {
      var dateMatch = f.fixture.date.split("T")[0];

      if (!matchForDate[dateMatch]) matchForDate[dateMatch] = [];
      matchForDate[dateMatch].push(f);
    }
  });

  for (const [key, value] of Object.entries(matchForDate)) {
    jsonData2.push([key, value]);
  }
  return isLoading ? (
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="card">
      {jsonData2.map((jd, idx) => {
        var date = new Date(jd[0] + "T00:00:00");
        var options = { weekday: "long", month: "numeric", day: "numeric" };
        date = date.toLocaleDateString("es-ES", options);
        return (
          <div key={idx}>
            <div className="card-header headerCustom">
              Fase de Grupos - {date}
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-2 ">
              {jd[1].map((d, i) => {
                var dateMatch = new Date(
                  d.fixture.timestamp * 1000
                ).toLocaleDateString();
                var timeMatchComplete = new Date(
                  d.fixture.timestamp * 1000
                ).toLocaleTimeString();
                var timeMatchSplited = timeMatchComplete.split(":");
                var timeMatch = timeMatchSplited[0] + ":" + timeMatchSplited[1];

                for (const [key, value] of Object.entries(CountryTraslation)) {
                  if (d.teams.away.name === key) d.teams.away.name = value;
                  if (d.teams.home.name === key) d.teams.home.name = value;
                }

                return (
                  <div className="col " key={i}>
                    <div className="card h-100 tableLight">
                      <div className="d-flex">
                        <div className="border-end border-dark col-8 customText">
                          <div className="d-flex">
                            <div className="col pt-2">
                              <img
                                src={d.teams.home.logo}
                                alt="Local"
                                className="logoIco"
                              />
                              <span className="ms-2">{d.teams.home.name}</span>
                            </div>
                            <div className="col pt-2 text-center">
                              <span>{d.goals.home ? d.goals.home : "0"}</span>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="col pt-2">
                              <img
                                src={d.teams.away.logo}
                                alt="Visitante"
                                className="logoIco"
                              />
                              <span className="ms-2">{d.teams.away.name}</span>
                            </div>
                            <div className="col pt-2 text-center">
                              <span>{d.goals.away ? d.goals.away : "0"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="text-center p-2">
                            {dateMatch === dateNow ? "Hoy" : dateMatch}
                          </div>
                          <div className="text-center p-2 d-flex  justify-content-center">
                            <div>
                              {d.fixture.status.short === "NS"
                                ? `Hora: ${timeMatch} hs`
                                : d.fixture.status.short === "FT"
                                ? `Partido Finalizado.`
                                : d.fixture.status.short === "SUSP"
                                ? `Partido Suspendido.`
                                : d.fixture.status.short === "1H"
                                ? `PT - ${d.fixture.status.elapsed}'`
                                : d.fixture.status.short === "2H"
                                ? `ST - ${d.fixture.status.elapsed}'`
                                : d.fixture.status.short === "HT"
                                ? `Entretiempo.`
                                : d.fixture.status.short === "ET"
                                ? `Tiempo Extra - ${d.fixture.status.elapsed}'`
                                : d.fixture.status.short === "BT"
                                ? `Tiempo Extra - Descanso.`
                                : d.fixture.status.short === "P"
                                ? `Penales: ${d.score.penalty.home} - ${d.score.penalty.away} `
                                : "Dato No Disponible"}
                            </div>
                            {d.fixture.status.short === "1H" ||
                            d.fixture.status.short === "2H" ||
                            d.fixture.status.short === "ET" ? (
                              <div
                                className="spinner-grow text-success spinnerCustom"
                                role="status"
                              ></div>
                            ) : (
                              <div className="d-none"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
