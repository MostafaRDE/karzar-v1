"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class PubgCharacterModel extends pg_helper {
    constructor() {
        super('pubg.characters')
    }
}

class PubgMapModel extends pg_helper {
    constructor() {
        super('pubg.maps')
    }
}

class PubgTournamentModel extends pg_helper {
    constructor() {
        super('pubg.tournaments')
    }
}

class PubgTournamentPlayerModel extends pg_helper {
    constructor() {
        super('pubg.tournament_players')
    }
}

class PubgTournamentWinnerModel extends pg_helper {
    constructor() {
        super('pubg.tournament_winners_list')
    }
}

module.exports = {PubgCharacterModel, PubgMapModel, PubgTournamentModel, PubgTournamentPlayerModel, PubgTournamentWinnerModel};
