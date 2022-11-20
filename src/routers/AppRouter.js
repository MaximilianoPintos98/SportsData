import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from '../components/App/Home/Home'
import { ErrorPage } from '../components/ui/ErrorPage'
import { Navbar } from '../components/ui/navbar/Navbar'
import { LeagueTable } from '../components/App/Football/LeagueTable/LeagueTable'
import { WorldCup } from '../components/App/Football/WorldCup/WorldCup'
import { Football } from '../components/App/Football/FootballForFlags/Football'
import { MatchCard } from '../components/App/Football/MatchCard/MatchCard'


export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<WorldCup />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/football" element={<Football />} />
          <Route exact path="/partidos" element={<MatchCard />} />
          <Route exact path="/partidos/:league/:leagueId/posiciones" element={<LeagueTable />} />
          <Route exact path="/worldcup" element={<WorldCup />} />

          <Route path="*" element={ <ErrorPage /> }/>
        </Routes>
      </div>
    </Router>
  )
}
