import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import {useLocation} from 'react-router-dom';
import UserService from '../utils/service/UserService'
import MatchService from '../utils/service/MatchService'
import { useEffect } from 'react';

const DefaultLayout = () => {
  const { state } = useLocation();
  const [navigation, setNavigation] = React.useState(state?.nav);

  useEffect(() => {
    let currentUserName = localStorage.getItem('user-name');        
    let responseUser = UserService.getByUsername(currentUserName);
    if(responseUser) {
        responseUser.then(userRes => {
            localStorage.setItem('user-name', userRes.data.username);
            MatchService.getNavigation(userRes.data.id).then(nav => {
                state?.nav? setNavigation(state.nav) : setNavigation(navigation);
                state?.addNav? navigation.push(state.add) : () => {};
            })
        })
    }
  });

  return (
    <div>
      <AppSidebar navigation={navigation}/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout