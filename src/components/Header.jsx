
const Header = () => {
    return (
      <header>
        <div className="info-container">
          <div className="user-info-container">
            <h1>Username</h1>
            <p>Handle <span className="threads-info">threads.net</span></p>
          </div>
          <div className="img-container">
            <img src="" alt="profile picture"/>
          </div>
        </div>
        <p>bio</p>
        <div className="sub-info-container">
          <p className="sub-text">X Followers • <a href="#">link</a></p>
        </div>
        <button className="primary" onClick={() => navigator.clipboard.writeText("URL")}>Share Profile</button>
        <div className="button-container">
          <button className="current">Threads</button>
          <button>Replies</button>
        </div>
      </header>
    )
  }
  
  export default Header
  