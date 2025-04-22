import { FilterQuery, Model } from 'mongoose';
import { Frontera } from '../schemas/frontier-schema';
import { ReeClientService } from './ree-client.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FronteraService {
  private readonly logger = new Logger(ReeClientService.name);
  constructor(
    @InjectModel(Frontera.name)
    private readonly fronteraModel: Model<Frontera>,
    private readonly reeClient: ReeClientService,
  ) {}

  private async fetchMissingData({ start, end }: { start: Date; end: Date }) {
    try {
      const exists = await this.fronteraModel.exists({
        startDate: { $gte: start },
        endDate: { $lte: end },
      });

      if (exists) {
        this.logger.log(
          `ㄟ( ▔, ▔ )ㄏ Data already exists for range: ${start} - ${end}`,
        );
        return;
      }

      const rawData = await this.reeClient.fetchFronteras({ start, end });
      this.logger.log(
        `（*＾-＾*） Fetched data from REE fronteras: ${rawData?.length}`,
      );
      if (!rawData?.length) {
        throw new Error('API returned empty dataset');
      }

      const transformedData = rawData.map((item: any) => ({
        ...item,
        country: item.groupId.split(' ')[0],
        startDate: start,
        endDate: end,
      }));

      await this.fronteraModel.insertMany(transformedData);
      this.logger.log(`(^_-)db(-_^) Saved data: ${transformedData.length}`);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getIntercambiosFrontera({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    this.logger.log(
      `[1] Received params: \n startData:${startDate} endDate:${endDate}`,
    );

    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T23:59:59Z`);

    this.logger.log(
      `[2] Converted to Date: \n startData:${start} endDate:${end}`,
    );

    await this.fetchMissingData({ start, end });

    const query: FilterQuery<Frontera> = {
      startDate: { $gte: start },
      endDate: { $lte: end },
    };

    this.logger.log(`[3] Query MongoDB: ${JSON.stringify(query)}`);

    const data = await this.fronteraModel.find(query).exec();
    this.logger.log(`[4] Data obtained from MongoDB: ${data.length}`);

    return data;
  }
}
