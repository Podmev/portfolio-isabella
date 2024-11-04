import Link from "next/link";

export default function Navigation(){
    return <ul>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/about'>About me</Link></li>
        <li><Link href='/resume'>My resume</Link></li>
        <li><Link href='/articles'>My articles</Link></li>
        <li><Link href='/blog'>Blog</Link></li>
        <li><Link href='/testimonials'>Testimonials</Link></li>
        <li><Link href='/contactme'>Contact me</Link></li>
    </ul>
}