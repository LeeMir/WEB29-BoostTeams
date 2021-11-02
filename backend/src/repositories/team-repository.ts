import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';

@EntityRepository(Team)
export default class TeamUserRepository extends Repository<Team> {}