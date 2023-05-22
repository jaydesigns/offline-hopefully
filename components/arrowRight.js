const ArrowRight = ({color,classToAdd,fn}) => {
    const fullClass = `${classToAdd}`
    return(
        <div onClick={fn} className="flex flex-col justify-center align-center h-full">
            <div className="flex justify-center">
            <svg className={fullClass} width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.92149 9.98811L9.46663 11.5333L15 5.9999L9.46663 0.466553L7.92149 2.0117L10.8403 4.93055L0 4.93055L0 7.11571L10.7939 7.11571L7.92149 9.98811Z" fill={color}/>
            </svg>
            </div>
        </div>
    )
}

export default ArrowRight;