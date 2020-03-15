import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle
} from 'react'
import _ from 'lodash'
import { useMutationObserver } from './hook'
import { Portal, SVGMask, Guide, Action } from './components/index'
import {
  scrollSmooth,
  scrollParent,
  getNodeRect,
  getWindow,
  inView,
  isBody
} from './util'
import { initialState, reducer } from './reducer'
import { propTypes, defaultProps } from './propTypes'

const Tour = forwardRef(
  (
    {
      children,
      isOpen,
      startAt,
      steps,
      scrollDuration,
      className,
      closeWithMask,
      onRequestClose,
      onAfterOpen,
      onBeforeClose,
      disableButtons,
      disableInteraction,
      disableInteractionClassName,
      maskClassName,
      rounded,
      maskSpace
    },
    ref
  ) => {
    const [current, setCurrent] = useState(0)
    const [started, setStarted] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    const helper = useRef(null)
    const observer = useRef(null)

    useMutationObserver(observer, (mutationList, observer) => {
      if (isOpen) {
        showStep()
        mutationList.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            setTimeout(
              () => makeCalculations(getNodeRect(mutation.addedNodes[0])),
              500
            )
          }
        })
      } else {
        observer.disconnect()
      }
    })

    useEffect(() => {
      const debouncedShowStep = _.debounce(showStep, 100)
      window.addEventListener('resize', debouncedShowStep, false)

      if (isOpen) {
        if (!started) {
          setStarted(true)
          makeCalculations(
            {
              width: maskSpace * -1,
              height: maskSpace * -1,
              top: rounded * -1,
              left: rounded * -1
            },
            'center'
          )
          setCurrent(startAt)
          showStep(startAt)
        } else {
          showStep()
        }

        if (helper.current) {
          helper.current.focus()
          document.body.style.overflowY = 'hidden'
          if (onAfterOpen && typeof onAfterOpen === 'function') {
            onAfterOpen(helper.current)
          }
        }
      }

      return () => {
        window.removeEventListener('resize', debouncedShowStep)
      }
    }, [current, isOpen])

    useImperativeHandle(ref, () => ({
      apiToNextStep: () => {
        goToNextStep()
      },
      apiClose: () => {
        close()
      }
    }))

    async function close(e) {
      document.body.style.overflowY = 'auto'
      await runCurrentActionAfter()
      if (onBeforeClose && typeof onBeforeClose === 'function') {
        onBeforeClose(helper.current)
      }
      onRequestClose(e)
    }

    function getNode(step) {
      return step.selector ? document.querySelector(step.selector) : null
    }

    async function runCurrentActionAfter() {
      const step = steps[current]
      if (step.actionAfter && typeof step.actionAfter === 'function') {
        await step.actionAfter(getNode(step))
      }
    }

    async function goTo(i) {
      await runCurrentActionAfter()
      setCurrent(i)
    }

    function goToNextStep() {
      goTo(current < steps.length - 1 ? current + 1 : current)
    }

    async function showStep(nextStep) {
      const step = steps[nextStep] || steps[current]
      const { w, h } = getWindow()

      if (step.actionBefore && typeof step.actionBefore === 'function') {
        await step.actionBefore()
      }

      const node = getNode(step)
      if (step.observe) {
        observer.current = document.querySelector(step.observe)
      }

      if (node) {
        const nodeRect = getNodeRect(node)

        // step is outside view
        if (!inView({ ...nodeRect, w, h })) {
          const parentScroll = scrollParent(node)
          const offset =
            nodeRect.height > h ? -25 : -(h / 2) + nodeRect.height / 2
          scrollSmooth(node, {
            context: isBody(parentScroll) ? window : parentScroll,
            duration: scrollDuration,
            offset,
            callback: _node => {
              makeCalculations(getNodeRect(_node), step.position)
            }
          })
        } else {
          makeCalculations(nodeRect, step.position)
        }
      } else {
        dispatch({
          type: 'NO_DOM_NODE',
          helperPosition: step.position,
          w,
          h,
          inDOM: false
        })
      }
    }

    function makeCalculations(nodeRect, helperPosition) {
      const { w, h } = getWindow()
      const { width: helperWidth, height: helperHeight } = getNodeRect(
        helper.current
      )
      dispatch({
        type: 'HAS_DOM_NODE',
        ...nodeRect,
        helperWidth,
        helperHeight,
        helperPosition,
        w,
        h,
        inDOM: true
      })
    }

    function maskClickHandler(e) {
      if (closeWithMask) {
        close(e)
      }
    }

    return isOpen ? (
      <Portal>
        <SVGMask
          onClick={maskClickHandler}
          windowWidth={state.w}
          windowHeight={state.h}
          targetWidth={state.width}
          targetHeight={state.height}
          targetTop={state.top}
          targetLeft={state.left}
          padding={maskSpace}
          rounded={rounded}
          className={maskClassName}
          disableInteraction={
            disableInteraction || !!steps[current].stepInteraction
          }
          disableInteractionClassName={disableInteractionClassName}
        />
        <Guide
          ref={helper}
          windowWidth={state.w}
          windowHeight={state.h}
          targetWidth={state.width}
          targetHeight={state.height}
          targetTop={state.top}
          targetLeft={state.left}
          targetRight={state.right}
          targetBottom={state.bottom}
          helperWidth={state.helperWidth}
          helperHeight={state.helperHeight}
          helperPosition={state.helperPosition}
          padding={maskSpace}
          tabIndex={-1}
          current={current}
          style={steps[current].style ? steps[current].style : {}}
          rounded={rounded}
          className={className}
        >
          <>
            {children}
            {steps[current].content}
            {!disableButtons && (
              <Action
                isLastItem={current === steps.length - 1}
                goToNextStep={goToNextStep}
                close={close}
              />
            )}
          </>
        </Guide>
      </Portal>
    ) : null
  }
)

Tour.propTypes = propTypes
Tour.defaultProps = defaultProps

export default memo(Tour)
