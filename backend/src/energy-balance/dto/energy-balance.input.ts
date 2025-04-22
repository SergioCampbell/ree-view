import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EnergyBalanceInput {
  @Field({ description: 'Start date in YYYY-MM-DD format' })
  startDate: string;

  @Field({ description: 'End date in YYYY-MM-DD format' })
  endDate: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  groupType?: string;

  @Field({ nullable: true })
  groupId?: string;
}
