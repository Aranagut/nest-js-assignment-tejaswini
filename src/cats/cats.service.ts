import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private lastCatId = 0;

  create(cat: Cat): Cat {
    const newCat: Cat = { id: ++this.lastCatId, ...cat };
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  update(id: number, updatedCat: Cat): Cat {
    const index = this.cats.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats[index] = { ...this.cats[index], ...updatedCat };
    return this.cats[index];
  }

  remove(id: number): void {
    const index = this.cats.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats.splice(index, 1);
  }
}
