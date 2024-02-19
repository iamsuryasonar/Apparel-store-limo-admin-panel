
function Pagination({ perPage, currentPage, totalPages, totalOrders, handlePageChange }) {
    if (totalOrders === 0) return <></>

    const numberOfOrders = (perPage * currentPage) - totalOrders > 0 ? totalOrders : perPage * currentPage;

    return <div className="flex flex-col items-center">
        <div className='flex flex-row justify-end'>
            {totalPages && <>
                <button
                    className=' underline underline-offset-4 hover:text-blue-600'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className='px-4'>Page {currentPage} of {totalPages}</span>
                <button
                    className=' underline underline-offset-4 hover:text-blue-600'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </>}
        </div>
        {totalOrders !== undefined && numberOfOrders !== 'NaN' ? <p>{numberOfOrders} || {totalOrders}</p> : <></>}
    </div>
}

export default Pagination;