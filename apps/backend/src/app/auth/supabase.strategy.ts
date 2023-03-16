import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { ExtractJwt } from 'passport-jwt';
import { supabaseCreds } from '../../common/supabase.config';
import { UsersService } from '../user/user.service';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase'
) {
  public constructor() {
    super({
      supabaseUrl: supabaseCreds.supabaseUrl,
      supabaseKey: supabaseCreds.supabaseKey,
      supabaseOptions: {},
      supabaseJwtSecret: supabaseCreds.supabaseJwtSecret,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    super.validate(payload);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }

  authenticate(req: any) {
    super.authenticate(req);
  }
}
