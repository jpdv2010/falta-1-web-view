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
            name: element.matchName
        }
        navigation.push(navigationItem);
    });

    return navigation;
}

export const update = (match) => {
    context.getToken();
    return context.doPut('match', match);
}