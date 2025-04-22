import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FronteraValueEntry {
  @Field(() => Float)
  value: number;

  @Field(() => Float, { nullable: true })
  percentage?: number;

  @Field(() => String)
  datetime: string;
}

@ObjectType()
export class FronteraAttributes {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  magnitude?: string;

  @Field(() => Boolean)
  composite: boolean;

  @Field(() => String, { nullable: true })
  lastUpdate?: string;

  @Field(() => [FronteraValueEntry])
  values: FronteraValueEntry[];

  @Field(() => Float, { nullable: true })
  total?: number;

  @Field(() => Float, { nullable: true })
  totalPercentage?: number;
}

@ObjectType()
export class FronteraType {
  @Field(() => String)
  type: string;

  @Field(() => String)
  id: string;

  @Field(() => String)
  groupId: string;

  @Field(() => FronteraAttributes)
  attributes: FronteraAttributes;

  @Field(() => String, { description: 'País de la frontera (ejemplo)' })
  country: string;

  constructor(data: any) {
    this.type = data.type;
    this.id = data.id;
    this.groupId = data.groupId;
    this.attributes = data.attributes;
    this.country = this.extractPaisFromGroupId(data.groupId); // Ejemplo de resolución
  }

  private extractPaisFromGroupId(groupId: string): string {
    const parts = groupId.split(' ');
    return parts[0];
  }
}
