import React from 'react'
import { useSelector } from 'react-redux';
import { getLoggedInUserName } from '../../utils/helpers';

const Home = () => {

  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <h1>Home</h1>
      {currentUser.email}
      <h1> Welcome {getLoggedInUserName(currentUser)} </h1>
      {/* <h3>{getLoggedInUserEmail(currentUser)}</h3> */}
    </div>
  )
}

export default Home
