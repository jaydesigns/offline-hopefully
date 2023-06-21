import { useContext, useEffect } from "react"
import { BackgroundTheme,ThemeContext } from "../components/layout"

const Press = () => {
    const themeChange = useContext(BackgroundTheme)
    const ThemeColors = useContext(ThemeContext)
    useEffect(() => {
        let subheader1 = document.querySelector("#subheader-1")
        let subheader2 = document.querySelector("#subheader-2")
        subheader1.innerText = "I am an advocate of (PWAs Progressive Web Apps), this technology enabled me to create this web app with relative ease."
        subheader2.innerText = "For my own resources, I will probably include a lot of articles on how the modern web improves the developer and designer experience."
        themeChange(`${ThemeColors.grey}`)
    },[themeChange,ThemeColors])
    return(
        <div className="grid grid-cols-12 grid-rows-[fit_fit_fit] p-4">
            <h1 className="text-MED font-semibold col-span-5 row-start-2">About me</h1>
            <h2 className="text-MED font-semibold text-darkGrey row-start-2 col-start-6 col-span-7">or made by me</h2>
            <p id={'subheader-1'} className="col-start-9 col-span-4"></p>
            <p id={'subheader-2'} className="row-start-3 col-start-2 col-span-3"></p>
        </div>
    )
}

export default Press