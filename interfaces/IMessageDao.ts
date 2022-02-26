import Message from "../models/Message";

export default interface IMessageDao {
    send(sendid: string, receiveid: string, msg: Message): Promise<Message>;

    delete(msgid: string): Promise<any>;

    viewSent(uid: string): Promise<Message[]>;

    viewReceived(uid: string): Promise<Message[]>;
}