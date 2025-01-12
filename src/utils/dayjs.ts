import Dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

Dayjs.locale(ptBR)
Dayjs.extend(relativeTime)

export const dayjs = Dayjs
