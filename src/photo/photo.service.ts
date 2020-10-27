import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY') private photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  async findOne(photoId: number): Promise<Photo> {
    const NFE = new NotFoundException(`Photo id ${photoId} is not found.`);
    if (isNaN(photoId)) {
      throw NFE;
    }
    const photo = await this.photoRepository.findOne(photoId);
    if (!photo) {
      throw NFE;
    }
    return photo;
  }

  async create(photoData: CreatePhotoDto) {
    return await this.photoRepository.save({ ...photoData });
  }

  async update(photoId: number, photoData: UpdatePhotoDto): Promise<Photo> {
    const result = await this.photoRepository.update(
      { id: photoId },
      { ...photoData },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Photo id ${photoId} is not found.`);
    }
    return this.findOne(photoId);
  }

  async remove(photoId: number) {
    const photo = await this.findOne(photoId);
    return this.photoRepository.remove(photo);
  }
}
