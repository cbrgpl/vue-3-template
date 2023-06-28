import type { IGlobals } from '@enums/consts'

declare global {
  const OPERATION_STATUS: IGlobals['OPERATION_STATUS']
  const CONSOLE_COLORS: IGlobals['CONSOLE_COLORS']
}
