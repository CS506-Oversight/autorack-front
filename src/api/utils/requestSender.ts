/**
 * Class to send an API request and obtain its response.
 */
import axios from 'axios';

import ApiPaths from '../definitions/paths';
import {RequestBase, SimpleAddRequest} from '../definitions/request';
import {ResponseBase, RootResponse, SimpleAddResponse} from '../definitions/response';

/**
 * Util class for sending a request.
 */
export default class RequestSender {
  /**
   * Send a simple add request.
   *
   * @param {SimpleAddRequest} request request body
   * @return {Promise<SimpleAddResponse>} promise containing the response
   */
  static sendSimpleAdd(request: SimpleAddRequest): Promise<SimpleAddResponse> {
    return this.sendGetRequest(ApiPaths.SIMPLE_ADD, request);
  }

  /**
   * Check if the API is available.
   *
   * @return {Promise<boolean>} promise containing if the API is available.
   */
  static isApiAvailable(): Promise<boolean> {
    return this.sendGetRequest<undefined, RootResponse>(ApiPaths.ROOT)
      .then((data: RootResponse) => data.ok)
      .catch(() => false);
  }

  /**
   * Send a GET request.
   *
   * @param {string} url URL of the request
   * @param {T} request request body
   * @return {Promise<R>} promise containing the response
   * @private
   */
  private static sendGetRequest<T extends RequestBase | undefined, R extends ResponseBase>(
    url: string, request?: T,
  ): Promise<R> {
    return axios
      .get(url, {
        params: request,
      })
      .then((data) => data.data as unknown as R);
  }
}
