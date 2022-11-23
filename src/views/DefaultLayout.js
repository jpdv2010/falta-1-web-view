import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import {useNavigate} from 'react-router-dom';
import { getUserByUsername } from '../utils/service/UserService'
import { getNavigation } from '../utils/service/MatchService'
import { useEffect } from 'react';

const DefaultLayout = () => {
  const [navigation, setNavigation] = React.useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    let currentUserName = localStorage.getItem('user-name');        
    let responseUser = getUserByUsername(currentUserName);
    if(responseUser) {
        responseUser.then(userRes => {
            getNavigation(userRes.data.id).then(nav => {
              setNavigation(nav);
            })
        }).catch(error => {
          if(error.response.status == 401) {
            navigate('/login', {untr: true});
          }
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