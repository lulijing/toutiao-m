import request from '@/utils/request'
/**
* 获取全部频道列表
*/

export const allChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

/**
* 添加用户频道
*/
export const addUserChannel = channel => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户指定频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
