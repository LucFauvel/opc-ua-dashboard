/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Reading } from '../models/reading';

@Injectable({
  providedIn: 'root',
})
export class ReadingsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation readingsControllerGetChartReadings
   */
  static readonly ReadingsControllerGetChartReadingsPath = '/readings/chart/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readingsControllerGetChartReadings()` instead.
   *
   * This method doesn't expect any request body.
   */
  readingsControllerGetChartReadings$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Reading>>> {

    const rb = new RequestBuilder(this.rootUrl, ReadingsService.ReadingsControllerGetChartReadingsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Reading>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `readingsControllerGetChartReadings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readingsControllerGetChartReadings(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Array<Reading>> {

    return this.readingsControllerGetChartReadings$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Reading>>) => r.body as Array<Reading>)
    );
  }

}
