import PopUpThread from "./popupthread"
import ThreadInput from "./ThreadInput"

const PopUp = ({ user, setOpenPopUp, popUpFeedThreads, text, setText, postThread}) => {
    return (
      <div className="popup">
      <p onClick={() => setOpenPopUp(false)}>X</p>
        {popUpFeedThreads?.map(popUpFeedThread => <PopUpThread 
        popUpFeedThread={popUpFeedThread} 
        key={popUpFeedThread.id} 
        />
        )}
        <ThreadInput
        user={user}
        text={text}
        setText={setText}
        postThread={postThread} />
      </div>
    )
  }
  
  export default PopUp
  