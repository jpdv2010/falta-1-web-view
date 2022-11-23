import { doGet, doPost, getHeaderAutenticated, doPut } from "./ServiceContext";

export const registerMatch = (match) => {
    return doPost('match', match, getHeaderAutenticated());
}

export const getMatch = () => {
    return doGet('match', getHeaderAutenticated());
}

export const getMatchById = (matchId) => {
    return doGet('match/' + matchId, getHeaderAutenticated());
}

export const getByUser = (userId) => {
    return doGet('match/page?creatorId=' + userId, getHeaderAutenticated());
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
    if(filterString != '') {
        filterString += '&';
    }
    filterString += 'page=' + filter.page;
    if(filterString != '') {
        filterString += '&';
    }
    filterString += 'size=' + filter.size;

    return doGet('match/page?' + filterString, getHeaderAutenticated());
}

export const updateMatch = (match) => {
    return doPut('match', match, getHeaderAutenticated());
}

export const getMatchCount = (filter) => {
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

    return doGet('match/count?' + filterString, getHeaderAutenticated());
}