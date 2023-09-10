const Notification = ({ message, msgType }) => {
  
    if (message === null) {
      return null
    }
  
    else if(msgType === "success") {
       return (
          <div className='success-msg'>
            {message}
          </div>
       )
    }

    else if (msgType === "error") {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
    
  }

  export default Notification