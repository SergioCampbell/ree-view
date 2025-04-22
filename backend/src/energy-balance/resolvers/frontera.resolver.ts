import { Args, Query, Resolver } from '@nestjs/graphql';
import { FronteraInput } from '../dto/frontera.input';
import { FronteraType } from '../dto/frontera.type';
import { FronteraService } from '../services/frontera.service';

@Resolver()
export class FronteraResolver {
  constructor(private fronteraService: FronteraService) {}
  @Query(() => [FronteraType])
  async getIntercambios(@Args('input') input: FronteraInput) {
    return await this.fronteraService.getIntercambiosFrontera({
      startDate: input.startDate,
      endDate: input.endDate,
    });
  }
}
