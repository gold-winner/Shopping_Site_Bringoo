import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getContainerIds' })
export class GetContainerIdsPipe implements PipeTransform {
  transform(allContainerIds: string[], currentId: string): string[] {
    const result: string[] = [...allContainerIds];
    result.splice(allContainerIds.indexOf(currentId), 1);

    return result;
  }
}
