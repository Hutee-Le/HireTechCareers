import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { Job, JobDocument } from './schemas/job.schemas';

@Injectable()
export class JobService {
  // create(createJobDto: CreateJobDto) {
  //   return 'This action adds a new job';
  // }
  
  constructor(
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job = await this.jobModel.create({
      ...createJobDto,
      // createdBy: {
      //   _id: user._id,
      //   email: user.email,
      // },
    });
    return job;
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.jobModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, 
        pageSize: limit, 
        pages: totalPages, 
        total: totalItems, 
      },
      result,
    };
  }
  // findAll() {
  //   return `This action returns all job`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} job`;
  // }
  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found job with ${id}`;

    return this.jobModel.findOne({
      _id: id,
    });
  }
 

  

  
  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }
  async findOneByJobName(name: string): Promise<Job | null> {
    return this.jobModel.findOne({ name }).exec();
  }
  // update(id: number, updateJobDto: UpdateJobDto) {
  //   return `This action updates a #${id} job`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }
  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `Not found job with id ${id}`;

    await this.jobModel.updateOne(
      { _id: id },
      { deleteBy: { _id: user._id, email: user.email } },
    );

    return this.jobModel.softDelete({
      _id: id,
    });
  }

 
}
