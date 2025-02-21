import { Flex } from 'antd';
import { nameFile, useResumeStore } from '../resume/store';
import styles from './preview.module.css';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef } from 'react';
import { Previewer } from 'pagedjs';
import ReactDOMServer from 'react-dom/server';
import { setPrintFn } from './print';
import { useTemplateStore } from '../resume/template';
import { getMarginStyles } from './utils';

export function Preview() {
  const resume = useResumeStore();
  const { getTemplate } = useTemplateStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const paged = useRef<Previewer >(new Previewer());
  const template = getTemplate();

  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '',
  });
  setPrintFn(reactToPrintFn);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!template) return;
      const DOMContent = ReactDOMServer.renderToString(<template.template resume={resume} />);
      
      const scrollParent = getScrollParent(contentRef.current);
      let scrollTop = 0;
      if (scrollParent && (scrollParent as HTMLElement).scrollTop) {
        scrollTop = (scrollParent as HTMLElement).scrollTop;
      }

      if (contentRef.current === null) return;

      paged.current.preview(DOMContent, [], contentRef.current).then(() => {
        document.title = nameFile(resume);
        if (scrollTop > 0) {
          (scrollParent as HTMLElement).scrollTop = scrollTop;
        }
      })
    }, 1000)

    return () => {
      clearTimeout(handler);
    }
  }, [resume, template])

  
  return (
    <Flex className={styles.preview} align='center' justify='center' vertical>
      <div
        className={`${styles.paper} ${template?.home ? styles[template.home] : ''}`}
        style={getMarginStyles(template?.margin)}
        ref={contentRef}></div>
    </Flex>
  )
}

function getScrollParent(node: HTMLElement | null): HTMLElement | Window | null {
  if (node == null) {
    return null;
  }

  // 检查当前节点是否可滚动
  if (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth) {
    // 如果是body或者html元素，需要额外检查它们是否真的可以滚动
    if (node.tagName.toLowerCase() === 'body' || node.tagName.toLowerCase() === 'html') {
      const style = window.getComputedStyle(node);
      if (style.getPropertyValue('overflow') === 'auto' ||
          style.getPropertyValue('overflow-y') === 'scroll' ||
          style.getPropertyValue('overflow-x') === 'scroll') {
        return node;
      } else {
        return window;  // 返回 window 对象以处理整个页面的滚动
      }
    }
    return node;
  }

  // 向上遍历查找
  return getScrollParent(node.parentElement);
}