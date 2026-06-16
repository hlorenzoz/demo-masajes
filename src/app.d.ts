import type { Lang } from '$lib/i18n/types';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      lang: Lang;
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: {
        R2_BUCKET: R2Bucket;
        TURNSTILE_SECRET: string;
        RESEND_API_KEY: string;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};
