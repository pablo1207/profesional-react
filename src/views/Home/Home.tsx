import { useCallback, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { Events, Navbar } from "../../components";
import styles from './Home.module.css'
import useEventResult from "../../state/events-result";
const { pagination, pagePagination, next, previous, activePage, disabledPage } = styles;

export const Home = () => {
    const { data, isLoading, error, fetchEvents, page } = useEventResult();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const refNabvar = useRef();

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleNavbarSearch = (term: string): void => {
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(({ selected }: any) => {
        fetchEvents(`&keydword=${searchTerm}&page=${selected}`)
    }, [])

    const renderEvents = (): JSX.Element => {
        if (isLoading) {
            return <div>Cargando resultados....</div>;
        }

        if (error) {
            return <div>Ha ocurrido un error</div>;
        }
        return (
            <div>
                <Events searchTerm={searchTerm} events={data ?? []} />
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page?.totalPages}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    className={pagination}
                    nextClassName={next}
                    disabledClassName={disabledPage}
                    previousClassName={previous}
                    pageClassName={pagePagination}
                    activeClassName={activePage}
                />
            </div>);
    };

    return (
        <div>
            <Navbar onSearch={handleNavbarSearch} ref={refNabvar} />
            {renderEvents()}
        </div>
    );
}

