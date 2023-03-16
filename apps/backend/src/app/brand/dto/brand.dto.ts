import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandReq {
  @ApiProperty()
  name: string;
}

export class GetBrandReq {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  name: string;
}
