import React, { Fragment } from 'react'

const NotFound = () => {
  return (
    <Fragment>
        <h1 className="display-4">
          <span className="text-danger">404 Page Not Found</span>
        </h1>
        <p className='lead'>Sorry, that page does not exist</p>
    </Fragment>
  )
}

export default NotFound;