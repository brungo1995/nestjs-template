/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(readonly moviesService: MoviesService) { }

    @Get()
    getAll(@Req() requestAnimationFrame, @Res() res): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query('year') year: string) {
        return `wea re searching for a movie after: ${year}`;
    }

    @Get("/:id")
    GetOne(@Param('id') movieId: number): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    delete(@Param("id") id: number) {
        return this.moviesService.deleteOne(id);
    }

    @Patch("/:id")
    patch(@Param("id") id: number, @Body() updatedData: UpdateMovieDto) {
        return this.moviesService.update(id, updatedData)
    }




}
