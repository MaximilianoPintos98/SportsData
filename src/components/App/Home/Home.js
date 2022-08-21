import axios from "axios";
import React, { useEffect } from "react";
import { MatchCard } from "../MatchCard/MatchCard";

import { config } from "./../../../routers/AxiosConfig";

import "./Home.css";

export const Home = () => {
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://v3.football.api-sports.io/fixtures`,
  //       config
  //     )
  //     .then((response) => {
  //       console.log(response.data.response);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="container">
      <MatchCard />
    </div>
  );
};
