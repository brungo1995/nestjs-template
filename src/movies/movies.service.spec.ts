/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {

    it('should return an array', () => {
      service.create({
        "title": "Tenet",
        "year": 2020,
        "genres": ["action"]
      });

      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1)
    });

    it('should throw 404', () => {
      try {
        const result = service.getOne(999);
        expect(result).toBeDefined();
        expect(result.id).toEqual(1)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with id 999 not found `)
      }

    });
  });

  describe("deleteOne", () => {

    it('should delete a movie', () => {
      service.create({
        "title": "Tenet",
        "year": 2020,
        "genres": ["action"]
      });

      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length)
    });

    it('should throw 404', () => {
      try {
        const result = service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with id 999 not found `)
      }

    });
  });
  describe("create", () => {

    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        "title": "Tenet",
        "year": 2020,
        "genres": ["action"]
      });
      const afterCreate = service.getAll().length;
      expect(beforeCreate).toBeLessThan(afterCreate)
    });


  });


  describe("update", () => {

    it('should update a movie', () => {
      service.create({
        "title": "Tenet",
        "year": 2020,
        "genres": ["action"]
      });

      service.update(1, {
        "title": "Test",
        "year": 2025,
        "genres": ["test"]
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual("Test")
    });

    it('should throw 404', () => {
      try {
        const result = service.update(999, { title: "test" });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with id 999 not found `)
      }

    });


  });

});
