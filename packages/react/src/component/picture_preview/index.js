import 'react-photo-view/dist/react-photo-view.css'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import PropTypes from 'prop-types'
import React from 'react'

export default function PicturePreview({ images, className }) {
  return (
    <PhotoProvider>
      {(images || []).map((item, index) => (
        <PhotoView key={index} src={item}>
          <img src={item} alt='' className={className} />
        </PhotoView>
      ))}
    </PhotoProvider>
  )
}

PicturePreview.propTypes = {
  images: PropTypes.array,
  className: PropTypes.string
}
