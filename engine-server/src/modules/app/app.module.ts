/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import config from 'common/configs/config';
import { loggingMiddleware } from 'common/middleware/logging.middleware';

import { AuthModule } from 'modules/auth/auth.module';
import { DocumentationModule } from 'modules/categories/documentation/documentation.module';
import { MailModule } from 'modules/categories/mail/mail.module';
import { TicketingModule } from 'modules/categories/ticketing/ticketing.module';
import { DataModule } from 'modules/data/data.module';
import { IntegrationAccountModule } from 'modules/integration_account/integration_account.module';
import { IntegrationDefinitionModule } from 'modules/integration_definition/integration_definition.module';
import { IntegrationOAuthModule } from 'modules/integration_oauth/integration_oauth.module';
import { LinkModule } from 'modules/link/link.module';
import { OAuthCallbackModule } from 'modules/oauth_callback/oauth_callback.module';
import { SyncModule } from 'modules/sync/sync.module';
import { UserModule } from 'modules/user/user.module';
import { WorkspaceModule } from 'modules/workspace/workspace.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarModule } from 'modules/categories/calendar/calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),
    AuthModule.forRoot(),
    UserModule,
    WorkspaceModule,
    IntegrationAccountModule,
    IntegrationDefinitionModule,
    IntegrationOAuthModule,
    OAuthCallbackModule,
    LinkModule,
    SyncModule,
    DataModule,
    // Categories and their modules
    TicketingModule,
    MailModule,
    DocumentationModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
