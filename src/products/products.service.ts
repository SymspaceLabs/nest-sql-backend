import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MinioService } from '../MinioModule/minio.service';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { ProductVariantEntity } from '../product-variant/entities/product-variant.entity';
import { ProductVariantPropertyEntity } from '../product-variant-property/entities/product-variant-property.entity';
import { PriceEntity } from '../price/entities/price.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ProductsService {
  private products = [];
  companyRepository: any;
  // private productImages = [];
  // private productVariantEntity = [];

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    // @InjectRepository(ProductImage)
    // private productImageRepository: Repository<ProductImage>,
    // @InjectRepository(ProductVariantEntity)
    // private productVariantEntityRepository: Repository<ProductVariantEntity>,
    // @InjectRepository(ProductVariantPropertyEntity)
    // private productVariantPropertyEntityRepository: Repository<ProductVariantPropertyEntity>,
    // @InjectRepository(PriceEntity)
    // private priceEntityRepository: Repository<PriceEntity>,
    // private readonly minioService: MinioService,
  ) {}

    // Create product method
    async create(createProductDto: CreateProductDto): Promise<Product> {
      const { company, name, ...productData } = createProductDto;
    
      // Check if company exists by company name or identifier
      if (!company) {
        throw new NotFoundException('Company not provided');
      }
    
      // Fetch the company object from the repository (by name or id)
      const companyEntity = await this.companiesRepository.findOne({
        where: { id: company },  // Or use the id if you have it in the DTO
      });
    
      if (!companyEntity) {
        throw new NotFoundException(`Company with name ${company} not found`);
      }
    
      // Generate slug dynamically: company-name-product-name
      const slug = `${companyEntity.businessName.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
      // Create new product with the generated slug and the company entity
      const product = this.productRepository.create({
        ...productData,
        name,
        company: companyEntity,  // Use the full company entity here
        slug, // Add slug field
      });
    
      return await this.productRepository.save(product);
    }
    

    // New method for fetching all products
    async findAll(): Promise<Product[]> {
      return await this.productRepository.find({
        relations: ['company'], // Eager-load the company data if needed
      });
    }

    // Method to fetch a product by its slug with company data
    async findBySlug(slug: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { slug },
        relations: ['company'],  // Include the company data in the query
      });

      if (!product) {
        throw new NotFoundException(`Product with slug ${slug} not found`);
      }

      return product;
    }
  
  
  
  // async create(createProductDto: CreateProductDto) {
  //   let threedModelName = '';
  //   for (const file of createProductDto.images) {
  //     console.log(file);
  //     const mimeType = file.mimetype;

  //     // Check and split GLB file with images
  //     if (
  //       mimeType === 'model/gltf-binary' ||
  //       file.originalname.endsWith('.glb')
  //     ) {
  //       // Process to threedmodel file type
  //       const timestamp = Date.now(); // Get current timestamp
  //       const randomString = uuidv4(); // Generate a random string
  //       const dfilename = `${timestamp}-${randomString}-${file.originalname}`;

  //       // Upload the 3D model file
  //       threedModelName = dfilename;
  //       await this.minioService.uploadFile(file.buffer, dfilename);
  //     } else {
  //       const timestamp = Date.now(); // Get current timestamp
  //       const randomString = uuidv4(); // Generate a random string
  //       const filename = `${timestamp}-${randomString}-${file.originalname}`;

  //       // Upload the image file
  //       await this.minioService.uploadFile(file.buffer, filename);

  //       // Create a new image object
  //       const prodImageNew = {
  //         imageUrl: filename,
  //         createdAt: new Date(),
  //       };

  //       // Add the new image object to the product images array
  //       this.productImages.push(prodImageNew);
  //     }
  //   }

  //   const newProductInsert = this.productRepository.create({
  //     name: createProductDto.name,
  //     images: this.productImages,
  //     createdAt: new Date(),
  //     category: 'Fashion',
  //     productFitting: createProductDto.productFitting,
  //     threeDModel: threedModelName,
  //   });
  //   // await this.productRepository.save(newProductInsert);
  //   const savedProduct = await this.productRepository.save(newProductInsert);

  //   console.log(Array.isArray(createProductDto.variants));
  //   // console.log(createProductDto.variants.length);
  //   let variantsNew;
  //   try {
  //     variantsNew = JSON.parse(createProductDto.variantsJson);
  //     console.log(variantsNew);
  //   } catch (error) {
  //     // throw new Error('Invalid JSON format for variants');
  //     console.log(error);
  //   }
  //   // console.log(variantsNew);
  //   if (Array.isArray(variantsNew)) {
  //     const variants = variantsNew.map((variantDto) => {
  //       const properties = variantDto.properties.map((prop) => ({
  //         key: prop.key,
  //         value: prop.value,
  //         product: savedProduct,
  //       }));

  //       const prices = variantDto.prices.map((priceDto) => ({
  //         amount: priceDto.amount,
  //         product: savedProduct,
  //       }));

  //       return this.productVariantEntityRepository.create({
  //         product: savedProduct,
  //         properties,
  //         prices,
  //       });
  //     });

  //     await this.productVariantEntityRepository.save(variants);

  //     // If properties and prices are separate entities, save them as well
  //     for (const variant of variants) {
  //       await this.productVariantPropertyEntityRepository.save(
  //         variant.properties,
  //       );
  //       await this.priceEntityRepository.save(variant.prices);
  //     }
  //   }
  //   // Create and insert variants

  //   return savedProduct;
  //   // return newProductInsert;
  // }

  // async findNewArrival() {
  //   return this.productRepository
  //     .createQueryBuilder('product')
  //     .leftJoinAndSelect('product.variants', 'variant')
  //     .leftJoinAndSelect('variant.properties', 'variantProperty')
  //     .leftJoinAndSelect('variant.prices', 'price')
  //     .orderBy('product.createdAt', 'DESC')
  //     .limit(4)
  //     .getMany();
  //   // const queryBuilder = this.productRepository.createQueryBuilder('product');
  //   // return queryBuilder.getMany();
  // }

  // async findProductBySlug(slug: string): Promise<Product> {    
  //   const product = await this.productRepository.findOneBy({ slug });
  //   if (!product) {
  //     throw new NotFoundException(`Product with slug ${slug} not found`);
  //   }
  //   return product;
  // }

  // async findAll() {
  //   return this.productRepository
  //     .createQueryBuilder('product')
  //     .leftJoinAndSelect('product.variants', 'variant')
  //     .leftJoinAndSelect('variant.properties', 'variantProperty')
  //     .leftJoinAndSelect('variant.prices', 'price')
  //     .getMany();
  //   // const queryBuilder = this.productRepository.createQueryBuilder('product');
  //   // return queryBuilder.getMany();
  // }

  async findOne(id: string) {
    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // async findOneProdImg(id: string) {
  //   const queryBuilder =
  //     this.productImageRepository.createQueryBuilder('productImage');
  //   return queryBuilder
  //     .where('productId= :productId', {
  //       productId: id,
  //     })
  //     .getMany();
  //   // const product = await this.productImageRepository.findOneBy({productId
  //   // if (!product) {
  //   //   throw new NotFoundException(`Product with ID ${id} not found`);
  //   // }
  //   // return product;
  // }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string; product: Product }> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    await this.productRepository.remove(product);
    return {
      message: 'Product has been deleted successfully',
      product,
    };
  }
}
