/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query('year') year: string) {
        return `wea re searching for a movie after: ${year}`;
    }

    @Get("/:id")
    GetOne(@Param('id') movieId: string): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    delete(@Param("id") id: string) {
        return this.moviesService.deleteOne(id);
    }

    @Patch("/:id")
    patch(@Param("id") id: string, @Body() updatedData) {
        return this.moviesService.update(id, updatedData)
    }




}
