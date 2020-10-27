import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('all')
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Post('new')
  create(@Body() photoData: CreatePhotoDto) {
    return this.photoService.create({ ...photoData });
  }

  @Get(':id')
  findOne(@Param('id') photoId: number): Promise<Photo> {
    return this.photoService.findOne(photoId);
  }

  @Patch(':id')
  update(@Param('id') photoId: number, @Body() photoData): Promise<Photo> {
    return this.photoService.update(photoId, photoData);
  }

  @Delete(':id')
  remove(@Param('id') photoId: number) {
    return this.photoService.remove(photoId);
  }
}
