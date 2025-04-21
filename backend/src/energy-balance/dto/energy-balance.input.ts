import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EnergyBalanceInput {
  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  groupType?: string;

  @Field({ nullable: true })
  groupId?: string;
}
