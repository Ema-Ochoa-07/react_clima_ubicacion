import './styles/Error404.css'
import React from 'react'

const Error404 = () => {
  return (
    <div className='cont'>
        <h1>Page Not Found</h1>
        <p className='zoom-area'> Please activate your <b>Location</b> </p>

        <section className='error-container'>
            <span className='four'><span className='screen-reader-text'>4</span></span>
            <span className='zero'><span className='screen-reader-text'>0</span></span>
            <span className='four'><span className='screen-reader-text'>4</span></span>
        </section>
    </div>
  )
}

export default Error404