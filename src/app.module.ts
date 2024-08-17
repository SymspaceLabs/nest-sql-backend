import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/google.strategy';
import { MailchimpModule } from './mailchimp/mailchimp.module';
import { EmailModule } from './email/email.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { SubcategoryItemsModule } from './subcategory-items/subcategory-items.module';
import { BlogsModule } from './blogs/blogs.module';
import { SeederModule } from './database/seeders/seeder.module';
import { StockModule } from './stock/stock.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST_DB'), //process.env.HOST_DB,
        port: parseInt(configService.get<string>('HOST_DB_PORT')), //25060,
        username: configService.get<string>('DB_UNAME'), //process.env.DB_UNAME,
        password: configService.get<string>('DB_UPASS'), //process.env.DB_UPASS,
        database: configService.get<string>('DB_NAME'), //process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      }),
    }),
    UsersModule,
    CategoriesModule,
    OrdersModule,
    AuthModule,
    MailchimpModule,
    EmailModule,
    ProductsModule,
    CompaniesModule,
    SubcategoriesModule,
    SubcategoryItemsModule,
    BlogsModule,
    SeederModule,
    StockModule,
    ProductImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
