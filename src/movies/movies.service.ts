/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        console.log(typeof id)
        const movie = this.movies.find(movie => movie.id === id)
        if (!movie) {
            throw new NotFoundException(`Movie with id ${id} not found `)
        }

        return movie
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    create(data: CreateMovieDto): boolean {
        this.movies.push({
            id: this.movies.length + 1,
            ...data
        });
        return true
    }

    update(id: number, updatedMovie: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({
            ...movie,
            ...updatedMovie
        });

        return {
            ...movie,
            ...updatedMovie
        }

    }

}
