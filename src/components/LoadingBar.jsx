function LoadingBar() {
    return <div className="z-50 w-full bg-blue-100 fixed top-0 overflow-hidden">
        <div className="w-1/2 rounded-md h-1 bg-blue-500 animate-[movingline_1s_ease-in-out_infinite]"></div>
    </div>
}
export default LoadingBar;