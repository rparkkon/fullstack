import React from 'react';

//2.18 puhelinluettelo osa 11 parempi virhe
const Notification = ({ message, classType }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={classType}>
      {message}
    </div>
  )
}

export default Notification