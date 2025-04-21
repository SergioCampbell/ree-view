import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class EnergyBalanceAttributes {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  total?: number;
}

@ObjectType()
export class EnergyBalanceType {
  @Field(() => Date)
  datetime: Date;

  @Field()
  type: string;

  @Field()
  groupId: string;

  @Field()
  value: number;

  @Field()
  percentage: number;

  @Field(() => EnergyBalanceAttributes)
  attributes: EnergyBalanceAttributes;
}
