import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommonService } from './common.service';


@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  
}
