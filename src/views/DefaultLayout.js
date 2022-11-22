import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import {useLocation, useNavigate} from 'react-router-dom';
import UserService from '../utils/service/UserService'
import MatchService from '../utils/service/MatchService'
import { useEffect } from 'react';

const DefaultLayout = () => {
  const [navigation, setNavigation] = React.useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    let currentUserName = localStorage.getItem('user-name');        
    let responseUser = UserService.getByUsername(currentUserName);
    if(responseUser) {
        responseUser.then(userRes => {
            MatchService.getNavigation(userRes.data.id).then(nav => {
              setNavigation(nav);
            })
        })
    } else {
      navigate('/login');
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