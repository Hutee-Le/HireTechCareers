import { IsNotEmpty } from 'class-validator';
export class CreateJobDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    name: string;
  
    @IsNotEmpty({ message: 'skill không được để trống' })
    skill: string;
  
    @IsNotEmpty({ message: 'description không được để trống' })
    description: string;

    @IsNotEmpty({ message: 'company không được để trống' })
    company: string;
}
