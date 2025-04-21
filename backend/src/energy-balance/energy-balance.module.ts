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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EnergyBalance.name, schema: EnergyBalanceSchema },
    ]),
    HttpModule,
  ],
  providers: [EnergyBalanceService, ReeClientService, EnergyBalanceResolver],
  exports: [EnergyBalanceService, ReeClientService],
})
export class EnergyBalanceModule {}
