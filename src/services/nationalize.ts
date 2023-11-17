import axios from 'axios'

import { Nationalize } from '@/types/Nationalize'

export const searchByName = async (name: string) => {
  const { data } = await axios.get<Nationalize>(`https://api.nationalize.io/?name=${name}`)
  return data.country.map((c) => c.country_id)
}
