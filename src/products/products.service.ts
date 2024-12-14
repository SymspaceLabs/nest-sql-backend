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
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';

@Injectable()
export class ProductsService {
  companyRepository: any;
  // private productVariantEntity = [];

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    // @InjectRepository(ProductVariantEntity)
    // private productVariantEntityRepository: Repository<ProductVariantEntity>,
    // @InjectRepository(ProductVariantPropertyEntity)
    // private productVariantPropertyEntityRepository: Repository<ProductVariantPropertyEntity>,
    // @InjectRepository(PriceEntity)
    // private priceEntityRepository: Repository<PriceEntity>,
  ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
      const { images, company, name, colors, model, sizes, ...productData } = createProductDto;
    
      if (!Array.isArray(images)) {
        throw new TypeError('images must be an array');
      }
    
      // Check if company exists by company name or identifier
      if (!company) {
        throw new NotFoundException('Company not provided');
      }
    
      const companyEntity = await this.companiesRepository.findOne({
        where: { id: company },
      });
    
      if (!companyEntity) {
        throw new NotFoundException(`Company with name ${company} not found`);
      }
    
      const slug = `${companyEntity.businessName.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
      const product = this.productRepository.create({
        ...productData,
        name,
        company: companyEntity,
        slug,
      });
    
      // Process images
      if (images && images.length) {
        product.images = images.map((imageUrl) => {
          const productImage = new ProductImage();
          productImage.url = imageUrl;
          return productImage;
        });
      }

      // Process colors
      if (colors && colors.length) {
        product.colors = colors.map((color) => {
          const productColor = new ProductColor();
          productColor.name = color.name;
          productColor.code = color.code;
          return productColor;
        });
      }

      // Process 3D model
      if (model) {
        const productModel = new Product3DModel();
        productModel.name = model.name;
        productModel.filePath = model.filePath;
        productModel.format = model.format;
        product.model = productModel;
      }

      // Process sizes
      if (sizes && sizes.length) {
        product.sizes = sizes.map((size) => {
          const productSize = new ProductSize();
          productSize.size = size;
          return productSize;
        });
      }
    
      return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
      return await this.productRepository.find({
        relations: ['company', 'images', 'colors', 'sizes'],
      });
    }


    async findBySlug(slug: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { slug },
        relations: ['company', 'images', 'colors', 'sizes'],
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

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // Find the product by ID (without its related images initially)
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['company'], // No need to fetch images yet
    });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    // Handle `images` separately (delete existing ones and add new ones)
    if (updateProductDto.images) {
      // 1. Delete all the existing images related to this product
      const existingImages = product.images;
      if (existingImages && existingImages.length > 0) {
        await this.productImageRepository.remove(existingImages);
      }
  
      // 2. Create new images, passing the actual product object
      const newImages = updateProductDto.images.map((url) => {
        const image = this.productImageRepository.create({
          url,
          altText: '', // Optionally set altText if needed
          product, // Pass the full product object, not just the ID
        });
        return image;
      });
  
      // 3. Save the new images to the database
      await this.productImageRepository.save(newImages);
  
      // Associate the new images with the product
      product.images = newImages;
    }
  
    // Omit `company` and `images` from `updateProductDto` to prevent type conflicts
    const { company, images, sizes, ...otherUpdates } = updateProductDto;
  
    // Merge the remaining updates (excluding images and company)
    const updatedProduct = this.productRepository.merge(product, otherUpdates);
  
    // Save and return the updated product
    return await this.productRepository.save(updatedProduct);
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
