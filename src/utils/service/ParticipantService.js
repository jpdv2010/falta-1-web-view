import { doDelete, doPost, getHeaderAutenticated } from "./ServiceContext";

export const registerParticipant = (participant) => {
    return doPost('participant', participant, getHeaderAutenticated());
}

export const deleteParticipant = (id) => {
    return doDelete('participant', id, getHeaderAutenticated());
}