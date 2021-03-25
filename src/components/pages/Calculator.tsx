import React from 'react';

import {FetchStatus} from '../../api/definitions/misc';
import {SimpleAddRequest} from '../../api/definitions/request';
import {SimpleAddResponse} from '../../api/definitions/response';
import RequestSender from '../../api/utils/requestSender';

export const Calculator = () => {
  const [data, setData] = React.useState<SimpleAddRequest>({
    arg1: 0,
    arg2: 0,
  });

  const [response, setResponse] = React.useState<FetchStatus<SimpleAddResponse>>({
    fetched: false,
    fetching: false,
  });

  const onChanged = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [key]: parseInt(e.target.value) || 0,
    });
  };

  const onButtonClick = () => {
    setResponse({
      ...response,
      fetching: true,
    });

    RequestSender.sendSimpleAdd(data).then((response: SimpleAddResponse) => {
      setResponse({
        fetched: true,
        fetching: false,
        response,
      });
    });
  };

  // This is expected to be removed so I am lazy to style them ;)

  return (
    <>
      <div>
        <input type="number" placeholder="argument 1" value={data.arg1} onChange={onChanged('arg1')}/>
        <input type="number" placeholder="argument 2" value={data.arg2} onChange={onChanged('arg2')}/>
        <button onClick={onButtonClick} disabled={response.fetching}>Calculate!</button>
      </div>
      <div>
        The answer is {response.response?.result ?? 'not calculated'}
      </div>
    </>
  );
};
