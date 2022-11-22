import { fi } from "date-fns/locale";
import ServiceContext, { getToken } from "./ServiceContext";

const context = ServiceContext;

export const registerMatch = (match) => {
    context.getToken();
    return context.doPost('match', match);
}

export const getMatch = () => {
    context.getToken();
    return context.doGet('match');
}

export const getMatchById = (matchId) => {
    context.getToken();
    return context.doGet('match/' + matchId);
}

export const getByUser = (userId) => {
    context.getToken();
    return context.doGet('match/page?creatorId=' + userId);
}

export const getNavigation = (userId) => {
    var promise = new Promise((resolve,regect) => {
        getByUser(userId).then(resultMatches => {
            resolve(getMatchNavigation(resultMatches.data));
        });
    });
    return promise;
}

export const getMatchNavigation = (matches) => {
    let navigation = [];
    matches.forEach(element => {
        let navigationItem = {
            to: '/event/' + element.id,
            name: element.matchName,
            sport: element.sport
        }
        navigation.push(navigationItem);
    });

    return navigation;
}

export const getMatchPage = (filter) => {
    context.getToken();
    let filterString = '';
    if(filter.schedule) {
        filterString += 'schedule=' + filter.schedule;
    }
    if(filterString != '') {
        filterString += '&';
    }
    if(filter.sport) {
        filterString += 'sport=' + filter.sport;
    }
    if(filterString != '') {
        filterString += '&';
    }
    if(filter.matchName) {
        filterString += 'matchName=' + filter.matchName;
    }

    return context.doGet('match/page?' + filterString);
}

export const updateMatch = (match) => {
    context.getToken();
    return context.doPut('match', match);
}