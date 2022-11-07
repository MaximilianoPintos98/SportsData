import axios from 'axios';
import React, { useEffect } from 'react'
import { config } from '../../../../routers/AxiosConfig';

export const WorldCupFixture = () => {
  useEffect(() => {
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
        console.log(response.data.response)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex pb-5">
          <div className="card text-bg-light m-2">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Light card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="card text-bg-light m-2">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Light card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="card text-bg-light m-2">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Light card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
      </div>
    </div>
  )
}
