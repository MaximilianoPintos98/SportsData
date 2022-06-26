import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from '../components/App/Home/Home'
import { Football } from '../components/App/football/Football'
import { ErrorPage } from '../components/ui/ErrorPage'
import { Navbar } from '../components/ui/navbar/Navbar'


export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/football" element={<Football />} />

          <Route path="*" element={ <ErrorPage /> }/>
        </Routes>
      </div>
    </Router>
  )
}
