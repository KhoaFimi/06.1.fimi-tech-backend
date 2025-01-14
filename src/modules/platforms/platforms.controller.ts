import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'

import { CreatePlatformDto } from './dto/create-platform.dto'
import { UpdatePlatformDto } from './dto/update-platform.dto'
import { PlatformsService } from './platforms.service'

@Controller('platforms')
export class PlatformsController {
	constructor(private readonly platformsService: PlatformsService) {}

	@Post()
	create(@Body() createPlatformDto: CreatePlatformDto) {
		return this.platformsService.create(createPlatformDto)
	}

	@Get()
	findAll() {
		return this.platformsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.platformsService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updatePlatformDto: UpdatePlatformDto
	) {
		return this.platformsService.update(+id, updatePlatformDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.platformsService.remove(+id)
	}
}
