import React, { PropsWithChildren } from 'react'
import { CleanModal } from '../modal'
import PreviewModal, { PreviewModalProps } from './preview_modal'

const ImagePreview = (props: PropsWithChildren<PreviewModalProps>): void => {
  function handleHide(): void {
    CleanModal.hide()
  }

  CleanModal.render({
    show: true,
    children: <PreviewModal {...props} onHide={handleHide} />,
    disableMaskClose: true,
    style: {
      background: 'rgba(0, 0, 0, 1)',
      margin: '0',
      width: '100%',
      height: '100%',
    },
  })
}

export default ImagePreview
