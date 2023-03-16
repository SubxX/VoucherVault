import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryReq {
  @ApiProperty()
  name: string;
}

export class GetCategoryReq {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  name: string;
}
