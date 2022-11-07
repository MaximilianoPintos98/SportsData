import React from 'react'

import { WorldCupStandings } from './WorldCupStandings';

import "./WorldCup.css"
import { WorldCupFixture } from './WorldCupFixture';

export const WorldCup = () => {
  // useEffect(() => {
  //   axios({
  //       method: 'get',
  //       baseURL: 'https://v3.football.api-sports.io',
  //       url: '/fixtures',
  //       params: {
  //         league: 1,
  //         season: '2022'
  //       },
  //       headers: config.headers,
  //     })
  //     .then((response) => {
  //       console.log(response.data.response)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div>
      <img src="../assets/img/banner/qatar222.png" className="w-100" alt="banner"/>
      <div className="ps-5 pe-5 pt-3 text-center">
        <div className="row gy-5">
          <div className="col-5">
            <WorldCupStandings/>
          </div>
          <div className="col-7 p-2">
            <WorldCupFixture/>
          </div>
        </div>
      </div>
    </div>
  )
}
