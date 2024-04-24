import { IRegisteredMessage } from "../interfaces/registeredMessage";

class messageManager {
    private static instance: messageManager;

    static manager() {
        if (!this.instance) {
            this.instance = new messageManager();
        }
        return this.instance
    }
    
    registeredMessages: IRegisteredMessage[] = [];
}

