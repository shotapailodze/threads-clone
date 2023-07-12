import { useState, useEffect } from "react"

import Nav from "./components/nav"
import Header from "./components/header"
import Feed from "./components/feed"
import PopUp from "./components/popup"


const App = () => {
  const [user, setUser] = useState(null)
  const userId = "43de3bf2-63ed-47e6-9010-f68f9684bcd4"

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
      const data = await response.json()
      setUser(data[0])
    } catch (err) {
      console.error(err);
    }

  }
  return (
    <div className="app">
      <Nav />
      <Header />
      <Feed />
      {/* <PopUp /> */}
    </div>
  )
}

export default App
