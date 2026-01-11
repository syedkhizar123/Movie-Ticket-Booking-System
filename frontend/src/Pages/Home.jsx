import { Hero } from "../Components/Hero"
import { NowShowing } from "../Components/NowShowing"
import { Trailers } from "../Components/Trailers"


export const Home = () => {
    return(
        <>
            <Hero />
            <NowShowing />
            <Trailers />
        </>
    )
}