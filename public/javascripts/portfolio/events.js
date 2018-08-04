((window, document) => {
    class Events {
        constructor() {
        }
        load() {
            console.log('Portfolio Events');
        }
    }

    let events = new Events();
    events.load();
})(window, document);
