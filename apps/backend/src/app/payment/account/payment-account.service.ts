import { paymentGatewayCreds } from '@backend/common/payment-gateway.config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import uniqid from 'uniqid';
import { CretaeLinkedAccountReq } from './account.dto';
import {
  PaymentAccount,
  PaymentAccountDocument,
} from './payment-account.schema';

@Injectable()
export class PaymentAccountService {
  constructor(
    @InjectModel(PaymentAccount.name)
    private baseModel: Model<PaymentAccountDocument>
  ) { }

  async createLinkedAccount(body, req?) {
    try {
      const response = await axios.post(
        'https://api.razorpay.com/v2/accounts',
        {
          email: body?.email || req.user.email,
          phone: body?.phone || req?.user?.mobile,
          type: 'route',
          reference_id: uniqid(),
          legal_business_name: body?.legalBusinessName,
          business_type: 'individual', //partnership
          contact_name:
            (req.user.firstName || null) + ' ' + (req.user.lastName || null) ||
            body.contactName,
          profile: {
            category: body?.category || 'ecommerce',
            subcategory: body?.subcategory || 'coupons',
            addresses: {
              registered: {
                street1: body?.streetAddress1,
                street2: body?.streetAddress2,
                city: body?.city,
                state: body?.state,
                postal_code: body?.postalCode,
                country: body?.country?.toLowerCase(),
              },
            },
          },
          legal_info: {
            pan: body?.pan,
            gst: body?.gst,
          },
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
          auth: {
            username: paymentGatewayCreds.payemntKeyId,
            password: paymentGatewayCreds.paymentKeySecret,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err.response.data);
      throw new HttpException(
        err?.response?.data?.error?.description || 'Some Internal Server Error',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async fetchLinkedAccount(rzaccountId) {
    try {
      const response = await axios.get(
        `https://api.razorpay.com/v2/accounts/${rzaccountId}`,
        {
          headers: { 'Content-type': 'application/json' },
          auth: {
            username: paymentGatewayCreds.payemntKeyId,
            password: paymentGatewayCreds.paymentKeySecret,
          },
        }
      );
      console.log('response', response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      throw new HttpException(
        err?.response?.data?.error?.description || 'Some Internal Server Error',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createStakeHolder(
    rzaccountId: string,
    body: CretaeLinkedAccountReq,
    req?
  ) {
    try {
      console.log(rzaccountId, body.country.toUpperCase());
      const response = await axios.post(
        `https://api.razorpay.com/v2/accounts/${rzaccountId}/stakeholders`,
        {
          name: body?.legalBusinessName,
          email: body?.email || req?.user?.email,
          addresses: {
            residential: {
              street: body.streetAddress1 + ' ' + body.streetAddress2,
              city: body.city,
              state: body.state,
              postal_code: body.postalCode.toString(),
              country: body.country.toLowerCase(),
            },
          },
          kyc: {
            pan: body?.pan,
          },
          notes: {
            random_key: body?.note,
          },
        },
        {
          headers: { 'Content-type': 'application/json' },
          auth: {
            username: paymentGatewayCreds.payemntKeyId,
            password: paymentGatewayCreds.paymentKeySecret,
          },
        }
      );
      console.log('response', response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      throw new HttpException(
        err?.response?.data?.error?.description || 'Some Internal Server Error',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async setProductConfiguration(rzaccountId: string) {
    try {
      const response = await axios.post(
        `https://api.razorpay.com/v2/accounts/${rzaccountId}/products`,
        {
          product_name: 'route',
          tnc_accepted: true,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
          auth: {
            username: paymentGatewayCreds.payemntKeyId,
            password: paymentGatewayCreds.paymentKeySecret,
          },
        }
      );
      console.log('response', response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      throw new HttpException(
        err?.response?.data?.error?.description || 'Some Internal Server Error',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async updateProductConfiguration(
    rzaccountId: string,
    rzProductConfigId: string,
    body
  ) {
    try {
      const response = await axios.patch(
        `https://api.razorpay.com/v2/accounts/${rzaccountId}/products/${rzProductConfigId}`,
        {
          settlements: {
            account_number: body.accountNumber,
            ifsc_code: body.ifscCode,
            beneficiary_name: body.legalBusinessName,
          },
          tnc_accepted: true,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
          auth: {
            username: paymentGatewayCreds.payemntKeyId,
            password: paymentGatewayCreds.paymentKeySecret,
          },
        }
      );
      console.log('response', response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      throw new HttpException(
        err?.response?.data?.error?.description || 'Some Internal Server Error',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async fetchProductConfig(rzaccountId, rzProductConfigId) {
    try {
      const response = await axios.get(
        `https://api.razorpay.com/v2/accounts/${rzaccountId}/products/${rzProductConfigId}`,
        {
          headers: { 'Content-type': 'application/json' },
          auth: {
            username: paymentGatewayCreds.payemntKeyId,
            password: paymentGatewayCreds.paymentKeySecret,
          },
        }
      );
      console.log('response', response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      throw new HttpException(
        err?.response?.data?.error?.description || 'Some Internal Server Error',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createCompleteLinkedAccount(body: CretaeLinkedAccountReq, req) {
    console.log("body", body, req.user,)
    let paymentAccount = await this.fetchPaymentAccount(req.user._id);
    let linkedAccount = paymentAccount?.linkedAccount,
      productConfiguration = paymentAccount?.productConfiguration;
    if (!paymentAccount?.linkedAccount) {
      linkedAccount = await this.createLinkedAccount(body, req);
      paymentAccount = await this.createPaymentAccount({
        user: req.user._id,
        linkedAccount: linkedAccount,
      });
    }

    if (!paymentAccount?.stakeHolder) {
      const stakeHolder = await this.createStakeHolder(
        linkedAccount?.id,
        body,
        req
      );
      await this.updatePaymentAccount(paymentAccount?._id, {
        stakeHolder: stakeHolder,
      });
    }

    if (!paymentAccount?.productConfiguration) {
      productConfiguration = await this.setProductConfiguration(
        linkedAccount?.id
      );
      await this.updatePaymentAccount(paymentAccount._id, {
        productConfiguration: productConfiguration,
      });
    }

    const updateProductConfiguration = await this.updateProductConfiguration(
      linkedAccount.id,
      productConfiguration.id,
      body
    );
    await this.updatePaymentAccount(paymentAccount._id, {
      productConfiguration: updateProductConfiguration,
    });

    const account = await this.fetchPaymentAccount(req.user._id);
    console.log("final account", account)
    return account
  }

  async createPaymentAccount(body) {
    return await this.baseModel.create(body);
  }

  async fetchPaymentAccount(id) {
    console.log(id)
    const paymentAccount = await this.baseModel.findOne({
      user: id,
    });
    console.log("paymentAccount", paymentAccount)
    return paymentAccount;
  }

  async updatePaymentAccount(id, body) {
    await this.baseModel.findByIdAndUpdate(id, body, { new: true });
  }
}
