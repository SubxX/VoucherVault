import novuConfig from '@backend/common/notification.config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Novu, PushProviderIdEnum } from '@novu/node';
import { UserDocument } from '../user/user.schema';
import {
  SetDeviceNotification,
  TriggerNotificationBody,
} from './notification.dto';
const novu = new Novu(novuConfig.apiKey);

@Injectable()
export class NotificationService {
  async trigger(body: TriggerNotificationBody) {
    const res: any = await novu.trigger(body.templateName, {
      to: {
        subscriberId: body.subscriberId,
      },
      payload: body.payload,
    });
    return res;
  }

  async createSubscriber(user: UserDocument) {
    try {
      await novu.subscribers.identify(user.id, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async setDeviceTokens(body: SetDeviceNotification) {
    try {
      const res: any = await novu.subscribers.setCredentials(
        body.subscriberId,
        PushProviderIdEnum.FCM,
        {
          deviceTokens: body.tokens,
        }
      );
      return res;
    } catch (err) {
      throw new HttpException(
        err.message ?? 'Unable to set token in novu',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
