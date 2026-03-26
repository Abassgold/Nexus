
const ProductDetails = () => {
    return (
        <div className="relative w-full  bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col">
            {/* Header & Tabs */}
            <div className="  border-b border-border-subtle py-6 pb-0">
                <div

                    className={`pb-3 p-2 font-heading font-semibold text-sm transition-colors border-b-2 text-accent border-accent`}>

                    Facebook Accounts | USA | USA SMS & Email Verified | Email Included | Profile & Cover Photo | Registered from USA IP
                </div>
            </div>

            {/* Form Body */}
            <div className="p-6">
                <form
                    className="flex flex-col gap-4">
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                disabled
                                className="w-full bg-teal-900 border-border-subtle text-white text-md font-semibold rounded-sm py-4 pl-10 pr-4 outline-none"
                                placeholder="Price for 1 Piece: 0.99" />

                        </div>
                    </div>

                    <div>

                        <div className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted">
                            <div className=' flex'>
                                <p>Stock</p> <p>50</p>
                            </div>
                            <div className=' flex'>
                                <p>Quantity</p>
                                <input type="text" />
                            </div>


                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-txt-secondary uppercase tracking-wider">
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-xs text-accent hover:text-accent-hover transition-colors">

                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative">
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" /

                            <input
                                className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                                placeholder="••••••••" />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary">
                            </button>
                        </div>
                    </div>
                    <>
                        <div>
                            <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                                Confirm Password
                            </label>
                            <div className="relative">
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted"

                                <input
                                    className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                                    placeholder="••••••••" />

                            </div>
                        </div>
                       
                    </>

                    <button
                        type="submit"
                        className="w-full mt-4 cursor-pointer bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        Proceed to Payment
                    </button>
                </form>
                <div className='w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted mt-4'>
                    <h1 className=''>Product Description</h1>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;