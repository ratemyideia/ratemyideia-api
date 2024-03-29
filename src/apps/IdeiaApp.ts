import { v4 as uuid } from 'uuid';

import { RateMyIdeiaModel } from '../database/Ideias/ideias.model';
import { Ideia, VotesDto } from '../interfaces/Ideia';

class IdeiaApp {
  async create(ideia: Ideia): Promise<Ideia> {
    await RateMyIdeiaModel.create(ideia);
    return ideia;
  }

  async list(userId: string): Promise<Ideia[]> {
    const list = await RateMyIdeiaModel.find({ userId });
    return list;
  }

  async manageVotes(dto: VotesDto): Promise<Ideia> {
    const { id, upvotes, downvotes } = dto;
    const ideia = await RateMyIdeiaModel.findOneAndUpdate(
      { id },
      { upvotes, downvotes },
      { new: true }
    );

    return ideia;
  }

  async delete(id: string): Promise<void> {
    console.debug(`[IdeiaApp] >> Deleting ideia with id ${id}`);
    await RateMyIdeiaModel.deleteOne({ id });
  }

  ideiaTemplate(userId: string, text: string): Ideia {
    return {
      createdAt: new Date(),
      downvotes: 0,
      upvotes: 0,
      id: uuid(),
      text,
      userId,
    };
  }
}

export const ideiaApp = new IdeiaApp();
