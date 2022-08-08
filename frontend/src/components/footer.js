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
                            Company name
                        </h6>
                        <p>
                            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                            amet,
                            consectetur adipisicing elit.
                        </p>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                        <p>
                            <a href='frontend/components/footer#!' className='text-reset'>
                                Link 1
                            </a>
                        </p>
                        <p>
                            <a href='frontend/components/footer#!' className='text-reset'>
                                Link 2
                            </a>
                        </p>
                        <p>
                            <a href='frontend/components/footer#!' className='text-reset'>
                                Link 3
                            </a>
                        </p>
                        <p>
                            <a href='frontend/components/footer#!' className='text-reset'>
                                Link 4
                            </a>
                        </p>
                    </MDBCol>
                    <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                        <p>
                            <MDBIcon icon="home" className="me-2"/>
                            New York, NY 10012, US
                        </p>
                        <p>
                            <MDBIcon icon="envelope" className="me-3"/>
                            info@example.com
                        </p>
                        <p>
                            <MDBIcon icon="phone" className="me-3"/> + 01 234 567 88
                        </p>
                        <p>
                            <MDBIcon icon="print" className="me-3"/> + 01 234 567 89
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBFooter>
    );
}

export default Footer;