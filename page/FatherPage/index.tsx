
import Home from '../Home/'
import About from '../About/'
import Project from '../Project/'
import Service from '../Service/'
import Contact from '../Contact/'
export default function index(){
    return <section className='bg-black text-white'>
        <Home/>
        <About/>
        <Project/>
        <Service/>
        <Contact/>
    </section>
}