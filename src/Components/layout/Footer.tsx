import { Link } from "react-router-dom"
import AdalenaLogo from "../Logo/Logo"
import { Button } from "../Common/Button"


export const Footer = () => {
    return (
        <>
            <div className="bg-white border-gray-200 shadow-sm mt-3 h-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div><AdalenaLogo className="hover:opacity-80 transition-opacity cursor-pointer" /></div>
                    <div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-thin  md:space-y-8 md:flex-col md:mt-0 md:border-0">
                            <Link to=""><li className="hover:text-orange-800">Shop All</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Our Story</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Our Craft</li></Link>
                            <Link to="/gift"><li className="hover:text-orange-800">Gift Card</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Contact</li></Link>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-thin md:space-y-8 md:flex-col md:mt-0 md:border-0">
                            <Link to=""><li className="hover:text-orange-800">FAQ</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Shipping & Returns</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Store Policy</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Payment Method</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Stockists</li></Link>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4   md:space-y-8 md:flex-col md:mt-0 md:border-0 font-thin">
                            <Link to=""><li className="hover:text-orange-800">Facebook</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Instagram</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Twitter</li></Link>
                            <Link to=""><li className="hover:text-orange-800">Pinterest</li></Link>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4md:space-y-8 md:flex-col md:mt-0 md:border-0">
                            <h1 className="font-bold hover:text-orange-800 outline-none">Join Us!</h1>
                            <label htmlFor=""className="font-thin">Email*</label>
                            <input
                                type="email"
                                className="border-0 border-b-2 border-solid border-orange-800 focus:outline-none focus:ring-0"/>
                            
                            <p className="font-thin my-2">Yes, Subscribe Me </p>
                            <input type="checkbox" className="text-orange-800 " />
                            <label className="font-thin">to yours </label>
                            <p className="font-thin">Newes later.* </p>
                            <Button text="Send"/>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
