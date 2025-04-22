import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ValueEntry {
  @Field(() => Number, { nullable: true })
  value?: number;

  @Field(() => Number, { nullable: true })
  percentage?: number;

  @Field(() => String, { nullable: true })
  datetime?: string;
}

@ObjectType()
class EnergyBalanceAttributes {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  icon?: string | null;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  magnitude?: string;

  @Field({ nullable: true })
  composite?: string;

  @Field({ nullable: true })
  lastUpdate?: string;

  @Field(() => ValueEntry, { nullable: true })
  values?: Array<ValueEntry>;

  @Field({ nullable: true })
  total?: number;

  @Field({ nullable: true })
  totalPercentage?: number;
}

@ObjectType()
export class EnergyBalanceType {
  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  groupId: string;

  @Field(() => EnergyBalanceAttributes)
  attributes: EnergyBalanceAttributes;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
