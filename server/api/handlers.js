import DB from '../lib/super-amazing-nosql-cassandra-rethink-mongo-hyper-turbo-shard-cdrom-database';

export default {
  teams: {
    '$get': (req, res) => res.send(DB.teams)
  },
  vote: {
    '{teamName}': {
      '$get': (req, res) => {
        let team;
        // validate the teamName. I know there is a way to do this with swaggerize directly.
        if (team = DB.teams.find(team => team.name === req.params.teamName)) {
          team.votes += 1;
          res.sendStatus(204);
        } else {
          res.status(404).send({
            code: 'lol',
            message: 'invalid team name'
          });
        }
      }
    }
  }
};

module.exports = exports['default'];
