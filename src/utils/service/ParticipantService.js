import ServiceContext from "./ServiceContext";

const context = ServiceContext;

export const registerParticipant = (participant) => {
    context.getToken();
    return context.doPost('participant', participant);
}

export const deleteParticipant = (id) => {
    context.getToken();
    return context.doDelete('participant', id);
}