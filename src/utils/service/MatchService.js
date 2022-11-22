import ServiceContext from "./ServiceContext";

class MatchService {
    static context = ServiceContext;

    static registerMatch = (match) => {
        this.context.getToken();
        return this.context.doPost('match', match);
    }

    static getMatch = () => {
        this.context.getToken();
        return this.context.doGet('match');
    }

    static getMatchById = (matchId) => {
        this.context.getToken();
        return this.context.doGet('match/' + matchId);
    }

    static getByUser = (userId) => {
        this.context.getToken();
        return this.context.doGet('match/page?creatorId=' + userId);
    }

    static getNavigation = (userId) => {
        var promise = new Promise((resolve,regect) => {
            this.getByUser(userId).then(resultMatches => {
                resolve(this.getMatchNavigation(resultMatches.data));
            });
        });
        return promise;
    }

    static getMatchNavigation = (matches) => {
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

    static update = (match) => {
        this.context.getToken();
        return this.context.doPut('match', match);
    }
}

export default MatchService