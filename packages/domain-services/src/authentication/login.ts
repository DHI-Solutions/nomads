import store from 'store2';
import get from 'lodash/get';

import API from '../index';
import { getOption } from '../options';

import * as Types from './types';

import mapUser from './lib/mapUser';
import setToken from './lib/setToken';

export default async ({ id, password, config = {} }: Types.ILogin) => {
  try {
    const validationEndpoint = '/accounts/validation';
    const tokenEndpoint = '/tokens';

    const body = {
      id,
      password,
    };

    const validationResponse = await API.post(validationEndpoint, body, config);

    if (!validationResponse) {
      throw new Error('Request rejected');
    }

    const { data: userData } = validationResponse;

    const tokenResponse = await API.post(tokenEndpoint, body, config);

    if (!tokenResponse) {
      throw new Error('Request rejected');
    }

    const { data: tokenData } = tokenResponse;

    const token = get(tokenData, 'accessToken.token', undefined);

    await setToken(token);

    const mappedUser = mapUser(userData);

    const user = { ...mappedUser, ...tokenData };

    const localStorageKey = await getOption('localStorageKey', '');

    store.set(localStorageKey + '/USER', user);

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};
