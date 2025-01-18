import { useEffect, useRef } from "react"

export const useLockScroll = (toggle: boolean) => {
  const position = useRef(window.scrollY)
  const scrollbarWidth = getScrollbarWidth();
  const hadScrollBar = window.innerWidth > document.documentElement.clientWidth;

  useEffect(() => {
    if (toggle) position.current = window.scrollY
    document.body.style.top = toggle ? `-${position.current}px` : ""
    document.body.style.height = toggle ? "100vh" : ""
    document.body.style.position = toggle ? "fixed" : ""

    document.body.style.width = toggle ? `calc(100% - ${hadScrollBar ? scrollbarWidth : 0}px)` : "";


    window.scrollTo(0, position.current)
  }, [hadScrollBar, scrollbarWidth, toggle])
}


const getScrollbarWidth = () => {
  const scrollDiv = document.createElement("div");
  scrollDiv.style.width = "100px";
  scrollDiv.style.height = "100px";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};