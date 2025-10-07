import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { FullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class ILocationsRepository extends FullRepository<Location> {
  // Subjects Results
  abstract locations: SubjectProp<Location[]>;
  abstract pagedLocations: SubjectProp<PagedResults<Location>>;

  abstract cacheStore: ICacheStore;

  // Método específico de locations (con cache)
  abstract getDefaultLocation(organizationId: string, useCache?: boolean): Promise<ResponseResult<Location>>;
}
