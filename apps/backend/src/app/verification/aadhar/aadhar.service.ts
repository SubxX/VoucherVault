import { UsersService } from '@backend/app/user/user.service';
import novuConfig from '@backend/common/notification.config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AadharService {
  constructor(private userService: UsersService) {}
  async generateOtp(adharNumber) {
    try {
      console.log('generating');
      const response = await axios.post(
        'https://api.gridlines.io/aadhaar-api/boson/generate-otp',
        {
          aadhaar_number: adharNumber,
          consent: 'Y',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'IUa942SDqLUpIldiKWNCkLk6BmuBmPsj',
            'X-Auth-Type': 'API-Key',
          },
        }
      );
      console.log('generated', response.data);
      return response.data;
    } catch (error) {
      console.log(error.data);
    }
  }

  async submitOtp(otp, shareCode, transactionId, req) {
    try {
      console.log('submitting', otp, shareCode, transactionId);
      const response = await axios.post(
        'https://api.gridlines.io/aadhaar-api/boson/submit-otp',
        {
          otp: otp,
          include_xml: true,
          share_code: shareCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'IUa942SDqLUpIldiKWNCkLk6BmuBmPsj',
            'X-Auth-Type': 'API-Key',
            'X-Transaction-ID': transactionId,
          },
        }
      );
      console.log(response);
      if (response.data.status == 200) {
        const update = await this.userService.updateUser(req.user._id, {
          adDetails: {
            reference_id: response.data.reference_id,
          },
        });
      }
      return response.data;
    } catch (e) {
      console.log(e.response.data);
      throw new HttpException(e.response.data, e.response.status);
    }
  }
}
