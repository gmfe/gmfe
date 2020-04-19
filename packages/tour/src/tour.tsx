import React, {
  forwardRef,
  memo,
  MouseEvent,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
  ReactText,
} from 'react'
import _ from 'lodash'
import { TourRefOptions, TourProps, TourStepOptions } from './types'
import reducer, { initialState, ReducerState } from './reducer'
import { useMutationObserver } from './hook'
import { Portal } from './components'
import SvgMask from './components/svg_mask'
import Guide from './components/guide'
import Action from './components/action'
import {
  getNodeRect,
  GetNodeRectOptions,
  getWindow,
  inView,
  isBody,
  scrollParent,
  scrollSmooth,
} from './utils'

const Tour = forwardRef<TourRefOptions, TourProps>(
  (
    {
      children,
      isOpen,
      startAt = 0,
      steps = [],
      scrollDuration = 1,
      className,
      closeWithMask = false,
      onRequestClose,
      onAfterOpen,
      onBeforeClose,
      disableButtons = false,
      disableInteraction = true,
      disableInteractionClassName,
      maskClassName,
      rounded = 3,
      maskSpace = 10,
    },
    ref
  ) => {
    const [current, setCurrent] = useState(0)
    const [started, setStarted] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    const helper = useRef<HTMLDivElement>(null)
    const observer = useRef<HTMLDivElement>()

    useMutationObserver(observer, (mutations, observer) => {
      if (isOpen) {
        showStep()
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            setTimeout(() => {
              makeCalculation(getNodeRect(mutation.addedNodes[0] as HTMLElement))
            }, 500)
          }
        })
      } else {
        observer.disconnect()
      }
    })

    useEffect(() => {
      const debouncedShowStep = _.debounce(() => {
        showStep()
      }, 100)
      window.addEventListener('resize', debouncedShowStep, false)

      if (isOpen) {
        if (!started) {
          setStarted(true)
          makeCalculation(
            {
              width: maskSpace * -1,
              height: maskSpace * -1,
              top: rounded * -1,
              left: rounded * -1,
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
      apiToNextStep() {
        handleNextStep()
      },
      apiClose() {
        close()
      },
      apiRecalculate() {
        calculatePosition()
      },
    }))

    async function showStep(nextStep?: number) {
      const step = steps[nextStep!] ?? steps[current]
      if (step.actionBefore && typeof step.actionBefore === 'function') {
        await step.actionBefore()
      }
      if (step.observe) {
        observer.current = document.querySelector(step.observe) as HTMLDivElement
      }
      calculatePosition(nextStep)
    }

    function calculatePosition(nextStep?: number) {
      const step = steps[nextStep!] ?? steps[current]
      const node = getNode(step)
      const { w, h } = getWindow()
      if (node) {
        const nodeRect = getNodeRect(node as HTMLElement)
        if (!inView({ ...nodeRect, w, h })) {
          const parentScroll = scrollParent(node)
          const offset = nodeRect.height > h ? -25 : -(h / 2) + nodeRect.height / 2
          scrollSmooth(node as HTMLElement, {
            context: isBody(parentScroll as HTMLElement) ? window : (parentScroll as HTMLElement),
            duration: scrollDuration,
            offset,
            callback(target: ReactText | HTMLElement) {
              makeCalculation(getNodeRect(target as HTMLElement), step.position)
            },
          })
        } else {
          makeCalculation(nodeRect, step.position)
        }
      } else {
        dispatch({
          type: 'NO_DOM_NODE',
          helperPosition: step.position as ReducerState['helperPosition'],
          w,
          h,
          inDOM: false,
        })
      }
    }

    function makeCalculation(
      nodeRect: Partial<GetNodeRectOptions>,
      helperPosition?: TourStepOptions['position']
    ) {
      const { w, h } = getWindow()
      const { width: helperWidth, height: helperHeight } = getNodeRect(
        helper.current as HTMLDivElement
      )
      dispatch({
        type: 'HAS_DOM_NODE',
        ...nodeRect,
        helperWidth,
        helperHeight,
        helperPosition: helperPosition as ReducerState['helperPosition'],
        w,
        h,
        inDOM: true,
      })
    }

    function getNode(step: TourStepOptions) {
      return step.selector ? document.querySelector(step.selector) : null
    }

    async function runCurrentActionAfter() {
      const step = steps[current]
      if (step.actionAfter && typeof step.actionAfter === 'function') {
        await step.actionAfter(getNode(step))
      }
    }

    async function close(event?: MouseEvent) {
      document.body.style.overflowY = 'auto'
      await runCurrentActionAfter()
      if (onBeforeClose && typeof onBeforeClose === 'function') {
        onBeforeClose(helper.current)
      }
      onRequestClose && onRequestClose(event)
    }

    const handleMaskClickHandler = (event: MouseEvent<HTMLDivElement>): void => {
      if (closeWithMask) {
        close(event)
      }
    }

    async function goTo(index: number) {
      await runCurrentActionAfter()
      setCurrent(index)
    }

    const handleNextStep = (): void => {
      goTo(current < steps?.length - 1 ? current + 1 : current)
    }

    return isOpen ? (
      <Portal>
        <SvgMask
          onClick={handleMaskClickHandler}
          windowWidth={state.w}
          windowHeight={state.h}
          targetWidth={state.width}
          targetHeight={state.height}
          targetTop={state.top}
          targetLeft={state.left}
          padding={maskSpace}
          rounded={rounded}
          className={maskClassName}
          disableInteraction={disableInteraction || steps[current].stepInteraction}
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
          helperWidth={state.helperWidth!}
          helperHeight={state.helperHeight!}
          helperPosition={state.helperPosition}
          padding={maskSpace}
          tabIndex={-1}
          current={current}
          style={steps[current].style ?? {}}
          rounded={rounded}
          className={className}
        >
          <>
            {children}
            {steps[current].content}
            {!disableButtons && (
              <Action
                isLastItem={current === steps?.length - 1}
                onNextStep={handleNextStep}
                onClose={(event) => close(event)}
              />
            )}
          </>
        </Guide>
      </Portal>
    ) : null
  }
)

Tour.displayName = 'Tour'

export default memo(Tour)
