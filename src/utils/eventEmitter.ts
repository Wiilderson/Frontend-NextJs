class EventEmitter {
    private events: { [key: string]: Function[] } = {};

    on(event: string, listener: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: string, listener: Function) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event: string, data?: any) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => listener(data));
    }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;