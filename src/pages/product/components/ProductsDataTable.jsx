import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../../store/slices/messageSlice';
import { get_all_products } from '../../../store/slices/productsSlice';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        maxWidth: '300px',
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,
        maxWidth: '400px',
    },
    {
        name: 'Keyword',
        selector: row => row.keyword,
        sortable: true,
        maxWidth: '200px',
    },
    {
        name: 'Tag',
        selector: row => row.tag,
        sortable: true,
        right: true,
        maxWidth: '150px',
    },
    {
        name: 'Action',
        selector: row => row.action,
        sortable: true,
        right: true,
        maxWidth: '80px',
    },
];

function ProductsDataTable({ onComponentToggle }) {
    const [value, setValue] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(10);
    const data = useSelector((state) => state.products);
    const loading = useSelector((state) => state.loading.value);
    const totalRows = data?.products?.pagination?.total_products;

    const fetchProducts = (page, limit) => {
        dispatch(get_all_products({ page: page, limit: limit }));
    }

    useEffect(() => {
        dispatch(clearMessage());
        fetchProducts(1, 10);
    }, []);


    const handlePageChange = (page) => {
        fetchProducts(page, perPage);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchProducts(page, newPerPage)
        setPerPage(newPerPage);
    };

    const filteredItems = data?.products?.products?.filter(
        item => item.name && item.name.toLowerCase().includes(value.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (value) {
                setResetPaginationToggle(!resetPaginationToggle);
                setValue('');
            }
        };

        return (
            <div className='w-full flex justify-between items-center gap-2'>
                <Link to='/add-product' className='px-2 py-1 rounded-md bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white'>Add product</Link>
                <div className='flex flex-col md:flex-row gap-2'>
                    <input
                        id="search"
                        className='border-2 px-2 '
                        type="text"
                        placeholder="Filter by product name"
                        value={value}
                        onChange={e => setValue(e.target.value)}>
                    </input>
                    <button className='px-2 py-1 rounded-md bg-slate-300 text-black hover:bg-slate-600 hover:text-white active:bg-slate-600 active:text-white' onClick={handleClear} > Clear</button >
                </div>
            </div>
        );
    }, [value, resetPaginationToggle]);

    return (
        <>
            <div className=' w-full flex flex-col p-4'>
                {loading ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center  bg-opacity-90 z-50">
                        <div className="animate-spin border-t-8 border-blue-500 border-solid rounded-full w-16 h-16"></div>
                    </div>
                ) :
                    filteredItems && <DataTable
                        title="Products"
                        columns={columns}
                        data={
                            filteredItems.map((item) => {
                                return {
                                    product: item,
                                    name: item.name,
                                    description: item.description,
                                    keyword: item.keyword,
                                    tag: item.tag,
                                    action: (
                                        <div className='flex flex-row gap-2'>
                                            {/* <FontAwesomeIcon icon={faTrash} className="p-1 text-green-500 hover:text-red-500" onClick={(e) => { }} /> */}
                                            <FontAwesomeIcon icon={faPenToSquare} className="p-1 text-green-500 hover:text-red-500" onClick={() => onComponentToggle('EDIT', item, data?.products?.categories)} />
                                        </div>
                                    ),
                                }
                            })
                        }
                        onRowClicked={(row, event) => {
                            onComponentToggle('VIEW', row.product, data?.products?.categories)
                        }}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationResetDefaultPage={resetPaginationToggle}
                        responsive
                        pointerOnHover
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        progressPending={loading}
                    />
                }
            </div>
        </>
    );
};

export default ProductsDataTable;

