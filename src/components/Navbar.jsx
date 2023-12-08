import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
            <div className="mx-auto px-8 py-6 w-full hidden md:flex flex-row justify-around gap-10 bg-[#002146] text-[#fff]">
                <h1 className="font-extrabold text-2xl">
                    <Link to="/">Temiz Su ve Sanitasyon</Link>
                </h1>
                <ul className="flex flex-row justify-center items-center gap-10">
                    <li className="hover:opacity-90">
                        <Link to="/harita">Harita</Link>
                    </li>
                    <li className="hover:opacity-90">
                        <a href="/">Bilgilendirme</a>
                    </li>
                    <li className="hover:opacity-90">
                        <a href="/">Kaynaklar</a>
                    </li>
                </ul>
            </div>
            <div className="block md:hidden">Navbar</div>
            <hr className="border-0 w-full h-2 bg-slate-400" />
        </div>
    )
}

export default Navbar