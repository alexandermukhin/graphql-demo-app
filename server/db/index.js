import values from 'lodash/values';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import fs from 'fs';
import { GraphQLError }from 'graphql';

const DB = JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf8'));

class BaseClass {
    constructor(entities) {
        this.entities = entities;
    }

    getOne(id) {
        return this.entities[id];
    }

    getList(arr, args) {
        const response = arr ? arr.map((id) => this.getOne(id)) : values(this.entities);

        return isEmpty(args) ? response : filter(response, args);
    }

    findByName(name) {
        return filter(values(this.entities), (entity) => entity.name.indexOf(name) !== -1);
    }
}

class Leagues extends BaseClass {

}
class Teams extends BaseClass {
    addPlayerToTeam(teamId, playerId) {
        this.entities[teamId].players.push(parseInt(playerId, 10));
    }

    removePlayerFromTeam(teamId, playerId) {
        const index = this.entities[teamId].players.indexOf(parseInt(playerId, 10));

        if (index !== -1) {
            this.entities[teamId].players.splice(index, 1);
        }
    }
}
class Stadiums extends BaseClass {

}
class Managers extends BaseClass {

}
class Players extends BaseClass {
    static getID(arr) {
        return arr.length + 401;
    }

    static checkAccess(id) {
        return parseInt(id, 10) <= 408;
    }

    add(player, args) {
        const id = Players.getID(values(this.entities));

        this.entities[id] = Object.assign(args.player, { id });

        teams.addPlayerToTeam(args.player.team, id);

        return this.getOne(id);
    }

    update(player, args) {
        if (Players.checkAccess(args.player.id)) {
            return new GraphQLError('Access denied!');
        }

        if (!this.entities[args.player.id]) {
            return new GraphQLError('No player found!');
        }

        if (args.player.team !== this.entities[args.player.id].team) {
            teams.removePlayerFromTeam(this.entities[args.player.id].team, args.player.id);
            teams.addPlayerToTeam(args.player.team, args.player.id);
        }

        this.entities[args.player.id] = Object.assign(this.entities[args.player.id], args.player);

        return this.getOne(args.player.id);
    }

    remove(player, args) {
        if (Players.checkAccess(args.id)) {
            return new GraphQLError('Access denied!');
        }

        if (!this.entities[args.id]) {
            return new GraphQLError('No player found!');
        }

        const response = this.entities[args.id];

        teams.removePlayerFromTeam(response.team, response.id);

        delete this.entities[args.id];

        return response;
    }
}

export const leagues  = new Leagues(DB.leagues);
export const teams    = new Teams(DB.teams);
export const stadiums = new Stadiums(DB.stadiums);
export const managers = new Managers(DB.managers);
export const players  = new Players(DB.players);
