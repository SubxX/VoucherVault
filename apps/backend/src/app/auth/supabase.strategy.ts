import { UsersService } from '../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { ExtractJwt } from 'passport-jwt';
import { supabaseCreds } from '../../common/supabase.config';
import { CreateUserDto } from '../user/user.dto';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase'
) {
  public constructor(private userService: UsersService) {
    super({
      supabaseUrl: supabaseCreds.supabaseUrl,
      supabaseKey: supabaseCreds.supabaseKey,
      supabaseOptions: {},
      supabaseJwtSecret: supabaseCreds.supabaseJwtSecret,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    super.validate(payload); //comment if error is thrown
    if (!payload) {
      throw new UnauthorizedException();
    }
    let user;
    try {
      user = await this.userService.getByEmail(payload.email);

      if (!user) {
        let firstName = payload?.user_metadata?.first_name;
        let lastName = payload?.user_metadata?.last_name;
        let url, media, image, countryCode, currencyCode, role;

        if (payload?.user_metadata?.full_name) {
          const fullName = payload.user_metadata.full_name;
          const name = fullName.split(' ');
          firstName = name[0];
          lastName = name[1];
        }

        if (payload.app_metadata.provider != 'email') {
          const fullName = payload?.user_metadata?.full_name;
          const name = fullName.split(' ');
          firstName = name[0];
          lastName = name[1];
        }

        if (payload?.user_metadata?.country_code) {
          countryCode = payload.user_metadata?.country_code;
        }

        if (payload?.user_metadata?.currency_code) {
          currencyCode = payload.user_metadata?.currency_code;
        }

        if (payload?.role) {
          role = payload.role;
        }
        if (!role) role = 'user';

        if (media) image = media[0].id;
        else image = null;

        const reqDto: CreateUserDto = {
          ref: payload.id,
          email: payload.email,
          firstName,
          referralCode: payload.email.split('@')[0],
          lastName,
          mobile: payload.phone,
          dateOfBirth: payload.last_sign_in_at,
          countryCode,
          currencyCode,
          role,
        };
        if (payload?.user_metadata?.referredBy) {
          reqDto.referredBy = payload?.user_metadata?.referredBy;
        }

        const newuser = await this.userService.createUser(reqDto);
        console.log('newuser', newuser);

        payload._id = newuser.id;
        payload.newlyCreated = true;

        user = newuser;
      }

      if (user.ref != payload.id) {
        user.ref = payload.id;
        user = await this.userService.updateUser(user.id, user);
      }

      payload._id = user.id;

      return user;
    } catch (err) {
      console.log('supabase strategy error', err);
    }
  }

  authenticate(req: any) {
    super.authenticate(req);
  }
}
