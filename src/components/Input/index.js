import React from 'react'
import './styles.css'

const Input = ({ label, state, setName, placeholder, type }) => {
    return (
        <div className='input-wrapper' >
            <p className='label-input'>{label}</p>
            <input
                type={type}
                value={state}
                placeholder={placeholder}
                onChange={(e) => setName(e.target.value)}
                className='custom-input'
            />

        </div>
    )
}

export default Input






