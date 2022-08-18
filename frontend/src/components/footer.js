import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon
} from 'mdb-react-ui-kit';

function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>
                            Home production
                        </h6>
                        <p>
                            Here were go!!!
                        </p>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                        <p>
                            <a href='/users' className='text-reset'>
                                Users
                            </a>
                        </p>
                        <p>
                            <a href='/projects' className='text-reset'>
                                Projects
                            </a>
                        </p>
                        <p>
                            <a href='/notes' className='text-reset'>
                                Notes
                            </a>
                        </p>
                    </MDBCol>
                    <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                        <p>
                            <MDBIcon icon="home" className="me-2"/>
                            RF, Nizhny Novgorod
                        </p>
                        <p>
                            <MDBIcon icon="envelope" className="me-3"/>
                            info@example.com
                        </p>
                        <p>
                            <MDBIcon icon="phone" className="me-3"/> + 01 234 567 88
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBFooter>
    );
}

export default Footer;