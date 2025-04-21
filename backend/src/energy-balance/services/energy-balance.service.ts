import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnergyBalance } from '../schemas/energy-balance.schema';
import { ReeClientService } from './ree-client.service';

@Injectable()
export class EnergyBalanceService {
  constructor(
    @InjectModel(EnergyBalance.name)
    private readonly balanceModel: Model<EnergyBalance>,
    private readonly reeClient: ReeClientService,
  ) {}

  async fetchMissingData({
    start,
    end,
  }: {
    start: Date;
    end: Date;
  }): Promise<void> {
    const existingData = await this.balanceModel
      .find({
        datetime: { $gte: start, $lte: end },
      })
      .exec();

    if (existingData.length === 0) {
      const newData = await this.reeClient.fetchData({ start, end });
      await this.balanceModel.insertMany(newData);
    }
  }

  async getBalances({
    startDate,
    endDate,
    groupId,
  }: {
    startDate: string;
    endDate: string;
    groupId?: string;
  }) {
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T23:59:59Z`);

    await this.fetchMissingData({ start, end });

    const query: any = {
      datetime: { $gte: start, $lte: end },
    };
    if (groupId) query.groupId = groupId;

    return this.balanceModel.find(query).exec();
  }
}
