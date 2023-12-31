import moment from "moment"


const Thread = ({user, filteredThreads, setOpenPopUp, getThreads, setInteractingThread}) => {

  const timePassed = moment().startOf('day').fromNow(filteredThreads.timestamp)

  const handleClick = () => {
    setOpenPopUp(true)
    setInteractingThread(filteredThreads)
  }

  const postLike = async() => {
    const hasBeenLikedByUser = filteredThreads.likes.some( like => like.user_uuid === user.user_uuid)
    if (!hasBeenLikedByUser) {
      filteredThreads.likes.push({
        user_uuid: user.user_uuid
      })
      try {
        const response = await fetch(`https://localhost:3000/threads/${filteredThreads.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredThreads)
      })
      const result = await response.json()
      getThreads()
      } catch (error) {
        console.error(error)
      }
    }
  }

    return (
      <article className="feed-card">
        <div className="text-container">
          <div>
            <div className="img-container">
              <img src={user.img} alt="avatar" />
            </div>
            <div>
              <p><strong>{user.handle}</strong></p>
              <p>{filteredThreads.text}</p>
            </div>
          </div>
          <p className="sub-text">{timePassed}</p>
        </div>
        <div className="icons">
          <svg onClick={postLike} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fill-rule="nonzero"/></svg>
          <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.685 10 8.213 0 5.04-5.146 8.159-9.913 8.159-2.027 0-3.548-.439-4.548-.712l-4.004 1.196 1.252-2.9c-.952-1-2.787-2.588-2.787-5.743 0-4.528 4.486-8.213 10-8.213zm0-2c-6.628 0-12 4.573-12 10.213 0 2.39.932 4.591 2.427 6.164l-2.427 5.623 7.563-2.26c1.585.434 3.101.632 4.523.632 7.098.001 11.914-4.931 11.914-10.159 0-5.64-5.372-10.213-12-10.213z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
        </div>
        <p className="sub-text"><span onClick={handleClick}>X Replies</span> • <span>{filteredThreads.likes.length} Likes</span></p>
      </article>
    )
  }
  
  export default Thread
  