/**
 * @author: stanfer
 * @description:
 * @createDate: 2025/11/24 11:05
 * @Version: 1.0
 * @last modify time:
 **/
import React, { useRef, useEffect } from 'react'

function stickyLayout(Component) {
  const StickyLayout = ({ ...rest }) => {
    const currentStickyRef = useRef(null);
    const topSentinelRef = useRef(null);
    const bottomSentinelRef = useRef(null);
    // 统一管理
    const observerRef = useRef(null);

    useEffect(() => {
      if (!currentStickyRef.current) return;

      const options = {
        root: null, // 相对于浏览器视口
        rootMargin: '0px',
        threshold: 0, // 只要有一个像素进入/离开视口就触发
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (target === topSentinelRef.current) {
            if (entry.isIntersecting) {
              console.log('=======> 顶部进入');
              let heightSum = 0, tableRoot;
              const fullTab = document.querySelectorAll('.gm-framework-full-tabs')
              const commonStickyHeader = document.querySelectorAll('.common-sticky-header')
              const rtTable = document.querySelectorAll('.rt-table')
              const rtTheadHeader = document.querySelectorAll('.rt-thead')
              rtTheadHeader.forEach((el) => {
                el.style.position = 'sticky';
                el.style.top = 0;
                el.style.zIndex = 10;
                heightSum += el.offsetHeight + 10; // 元素本身高 + 上下 10 padding
              })

              commonStickyHeader.forEach((item, idx) => {
                if (fullTab.length) {
                  currentStickyRef.current.style.zIndex = 101;
                }
                // console.log(item.className);
                if (item.className.includes('gm-box-table-header')) {
                  heightSum += item.offsetHeight + 10; // 元素本身高 + 上下 10 padding
                  // console.log(idx, item.getBoundingClientRect(), 'gm-box-table-header: ', item.getBoundingClientRect().height + 20);
                }
                if (item.className.includes('gm-table-x-thead')) {
                  heightSum += item.offsetHeight + 8; // 元素本身高 + 上下 8 padding
                  tableRoot = item.parentElement.parentElement;
                  // console.log(idx, item.getBoundingClientRect(), 'gm-table-x-thead: ', item.getBoundingClientRect().height + 16);
                }
              })

              if (rtTable.length) {
                rtTable.forEach((el) => {
                  if (fullTab.length) {
                    el.style.maxHeight = `calc(100vh - ${heightSum + (fullTab.length * 40) + 50}px)`; // +50 顶部导航栏
                    return;
                  }
                  el.style.maxHeight = `calc(100vh - ${heightSum + 50}px)`; // +50 顶部导航栏
                })
              }
              if (tableRoot) {
                if (fullTab.length) {
                  tableRoot.style.maxHeight = `calc(100vh - ${heightSum + (fullTab.length * 40) + 50}px)`; // +50 顶部导航栏
                  return;
                }
                tableRoot.style.maxHeight = `calc(100vh - ${heightSum + 50}px)`; // +50 顶部导航栏
              }
              // currentStickyRef.current.style.maxHeight = 'unset';
              console.log('currentStickyRef 实例:', currentStickyRef.current.style);
              return
            }
            currentStickyRef.current.style.maxHeight = '50%'; // TODO: 这块需要之后要走外部参数
            console.log('顶部离开 <========');
            return;
          }
          if (target === bottomSentinelRef.current) {
            if (entry.isIntersecting) {
              console.log('=======> 底部进入');
              return;
            }
            console.log('底部离开 <========');
          }
        });
      }, options);

      if (topSentinelRef.current) {
        observerRef.current.observe(topSentinelRef.current);
      }
      if (bottomSentinelRef.current) {
        observerRef.current.observe(bottomSentinelRef.current);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [])

    return (
      <div ref={currentStickyRef} className='common-sticky-layout'>
        <div
          ref={topSentinelRef}
          sentinel="topSentinel"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '1px', // 尽量小，不占空间
            pointerEvents: 'none', // 防止它拦截任何鼠标事件
            backgroundColor: 'transparent', // 完全透明
          }}
        />
        <Component {...rest} />
        <div
          ref={bottomSentinelRef}
          sentinel="bottomSentinel"
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '1px',
            pointerEvents: 'none',
            backgroundColor: 'transparent',
          }}
        />
      </div>
    )
  }

  StickyLayout.propTypes = StickyLayout.propTypes;
  StickyLayout.defaultProps = StickyLayout.defaultProps;

  return StickyLayout
}

export default stickyLayout
