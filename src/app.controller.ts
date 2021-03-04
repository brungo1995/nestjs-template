/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { access } from 'fs';
import { from } from 'rxjs';

@Controller('')
export class AppController {

    @Get()
    home() {
        // accessible from http://localhost:3000/
        return "Welcome to the movies api"
    }
}
