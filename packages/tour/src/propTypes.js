import PropTypes from 'prop-types'

export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  /** 生命周期 */
  onAfterOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  /** 延迟 */
  scrollDuration: PropTypes.number,
  /** 开始 */
  startAt: PropTypes.number,
  /** 引导与内容 间隙 */
  maskSpace: PropTypes.number,
  maskClassName: PropTypes.string,
  /** 遮罩 能否触发关闭 */
  closeWithMask: PropTypes.bool,
  /** 步骤配置 */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      selector: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
        .isRequired,
      observe: PropTypes.string,
      position: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center'])
      ]),
      actionAfter: PropTypes.func,
      actionBefore: PropTypes.func,
      style: PropTypes.object,
      stepInteraction: PropTypes.bool
    })
  ),
  /** 禁用按钮 */
  disableButtons: PropTypes.bool,
  /** 禁用互动 */
  disableInteraction: PropTypes.bool,
  /** 禁用互动样式 */
  disableInteractionClassName: PropTypes.string,
  rounded: PropTypes.number
}

export const defaultProps = {
  startAt: 0,
  scrollDuration: 1,
  maskSpace: 10,
  disableButtons: false,
  disableInteraction: true,
  rounded: 3,
  closeWithMask: false
}
