import ServiceContext from "./ServiceContext";

class ParticipantService {
    static context = ServiceContext;

    static registerParticipant = (participant) => {
        this.context.getToken();
        return this.context.doPost('participant', participant);
    }

    static delete = (id) => {
        this.context.getToken();
        return this.context.doDelete('participant', id);
    }

}

export default ParticipantService