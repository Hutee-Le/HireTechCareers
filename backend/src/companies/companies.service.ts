import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import mongoose, { Model, mongo } from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyModel.create({
      name: createCompanyDto.name,
      address: createCompanyDto.address,
      description: createCompanyDto.description,
      createdAt: createCompanyDto.createdAt,
      updatedAt: createCompanyDto.updatedAt,
    });
    return company;
  }

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find().exec();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found company with ${id}`;

    return this.companyModel.findOne({
      _id: id,
    });
  }

  async findOneByCompanyName(name: string): Promise<Company | null> {
    return this.companyModel.findOne({ name }).exec();
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.updateOne(
      { _id: id },
      { ...updateCompanyDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `Not found company with id ${id}`;

    return this.companyModel.deleteOne({
      _id: id,
    });
  }
}
