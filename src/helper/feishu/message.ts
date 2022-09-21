import { BusinessException } from '@/common/exceptions/business.exception';
import { methodV } from '@/common/utils/request';

export enum RECEIVE_TYPE {
  'open_id',
  'user_id',
  'union_id',
  'email',
  'chat_id',
}

export enum MSG_TYPE {
  text,
  post,
  image,
  file,
  audio,
  media,
  sticker,
  interactive,
  share_chat,
  share_user,
}

type MESSAGE_PARAMS = {
  receive_id: string;
  content: string;
  msg_type: MSG_TYPE;
};

export const message = async (
  receive_id_type: RECEIVE_TYPE,
  params: MESSAGE_PARAMS,
  app_token: string,
) => {
  // try {
  const { data } = await methodV({
    url: `/im/v1/messages`,
    method: 'POST',
    query: { receive_id_type },
    params,
    headers: {
      Authorization: `Bearer ${app_token}`,
    },
  });
  return data;
  // } catch (error) {
  //   // throw new BusinessException('飞书应用错误');
  //   console.log(error.response.data);
  // }
};
