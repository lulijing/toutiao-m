/**
* 获取全部频道列表
*/
import requst from '@/utils/request'
export const allChannels = () => {
  return requst({
    url: '/app/v1_0/channels',
    methods: 'GET'
  })
}
