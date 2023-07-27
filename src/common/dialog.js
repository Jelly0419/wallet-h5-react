import React from 'react'
import { Dialog } from 'antd-mobile'
import css from './dialog.module'
export const dialog = props => {
  const { text, title, onConfirm, confirmText, cancelText } = props
  Dialog.show({
    title: title,
    style: {
      '--border-radius': '20px'
    },
    bodyClassName: css.dialogBody,
    content: <div className={css.content}>{text}</div>,
    actions: [
      [
        {
          key: 'cancel',
          text: cancelText || '我再想想',
          className: css.cancel
        },
        {
          key: 'confirm',
          text: confirmText || '确认删除',
          className: css.confirm,
          onClick: onConfirm
        }
      ]
    ],
    closeOnAction: true
  })
}
