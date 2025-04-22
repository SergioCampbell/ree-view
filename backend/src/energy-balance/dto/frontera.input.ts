import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FronteraInput {
  @Field({ description: 'Start date in YYYY-MM-DD format' })
  startDate: string;

  @Field({ description: 'End date in YYYY-MM-DD format' })
  endDate: string;
}
