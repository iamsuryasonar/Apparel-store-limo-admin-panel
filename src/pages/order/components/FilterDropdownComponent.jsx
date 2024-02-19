import { filterItems } from '../../../common/constants'

function FilterDropdown({ filterInfo, toggleDropdown, setToggleDropdown, setFilterInfo }) {
    return (
        <div className="flex flex-row items-center gap-2">
            <p className=' bg-slate-100 py-2 px-4 rounded'>{filterInfo?.replace(/_/g, ' ')}</p>
            <div className="place-self-end flex flex-col">
                <button className="bg-slate-300 text-black font-semibold py-2 px-4 rounded min-w-56 flex items-center justify-between"
                    onClick={(e) => {
                        setToggleDropdown(!toggleDropdown);
                    }}
                >
                    <span className="mr-1 ">Filter</span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                {toggleDropdown &&
                    <ul className=" bg-slate-200 pt-1">
                        <li className=""><p className={`rounded-t bg-slate-300 hover:bg-slate-600 hover:text-white py-2 px-4 block whitespace-no-wrap cursor-pointer ${filterInfo === filterItems.NEWEST_FIRST ? 'bg-slate-500 text-white' : ''}`}
                            onClick={() => {
                                setFilterInfo(filterItems.NEWEST_FIRST)
                            }}
                        >Newest first</p></li>
                        <div className=' h-[1px] bg-slate-200 '></div>
                        <li className=""><p className={`bg-slate-300 hover:bg-slate-600 hover:text-white py-2 px-4 block whitespace-no-wrap cursor-pointer ${filterInfo === filterItems.OLDEST_FIRST ? 'bg-slate-500 text-white' : ''}`}
                            onClick={() => {
                                setFilterInfo(filterItems.OLDEST_FIRST)
                            }}
                        >Oldest first</p></li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default FilterDropdown;