import { useState, useEffect } from "react"

import Nav from "./components/nav"
import Header from "./components/header"
import Feed from "./components/feed"
import PopUp from "./components/popup"
import WriteIcon from './components/WriteIcon'


const App = () => {
  const [user, setUser] = useState(null)
  const [threads, setThreads] = useState(null)
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true)
  const [ filteredThreads, setFilteredThreads] = useState(null)
  const [openPopUp, setOpenPopUp] = useState(false)
  const [interactingThread, setInteractingThread] = useState(null)
  const [popUpFeedThreads, setPopUpFeedThreads] = useState(null)
  const [text, setText] = useState("")
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

  const getThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`)
      const data = await response.json()
      setThreads(data)
    } catch (err) {
      console.error(err)
    }
  }

  const getThreadsFeed = () => {
    if(viewThreadsFeed) {
      const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
      setFilteredThreads(standAloneThreads)
    }
    if(!viewThreadsFeed) {
      const replyThreads = threads?.filter(thread => thread.reply_to !== null)
      setFilteredThreads(replyThreads)
    }
  }

  const getReplies = async() => {
    try {
      const response = await fetch (`http://localhost:3000/threads?reply_to=${interactingThread?.id}`)
      const data = await response.json()
      setPopUpFeedThreads(data)
    } catch (error) {
      console.error(error)
    }
  }

  const postThread = async() => {
    const thread = {
      "timestamp": new Date(),
      "thread_from": user.user_uuid,
      "thread_to": user.user_uuid || null,
      "reply_to": interactingThread?.id || null,
      "text": text,
      "likes": []
  }

    try{
      const response = await fetch("http://localhost:3000/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thread)
      })
      const result = await response.json()
      getThreads()
      getReplies()
      setText("")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getReplies()
  }, [interactingThread])

  useEffect(() => {
    getUser()
    getThreads()
  }, [])

  useEffect(() => {
    getThreadsFeed()
  },[user, threads, viewThreadsFeed])
  
  
  return (
    <>
      {user && <div className="app">
        <Nav url={user.instagram} />
        <Header
        user={user}
        viewThreadsFeed={viewThreadsFeed}
        setViewThreadsFeed={setViewThreadsFeed} />
        <Feed
        user={user}
        filteredThreads={filteredThreads}
        setOpenPopUp={setOpenPopUp}
        getThreads={getThreads}
        setInteractingThread={setInteractingThread}
         />
        {openPopUp && <PopUp
        user={user}
        setOpenPopUp={setOpenPopUp}
        popUpFeedThreads={popUpFeedThreads}
        text={text}
        setText={setText}
        postThread={postThread}
         />}
        <div onClick={() => setOpenPopUp(true)}>
          <WriteIcon />
        </div>
      </div>}
      
    </>
  )
}

export default App
