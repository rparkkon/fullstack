import React from 'react';
import Otsikko from '../components/Otsikko'

const LoginForm = ({handleSubmit, handleChange, username, password  }) => {
return(
    <div>
        <Otsikko  nimi='Log in to application'/>

        <form onSubmit={handleSubmit}>
        <div>
            username
            <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            />
        </div>
        <div>
            password
            <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            />
        </div>
        <button type="submit">login</button>
        </form>
    </div>
    )
} 
export default LoginForm