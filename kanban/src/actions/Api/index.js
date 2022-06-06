import axios from 'axios'
import { API_ROOT } from '../../util/const'

export const fetchBoard = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
    return request.data
    // tra ve board neu co
}