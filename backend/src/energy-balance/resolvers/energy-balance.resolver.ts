import { Query, Resolver, Args } from '@nestjs/graphql';
import { EnergyBalanceService } from '../services/energy-balance.service';
import { EnergyBalanceType } from '../dto/energy-balance.type';
import { EnergyBalanceInput } from '../dto/energy-balance.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => EnergyBalanceType)
export class EnergyBalanceResolver {
  constructor(private balanceService: EnergyBalanceService) {}

  @Query(() => [EnergyBalanceType])
  async getEnergyBalances(@Args('input') input: EnergyBalanceInput) {
    if (new Date(input.startDate) > new Date(input.endDate)) {
      throw new BadRequestException('⚠️ Start date must be before end date.');
    }
    const data = await this.balanceService.getBalances({
      startDate: input.startDate,
      endDate: input.endDate,
      groupId: input.groupId,
      type: input.type,
      groupType: input.groupType,
    });
    if (!data) {
      throw new BadRequestException(
        '⚠️ No data found for the given date range.',
      );
    }

    console.log('Data fetched from the database:', data.length);

    return data;
  }
}
