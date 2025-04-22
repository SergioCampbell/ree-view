import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {
  EnergyBalance,
  EnergyBalanceSchema,
} from './schemas/energy-balance.schema';
import { EnergyBalanceService } from './services/energy-balance.service';
import { ReeClientService } from './services/ree-client.service';
import { EnergyBalanceResolver } from './resolvers/energy-balance.resolver';
import { FronteraService } from './services/frontera.service';
import { Frontera, FronteraSchema } from './schemas/frontier-schema';
import { FronteraResolver } from './resolvers/frontera.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EnergyBalance.name, schema: EnergyBalanceSchema },
      { name: Frontera.name, schema: FronteraSchema },
    ]),
    HttpModule,
  ],
  providers: [
    EnergyBalanceService,
    ReeClientService,
    FronteraService,
    EnergyBalanceResolver,
    FronteraResolver,
  ],
  exports: [EnergyBalanceService, ReeClientService, FronteraService],
})
export class EnergyBalanceModule {}
