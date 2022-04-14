import React from "react"
import {
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CPagination,
    CPaginationItem
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilChevronDoubleLeft, cilChevronDoubleRight, cilChevronLeft, cilChevronRight } from '@coreui/icons'

import PropTypes from "prop-types"


import "./Navbar.scss"

const Navbar = props => {

    const {
        selectedPage,
        setSelectedPage,
        pagesNumber
    } = props

    return (
        <>
            <CNavbar expand="md" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href="#">Feed Me With Movies</CNavbarBrand>
                    <CNavbarNav className="navigation-bar">

                        {
                            <CPagination aria-label="Page navigation">
                                <CPaginationItem disabled={selectedPage === 0} onClick={() => setSelectedPage(0)}><CIcon icon={cilChevronDoubleLeft} /></CPaginationItem>
                                <CPaginationItem disabled={selectedPage === 0} onClick={() => setSelectedPage(page => page - 1)}><CIcon icon={cilChevronLeft} /></CPaginationItem>
                                <CPaginationItem active disabled={true}>{selectedPage + 1}</CPaginationItem>
                                <CPaginationItem disabled={selectedPage > pagesNumber - 2} onClick={() => setSelectedPage(page => page + 1)}><CIcon icon={cilChevronRight} /></CPaginationItem>
                                <CPaginationItem disabled={selectedPage > pagesNumber - 2} onClick={() => setSelectedPage(pagesNumber - 1)}><CIcon icon={cilChevronDoubleRight} /></CPaginationItem>
                            </CPagination>
                        }
                    </CNavbarNav>
                </CContainer>
            </CNavbar>
        </>
    )
}

Navbar.propTypes = {

}

export default Navbar