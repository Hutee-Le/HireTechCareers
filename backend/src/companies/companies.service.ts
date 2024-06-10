import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const company = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
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
