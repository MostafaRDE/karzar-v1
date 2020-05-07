"use strict";

const pg_helper = require('../../util/db/psql/pg_help');

class TicketCategoryModel extends pg_helper {
    constructor() {
        super("tickets.categories");
    }
}
class TicketModel extends pg_helper {
    constructor() {
        super("tickets.tickets");
    }
}
class TicketMessagesModel extends pg_helper {
    constructor() {
        super("tickets.messages");
    }
}
class TicketViewModel extends pg_helper {
    constructor() {
        super("ticket._ticket");
    }
}

module.exports = {TicketCategoryModel , TicketMessagesModel , TicketModel , TicketViewModel};
