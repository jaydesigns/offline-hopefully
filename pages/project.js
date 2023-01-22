import HeaderMenu from '../components/menuHeader'
import Layout from '../components/layout'
import Image from 'next/image'
import gsap from 'gsap'
import {useIsomorphicLayoutEffect} from 'usehooks-ts'

const Project = () => {
    useIsomorphicLayoutEffect(()=>{
        //const el = homeWrapper.current
        const ctx = gsap.context(()=>{
          //@ts-ignore
          gsap.set(".changeBG",{backgroundColor:'#DFE0E2'})
          })
        return () => ctx.revert()
    },[])
    return (
        <Layout>
            <main className='changeBG w-screen h-screen'>
                <div className="w-full h-full px-96 py-48">
                    <div className='relative w-full h-full p-4'>
                        <Image src="/images/aloha.jpg" alt="project cover image" fill style={{objectFit:"cover"}} className="absolute"></Image>
                    </div>
                </div>
                <HeaderMenu/>
            </main>
        </Layout>
    )
}
export default Project;