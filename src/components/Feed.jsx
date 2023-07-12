import Thread from "./thread"

const Feed = ({filteredThreads, user, setOpenPopUp, getThreads}) => {
    return (
      <div className="feed">
        {filteredThreads?.map(filteredThreads => <Thread setOpenPopUp={setOpenPopUp} key={filteredThreads.id} user={user} filteredThreads={filteredThreads} getThreads={getThreads}/>)}
      </div>
    )
  }
  
  export default Feed
  