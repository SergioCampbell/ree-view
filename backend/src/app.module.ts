import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnergyBalanceModule } from './energy-balance/energy-balance.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { DebugController } from './energy-balance/energy-balance.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EnergyBalanceModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // sortSchema: true,
      driver: ApolloDriver,
    }),
  ],
  controllers: [AppController, DebugController],
  providers: [AppService],
})
export class AppModule {}
