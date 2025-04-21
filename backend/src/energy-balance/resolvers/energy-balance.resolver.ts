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
      throw new BadRequestException(
        'La fecha de inicio debe ser anterior a la fecha final',
      );
    }
    return this.balanceService.getBalances({
      startDate: input.startDate,
      endDate: input.endDate,
      groupId: input.groupId,
    });
  }
}
