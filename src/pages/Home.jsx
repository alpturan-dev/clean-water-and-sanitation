import homeImgUrl from '../assets/home-image.png'
import mapImgUrl from '../assets/map-image.png'

import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className='h-full bg-[#94A3B8]'>
            <section className="w-full mx-auto bg-[#fff]">
                <div className="container w-3/4 py-20 px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <img
                            alt="Water Conservation"
                            className="mx-auto py-4 overflow-hidden rounded-xl object-bottom order-2"
                            src={homeImgUrl}
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter text-[#002145] sm:text-5xl xl:text-6xl/none">
                                    Temiz Su, Sağlıklı Gelecek!
                                </h1>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#002145] px-8 text-sm font-medium text-[#fff] shadow transition-colors hover:bg-[#002145]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#002145] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#94A3B8] dark:text-[#002145] dark:hover:bg-[#94A3B8]/90 dark:focus-visible:ring-[#94A3B8]"
                                    to="#"
                                >
                                    Fazlasını öğren
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full mx-auto bg-[#94A3B8]">
                <div className="container w-3/4 py-20 px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <img
                            alt="Water Conservation"
                            className="mx-auto py-4 overflow-hidden rounded-full object-bottom order-0"
                            src={mapImgUrl}
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter text-[#002145] sm:text-5xl xl:text-6xl/none">
                                    İnteraktif Harita Üzerinde Ülkelerin Temiz Su Durumunu İncele
                                </h1>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#002145] px-8 text-sm font-medium text-[#fff] shadow transition-colors hover:bg-[#002145]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#002145] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#94A3B8] dark:text-[#002145] dark:hover:bg-[#94A3B8]/90 dark:focus-visible:ring-[#94A3B8]"
                                    to="/harita"
                                >
                                    Haritaya git
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home