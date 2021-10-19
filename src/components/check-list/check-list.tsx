import React, { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import List, { ListProps } from '../list'
import { mergeProps } from '../../utils/with-default-props'
import { CheckListContext } from './context'
import { useNewControllableValue } from '../../utils/use-controllable-value'
import { CheckOutline } from 'antd-mobile-icons'

export type CheckListProps = Pick<ListProps, 'mode'> & {
  defaultValue?: string[]
  value?: string[]
  onChange?: (val: string[]) => void
  multiple?: boolean
  activeIcon?: ReactNode
} & NativeProps<'--prefix-width' | '--align-items'>

const defaultProps = {
  multiple: false,
  defaultValue: [],
  activeIcon: <CheckOutline />,
}

export const CheckList: FC<CheckListProps> = p => {
  const props = mergeProps(defaultProps, p)

  const [value, setValue] = useNewControllableValue(props)

  function check(val: string) {
    if (props.multiple) {
      setValue([...value, val])
    } else {
      setValue([val])
    }
  }

  function uncheck(val: string) {
    setValue(value.filter(item => item !== val))
  }

  const { activeIcon } = props

  return (
    <CheckListContext.Provider
      value={{
        value,
        check,
        uncheck,
        activeIcon,
      }}
    >
      {withNativeProps(props, <List mode={props.mode}>{props.children}</List>)}
    </CheckListContext.Provider>
  )
}