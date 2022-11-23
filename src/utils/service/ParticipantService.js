import { doDelete, doGet, doPost, doPut, getHeaderAutenticated } from "./ServiceContext";

export const registerParticipant = (participant) => {
    return doPost('participant', participant, getHeaderAutenticated());
}

export const deleteParticipant = (id) => {
    return doDelete('participant', id, getHeaderAutenticated());
}

export const getParticipantNavigation = (username) => {
    var promise = new Promise((resolve,regect) => {
        doGet('participant/page?username=' + username + '&status=ACCEPT', getHeaderAutenticated()).then(result => {
            let navigation = [];
            result.data.forEach(element => {
                let navigationItem = {
                    to: '/event/' + element.matchid,
                    name: element.matchname,
                    sport: element.sport
                }
                navigation.push(navigationItem);
            });

            resolve(navigation);
        });
    });
    return promise;
}

export const getPendentParticipants = (username) => {
        return doGet('participant/page?username=' + username + '&status=PENDENT', getHeaderAutenticated());
}

export const updateParticipant = (participant) => {
    return doPut('participant', participant, getHeaderAutenticated());
}